"use client";

import { useState } from "react";
import { NotoIcon } from "@/components/ui/NotoIcon";
import shortcake from "@iconify-icons/noto/shortcake";

export interface OnboardingProduct {
  id: string;
  name: string;
  price: string;
  category: string;
  description: string;
  isEggless: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  images: string[];
}

interface StepProductsProps {
  products: OnboardingProduct[];
  onChange: (products: OnboardingProduct[]) => void;
}

const CATEGORY_PRESETS = ["Cakes", "Cupcakes", "Brownies", "Pastries", "Cookies", "Breads", "Desserts"];

export function StepProducts({ products, onChange }: StepProductsProps) {
  const [showAddForm, setShowAddForm] = useState(products.length === 0);

  // New item form state
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Cakes");
  const [description, setDescription] = useState("");
  const [isEggless, setIsEggless] = useState(true);
  const [isVegan, setIsVegan] = useState(false);
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price) return;

    const newProduct: OnboardingProduct = {
      id: "prod-" + Date.now(),
      name: name.trim(),
      price: price.trim(),
      category,
      description: description.trim(),
      isEggless,
      isVegan,
      isGlutenFree,
      images: imageUrl.trim() ? [imageUrl.trim()] : [],
    };

    onChange([...products, newProduct]);

    // Reset form
    setName("");
    setPrice("");
    setDescription("");
    setImageUrl("");
    setIsEggless(true);
    setIsVegan(false);
    setIsGlutenFree(false);
    setShowAddForm(false);
  };

  const handleRemoveProduct = (id: string) => {
    onChange(products.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Section Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-primary">Step 4 of 4</span>
          <span className="text-[10px] font-extrabold bg-rose-100 dark:bg-rose-950/60 text-primary px-2.5 py-0.5 rounded-full">
            Optional
          </span>
        </div>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-dark-brown dark:text-rose-50 mt-1">
          Add Your First Products
        </h2>
        <p className="text-xs text-dark-brown/60 dark:text-rose-200/60 mt-1">
          Showcase a couple of signature cakes or treats to welcome your first visitors. You can always do this later in your dashboard.
        </p>
      </div>

      {/* Optional Notice Card */}
      <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <NotoIcon icon={shortcake} size={24} />
          <p className="text-xs text-dark-brown/70 dark:text-rose-200/70">
            {products.length === 0
              ? "You can skip this step and launch your store directly!"
              : `${products.length} signature bake${products.length > 1 ? "s" : ""} added to your storefront.`}
          </p>
        </div>
        {!showAddForm && (
          <button
            type="button"
            onClick={() => setShowAddForm(true)}
            className="px-3.5 py-1.5 rounded-xl bg-primary text-white text-xs font-bold shadow-xs hover:bg-primary-hover transition cursor-pointer flex-shrink-0"
          >
            + Add Item
          </button>
        )}
      </div>

      {/* List of Added Products */}
      {products.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-dark-brown/60 dark:text-rose-200/60">
            Your Initial Catalog
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {products.map((prod) => (
              <div
                key={prod.id}
                className="p-4 rounded-2xl bg-white dark:bg-[#33221e] border border-rose-100 dark:border-rose-950/60 flex justify-between items-start gap-3 shadow-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-dark-brown dark:text-rose-100">{prod.name}</span>
                    <span className="text-xs font-extrabold text-primary">₹{prod.price}</span>
                  </div>
                  <span className="inline-block text-[10px] text-dark-brown/50 dark:text-rose-200/50 bg-rose-50 dark:bg-rose-950/30 px-2 py-0.5 rounded-md font-medium">
                    {prod.category}
                  </span>
                  {prod.description && (
                    <p className="text-[11px] text-dark-brown/60 dark:text-rose-200/60 line-clamp-1">
                      {prod.description}
                    </p>
                  )}
                  <div className="flex gap-1.5 pt-1">
                    {prod.isEggless && (
                      <span className="text-[9px] font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded">
                        Eggless
                      </span>
                    )}
                    {prod.isVegan && (
                      <span className="text-[9px] font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 px-1.5 py-0.5 rounded">
                        Vegan
                      </span>
                    )}
                    {prod.isGlutenFree && (
                      <span className="text-[9px] font-bold bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 px-1.5 py-0.5 rounded">
                        Gluten-Free
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveProduct(prod.id)}
                  className="text-dark-brown/40 hover:text-red-500 transition text-sm cursor-pointer p-1"
                  aria-label="Remove item"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add New Product Form */}
      {showAddForm && (
        <div className="p-6 rounded-3xl bg-white dark:bg-[#33221e] border border-rose-100 dark:border-rose-950/60 space-y-4 shadow-sm">
          <div className="flex justify-between items-center pb-2 border-b border-rose-50 dark:border-rose-950/40">
            <span className="text-xs font-bold text-primary uppercase">New Item Details</span>
            {products.length > 0 && (
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="text-xs text-dark-brown/40 dark:text-rose-200/40 hover:text-dark-brown cursor-pointer"
              >
                Cancel
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-8 space-y-1.5">
              <label className="block text-xs font-bold text-dark-brown/80 dark:text-rose-100/80">
                Item Name
              </label>
              <input
                type="text"
                placeholder="e.g. Belgian Dark Chocolate Ganache Cake (1kg)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl border border-rose-100 dark:border-rose-950/60 text-xs font-semibold text-dark-brown dark:text-rose-100 outline-none focus:border-primary transition bg-rose-50/20 dark:bg-rose-950/10"
              />
            </div>

            <div className="sm:col-span-4 space-y-1.5">
              <label className="block text-xs font-bold text-dark-brown/80 dark:text-rose-100/80">
                Price (₹ INR)
              </label>
              <input
                type="number"
                placeholder="e.g. 1200"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl border border-rose-100 dark:border-rose-950/60 text-xs font-semibold text-dark-brown dark:text-rose-100 outline-none focus:border-primary transition bg-rose-50/20 dark:bg-rose-950/10"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-dark-brown/80 dark:text-rose-100/80">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl border border-rose-100 dark:border-rose-950/60 text-xs font-semibold text-dark-brown dark:text-rose-100 outline-none focus:border-primary transition bg-rose-50/20 dark:bg-rose-950/10 cursor-pointer"
              >
                {CATEGORY_PRESETS.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-dark-brown/80 dark:text-rose-100/80">
                Item Photo URL (Optional)
              </label>
              <input
                type="url"
                placeholder="https://..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl border border-rose-100 dark:border-rose-950/60 text-xs font-semibold text-dark-brown dark:text-rose-100 outline-none focus:border-primary transition bg-rose-50/20 dark:bg-rose-950/10"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-dark-brown/80 dark:text-rose-100/80">
              Short Description / Flavor Notes
            </label>
            <input
              type="text"
              placeholder="e.g. Layers of moist sponge soaked with espresso and layered with 55% dark chocolate cream."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl border border-rose-100 dark:border-rose-950/60 text-xs font-semibold text-dark-brown dark:text-rose-100 outline-none focus:border-primary transition bg-rose-50/20 dark:bg-rose-950/10"
            />
          </div>

          {/* Dietary Flags */}
          <div className="flex flex-wrap gap-4 pt-1">
            <label className="flex items-center gap-2 text-xs font-semibold text-dark-brown/80 dark:text-rose-100/80 cursor-pointer">
              <input
                type="checkbox"
                checked={isEggless}
                onChange={(e) => setIsEggless(e.target.checked)}
                className="rounded accent-primary"
              />
              <span>100% Eggless</span>
            </label>
            <label className="flex items-center gap-2 text-xs font-semibold text-dark-brown/80 dark:text-rose-100/80 cursor-pointer">
              <input
                type="checkbox"
                checked={isVegan}
                onChange={(e) => setIsVegan(e.target.checked)}
                className="rounded accent-primary"
              />
              <span>Vegan</span>
            </label>
            <label className="flex items-center gap-2 text-xs font-semibold text-dark-brown/80 dark:text-rose-100/80 cursor-pointer">
              <input
                type="checkbox"
                checked={isGlutenFree}
                onChange={(e) => setIsGlutenFree(e.target.checked)}
                className="rounded accent-primary"
              />
              <span>Gluten-Free</span>
            </label>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={handleAddProduct}
              disabled={!name.trim() || !price}
              className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow-xs hover:bg-primary-hover transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Item
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
