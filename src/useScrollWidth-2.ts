import { useState, useEffect } from 'react';

/**
 * Вычисляет ширину полосы прокрутки
 * @returns числовое значение ширины полосы прокрутки
 */
export default function useScrollWidth() {
  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      const div = document.createElement('div');

      div.style.position = 'absolute';
      div.style.top = '0px';
      div.style.left = '0px';
      div.style.overflowY = 'scroll';
      div.style.zIndex = '-999999999';

      document.body.prepend(div);

      setScrollWidth(div.offsetWidth - div.clientWidth);
    });

    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.unobserve(document.body);
    };
  }, []);

  return scrollWidth;
}
