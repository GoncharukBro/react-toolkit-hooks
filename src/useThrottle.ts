import { useCallback, useRef } from 'react';

/**
 * Задает интерфал для срабатывания пользовательской функции.
 * Например, если использовать `throttle` на событии `scroll` с задержкой `100ms`,
 * то пользовательская функция будет вызываться каждые `100ms` пока не прекратится событие `scroll`.
 * @param callback пользовательская функция для срабатывания
 * @param delay задержка с которой будет срабатывать пользовательская функция
 * @returns функция вызова с пользовательской логикой
 */
export default function useThrottle() {
  const throttle = useRef(false);

  const start = useCallback((callback: () => void, delay: number) => {
    if (throttle.current) {
      return;
    }

    callback();

    throttle.current = true;

    setTimeout(() => {
      throttle.current = false;
    }, delay);
  }, []);

  return start;
}
