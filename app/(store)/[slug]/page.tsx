import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { StoreHeader } from "@/components/store/StoreHeader";
import { StoreFooter } from "@/components/store/StoreFooter";
import { StoreMenu } from "@/components/store/StoreMenu";
import { NotoIcon } from "@/components/ui/NotoIcon";
import { MatIcon } from "@/components/ui/MatIcon";
import cupcake from "@iconify-icons/noto/cupcake";
import houseWithGarden from "@iconify-icons/noto/house-with-garden";
import croissant from "@iconify-icons/noto/croissant";
import birthdayCake from "@iconify-icons/noto/birthday-cake";
import hotBeverage from "@iconify-icons/noto/hot-beverage";
import sparkles from "@iconify-icons/noto/sparkles";
import roundPushpin from "@iconify-icons/noto/round-pushpin";
import chatBubbleOutlineRounded from "@iconify-icons/material-symbols/chat-bubble-outline-rounded";
import callOutlineRounded from "@iconify-icons/material-symbols/call-outline-rounded";
import verifiedRounded from "@iconify-icons/material-symbols/verified-rounded";
import scheduleOutlineRounded from "@iconify-icons/material-symbols/schedule-outline-rounded";
import localShippingOutlineRounded from "@iconify-icons/material-symbols/local-shipping-outline-rounded";
import calendarTodayOutlineRounded from "@iconify-icons/material-symbols/calendar-today-outline-rounded";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const STORE_TYPE_ICONS: Record<string, typeof houseWithGarden> = {
  HOME_BAKER: houseWithGarden,
  BAKERY: croissant,
  CAKE_SHOP: birthdayCake,
  CAFE: hotBeverage,
  OTHER: sparkles,
};

