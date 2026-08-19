import { ProductCategory, CategoryInfo, CategorySlug, PRODUCT_CATEGORIES } from "@/types";
import {
  PRODUCT_CATEGORY_MAP,
  PRODUCT_CATEGORY_LIST,
  DEFAULT_CATEGORY_ICON,
} from "@/config/categories";

export {
  ProductCategory,
  PRODUCT_CATEGORIES,
  PRODUCT_CATEGORY_MAP,
  PRODUCT_CATEGORY_LIST,
  DEFAULT_CATEGORY_ICON,
};

export type { CategoryInfo, CategorySlug };

export function getCategoryLabel(category?: string | null): string {
  if (!category) return "Bakery Treat";
  const cat = PRODUCT_CATEGORY_MAP[category as ProductCategory];
  return cat ? cat.label : category;
}

export function getCategoryShortLabel(category?: string | null): string {
  if (!category) return "Bakes";
  const cat = PRODUCT_CATEGORY_MAP[category as ProductCategory];
  return cat ? cat.shortLabel : category;
}

export function getCategoryIcon(category?: string | null) {
  if (!category) return DEFAULT_CATEGORY_ICON;
  const cat = PRODUCT_CATEGORY_MAP[category as ProductCategory];
  return cat ? cat.icon : DEFAULT_CATEGORY_ICON;
}

export function categoryToSlug(category: ProductCategory): string {
  return PRODUCT_CATEGORY_MAP[category]?.slug || category.toLowerCase().replace(/_/g, "-");
}

export function slugToCategory(slug?: string | null): ProductCategory | null {
  if (!slug) return null;
  const normalized = slug.trim().toLowerCase();

  // Direct enum key match
  const enumKey = normalized.toUpperCase().replace(/-/g, "_") as ProductCategory;
  if (PRODUCT_CATEGORY_MAP[enumKey]) return enumKey;

  // Search by slug or aliases
  for (const item of PRODUCT_CATEGORY_LIST) {
    if (item.slug === normalized) return item.value;
    if (item.aliases?.includes(normalized)) return item.value;
  }
  return null;
}

export function getCategoryInfoBySlug(slug?: string | null): CategoryInfo<unknown> | null {
  const category = slugToCategory(slug);
  return category ? PRODUCT_CATEGORY_MAP[category] : null;
}
