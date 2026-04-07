import { prisma } from "@/src/app/api/utils/prisma/prisma";
import { NextResponse } from "next/server";

const VIEWS_FALLBACK_RESPONSE = { count: 0, disabled: true };

export async function GET(req: Request) {
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
    console.warn("Views lookup unavailable, returning fallback count.", error);
    return NextResponse.json(VIEWS_FALLBACK_RESPONSE, { status: 200 });
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
    console.warn("Views increment unavailable, returning fallback count.", error);
    return NextResponse.json(VIEWS_FALLBACK_RESPONSE, { status: 200 });
  }
}
