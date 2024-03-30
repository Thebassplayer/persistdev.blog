"use client";
import { useState } from "react";
import { Email } from "../schemas/zod.schemas";

const useSubscription = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const subscribe = async (email: Email) => {
    try {
      setLoading(true);
      const response = await fetch("/api/subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(email),
      });
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
