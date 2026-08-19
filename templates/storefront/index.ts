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
export function getStorefrontTemplate(theme: StoreFrontTheme = StoreFrontTheme.WARM_CRUST) {
  switch (theme) {
    case StoreFrontTheme.SUGAR_DUST:
      return SugarDustTemplate;

    case StoreFrontTheme.HONEY_DRIP:
      return HoneyDripTemplate;

    case StoreFrontTheme.WARM_CRUST:
    default:
      return WarmCrustTemplate;
  }
}
