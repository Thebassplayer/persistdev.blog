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
  const onSubmit: SubmitHandler<FormValues> = data => console.log(data);
  return (
    <footer className="mt-16 rounded-2xl bg-dark dark:bg-accentDark/90 m-2 sm:m-10 flex flex-col items-center text-light dark:text-dark">
      <h3 className="mt-16 font-md text-center capitalize text-4xl px-2">
        Interesting Stories | Updates | Guides
      </h3>
      <p className="mt-5 px-4 text-center w-3/5 font-light text-base">
        Subscribe to learn about new technology and updates. Join over 5000+
        members community to stay up to date with latest news.
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 min-w-[384px] flex items-stretch bg-light p-2 rounded mx-4"
      >
        <input
          type="email"
          placeholder="Enter your email"
          {...register("email", { required: true })}
          className="w-full bg-transparent text-dark focus:border-dark focus:ring-0 border-0 border-b mr-2 pb-1"
        />

        <input
          type="submit"
          className="bg-dark text-light cursor-pointer font-medium rounded px-5 py-1"
        />
      </form>
      <div className="flex items-center mt-8">
        {socialLinks.map(({ label, href, svg }, index) => (
          <a
            href={href}
            key={`${label}-${index}`}
            className={`inline-block h-6 w-6 mr-4 ${
              label === "Github" ? "fill-light" : ""
            }`}
          >
            {svg}
          </a>
        ))}
      </div>
      <div className="w-full mt-16 relative font-medium border-t border-solid border-light py-6 px-8 flex flex-row items-center justify-between">
        <span className="text-center">
          &copy;2023 CodeBucks. All rights reserved.
        </span>
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
