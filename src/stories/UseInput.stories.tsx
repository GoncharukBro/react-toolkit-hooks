import React from 'react';

import type { Meta } from '@storybook/react';

import useInput from '../useInput';

export default {
  title: 'Hooks',
} as Meta;

const validate = (value: string) => {
  return /\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}/.test(value) ? '' : 'Номер телефона указан неверно';
};

export const UseInput = () => {
  const { isValid, error, focus, input } = useInput(validate);

  return (
    <>
      <input {...input} />
      <pre>{JSON.stringify({ value: input.value, isValid, error, focus }, null, 2)}</pre>
    </>
  );
};
