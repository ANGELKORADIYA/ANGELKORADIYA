"use client";
import { createContext, useContext, useState, useCallback, useRef } from "react";

const HackerHudContext = createContext(null);

export function HackerHudProvider({ children }) {
  const [activeData, setActiveData] = useState(null);
  const [activeElement, setActiveElement] = useState(null);
  const timeoutRef = useRef(null);

  const showHud = useCallback((element, data) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveElement(element);
    setActiveData(data);
  }, []);

  const hideHud = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setActiveData(null);
      setActiveElement(null);
      timeoutRef.current = null;
    }, 150);
  }, []);

  return (
    <HackerHudContext.Provider value={{ activeData, activeElement, showHud, hideHud }}>
      {children}
    </HackerHudContext.Provider>
  );
}

export function useHackerHud() {
  const ctx = useContext(HackerHudContext);
  if (!ctx) throw new Error("useHackerHud must be used within HackerHudProvider");
  return ctx;
}
