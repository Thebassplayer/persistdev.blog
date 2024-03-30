import { subscriptionSchema } from "@/src/schemas/zod.schemas";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (req: Request) => {
  const body = await req.json();
  try {
    const validBody = subscriptionSchema.safeParse(body);

    if (!validBody.success) {
      throw new Error(validBody.error.errors[0].message);
    }

    const emailAlreadySubscribed = await prisma.subscription.findUnique({
      where: {
        email: validBody.data.email,
      },
    });

    if (emailAlreadySubscribed) {
      throw new Error("Subscription already exists");
    }

    await prisma.subscription.create({
      data: {
        email: validBody.data.email,
      },
    });

    return new Response(JSON.stringify("Subscription created"), {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify("Subscription error"), {
      status: 500,
    });
  }
};
