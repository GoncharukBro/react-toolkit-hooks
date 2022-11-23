import React from 'react';

import type { Meta } from '@storybook/react';

import useDebounce from '../useDebounce';

export default {
  title: 'Hooks',
} as Meta;

export const UseDebounce = () => {
  // eslint-disable-next-line no-console
  const execute = useDebounce((value: string) => console.log(value), 500);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    execute(event.target.value);
  };

  return <input onChange={handleChange} />;
};
