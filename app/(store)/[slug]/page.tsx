import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  SugarDustTemplate,
  WarmCrustTemplate,
  HoneyDripTemplate,
} from "@/templates/storefront";
import { StoreFrontTheme } from "@prisma/client";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const store = await prisma.store.findUnique({
    where: { slug },
    select: {
      name: true,
      description: true,
      city: true,
      logo: true,
      coverImage: true,
    },
  });

  if (!store) {
    return {
      title: "Store Not Found | Flour n Sugar",
      description: "The requested bakery store could not be found.",
    };
  }

  const title = `${store.name} | Flour n Sugar`;
  const description =
    store.description ||
    `Order fresh handmade cakes, pastries, and treats from ${store.name}${store.city ? ` in ${store.city}` : ""}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: store.coverImage || store.logo ? [store.coverImage || store.logo || ""] : [],
    },
  };
}

export default async function StoreHomePage({ params }: PageProps) {
  const { slug } = await params;

  const store = await prisma.store.findUnique({
    where: { slug },
    include: {
      products: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!store) {
    notFound();
  }

  if (store.theme === StoreFrontTheme.SUGAR_DUST) {
    return <SugarDustTemplate store={store} />;
  }

  if (
    store.theme === StoreFrontTheme.HONEY_DRIP ||
    store.theme === StoreFrontTheme.BUTTER_SOFT ||
    store.theme === StoreFrontTheme.GOLDEN_BAKE ||
    store.theme === StoreFrontTheme.FLOUR_CLOUD ||
    store.theme === StoreFrontTheme.PROOFING
  ) {
    return <HoneyDripTemplate store={store} />;
  }

  return <WarmCrustTemplate store={store} />;
}