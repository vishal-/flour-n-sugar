"use client";

import Link from "next/link";
import { NotoIcon } from "@/components/ui/NotoIcon";
import { MatIcon } from "@/components/ui/MatIcon";
import cupcake from "@iconify-icons/noto/cupcake";
import houseWithGarden from "@iconify-icons/noto/house-with-garden";
import croissant from "@iconify-icons/noto/croissant";
import birthdayCake from "@iconify-icons/noto/birthday-cake";
import hotBeverage from "@iconify-icons/noto/hot-beverage";
import sparkles from "@iconify-icons/noto/sparkles";
import chatBubbleOutlineRounded from "@iconify-icons/material-symbols/chat-bubble-outline-rounded";
import iosShareRounded from "@iconify-icons/material-symbols/ios-share-rounded";

interface StoreHeaderProps {
  store: {
    name: string;
    slug: string;
    storeType: string;
    logo?: string | null;
    city?: string | null;
    state?: string | null;
    whatsapp?: string | null;
    phone?: string | null;
  };
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

export function StoreHeader({ store }: StoreHeaderProps) {
  const storeTypeIcon = STORE_TYPE_ICONS[store.storeType] || cupcake;
  const storeTypeLabel = STORE_TYPE_LABELS[store.storeType] || "Bakery";

  const handleShare = async () => {
    if (typeof window !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `${store.name} | Flour n Sugar`,
          text: `Check out ${store.name} on Flour n Sugar!`,
          url: window.location.href,
        });
      } catch {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href);
        alert("Store link copied to clipboard!");
      }
    } else if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      alert("Store link copied to clipboard!");
    }
  };

  const whatsappClean = store.whatsapp ? store.whatsapp.replace(/\D/g, "") : null;
  const whatsappUrl = whatsappClean
    ? `https://wa.me/${whatsappClean.startsWith("91") ? whatsappClean : `91${whatsappClean}`}?text=${encodeURIComponent(
        `Hi ${store.name}, I found your bakery on Flour n Sugar and would like to inquire about custom orders!`
      )}`
    : null;

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#2b1b17]/90 backdrop-blur-md border-b border-rose-100/70 dark:border-rose-950/40 transition-colors">
      {/* Top Banner Notice */}
      <div className="bg-rose-50/80 dark:bg-rose-950/40 border-b border-rose-100/40 dark:border-rose-900/20 py-1.5 px-4 text-center">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-[11px]">
          <Link
            href="/home"
            className="flex items-center gap-1.5 font-bold text-dark-brown/70 dark:text-rose-200/70 hover:text-primary transition"
          >
            <NotoIcon icon={cupcake} size={14} />
            <span className="font-serif tracking-wide">Flour n Sugar</span>
            <span className="text-[9px] uppercase tracking-wider text-primary font-extrabold bg-rose-100/80 dark:bg-rose-950 px-1.5 py-0.2 rounded-sm ml-1">
              Marketplace
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/home#bakers"
              className="text-[11px] text-dark-brown/60 dark:text-rose-200/60 hover:text-primary font-medium transition hidden sm:inline"
            >
              Explore more local bakers →
            </Link>
          </div>
        </div>
      </div>

      {/* Main Store Navigation Bar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Left: Store Identity */}
        <Link href={`/${store.slug}`} className="flex items-center gap-3 group">
          {store.logo ? (
            <img
              src={store.logo}
              alt={store.name}
              className="w-10 h-10 rounded-2xl object-cover border border-rose-100 dark:border-rose-900/60 shadow-xs group-hover:scale-105 transition"
            />
          ) : (
            <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-950/70 flex items-center justify-center shadow-xs group-hover:scale-105 transition">
              <NotoIcon icon={storeTypeIcon} size={22} />
            </div>
          )}

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-lg font-bold text-dark-brown dark:text-rose-50 leading-tight group-hover:text-primary transition">
                {store.name}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-dark-brown/60 dark:text-rose-200/60 font-medium">
              <span className="inline-flex items-center gap-1">
                <NotoIcon icon={storeTypeIcon} size={12} />
                <span>{storeTypeLabel}</span>
              </span>
              {store.city && (
                <>
                  <span>•</span>
                  <span>{store.city}</span>
                </>
              )}
            </div>
          </div>
        </Link>

        {/* Center: In-Page Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-dark-brown/70 dark:text-rose-200/70">
          <a href="#menu" className="hover:text-primary transition">
            Menu & Treats
          </a>
          <a href="#story" className="hover:text-primary transition">
            Baker Story
          </a>
          <a href="#delivery" className="hover:text-primary transition">
            Delivery & Info
          </a>
        </nav>

        {/* Right: Actions (Share & WhatsApp CTA) */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={handleShare}
            aria-label="Share store link"
            className="p-2 rounded-xl bg-rose-50/80 dark:bg-rose-950/50 hover:bg-rose-100 dark:hover:bg-rose-900/40 text-dark-brown dark:text-rose-200 border border-rose-100 dark:border-rose-900/30 transition cursor-pointer flex items-center justify-center shadow-xs"
          >
            <MatIcon icon={iosShareRounded} size={18} />
          </button>

          {whatsappUrl ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold shadow-sm transition flex items-center gap-1.5 cursor-pointer"
            >
              <MatIcon icon={chatBubbleOutlineRounded} size={16} />
              <span className="hidden sm:inline">Chat on WhatsApp</span>
              <span className="sm:hidden">WhatsApp</span>
            </a>
          ) : (
            <a
              href="#contact"
              className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-sm transition"
            >
              Inquire
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
