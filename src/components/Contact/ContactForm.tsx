"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormValues = {
  name: string;
  email: string;
};

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 flex w-full flex-col items-center justify-center"
    >
      <input
        type="text"
        placeholder="name"
        {...register("name", { required: true })}
        className="mr-2 w-[20rem] border-0 border-b bg-transparent pb-1 text-dark focus:border-dark focus:ring-0"
      />
      <input
        type="email"
        placeholder="email"
        {...register("email", { required: true })}
        className="mr-2 w-[20rem] border-0 border-b bg-transparent pb-1 text-dark focus:border-dark focus:ring-0"
      />

      <input
        type="submit"
        className="mt-6 cursor-pointer rounded bg-dark px-5 py-1 font-medium text-light"
      />
    </form>
  );
};

export default ContactForm;
