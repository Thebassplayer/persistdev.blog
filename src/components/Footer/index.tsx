import Link from "next/link";
import React from "react";
import SuscriptionForm from "./SuscriptionForm";
import SocialLinks from "./SocialLinks";

const Footer = () => {
  return (
    <footer className="m-5 mt-8 flex flex-col items-center rounded-md bg-dark text-light dark:bg-accentDark/90 dark:text-dark sm:m-10 sm:mt-16">
      <h3 className="font-md mt-6 px-2 text-center text-2xl capitalize  dark:font-bold sm:mt-8 sm:text-3xl lg:text-4xl">
        Interesting Stories | Updates | Guides
      </h3>
      <SuscriptionForm />
      <SocialLinks />
      <div className="relative mt-8 flex w-full flex-col items-center justify-between border-t border-solid border-light px-8 py-2 font-medium dark:border-dark md:flex-row">
        <span className="text-center text-xs md:text-base">
          &copy;2024 3R. All rights reserved.
        </span>
        <Link
          href="/sitemap.xml"
          className="py-4 text-center text-xs underline md:py-0 md:text-base"
        >
          sitemap.xml
        </Link>
        <div className="text-center text-xs md:text-base">
          Made by{" "}
          <Link
            href="https://roylopez.dev"
            className="text-xs underline md:text-base"
          >
            Roy Lopez
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
