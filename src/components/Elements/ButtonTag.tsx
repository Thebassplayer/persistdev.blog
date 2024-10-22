import { cx } from "@/src/utils/cx";
import Link from "next/link";
import React from "react";

type TagProps = {
  link?: string;
  name: string;
  className?: string;
};

const ButtonTag = ({ link = "#", name, ...props }: TagProps) => {
  const className = props.className ? props.className : "";

  return (
    <Link
      href={link}
      className={cx(
        "ease inline-block rounded-full border-2 border-solid border-light bg-dark px-6 py-2 text-sm font-semibold capitalize text-light duration-200 hover:scale-105 sm:px-10 sm:py-3 sm:text-base",
        className,
      )}
    >
      #{name}
    </Link>
  );
};

export default ButtonTag;
