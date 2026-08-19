import { headers } from "next/headers";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NotoIcon } from "@/components/ui/NotoIcon";
import { MatIcon } from "@/components/ui/MatIcon";
import { DietaryIcon } from "@/components/ui/DietaryIcon";
import { getCategoryShortLabel, getCategoryIcon } from "@/lib/categories";
import cupcake from "@iconify-icons/noto/cupcake";
import sparkles from "@iconify-icons/noto/sparkles";
import shortcake from "@iconify-icons/noto/shortcake";
import storefrontOutlineRounded from "@iconify-icons/material-symbols/storefront-outline-rounded";
import locationOnOutlineRounded from "@iconify-icons/material-symbols/location-on-outline-rounded";
import inventory2OutlineRounded from "@iconify-icons/material-symbols/inventory-2-outline-rounded";
import paletteOutline from "@iconify-icons/material-symbols/palette-outline";
import openInNewRounded from "@iconify-icons/material-symbols/open-in-new-rounded";
import arrowForwardRounded from "@iconify-icons/material-symbols/arrow-forward-rounded";
import checkCircleOutlineRounded from "@iconify-icons/material-symbols/check-circle-outline-rounded";
import scheduleOutlineRounded from "@iconify-icons/material-symbols/schedule-outline-rounded";
import localShippingOutlineRounded from "@iconify-icons/material-symbols/local-shipping-outline-rounded";

