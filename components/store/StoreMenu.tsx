"use client";

import { useState, useMemo } from "react";
import { NotoIcon } from "@/components/ui/NotoIcon";
import { MatIcon } from "@/components/ui/MatIcon";
import { DietaryIcon } from "@/components/ui/DietaryIcon";
import { getCategoryShortLabel, getCategoryIcon } from "@/lib/categories";
import shortcake from "@iconify-icons/noto/shortcake";
import cupcake from "@iconify-icons/noto/cupcake";
import chatBubbleOutlineRounded from "@iconify-icons/material-symbols/chat-bubble-outline-rounded";
import searchRounded from "@iconify-icons/material-symbols/search-rounded";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number | string | { toString(): string };
  images: string[];
  category: string | null;
  isEggless: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
}

interface StoreMenuProps {
  products: Product[];
  storeName: string;
  whatsapp?: string | null;
}

export function StoreMenu({ products, storeName, whatsapp }: StoreMenuProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [dietaryFilter, setDietaryFilter] = useState<"ALL" | "EGGLESS" | "VEGAN" | "GLUTEN_FREE">("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Extract unique categories from products
  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.category && p.category.trim()) {
        set.add(p.category.trim());
      }
    });
    return Array.from(set);
  }, [products]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== "ALL" && p.category !== selectedCategory) {
        return false;
      }

      // Dietary filter
      if (dietaryFilter === "EGGLESS" && !p.isEggless) return false;
      if (dietaryFilter === "VEGAN" && !p.isVegan) return false;
      if (dietaryFilter === "GLUTEN_FREE" && !p.isGlutenFree) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesDesc = p.description?.toLowerCase().includes(query);
        const matchesCat = p.category?.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCat) return false;
      }

      return true;
    });
  }, [products, selectedCategory, dietaryFilter, searchQuery]);

  const cleanWhatsapp = whatsapp ? whatsapp.replace(/\D/g, "") : null;
  const whatsappPrefix = cleanWhatsapp ? (cleanWhatsapp.startsWith("91") ? cleanWhatsapp : `91${cleanWhatsapp}`) : null;

  return (
    <section id="menu" className="py-12 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-primary">
            Freshly Baked Menu
          </span>
          <h2 className="font-serif text-3xl font-bold text-dark-brown dark:text-rose-50 mt-1">
            Signature Treats & Bakes
          </h2>
          <p className="text-xs text-dark-brown/60 dark:text-rose-200/60 mt-1">
            All items are freshly handcrafted to order. Select any treat to chat and reserve.
          </p>
        </div>

        {/* Search Input */}
        {products.length > 3 && (
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search treats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-2xl bg-white dark:bg-[#33221e] border border-rose-100 dark:border-rose-950/60 text-xs font-semibold text-dark-brown dark:text-rose-100 outline-none focus:border-primary transition shadow-xs"
            />
            <MatIcon
              icon={searchRounded}
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-brown/40 dark:text-rose-200/40"
            />
          </div>
        )}
      </div>

      {/* Category Tabs & Dietary Filter Badges */}
      {products.length > 0 && (
        <div className="space-y-4 mb-8">
          {/* Category Chips */}
          {categories.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedCategory("ALL")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                  selectedCategory === "ALL"
                    ? "bg-primary text-white shadow-xs"
                    : "bg-white dark:bg-[#33221e] text-dark-brown/70 dark:text-rose-200/70 border border-rose-100 dark:border-rose-950/60 hover:bg-rose-50"
                }`}
              >
                All Bakes ({products.length})
              </button>
              {categories.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                    selectedCategory === cat
                      ? "bg-primary text-white shadow-xs"
                      : "bg-white dark:bg-[#33221e] text-dark-brown/70 dark:text-rose-200/70 border border-rose-100 dark:border-rose-950/60 hover:bg-rose-50"
                  }`}
                >
                  <NotoIcon icon={getCategoryIcon(cat)} size={14} />
                  <span>{getCategoryShortLabel(cat)}</span>
                </button>
              ))}
            </div>
          )}

          {/* Dietary Filters */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-bold">
            <span className="text-dark-brown/50 dark:text-rose-200/50 mr-1 text-[10px] uppercase tracking-wider">
              Dietary:
            </span>
            <button
              type="button"
              onClick={() => setDietaryFilter(dietaryFilter === "EGGLESS" ? "ALL" : "EGGLESS")}
              className={`px-2.5 py-1 rounded-lg border transition cursor-pointer flex items-center gap-1.5 ${
                dietaryFilter === "EGGLESS"
                  ? "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500"
                  : "bg-white dark:bg-[#33221e] border-rose-100 dark:border-rose-950/60 text-dark-brown/70 dark:text-rose-200/70"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>100% Eggless</span>
            </button>

            <button
              type="button"
              onClick={() => setDietaryFilter(dietaryFilter === "VEGAN" ? "ALL" : "VEGAN")}
              className={`px-2.5 py-1 rounded-lg border transition cursor-pointer flex items-center gap-1.5 ${
                dietaryFilter === "VEGAN"
                  ? "bg-green-50 dark:bg-green-950/60 border-green-500 text-green-700 dark:text-green-300 ring-1 ring-green-500"
                  : "bg-white dark:bg-[#33221e] border-rose-100 dark:border-rose-950/60 text-dark-brown/70 dark:text-rose-200/70"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-green-600" />
              <span>Vegan</span>
            </button>

            <button
              type="button"
              onClick={() => setDietaryFilter(dietaryFilter === "GLUTEN_FREE" ? "ALL" : "GLUTEN_FREE")}
              className={`px-2.5 py-1 rounded-lg border transition cursor-pointer flex items-center gap-1.5 ${
                dietaryFilter === "GLUTEN_FREE"
                  ? "bg-amber-50 dark:bg-amber-950/60 border-amber-500 text-amber-700 dark:text-amber-300 ring-1 ring-amber-500"
                  : "bg-white dark:bg-[#33221e] border-rose-100 dark:border-rose-950/60 text-dark-brown/70 dark:text-rose-200/70"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Gluten-Free</span>
            </button>

            {(dietaryFilter !== "ALL" || selectedCategory !== "ALL" || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("ALL");
                  setDietaryFilter("ALL");
                  setSearchQuery("");
                }}
                className="text-[10px] text-primary hover:underline ml-2 cursor-pointer font-bold"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>
      )}

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const rawPrice = product.price ? product.price.toString() : "0";
            const formattedPrice = parseFloat(rawPrice).toLocaleString("en-IN");
            const firstImage = product.images && product.images.length > 0 ? product.images[0] : null;

            const productOrderUrl = whatsappPrefix
              ? `https://wa.me/${whatsappPrefix}?text=${encodeURIComponent(
                  `Hi ${storeName}! I saw "${product.name}" (₹${formattedPrice}) on your Flour n Sugar storefront and would like to order / inquire about availability.`
                )}`
              : null;

            return (
              <div
                key={product.id}
                className="bg-white dark:bg-[#2b1b17] rounded-3xl border border-rose-100/80 dark:border-rose-950/50 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col group"
              >
                {/* Image Section */}
                <div className="relative w-full h-48 bg-rose-50/50 dark:bg-rose-950/30 overflow-hidden">
                  {firstImage ? (
                    <img
                      src={firstImage}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-primary-light">
                      <NotoIcon icon={shortcake} size={48} />
                      <span className="text-[10px] font-bold text-dark-brown/40 dark:text-rose-200/40 mt-1">
                        Fresh Handcrafted
                      </span>
                    </div>
                  )}

                  {/* Category Chip */}
                  {product.category && (
                    <span className="absolute top-3 left-3 bg-white/90 dark:bg-[#2b1b17]/90 backdrop-blur-xs text-dark-brown dark:text-rose-100 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
                      <NotoIcon icon={getCategoryIcon(product.category)} size={12} />
                      <span>{getCategoryShortLabel(product.category)}</span>
                    </span>
                  )}

                  {/* Dietary Badges */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <DietaryIcon vegetarian={product.isEggless} size={18} />
                    {product.isVegan && (
                      <span
                        title="Vegan"
                        className="w-5 h-5 rounded-md bg-white/95 dark:bg-[#2b1b17]/95 backdrop-blur-xs flex items-center justify-center shadow-xs border border-green-200 text-[10px]"
                      >
                        🌱
                      </span>
                    )}
                    {product.isGlutenFree && (
                      <span
                        title="Gluten-Free"
                        className="w-5 h-5 rounded-md bg-white/95 dark:bg-[#2b1b17]/95 backdrop-blur-xs flex items-center justify-center shadow-xs border border-amber-200 text-[10px]"
                      >
                        🌾
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="font-serif text-lg font-bold text-dark-brown dark:text-rose-50 leading-snug group-hover:text-primary transition">
                      {product.name}
                    </h3>
                    {product.description && (
                      <p className="text-xs text-dark-brown/65 dark:text-rose-200/65 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    )}
                  </div>

                  {/* Price & Action Button */}
                  <div className="pt-2 border-t border-rose-100/60 dark:border-rose-950/40 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] text-dark-brown/50 dark:text-rose-200/50 block font-medium">
                        Price
                      </span>
                      <span className="font-serif text-lg font-bold text-primary">
                        ₹{formattedPrice}
                      </span>
                    </div>

                    {productOrderUrl ? (
                      <a
                        href={productOrderUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-600 hover:text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                      >
                        <MatIcon icon={chatBubbleOutlineRounded} size={15} />
                        <span>Order Bake</span>
                      </a>
                    ) : (
                      <a
                        href="#contact"
                        className="px-3.5 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-primary hover:bg-primary hover:text-white text-xs font-bold transition"
                      >
                        Inquire
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-6 bg-white dark:bg-[#2b1b17] rounded-3xl border border-rose-100 dark:border-rose-950/50 shadow-xs max-w-xl mx-auto space-y-4">
          <div className="flex justify-center">
            <NotoIcon icon={cupcake} size={48} />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-xl font-bold text-dark-brown dark:text-rose-50">
              {products.length === 0 ? "Bespoke Custom Orders" : "No matching treats found"}
            </h3>
            <p className="text-xs text-dark-brown/65 dark:text-rose-200/65 max-w-md mx-auto leading-relaxed">
              {products.length === 0
                ? `${storeName} specializes in custom designer celebration cakes, party favors, and bespoke bakes. Contact the baker directly with your theme and flavor preferences.`
                : "Try clearing your filters or search keywords to view all signature items."}
            </p>
          </div>

          {products.length === 0 && whatsappPrefix && (
            <a
              href={`https://wa.me/${whatsappPrefix}?text=${encodeURIComponent(
                `Hi ${storeName}! I'd like to discuss a custom order request.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#25D366] text-white text-xs font-bold shadow-sm hover:opacity-90 transition cursor-pointer mt-2"
            >
              <MatIcon icon={chatBubbleOutlineRounded} size={16} />
              <span>Discuss Custom Cake on WhatsApp</span>
            </a>
          )}
        </div>
      )}
    </section>
  );
}
