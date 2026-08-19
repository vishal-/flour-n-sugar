import { StoreFrontTheme } from "@prisma/client";

export { StoreFrontTheme };

export interface ThemeDefinition {
  value: StoreFrontTheme;
  name: string;
  tagline: string;
  primaryColor: string;
  accentColor: string;
  bgGradient: string;
  description: string;
}

/**
 * Active storefront themes that have dedicated template implementations.
 * (Unimplemented themes are commented out below for future rollouts)
 */
export const STOREFRONT_THEME_MAP: Partial<Record<StoreFrontTheme, ThemeDefinition>> = {
  [StoreFrontTheme.WARM_CRUST]: {
    value: StoreFrontTheme.WARM_CRUST,
    name: "Warm Crust",
    tagline: "Golden toasted sourdough & rustic wheat",
    primaryColor: "#C26D38",
    accentColor: "#FDF4EC",
    bgGradient: "from-amber-50/80 via-white to-background",
    description: "Rustic artisan feel inspired by fresh wood-fired sourdough crusts.",
  },
  [StoreFrontTheme.SUGAR_DUST]: {
    value: StoreFrontTheme.SUGAR_DUST,
    name: "Sugar Dust",
    tagline: "Powdered confectioner elegance & soft pastel pink",
    primaryColor: "#E05A7B",
    accentColor: "#FDF0F4",
    bgGradient: "from-pink-50/80 via-white to-background",
    description: "Soft sweet boutique pastry aesthetic with icing sugar charm.",
  },
  [StoreFrontTheme.HONEY_DRIP]: {
    value: StoreFrontTheme.HONEY_DRIP,
    name: "Honey Drip",
    tagline: "Sunlit wild blossom honey amber",
    primaryColor: "#E08A1E",
    accentColor: "#FFF8ED",
    bgGradient: "from-amber-50/90 via-white to-background",
    description: "Vibrant golden nectar tones for sweet bakeries, waffles, and honey cakes.",
  },

  /*
  [StoreFrontTheme.OVEN_GLOW]: {
    value: StoreFrontTheme.OVEN_GLOW,
    name: "Oven Glow",
    tagline: "Warm terracotta & ember warmth",
    primaryColor: "#E0533C",
    accentColor: "#FDE8E4",
    bgGradient: "from-rose-50/80 via-white to-background",
    description: "Classic warm bakery ambiance with glowing berry and terracotta accents.",
  },
  [StoreFrontTheme.RISING_DOUGH]: {
    value: StoreFrontTheme.RISING_DOUGH,
    name: "Rising Dough",
    tagline: "Natural yeast beige & raw flour tones",
    primaryColor: "#946B48",
    accentColor: "#F8F4EF",
    bgGradient: "from-stone-50/80 via-white to-background",
    description: "Minimalist, organic bakery vibe inspired by slow-fermented dough.",
  },
  [StoreFrontTheme.BUTTER_SOFT]: {
    value: StoreFrontTheme.BUTTER_SOFT,
    name: "Butter Soft",
    tagline: "Velvety French churned butter cream",
    primaryColor: "#D4973B",
    accentColor: "#FEF9EC",
    bgGradient: "from-yellow-50/80 via-white to-background",
    description: "Rich, cheerful golden tones evoking warm brioche and flaky croissants.",
  },
  [StoreFrontTheme.GOLDEN_BAKE]: {
    value: StoreFrontTheme.GOLDEN_BAKE,
    name: "Golden Bake",
    tagline: "Shimmering caramelized golden pastry",
    primaryColor: "#B87333",
    accentColor: "#FBF3EB",
    bgGradient: "from-orange-50/80 via-white to-background",
    description: "Deep caramel and honeyed bake hues for artisanal patisseries.",
  },
  [StoreFrontTheme.FLOUR_CLOUD]: {
    value: StoreFrontTheme.FLOUR_CLOUD,
    name: "Flour Cloud",
    tagline: "Clean powdery whites & slate stone countertop",
    primaryColor: "#4A5568",
    accentColor: "#F7FAFC",
    bgGradient: "from-slate-50/80 via-white to-background",
    description: "Clean modern Scandinavian bakery aesthetic with crisp slate contrasts.",
  },
  [StoreFrontTheme.PROOFING]: {
    value: StoreFrontTheme.PROOFING,
    name: "Proofing",
    tagline: "Earthy linen proofing basket & sage botanical",
    primaryColor: "#5C7A58",
    accentColor: "#F2F7F1",
    bgGradient: "from-emerald-50/80 via-white to-background",
    description: "Fresh botanical and linen tones reflecting natural sourdough proofing.",
  },
  [StoreFrontTheme.KNEADED]: {
    value: StoreFrontTheme.KNEADED,
    name: "Kneaded",
    tagline: "Deep mahogany kitchen wood & cast iron",
    primaryColor: "#442D26",
    accentColor: "#F5EFEB",
    bgGradient: "from-stone-100/80 via-white to-background",
    description: "Heritage craftsman bakery vibe with rich mahogany and dark cocoa tones.",
  },
  [StoreFrontTheme.CRUMB_TRAIL]: {
    value: StoreFrontTheme.CRUMB_TRAIL,
    name: "Crumb Trail",
    tagline: "Toasted hazelnut & biscuit graham",
    primaryColor: "#A66A44",
    accentColor: "#FAF2EC",
    bgGradient: "from-amber-50/60 via-white to-background",
    description: "Cozy cookie and tea-biscuit palette with nutty biscuit warmth.",
  },
  [StoreFrontTheme.CINNAMON_HAZE]: {
    value: StoreFrontTheme.CINNAMON_HAZE,
    name: "Cinnamon Haze",
    tagline: "Spiced Ceylon cinnamon & autumn apple roll",
    primaryColor: "#9C412B",
    accentColor: "#FCEEEA",
    bgGradient: "from-rose-50/90 via-white to-background",
    description: "Warm festive spice aroma aesthetic featuring rich cinnamon and nutmeg red-browns.",
  },
  */
};

export const STOREFRONT_THEME_LIST: ThemeDefinition[] = Object.values(STOREFRONT_THEME_MAP).filter(
  (t): t is ThemeDefinition => Boolean(t)
);

export const STOREFRONT_THEMES: StoreFrontTheme[] = STOREFRONT_THEME_LIST.map((t) => t.value);
