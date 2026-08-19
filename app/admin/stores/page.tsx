import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { NotoIcon } from "@/components/ui/NotoIcon";
import { MatIcon } from "@/components/ui/MatIcon";
import cupcake from "@iconify-icons/noto/cupcake";
import croissant from "@iconify-icons/noto/croissant";
import birthdayCake from "@iconify-icons/noto/birthday-cake";
import hotBeverage from "@iconify-icons/noto/hot-beverage";
import houseWithGarden from "@iconify-icons/noto/house-with-garden";
import storefrontOutlineRounded from "@iconify-icons/material-symbols/storefront-outline-rounded";
import searchRounded from "@iconify-icons/material-symbols/search-rounded";
import openInNewRounded from "@iconify-icons/material-symbols/open-in-new-rounded";
import checkCircleOutlineRounded from "@iconify-icons/material-symbols/check-circle-outline-rounded";
import inventory2OutlineRounded from "@iconify-icons/material-symbols/inventory-2-outline-rounded";

const STORE_TYPE_ICONS: Record<string, typeof houseWithGarden> = {
  HOME_BAKER: houseWithGarden,
  BAKERY: croissant,
  CAKE_SHOP: birthdayCake,
  CAFE: hotBeverage,
};

export default async function AdminStoresPage() {
  const [stores, totalStores, publishedCount, draftCount, suspendedCount] = await Promise.all([
    prisma.store.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { products: true, members: true },
        },
      },
      take: 50,
    }),
    prisma.store.count(),
    prisma.store.count({ where: { status: "PUBLISHED" } }),
    prisma.store.count({ where: { status: "DRAFT" } }),
    prisma.store.count({ where: { status: "SUSPENDED" } }),
  ]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
            <MatIcon icon={storefrontOutlineRounded} size={16} />
            <span>Storefront Directory</span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-dark-brown dark:text-rose-50 mt-1">
            Manage Registered Stores
          </h2>
          <p className="text-xs text-dark-brown/60 dark:text-rose-200/60 mt-0.5">
            Overview and moderation of all bakery and home baker storefronts on the platform.
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#2b1b17] border border-rose-100/70 dark:border-rose-950/50 space-y-1 shadow-xs">
          <div className="flex items-center justify-between text-dark-brown/50 dark:text-rose-200/50">
            <span className="text-[11px] font-bold uppercase tracking-wide">Total Stores</span>
            <MatIcon icon={storefrontOutlineRounded} size={18} className="text-primary" />
          </div>
          <p className="font-serif text-2xl font-bold text-dark-brown dark:text-rose-50">
            {totalStores}
          </p>
          <span className="text-[10px] text-dark-brown/60 dark:text-rose-200/60 block">
            Across all locations
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#2b1b17] border border-rose-100/70 dark:border-rose-950/50 space-y-1 shadow-xs">
          <div className="flex items-center justify-between text-dark-brown/50 dark:text-rose-200/50">
            <span className="text-[11px] font-bold uppercase tracking-wide">Published</span>
            <MatIcon icon={checkCircleOutlineRounded} size={18} className="text-emerald-600" />
          </div>
          <p className="font-serif text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {publishedCount}
          </p>
          <span className="text-[10px] text-dark-brown/60 dark:text-rose-200/60 block">
            Live on marketplace
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#2b1b17] border border-rose-100/70 dark:border-rose-950/50 space-y-1 shadow-xs">
          <div className="flex items-center justify-between text-dark-brown/50 dark:text-rose-200/50">
            <span className="text-[11px] font-bold uppercase tracking-wide">Drafts</span>
            <MatIcon icon={inventory2OutlineRounded} size={18} className="text-amber-500" />
          </div>
          <p className="font-serif text-2xl font-bold text-amber-600 dark:text-amber-400">
            {draftCount}
          </p>
          <span className="text-[10px] text-dark-brown/60 dark:text-rose-200/60 block">
            Onboarding incomplete
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#2b1b17] border border-rose-100/70 dark:border-rose-950/50 space-y-1 shadow-xs">
          <div className="flex items-center justify-between text-dark-brown/50 dark:text-rose-200/50">
            <span className="text-[11px] font-bold uppercase tracking-wide">Suspended</span>
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
          </div>
          <p className="font-serif text-2xl font-bold text-red-600 dark:text-red-400">
            {suspendedCount}
          </p>
          <span className="text-[10px] text-dark-brown/60 dark:text-rose-200/60 block">
            Offline / Flagged
          </span>
        </div>
      </div>

      {/* Stores List Container */}
      <div className="bg-white dark:bg-[#2b1b17] rounded-3xl border border-rose-100/80 dark:border-rose-950/50 shadow-xs overflow-hidden">
        {/* Search Bar */}
        <div className="p-4 sm:p-6 border-b border-rose-100/60 dark:border-rose-950/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Search by store name or slug..."
              className="w-full pl-9 pr-4 py-2 rounded-2xl bg-rose-50/30 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-950/60 text-xs font-semibold text-dark-brown dark:text-rose-100 outline-none focus:border-primary transition"
            />
            <MatIcon
              icon={searchRounded}
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-brown/40 dark:text-rose-200/40"
            />
          </div>

          <span className="text-xs font-bold text-dark-brown/60 dark:text-rose-200/60">
            Showing {stores.length} of {totalStores} stores
          </span>
        </div>

        {/* Stores Table */}
        {stores.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-rose-50/50 dark:bg-rose-950/30 text-[10px] font-extrabold uppercase tracking-wider text-dark-brown/60 dark:text-rose-200/60 border-b border-rose-100/60 dark:border-rose-950/40">
                <tr>
                  <th className="py-3.5 px-6">Store Details</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Type</th>
                  <th className="py-3.5 px-4 text-center">Products</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rose-100/40 dark:divide-rose-950/30 font-medium">
                {stores.map((st) => {
                  const typeIcon = STORE_TYPE_ICONS[st.storeType] || cupcake;

                  return (
                    <tr
                      key={st.id}
                      className="hover:bg-rose-50/30 dark:hover:bg-rose-950/20 transition"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          {st.logo ? (
                            <img
                              src={st.logo}
                              alt={st.name}
                              className="w-9 h-9 rounded-xl object-cover border border-rose-100"
                            />
                          ) : (
                            <div className="w-9 h-9 rounded-xl bg-rose-100 dark:bg-rose-950 flex items-center justify-center">
                              <NotoIcon icon={typeIcon} size={18} />
                            </div>
                          )}
                          <div>
                            <span className="font-bold text-dark-brown dark:text-rose-100 block">
                              {st.name}
                            </span>
                            <span className="text-[11px] font-mono text-dark-brown/50 dark:text-rose-200/50">
                              /{st.slug}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 text-dark-brown/75 dark:text-rose-200/75">
                        {st.city || "—"}
                        {st.state ? `, ${st.state}` : ""}
                      </td>

                      <td className="py-4 px-4">
                        <span className="inline-flex items-center gap-1.5 text-dark-brown/70 dark:text-rose-200/70">
                          <NotoIcon icon={typeIcon} size={13} />
                          <span>{st.storeType.replace("_", " ")}</span>
                        </span>
                      </td>

                      <td className="py-4 px-4 text-center font-bold text-dark-brown dark:text-rose-100">
                        {st._count.products}
                      </td>

                      <td className="py-4 px-4 text-center">
                        <span
                          className={`inline-block text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase ${
                            st.status === "PUBLISHED"
                              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200"
                              : st.status === "DRAFT"
                              ? "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200"
                              : "bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300 border border-red-200"
                          }`}
                        >
                          {st.status}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-right">
                        <Link
                          href={`/${st.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-primary hover:bg-primary hover:text-white transition font-bold text-[11px]"
                        >
                          <span>Storefront</span>
                          <MatIcon icon={openInNewRounded} size={13} />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center space-y-2">
            <NotoIcon icon={cupcake} size={36} />
            <p className="text-xs text-dark-brown/60 dark:text-rose-200/60 font-medium">
              No registered stores found in database.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}