"use client";
import useSubscription from "@/src/Hooks/useSubscription";
import { SubmitHandler, useForm } from "react-hook-form";

type FormValues = {
  email: string;
};

const SuscriptionForm = () => {
  const { subscribe, loading, success, error, subscribeButtonValue } =
    useSubscription();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => subscribe(data);
  return (
    <>
      <p className="mt-5 w-full px-4 text-center text-sm font-light dark:font-medium sm:w-3/5 sm:text-base">
        Subscribe to learn about new technology and updates.
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 flex w-fit items-stretch rounded bg-light dark:bg-dark sm:min-w-[384px] sm:p-2"
      >
        <input
          type="email"
          placeholder="Enter your email"
          {...register("email", { required: true })}
          className="mr-2 w-full border-0 border-b bg-transparent pb-1 pl-2 text-sm text-dark focus:border-dark focus:ring-0 dark:text-light dark:focus:border-light sm:pl-0"
        />
        (
        <input
          type="submit"
          value={subscribeButtonValue({ loading, success, error })}
          disabled={loading || success || error}
          className="my-1 cursor-pointer rounded bg-dark px-3 text-sm font-medium text-light dark:bg-light dark:text-dark sm:my-0"
        />
        )
      </form>
    </>
  );
};

export default SuscriptionForm;
