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
        "ease inline-block rounded-full border-2 border-solid border-light bg-dark px-10 py-3 font-semibold capitalize text-light duration-200 hover:scale-105",
        className,
      )}
    >
      {name}
    </Link>
  );
};

export default Tag;
