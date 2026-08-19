import { headers } from "next/headers";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { NotoIcon } from "@/components/ui/NotoIcon";
import { MatIcon } from "@/components/ui/MatIcon";
import cupcake from "@iconify-icons/noto/cupcake";
import storefrontOutlineRounded from "@iconify-icons/material-symbols/storefront-outline-rounded";
import arrowForwardRounded from "@iconify-icons/material-symbols/arrow-forward-rounded";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  // Fetch store associated with the logged-in user
  const storeMember = user
    ? await prisma.storeMember.findFirst({
        where: { userId: user.id },
        include: {
          store: true,
        },
      })
    : null;

  const store = storeMember?.store;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary-light selection:text-primary">
      {/* Top Marketplace Bar */}
      <div className="bg-rose-50/80 dark:bg-rose-950/40 border-b border-rose-100/40 dark:border-rose-900/20 py-2 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs">
          <Link
            href="/home"
            className="flex items-center gap-2 font-bold text-dark-brown/70 dark:text-rose-200/70 hover:text-primary transition"
          >
            <NotoIcon icon={cupcake} size={16} />
            <span className="font-serif tracking-wide text-sm font-bold text-dark-brown dark:text-rose-100">
              Flour n Sugar
            </span>
            <span className="text-[10px] uppercase tracking-wider text-primary font-extrabold bg-rose-100/80 dark:bg-rose-950 px-2 py-0.5 rounded-full ml-1">
              Store Manager
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/home"
              className="text-xs text-dark-brown/60 dark:text-rose-200/60 hover:text-primary font-medium transition hidden sm:inline"
            >
              ← Back to Marketplace
            </Link>
          </div>
        </div>
      </div>

      {/* Store Header Banner */}
      <div className="bg-gradient-to-r from-rose-50/70 via-white to-rose-50/70 dark:from-rose-950/30 dark:via-[#2b1b17]/50 dark:to-rose-950/30 border-b border-rose-100/60 dark:border-rose-950/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              {store?.logo ? (
                <img
                  src={store.logo}
                  alt={store.name}
                  className="w-12 h-12 rounded-2xl object-cover border border-rose-100 dark:border-rose-900/60 shadow-xs"
                />
              ) : (
                <div className="w-12 h-12 rounded-2xl bg-primary-light dark:bg-rose-950/80 text-primary flex items-center justify-center shadow-xs">
                  <MatIcon icon={storefrontOutlineRounded} size={26} />
                </div>
              )}

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-serif text-2xl font-bold text-dark-brown dark:text-rose-50 leading-tight">
                    {store ? store.name : "Baker Dashboard"}
                  </h1>
                  {store && (
                    <span
                      className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                        store.status === "PUBLISHED"
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40"
                          : "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40"
                      }`}
                    >
                      {store.status === "PUBLISHED" ? "Live Online" : "Draft Mode"}
                    </span>
                  )}
                </div>
                <p className="text-xs text-dark-brown/60 dark:text-rose-200/60 mt-0.5">
                  {store
                    ? `Manage your storefront settings, menu items, and delivery zones`
                    : "Set up and manage your bakery storefront on Flour n Sugar"}
                </p>
              </div>
            </div>

            {!store && (
              <Link
                href="/onboarding"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-xs transition"
              >
                <span>Launch Your Bakery</span>
                <MatIcon icon={arrowForwardRounded} size={16} />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Dashboard Sub-Navigation Bar */}
      <DashboardNav storeSlug={store?.slug} />

      {/* Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
