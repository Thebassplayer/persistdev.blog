"use client";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const useThemeSwitch = (): [
  mode: Theme,
  setMode: React.Dispatch<React.SetStateAction<Theme>>,
] => {
  const preferDarkQuery = "(prefers-color-scheme: dark)";
  const storageKey = "theme";

  const isClient = typeof window === "object"; // Check if window is defined

  const toggleTheme = (theme: Theme) => {
    if (isClient) {
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      window.localStorage.setItem(storageKey, theme);
    }
  };

  const getUserPreference = () => {
    if (isClient) {
      const userPref = window.localStorage.getItem(storageKey);
      if (userPref) {
        return userPref as Theme;
      }
      return window.matchMedia(preferDarkQuery).matches ? "dark" : "light";
    }
    // Return default theme for server-side rendering
    return "light";
  };

  const [mode, setMode] = useState<Theme>(() => getUserPreference()); // Initialize with user preference

  useEffect(() => {
    if (isClient) {
      const mediaQuery = window.matchMedia(preferDarkQuery);

      const handleChange = () => {
        const newMode = getUserPreference();
        setMode(newMode);
        toggleTheme(newMode);
      };
      handleChange();

      mediaQuery.addEventListener("change", handleChange);

      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [isClient]);

  useEffect(() => {
    toggleTheme(mode);
  }, [mode, isClient]);

  return [mode, setMode];
};

export default useThemeSwitch;
