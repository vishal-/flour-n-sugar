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

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}