export default async function DashboardOverviewPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  // Fetch store for this user
  const storeMember = user
    ? await prisma.storeMember.findFirst({
        where: { userId: user.id },
        include: {
          store: {
            include: {
              products: {
                orderBy: { createdAt: "desc" },
                take: 6,
              },
              _count: {
                select: { products: true },
              },
            },
          },
        },
      })
    : null;

  const store = storeMember?.store;

  // Case 1: User does not have a registered store
  if (!store) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center space-y-6 animate-in fade-in duration-300">
        <div className="w-16 h-16 rounded-3xl bg-rose-100 dark:bg-rose-950/70 text-primary flex items-center justify-center mx-auto shadow-sm">
          <NotoIcon icon={cupcake} size={36} />
        </div>

        <div className="space-y-2">
          <h2 className="font-serif text-3xl font-bold text-dark-brown dark:text-rose-50">
            Welcome to your Baker Dashboard
          </h2>
          <p className="text-xs sm:text-sm text-dark-brown/65 dark:text-rose-200/65 leading-relaxed max-w-md mx-auto">
            You don&apos;t have a registered bakery storefront yet. Create your verified store profile in under 2 minutes to begin receiving custom pre-orders.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-md transition"
          >
            <span>Start Baker Onboarding</span>
            <MatIcon icon={arrowForwardRounded} size={16} />
          </Link>
        </div>
      </div>
    );
  }

  // Case 2: User has a registered store
  const totalProducts = store._count.products;

  const CONFIG_MODULES = [
    {
      title: "Store Profile & Story",
      description: "Manage bakery name, bio, logo, cover imagery, and specialty tags.",
      href: "/dashboard/store",
      icon: storefrontOutlineRounded,
      color: "text-rose-600 bg-rose-50 dark:bg-rose-950/40",
      status: store.description ? "Configured" : "Incomplete",
    },
    {
      title: "Location & Operations",
      description: "Update kitchen address, delivery radius, operating schedule, and lead time.",
      href: "/dashboard/location",
      icon: locationOnOutlineRounded,
      color: "text-amber-600 bg-amber-50 dark:bg-amber-950/40",
      status: store.city ? `${store.city} (${store.deliveryRadiusKm || 10}km)` : "Not set",
    },
    {
      title: "Products & Menu",
      description: "Add, edit, or remove signature celebration cakes, cookies, and artisanal treats.",
      href: "/dashboard/products",
      icon: inventory2OutlineRounded,
      color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40",
      status: `${totalProducts} item${totalProducts !== 1 ? "s" : ""}`,
    },
    {
      title: "Storefront Landing",
      description: "Preview and customize how customers experience your public storefront page.",
      href: "/dashboard/landing",
      icon: paletteOutline,
      color: "text-purple-600 bg-purple-50 dark:bg-purple-950/40",
      status: "Customize",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Live Storefront Status Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-rose-50/90 via-amber-50/50 to-rose-50/90 dark:from-rose-950/40 dark:via-amber-950/20 dark:to-rose-950/40 border border-rose-100/80 dark:border-rose-900/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <NotoIcon icon={sparkles} size={18} />
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-primary">
              Public Storefront Link
            </span>
          </div>
          <p className="text-xs text-dark-brown/70 dark:text-rose-200/70 font-medium">
            Your live storefront is accessible to customers at:
          </p>
          <p className="text-xs font-mono font-bold text-dark-brown dark:text-rose-100">
            flournsugar.com/{store.slug}
          </p>
        </div>

        <Link
          href={`/${store.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-white dark:bg-[#33221e] hover:bg-rose-50 text-primary border border-rose-100 dark:border-rose-900/40 text-xs font-bold shadow-xs transition cursor-pointer flex-shrink-0"
        >
          <span>Open Public Storefront</span>
          <MatIcon icon={openInNewRounded} size={15} />
        </Link>
      </div>

      {/* Quick Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#2b1b17] border border-rose-100/70 dark:border-rose-950/50 space-y-1 shadow-xs">
          <div className="flex items-center justify-between text-dark-brown/50 dark:text-rose-200/50">
            <span className="text-[11px] font-bold uppercase tracking-wide">Menu Items</span>
            <MatIcon icon={inventory2OutlineRounded} size={18} className="text-primary" />
          </div>
          <p className="font-serif text-2xl font-bold text-dark-brown dark:text-rose-50">
            {totalProducts}
          </p>
          <span className="text-[10px] text-dark-brown/60 dark:text-rose-200/60 block">
            {totalProducts > 0 ? "Active in catalog" : "Add signature items"}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#2b1b17] border border-rose-100/70 dark:border-rose-950/50 space-y-1 shadow-xs">
          <div className="flex items-center justify-between text-dark-brown/50 dark:text-rose-200/50">
            <span className="text-[11px] font-bold uppercase tracking-wide">Delivery Zone</span>
            <MatIcon icon={localShippingOutlineRounded} size={18} className="text-emerald-500" />
          </div>
          <p className="font-serif text-2xl font-bold text-dark-brown dark:text-rose-50">
            {store.deliveryRadiusKm || 10} km
          </p>
          <span className="text-[10px] text-dark-brown/60 dark:text-rose-200/60 block truncate">
            {store.city || "Radius coverage"}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#2b1b17] border border-rose-100/70 dark:border-rose-950/50 space-y-1 shadow-xs">
          <div className="flex items-center justify-between text-dark-brown/50 dark:text-rose-200/50">
            <span className="text-[11px] font-bold uppercase tracking-wide">Lead Time</span>
            <MatIcon icon={scheduleOutlineRounded} size={18} className="text-amber-500" />
          </div>
          <p className="font-serif text-2xl font-bold text-dark-brown dark:text-rose-50">
            {store.leadTimeHours || 24}h
          </p>
          <span className="text-[10px] text-dark-brown/60 dark:text-rose-200/60 block">
            Advance notice needed
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#2b1b17] border border-rose-100/70 dark:border-rose-950/50 space-y-1 shadow-xs">
          <div className="flex items-center justify-between text-dark-brown/50 dark:text-rose-200/50">
            <span className="text-[11px] font-bold uppercase tracking-wide">Status</span>
            <MatIcon icon={checkCircleOutlineRounded} size={18} className="text-emerald-600" />
          </div>
          <p className="font-serif text-2xl font-bold text-dark-brown dark:text-rose-50">
            {store.status === "PUBLISHED" ? "Active" : "Draft"}
          </p>
          <span className="text-[10px] text-dark-brown/60 dark:text-rose-200/60 block">
            Visible to customers
          </span>
        </div>
      </div>

      {/* Store Management Modules Grid */}
      <div className="space-y-4">
        <div>
          <h3 className="font-serif text-xl font-bold text-dark-brown dark:text-rose-50">
            Store Management Sections
          </h3>
          <p className="text-xs text-dark-brown/60 dark:text-rose-200/60 mt-0.5">
            Configure your brand identity, location, catalog items, and storefront layout.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CONFIG_MODULES.map((mod) => (
            <Link
              key={mod.href}
              href={mod.href}
              className="p-5 rounded-3xl bg-white dark:bg-[#2b1b17] border border-rose-100/80 dark:border-rose-950/50 hover:border-primary/50 dark:hover:border-primary/50 shadow-xs hover:shadow-md transition-all duration-200 flex items-start justify-between gap-4 group"
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${mod.color}`}>
                  <MatIcon icon={mod.icon} size={22} />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-serif text-base font-bold text-dark-brown dark:text-rose-50 group-hover:text-primary transition">
                      {mod.title}
                    </h4>
                    <span className="text-[10px] font-bold text-dark-brown/50 dark:text-rose-200/50 bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded-md">
                      {mod.status}
                    </span>
                  </div>
                  <p className="text-xs text-dark-brown/60 dark:text-rose-200/60 leading-relaxed">
                    {mod.description}
                  </p>
                </div>
              </div>

              <span className="w-8 h-8 rounded-full bg-rose-50 dark:bg-rose-950/40 text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition">
                <MatIcon icon={arrowForwardRounded} size={16} />
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Catalog Preview Section */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-xl font-bold text-dark-brown dark:text-rose-50">
              Recent Menu Items
            </h3>
            <p className="text-xs text-dark-brown/60 dark:text-rose-200/60 mt-0.5">
              Treats currently displayed on your customer storefront.
            </p>
          </div>
          <Link
            href="/dashboard/products"
            className="text-xs text-primary font-bold hover:underline flex items-center gap-1"
          >
            <span>Manage All Items ({totalProducts})</span>
            <span>→</span>
          </Link>
        </div>

        {store.products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {store.products.map((prod) => (
              <div
                key={prod.id}
                className="p-4 rounded-2xl bg-white dark:bg-[#2b1b17] border border-rose-100/70 dark:border-rose-950/50 flex items-center gap-3.5 shadow-xs"
              >
                <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-950/50 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {prod.images && prod.images.length > 0 ? (
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <NotoIcon icon={getCategoryIcon(prod.category)} size={24} />
                  )}
                </div>

                <div className="flex-1 min-w-0 space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <DietaryIcon vegetarian={prod.isEggless} size={13} />
                    <h5 className="text-xs font-bold text-dark-brown dark:text-rose-100 truncate">
                      {prod.name}
                    </h5>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-dark-brown/50 dark:text-rose-200/50">
                      {getCategoryShortLabel(prod.category)}
                    </span>
                    <span className="font-bold text-primary">
                      ₹{parseFloat(prod.price.toString()).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-3xl bg-white dark:bg-[#2b1b17] border border-rose-100/80 dark:border-rose-950/50 text-center space-y-3 shadow-xs">
            <div className="flex justify-center">
              <NotoIcon icon={shortcake} size={36} />
            </div>
            <div className="space-y-1">
              <h4 className="font-serif text-base font-bold text-dark-brown dark:text-rose-50">
                No products added yet
              </h4>
              <p className="text-xs text-dark-brown/60 dark:text-rose-200/60 max-w-sm mx-auto">
                Add your signature celebration cakes, cookies, and pastries so customers can view your catalog.
              </p>
            </div>
            <Link
              href="/dashboard/products"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-xs hover:bg-primary-hover transition"
            >
              <span>+ Add Your First Product</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}