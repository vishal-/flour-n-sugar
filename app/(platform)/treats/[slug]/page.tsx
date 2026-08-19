import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import {
  PRODUCT_CATEGORY_LIST,
  getCategoryInfoBySlug,
  slugToCategory,
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
  const categoryInfo = getCategoryInfoBySlug(slug);

  if (!categoryInfo) {
    return {
      title: "Category Not Found | Flour n Sugar",
    };
  }

  return {
    title: `${categoryInfo.label} | Flour n Sugar`,
    description: `Discover artisanal ${categoryInfo.shortLabel.toLowerCase()} and bakery specialties from passionate local bakers on Flour n Sugar. ${categoryInfo.description}`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const categoryEnum = slugToCategory(slug);

  if (!categoryEnum) {
    notFound();
  }

  const categoryInfo = getCategoryInfoBySlug(slug)!;

  // Fetch subcategories for this category
  const subcategories = await prisma.subcategory.findMany({
    where: {
      category: categoryEnum,
      isActive: true,
    },
    include: {
      _count: {
        select: {
          catalogProducts: true,
          storeProducts: true,
        },
      },
    },
    orderBy: {
      sortOrder: "asc",
    },
  });

  // Fetch catalog products for this category
  const catalogProducts = await prisma.catalogProduct.findMany({
    where: {
      category: categoryEnum,
      isActive: true,
    },
    include: {
      subcategory: true,
    },
    orderBy: {
      sortOrder: "asc",
    },
  });

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Category Pills Bar */}
      <section className="border-b border-rose-100/60 bg-white/70 backdrop-blur-sm sticky top-[61px] z-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2.5 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 min-w-max">
            {PRODUCT_CATEGORY_LIST.map((cat) => {
              const isActive = cat.value === categoryEnum;
              return (
                <Link
                  key={cat.value}
                  href={`/treats/${cat.slug}`}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                    isActive
                      ? "bg-dark-brown text-white shadow-xs"
                      : "bg-rose-50/60 text-dark-brown/70 hover:bg-rose-100/80 hover:text-dark-brown"
                  }`}
                >
                  <NotoIcon icon={cat.icon} size={15} />
                  <span>{cat.shortLabel}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-dark-brown/60 mb-6" aria-label="Breadcrumb">
          <Link href="/home" className="hover:text-primary transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-dark-brown/40">Treats</span>
          <span>/</span>
          <span className="font-semibold text-dark-brown">{categoryInfo.shortLabel}</span>
        </nav>

        {/* Hero Header */}
        <div className="rounded-3xl bg-gradient-to-br from-rose-50/80 via-white to-orange-50/40 p-6 sm:p-10 border border-rose-100/80 shadow-xs mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-rose-100 text-xs font-bold text-primary shadow-2xs">
                <NotoIcon icon={categoryInfo.icon} size={16} />
                <span>Platform Category</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-dark-brown tracking-tight">
                {categoryInfo.label}
              </h1>
              <p className="text-sm sm:text-base text-dark-brown/70 leading-relaxed">
                {categoryInfo.description}
              </p>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
              <div className="rounded-2xl bg-white/90 p-4 border border-rose-100/80 text-center min-w-[110px] shadow-2xs">
                <span className="block font-serif text-2xl font-bold text-primary">
                  {subcategories.length}
                </span>
                <span className="text-[11px] font-semibold text-dark-brown/60 uppercase tracking-wider">
                  Varieties
                </span>
              </div>
              <div className="rounded-2xl bg-white/90 p-4 border border-rose-100/80 text-center min-w-[110px] shadow-2xs">
                <span className="block font-serif text-2xl font-bold text-dark-brown">
                  {catalogProducts.length}
                </span>
                <span className="text-[11px] font-semibold text-dark-brown/60 uppercase tracking-wider">
                  Treats Listed
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Subcategories Section */}
        {subcategories.length > 0 && (
          <section className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-dark-brown">
                  Explore {categoryInfo.shortLabel} Varieties
                </h2>
                <p className="text-xs sm:text-sm text-dark-brown/60 mt-0.5">
                  Choose a style to discover recipes, details, and local bakery offerings
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {subcategories.map((sub) => (
                <Link
                  key={sub.id}
                  href={`/bakes/${sub.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-rose-100/80 shadow-xs hover:shadow-md hover:border-primary/40 transition duration-200"
                >
                  <div className="relative h-44 w-full bg-rose-50 overflow-hidden">
                    {sub.image ? (
                      <Image
                        src={sub.image}
                        alt={sub.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-rose-50 text-dark-brown/30">
                        <NotoIcon icon={categoryInfo.icon} size={48} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <span className="absolute bottom-2.5 right-2.5 rounded-full bg-white/90 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-bold text-dark-brown">
                      {sub._count.catalogProducts} items
                    </span>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-base font-bold text-dark-brown group-hover:text-primary transition">
                        {sub.name}
                      </h3>
                      {sub.description && (
                        <p className="text-xs text-dark-brown/65 mt-1 line-clamp-2 leading-relaxed">
                          {sub.description}
                        </p>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-rose-50 flex items-center justify-between text-xs font-bold text-primary">
                      <span>View Bakes</span>
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Catalog Products / Treats Section */}
        {catalogProducts.length > 0 && (
          <section className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-dark-brown">
                  Popular {categoryInfo.shortLabel} Treats
                </h2>
                <p className="text-xs sm:text-sm text-dark-brown/60 mt-0.5">
                  Classic creations available across local artisan home bakers
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {catalogProducts.map((product) => (
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
                        <NotoIcon icon={categoryInfo.icon} size={40} />
                      </div>
                    )}
                    <div className="absolute top-2.5 left-2.5">
                      <DietaryIcon vegetarian={product.isEggless} size={18} />
                    </div>
                    {product.subcategory && (
                      <Link
                        href={`/bakes/${product.subcategory.slug}`}
                        className="absolute bottom-2.5 left-2.5 rounded-md bg-white/90 backdrop-blur-xs px-2 py-0.5 text-[10px] font-bold text-dark-brown hover:bg-white transition"
                      >
                        {product.subcategory.name}
                      </Link>
                    )}
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

                    <div className="mt-4 pt-3 border-t border-rose-50 flex items-center justify-between text-[11px] text-dark-brown/60">
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
                        Find Bakers
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Join as Baker CTA Banner */}
        <section className="rounded-3xl bg-dark-brown text-white p-8 sm:p-10 text-center relative overflow-hidden shadow-lg">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />
          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-rose-200 text-xs font-bold tracking-wide">
              Bake with Flour n Sugar
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">
              Do you bake artisanal {categoryInfo.shortLabel.toLowerCase()}?
            </h3>
            <p className="text-xs sm:text-sm text-rose-100/80 leading-relaxed">
              Join our community of verified home bakers and boutique cake studios. Set up your custom digital storefront and reach dessert lovers in your area.
            </p>
            <div className="pt-2">
              <Link
                href="/onboarding"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-primary-hover transition"
              >
                <span>Create Your Baker Storefront</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
