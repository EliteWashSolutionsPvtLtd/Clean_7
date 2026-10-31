// import type { PricingItem } from "@/redux/api/catalogApi";

// /* ---------- rules ---------- */

// export const GST_PERCENT = 18;
// /** Cart total (GST included) must reach this before "Continue to booking" works. */
// export const MIN_ORDER_TOTAL = 300;

// /**
//  * Categories that use the "item list + add button" layout (laundry / dry clean).
//  * Every other category (house help, door-to-door car wash, solar panel
//  * cleaning, …) uses the "pick a service → pick an option" layout.
//  */
// export const LIST_BOOKING_CATEGORIES: string[] = ["laundry"];
// export const isListBooking = (categorySlug: string) =>
//   LIST_BOOKING_CATEGORIES.includes(categorySlug);

// /* ---------- paths ---------- */

// export const bookingPath = (categorySlug: string, serviceSlug?: string) =>
//   serviceSlug
//     ? `/services/book/${encodeURIComponent(categorySlug)}/${encodeURIComponent(serviceSlug)}`
//     : `/services/book/${encodeURIComponent(categorySlug)}`;

// /* ---------- formatting ---------- */

// export const rupee = (n: number) =>
//   `₹${n.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;

// /** Prices from the API are GST-inclusive; split a total into base + GST. */
// export function gstBreakup(total: number) {
//   const base = total / (1 + GST_PERCENT / 100);
//   return { base, gst: total - base, total };
// }

// export function itemSubtitle(it: PricingItem): string {
//   if (it.description && it.description.trim()) return it.description.trim();
//   if (it.unitLabel) return `Per ${it.unitLabel}`;
//   return "";
// }

// /* ---------- images ---------- */

// const categoryImageMap: Record<string, string> = {
//   laundry: "/images/services/laundry.png",
//   "home-cleaning": "/images/services/house-help.png",
//   "doorstep-car-wash": "/images/services/car-wash.png",
//   "door-to-door-car-wash": "/images/services/car-wash.png",
//   "pest-control": "/images/services/car-wash.png",
//   "beauty-and-wellness": "/images/services/laundry.png",
// };

// export const imageFor = (categorySlug: string, remoteUrl?: string | null) =>
//   remoteUrl || categoryImageMap[categorySlug] || "/images/services/laundry.png";

// /* ---------- draft (handed to the next booking step) ---------- */

// export type BookingLine = {
//   /** itemId (kind "item") or addOnId (kind "addOn") */
//   id: string;
//   name: string;
//   serviceName?: string;
//   price: number;
//   qty: number;
//   /** defaults to "item" for drafts saved before add-ons were tracked */
//   kind?: "item" | "addOn";
// };

// export type BookingDraft = {
//   category: string;
//   service?: string;
//   /** Real service id. null/undefined = mixed cart (laundry) */
//   serviceId?: string | null;
//   /** PICKUP_DELIVERY (laundry) or AT_HOME */
//   serviceMode?: string | null;
//   lines: BookingLine[];
//   total: number; // GST included
//   savedAt: number;
// };

// const DRAFT_KEY = "clean7_booking_draft";

// export function saveBookingDraft(draft: Omit<BookingDraft, "savedAt">) {
//   try {
//     sessionStorage.setItem(
//       DRAFT_KEY,
//       JSON.stringify({ ...draft, savedAt: Date.now() }),
//     );
//   } catch {}
// }

// export function loadBookingDraft(): BookingDraft | null {
//   try {
//     const raw = sessionStorage.getItem(DRAFT_KEY);
//     return raw ? (JSON.parse(raw) as BookingDraft) : null;
//   } catch {
//     return null;
//   }
// }

// export const clearBookingDraft = () => {
//   try {
//     sessionStorage.removeItem(DRAFT_KEY);
//   } catch {}
// };

// /* ---------- checkout helpers ---------- */

// export const CHECKOUT_PATH = "/services/book/checkout";

// export type SlotCode = "MORNING" | "AFTERNOON" | "EVENING";
// export const SLOTS: { code: SlotCode; label: string; range: string }[] = [
//   { code: "MORNING", label: "Morning", range: "8 AM - 12 PM" },
//   { code: "AFTERNOON", label: "Afternoon", range: "12 PM - 4 PM" },
//   { code: "EVENING", label: "Evening", range: "4 PM - 8 PM" },
// ];
// /** Hour at which each slot ends (local time) – used to hide slots already over today. */
// export const SLOT_END_HOUR: Record<SlotCode, number> = {
//   MORNING: 12,
//   AFTERNOON: 16,
//   EVENING: 20,
// };

// export const toYMD = (d: Date) =>
//   `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

// /** Next 7 days, starting today. */
// export const nextBookingDays = (from = new Date()) =>
//   Array.from({ length: 7 }, (_, i) => {
//     const d = new Date(from);
//     d.setDate(from.getDate() + i);
//     return d;
//   });

// export const isSlotAvailable = (day: Date, slot: SlotCode, now = new Date()) =>
//   toYMD(day) !== toYMD(now) || now.getHours() < SLOT_END_HOUR[slot];

// /** One idempotency key per user attempt (same helper the mobile app uses). */
// export const newIdempotencyKey = () =>
//   typeof crypto !== "undefined" && "randomUUID" in crypto
//     ? crypto.randomUUID()
//     : `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;



import type { PricingItem } from "@/redux/api/catalogApi";

/* ---------- rules ---------- */

export const GST_PERCENT = 18;
/** Cart total (GST included) must reach this before "Continue to booking" works. */
export const MIN_ORDER_TOTAL = 300;

