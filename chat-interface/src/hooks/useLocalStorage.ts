import { useState, useEffect } from "react";
import { isPrivateBrowsing } from "../browserUtils";

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      // check if window is defined to avoid hydration error and if private browsing is not enabled
      if(typeof window !== "undefined" && !isPrivateBrowsing()) {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : initial;
      }
      return initial;
    } catch (error) {
        console.error(error);
        return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }, [key, value]);

  return [value, setValue] as const;
}