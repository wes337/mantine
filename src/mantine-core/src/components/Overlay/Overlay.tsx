import React, { forwardRef } from 'react';
import {
  PolymorphicComponentProps,
  PolymorphicRef,
  MantineNumberSize,
  DefaultProps,
  getDefaultZIndex,
  useMantineDefaultProps,
} from '@mantine/styles';
import { Box } from '../Box';

interface _OverlayProps extends DefaultProps {
  /** Overlay opacity */
  opacity?: React.CSSProperties['opacity'];

  /** Overlay background-color */
  color?: React.CSSProperties['backgroundColor'];

  /** Overlay background blur in px */
  blur?: MantineNumberSize;

  /** Use gradient instead of background-color */
  gradient?: string;

  /** Overlay z-index */
  zIndex?: React.CSSProperties['zIndex'];

  /** Value from theme.radius or number to set border-radius in px */
  radius?: MantineNumberSize;
}

export type OverlayProps<C> = C extends React.ElementType
  ? PolymorphicComponentProps<C, _OverlayProps>
  : never;

type OverlayComponent = (<C = 'div'>(props: OverlayProps<C>) => React.ReactElement) & {
  displayName?: string;
};

const defaultProps: Partial<OverlayProps<any>> = {
  opacity: 0.6,
  color: '#fff',
  zIndex: getDefaultZIndex('modal'),
  radius: 0,
  blur: 0,
};

export const Overlay: OverlayComponent = forwardRef(
  <C extends React.ElementType = 'div'>(props: OverlayProps<C>, ref: PolymorphicRef<C>) => {
    const { opacity, blur, color, gradient, zIndex, component, radius, sx, ...others } =
      useMantineDefaultProps('Overlay', defaultProps, props);
    const background = gradient ? { backgroundImage: gradient } : { backgroundColor: color };

    const baseStyles = {
      position: 'absolute' as React.CSSProperties['position'],
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex,
    };

    const OverlayBox = (
      <Box<any>
        component={component || 'div'}
        ref={ref}
        sx={[
          (theme) => ({
            ...background,
            ...baseStyles,
            opacity,
            borderRadius: theme.fn.size({ size: radius, sizes: theme.radius }),
          }),
          sx,
        ]}
        {...others}
      />
    );

    if (blur) {
      return (
        <Box
          sx={[
            (theme) => ({
              ...baseStyles,
              backdropFilter: `blur(${theme.fn.size({ size: blur, sizes: theme.blur })}px)`,
            }),
            sx,
          ]}
        >
          {OverlayBox}
        </Box>
      );
    }

    return OverlayBox;
  }
);

Overlay.displayName = '@mantine/core/Overlay';
