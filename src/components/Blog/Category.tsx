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
        "ease m-2 inline-block rounded-full border-2 border-solid  border-dark bg-dark px-10 py-2 duration-200 hover:scale-105",
        className,
        active ? "bg.dark text-light" : "bg-light text-dark",
      )}
    >
      #{name}
    </Link>
  );
};

export default Category;
