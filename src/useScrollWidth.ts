import { useState, useEffect } from 'react';

/**
 * Вычисляет ширину полосы прокрутки
 * @returns числовое значение ширины полосы прокрутки
 */
export default function useScrollWidth() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      setWidth(document.documentElement.offsetWidth - document.documentElement.clientWidth);
    });

    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.unobserve(document.body);
    };
  }, []);

  return width;
}
