import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { StoreRole, StoreStatus, StoreType } from "@prisma/client";
import { slugify } from "@/lib/slugify";

interface ProductInput {
  name: string;
  description?: string;
  price: number | string;
  category?: string;
  isEggless?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  images?: string[];
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "You must be signed in to create a bakery store." },
        { status: 401 }
      );
    }

    const body = await request.json();

    const {
      name,
      slug: rawSlug,
      storeType = "HOME_BAKER",
      description,
      logo,
      phone,
      contactEmail,
      address,
      city,
      state,
      pincode,
      latitude,
      longitude,
      deliveryRadiusKm = 10,
      isHomeBaker = true,
      about,
      specialties = [],
      workingDays = [],
      leadTimeHours = 24,
      instagram,
      facebook,
      whatsapp,
      website,
      products = [],
      publishImmediately = true,
    } = body;

    if (!name || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Store name is required." },
        { status: 400 }
      );
    }

    // Generate clean slug
    let finalSlug = slugify(rawSlug || name);
    if (!finalSlug || finalSlug.length < 3) {
      finalSlug = slugify(name);
    }

    // Check if slug is taken and auto-suffix if collision
    const existing = await prisma.store.findUnique({
      where: { slug: finalSlug },
    });

    if (existing) {
      finalSlug = `${finalSlug}-${Math.random().toString(36).substring(2, 6)}`;
    }

    // Map storeType string to Prisma enum
    const validStoreTypes: Record<string, StoreType> = {
      HOME_BAKER: StoreType.HOME_BAKER,
      BAKERY: StoreType.BAKERY,
      CAKE_SHOP: StoreType.CAKE_SHOP,
      CAFE: StoreType.CAFE,
      OTHER: StoreType.OTHER,
    };

    const enumStoreType = validStoreTypes[storeType] || StoreType.HOME_BAKER;

    // Create Store, StoreMember, and optional Products in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // 1. Create Store
      const createdStore = await tx.store.create({
        data: {
          name: name.trim(),
          slug: finalSlug,
          storeType: enumStoreType,
          status: publishImmediately ? StoreStatus.PUBLISHED : StoreStatus.DRAFT,
          description: description?.trim() || null,
          logo: logo?.trim() || null,
          phone: phone?.trim() || null,
          contactEmail: contactEmail?.trim() || session.user.email,
          address: address?.trim() || null,
          city: city?.trim() || null,
          state: state?.trim() || null,
          pincode: pincode?.trim() || null,
          latitude: latitude ? parseFloat(latitude) : null,
          longitude: longitude ? parseFloat(longitude) : null,
          deliveryRadiusKm: deliveryRadiusKm ? parseInt(String(deliveryRadiusKm), 10) : 10,
          isHomeBaker: Boolean(isHomeBaker),
          about: about?.trim() || null,
          specialties: Array.isArray(specialties) ? specialties : [],
          workingDays: Array.isArray(workingDays) ? workingDays : [],
          leadTimeHours: leadTimeHours ? parseInt(String(leadTimeHours), 10) : 24,
          instagram: instagram?.trim() || null,
          facebook: facebook?.trim() || null,
          whatsapp: whatsapp?.trim() || null,
          website: website?.trim() || null,
        },
      });

      // 2. Create Owner StoreMember
      await tx.storeMember.create({
        data: {
          userId: session.user.id,
          storeId: createdStore.id,
          role: StoreRole.OWNER,
        },
      });

      // 3. Create initial products if provided
      if (Array.isArray(products) && products.length > 0) {
        const validProducts = products.filter((p: ProductInput) => p.name && p.name.trim().length > 0);
        for (const p of validProducts) {
          const numPrice = typeof p.price === "string" ? parseFloat(p.price) || 0 : Number(p.price) || 0;
          await tx.product.create({
            data: {
              storeId: createdStore.id,
              name: p.name.trim(),
              description: p.description?.trim() || null,
              price: numPrice,
              category: p.category?.trim() || "Cakes",
              isEggless: Boolean(p.isEggless),
              isVegan: Boolean(p.isVegan),
              isGlutenFree: Boolean(p.isGlutenFree),
              images: Array.isArray(p.images) ? p.images : [],
              isAvailable: true,
            },
          });
        }
      }

      return createdStore;
    });

    return NextResponse.json({
      success: true,
      store: result,
      url: `/${result.slug}`,
    });
  } catch (error) {
    console.error("Error creating store:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while creating your store." },
      { status: 500 }
    );
  }
}
