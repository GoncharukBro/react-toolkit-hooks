import { useLayoutEffect, useRef, useCallback } from 'react';

type RefSetter<R> = (ref: R | null) => void;

function useForwardRef<R extends F, F = any>(
  forwardedRef: React.ForwardedRef<F>
): React.MutableRefObject<R | null>;
// eslint-disable-next-line no-redeclare
function useForwardRef<R extends F, F = any>(
  forwardedRef: React.ForwardedRef<F>,
  externalRef: React.MutableRefObject<R | null>
): RefSetter<R>;
// eslint-disable-next-line no-redeclare
function useForwardRef<R extends F, F = any>(
  forwardedRef: React.ForwardedRef<F>,
  externalRef?: React.MutableRefObject<R | null>
): React.MutableRefObject<R | null> | RefSetter<R> {
  const hasExternalRef = externalRef !== undefined;

  const internalRef = useRef<R | null>(null);

  const setRef = useCallback(
    (currentRef: R | null) => {
      // eslint-disable-next-line no-param-reassign
      (externalRef ?? internalRef).current = currentRef;

      // Добавляем ссылку на элемент для родительских компонентов
      if (typeof forwardedRef === 'function') {
        forwardedRef(currentRef);
      } else if (typeof forwardedRef === 'object' && forwardedRef !== null) {
        // eslint-disable-next-line no-param-reassign
        forwardedRef.current = currentRef;
      }
    },
    [externalRef, forwardedRef]
  );

  useLayoutEffect(() => {
    if (!hasExternalRef) {
      setRef(internalRef.current);
    }
  }, [hasExternalRef, setRef]);

  return hasExternalRef ? setRef : internalRef;
}

export default useForwardRef;
