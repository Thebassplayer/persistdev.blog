import { prisma } from "@/src/app/api/utils/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  console.log("GET /api/views");
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  try {
    const view = await prisma.views.findUnique({
      where: { slug },
    });
    const count = view ? view.count : 0;
    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    console.error("Error fetching views:", error);
    return NextResponse.json(
      { error: "Failed to fetch views" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  const { slug } = await req.json();

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  try {
    const view = await prisma.views.upsert({
      where: { slug },
      update: { count: { increment: 1 } },
      create: { slug, count: 1 },
    });
    return NextResponse.json({ count: view.count }, { status: 200 });
  } catch (error) {
    console.error("Error incrementing views:", error);
    return NextResponse.json(
      { error: "Failed to increment views" },
      { status: 500 },
    );
  }
}
