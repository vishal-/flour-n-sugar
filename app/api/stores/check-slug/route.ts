import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { slugify, isValidSlug } from "@/lib/slugify";

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

    const validation = isValidSlug(cleanSlug);
    if (!validation.valid) {
      return NextResponse.json({
        available: false,
        slug: cleanSlug,
        message: validation.error || "Invalid slug format",
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
