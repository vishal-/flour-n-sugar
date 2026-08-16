"use client";

import { useState, useEffect } from "react";
import { slugify } from "@/lib/slugify";

export interface StepBasicsData {
  name: string;
  slug: string;
  storeType: "HOME_BAKER" | "BAKERY" | "CAKE_SHOP" | "CAFE" | "OTHER";
  description: string;
  logo: string;
  phone: string;
  contactEmail: string;
}

interface StepBasicsProps {
  data: StepBasicsData;
  onChange: (data: Partial<StepBasicsData>) => void;
  errors: Record<string, string>;
}

const STORE_TYPES = [
  {
    id: "HOME_BAKER" as const,
    title: "Home Baker",
    icon: "🏠",
    desc: "Baking fresh from your home kitchen on pre-order",
  },
  {
    id: "BAKERY" as const,
    title: "Artisanal Bakery",
    icon: "🥐",
    desc: "Independent bakery with daily fresh bakes & breads",
  },
  {
    id: "CAKE_SHOP" as const,
    title: "Custom Cake Studio",
    icon: "🎂",
    desc: "Specialized in designer wedding & birthday celebration cakes",
  },
  {
    id: "CAFE" as const,
    title: "Bakery Cafe",
    icon: "☕",
    desc: "Cafe offering dessert slices, pastries & beverages",
  },
  {
    id: "OTHER" as const,
    title: "Dessert Studio / Other",
    icon: "✨",
    desc: "Macaron boutique, chocolate atelier, or cloud kitchen",
  },
];

