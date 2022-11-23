import { useState, useEffect } from 'react';

/**
 * Создаёт в DOM тег `script`
 * @param src
 * @returns результат загрузки скрипта, где `true` - успешно, `false` - ошибка при зугрузке
 */
export default function useScript(src: string) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let script: HTMLScriptElement | null = document.querySelector(`script[src="${src}"]`);

    if (script === null) {
      script = document.createElement('script');

      script.type = 'text/javascript';
      script.async = true;
      script.src = src;

      script.onload = () => {
        setLoaded(true);
      };

      script.onerror = () => {
        setLoaded(false);
      };

      document.body.appendChild(script);
    }

    return () => {
      if (script !== null) {
        script.remove();
        setLoaded(false);
      }
    };
  }, [src]);

  return loaded;
}
