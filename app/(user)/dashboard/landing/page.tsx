import { headers } from "next/headers";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { MatIcon } from "@/components/ui/MatIcon";
import paletteOutline from "@iconify-icons/material-symbols/palette-outline";
import infoOutlineRounded from "@iconify-icons/material-symbols/info-outline-rounded";
import openInNewRounded from "@iconify-icons/material-symbols/open-in-new-rounded";

export default async function DashboardLandingPage() {
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
          <MatIcon icon={paletteOutline} size={16} />
          <span>Landing Page Customization</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-dark-brown dark:text-rose-50 mt-1">
          Storefront Design & Layout
        </h2>
        <p className="text-xs text-dark-brown/60 dark:text-rose-200/60 mt-0.5">
          Customize your public storefront layout, featured treats carousel, story presentation, and call-to-action buttons.
        </p>
      </div>

      {/* Placeholder State Card */}
      <div className="p-8 rounded-3xl bg-white dark:bg-[#2b1b17] border border-rose-100/80 dark:border-rose-950/50 shadow-xs space-y-6">
        <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/30 text-amber-800 dark:text-amber-200 text-xs">
          <MatIcon icon={infoOutlineRounded} size={18} className="mt-0.5 flex-shrink-0" />
          <p>
            <strong>Storefront Customizer (Work in Progress):</strong> Live visual layout toggles, theme color accents, and section re-ordering controls will be available here.
          </p>
        </div>

        {store && (
          <div className="p-6 rounded-2xl bg-rose-50/40 dark:bg-rose-950/20 border border-rose-100/60 dark:border-rose-900/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="font-serif text-base font-bold text-dark-brown dark:text-rose-100">
                Preview Current Storefront
              </h4>
              <p className="text-xs text-dark-brown/60 dark:text-rose-200/60 font-mono">
                flournsugar.com/{store.slug}
              </p>
            </div>

            <Link
              href={`/${store.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-xs hover:bg-primary-hover transition"
            >
              <span>View Public Storefront</span>
              <MatIcon icon={openInNewRounded} size={15} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
