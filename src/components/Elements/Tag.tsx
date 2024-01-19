import { cx } from "@/src/utils";
import Link from "next/link";
import React from "react";

type TagProps = {
  link?: string;
  name: string;
  className?: string;
};

const Tag = ({ link = "#", name, ...props }: TagProps) => {
  const className = props.className ? props.className : "";

  return (
    <Link
      href={link}
      className={cx(
        "inline-block py-3 px-10 bg-dark text-light rounded-full capitalize font-semibold border-solid border-light border-2 hover:scale-105 ease duration-200",
        className
      )}
    >
      {name}
    </Link>
  );
};

export default Tag;
