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
  const onSubmit: SubmitHandler<FormValues> = data => console.log(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 w-full flex flex-col items-center justify-center"
    >
      <input
        type="text"
        placeholder="name"
        {...register("name", { required: true })}
        className="w-[20rem] bg-transparent text-dark focus:border-dark focus:ring-0 border-0 border-b mr-2 pb-1"
      />
      <input
        type="email"
        placeholder="email"
        {...register("email", { required: true })}
        className="w-[20rem] bg-transparent text-dark focus:border-dark focus:ring-0 border-0 border-b mr-2 pb-1"
      />

      <input
        type="submit"
        className="bg-dark text-light cursor-pointer font-medium rounded px-5 py-1 mt-6"
      />
    </form>
  );
};

export default ContactForm;
