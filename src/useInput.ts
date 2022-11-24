import { useState, useEffect, useCallback } from 'react';

export const initialState = {
  isValid: false,
  value: '',
  error: '',
  focus: false,
};

export interface UseValidateInputParams {
  defaultValue?: string;
  resolve?: (value: string) => boolean;
  validate?: (value: string) => string | false | undefined;
}

/**
 * Хранит состояния ввода и валидирует его значение
 * @param params
 * @param params.defaultValue
 * @param params.resolve
 * @param params.validate функция-валидатор
 * @returns состояние ввода с хендлерами
 */
export default function useValidateInput({
  defaultValue = '',
  resolve,
  validate,
}: UseValidateInputParams) {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (defaultValue) {
      setState((prev) => ({ ...prev, value: defaultValue }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validation = useCallback(
    (value: string) => {
      const error = validate?.(value) || '';
      if (value && !error) {
        setState((prev) => ({ ...prev, isValid: true, error: '' }));
      } else {
        const errorMessage = !value ? '' : error;
        setState((prev) => ({ ...prev, isValid: false, error: errorMessage }));
      }
    },
    [validate]
  );

  useEffect(() => {
    validation(state.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.focus, state.value]);

  const clearState = useCallback(() => {
    setState(initialState);
  }, []);

  const revalidate = useCallback(() => {
    validation(state.value);
  }, [state.value, validation]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (resolve?.(event.target.value) ?? true) {
      setState((prev) => ({ ...prev, value: event.target.value }));
    }
  };

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = () => {
    setState((prev) => ({ ...prev, focus: true }));
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = () => {
    setState((prev) => ({ ...prev, focus: false }));
  };

  return {
    state,
    setState,
    clearState,
    revalidate,
    props: {
      onChange: handleChange,
      onFocus: handleFocus,
      onBlur: handleBlur,
    },
  };
}
