import React from "react";

type HamburgerProps = {
  showNavBar: boolean;
  toggle: () => void;
};

const Hamburger = ({ showNavBar, toggle }: HamburgerProps): JSX.Element => {
  return (
    <button
      className="z-50 mr-2 inline-block sm:hidden"
      onClick={toggle}
      aria-label="Hamburger Menu"
    >
      <div className="ease w-6 cursor-pointer transition-transform duration-300">
        <div className="relative">
          <span
            className="ease  absolute top-0 inline-block h-0.5 w-full rounded bg-dark shadow-[rgba(0,_0,_0,_0)_0px_0px_8px] shadow-light transition-transform duration-200 dark:bg-light"
            style={{
              transform: showNavBar
                ? "rotate(-45deg) translateY(0)"
                : "rotate(0deg) translateY(6px)",
            }}
          >
            &nbsp;
          </span>
          <span
            className="ease  absolute top-0 inline-block h-0.5 w-full rounded bg-dark shadow-[rgba(0,_0,_0,_0)_0px_0px_8px] shadow-light transition-transform duration-200 dark:bg-light"
            style={{
              opacity: showNavBar ? 0 : 1,
            }}
          >
            &nbsp;
          </span>
          <span
            className="ease  absolute top-0 inline-block h-0.5 w-full rounded bg-dark shadow-[rgba(0,_0,_0,_0)_0px_0px_8px] shadow-light transition-transform duration-200 dark:bg-light"
            style={{
              transform: showNavBar
                ? "rotate(45deg) translateY(0)"
                : "rotate(0deg) translateY(-6px)",
            }}
          >
            &nbsp;
          </span>
        </div>
      </div>
    </button>
  );
};

export default Hamburger;
