import { useEffect } from 'react';

interface Window extends globalThis.Window {
  yandex_site_callbacks?: any[];
  Ya?: { Site: { Form: any; Results: any } };
}

type Type = 'form' | 'results';

function useError(type: Type) {
  if (type !== 'form' && type !== 'results') {
    throw new Error(`
ERROR useYandexSearch: Обязательный параметр не передан или передано не верное значение. Допустимые значения для useYandexSearch:

  "results" - для страницы с результатами поиска;
  "form" - для поля ввода значения поиска.

Убедитесь что вы передаёте допустимый параметр.
    `);
  }
}

/**
 * Создает в DOM скрипт для Яндекс поиска. Скрипт используется для страницы выдачи
 * результатов поиска и в полях ввода значения поиска, при этом страница с результатами
 * должна быть одна, полей ввода может быть неограниченное количество.
 * @param type параметр для правильного формирования скрипта,
 * `"results"` - для страницы с результатами поиска,
 * `"form"` - для поля ввода значения поиска.
 */
export default function useYandexSearch(type: Type) {
  useError(type);

  useEffect(() => {
    const protocol = document.location.protocol === 'https:' ? 'https:' : 'http:';
    const src = `${protocol}//site.yandex.net/v2.0/js/all.js`;

    // Проверяем существование скрипта
    // let script = document.querySelector(`script[src="${src}"]`);

    // if (script === null) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.charset = 'utf-8';
    script.src = src;

    const firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode?.insertBefore(script, firstScript);

    if (type === 'form') {
      if (` ${document.documentElement.className} `.indexOf(' ya-page_js_yes ') === -1) {
        document.documentElement.className += ' ya-page_js_yes';
      }
    }

    if (!(window as Window).yandex_site_callbacks) {
      (window as Window).yandex_site_callbacks = [];
    }

    if (type === 'form') {
      (window as Window).yandex_site_callbacks?.push(() => {
        (window as Window).Ya?.Site.Form.init();
      });
    }

    if (type === 'results') {
      (window as Window).yandex_site_callbacks?.push(() => {
        (window as Window).Ya?.Site.Results.init();
      });
    }
    // }
  }, [type]);
}
