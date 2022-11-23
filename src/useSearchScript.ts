import { useEffect } from 'react';

/**
 * Создает в DOM скрипт для поиска Яндекс. Скрипт используется для страницы выдачи результатов поиска
 * и в полях ввода значения поиска, при этом страница с результатами должна быть одна, полей ввода может быть неограниченное значение.
 * @param own параметр для правильного формирования скрипта (для страницы с результатами поиска или для поля ввода значения поиска)
 */
export default function useSearchScript(own: 'form' | 'results') {
  useEffect(() => {
    const script = document.createElement('script');
    const firstScript = document.getElementsByTagName('script')[0];

    if (own === 'form') {
      const element = document.documentElement;
      if (` ${element.className} `.indexOf(' ya-page_js_yes ') === -1) {
        element.className += ' ya-page_js_yes';
      }
    }

    script.type = 'text/javascript';
    script.async = true;
    script.charset = 'utf-8';
    script.src = `${
      document.location.protocol === 'https:' ? 'https:' : 'http:'
    }//site.yandex.net/v2.0/js/all.js`;

    firstScript.parentNode?.insertBefore(script, firstScript);

    if (!window.yandex_site_callbacks) {
      window.yandex_site_callbacks = [];
    }

    window.yandex_site_callbacks.push(() => {
      if (own === 'form') window.Ya?.Site.Form.init();
      if (own === 'results') window.Ya?.Site.Results.init();
    });
  }, [own]);
}
