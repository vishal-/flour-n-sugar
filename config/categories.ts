import { ProductCategory, CategoryInfo } from "@/types";
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

export const DEFAULT_CATEGORY_ICON = shortcake;

export const PRODUCT_CATEGORY_MAP: Record<ProductCategory, CategoryInfo<typeof birthdayCake>> = {
  [ProductCategory.CAKES]: {
    value: ProductCategory.CAKES,
    slug: "cakes",
    aliases: ["cake"],
    label: "Cakes & Celebration Cakes",
    shortLabel: "Cakes",
    icon: birthdayCake,
    description: "Layer cakes, tiered cakes, custom celebration bakes & tea cakes",
  },
  [ProductCategory.COOKIES_AND_BISCUITS]: {
    value: ProductCategory.COOKIES_AND_BISCUITS,
    slug: "cookies-and-biscuits",
    aliases: ["cookies", "biscuits"],
    label: "Cookies & Biscuits",
    shortLabel: "Cookies",
    icon: cookie,
    description: "Chewy cookies, butter biscuits, shortbreads & macarons",
  },
  [ProductCategory.BREADS]: {
    value: ProductCategory.BREADS,
    slug: "breads",
    aliases: ["bread"],
    label: "Artisanal Breads",
    shortLabel: "Breads",
    icon: bread,
    description: "Sourdough loaves, brioche, bagels, babka & focaccia",
  },
  [ProductCategory.PASTRIES]: {
    value: ProductCategory.PASTRIES,
    slug: "pastries",
    aliases: ["pastry"],
    label: "Pastries & Viennoiserie",
    shortLabel: "Pastries",
    icon: croissant,
    description: "Butter croissants, Danish pastries, éclairs & choux buns",
  },
  [ProductCategory.PIES_TARTS_AND_QUICHES]: {
    value: ProductCategory.PIES_TARTS_AND_QUICHES,
    slug: "pies-tarts-and-quiches",
    aliases: ["pies-and-tarts", "pies", "tarts"],
    label: "Pies, Tarts & Quiches",
    shortLabel: "Pies & Tarts",
    icon: pie,
    description: "Fruit tarts, savory quiches, chocolate ganache pies & hand pies",
  },
  [ProductCategory.BROWNIES_AND_BARS]: {
    value: ProductCategory.BROWNIES_AND_BARS,
    slug: "brownies-and-bars",
    aliases: ["brownies", "bars"],
    label: "Brownies & Bars",
    shortLabel: "Brownies",
    icon: chocolateBar,
    description: "Fudgy brownies, blondies, lemon bars & crumb squares",
  },
  [ProductCategory.DONUTS_AND_FRITTERS]: {
    value: ProductCategory.DONUTS_AND_FRITTERS,
    slug: "donuts-and-fritters",
    aliases: ["donuts", "fritters", "doughnuts"],
    label: "Donuts & Fritters",
    shortLabel: "Donuts & Fritters",
    icon: doughnut,
    description: "Glazed ring donuts, bomboloni, stuffed donuts & beignets",
  },
  [ProductCategory.DESSERTS]: {
    value: ProductCategory.DESSERTS,
    slug: "desserts",
    aliases: ["dessert", "puddings"],
    label: "Desserts & Puddings",
    shortLabel: "Desserts",
    icon: custard,
    description: "Mousses, tiramisu jars, cheesecakes, panna cotta & trifles",
  },
  [ProductCategory.SAVORY_BAKES]: {
    value: ProductCategory.SAVORY_BAKES,
    slug: "savory-bakes",
    aliases: ["savory", "puffs"],
    label: "Savory Bakes & Puffs",
    shortLabel: "Savory Bakes",
    icon: pretzel,
    description: "Puff pastries, sausage rolls, stuffed buns & savory galettes",
  },
  [ProductCategory.CONFECTIONERY]: {
    value: ProductCategory.CONFECTIONERY,
    slug: "confectionery",
    aliases: ["sweets", "chocolates"],
    label: "Confectionery & Sweets",
    shortLabel: "Confectionery",
    icon: candy,
    description: "Handcrafted truffles, fudge, marshmallows & bonbons",
  },
};

export const PRODUCT_CATEGORY_LIST = Object.values(PRODUCT_CATEGORY_MAP);
