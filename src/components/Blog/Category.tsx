import { cx } from "@/src/utils";
import Link from "next/link";
import React from "react";

type CategoryProps = {
  link: string;
  name: string;
  active: boolean;
  className?: string;
};

const Category = ({ link = "#", name, active, ...props }: CategoryProps) => {
  const className = props.className ? props.className : "";

  return (
    <Link
      href={link}
      className={cx(
        "ease m-1 inline-block rounded-full border-2 border-solid border-dark bg-dark px-3 py-1 text-xs transition-transform duration-200 hover:scale-105 sm:m-2 sm:px-4 sm:text-sm md:px-5 md:py-2 lg:px-6 lg:text-base",
        className,
        active
          ? "bg-dark text-light dark:border-light dark:bg-light dark:text-dark"
          : "bg-light text-dark dark:border-light dark:bg-dark dark:text-light",
      )}
    >
      #{name}
    </Link>
  );
};

export default Category;
