import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { MatIcon } from "@/components/ui/MatIcon";
import locationOnOutlineRounded from "@iconify-icons/material-symbols/location-on-outline-rounded";
import infoOutlineRounded from "@iconify-icons/material-symbols/info-outline-rounded";

export default async function DashboardLocationPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  const storeMember = user
    ? await prisma.storeMember.findFirst({
        where: { userId: user.id },
        include: { store: true },
      })
    : null;

  const store = storeMember?.store;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
          <MatIcon icon={locationOnOutlineRounded} size={16} />
          <span>Location & Operations</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-dark-brown dark:text-rose-50 mt-1">
          Kitchen Address & Delivery Radius
        </h2>
        <p className="text-xs text-dark-brown/60 dark:text-rose-200/60 mt-0.5">
          Select kitchen address, pin coordinates on Google Maps, define fulfillment radius, and set operating days.
        </p>
      </div>

      {/* Placeholder State Card */}
      <div className="p-8 rounded-3xl bg-white dark:bg-[#2b1b17] border border-rose-100/80 dark:border-rose-950/50 shadow-xs space-y-6">
        <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/30 text-amber-800 dark:text-amber-200 text-xs">
          <MatIcon icon={infoOutlineRounded} size={18} className="mt-0.5 flex-shrink-0" />
          <p>
            <strong>Location & Map Selector (Work in Progress):</strong> Integration with Google Maps / Location Geocoding API to pin kitchen coordinates, adjust delivery radius slider, and set lead time rules will be configured here.
          </p>
        </div>

        {store && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-rose-50/40 dark:bg-rose-950/20 border border-rose-100/60 dark:border-rose-900/30 space-y-1">
              <span className="text-[10px] text-dark-brown/50 dark:text-rose-200/50 uppercase font-bold">
                City / State
              </span>
              <p className="font-bold text-dark-brown dark:text-rose-100">
                {store.city || "Not set"}{store.state ? `, ${store.state}` : ""}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/40 dark:bg-rose-950/20 border border-rose-100/60 dark:border-rose-900/30 space-y-1">
              <span className="text-[10px] text-dark-brown/50 dark:text-rose-200/50 uppercase font-bold">
                Delivery Radius
              </span>
              <p className="font-bold text-primary">{store.deliveryRadiusKm || 10} km</p>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/40 dark:bg-rose-950/20 border border-rose-100/60 dark:border-rose-900/30 space-y-1">
              <span className="text-[10px] text-dark-brown/50 dark:text-rose-200/50 uppercase font-bold">
                Kitchen Type
              </span>
              <p className="font-bold text-dark-brown dark:text-rose-100">
                {store.isHomeBaker ? "Private Home Kitchen (Confidential)" : "Commercial Storefront"}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/40 dark:bg-rose-950/20 border border-rose-100/60 dark:border-rose-900/30 space-y-1">
              <span className="text-[10px] text-dark-brown/50 dark:text-rose-200/50 uppercase font-bold">
                Lead Time
              </span>
              <p className="font-bold text-dark-brown dark:text-rose-100">
                {store.leadTimeHours || 24} hours notice
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
