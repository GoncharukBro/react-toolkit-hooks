import { useState, useEffect } from 'react';

/**
 * Вычисляет ширину полосы прокрутки
 * @returns числовое значение ширины полосы прокрутки
 */
export default function useScrollWidth() {
  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      setScrollWidth(window.innerWidth - document.documentElement.clientWidth);
    });

    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.unobserve(document.body);
    };
  }, []);

  return scrollWidth;
}
