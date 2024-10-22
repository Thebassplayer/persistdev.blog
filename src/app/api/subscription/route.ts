import { subscriptionSchema } from "@/src/schemas/zod.schemas";
import { sendEmail } from "../utils/sendgrid";
import { prisma } from "@/src/app/api/utils/prisma/prisma";

export const POST = async (req: Request) => {
  const body = await req.json();
  try {
    const validBody = subscriptionSchema.safeParse(body);

    if (!validBody.success) {
      throw new Error(validBody.error.errors[0].message);
    }

    const email = validBody.data.email;

    const emailAlreadySubscribed = await prisma.subscription.findUnique({
      where: {
        email,
      },
    });

    if (emailAlreadySubscribed) {
      throw new Error("Subscription already exists");
    }

    const subscriptionSuccess = await prisma.subscription.create({
      data: {
        email,
      },
    });

    if (!subscriptionSuccess) {
      throw new Error("Subscription error");
    }

    await sendEmail(email, "Test Email", "This is a test email from Next.js!");

    return new Response(JSON.stringify("Subscription created"), {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify(`${error}`), {
      status: 500,
    });
  }
};
