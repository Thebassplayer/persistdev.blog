import React from "react";
import { MoonIcon, SunIcon } from "../Icons";
import { cx } from "@/src/utils";
import { Theme } from "@/src/types";

type ThemeButtonProps = {
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<Theme>>;
};

const ThemeButton = ({ mode, setMode }: ThemeButtonProps) => {
  return (
    <button
      onClick={() => setMode(mode === "light" ? "dark" : "light")}
      className={cx(
        "ease ml-2 flex h-6 w-6 items-center justify-center rounded-full p-1",
        mode === "light" ? "bg-dark text-light" : "bg-light text-dark",
      )}
      aria-label="theme-switcher"
    >
      {mode === "light" ? (
        <MoonIcon className={"fill-dark"} />
      ) : (
        <SunIcon className={"fill-dark"} />
      )}
    </button>
  );
};

export default ThemeButton;
