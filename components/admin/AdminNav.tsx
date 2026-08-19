"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MatIcon } from "@/components/ui/MatIcon";
import dashboardOutlineRounded from "@iconify-icons/material-symbols/dashboard-outline-rounded";
import storefrontOutlineRounded from "@iconify-icons/material-symbols/storefront-outline-rounded";
import groupOutlineRounded from "@iconify-icons/material-symbols/group-outline-rounded";

const ADMIN_TABS = [
  {
    name: "Overview",
    href: "/admin",
    icon: dashboardOutlineRounded,
    exact: true,
  },
  {
    name: "Stores & Bakeries",
    href: "/admin/stores",
    icon: storefrontOutlineRounded,
    exact: false,
  },
  {
    name: "Users & Accounts",
    href: "/admin/users",
    icon: groupOutlineRounded,
    exact: false,
  },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <div className="border-b border-rose-100/70 dark:border-rose-950/40 bg-white/70 dark:bg-[#2b1b17]/70 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 py-2 overflow-x-auto no-scrollbar">
          {ADMIN_TABS.map((tab) => {
            const isActive = tab.exact
              ? pathname === tab.href
              : pathname === tab.href || pathname.startsWith(`${tab.href}/`);

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-dark-brown dark:bg-rose-100 text-white dark:text-dark-brown shadow-xs"
                    : "text-dark-brown/70 dark:text-rose-200/70 hover:text-dark-brown dark:hover:text-rose-100 hover:bg-rose-50/80 dark:hover:bg-rose-950/40"
                }`}
              >
                <MatIcon icon={tab.icon} size={17} />
                <span>{tab.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
