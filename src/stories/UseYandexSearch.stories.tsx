import React from 'react';

import type { Meta } from '@storybook/react';

import useYandexSearch from '../useYandexSearch';

export default {
  title: 'Hooks',
} as Meta;

// Компонент с формой поиска

const formData = JSON.stringify({
  action: '/iframe.html?id=hooks--use-yandex-search&viewMode=story', // Путь до страницы с результатами поиска, в которой вызван хук `useYandexSearch('results')`
  arrow: false,
  bg: 'transparent',
  fontsize: 16,
  fg: '#000000',
  language: 'ru',
  logo: 'rb',
  publicname: 'Поиск по site.ru',
  suggest: true,
  target: '_self',
  tld: 'ru',
  type: 3, // Вариант отображения формы
  usebigdictionary: true,
  searchid: 2517472,
  input_fg: '#000000',
  input_bg: '#ffffff',
  input_fontStyle: 'normal',
  input_fontWeight: 'normal',
  input_placeholder: 'Поиск',
  input_placeholderColor: '#a1afbf',
  input_borderColor: '#7f9db9',
});

const Form = () => {
  useYandexSearch('form');

  return (
    <div className="ya-site-form ya-site-form_inited_no" data-bem={formData}>
      <form
        action="https://yandex.ru/search/site/"
        method="get"
        target="_self"
        acceptCharset="utf-8"
      >
        <input type="hidden" name="searchid" value="2517472" />
        <input type="hidden" name="l10n" value="ru" />
        <input type="hidden" name="reqenc" value="" />
        <input type="search" name="text" value="" />
        <input type="submit" value="Найти" />
      </form>
    </div>
  );
};

// Компонент с выдачей результата поиска

const resultsData = JSON.stringify({
  tld: 'ru',
  language: 'ru',
  encoding: '',
  htmlcss: '1.x',
  updatehash: true,
});

const Results = () => {
  useYandexSearch('results');

  return <div id="ya-site-results" data-bem={resultsData} />;
};

export const UseYandexSearch = () => {
  const [state, setState] = React.useState(false);

  return (
    <>
      {state && <Form />}
      <Results />

      <button type="button" onClick={() => setState((prev) => !prev)}>
        Нажми {state}
      </button>
    </>
  );
};
