import { useState, useEffect } from 'react';

/**
 * Хранит состояния ввода с валидацией значения.
 * @param validate функция-валидатор, должна возвращать сообщение об ощибке или пустую строку
 * @returns состояние ввода с необходимыми для работы хука атрибутами для `input`
 */
export default function useFieldState(validate: (value: string) => string) {
  const [state, setState] = useState({ isValid: false, value: '', error: '', focus: false });

  useEffect(() => {
    const error = validate(state.value);

    if (state.value && !error) {
      setState((prev) => ({ ...prev, isValid: true, error: '' }));
    } else {
      const isFocus = state.focus || !state.value;
      setState((prev) => ({ ...prev, isValid: false, error: isFocus ? '' : error }));
    }
  }, [state.value, state.focus, validate]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, value: event.target.value }));
  };

  const handleFocus = () => {
    setState((prev) => ({ ...prev, focus: true }));
  };

  const handleBlur = () => {
    setState((prev) => ({ ...prev, focus: false }));
  };

  return {
    isValid: state.isValid,
    error: state.error,
    focus: state.focus,
    input: {
      value: state.value,
      onChange: handleChange,
      onFocus: handleFocus,
      onBlur: handleBlur,
    },
  };
}
