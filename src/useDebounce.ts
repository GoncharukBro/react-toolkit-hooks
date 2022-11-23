import { useRef, useCallback } from 'react';

/**
 * Задет задержку для срабатывания пользовательской функции после крайней попытки вызова.
 * Например, если использовать `debounce` на событии `scroll` с задержкой `100ms`, то
 * пользовательская функция будет вызвана через `100ms` после прекращения события `scroll`.
 * @param callback пользовательская функция для срабатывания
 * @param delay задержка с которой будет срабатывать пользовательская функция
 * @returns функция вызова с пользовательской логикой
 */
export default function useDebounce<P extends any[]>(
  callback: (...args: P) => void,
  delay?: number
) {
  const timoutID = useRef<NodeJS.Timeout | null>(null);

  const execute = useCallback(
    (...args: P) => {
      if (timoutID.current !== null) {
        clearTimeout(timoutID.current);
      }

      timoutID.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  return execute;
}
