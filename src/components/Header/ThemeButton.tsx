import React from "react";
import { MoonIcon, SunIcon } from "../Icons";
import { cx } from "@/src/utils";
import { Theme } from "@/src/types";

type ThemeButtonProps = {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
};

const ThemeButton = ({ theme, setTheme }: ThemeButtonProps) => {
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
