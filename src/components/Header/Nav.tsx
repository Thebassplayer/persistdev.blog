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
    <nav className="w-max py-3 px-8 border border-solid border-dark rounded-full font-medium capitalize hidden sm:flex items-center fixed top-6 right-1/2 translate-x-1/2 bg-light/80 backdrop-blur-sm z-50">
      {navButtons.map(({ label, href }, index) => (
        <Link href={href} key={`${label}-${index}`} className="mx-2">
          {label}
        </Link>
      ))}
      <button
        onClick={toggleMode}
        className={cx(
          "w-6 h-6 ease ml-2 flex items-center justify-center rounded-full p-1",
          mode === "light" ? "bg-dark text-light" : "bg-light text-dark"
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
