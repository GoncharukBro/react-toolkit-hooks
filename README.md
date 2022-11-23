# react-toolkit-hooks

## useBreakpoints

Запускает процесс вычисления текущей контрольной точки по ширине окна браузера.

Хук `useBreakpoints` ожидает один аргумент, которым является объект с контрольными точками, например `{ mobile: 0, tablet: 768, desktop: 1440 }`.

Хук `useBreakpoints` объект, где `ключ` - имя контрольной точки, `значение` - булево значение, показывающее входит ли контрольная точка в текущую ширину окна браузера.

Пример использования:

```tsx
import React from 'react';

import useBreakpoints from './useBreakpoints';
import breakpoints from './theme';

export default function Example() {
  const brk = useBreakpoints(breakpoints);

  if (brk.tablet) {
    return <div>Отрисовка для `tablet`</div>;
  }

  return <div>Отрисовка для `desktop`</div>;
}
```

## useDebounce

Задет задержку для срабатывания пользовательской функции после крайней попытки вызова. Например, если использовать `debounce` на событии `input` с задержкой `500ms`, то
пользовательская функция будет вызвана через `500ms` после прекращения ввода.

Хук `useDebounce` ожидает два аргумента, где первый аргумент - пользовательская функция, второй аргумент задержка в `ms`.

Хук `useDebounce` возвращает функцию отложенного вызова (`execute`).

Пример использования:

```tsx
import React from 'react';

import useDebounce from './useDebounce';

export default function Example() {
  const execute = useDebounce((vale: string) => console.log(value), 500);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    execute(event.target.value);
  };

  return <input onChange={handleChange} />;
}
```

## useInput

Хранит состояния ввода (`input`) с валидацией значения.

Хук `useInput` ожидает один аргумент, которым являет функция-валидатор. Валидатор должен возвращать сообщение об ощибке или пустую строку.

Хук `useInput` возвращает состояние ввода с необходимыми для работы хука атрибутами для `input`.

Пример использования:

```tsx
import React from 'react';

import useInput from './useInput';

const validate = (value: string) => {
  return /\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}/.test(value) ? '' : 'Номер телефона указан неверно';
};

export default function Example() {
  const { isValid, error, focus, input } = useInput(validate);

  return (
    <>
      <input {...input} />
      {error && <span>{error}</span>}
    </>
  );
}
```

## useRequest

Предоставляет состояние запроса с функцией отложенного вызова. Состояние запроса хранит следующие свойства:

- `status` - статус запроса с возможными значениями `"idle"` - запрос еще не был отправлен, `"pending"` - запрос отправлен, но ответ еще не получен, `"success"` - запрос успешно выполнен, `"error"` - запрос выполнен с ошибкой;
- `data` - данные получение в ответе запроса;
- `error` - сообщение об ошибке в случае, если запрос выполнен с ошибкой.

Хук `useRequest` ожидает один аргумент, которым являет пользовательская функция запроса, при этом запрос следует вынести за пределы компонента в котором используется хук или обернуть в `useCallback`, для предотвращение срабатываний при указании в качестве зависимостей эффектов.

Хук `useRequest` возвращает массив, где первый элемент - состояние запроса (`state`), второй элемент - функция отложенного вызова (`execute`).

Пример использования:

```tsx
import React from 'react';

import useRequest from './useRequest';
import getUsers from './api';

export default function Example() {
  const [state, execute] = useRequest(getUsers);

  React.useEffect(() => {
    execute();
  }, [execute]);

  if (state.status === 'error') {
    return <div>{state.error}</div>;
  }

  return <div>{state.data}</div>;
}
```

## Feedback

If you find a bug or want to make a suggestion for improving the package, [open the issues on GitHub](https://github.com/GoncharukBro/react-toolkit-hooks/issues) or email [goncharuk.bro@gmail.com](mailto:goncharuk.bro@gmail.com).

Support the project with a star ⭐ on [GitHub](https://github.com/GoncharukBro/react-toolkit-hooks).

## License

MIT © [Nikolay Goncharuk](https://github.com/GoncharukBro)
