import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import {
  PRODUCT_CATEGORY_MAP,
  categoryToSlug,
} from "@/lib/categories";
import { NotoIcon } from "@/components/ui/NotoIcon";
import { DietaryIcon } from "@/components/ui/DietaryIcon";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const subcategory = await prisma.subcategory.findFirst({
    where: {
      slug,
      isActive: true,
    },
  });

  if (!subcategory) {
    return {
      title: "Bake Variety Not Found | Flour n Sugar",
    };
  }

  const categoryInfo = PRODUCT_CATEGORY_MAP[subcategory.category];

  return {
    title: `${subcategory.name} - ${categoryInfo?.shortLabel || "Bakes"} | Flour n Sugar`,
    description:
      subcategory.description ||
      `Explore freshly handcrafted ${subcategory.name.toLowerCase()} from local artisan home bakers and cake studios on Flour n Sugar.`,
  };
}

export default async function SubcategoryPage({ params }: PageProps) {
  const { slug } = await params;

  // Fetch subcategory with its products
  const subcategory = await prisma.subcategory.findFirst({
    where: {
      slug,
      isActive: true,
    },
    include: {
      catalogProducts: {
        where: {
          isActive: true,
        },
        orderBy: {
          sortOrder: "asc",
        },
      },
    },
  });

  if (!subcategory) {
    notFound();
  }

  const categoryInfo = PRODUCT_CATEGORY_MAP[subcategory.category];
  const parentCategorySlug = categoryToSlug(subcategory.category);

  // Fetch sibling subcategories in the same parent category
  const siblingSubcategories = await prisma.subcategory.findMany({
    where: {
      category: subcategory.category,
      isActive: true,
      id: {
        not: subcategory.id,
      },
    },
    include: {
      _count: {
        select: {
          catalogProducts: true,
        },
      },
    },
    orderBy: {
      sortOrder: "asc",
    },
    take: 6,
  });

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Top Banner Navigation */}
      <div className="border-b border-rose-100/60 bg-white/70 backdrop-blur-sm sticky top-[61px] z-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between">
          <Link
            href={`/treats/${parentCategorySlug}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-dark-brown/70 hover:text-primary transition"
          >
            <span>←</span>
            <span>All {categoryInfo?.shortLabel || "Treats"}</span>
          </Link>

          <span className="text-xs font-semibold text-dark-brown/50">
            {subcategory.catalogProducts.length} {subcategory.catalogProducts.length === 1 ? "Item" : "Items"} in this variety
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-dark-brown/60 mb-6 flex-wrap" aria-label="Breadcrumb">
          <Link href="/home" className="hover:text-primary transition">
            Home
          </Link>
          <span>/</span>
          <Link href="/treats/cakes" className="hover:text-primary transition">
            Treats
          </Link>
          <span>/</span>
          {categoryInfo && (
            <>
              <Link href={`/treats/${parentCategorySlug}`} className="hover:text-primary transition">
                {categoryInfo.shortLabel}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="font-semibold text-dark-brown">{subcategory.name}</span>
        </nav>

        {/* Hero Header Card */}
        <div className="rounded-3xl bg-gradient-to-br from-rose-50/90 via-white to-amber-50/40 p-6 sm:p-10 border border-rose-100/80 shadow-xs mb-10 overflow-hidden relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                {categoryInfo && (
                  <Link
                    href={`/treats/${parentCategorySlug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-rose-100 text-xs font-bold text-primary shadow-2xs hover:bg-rose-50 transition"
                  >
                    <NotoIcon icon={categoryInfo.icon} size={15} />
                    <span>{categoryInfo.shortLabel}</span>
                  </Link>
                )}
                <span className="px-2.5 py-0.5 rounded-full bg-dark-brown/5 text-dark-brown/60 text-xs font-semibold">
                  Sub-Category
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-dark-brown tracking-tight">
                {subcategory.name}
              </h1>

              {subcategory.description && (
                <p className="text-sm sm:text-base text-dark-brown/75 max-w-xl leading-relaxed">
                  {subcategory.description}
                </p>
              )}

              <div className="pt-2 flex items-center gap-3">
                <Link
                  href="/home"
                  className="inline-flex items-center gap-2 rounded-xl bg-dark-brown px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-dark-brown-light transition"
                >
                  <span>Find Local Bakers</span>
                  <span>→</span>
                </Link>
                <Link
                  href={`/treats/${parentCategorySlug}`}
                  className="rounded-xl border border-rose-200 bg-white px-4 py-2 text-xs font-bold text-dark-brown hover:bg-rose-50/50 transition"
                >
                  View All {categoryInfo?.shortLabel}
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative h-48 md:h-56 w-full rounded-2xl overflow-hidden shadow-xs border border-rose-100 bg-rose-50">
              {subcategory.image ? (
                <Image
                  src={subcategory.image}
                  alt={subcategory.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-dark-brown/30">
                  {categoryInfo && <NotoIcon icon={categoryInfo.icon} size={64} />}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Catalog Items / Bakes in this Subcategory */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-serif text-2xl font-bold text-dark-brown">
                {subcategory.name} Menu & Inspiration
              </h2>
              <p className="text-xs sm:text-sm text-dark-brown/60 mt-0.5">
                Popular preparations and classics crafted by community bakers
              </p>
            </div>
          </div>

          {subcategory.catalogProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {subcategory.catalogProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col rounded-2xl bg-white border border-rose-100/80 shadow-xs overflow-hidden hover:shadow-md transition"
                >
                  <div className="relative h-48 w-full bg-rose-50 overflow-hidden">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-rose-50 text-dark-brown/30">
                        {categoryInfo && <NotoIcon icon={categoryInfo.icon} size={40} />}
                      </div>
                    )}
                    <div className="absolute top-2.5 left-2.5">
                      <DietaryIcon vegetarian={product.isEggless} size={18} />
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-serif text-base font-bold text-dark-brown">
                          {product.name}
                        </h3>
                        {product.suggestedPrice && (
                          <span className="text-xs font-bold text-primary shrink-0">
                            ₹{Number(product.suggestedPrice)}
                          </span>
                        )}
                      </div>

                      {product.description && (
                        <p className="text-xs text-dark-brown/65 mt-1.5 line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-rose-50 flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-1.5">
                        {product.isEggless && (
                          <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold text-[10px]">
                            Eggless
                          </span>
                        )}
                        {product.isVegan && (
                          <span className="px-1.5 py-0.5 rounded bg-lime-50 text-lime-700 font-semibold text-[10px]">
                            Vegan
                          </span>
                        )}
                        {product.isGlutenFree && (
                          <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 font-semibold text-[10px]">
                            Gluten-Free
                          </span>
                        )}
                      </div>

                      <Link
                        href="/home"
                        className="font-bold text-primary hover:underline text-xs"
                      >
                        Order from Bakers
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl bg-white p-8 text-center border border-rose-100 text-dark-brown/60 space-y-2">
              <p className="text-sm font-semibold">No catalog items listed yet for {subcategory.name}.</p>
              <p className="text-xs">Local bakers can still create custom bakes in this style.</p>
            </div>
          )}
        </section>

        {/* Sibling Subcategories in the Same Category */}
        {siblingSubcategories.length > 0 && (
          <section className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-dark-brown">
                  More in {categoryInfo?.shortLabel || "This Category"}
                </h2>
                <p className="text-xs sm:text-sm text-dark-brown/60 mt-0.5">
                  Explore other specialty varieties within {categoryInfo?.label}
                </p>
              </div>
              {categoryInfo && (
                <Link
                  href={`/treats/${parentCategorySlug}`}
                  className="text-xs font-bold text-primary hover:underline"
                >
                  View All →
                </Link>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {siblingSubcategories.map((sibling) => (
                <Link
                  key={sibling.id}
                  href={`/bakes/${sibling.slug}`}
                  className="group flex items-center gap-4 rounded-2xl bg-white p-3.5 border border-rose-100/80 shadow-xs hover:shadow-md hover:border-primary/40 transition"
                >
                  <div className="relative h-16 w-16 rounded-xl overflow-hidden bg-rose-50 shrink-0">
                    {sibling.image ? (
                      <Image
                        src={sibling.image}
                        alt={sibling.name}
                        fill
                        sizes="64px"
                        className="object-cover group-hover:scale-105 transition duration-300"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-dark-brown/30">
                        {categoryInfo && <NotoIcon icon={categoryInfo.icon} size={24} />}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-serif text-sm font-bold text-dark-brown group-hover:text-primary transition truncate">
                      {sibling.name}
                    </h3>
                    <p className="text-xs text-dark-brown/60 line-clamp-1 mt-0.5">
                      {sibling.description || "Discover bakes & recipes"}
                    </p>
                    <span className="text-[10px] font-semibold text-primary/80 mt-1 inline-block">
                      {sibling._count.catalogProducts} items →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Join as Baker CTA Banner */}
        <section className="rounded-3xl bg-gradient-to-br from-dark-brown to-dark-brown-light text-white p-8 sm:p-10 text-center relative overflow-hidden shadow-lg">
          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-rose-200 text-xs font-bold tracking-wide">
              For Bakers & Creators
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">
              Specialized in {subcategory.name.toLowerCase()}?
            </h3>
            <p className="text-xs sm:text-sm text-rose-100/80 leading-relaxed">
              Showcase your custom menu, accept pre-orders with ease, and let food lovers in your locality find your signature bakes.
            </p>
            <div className="pt-2">
              <Link
                href="/onboarding"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-primary-hover transition"
              >
                <span>Join Flour n Sugar as a Baker</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
