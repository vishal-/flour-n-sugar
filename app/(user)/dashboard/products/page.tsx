import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { MatIcon } from "@/components/ui/MatIcon";
import { NotoIcon } from "@/components/ui/NotoIcon";
import { DietaryIcon } from "@/components/ui/DietaryIcon";
import { getCategoryShortLabel, getCategoryIcon } from "@/lib/categories";
import inventory2OutlineRounded from "@iconify-icons/material-symbols/inventory-2-outline-rounded";
import infoOutlineRounded from "@iconify-icons/material-symbols/info-outline-rounded";
import shortcake from "@iconify-icons/noto/shortcake";

export default async function DashboardProductsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  const storeMember = user
    ? await prisma.storeMember.findFirst({
        where: { userId: user.id },
        include: {
          store: {
            include: {
              products: {
                orderBy: { createdAt: "desc" },
              },
            },
          },
        },
      })
    : null;

  const store = storeMember?.store;
  const products = store?.products || [];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
          <MatIcon icon={inventory2OutlineRounded} size={16} />
          <span>Product Catalog</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-dark-brown dark:text-rose-50 mt-1">
          Menu & Treats Management
        </h2>
        <p className="text-xs text-dark-brown/60 dark:text-rose-200/60 mt-0.5">
          Add new signature items, pick pre-filled items from master catalog, manage pricing, and dietary tags.
        </p>
      </div>

      {/* Placeholder State Card */}
      <div className="p-8 rounded-3xl bg-white dark:bg-[#2b1b17] border border-rose-100/80 dark:border-rose-950/50 shadow-xs space-y-6">
        <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/30 text-amber-800 dark:text-amber-200 text-xs">
          <MatIcon icon={infoOutlineRounded} size={18} className="mt-0.5 flex-shrink-0" />
          <p>
            <strong>Product Catalog CRUD (Work in Progress):</strong> A full interactive item editor with image uploads, category selector, dietary toggles, and instant cloning from the master catalog will be built here.
          </p>
        </div>

        {/* Existing Products Preview List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-dark-brown/80 dark:text-rose-100/80">
              Current Catalog ({products.length} items)
            </span>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="p-4 rounded-2xl bg-rose-50/30 dark:bg-rose-950/20 border border-rose-100/60 dark:border-rose-900/30 flex items-center gap-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#33221e] border border-rose-100/60 flex items-center justify-center flex-shrink-0 overflow-hidden shadow-2xs">
                    {prod.images && prod.images.length > 0 ? (
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <NotoIcon icon={getCategoryIcon(prod.category)} size={22} />
                    )}
                  </div>

                  <div className="flex-1 min-w-0 space-y-0.5 text-xs">
                    <div className="flex items-center gap-1.5">
                      <DietaryIcon vegetarian={prod.isEggless} size={13} />
                      <span className="font-bold text-dark-brown dark:text-rose-100 truncate">
                        {prod.name}
                      </span>
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
            <div className="p-8 text-center space-y-2">
              <NotoIcon icon={shortcake} size={36} />
              <p className="text-xs text-dark-brown/60 dark:text-rose-200/60">
                No products added yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
