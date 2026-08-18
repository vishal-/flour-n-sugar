import sindresorhusSlugify from "@sindresorhus/slugify";

export const RESERVED_SLUGS = new Set([
  "home",
  "api",
  "u",
  "user",
  "users",
  "onboarding",
  "login",
  "signup",
  "signin",
  "signout",
  "dashboard",
  "admin",
  "bakers",
  "explore",
  "about",
  "terms",
  "privacy",
  "contact",
  "blog",
  "settings",
  "orders",
  "cart",
  "checkout",
]);

// Strictly lowercase alphanumeric characters with single hyphens between words
export const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Converts any string into a clean, SEO-friendly, strictly lowercase alphanumeric slug.
 * Example: "Café & Sugar 100%!" -> "cafe-and-sugar-100-percent"
 */
export function slugify(text: string): string {
  if (!text) return "";
  return sindresorhusSlugify(text, {
    lowercase: true,
    separator: "-",
  });
}

/**
 * Validates whether a slug adheres to strict URL rules:
 * - 3 to 50 characters
 * - Only lowercase letters (a-z), numbers (0-9), and hyphens (-)
 * - Cannot start or end with a hyphen
 * - No consecutive hyphens (--)
 * - Not a reserved system route
 */
export function isValidSlug(slug: string): { valid: boolean; error?: string } {
  if (!slug || slug.trim().length === 0) {
    return { valid: false, error: "Slug cannot be empty." };
  }

  const clean = slug.trim();

  if (clean.length < 3) {
    return { valid: false, error: "Slug must be at least 3 characters." };
  }

  if (clean.length > 50) {
    return { valid: false, error: "Slug cannot exceed 50 characters." };
  }

  if (RESERVED_SLUGS.has(clean)) {
    return { valid: false, error: `"${clean}" is a reserved system URL.` };
  }

  if (!SLUG_REGEX.test(clean)) {
    return {
      valid: false,
      error: "Only lowercase letters (a-z), numbers (0-9), and single hyphens (-) are allowed.",
    };
  }

  return { valid: true };
}
