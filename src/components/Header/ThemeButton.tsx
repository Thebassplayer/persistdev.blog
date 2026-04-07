import React from "react";
import { useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "../Icons";
import { cx } from "@/src/utils/cx";
import { Theme } from "@/src/types";

type ThemeButtonProps = {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
};

const ThemeButton = ({ theme, setTheme }: ThemeButtonProps) => {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  if (!mounted) {
    return <div className="ml-2 h-6 w-6 rounded-full p-1" aria-hidden="true" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={cx(
        "ease ml-2 flex h-6 w-6 items-center justify-center rounded-full p-1",
        theme === "light" ? "bg-dark text-light" : "bg-light text-dark",
      )}
      aria-label="theme-switcher"
    >
      {theme === "light" ? (
        <MoonIcon className={"fill-dark"} />
      ) : (
        <SunIcon className={"fill-dark"} />
      )}
    </button>
  );
};

export default ThemeButton;
