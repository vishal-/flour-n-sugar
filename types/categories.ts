import { ProductCategory } from "@prisma/client";

export { ProductCategory };
export const PRODUCT_CATEGORIES = Object.values(ProductCategory);

export interface CategoryInfo<TIcon = unknown> {
  value: ProductCategory;
  slug: string;
  aliases?: string[];
  label: string;
  shortLabel: string;
  icon: TIcon;
  description: string;
}

export type CategorySlug =
  | "cakes"
  | "cookies-and-biscuits"
  | "breads"
  | "pastries"
  | "pies-tarts-and-quiches"
  | "brownies-and-bars"
  | "donuts-and-fritters"
  | "desserts"
  | "savory-bakes"
  | "confectionery";
