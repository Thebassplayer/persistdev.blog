"use client";
import { SubmitHandler, useForm } from "react-hook-form";

type FormValues = {
  email: string;
};

const SuscriptionForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);
  return (
    <>
      <p className="mt-5 w-full px-4 text-center text-sm font-light dark:font-medium sm:w-3/5 sm:text-base">
        Subscribe to learn about new technology and updates.
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-4 mt-6 flex w-fit items-stretch rounded bg-light p-1 dark:bg-dark sm:min-w-[384px] sm:p-2"
      >
        <input
          type="email"
          placeholder="Enter your email"
          {...register("email", { required: true })}
          className="mr-2 w-full border-0 border-b bg-transparent pb-1 pl-2 text-sm text-dark focus:border-dark focus:ring-0 dark:text-light dark:focus:border-light sm:pl-0 sm:text-base"
        />

        <input
          type="submit"
          className="cursor-pointer rounded bg-dark px-3 py-1 text-sm font-medium text-light dark:bg-light dark:text-dark sm:px-5 md:text-base"
        />
      </form>
    </>
  );
};

export default SuscriptionForm;
