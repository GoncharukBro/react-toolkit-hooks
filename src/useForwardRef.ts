import { useLayoutEffect, useRef } from 'react';

/**
 *
 * @param forwardedRefs
 * @returns
 */
export default function useForwardRef<E extends HTMLElement>(
  ...forwardedRefs: React.ForwardedRef<E>[]
) {
  const ref = useRef<E | null>(null);

  useLayoutEffect(() => {
    if (forwardedRefs) {
      forwardedRefs.forEach((forwardedRef) => {
        if (typeof forwardedRef === 'function') {
          forwardedRef(ref.current);
        } else if (typeof forwardedRef === 'object' && forwardedRef !== null) {
          // eslint-disable-next-line no-param-reassign
          forwardedRef.current = ref.current;
        }
      });
    }
  }, [forwardedRefs]);

  return ref;
}
