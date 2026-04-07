"use client";
import { useCallback, useEffect, useState } from "react";

type Theme = "light" | "dark";

const useThemeSwitch = (): [
  mode: Theme,
  setMode: React.Dispatch<React.SetStateAction<Theme>>,
] => {
  const preferDarkQuery = "(prefers-color-scheme: dark)";
  const storageKey = "theme";

  const toggleTheme = useCallback(
    (theme: Theme) => {
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      window.localStorage.setItem(storageKey, theme);
    },
    [storageKey],
  );

  const getUserPreference = useCallback(() => {
    const userPref = window.localStorage.getItem(storageKey);
    if (userPref) {
      return userPref as Theme;
    }
    return window.matchMedia(preferDarkQuery).matches ? "dark" : "light";
  }, [preferDarkQuery, storageKey]);

  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const mediaQuery = window.matchMedia(preferDarkQuery);

    const handleChange = () => {
      const newTheme = getUserPreference();
      setTheme(newTheme);
      toggleTheme(newTheme);
    };
    handleChange();

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [getUserPreference, toggleTheme, preferDarkQuery]);

  useEffect(() => {
    toggleTheme(theme);
  }, [theme, toggleTheme]);

  return [theme, setTheme];
};

export default useThemeSwitch;
