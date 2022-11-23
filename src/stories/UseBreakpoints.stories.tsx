import React from 'react';

import type { Meta } from '@storybook/react';

import useBreakpoints from '../useBreakpoints';

export default {
  title: 'Hooks',
} as Meta;

const themeBreakpoints = { mobile: 0, tablet: 768, desktop: 1440 };
let renderCount = 0;

export const UseBreakpoints = () => {
  const breakpoints = useBreakpoints(themeBreakpoints);

  renderCount += 1;

  return <pre>{JSON.stringify({ renderCount, breakpoints }, null, 2)}</pre>;
};