const STORE_TYPE_LABELS: Record<string, string> = {
  HOME_BAKER: "Home Baker",
  BAKERY: "Artisanal Bakery",
  CAKE_SHOP: "Custom Cake Studio",
  CAFE: "Bakery Cafe",
  OTHER: "Dessert Studio",
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const store = await prisma.store.findUnique({
    where: { slug },
    select: {
      name: true,
      description: true,
      city: true,
      logo: true,
      coverImage: true,
    },
  });

  if (!store) {
    return {
      title: "Store Not Found | Flour n Sugar",
      description: "The requested bakery store could not be found.",
    };
  }

  const title = `${store.name} | Flour n Sugar`;
  const description =
    store.description ||
    `Order fresh handmade cakes, pastries, and treats from ${store.name}${store.city ? ` in ${store.city}` : ""}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: store.coverImage || store.logo ? [store.coverImage || store.logo || ""] : [],
    },
  };
}

export default async function StoreHomePage({ params }: PageProps) {
  const { slug } = await params;

  const store = await prisma.store.findUnique({
    where: { slug },
    include: {
      products: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!store) {
    notFound();
  }

  const storeTypeIcon = STORE_TYPE_ICONS[store.storeType] || cupcake;
  const storeTypeLabel = STORE_TYPE_LABELS[store.storeType] || "Bakery";

  const cleanWhatsapp = store.whatsapp ? store.whatsapp.replace(/\D/g, "") : null;
  const whatsappUrl = cleanWhatsapp
    ? `https://wa.me/${cleanWhatsapp.startsWith("91") ? cleanWhatsapp : `91${cleanWhatsapp}`}?text=${encodeURIComponent(
        `Hi ${store.name}, I found your bakery on Flour n Sugar and would like to inquire about custom orders!`
      )}`
    : null;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary-light selection:text-primary">
      {/* Dynamic Store Header */}
      <StoreHeader store={store} />

      <main className="flex-1 w-full">
        {/* Store Hero Banner */}
        <section className="relative bg-gradient-to-b from-rose-50/80 via-white to-background dark:from-rose-950/30 dark:via-[#2b1b17]/50 dark:to-background border-b border-rose-100/60 dark:border-rose-950/40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              {/* Bakery Identity */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
                {/* Logo / Avatar */}
                <div className="relative flex-shrink-0">
                  {store.logo ? (
                    <img
                      src={store.logo}
                      alt={store.name}
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-2 border-white dark:border-[#33221e] shadow-lg"
                    />
                  ) : (
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-rose-100 dark:bg-rose-950 flex items-center justify-center shadow-lg border-2 border-white dark:border-[#33221e]">
                      <NotoIcon icon={storeTypeIcon} size={54} />
                    </div>
                  )}
                  <span
                    title="Verified Storefront"
                    className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md ring-2 ring-white dark:ring-[#2b1b17]"
                  >
                    <MatIcon icon={verifiedRounded} size={16} />
                  </span>
                </div>

                {/* Name, Type & Bio */}
                <div className="space-y-2 max-w-xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-rose-100 dark:bg-rose-950/80 text-primary text-[11px] font-extrabold uppercase tracking-wide flex items-center gap-1">
                      <NotoIcon icon={storeTypeIcon} size={13} />
                      <span>{storeTypeLabel}</span>
                    </span>
                    {store.city && (
                      <span className="px-2.5 py-0.5 rounded-md bg-stone-100 dark:bg-rose-950/40 text-dark-brown/70 dark:text-rose-200/70 text-[11px] font-bold flex items-center gap-1">
                        <NotoIcon icon={roundPushpin} size={12} />
                        <span>
                          {store.city}
                          {store.state ? `, ${store.state}` : ""}
                        </span>
                      </span>
                    )}
                  </div>

                  <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-dark-brown dark:text-rose-50 leading-tight">
                    {store.name}
                  </h1>

                  <p className="text-xs sm:text-sm text-dark-brown/70 dark:text-rose-200/70 leading-relaxed">
                    {store.description ||
                      "Artisanal fresh bakes, signature celebration cakes, and custom dessert pre-orders made with passion and premium ingredients."}
                  </p>
                </div>
              </div>

              {/* Quick Actions Card */}
              <div className="flex flex-col sm:flex-row md:flex-col gap-3 flex-shrink-0">
                {whatsappUrl && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MatIcon icon={chatBubbleOutlineRounded} size={18} />
                    <span>Chat & Order on WhatsApp</span>
                  </a>
                )}

                {store.phone && (
                  <a
                    href={`tel:${store.phone}`}
                    className="px-6 py-3.5 rounded-2xl bg-white dark:bg-[#33221e] border border-rose-100 dark:border-rose-950/60 text-dark-brown dark:text-rose-100 hover:bg-rose-50 dark:hover:bg-rose-900/30 text-xs font-bold shadow-xs transition flex items-center justify-center gap-2"
                  >
                    <MatIcon icon={callOutlineRounded} size={18} className="text-primary" />
                    <span>Call {store.phone}</span>
                  </a>
                )}
              </div>
            </div>

            {/* Fast Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-8 border-t border-rose-100/60 dark:border-rose-950/40 text-xs">
              <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-[#33221e]/80 border border-rose-100/60 dark:border-rose-950/40 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
                  <MatIcon icon={scheduleOutlineRounded} size={18} />
                </div>
                <div>
                  <span className="block text-[10px] text-dark-brown/50 dark:text-rose-200/50 uppercase font-bold">
                    Notice Needed
                  </span>
                  <span className="font-bold text-dark-brown dark:text-rose-100">
                    {store.leadTimeHours || 24}h Notice
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-[#33221e]/80 border border-rose-100/60 dark:border-rose-950/40 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <MatIcon icon={localShippingOutlineRounded} size={18} />
                </div>
                <div>
                  <span className="block text-[10px] text-dark-brown/50 dark:text-rose-200/50 uppercase font-bold">
                    Delivery Radius
                  </span>
                  <span className="font-bold text-dark-brown dark:text-rose-100">
                    Within {store.deliveryRadiusKm || 10} km
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-[#33221e]/80 border border-rose-100/60 dark:border-rose-950/40 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-primary flex items-center justify-center flex-shrink-0">
                  <MatIcon icon={calendarTodayOutlineRounded} size={18} />
                </div>
                <div>
                  <span className="block text-[10px] text-dark-brown/50 dark:text-rose-200/50 uppercase font-bold">
                    Operating Days
                  </span>
                  <span className="font-bold text-dark-brown dark:text-rose-100 truncate block max-w-[110px]">
                    {store.workingDays && store.workingDays.length > 0
                      ? store.workingDays.join(", ")
                      : "Mon - Sat"}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-[#33221e]/80 border border-rose-100/60 dark:border-rose-950/40 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center flex-shrink-0">
                  <NotoIcon icon={houseWithGarden} size={18} />
                </div>
                <div>
                  <span className="block text-[10px] text-dark-brown/50 dark:text-rose-200/50 uppercase font-bold">
                    Kitchen Type
                  </span>
                  <span className="font-bold text-dark-brown dark:text-rose-100">
                    {store.isHomeBaker ? "Home Kitchen" : "Commercial Bakery"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Container */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Interactive Menu / Treats Catalog */}
          <StoreMenu
            products={store.products}
            storeName={store.name}
            whatsapp={store.whatsapp}
          />

          {/* Baker Story & Specialties Section */}
          <section
            id="story"
            className="py-12 border-t border-rose-100/70 dark:border-rose-950/40 scroll-mt-24"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="md:col-span-4 space-y-3">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-primary">
                  The Story Behind the Bake
                </span>
                <h2 className="font-serif text-3xl font-bold text-dark-brown dark:text-rose-50">
                  Meet the Baker
                </h2>
                <p className="text-xs text-dark-brown/60 dark:text-rose-200/60 leading-relaxed">
                  Every dessert carries a passion for flavor, precision, and handcrafted artistry.
                </p>

                {/* Specialties Chips */}
                {store.specialties && store.specialties.length > 0 && (
                  <div className="pt-3 space-y-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-dark-brown/50 dark:text-rose-200/50">
                      Kitchen Specialties:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {store.specialties.map((spec) => (
                        <span
                          key={spec}
                          className="px-3 py-1 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-primary border border-rose-100 dark:border-rose-900/40 text-xs font-bold"
                        >
                          ✨ {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="md:col-span-8 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#2b1b17] border border-rose-100/80 dark:border-rose-950/50 shadow-xs space-y-4 text-xs sm:text-sm text-dark-brown/75 dark:text-rose-200/75 leading-relaxed">
                {store.about ? (
                  <p className="whitespace-pre-line">{store.about}</p>
                ) : (
                  <p>
                    Welcome to <strong>{store.name}</strong>! We are dedicated to creating delectable baked creations
                    made with fresh, wholesome ingredients. Whether you are seeking a showstopping custom birthday cake,
                    treat boxes for corporate gifting, or artisanal afternoon pastries, we craft each order with meticulous care.
                  </p>
                )}

                {/* Highlights Callout */}
                <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/30 flex items-start gap-3 mt-4">
                  <NotoIcon icon={sparkles} size={20} className="mt-0.5" />
                  <p className="text-xs text-dark-brown/70 dark:text-rose-200/70">
                    <strong>Custom Themes & Flavor Requests:</strong> Have a specific dietary requirement or event theme?
                    We regularly customize sweetness levels, eggless recipes, and floral finishes upon request.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Location & Delivery Policy Section */}
          <section
            id="delivery"
            className="py-12 border-t border-rose-100/70 dark:border-rose-950/40 scroll-mt-24 mb-12"
          >
            <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-rose-50/60 via-amber-50/40 to-rose-50/60 dark:from-rose-950/30 dark:via-amber-950/20 dark:to-rose-950/30 border border-rose-100/80 dark:border-rose-900/30">
              <div className="max-w-3xl space-y-4">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-primary">
                  Operations & Fulfillment
                </span>
                <h3 className="font-serif text-2xl font-bold text-dark-brown dark:text-rose-50">
                  How Orders & Delivery Work
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-dark-brown/70 dark:text-rose-200/70 pt-2">
                  <div className="p-4 rounded-2xl bg-white/80 dark:bg-[#33221e]/80 border border-rose-100/60 dark:border-rose-950/40 space-y-1">
                    <span className="font-bold text-dark-brown dark:text-rose-100 block">
                      🛵 Delivery Zone
                    </span>
                    <p>
                      Direct delivery available within{" "}
                      <strong>{store.deliveryRadiusKm || 10} km</strong> of {store.city || "the kitchen"}.
                      Courier or cab delivery can be coordinated for fragile celebration cakes.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/80 dark:bg-[#33221e]/80 border border-rose-100/60 dark:border-rose-950/40 space-y-1">
                    <span className="font-bold text-dark-brown dark:text-rose-100 block">
                      ⏱️ Lead Time & Pre-orders
                    </span>
                    <p>
                      Because our bakes contain no artificial preservatives, orders require at least{" "}
                      <strong>{store.leadTimeHours || 24} hours notice</strong> for fresh batch preparation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Dynamic Store Footer */}
      <StoreFooter store={store} />
    </div>
  );
}