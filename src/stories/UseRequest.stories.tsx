import React from 'react';

import type { Meta } from '@storybook/react';

import useRequest from '../useRequest';

export default {
  title: 'Hooks',
} as Meta;

const request = async (value = 'Успешный ответ!') => {
  // eslint-disable-next-line no-return-await
  return await new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(value);
    }, 2000);
  });
};

export const UseRequest = () => {
  const [state, execute] = useRequest(request);

  React.useEffect(() => {
    execute();
  }, [execute]);

  return <pre>{JSON.stringify(state, null, 2)}</pre>;
};
