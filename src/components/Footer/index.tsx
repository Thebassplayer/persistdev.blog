"use client";
import { socialLinks } from "@/src/constants/SOCIAL_LINKS";
import Link from "next/link";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormValues = {
  email: string;
};

const Footer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);
  return (
    <footer className="m-2 mt-16 flex flex-col items-center rounded-2xl bg-dark text-light dark:bg-accentDark/90 dark:text-dark sm:m-10">
      <h3 className="font-md mt-16 px-2 text-center text-2xl  capitalize dark:font-bold sm:text-3xl lg:text-4xl">
        Interesting Stories | Updates | Guides
      </h3>
      <p className="mt-5 w-full px-4 text-center text-sm font-light sm:w-3/5 sm:text-base">
        Subscribe to learn about new technology and updates. Join over 5000+
        members community to stay up to date with latest news.
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-4 mt-6 flex w-fit items-stretch rounded bg-light pt-1 sm:min-w-[384px] sm:p-2"
      >
        <input
          type="email"
          placeholder="Enter your email"
          {...register("email", { required: true })}
          className="mr-2 w-full border-0 border-b bg-transparent pb-1 text-dark focus:border-dark focus:ring-0"
        />

        <input
          type="submit"
          className="cursor-pointer rounded bg-dark px-3 py-1 font-medium text-light sm:px-5"
        />
      </form>
      <div className="mt-8 flex items-center">
        {socialLinks.map(({ label, href, svg }, index) => (
          <a
            href={href}
            key={`${label}-${index}`}
            className={`mr-4 inline-block h-6 w-6 transition-transform duration-200 hover:scale-125 ${
              label === "Github" ? "fill-light dark:fill-dark" : ""
            }`}
          >
            {svg}
          </a>
        ))}
      </div>
      <div className="relative mt-16 flex w-full flex-row items-center justify-between border-t border-solid border-light px-8 py-6 font-medium">
        <span className="text-center">&copy;2024 3R. All rights reserved.</span>
        <Link href="/sitemap.xml" className="text-center underline">
          sitemap.xml
        </Link>
        <div className="text-center">
          Made with &hearts; by{" "}
          <a href="https//roylopez.dev" className="underline">
            Roy Lopez
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
