import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { slugify, RESERVED_SLUGS } from "@/lib/slugify";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const rawSlug = searchParams.get("slug");

    if (!rawSlug) {
      return NextResponse.json(
        { available: false, message: "Slug is required" },
        { status: 400 }
      );
    }

    const cleanSlug = slugify(rawSlug);

    if (!cleanSlug || cleanSlug.length < 3) {
      return NextResponse.json({
        available: false,
        slug: cleanSlug,
        message: "Slug must be at least 3 characters",
      });
    }

    if (RESERVED_SLUGS.has(cleanSlug)) {
      return NextResponse.json({
        available: false,
        slug: cleanSlug,
        message: "This URL handle is reserved by the system",
      });
    }

    const existingStore = await prisma.store.findUnique({
      where: { slug: cleanSlug },
      select: { id: true },
    });

    if (existingStore) {
      return NextResponse.json({
        available: false,
        slug: cleanSlug,
        message: "This store URL is already taken",
      });
    }

    return NextResponse.json({
      available: true,
      slug: cleanSlug,
      message: "Store URL is available",
    });
  } catch (error) {
    console.error("Error checking slug:", error);
    return NextResponse.json(
      { available: false, message: "Failed to check slug availability" },
      { status: 500 }
    );
  }
}
