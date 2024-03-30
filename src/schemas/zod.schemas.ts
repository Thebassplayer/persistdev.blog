import { z } from "zod";

export const subscriptionSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email address"),
});

export type SubscriptionSchema = z.infer<typeof subscriptionSchema>;
