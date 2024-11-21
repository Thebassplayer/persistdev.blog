"use client";
import Logo from "./Logo";
import { socialLinks } from "@/src/constants/SOCIAL_LINKS";
import { useState } from "react";
import Link from "next/link";
import useThemeSwitch from "@/src/Hooks/useThemeSwitch";
import ThemeButton from "./ThemeButton";
import Hamburger from "./Hamburger";
import Search from "../Search/Search";
import { allPosts } from "contentlayer/generated";

const Header = () => {
  const [theme, setTheme] = useThemeSwitch();
  const [showNavBar, setShowNavBar] = useState(false);

  const toggle = () => {
    setShowNavBar(!showNavBar);
  };
  return (
    <header className="sticky top-0 z-50 flex h-20 w-full items-center justify-between px-6 py-4 backdrop-blur-sm sm:px-10 sm:py-12">
      <Logo showNavBar={showNavBar} />
      <Hamburger showNavBar={showNavBar} toggle={toggle} />

      <nav
        className="ease fixed right-1/2 top-6 z-50 flex w-max translate-x-1/2 items-center rounded-full  border border-solid border-dark
        bg-light/80 px-4 py-2 font-medium capitalize backdrop-blur-sm transition-all duration-300 sm:hidden
        sm:px-8 md:px-6 md:py-3"
        style={{
          top: showNavBar ? "1rem" : "-5rem",
        }}
      >
        <Link href="/" className="mr-2 text-sm md:text-base">
          Home
        </Link>
        <Link href="/about" className="mx-2 text-sm md:text-base">
          About
        </Link>
        <Search />
        <ThemeButton theme={theme} setTheme={setTheme} />
      </nav>

      <nav
        className=" fixed right-1/2 top-6 z-50 hidden w-max translate-x-1/2 items-center rounded-full border border-solid border-dark
        bg-light/80 px-8 py-3 font-medium capitalize backdrop-blur-sm sm:flex"
      >
        <Link href="/" className="mr-2">
          Home
        </Link>
        <Link href="/about" className="mx-2">
          About
        </Link>
        <Search />
        <ThemeButton theme={theme} setTheme={setTheme} />
      </nav>
      <div className="hidden items-center sm:flex">
        {socialLinks.map(({ label, href, svg }, index) => (
          <a
            href={href}
            key={`${label}-${index}`}
            className={`ease mr-4 inline-block h-6 w-6 transition-transform duration-200 hover:scale-125 ${
              label === "Github" ? "fill-dark dark:fill-light" : ""
            }`}
          >
            {svg}
          </a>
        ))}
      </div>
    </header>
  );
};

export default Header;
