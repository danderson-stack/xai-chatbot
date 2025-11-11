import { useState, useRef, useEffect } from "react";

export function useDebounced<T>(value: T, delay = 150) {
  const [v, setV] = useState(value);
  const t = useRef<number | null>(null);

  useEffect(() => {
    if (t?.current) window.clearTimeout(t.current);
    t.current = window.setTimeout(() => setV(value), delay);

    return () => {
      if (t.current) window.clearTimeout(t.current);
    };
  }, [value, delay]);

  return v;
}
