import { useRef, useCallback } from 'react';

/**
 * Задет задержку для срабатывания пользовательской функции после крайней попытки вызова.
 * Например, если использовать `debounce` на событии `scroll` с задержкой `100ms`, то
 * пользовательская функция будет вызвана через `100ms` после прекращения события `scroll`.
 * @returns функция вызова с пользовательской логикой
 */
export default function useDebounce() {
  const timoutID = useRef<NodeJS.Timeout | null>(null);

  const start = useCallback((callback: () => void, delay: number) => {
    if (timoutID.current !== null) {
      clearTimeout(timoutID.current);
    }

    timoutID.current = setTimeout(() => {
      callback();
    }, delay);
  }, []);

  const stop = useCallback(() => {
    if (timoutID.current !== null) {
      clearTimeout(timoutID.current);
    }
  }, []);

  return [start, stop] as [typeof start, typeof stop];
}