/**
 * Categories that use the "item list + add button" layout (laundry / dry clean).
 * Every other category (house help, door-to-door car wash, solar panel
 * cleaning, …) uses the "pick a service → pick an option" layout.
 */
export const LIST_BOOKING_CATEGORIES: string[] = ["laundry"];
export const isListBooking = (categorySlug: string) =>
  LIST_BOOKING_CATEGORIES.includes(categorySlug);

/* ---------- paths ---------- */

export const bookingPath = (categorySlug: string, serviceSlug?: string) =>
  serviceSlug
    ? `/services/book/${encodeURIComponent(categorySlug)}/${encodeURIComponent(serviceSlug)}`
    : `/services/book/${encodeURIComponent(categorySlug)}`;

/* ---------- formatting ---------- */

export const rupee = (n: number) =>
  `₹${n.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;

/**
 * GST is charged ON TOP of the price (after the coupon discount), exactly like
 * the mobile app: gst = round(taxable * rate / 100). `rate` comes from
 * GET /orders/tax-settings (useTaxRate); GST_PERCENT is only the fallback.
 */
export function gstOn(taxable: number, rate: number = GST_PERCENT) {
  return Math.round(Math.max(0, taxable) * (rate / 100));
}

/** Reads a GST rate (0-100) from an API value; null when invalid. */
export function parseRate(v: unknown): number | null {
  const n = typeof v === "string" && v.trim() ? Number(v) : v;
  return typeof n === "number" && Number.isFinite(n) && n >= 0 && n <= 100 ? n : null;
}

/** Wallet balance out of the (loosely shaped) GET /orders/wallet payload. */
export function walletBalanceOf(w: unknown): number | null {
  const r = (w && typeof w === "object" ? w : {}) as Record<string, unknown>;
  const inner = (r.wallet && typeof r.wallet === "object" ? r.wallet : r) as Record<string, unknown>;
  for (const v of [inner.availableBalance, inner.balance, inner.balanceAmount]) {
    const n = Number(v);
    if (v !== undefined && v !== null && v !== "" && Number.isFinite(n)) return n;
  }
  return null;
}

export function itemSubtitle(it: PricingItem): string {
  if (it.description && it.description.trim()) return it.description.trim();
  if (it.unitLabel) return `Per ${it.unitLabel}`;
  return "";
}

/* ---------- images ---------- */

const categoryImageMap: Record<string, string> = {
  laundry: "/images/services/laundry.png",
  "home-cleaning": "/images/services/house-help.png",
  "doorstep-car-wash": "/images/services/car-wash.png",
  "door-to-door-car-wash": "/images/services/car-wash.png",
  "pest-control": "/images/services/car-wash.png",
  "beauty-and-wellness": "/images/services/laundry.png",
};

export const imageFor = (categorySlug: string, remoteUrl?: string | null) =>
  remoteUrl || categoryImageMap[categorySlug] || "/images/services/laundry.png";

/* ---------- draft (handed to the next booking step) ---------- */

export type BookingLine = {
  /** itemId (kind "item") or addOnId (kind "addOn") */
  id: string;
  name: string;
  serviceName?: string;
  price: number;
  qty: number;
  /** defaults to "item" for drafts saved before add-ons were tracked */
  kind?: "item" | "addOn";
  /** max quantity allowed for this line (from the catalog), if any */
  maxQty?: number | null;
  /** real service id this line belongs to (mixed laundry carts span several) */
  serviceId?: string;
};

export type BookingDraft = {
  category: string;
  service?: string;
  /** Real service id. null/undefined = mixed cart (laundry) */
  serviceId?: string | null;
  /** PICKUP_DELIVERY (laundry) or AT_HOME */
  serviceMode?: string | null;
  lines: BookingLine[];
  total: number; // GST included
  savedAt: number;
};

const DRAFT_KEY = "clean7_booking_draft";

export function saveBookingDraft(draft: Omit<BookingDraft, "savedAt">) {
  try {
    sessionStorage.setItem(
      DRAFT_KEY,
      JSON.stringify({ ...draft, savedAt: Date.now() }),
    );
  } catch {}
}

export function loadBookingDraft(): BookingDraft | null {
  try {
    const raw = sessionStorage.getItem(DRAFT_KEY);
    return raw ? (JSON.parse(raw) as BookingDraft) : null;
  } catch {
    return null;
  }
}

export const clearBookingDraft = () => {
  try {
    sessionStorage.removeItem(DRAFT_KEY);
  } catch {}
};

/* ---------- checkout helpers ---------- */

export const CHECKOUT_PATH = "/services/book/checkout";

export type SlotCode = "MORNING" | "AFTERNOON" | "EVENING";
export const SLOTS: { code: SlotCode; label: string; range: string }[] = [
  { code: "MORNING", label: "Morning", range: "8 AM - 12 PM" },
  { code: "AFTERNOON", label: "Afternoon", range: "12 PM - 4 PM" },
  { code: "EVENING", label: "Evening", range: "4 PM - 8 PM" },
];
/** Hour at which each slot ends (local time) – used to hide slots already over today. */
export const SLOT_END_HOUR: Record<SlotCode, number> = {
  MORNING: 12,
  AFTERNOON: 16,
  EVENING: 20,
};

export const toYMD = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/** Next 7 days, starting today. */
export const nextBookingDays = (from = new Date()) =>
  Array.from({ length: 7 }, (_, i) => {
    const d = new Date(from);
    d.setDate(from.getDate() + i);
    return d;
  });

export const isSlotAvailable = (day: Date, slot: SlotCode, now = new Date()) =>
  toYMD(day) !== toYMD(now) || now.getHours() < SLOT_END_HOUR[slot];

/** One idempotency key per user attempt (same helper the mobile app uses). */
export const newIdempotencyKey = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
