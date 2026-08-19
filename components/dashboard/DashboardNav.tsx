"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MatIcon } from "@/components/ui/MatIcon";
import dashboardOutlineRounded from "@iconify-icons/material-symbols/dashboard-outline-rounded";
import storefrontOutlineRounded from "@iconify-icons/material-symbols/storefront-outline-rounded";
import locationOnOutlineRounded from "@iconify-icons/material-symbols/location-on-outline-rounded";
import inventory2OutlineRounded from "@iconify-icons/material-symbols/inventory-2-outline-rounded";
import paletteOutline from "@iconify-icons/material-symbols/palette-outline";
import openInNewRounded from "@iconify-icons/material-symbols/open-in-new-rounded";

interface DashboardNavProps {
  storeSlug?: string | null;
}

const DASHBOARD_TABS = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: dashboardOutlineRounded,
    exact: true,
  },
  {
    name: "Store Profile",
    href: "/dashboard/store",
    icon: storefrontOutlineRounded,
    exact: false,
  },
  {
    name: "Location & Delivery",
    href: "/dashboard/location",
    icon: locationOnOutlineRounded,
    exact: false,
  },
  {
    name: "Products & Menu",
    href: "/dashboard/products",
    icon: inventory2OutlineRounded,
    exact: false,
  },
  {
    name: "Storefront Landing",
    href: "/dashboard/landing",
    icon: paletteOutline,
    exact: false,
  },
];

export function DashboardNav({ storeSlug }: DashboardNavProps) {
  const pathname = usePathname();

  return (
    <div className="border-b border-rose-100/70 dark:border-rose-950/40 bg-white/70 dark:bg-[#2b1b17]/70 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 pb-2 sm:pb-0">
          {/* Navigation Tab Links */}
          <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-1">
            {DASHBOARD_TABS.map((tab) => {
              const isActive = tab.exact
                ? pathname === tab.href
                : pathname === tab.href || pathname.startsWith(`${tab.href}/`);

              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-primary text-white shadow-xs shadow-primary/20"
                      : "text-dark-brown/70 dark:text-rose-200/70 hover:text-dark-brown dark:hover:text-rose-100 hover:bg-rose-50/80 dark:hover:bg-rose-950/40"
                  }`}
                >
                  <MatIcon icon={tab.icon} size={17} />
                  <span>{tab.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Live Storefront Link */}
          {storeSlug && (
            <div className="flex items-center gap-2 pb-2 sm:pb-0 self-end sm:self-auto">
              <Link
                href={`/${storeSlug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 dark:hover:bg-rose-900/40 text-primary border border-rose-100 dark:border-rose-900/40 text-xs font-bold transition shadow-2xs"
              >
                <span>View Live Store</span>
                <MatIcon icon={openInNewRounded} size={14} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
