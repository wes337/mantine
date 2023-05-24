import React, { useState } from 'react';
import { MantineDemo } from '@mantine/ds';

const getCode = (name: string) => `
import { useState } from 'react';
import { ${name} } from '@mantine/dates';

function Demo() {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <${name}
      label="Pick date"
      placeholder="Pick date"
      value={value}
      onChange={setValue}
      mx="auto"
      maw={400}
    />
  );
}
`;

function getDemo(Component: React.FC<any>) {
  return () => {
    const [value, setValue] = useState<Date | null>(null);
    return (
      <Component
        label="Pick date"
        placeholder="Pick date"
        value={value}
        onChange={setValue}
        mx="auto"
        maw={400}
      />
    );
  };
}

export function getPickerInputUsageDemo(Component: React.FC<any>): MantineDemo {
  return {
    type: 'demo',
    code: getCode(Component.displayName.replace('@mantine/dates/', '')),
    component: getDemo(Component),
  };
}
