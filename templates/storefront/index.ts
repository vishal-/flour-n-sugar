import { StoreFrontTheme } from "@prisma/client";
import { SugarDustTemplate } from "./SugarDustTemplate";
import { WarmCrustTemplate } from "./WarmCrustTemplate";
import { HoneyDripTemplate } from "./HoneyDripTemplate";

export { SugarDustTemplate, WarmCrustTemplate, HoneyDripTemplate };

export interface StorefrontTemplateProps {
  store: Parameters<typeof SugarDustTemplate>[0]["store"];
}

/**
 * Returns the matching template component for a given store theme.
 * Defaults to WarmCrustTemplate for artisan default.
 */
export function getStorefrontTemplate(theme: StoreFrontTheme = StoreFrontTheme.OVEN_GLOW) {
  switch (theme) {
    case StoreFrontTheme.SUGAR_DUST:
      return SugarDustTemplate;

    case StoreFrontTheme.WARM_CRUST:
    case StoreFrontTheme.OVEN_GLOW:
    case StoreFrontTheme.RISING_DOUGH:
    case StoreFrontTheme.KNEADED:
    case StoreFrontTheme.CRUMB_TRAIL:
    case StoreFrontTheme.CINNAMON_HAZE:
      return WarmCrustTemplate;

    case StoreFrontTheme.HONEY_DRIP:
    case StoreFrontTheme.BUTTER_SOFT:
    case StoreFrontTheme.GOLDEN_BAKE:
    case StoreFrontTheme.FLOUR_CLOUD:
    case StoreFrontTheme.PROOFING:
      return HoneyDripTemplate;

    default:
      return WarmCrustTemplate;
  }
}
