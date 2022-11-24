import { useState, useRef, useCallback } from 'react';

import type { AxiosError } from 'axios';

export type State<T, E> = {
  status: 'idle' | 'pending' | 'success' | 'error';
  data: T | null;
  error: { message: string; code?: number; data?: E } | null;
};

type Request<D, P extends any[]> = (...args: P) => Promise<D>;

const initialState = {
  status: 'idle',
  data: null,
  error: null,
} as const;

const requestWithID = async <D, P extends any[]>(
  requestID: number,
  request: Request<D, P>,
  ...args: P
) => {
  const data = await request(...args);
  return { requestID, data };
};

/**
 * Предоставляет состояние запроса с функцией отложенного вызова.
 * Состояние запроса хранит следующие свойства:
 * - статус запроса (`status`) с возможными значениями:
 * ```
 * 'idle' - запрос еще не был отправлен;
 * 'pending' - запрос отправлен, но ответ еще не получен;
 * 'success' - запрос успешно выполнен;
 * 'error' - запрос выполнен с ошибкой.
 * ```
 * - данные получение в ответе запроса (`data`);
 * - сообщение об ошибке (`error`) в случае, если запрос выполнен с ошибкой.
 * @param request пользовательская функция запроса. Запрос следует вынести за пределы компонента в котором используется
 * хук или обернуть в `useCallback`, для предотвращение срабатываний при указании в качестве зависимостей эффектов.
 * @returns массив, где:
 * - первый элемент - состояние запроса;
 * - второй элемент - функция отложенного вызова;
 * - третий элемент - функция для сброса состояния.
 */
export default function useRequest<D, E = any, P extends any[] = any[]>(
  request: Request<D, P>
): [state: State<D, E>, execute: (...args: P) => Promise<void>, clear: () => void] {
  const [state, setState] = useState<State<D, E>>(initialState);

  const requestID = useRef(0);
  const cleared = useRef(false);

  const execute = useCallback(
    async (...args: P) => {
      try {
        requestID.current += 1;
        cleared.current = false;

        setState((prev) => ({ ...prev, status: 'pending', error: null }));

        const result = await requestWithID<D, P>(requestID.current, request, ...args);

        // Прослушиваем только последний запрос
        if (result.requestID === requestID.current && !cleared.current) {
          setState({ status: 'success', data: result.data, error: null });
        }
      } catch (error) {
        const { message, response } = error as AxiosError<E>;

        setState((prev) => ({
          ...prev,
          status: 'error',
          error: { message, code: response?.status, data: response?.data },
        }));
      }
    },
    [request]
  );

  const clear = useCallback(() => {
    cleared.current = true;

    setState((prev) => (prev.status !== 'idle' ? initialState : prev));
  }, []);

  return [state, execute, clear];
}