export function StepBasics({ data, onChange, errors }: StepBasicsProps) {
  const [slugStatus, setSlugStatus] = useState<{
    checking: boolean;
    available?: boolean;
    message?: string;
  }>({ checking: false });

  // Auto-generate slug when name changes if user hasn't explicitly customized slug
  const handleNameChange = (newName: string) => {
    const autoSlug = slugify(newName);
    onChange({ name: newName, slug: autoSlug });
  };

  // Check slug availability with debounce
  useEffect(() => {
    if (!data.slug || data.slug.length < 3) {
      setSlugStatus({ checking: false });
      return;
    }

    const timer = setTimeout(async () => {
      setSlugStatus({ checking: true });
      try {
        const res = await fetch(`/api/stores/check-slug?slug=${encodeURIComponent(data.slug)}`);
        const result = await res.json();
        setSlugStatus({
          checking: false,
          available: result.available,
          message: result.message,
        });
      } catch {
        setSlugStatus({ checking: false });
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [data.slug]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Section Header */}
      <div>
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-primary">Step 1 of 4</span>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-dark-brown dark:text-rose-50 mt-1">
          Store Basics
        </h2>
        <p className="text-xs text-dark-brown/60 dark:text-rose-200/60 mt-1">
          Let&apos;s establish your bakery name, identity, and storefront URL.
        </p>
      </div>

      {/* Store Name & Slug */}
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-dark-brown/80 dark:text-rose-100/80 mb-1.5">
            Bakery / Store Name <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Sweet Delights By Marie"
            value={data.name}
            onChange={(e) => handleNameChange(e.target.value)}
            className={`w-full px-4 py-3 rounded-2xl border text-sm font-semibold text-dark-brown dark:text-rose-100 outline-none transition bg-white dark:bg-[#33221e] ${
              errors.name
                ? "border-red-400 focus:border-red-500"
                : "border-rose-100 dark:border-rose-950/60 focus:border-primary"
            }`}
          />
          {errors.name && <p className="text-[11px] text-red-500 font-medium mt-1">{errors.name}</p>}
        </div>

        {/* SEO Friendly URL Handle */}
        <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100/60 dark:border-rose-900/30 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-dark-brown/80 dark:text-rose-100/80">Your Storefront URL</span>
            {slugStatus.checking ? (
              <span className="text-[10px] text-dark-brown/40 dark:text-rose-200/40">Checking availability...</span>
            ) : slugStatus.available === true ? (
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                ✓ Handle Available
              </span>
            ) : slugStatus.available === false ? (
              <span className="text-[10px] font-bold text-red-500 flex items-center gap-1">
                ✗ {slugStatus.message}
              </span>
            ) : null}
          </div>

          <div className="flex items-center rounded-xl bg-white dark:bg-[#2b1b17] border border-rose-100 dark:border-rose-950/60 px-3 py-2 text-xs font-semibold overflow-hidden">
            <span className="text-dark-brown/40 dark:text-rose-200/40 select-none">flournsugar.com/</span>
            <input
              type="text"
              value={data.slug}
              onChange={(e) => onChange({ slug: slugify(e.target.value) })}
              placeholder="your-bakery-slug"
              className="w-full text-xs font-bold text-primary outline-none bg-transparent"
            />
          </div>
          <p className="text-[10px] text-dark-brown/50 dark:text-rose-200/50">
            Customers will use this direct link to view your menu and place custom orders.
          </p>
        </div>
      </div>

      {/* Store Type Cards */}
      <div className="space-y-3">
        <label className="block text-xs font-bold text-dark-brown/80 dark:text-rose-100/80">
          Bakery Type <span className="text-primary">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {STORE_TYPES.map((type) => {
            const isSelected = data.storeType === type.id;
            return (
              <button
                type="button"
                key={type.id}
                onClick={() => onChange({ storeType: type.id })}
                className={`p-4 rounded-2xl text-left border transition-all cursor-pointer flex items-start gap-3.5 ${
                  isSelected
                    ? "bg-rose-50/90 dark:bg-rose-950/40 border-primary shadow-xs ring-1 ring-primary"
                    : "bg-white dark:bg-[#33221e] border-rose-100/70 dark:border-rose-950/50 hover:border-rose-200 dark:hover:border-rose-900/60"
                }`}
              >
                <span className="text-2xl p-2 rounded-xl bg-white dark:bg-[#2b1b17] shadow-xs flex-shrink-0">
                  {type.icon}
                </span>
                <div className="space-y-0.5">
                  <span className="block text-xs font-extrabold text-dark-brown dark:text-rose-50">
                    {type.title}
                  </span>
                  <span className="block text-[11px] text-dark-brown/60 dark:text-rose-200/60 leading-tight">
                    {type.desc}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tagline & Logo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-dark-brown/80 dark:text-rose-100/80">
            Short Tagline
          </label>
          <input
            type="text"
            placeholder="e.g. 100% Eggless Custom Cakes & Brownies"
            value={data.description}
            onChange={(e) => onChange({ description: e.target.value })}
            className="w-full px-4 py-3 rounded-2xl border border-rose-100 dark:border-rose-950/60 text-xs font-semibold text-dark-brown dark:text-rose-100 outline-none focus:border-primary transition bg-white dark:bg-[#33221e]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-dark-brown/80 dark:text-rose-100/80">
            Logo / Profile Image URL
          </label>
          <input
            type="url"
            placeholder="https://..."
            value={data.logo}
            onChange={(e) => onChange({ logo: e.target.value })}
            className="w-full px-4 py-3 rounded-2xl border border-rose-100 dark:border-rose-950/60 text-xs font-semibold text-dark-brown dark:text-rose-100 outline-none focus:border-primary transition bg-white dark:bg-[#33221e]"
          />
        </div>
      </div>

      {/* Phone & Contact Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-dark-brown/80 dark:text-rose-100/80">
            WhatsApp / Order Contact Phone <span className="text-primary">*</span>
          </label>
          <input
            type="tel"
            placeholder="e.g. +91 98765 43210"
            value={data.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            className={`w-full px-4 py-3 rounded-2xl border text-xs font-semibold text-dark-brown dark:text-rose-100 outline-none transition bg-white dark:bg-[#33221e] ${
              errors.phone
                ? "border-red-400 focus:border-red-500"
                : "border-rose-100 dark:border-rose-950/60 focus:border-primary"
            }`}
          />
          {errors.phone && <p className="text-[11px] text-red-500 font-medium mt-1">{errors.phone}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-dark-brown/80 dark:text-rose-100/80">
            Bakery Business Email
          </label>
          <input
            type="email"
            placeholder="e.g. orders@sweetdelights.com"
            value={data.contactEmail}
            onChange={(e) => onChange({ contactEmail: e.target.value })}
            className="w-full px-4 py-3 rounded-2xl border border-rose-100 dark:border-rose-950/60 text-xs font-semibold text-dark-brown dark:text-rose-100 outline-none focus:border-primary transition bg-white dark:bg-[#33221e]"
          />
        </div>
      </div>
    </div>
  );
}
