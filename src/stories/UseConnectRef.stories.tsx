import React, { useRef } from 'react';

import type { Meta } from '@storybook/react';

import useConnectRef from '../useConnectRef';

export default {
  title: 'Hooks',
} as Meta;

export const UseBreakpoints = () => {
  const connectRef = useConnectRef();

  const a = useRef();
  const b = useRef();

  return (
    <>
      <div ref={connectRef(a, b)} />
      <pre>{JSON.stringify({ a, b }, null, 2)}</pre>
    </>
  );
};
