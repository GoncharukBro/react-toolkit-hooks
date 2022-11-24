import { useCallback } from 'react';

/**
 * Объединяет ссылки на dom-элементы (`ref`). Полезно когда необходимо хранить
 * ссылку на один и тот же элемент с помощью хука `useRef` в разных компонентах.
 * @returns функция объединеня ссылок
 */
export default function useConnectRef() {
  return useCallback((...refs: React.Ref<HTMLElement>[]) => {
    return (element: HTMLElement | null) => {
      refs.forEach((ref) => {
        if (typeof ref === 'function') {
          ref(element);
        } else if (typeof ref === 'object' && ref !== null) {
          // eslint-disable-next-line no-param-reassign
          (ref.current as typeof element) = element;
        }
      });
    };
  }, []);
}
