import React from "react";
import Link from "next/link";
import { Store, Product } from "@prisma/client";
import { NotoIcon } from "@/components/ui/NotoIcon";
import { MatIcon } from "@/components/ui/MatIcon";
import { DietaryIcon } from "@/components/ui/DietaryIcon";
import { getCategoryShortLabel, getCategoryIcon } from "@/lib/categories";
import waffle from "@iconify-icons/noto/waffle";
import iceCream from "@iconify-icons/noto/ice-cream";
import shavedIce from "@iconify-icons/noto/shaved-ice";
import cupcake from "@iconify-icons/noto/cupcake";
import doughnut from "@iconify-icons/noto/doughnut";
import shortcake from "@iconify-icons/noto/shortcake";
import lollipop from "@iconify-icons/noto/lollipop";
import candy from "@iconify-icons/noto/candy";
import sparkles from "@iconify-icons/noto/sparkles";
import chatBubbleOutlineRounded from "@iconify-icons/material-symbols/chat-bubble-outline-rounded";

interface StorefrontTemplateProps {
  store: Store & {
    products: Product[];
  };
}

export function HoneyDripTemplate({ store }: StorefrontTemplateProps) {
  const cleanWhatsapp = store.whatsapp ? store.whatsapp.replace(/\D/g, "") : null;
  const getWhatsappOrderUrl = (productName?: string) => {
    if (!cleanWhatsapp) return null;
    const phone = cleanWhatsapp.startsWith("91") ? cleanWhatsapp : `91${cleanWhatsapp}`;
    const text = productName
      ? `Hi ${store.name}, I would like to order "${productName}" from your Honey Drip dessert parlour on Flour n Sugar!`
      : `Hi ${store.name}, I found your dessert parlour on Flour n Sugar and would like to order!`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  const bestSelling = store.products.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#FFFDF7] text-[#2C1E10] font-sans selection:bg-[#FFE0A3] selection:text-[#B86800]">
      {/* Top Banner */}
      <div className="bg-[#241A12] text-[#FDE3B8] text-[11px] font-bold py-2 px-4 border-b border-[#3D2C1E]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span>🍦 Artisanal Waffles, Gelato Jars & Handcrafted Dessert Treats</span>
          <span className="hidden sm:inline">Lead Notice: {store.leadTimeHours || 24}h</span>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white/95 backdrop-blur-md sticky top-0 z-40 border-b border-[#F5E6CC] shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href={`/${store.slug}`} className="flex items-center gap-3">
            {store.logo ? (
              <img src={store.logo} alt={store.name} className="w-10 h-10 rounded-full object-cover border border-[#EBD4AF]" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-[#FEF4E2] text-[#E08A1E] flex items-center justify-center">
                <NotoIcon icon={waffle} size={24} />
              </div>
            )}
            <div>
              <span className="font-serif text-xl font-bold text-[#2C1E10] block leading-tight">
                {store.name}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#E08A1E] font-bold">
                Dessert Parlour & Sweets
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-xs font-bold text-[#6B4E32]">
            <a href="#whyus" className="hover:text-[#E08A1E] transition">Why Us</a>
            <a href="#work" className="hover:text-[#E08A1E] transition">Our Sweets</a>
            <a href="#services" className="hover:text-[#E08A1E] transition">Custom Catering</a>
            <a href="#bestseller" className="hover:text-[#E08A1E] transition">Best Sellers</a>
          </nav>

          {getWhatsappOrderUrl() && (
            <a
              href={getWhatsappOrderUrl()!}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#E08A1E] hover:bg-[#C47413] text-white text-xs font-bold shadow-xs transition"
            >
              <MatIcon icon={chatBubbleOutlineRounded} size={15} />
              <span>Order on WhatsApp</span>
            </a>
          )}
        </div>
      </header>

      {/* Hero Section (Design 3 Waffle Cone Banner) */}
      <section className="relative bg-gradient-to-b from-[#FFF5E0] via-[#FFF9ED] to-[#FFFDF7] py-16 sm:py-24 border-b border-[#F5E6CC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#EBD4AF] shadow-2xs">
            <NotoIcon icon={sparkles} size={14} />
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#E08A1E]">
              Freshly Whipped & Churned
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#2C1E10] tracking-tight leading-tight">
            Artisanal Dessert Jars & <br />
            <span className="text-[#E08A1E] italic">Sweet Confections</span>
          </h1>

          <p className="text-xs sm:text-sm text-[#7D5B3A] leading-relaxed max-w-lg mx-auto">
            {store.description ||
              "From warm Belgian waffle boxes and layered chocolate pudding pots to colorful French macarons and celebration dessert platters."}
          </p>

          <div className="pt-4 flex justify-center gap-3">
            <a
              href="#bestseller"
              className="px-8 py-3.5 rounded-full bg-[#241A12] hover:bg-[#3D2C1E] text-white text-xs font-bold tracking-wider uppercase shadow-md transition"
            >
              Explore Menu
            </a>
          </div>
        </div>
      </section>

      {/* "Why Us" Curved Wave Section (Design 3 Seafoam Mint Wave) */}
      <section id="whyus" className="bg-[#48C7B0] text-white py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-1 mb-10">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Why {store.name}
            </h2>
            <p className="text-xs text-[#DCF7F2]">Pure ingredients, zero artificial essences, authentic indulgence</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div className="space-y-2">
              <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center mx-auto">
                <NotoIcon icon={iceCream} size={32} />
              </div>
              <h3 className="font-serif font-bold text-sm text-white">Pure Ingredients</h3>
              <p className="text-[11px] text-[#DCF7F2]">100% natural dairy butter and Belgian cocoa.</p>
            </div>

            <div className="space-y-2">
              <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center mx-auto">
                <NotoIcon icon={waffle} size={32} />
              </div>
              <h3 className="font-serif font-bold text-sm text-white">Warm Delivery</h3>
              <p className="text-[11px] text-[#DCF7F2]">Crisp waffle & dessert packs within {store.deliveryRadiusKm || 10}km.</p>
            </div>

            <div className="space-y-2">
              <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center mx-auto">
                <NotoIcon icon={cupcake} size={32} />
              </div>
              <h3 className="font-serif font-bold text-sm text-white">Handcrafted Taste</h3>
              <p className="text-[11px] text-[#DCF7F2]">Whipped and frosted in small artisan batches.</p>
            </div>

            <div className="space-y-2">
              <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center mx-auto">
                <NotoIcon icon={shavedIce} size={32} />
              </div>
              <h3 className="font-serif font-bold text-sm text-white">Custom Dietary</h3>
              <p className="text-[11px] text-[#DCF7F2]">Eggless, vegan, and reduced sugar options.</p>
            </div>
          </div>
        </div>
      </section>

      {/* "Our Work" 8-Tile Visual Gallery (Design 3) */}
      <section id="work" className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-1 mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C1E10]">
            Our Creations
          </h2>
          <p className="text-xs text-[#7D5B3A]">A glimpse into our kitchen&apos;s daily dessert repertoire</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[cupcake, doughnut, shortcake, lollipop, iceCream, candy, waffle, shavedIce].map((icon, idx) => (
            <div
              key={idx}
              className="aspect-square rounded-3xl bg-[#FFF5E0] border border-[#F5E6CC] flex items-center justify-center shadow-xs hover:shadow-md hover:scale-102 transition-all group"
            >
              <NotoIcon icon={icon} size={54} />
            </div>
          ))}
        </div>
      </section>

      {/* "Our Services" Golden Section (Design 3) */}
      <section id="services" className="bg-[#F8BA43] py-16 text-[#2C1E10]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-1 mb-10">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C1E10]">
              Custom Catering & Gifting
            </h2>
            <p className="text-xs text-[#4A3215]">Elevate your celebrations with custom dessert tables</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-6 shadow-md space-y-2 text-center">
              <NotoIcon icon={shortcake} size={42} />
              <h3 className="font-serif font-bold text-base text-[#2C1E10]">Party Platter Boxes</h3>
              <p className="text-xs text-[#6B4E32]">Curated boxes of mini cupcakes, tarts, and brownies for gatherings.</p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-md space-y-2 text-center">
              <NotoIcon icon={waffle} size={42} />
              <h3 className="font-serif font-bold text-base text-[#2C1E10]">Warm Waffle Bars</h3>
              <p className="text-xs text-[#6B4E32]">Live sweet waffle setups with melted chocolate & fresh fruit dips.</p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-md space-y-2 text-center">
              <NotoIcon icon={candy} size={42} />
              <h3 className="font-serif font-bold text-base text-[#2C1E10]">Corporate Sweet Gifting</h3>
              <p className="text-xs text-[#6B4E32]">Branded dessert hampers and festive sweet gift packages.</p>
            </div>
          </div>
        </div>
      </section>

      {/* BEST SELLING PRODUCTS (Design 3) */}
      <section id="bestseller" className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-1 mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C1E10]">
            Best Selling Products
          </h2>
          <p className="text-xs text-[#7D5B3A]">Customer favorites ready for pre-order</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {(bestSelling.length > 0 ? bestSelling : store.products).map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl p-4 border border-[#F5E6CC] shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div className="w-full aspect-square rounded-2xl bg-[#FFF9ED] flex items-center justify-center overflow-hidden mb-3 group-hover:scale-102 transition-transform">
                {product.images && product.images.length > 0 ? (
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <NotoIcon icon={getCategoryIcon(product.category)} size={48} />
                )}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <DietaryIcon vegetarian={product.isEggless} size={12} />
                  <h3 className="font-serif font-bold text-xs sm:text-sm text-[#2C1E10] truncate">
                    {product.name}
                  </h3>
                </div>
                <p className="text-[10px] text-[#8C6D4C]">{getCategoryShortLabel(product.category)}</p>
                <p className="font-serif font-bold text-sm sm:text-base text-[#E08A1E]">
                  ₹{parseFloat(product.price.toString()).toLocaleString("en-IN")}
                </p>
              </div>

              {getWhatsappOrderUrl(product.name) && (
                <a
                  href={getWhatsappOrderUrl(product.name)!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-3 py-2 rounded-2xl bg-[#241A12] hover:bg-[#3D2C1E] text-white text-[11px] font-bold text-center transition"
                >
                  Order
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A120B] text-[#D4BEA2] py-12 text-xs border-t border-[#2C1E10]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="font-serif text-base font-bold text-white block">{store.name}</span>
            <p className="text-[11px] text-[#A68F72]">Artisanal Dessert Parlour on Flour n Sugar</p>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold text-[#F8BA43]">
            <a href="#whyus" className="hover:underline">Why Us</a>
            <a href="#work" className="hover:underline">Gallery</a>
            <a href="#bestseller" className="hover:underline">Best Sellers</a>
          </div>

          <p className="text-[10px] text-[#7A644B]">
            © {new Date().getFullYear()} {store.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
