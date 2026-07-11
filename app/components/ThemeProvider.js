"use client";
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    const isDark = savedTheme === "dark" || savedTheme === "hacker";
    setDarkMode(isDark);

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("hacker");
    } else if (savedTheme === "hacker") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.add("hacker");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.remove("hacker");
    }
  }, []);

  const toggleDarkMode = () => {
    setTheme((prevTheme) => {
      let nextTheme;
      if (prevTheme === "dark") nextTheme = "light";
      else if (prevTheme === "light") nextTheme = "hacker";
      else nextTheme = "dark";

      localStorage.setItem("theme", nextTheme);
      const isDark = nextTheme === "dark" || nextTheme === "hacker";
      setDarkMode(isDark);

      if (nextTheme === "dark") {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("hacker");
      } else if (nextTheme === "hacker") {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.add("hacker");
      } else {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.remove("hacker");
      }
      return nextTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
