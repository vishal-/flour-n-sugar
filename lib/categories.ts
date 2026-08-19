import { ProductCategory, PRODUCT_CATEGORIES } from "@/types";
import birthdayCake from "@iconify-icons/noto/birthday-cake";
import cookie from "@iconify-icons/noto/cookie";
import bread from "@iconify-icons/noto/bread";
import croissant from "@iconify-icons/noto/croissant";
import pie from "@iconify-icons/noto/pie";
import chocolateBar from "@iconify-icons/noto/chocolate-bar";
import doughnut from "@iconify-icons/noto/doughnut";
import custard from "@iconify-icons/noto/custard";
import pretzel from "@iconify-icons/noto/pretzel";
import candy from "@iconify-icons/noto/candy";
import shortcake from "@iconify-icons/noto/shortcake";

export { ProductCategory, PRODUCT_CATEGORIES };

export interface CategoryInfo {
  value: ProductCategory;
  label: string;
  shortLabel: string;
  icon: typeof birthdayCake;
  description: string;
}

export const PRODUCT_CATEGORY_MAP: Record<ProductCategory, CategoryInfo> = {
  [ProductCategory.CAKES]: {
    value: ProductCategory.CAKES,
    label: "Cakes & Celebration Cakes",
    shortLabel: "Cakes",
    icon: birthdayCake,
    description: "Layer cakes, tiered cakes, custom celebration bakes & tea cakes",
  },
  [ProductCategory.COOKIES_AND_BISCUITS]: {
    value: ProductCategory.COOKIES_AND_BISCUITS,
    label: "Cookies & Biscuits",
    shortLabel: "Cookies",
    icon: cookie,
    description: "Chewy cookies, butter biscuits, shortbreads & macarons",
  },
  [ProductCategory.BREADS]: {
    value: ProductCategory.BREADS,
    label: "Artisanal Breads",
    shortLabel: "Breads",
    icon: bread,
    description: "Sourdough loaves, brioche, bagels, babka & focaccia",
  },
  [ProductCategory.PASTRIES]: {
    value: ProductCategory.PASTRIES,
    label: "Pastries & Viennoiserie",
    shortLabel: "Pastries",
    icon: croissant,
    description: "Butter croissants, Danish pastries, éclairs & choux buns",
  },
  [ProductCategory.PIES_TARTS_AND_QUICHES]: {
    value: ProductCategory.PIES_TARTS_AND_QUICHES,
    label: "Pies, Tarts & Quiches",
    shortLabel: "Pies & Tarts",
    icon: pie,
    description: "Fruit tarts, savory quiches, chocolate ganache pies & hand pies",
  },
  [ProductCategory.BROWNIES_AND_BARS]: {
    value: ProductCategory.BROWNIES_AND_BARS,
    label: "Brownies & Bars",
    shortLabel: "Brownies",
    icon: chocolateBar,
    description: "Fudgy brownies, blondies, lemon bars & crumb squares",
  },
  [ProductCategory.DONUTS_AND_FRITTERS]: {
    value: ProductCategory.DONUTS_AND_FRITTERS,
    label: "Donuts & Fritters",
    shortLabel: "Donuts",
    icon: doughnut,
    description: "Glazed ring donuts, bomboloni, stuffed donuts & beignets",
  },
  [ProductCategory.DESSERTS]: {
    value: ProductCategory.DESSERTS,
    label: "Desserts & Puddings",
    shortLabel: "Desserts",
    icon: custard,
    description: "Mousses, tiramisu jars, cheesecakes, panna cotta & trifles",
  },
  [ProductCategory.SAVORY_BAKES]: {
    value: ProductCategory.SAVORY_BAKES,
    label: "Savory Bakes & Puffs",
    shortLabel: "Savory Bakes",
    icon: pretzel,
    description: "Puff pastries, sausage rolls, stuffed buns & savory galettes",
  },
  [ProductCategory.CONFECTIONERY]: {
    value: ProductCategory.CONFECTIONERY,
    label: "Confectionery & Sweets",
    shortLabel: "Confectionery",
    icon: candy,
    description: "Handcrafted truffles, fudge, marshmallows & bonbons",
  },
};

export const PRODUCT_CATEGORY_LIST = Object.values(PRODUCT_CATEGORY_MAP);

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
  if (!category) return shortcake;
  const cat = PRODUCT_CATEGORY_MAP[category as ProductCategory];
  return cat ? cat.icon : shortcake;
}
