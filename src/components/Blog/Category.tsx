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
        "inline-block py-2 px-10 bg-dark text-light rounded-full  border-solid border-dark border-2 hover:scale-105 ease duration-200 m-2",
        className,
        active ? "bg.dark text-light" : "bg-light text-dark"
      )}
    >
      #{name}
    </Link>
  );
};

export default Category;
