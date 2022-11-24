import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Ведет обратный отсчёт в секундах времени
 * @param seconds количество секунд для обратного отсчёта
 * @returns секунды оставшиеся до конца отсчёта
 */
export default function useCountdown(seconds: number) {
  const timerID = useRef<NodeJS.Timeout | null>(null);

  const [restartID, setRestartID] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState(seconds);

  useEffect(() => {
    timerID.current = setInterval(() => {
      setCurrentSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      if (timerID.current !== null) {
        clearInterval(timerID.current);
      }
    };
  }, [restartID]);

  useEffect(() => {
    if (currentSeconds === 0 && timerID.current !== null) {
      clearInterval(timerID.current);
    }
  }, [currentSeconds]);

  const restart = useCallback(
    (newSeconds?: number) => {
      setCurrentSeconds(newSeconds !== undefined ? newSeconds : seconds);
      setRestartID((prev) => prev + 1);
    },
    [seconds]
  );

  const clear = useCallback(() => {
    setCurrentSeconds(0);

    if (timerID.current !== null) {
      clearInterval(timerID.current);
    }
  }, []);

  return { seconds: currentSeconds, restart, clear };
}
