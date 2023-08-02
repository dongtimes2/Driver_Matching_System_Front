import { useEffect, useRef, useState } from "react";

type IntervalStatusType = "start" | "stop";

const useInterval = (callback: () => void, interval: number) => {
  const savedCallback = useRef<(() => void) | null>(null);
  const [intervalStatus, setIntervalStatus] =
    useState<IntervalStatusType | null>(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    let id: number = 0;
    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };

    if (intervalStatus === "start") {
      id = window.setInterval(tick, interval);
    } else if (intervalStatus === "stop") {
      window.clearInterval(id);
    }

    return () => window.clearInterval(id);
  }, [interval, intervalStatus]);

  return { setIntervalStatus };
};

export default useInterval;
