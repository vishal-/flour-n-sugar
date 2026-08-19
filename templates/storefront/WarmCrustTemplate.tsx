import React from "react";
import Link from "next/link";
import { Store, Product } from "@prisma/client";
import { NotoIcon } from "@/components/ui/NotoIcon";
import { MatIcon } from "@/components/ui/MatIcon";
import { DietaryIcon } from "@/components/ui/DietaryIcon";
import { getCategoryShortLabel, getCategoryIcon } from "@/lib/categories";
import bread from "@iconify-icons/noto/bread";
import croissant from "@iconify-icons/noto/croissant";
import baguetteBread from "@iconify-icons/noto/baguette-bread";
import birthdayCake from "@iconify-icons/noto/birthday-cake";
import packageIcon from "@iconify-icons/noto/package";
import motorScooter from "@iconify-icons/noto/motor-scooter";
import checkMarkButton from "@iconify-icons/noto/check-mark-button";
import chatBubbleOutlineRounded from "@iconify-icons/material-symbols/chat-bubble-outline-rounded";
import callOutlineRounded from "@iconify-icons/material-symbols/call-outline-rounded";
import arrowForwardRounded from "@iconify-icons/material-symbols/arrow-forward-rounded";

interface StorefrontTemplateProps {
  store: Store & {
    products: Product[];
  };
}

