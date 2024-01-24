"use client";
import Logo from "./Logo";
import { socialLinks } from "@/src/constants/SOCIAL_LINKS";
import Nav from "./Nav";
import { useState } from "react";

const Header = () => {
  const [click, setClick] = useState(false);

  const toggleHamburger = () => setClick(!click);
  return (
    <header className="w-full p-4 px-5 sm:px-10 flex items-center justify-between">
      <Logo />
      <button
        className="inline-block sm:hidden z-50 cursor-pointer"
        onClick={toggleHamburger}
      >
        <div className="w-6 transition-all ease duration-300">
          <div className="relative">
            <span
              className="absolute top-0 inline-block w-full h-0.5 bg-dark dark:bg-light rounded transition-all ease duration-200"
              style={{
                transform: click
                  ? "rotate(-45deg) translateY(0)"
                  : "rotate(0deg) translateY(6px)",
              }}
            >
              &nbsp;
            </span>
            <span
              className="absolute top-0 inline-block w-full h-0.5 bg-dark dark:bg-light rounded transition-all ease duration-200"
              style={{
                opacity: click ? 0 : 1,
              }}
            >
              &nbsp;
            </span>
            <span
              className="absolute top-0 inline-block w-full h-0.5 bg-dark dark:bg-light rounded transition-all ease duration-200"
              style={{
                transform: click
                  ? "rotate(45deg) translateY(0)"
                  : "rotate(0deg) translateY(-6px)",
              }}
            >
              &nbsp;
            </span>
          </div>
        </div>
      </button>
      <Nav />
      <div className="sm:flex items-center hidden">
        {socialLinks.map(({ label, href, svg }, index) => (
          <a
            href={href}
            key={`${label}-${index}`}
            className={`hover:scale-125 transition-all ease duration-200 inline-block h-6 w-6 mr-4 ${
              label === "Github" ? "fill-light" : ""
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
