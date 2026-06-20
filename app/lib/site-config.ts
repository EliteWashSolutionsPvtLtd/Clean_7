/**
 * Set NEXT_PUBLIC_SITE_URL in production (e.g. https://washandwow.in).
 * Defaults to the domain used by your public contact email.
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? "https://washandwow.in";
  return raw.replace(/\/$/, "");
}

export const SITE_NAME = "Wash and Wow";
/** Common spelling used in UI copy */
export const SITE_NAME_AMPERSAND = "Wash & Wow";

export const SITE_DESCRIPTION =
  "Wash and Wow (washandwow) — laundry, home cleaning, doorstep car wash, and pest control in India. Pickup, professional care, and delivery. Book on the app.";

/** Brand and discovery phrases for meta keywords (supplement to visible copy). */
export const SITE_KEYWORDS: string[] = [
  "laundry",
  "laundry service",
  "laundry services",
  "laundry services near me",
  "laundry service near me",
  "Wash and Wow",
  "Wash and wow",
  "washandwow",
  "wash and wow",
  "Wash & Wow",
  "wash and wow laundry",
  "washandwow laundry",
  "laundry service India",
  "dry cleaning pickup delivery",
  "wash and fold",
  "laundry app India",
  "home cleaning India",
  "doorstep car wash",
  "pest control service",
];

export const SITE_EMAIL = "support@washandwow.in";
export const SITE_PHONE_E164 = "+919318387705";
export const SITE_PHONE_DISPLAY = "9318387705";
export const SITE_ADDRESS = "123, Mullapur Road, Thana Bhawan, Shamli, Uttar Pradesh, 247777";

export function canonicalPath(path: string): string {
  const base = getSiteUrl();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return `${base}/`;
  return `${base}${normalized}`;
}
