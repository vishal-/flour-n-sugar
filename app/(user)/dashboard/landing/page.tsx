import { headers } from "next/headers";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { StoreFrontTheme } from "@/types";
import { ThemeSelector } from "@/components/dashboard/ThemeSelector";
import { MatIcon } from "@/components/ui/MatIcon";
import { NotoIcon } from "@/components/ui/NotoIcon";
import paletteOutline from "@iconify-icons/material-symbols/palette-outline";
import cupcake from "@iconify-icons/noto/cupcake";
import arrowForwardRounded from "@iconify-icons/material-symbols/arrow-forward-rounded";

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

  if (!store) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center space-y-6 animate-in fade-in duration-300">
        <div className="w-16 h-16 rounded-3xl bg-rose-100 dark:bg-rose-950/70 text-primary flex items-center justify-center mx-auto shadow-sm">
          <NotoIcon icon={cupcake} size={36} />
        </div>

        <div className="space-y-2">
          <h2 className="font-serif text-3xl font-bold text-dark-brown dark:text-rose-50">
            No Storefront Found
          </h2>
          <p className="text-xs sm:text-sm text-dark-brown/65 dark:text-rose-200/65 leading-relaxed max-w-md mx-auto">
            You need to create your bakery storefront before customizing its design and themes.
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

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
          <MatIcon icon={paletteOutline} size={16} />
          <span>Storefront Design & Customization</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-dark-brown dark:text-rose-50 mt-1">
          Storefront Themes & Branding
        </h2>
        <p className="text-xs text-dark-brown/60 dark:text-rose-200/60 mt-0.5">
          Select your visual aesthetic, color palette, and layout template for your customer-facing storefront.
        </p>
      </div>

      {/* Interactive Theme Selector */}
      <ThemeSelector
        initialTheme={store.theme || StoreFrontTheme.OVEN_GLOW}
        storeSlug={store.slug}
      />
    </div>
  );
}
