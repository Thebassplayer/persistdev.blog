import { z } from "zod";

export const subscriptionSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),
});

export type SubscriptionSchema = z.infer<typeof subscriptionSchema>;
