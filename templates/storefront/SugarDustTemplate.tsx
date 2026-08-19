import React from "react";
import Link from "next/link";
import { Store, Product } from "@prisma/client";
import { NotoIcon } from "@/components/ui/NotoIcon";
import { MatIcon } from "@/components/ui/MatIcon";
import { DietaryIcon } from "@/components/ui/DietaryIcon";
import { getCategoryShortLabel, getCategoryIcon } from "@/lib/categories";
import cupcake from "@iconify-icons/noto/cupcake";
import doughnut from "@iconify-icons/noto/doughnut";
import birthdayCake from "@iconify-icons/noto/birthday-cake";
import shortcake from "@iconify-icons/noto/shortcake";
import lollipop from "@iconify-icons/noto/lollipop";
import sparkles from "@iconify-icons/noto/sparkles";
import fire from "@iconify-icons/noto/fire";
import pancakes from "@iconify-icons/noto/pancakes";
import chatBubbleOutlineRounded from "@iconify-icons/material-symbols/chat-bubble-outline-rounded";

interface StorefrontTemplateProps {
  store: Store & {
    products: Product[];
  };
}

export function SugarDustTemplate({ store }: StorefrontTemplateProps) {
  const cleanWhatsapp = store.whatsapp ? store.whatsapp.replace(/\D/g, "") : null;
  const getWhatsappOrderUrl = (productName?: string) => {
    if (!cleanWhatsapp) return null;
    const phone = cleanWhatsapp.startsWith("91") ? cleanWhatsapp : `91${cleanWhatsapp}`;
    const text = productName
      ? `Hi ${store.name}, I would like to order "${productName}" from your Sugar Dust storefront on Flour n Sugar!`
      : `Hi ${store.name}, I found your bakery on Flour n Sugar and would like to inquire about custom orders!`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  const bestSellers = store.products.slice(0, 4);
  const hotCakes = store.products.filter((_, i) => i % 2 === 0).slice(0, 3);
  const newCakes = store.products.filter((_, i) => i % 2 !== 0).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FFF9FA] text-[#3D2520] font-sans selection:bg-[#FDD5DC] selection:text-[#D84A6B]">
      {/* Top Cute Announcement Bar */}
      <div className="bg-[#E05A7B] text-white text-[11px] font-bold py-1.5 px-4 text-center tracking-wide">
        <span>✨ Fresh Artisan Bakes Made with Pure Love • {store.leadTimeHours || 24}h Pre-order Notice</span>
      </div>

      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-40 border-b border-[#FCE4E9] shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <Link href={`/${store.slug}`} className="flex items-center gap-2.5">
            {store.logo ? (
              <img src={store.logo} alt={store.name} className="w-10 h-10 rounded-full object-cover border border-[#FCE4E9]" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-[#FDF0F4] text-[#E05A7B] flex items-center justify-center">
                <NotoIcon icon={cupcake} size={22} />
              </div>
            )}
            <div>
              <span className="font-serif text-lg sm:text-xl font-bold text-[#3D2520] block leading-tight">
                {store.name}
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#E05A7B]">
                Pastry & Dessert Studio
              </span>
            </div>
          </Link>

          {/* Quick Nav */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-[#6D4540]">
            <a href="#bestseller" className="hover:text-[#E05A7B] transition">Best Sellers</a>
            <a href="#offers" className="hover:text-[#E05A7B] transition">Special Offers</a>
            <a href="#menu" className="hover:text-[#E05A7B] transition">Full Menu</a>
            <a href="#story" className="hover:text-[#E05A7B] transition">Our Baker</a>
          </nav>

          {/* WhatsApp Action */}
          {getWhatsappOrderUrl() && (
            <a
              href={getWhatsappOrderUrl()!}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#E05A7B] hover:bg-[#C94766] text-white text-xs font-bold shadow-xs transition cursor-pointer"
            >
              <MatIcon icon={chatBubbleOutlineRounded} size={15} />
              <span>Order on WhatsApp</span>
            </a>
          )}
        </div>
      </header>

      {/* Hero Section with Scalloped Top Ambiance */}
      <section className="relative bg-gradient-to-b from-[#FDF0F4] via-[#FFF3F6] to-[#FFF9FA] pt-12 pb-16 sm:py-20 overflow-hidden border-b border-[#FCE4E9]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#FCE4E9] shadow-2xs">
              <NotoIcon icon={sparkles} size={14} />
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#E05A7B]">
                Handcrafted Sweetness
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#3D2520] tracking-tight leading-tight">
              Sweet Treats & <br />
              <span className="text-[#E05A7B] italic">Celebration Cakes</span>
            </h1>

            <p className="text-xs sm:text-sm text-[#7D524C] leading-relaxed max-w-lg mx-auto">
              {store.description ||
                "Freshly baked gourmet cupcakes, layered dessert jars, Parisian macarons, and bespoke celebration cakes made with authentic Belgian chocolate and pure cream butter."}
            </p>

            <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#menu"
                className="px-6 py-3 rounded-full bg-[#E05A7B] hover:bg-[#C94766] text-white text-xs font-bold shadow-md hover:shadow-lg transition"
              >
                Browse Sweet Menu
              </a>
              {getWhatsappOrderUrl() && (
                <a
                  href={getWhatsappOrderUrl()!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-white hover:bg-[#FDF0F4] text-[#E05A7B] border border-[#FCE4E9] text-xs font-bold shadow-xs transition"
                >
                  Custom Pre-order Inquiries
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* BEST SELLER Section (Design 1 Carousel / Cards) */}
      <section id="bestseller" className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-1 mb-12">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#E05A7B]">
            Sweet Cupcake & Treats
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3D2520]">
            Best Seller
          </h2>
          <div className="w-12 h-0.5 bg-[#E05A7B] mx-auto mt-2 rounded-full" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {(bestSellers.length > 0 ? bestSellers : store.products).map((product, idx) => {
            const badges = ["HOT", "NEW", "20% OFF", "TOP"];
            const badge = badges[idx % badges.length];

            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl p-4 sm:p-5 border border-[#FCE4E9] shadow-xs hover:shadow-lg transition-all duration-200 text-center flex flex-col justify-between relative group"
              >
                {/* Cute Badge */}
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-[#E05A7B] text-white text-[9px] font-extrabold uppercase tracking-wider shadow-2xs">
                  {badge}
                </span>

                <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto my-3 rounded-full bg-[#FDF0F4] flex items-center justify-center overflow-hidden border-2 border-white shadow-xs group-hover:scale-105 transition-transform duration-200">
                  {product.images && product.images.length > 0 ? (
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <NotoIcon icon={idx % 2 === 0 ? cupcake : doughnut} size={48} />
                  )}
                </div>

                <div className="space-y-1 my-2">
                  <div className="flex items-center justify-center gap-1">
                    <DietaryIcon vegetarian={product.isEggless} size={12} />
                    <h3 className="font-serif font-bold text-xs sm:text-sm text-[#3D2520] truncate">
                      {product.name}
                    </h3>
                  </div>

                  <div className="flex items-center justify-center gap-0.5 text-amber-400 text-xs">
                    {"★★★★★"}
                  </div>

                  <p className="font-serif text-sm sm:text-base font-bold text-[#E05A7B]">
                    ₹{parseFloat(product.price.toString()).toLocaleString("en-IN")}
                  </p>
                </div>

                {getWhatsappOrderUrl(product.name) && (
                  <a
                    href={getWhatsappOrderUrl(product.name)!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full mt-2 py-2 rounded-2xl bg-[#FDF0F4] group-hover:bg-[#E05A7B] text-[#E05A7B] group-hover:text-white text-[11px] font-bold transition shadow-2xs block"
                  >
                    Order Now
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Baker Quote Banner (Design 1 Feature) */}
      <section className="bg-[#FDF0F4] border-y border-[#FCE4E9] py-12">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-4">
          <div className="w-16 h-16 rounded-full mx-auto bg-white p-1 border-2 border-[#E05A7B] shadow-sm flex items-center justify-center overflow-hidden">
            {store.logo ? (
              <img src={store.logo} alt={store.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              <NotoIcon icon={shortcake} size={32} />
            )}
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#E05A7B]">
              From The Kitchen of {store.name}
            </span>
            <p className="font-serif text-sm sm:text-base italic text-[#5C3B36] leading-relaxed">
              &ldquo;{store.about || "Every pudding, dessert, cake pop, and cupcake is handcrafted in small batches using whole natural ingredients, pure butter, and uncompromised love."}&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* OFFER THIS WEEK Grid (Design 1) */}
      <section id="offers" className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-1 mb-10">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#E05A7B]">
            Healthy, Fresh, Happy
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3D2520]">
            Offer This Week
          </h2>
          <div className="w-12 h-0.5 bg-[#E05A7B] mx-auto mt-2 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main Large Promo Card */}
          <div className="md:col-span-6 bg-white rounded-3xl p-6 border border-[#FCE4E9] shadow-xs flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-2 z-10">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#E05A7B] bg-[#FDF0F4] px-2.5 py-1 rounded-full">
                Weekend Special
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#3D2520]">
                Berry Pancake Stack & Dessert Box
              </h3>
              <p className="text-xs text-[#7D524C]">
                Fluffy buttermilk stack loaded with fresh blueberries, strawberries, and maple honey drip.
              </p>
              <div className="pt-2">
                <span className="text-xl font-bold font-serif text-[#E05A7B]">₹499</span>
                <span className="text-xs text-[#9C7570] line-through ml-2">₹650</span>
              </div>
            </div>
            <div className="mt-4 flex justify-center">
              <NotoIcon icon={pancakes} size={90} />
            </div>
          </div>

          {/* Side Promo Grid */}
          <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-3xl p-5 border border-[#FCE4E9] shadow-xs space-y-2 text-center">
              <NotoIcon icon={birthdayCake} size={48} />
              <h4 className="font-serif font-bold text-sm text-[#3D2520]">Custom Birthday Cakes</h4>
              <p className="text-[11px] text-[#7D524C]">Bespoke floral & chocolate drip designs</p>
              <span className="text-xs font-bold text-[#E05A7B] block">From ₹850</span>
            </div>

            <div className="bg-white rounded-3xl p-5 border border-[#FCE4E9] shadow-xs space-y-2 text-center">
              <NotoIcon icon={lollipop} size={48} />
              <h4 className="font-serif font-bold text-sm text-[#3D2520]">Celebration Cake Pops</h4>
              <p className="text-[11px] text-[#7D524C]">Colorful sprinkles & ganache centers</p>
              <span className="text-xs font-bold text-[#E05A7B] block">Pack of 6 • ₹299</span>
            </div>
          </div>
        </div>
      </section>

      {/* HOT CAKE & NEW CAKE Mini Menus (Design 1 Dual Columns) */}
      <section id="menu" className="py-16 bg-[#FDF0F4]/60 border-t border-[#FCE4E9]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Hot Cakes Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b-2 border-[#E05A7B]">
                <NotoIcon icon={fire} size={18} />
                <h3 className="font-serif text-xl font-bold text-[#3D2520]">HOT CAKE</h3>
              </div>

              <div className="space-y-3">
                {hotCakes.map((cake) => (
                  <div key={cake.id} className="bg-white rounded-2xl p-3.5 border border-[#FCE4E9] flex items-center justify-between gap-3 shadow-2xs">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#FDF0F4] flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {cake.images && cake.images.length > 0 ? (
                          <img src={cake.images[0]} alt={cake.name} className="w-full h-full object-cover" />
                        ) : (
                          <NotoIcon icon={getCategoryIcon(cake.category)} size={22} />
                        )}
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-xs text-[#3D2520]">{cake.name}</h4>
                        <span className="text-[10px] text-[#7D524C]">{getCategoryShortLabel(cake.category)}</span>
                        <p className="font-bold text-xs text-[#E05A7B]">₹{parseFloat(cake.price.toString()).toLocaleString("en-IN")}</p>
                      </div>
                    </div>
                    {getWhatsappOrderUrl(cake.name) && (
                      <a
                        href={getWhatsappOrderUrl(cake.name)!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-[#FDF0F4] hover:bg-[#E05A7B] text-[#E05A7B] hover:text-white text-[10px] font-bold transition"
                      >
                        Order
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* New Cakes Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b-2 border-[#E05A7B]">
                <NotoIcon icon={sparkles} size={18} />
                <h3 className="font-serif text-xl font-bold text-[#3D2520]">NEW CREATIONS</h3>
              </div>

              <div className="space-y-3">
                {newCakes.map((cake) => (
                  <div key={cake.id} className="bg-white rounded-2xl p-3.5 border border-[#FCE4E9] flex items-center justify-between gap-3 shadow-2xs">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#FDF0F4] flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {cake.images && cake.images.length > 0 ? (
                          <img src={cake.images[0]} alt={cake.name} className="w-full h-full object-cover" />
                        ) : (
                          <NotoIcon icon={getCategoryIcon(cake.category)} size={22} />
                        )}
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-xs text-[#3D2520]">{cake.name}</h4>
                        <span className="text-[10px] text-[#7D524C]">{getCategoryShortLabel(cake.category)}</span>
                        <p className="font-bold text-xs text-[#E05A7B]">₹{parseFloat(cake.price.toString()).toLocaleString("en-IN")}</p>
                      </div>
                    </div>
                    {getWhatsappOrderUrl(cake.name) && (
                      <a
                        href={getWhatsappOrderUrl(cake.name)!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-[#FDF0F4] hover:bg-[#E05A7B] text-[#E05A7B] hover:text-white text-[10px] font-bold transition"
                      >
                        Order
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR BAKER Spotlight (Design 1) */}
      <section id="story" className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 space-y-3">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#E05A7B]">
              Artisan Craftsmanship
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3D2520]">
              Our Passionate Bakers
            </h2>
            <p className="text-xs sm:text-sm text-[#7D524C] leading-relaxed">
              Every creation starts with freshly sifted flour, unbleached grains, and hours of artisanal patience.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-xs font-bold text-[#E05A7B]">
              <span className="bg-[#FDF0F4] px-3 py-1 rounded-full">✨ 100% Wholesome Ingredients</span>
              <span className="bg-[#FDF0F4] px-3 py-1 rounded-full">✨ Zero Artificial Preservatives</span>
              <span className="bg-[#FDF0F4] px-3 py-1 rounded-full">✨ Custom Dietary Options</span>
            </div>
          </div>

          <div className="md:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#FCE4E9] shadow-xs space-y-4 text-xs sm:text-sm text-[#5C3B36] leading-relaxed">
            <h3 className="font-serif text-lg font-bold text-[#3D2520]">Meet the Baker behind {store.name}</h3>
            <p>{store.about || "We believe in baking memories. From small tea parties to lavish birthday bashes, our ovens are always preheated to craft pure joy."}</p>
            <div className="pt-2 flex items-center gap-4 text-xs text-[#7D524C]">
              <span>📍 {store.city || "Local Kitchen"}</span>
              <span>🛵 {store.deliveryRadiusKm || 10}km Radius</span>
              <span>⏱️ {store.leadTimeHours || 24}h Lead Time</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2D1B1C] text-[#E8D6D8] py-12 text-xs border-t border-[#442C2E]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="font-serif text-base font-bold text-white block">{store.name}</span>
            <p className="text-[11px] text-[#B89EA0]">Verified Artisan Storefront on Flour n Sugar</p>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold text-[#E05A7B]">
            <a href="#bestseller" className="hover:underline">Best Sellers</a>
            <a href="#menu" className="hover:underline">Catalog</a>
            <a href="#story" className="hover:underline">Story</a>
          </div>

          <p className="text-[10px] text-[#8C6D70]">
            © {new Date().getFullYear()} {store.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
