"use client";
import { useState } from "react";
import { SubscriptionSchema } from "../schemas/zod.schemas";

if (!process.env.NEXT_PUBLIC_SUBSCRIPTION_API) {
  throw new Error("NEXT_PUBLIC_SUBSCRIPTION_API is not defined");
}

const useSubscription = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const subscribe = async (data: SubscriptionSchema) => {
    try {
      setLoading(true);
      const response = await fetch(
        process.env.NEXT_PUBLIC_SUBSCRIPTION_API as string,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );
      if (!response.ok) {
        setLoading(false);
        setError(true);
      } else {
        setLoading(false);
        setSuccess(true);
      }
    } catch (error) {
      setLoading(false);
      setSuccess(false);
      setError(true);
    }
  };

  const subscribeButtonValue = ({
    loading,
    success,
    error,
  }: {
    loading: boolean;
    success: boolean;
    error: boolean;
  }) => {
    if (loading) {
      return "Loading...";
    } else if (success) {
      return "Subscribed!";
    } else if (error) {
      return "Failed to subscribe";
    } else {
      return "Subscribe";
    }
  };

  return { subscribe, loading, error, success, subscribeButtonValue };
};

export default useSubscription;
