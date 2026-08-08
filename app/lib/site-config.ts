/**
 * Set NEXT_PUBLIC_SITE_URL in production (e.g. https://www.clean7.in).
 * Defaults to the domain used by your public contact email.
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.clean7.in";
  return raw.replace(/\/$/, "");
}

export const SITE_NAME = "Clean7";
/** Common spelling used in UI copy */
export const SITE_NAME_AMPERSAND = "Clean7";

export const SITE_DESCRIPTION =
  "Clean7 (clean7) — laundry, home cleaning, doorstep car wash, and pest control in India. Pickup, professional care, and delivery. Book on the app.";

/** Brand and discovery phrases for meta keywords (supplement to visible copy). */
export const SITE_KEYWORDS: string[] = [
  "laundry",
  "laundry service",
  "laundry services",
  "laundry services near me",
  "laundry service near me",
  "Clean7",
  "Clean7",
  "clean7",
  "wash and wow",
  "Clean7",
  "wash and wow laundry",
  "clean7 laundry",
  "laundry service India",
  "dry cleaning pickup delivery",
  "wash and fold",
  "laundry app India",
  "home cleaning India",
  "doorstep car wash",
  "pest control service",
];

export const SITE_EMAIL = "support@clean7.in";
export const SITE_PHONE_E164 = "+919318387705";
export const SITE_PHONE_DISPLAY = "9318387705";
export const SITE_ADDRESS = "123, Mullapur Road, Thana Bhawan, Shamli, Uttar Pradesh, 247777";

export function canonicalPath(path: string): string {
  const base = getSiteUrl();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return `${base}/`;
  return `${base}${normalized}`;
}