export function WarmCrustTemplate({ store }: StorefrontTemplateProps) {
  const cleanWhatsapp = store.whatsapp ? store.whatsapp.replace(/\D/g, "") : null;
  const getWhatsappOrderUrl = (productName?: string) => {
    if (!cleanWhatsapp) return null;
    const phone = cleanWhatsapp.startsWith("91") ? cleanWhatsapp : `91${cleanWhatsapp}`;
    const text = productName
      ? `Hi ${store.name}, I would like to order "${productName}" from your Warm Crust storefront on Flour n Sugar!`
      : `Hi ${store.name}, I found your artisanal bakery on Flour n Sugar and would like to pre-order fresh bakes!`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  const newProducts = store.products.slice(0, 8);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2B1B17] font-sans selection:bg-[#F2D7C7] selection:text-[#C26D38]">
      {/* Top Artisanal Notice Bar */}
      <div className="bg-[#1C2738] text-[#E3EDF9] text-[11px] font-semibold py-2 px-4 border-b border-[#28384E]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span>🌾 100% Slow-Fermented Wild Sourdough & Pure Butter Pastries</span>
          <span className="hidden sm:inline">Lead Notice: {store.leadTimeHours || 24} Hours</span>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white/95 backdrop-blur-md sticky top-0 z-40 border-b border-[#EBE4D8] shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href={`/${store.slug}`} className="flex items-center gap-3">
            {store.logo ? (
              <img src={store.logo} alt={store.name} className="w-10 h-10 rounded-xl object-cover border border-[#E0D7C8]" />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-[#F4EFE6] text-[#C26D38] flex items-center justify-center">
                <NotoIcon icon={bread} size={24} />
              </div>
            )}
            <div>
              <span className="font-serif text-xl font-bold text-[#2B1B17] block leading-tight">
                {store.name}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C26D38] font-bold">
                Artisan Bakery & Hearth
              </span>
            </div>
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-bold text-[#574039]">
            <a href="#new" className="hover:text-[#C26D38] transition">New Bakes</a>
            <a href="#categories" className="hover:text-[#C26D38] transition">Categories</a>
            <a href="#bestseller" className="hover:text-[#C26D38] transition">Best Sellers</a>
            <a href="#deal" className="hover:text-[#C26D38] transition">Deal of the Day</a>
          </nav>

          {/* Action */}
          {getWhatsappOrderUrl() && (
            <a
              href={getWhatsappOrderUrl()!}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#E0533C] hover:bg-[#C9432E] text-white text-xs font-bold shadow-xs transition"
            >
              <MatIcon icon={chatBubbleOutlineRounded} size={15} />
              <span>Pre-order on WhatsApp</span>
            </a>
          )}
        </div>
      </header>

      {/* Dramatic Hero Section (Design 2 Flour Dust Banner) */}
      <section className="relative bg-[#1A1412] text-white py-16 sm:py-24 overflow-hidden border-b border-[#302420]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1412] via-[#2A1E1A]/90 to-[#1A1412] opacity-95" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-xl space-y-4">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#E0533C] bg-[#E0533C]/20 border border-[#E0533C]/40 px-3 py-1 rounded-full inline-block">
              UP TO 20% OFF PRE-ORDERS
            </span>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight uppercase">
              We Bake With <br />
              <span className="text-[#F29C5A] italic normal-case font-serif">Passion.</span>
            </h1>

            <p className="text-xs sm:text-sm text-[#D1B8B0] leading-relaxed">
              {store.description ||
                "Handcrafted sourdough loaves, morning butter croissants, flaky Danish pastries, and rich celebration tea cakes crafted daily from stoneground heritage flour."}
            </p>

            <div className="pt-4 flex flex-wrap gap-3">
              <a
                href="#new"
                className="px-6 py-3 rounded-xl bg-[#E0533C] hover:bg-[#C9432E] text-white text-xs font-bold shadow-md transition inline-flex items-center gap-2"
              >
                <span>Shop Fresh Bakes</span>
                <MatIcon icon={arrowForwardRounded} size={16} />
              </a>

              {store.phone && (
                <a
                  href={`tel:${store.phone}`}
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold transition inline-flex items-center gap-2"
                >
                  <MatIcon icon={callOutlineRounded} size={16} />
                  <span>Call Kitchen</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3-Category Feature Cards (Design 2 Feature) */}
      <section id="categories" className="py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-[#EBE4D8] shadow-md hover:shadow-xl transition-all space-y-2 group cursor-pointer">
            <NotoIcon icon={croissant} size={36} />
            <h3 className="font-serif text-lg font-bold text-[#2B1B17] group-hover:text-[#C26D38] transition">
              Artisan Pastries
            </h3>
            <p className="text-xs text-[#7A6158]">Pain au chocolat, almond croissants & morning buns.</p>
            <span className="text-[11px] font-bold text-[#C26D38] inline-block pt-1">Explore Pastries →</span>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#EBE4D8] shadow-md hover:shadow-xl transition-all space-y-2 group cursor-pointer">
            <NotoIcon icon={bread} size={36} />
            <h3 className="font-serif text-lg font-bold text-[#2B1B17] group-hover:text-[#C26D38] transition">
              Sourdough & Breads
            </h3>
            <p className="text-xs text-[#7A6158]">Naturally leavened loaves with crisp golden crust.</p>
            <span className="text-[11px] font-bold text-[#C26D38] inline-block pt-1">Explore Breads →</span>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#EBE4D8] shadow-md hover:shadow-xl transition-all space-y-2 group cursor-pointer">
            <NotoIcon icon={birthdayCake} size={36} />
            <h3 className="font-serif text-lg font-bold text-[#2B1B17] group-hover:text-[#C26D38] transition">
              Celebration Cakes
            </h3>
            <p className="text-xs text-[#7A6158]">Bespoke layered tortes and chocolate coffee bakes.</p>
            <span className="text-[11px] font-bold text-[#C26D38] inline-block pt-1">Explore Cakes →</span>
          </div>
        </div>
      </section>

      {/* NEW PRODUCTS CATALOG GRID (Design 2) */}
      <section id="new" className="py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-1 mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1B17]">
            New Products
          </h2>
          <p className="text-xs text-[#7A6158]">Freshly pulled from today&apos;s morning bake rotation</p>
          <div className="w-12 h-0.5 bg-[#C26D38] mx-auto mt-2 rounded-full" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          {(newProducts.length > 0 ? newProducts : store.products).map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl p-4 border border-[#EBE4D8] shadow-2xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
            >
              <div className="w-full aspect-square rounded-xl bg-[#F4EFE6] flex items-center justify-center overflow-hidden mb-3 group-hover:scale-102 transition-transform">
                {product.images && product.images.length > 0 ? (
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <NotoIcon icon={getCategoryIcon(product.category)} size={48} />
                )}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <DietaryIcon vegetarian={product.isEggless} size={12} />
                  <h3 className="font-serif font-bold text-xs sm:text-sm text-[#2B1B17] truncate">
                    {product.name}
                  </h3>
                </div>
                <p className="text-[10px] text-[#8A7168]">{getCategoryShortLabel(product.category)}</p>
                <p className="font-serif font-bold text-sm sm:text-base text-[#C26D38]">
                  ₹{parseFloat(product.price.toString()).toLocaleString("en-IN")}
                </p>
              </div>

              {getWhatsappOrderUrl(product.name) && (
                <a
                  href={getWhatsappOrderUrl(product.name)!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-3 py-2 rounded-xl bg-[#FAF7F2] group-hover:bg-[#E0533C] text-[#C26D38] group-hover:text-white text-[11px] font-bold text-center transition"
                >
                  Order on WhatsApp
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* DEAL OF THE DAY HERO STRIP (Design 2) */}
      <section id="deal" className="py-16 bg-[#F3ECE0] border-y border-[#E2D6C4]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E0D4C0] shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-lg">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#E0533C] bg-[#FCEEEA] px-3 py-1 rounded-full inline-block">
                SPECIAL BAKE OF THE DAY
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1B17]">
                Heritage Country Sourdough Loaf
              </h3>
              <p className="text-xs sm:text-sm text-[#7A6158] leading-relaxed">
                36-hour slow fermentation with stoneground whole wheat, crispy blistered crust, and open airy crumb.
              </p>
              <div className="pt-2 flex items-center gap-4">
                <span className="text-2xl font-serif font-bold text-[#C26D38]">₹220</span>
                <span className="text-xs text-[#9C857C] line-through">₹280</span>
                {getWhatsappOrderUrl("Heritage Country Sourdough Loaf") && (
                  <a
                    href={getWhatsappOrderUrl("Heritage Country Sourdough Loaf")!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-[#E0533C] hover:bg-[#C9432E] text-white text-xs font-bold shadow-xs transition"
                  >
                    Claim Today&apos;s Bake
                  </a>
                )}
              </div>
            </div>

            <div className="flex justify-center flex-shrink-0">
              <NotoIcon icon={baguetteBread} size={110} />
            </div>
          </div>
        </div>
      </section>

      {/* TRIPLE TRUST BADGES (Design 2 Deep Navy Bar) */}
      <section className="bg-[#1C2738] text-white py-12 border-t border-[#28384E]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#28384E] text-[#F29C5A] flex items-center justify-center flex-shrink-0">
              <NotoIcon icon={motorScooter} size={28} />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-white">Direct Local Delivery</h4>
              <p className="text-[11px] text-[#A6BCD8]">Within {store.deliveryRadiusKm || 10}km of {store.city || "kitchen"}</p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#28384E] text-[#F29C5A] flex items-center justify-center flex-shrink-0">
              <NotoIcon icon={checkMarkButton} size={28} />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-white">Guaranteed Fresh</h4>
              <p className="text-[11px] text-[#A6BCD8]">Baked same morning of dispatch</p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#28384E] text-[#F29C5A] flex items-center justify-center flex-shrink-0">
              <NotoIcon icon={packageIcon} size={28} />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-white">Eco Kraft Packaging</h4>
              <p className="text-[11px] text-[#A6BCD8]">Plastic-free breathable bread boxes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#141D2B] text-[#93A7C2] py-12 text-xs border-t border-[#223046]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="font-serif text-base font-bold text-white block">{store.name}</span>
            <p className="text-[11px] text-[#6E85A3]">Artisanal Sourdough & Bakery on Flour n Sugar</p>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold text-[#F29C5A]">
            <a href="#new" className="hover:underline">Bakes</a>
            <a href="#categories" className="hover:underline">Categories</a>
            <a href="#deal" className="hover:underline">Daily Special</a>
          </div>

          <p className="text-[10px] text-[#556D8D]">
            © {new Date().getFullYear()} {store.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
