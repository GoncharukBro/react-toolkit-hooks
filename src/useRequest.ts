import { useState, useCallback } from 'react';

type State<T> = {
  status: 'idle' | 'pending' | 'success' | 'error';
  data: T | null;
  error: string | null;
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
 * - второй элемент - функция отложенного вызова.
 */
export default function useRequest<D, P extends any[]>(
  request: (...args: P) => Promise<D>
): [state: State<D>, execute: (...args: P) => Promise<void>] {
  const [state, setState] = useState<State<D>>({ status: 'idle', data: null, error: null });

  const execute = useCallback(
    async (...args: P) => {
      try {
        setState((prev) => ({ ...prev, status: 'pending', error: null }));

        const data = await request(...args);

        setState({ status: 'success', data, error: null });
      } catch (error) {
        setState((prev) => ({ ...prev, status: 'error', error: (error as Error).message }));
      }
    },
    [request]
  );

  return [state, execute];
}
