import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { StoreFrontTheme, STOREFRONT_THEMES, StoreRole } from "@/types";

export async function PATCH(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { theme } = await req.json();

    if (!theme || !STOREFRONT_THEMES.includes(theme as StoreFrontTheme)) {
      return NextResponse.json({ error: "Invalid theme value" }, { status: 400 });
    }

    // Find the store managed by the user
    const membership = await prisma.storeMember.findFirst({
      where: {
        userId: session.user.id,
        role: { in: [StoreRole.OWNER, StoreRole.MANAGER, StoreRole.STAFF] },
      },
      include: { store: true },
    });

    if (!membership?.store) {
      return NextResponse.json(
        { error: "Store not found or insufficient permissions" },
        { status: 404 }
      );
    }

    const updatedStore = await prisma.store.update({
      where: { id: membership.store.id },
      data: { theme: theme as StoreFrontTheme },
      select: { id: true, name: true, slug: true, theme: true },
    });

    return NextResponse.json({ success: true, store: updatedStore });
  } catch (error) {
    console.error("Failed to update store theme:", error);
    return NextResponse.json(
      { error: "Internal server error updating store theme" },
      { status: 500 }
    );
  }
}
