import { useCallback, useRef } from 'react';

/**
 * Задает интерфал для срабатывания пользовательской функции.
 * Например, если использовать `throttle` на событии `scroll` с задержкой `100ms`,
 * то пользовательская функция будет вызываться каждые `100ms` пока не прекратится событие `scroll`.
 * @param callback пользовательская функция для срабатывания
 * @param delay задержка с которой будет срабатывать пользовательская функция
 * @returns функция вызова с пользовательской логикой
 */
export default function useThrottle(callback: (...args: any[]) => void, delay?: number) {
  const isThrottled = useRef(false);

  const execute = useCallback(
    (...args) => {
      if (isThrottled.current) {
        return;
      }

      callback(...args);
      isThrottled.current = true;

      setTimeout(() => {
        isThrottled.current = false;
      }, delay);
    },
    [callback, delay]
  );

  return execute;
}
