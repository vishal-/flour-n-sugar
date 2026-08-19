import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { NotoIcon } from "@/components/ui/NotoIcon";
import { MatIcon } from "@/components/ui/MatIcon";
import sparkles from "@iconify-icons/noto/sparkles";
import shortcake from "@iconify-icons/noto/shortcake";
import adminPanelSettingsOutlineRounded from "@iconify-icons/material-symbols/admin-panel-settings-outline-rounded";
import storefrontOutlineRounded from "@iconify-icons/material-symbols/storefront-outline-rounded";
import groupOutlineRounded from "@iconify-icons/material-symbols/group-outline-rounded";
import inventory2OutlineRounded from "@iconify-icons/material-symbols/inventory-2-outline-rounded";
import arrowForwardRounded from "@iconify-icons/material-symbols/arrow-forward-rounded";

export default async function AdminOverviewPage() {
  const [
    totalStores,
    publishedStores,
    totalUsers,
    totalProducts,
    totalSubcategories,
    totalCatalogProducts,
    recentStores,
  ] = await Promise.all([
    prisma.store.count(),
    prisma.store.count({ where: { status: "PUBLISHED" } }),
    prisma.user.count(),
    prisma.product.count(),
    prisma.subcategory.count(),
    prisma.catalogProduct.count(),
    prisma.store.findMany({
      orderBy: { createdAt: "desc" },
      take: 4,
      select: {
        id: true,
        name: true,
        slug: true,
        storeType: true,
        status: true,
        city: true,
        createdAt: true,
      },
    }),
  ]);

  const ADMIN_MODULES = [
    {
      title: "Stores & Bakeries",
      description: "Manage registered storefronts, review drafts, and audit bakery statuses.",
      href: "/admin/stores",
      icon: storefrontOutlineRounded,
      count: `${totalStores} Stores`,
      color: "text-rose-600 bg-rose-50 dark:bg-rose-950/40",
    },
    {
      title: "Users & Accounts",
      description: "Manage customer profiles, platform administrators, and baker memberships.",
      href: "/admin/users",
      icon: groupOutlineRounded,
      count: `${totalUsers} Users`,
      color: "text-purple-600 bg-purple-50 dark:bg-purple-950/40",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
          <MatIcon icon={adminPanelSettingsOutlineRounded} size={16} />
          <span>Platform Overview</span>
        </div>
        <h2 className="font-serif text-3xl font-bold text-dark-brown dark:text-rose-50 mt-1">
          Administration Dashboard
        </h2>
        <p className="text-xs text-dark-brown/60 dark:text-rose-200/60 mt-0.5">
          High-level overview of stores, customer accounts, and catalog operations on Flour n Sugar.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#2b1b17] border border-rose-100/70 dark:border-rose-950/50 space-y-1 shadow-xs">
          <div className="flex items-center justify-between text-dark-brown/50 dark:text-rose-200/50">
            <span className="text-[11px] font-bold uppercase tracking-wide">Total Stores</span>
            <MatIcon icon={storefrontOutlineRounded} size={18} className="text-primary" />
          </div>
          <p className="font-serif text-2xl font-bold text-dark-brown dark:text-rose-50">
            {totalStores}
          </p>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block font-semibold">
            {publishedStores} published live
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#2b1b17] border border-rose-100/70 dark:border-rose-950/50 space-y-1 shadow-xs">
          <div className="flex items-center justify-between text-dark-brown/50 dark:text-rose-200/50">
            <span className="text-[11px] font-bold uppercase tracking-wide">User Accounts</span>
            <MatIcon icon={groupOutlineRounded} size={18} className="text-purple-600" />
          </div>
          <p className="font-serif text-2xl font-bold text-dark-brown dark:text-rose-50">
            {totalUsers}
          </p>
          <span className="text-[10px] text-dark-brown/60 dark:text-rose-200/60 block">
            Customers & Bakers
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#2b1b17] border border-rose-100/70 dark:border-rose-950/50 space-y-1 shadow-xs">
          <div className="flex items-center justify-between text-dark-brown/50 dark:text-rose-200/50">
            <span className="text-[11px] font-bold uppercase tracking-wide">Active Products</span>
            <MatIcon icon={inventory2OutlineRounded} size={18} className="text-amber-500" />
          </div>
          <p className="font-serif text-2xl font-bold text-dark-brown dark:text-rose-50">
            {totalProducts}
          </p>
          <span className="text-[10px] text-dark-brown/60 dark:text-rose-200/60 block">
            Across all bakeries
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#2b1b17] border border-rose-100/70 dark:border-rose-950/50 space-y-1 shadow-xs">
          <div className="flex items-center justify-between text-dark-brown/50 dark:text-rose-200/50">
            <span className="text-[11px] font-bold uppercase tracking-wide">Master Catalog</span>
            <NotoIcon icon={sparkles} size={18} />
          </div>
          <p className="font-serif text-2xl font-bold text-dark-brown dark:text-rose-50">
            {totalCatalogProducts}
          </p>
          <span className="text-[10px] text-dark-brown/60 dark:text-rose-200/60 block">
            {totalSubcategories} subcategories
          </span>
        </div>
      </div>

      {/* Admin Modules Navigation */}
      <div className="space-y-4">
        <div>
          <h3 className="font-serif text-xl font-bold text-dark-brown dark:text-rose-50">
            Platform Management Modules
          </h3>
          <p className="text-xs text-dark-brown/60 dark:text-rose-200/60 mt-0.5">
            Access directory lists, moderate stores, and manage platform permissions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ADMIN_MODULES.map((mod) => (
            <Link
              key={mod.href}
              href={mod.href}
              className="p-6 rounded-3xl bg-white dark:bg-[#2b1b17] border border-rose-100/80 dark:border-rose-950/50 hover:border-dark-brown/40 dark:hover:border-rose-100/40 shadow-xs hover:shadow-md transition-all duration-200 flex items-start justify-between gap-4 group"
            >
              <div className="flex items-start gap-4">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${mod.color}`}>
                  <MatIcon icon={mod.icon} size={24} />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-serif text-base font-bold text-dark-brown dark:text-rose-50 group-hover:text-primary transition">
                      {mod.title}
                    </h4>
                    <span className="text-[10px] font-bold text-dark-brown/50 dark:text-rose-200/50 bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded-md">
                      {mod.count}
                    </span>
                  </div>
                  <p className="text-xs text-dark-brown/60 dark:text-rose-200/60 leading-relaxed">
                    {mod.description}
                  </p>
                </div>
              </div>

              <span className="w-8 h-8 rounded-full bg-rose-50 dark:bg-rose-950/40 text-dark-brown dark:text-rose-100 flex items-center justify-center flex-shrink-0 group-hover:bg-dark-brown group-hover:text-white dark:group-hover:bg-rose-100 dark:group-hover:text-dark-brown transition">
                <MatIcon icon={arrowForwardRounded} size={16} />
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Stores Table Preview */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-xl font-bold text-dark-brown dark:text-rose-50">
              Recently Created Stores
            </h3>
            <p className="text-xs text-dark-brown/60 dark:text-rose-200/60 mt-0.5">
              Latest storefront registrations on the platform.
            </p>
          </div>
          <Link
            href="/admin/stores"
            className="text-xs text-primary font-bold hover:underline flex items-center gap-1"
          >
            <span>View All Stores ({totalStores})</span>
            <span>→</span>
          </Link>
        </div>

        {recentStores.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recentStores.map((st) => (
              <div
                key={st.id}
                className="p-5 rounded-2xl bg-white dark:bg-[#2b1b17] border border-rose-100/70 dark:border-rose-950/50 flex items-center justify-between gap-4 shadow-xs"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-dark-brown dark:text-rose-100 truncate">
                      {st.name}
                    </span>
                    <span
                      className={`text-[9px] font-extrabold px-2 py-0.2 rounded-full uppercase ${
                        st.status === "PUBLISHED"
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                          : "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300"
                      }`}
                    >
                      {st.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-dark-brown/50 dark:text-rose-200/50">
                    /{st.slug} {st.city ? `• ${st.city}` : ""}
                  </p>
                </div>

                <Link
                  href={`/${st.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-primary text-xs font-bold hover:bg-rose-100 transition flex-shrink-0"
                >
                  View
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center space-y-2 bg-white dark:bg-[#2b1b17] rounded-3xl border border-rose-100/80">
            <NotoIcon icon={shortcake} size={36} />
            <p className="text-xs text-dark-brown/60 dark:text-rose-200/60">
              No registered stores yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
