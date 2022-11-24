import { useState, useEffect, useRef } from 'react';

type Breakpoints = { [key: string]: number };
type NormalizedBreakpoints<T = string> = [keyof T, number][];

// Нормализуем контрольные точки с сортировкой от большей к меньшей
function normalizeBreakpoints<T extends Breakpoints>(breakpoints: T) {
  return Object.entries(breakpoints).sort((a, b) => b[1] - a[1]);
}

// Преобразуем массив контрольных точек в объект для установки состояния
function mapBreakpoints<T extends Breakpoints>(
  normalizedBreakpoints: NormalizedBreakpoints<T>,
  width: number
) {
  return normalizedBreakpoints.reduce((prev, [key, value]) => {
    return { ...prev, [key]: value <= width };
  }, {} as { [P in keyof T]: boolean });
}

// Выбираем наибольшую контрольную точку в текущей ширине экрана
function getBreakpointKey<T extends Breakpoints>(
  normalizedBreakpoints: NormalizedBreakpoints<T>,
  width: number
) {
  const breakpoint = normalizedBreakpoints.find((item) => item[1] <= width);
  return breakpoint?.[0];
}

const defaultBreakpoints = { mobile: 0, tablet: 720, desktop: 1440 };

/**
 * Запускает процесс вычисления текущей контрольной точки по ширине окна браузера.
 * @param breakpoints контрольные точки
 * @returns объект, где
 * ключ - имя контрольной точки,
 * значение - булево значение, показывающее входит ли контрольная точка в текущую ширину окна браузера
 */
export default function useBreakpoints<T extends Breakpoints = typeof defaultBreakpoints>(
  breakpoints?: T
) {
  const currentBreakpoints = breakpoints ?? defaultBreakpoints;
  // Кэшируем ткущую контрольную точку для предотвращения лишнего обновления состояния
  const breakpointKey = useRef<keyof T | undefined>(undefined);

  const [state, setState] = useState<{ [P in keyof T]: boolean }>(() => {
    const normalizedBreakpoints = normalizeBreakpoints(currentBreakpoints);
    breakpointKey.current = getBreakpointKey(normalizedBreakpoints, global.innerWidth);
    return mapBreakpoints(normalizedBreakpoints, global.innerWidth);
  });

  useEffect(() => {
    const handleResize = () => {
      const normalizedBreakpoints = normalizeBreakpoints(currentBreakpoints);
      const currentBreakpointKey = getBreakpointKey(normalizedBreakpoints, window.innerWidth);

      if (breakpointKey.current !== currentBreakpointKey) {
        breakpointKey.current = currentBreakpointKey;
        setState(mapBreakpoints(normalizedBreakpoints, window.innerWidth));
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [currentBreakpoints]);

  return state;
}
