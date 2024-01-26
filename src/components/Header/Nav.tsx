"use client";
import Link from "next/link";
import { MoonIcon, SunIcon } from "../Icons";
import useThemeSwitch from "@/src/Hooks/useThemeSwitch";
import { cx } from "@/src/utils";

const navButtons = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

const Nav = () => {
  const [mode, setMode] = useThemeSwitch();

  const toggleMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };
  return (
    <nav className="fixed right-1/2 top-6 z-50 hidden w-max translate-x-1/2 items-center rounded-full border border-solid border-dark bg-light/80 px-8 py-3 font-medium capitalize backdrop-blur-sm sm:flex">
      {navButtons.map(({ label, href }, index) => (
        <Link href={href} key={`${label}-${index}`} className="mx-2">
          {label}
        </Link>
      ))}
      <button
        onClick={toggleMode}
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
    </nav>
  );
};

export default Nav;
