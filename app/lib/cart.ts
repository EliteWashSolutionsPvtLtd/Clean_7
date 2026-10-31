// "use client";

// import { useSyncExternalStore } from "react";
// import type { BookingLine } from "@/app/lib/booking";

// /**
//  * Multi-service cart, saved in localStorage so it survives closing the tab /
//  * redirects / next visit. One CartGroup = one booking (one service), so a cart
//  * can hold Dry Cleaning + House Help + Car Wash … together.
//  *
//  *   laundry / dry-clean  → one group per category, serviceId = null (mixed items)
//  *   house help / car wash / solar → one group per service (serviceId set)
//  */
// export type CartGroup = {
//   /** `serviceId` or `mixed:<category>` */
//   key: string;
//   category: string;
//   categoryName?: string;
//   service?: string;
//   serviceId: string | null;
//   serviceName: string;
//   serviceMode?: string | null;
//   /** Branch that serves the customer (same as the app's cart item branchId) */
//   branchId?: string | null;
//   lines: BookingLine[];
// };

// export type AddToCartInput = Omit<CartGroup, "key"> & {
//   /**
//    * "merge"   (default) add quantities to what is already in the cart
//    * "replace" the service holds ONE option → replace this group's lines
//    */
//   mode?: "merge" | "replace";
// };

// type CartState = { groups: CartGroup[] };

// const KEY = "clean7_cart_v1";
// const EMPTY: CartState = { groups: [] };

// /* ---------- store ---------- */

// let state: CartState = EMPTY;
// let loaded = false;
// const listeners = new Set<() => void>();

// function load() {
//   if (loaded || typeof window === "undefined") return;
//   loaded = true;
//   try {
//     const raw = localStorage.getItem(KEY);
//     const parsed = raw ? (JSON.parse(raw) as CartState) : null;
//     if (parsed && Array.isArray(parsed.groups)) state = parsed;
//   } catch {
//     /* ignore corrupt data */
//   }
// }

// function commit(next: CartState) {
//   state = next.groups.length ? next : EMPTY;
//   try {
//     if (state.groups.length) localStorage.setItem(KEY, JSON.stringify(state));
//     else localStorage.removeItem(KEY);
//   } catch {
//     /* storage full / blocked: the cart still works for this tab */
//   }
//   listeners.forEach((l) => l());
// }

// function subscribe(cb: () => void) {
//   load();
//   listeners.add(cb);
//   // another tab changed the cart
//   const onStorage = (e: StorageEvent) => {
//     if (e.key !== KEY) return;
//     try {
//       const parsed = e.newValue ? (JSON.parse(e.newValue) as CartState) : EMPTY;
//       state = parsed && Array.isArray(parsed.groups) ? parsed : EMPTY;
//     } catch {
//       state = EMPTY;
//     }
//     cb();
//   };
//   window.addEventListener("storage", onStorage);
//   return () => {
//     listeners.delete(cb);
//     window.removeEventListener("storage", onStorage);
//   };
// }

// const getSnapshot = () => {
//   load();
//   return state;
// };
// const getServerSnapshot = () => EMPTY;

// /* ---------- helpers ---------- */

// export const groupKeyOf = (g: {
//   serviceId: string | null;
//   category: string;
// }) => g.serviceId ?? `mixed:${g.category}`;

// const lineKey = (l: BookingLine) => `${l.kind ?? "item"}:${l.id}`;
// const clampQty = (l: BookingLine, q: number) =>
//   Math.max(0, Math.min(q, l.maxQty ?? 99));

// export const groupTotal = (g: CartGroup) =>
//   g.lines.reduce((s, l) => s + l.price * l.qty, 0);
// export const cartTotal = (s: CartState) =>
//   s.groups.reduce((sum, g) => sum + groupTotal(g), 0);
// /** Number of items (add-ons are not counted) – used for the cart badge. */
// export const cartCount = (s: CartState) =>
//   s.groups.reduce(
//     (n, g) =>
//       n + g.lines.filter((l) => l.kind !== "addOn").reduce((a, l) => a + l.qty, 0),
//     0,
//   );

// /* ---------- branch (same idea as the app's cart item branchId) ---------- */

// const BRANCH_KEY = "clean7_cart_branch_v1";

// /** Branch found by the last serviceability check (null if none yet). */
// export function getCartBranch(): string | undefined {
//   try {
//     return (typeof window !== "undefined" && localStorage.getItem(BRANCH_KEY)) || undefined;
//   } catch {
//     return undefined;
//   }
// }

// /** Remembers the serving branch and stamps it on the cart's bookings. */
// export function setCartBranch(branchId?: string | null) {
//   if (!branchId) return;
//   try {
//     localStorage.setItem(BRANCH_KEY, branchId);
//   } catch {
//     /* ignore */
//   }
//   load();
//   if (state.groups.some((g) => g.branchId !== branchId)) {
//     commit({ groups: state.groups.map((g) => ({ ...g, branchId })) });
//   }
// }

// /* ---------- actions ---------- */

// export function addToCart(input: AddToCartInput) {
//   load();
//   const { mode = "merge", ...rest } = input;
//   const key = groupKeyOf(rest);
//   const incoming = rest.lines.filter((l) => l.qty > 0);
//   if (incoming.length === 0) return;

//   const groups = state.groups.map((g) => ({ ...g, lines: [...g.lines] }));
//   const existing = groups.find((g) => g.key === key);

//   if (!existing) {
//     groups.push({
//       ...rest,
//       branchId: rest.branchId ?? getCartBranch() ?? null,
//       key,
//       lines: incoming.map((l) => ({ ...l })),
//     });
//   } else if (mode === "replace") {
//     existing.lines = incoming.map((l) => ({ ...l }));
//     existing.serviceName = rest.serviceName;
//   } else {
//     for (const l of incoming) {
//       const hit = existing.lines.find((x) => lineKey(x) === lineKey(l));
//       if (hit) hit.qty = clampQty(hit, hit.qty + l.qty);
//       else existing.lines.push({ ...l });
//     }
//   }
//   commit({ groups });
// }

// export function setLineQty(
//   groupKey: string,
//   line: Pick<BookingLine, "id" | "kind">,
//   qty: number,
// ) {
//   load();
//   const k = `${line.kind ?? "item"}:${line.id}`;
//   const groups = state.groups
//     .map((g) =>
//       g.key !== groupKey
//         ? g
//         : {
//             ...g,
//             lines: g.lines
//               .map((l) => (lineKey(l) === k ? { ...l, qty: clampQty(l, qty) } : l))
//               .filter((l) => l.qty > 0),
//           },
//     )
//     // a group without any real item is dropped (add-ons alone can't be booked)
//     .filter((g) => g.lines.some((l) => l.kind !== "addOn"));
//   commit({ groups });
// }

// export function removeGroup(groupKey: string) {
//   load();
//   commit({ groups: state.groups.filter((g) => g.key !== groupKey) });
// }

// export function clearCart() {
//   load();
//   commit(EMPTY);
// }

// /* ---------- hook ---------- */

// export function useCart() {
//   const s = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
//   return {
//     groups: s.groups,
//     count: cartCount(s),
//     total: cartTotal(s),
//     isEmpty: s.groups.length === 0,
//   };
// }


"use client";

import { useSyncExternalStore } from "react";
import type { BookingLine } from "@/app/lib/booking";

/**
 * Multi-service cart, saved in localStorage so it survives closing the tab /
 * redirects / next visit. One CartGroup = one booking (one service), so a cart
 * can hold Dry Cleaning + House Help + Car Wash … together.
 *
 *   laundry / dry-clean  → one group per category, serviceId = null (mixed items)
 *   house help / car wash / solar → one group per service (serviceId set)
 */
export type CartGroup = {
  /** `serviceId` or `mixed:<category>` */
  key: string;
  category: string;
  categoryName?: string;
  service?: string;
  serviceId: string | null;
  serviceName: string;
  serviceMode?: string | null;
  /** Branch that serves the customer (same as the app's cart item branchId) */
  branchId?: string | null;
  lines: BookingLine[];
};

export type AddToCartInput = Omit<CartGroup, "key"> & {
  /**
   * "merge"   (default) add quantities to what is already in the cart
   * "replace" the service holds ONE option → replace this group's lines
   */
  mode?: "merge" | "replace";
};

type CartState = { groups: CartGroup[] };

const LEGACY_KEY = "clean7_cart_v1"; // old shared cart (one for every user) - removed
const KEY_PREFIX = "clean7_cart_v2:";
const EMPTY: CartState = { groups: [] };

/* ---------- store ---------- */

let state: CartState = EMPTY;
let loaded = false;
// The cart belongs to the logged-in user. Until we know who that is
// (auth not hydrated yet) the cart stays empty and nothing is written.
let owner: string | null = null; // null = nobody logged in / unknown
let ownerKnown = false;
const storageKey = () => (owner ? KEY_PREFIX + owner : null);
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined" || !ownerKnown) return;
  loaded = true;
  const key = storageKey();
  if (!key) return; // logged out → empty cart
  try {
    const raw = localStorage.getItem(key);
    const parsed = raw ? (JSON.parse(raw) as CartState) : null;
    if (parsed && Array.isArray(parsed.groups)) state = parsed;
  } catch {
    /* ignore corrupt data */
  }
}

function commit(next: CartState) {
  state = next.groups.length ? next : EMPTY;
  const key = storageKey();
  try {
    if (!key) {
      /* nobody logged in: keep nothing on disk */
    } else if (state.groups.length) localStorage.setItem(key, JSON.stringify(state));
    else localStorage.removeItem(key);
  } catch {
    /* storage full / blocked: the cart still works for this tab */
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  load();
  listeners.add(cb);
  // another tab changed the cart
  const onStorage = (e: StorageEvent) => {
    if (!e.key || e.key !== storageKey()) return;
    try {
      const parsed = e.newValue ? (JSON.parse(e.newValue) as CartState) : EMPTY;
      state = parsed && Array.isArray(parsed.groups) ? parsed : EMPTY;
    } catch {
      state = EMPTY;
    }
    cb();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

const getSnapshot = () => {
  load();
  return state;
};
const getServerSnapshot = () => EMPTY;

/* ---------- helpers ---------- */

export const groupKeyOf = (g: {
  serviceId: string | null;
  category: string;
}) => g.serviceId ?? `mixed:${g.category}`;

const lineKey = (l: BookingLine) => `${l.kind ?? "item"}:${l.id}`;
const clampQty = (l: BookingLine, q: number) =>
  // Math.max(0, Math.min(q, l.maxQty ?? 99));
Math.max(0, Math.min(q, l.maxQty && l.maxQty > 0 ? l.maxQty : 99));

export const groupTotal = (g: CartGroup) =>
  g.lines.reduce((s, l) => s + l.price * l.qty, 0);
export const cartTotal = (s: CartState) =>
  s.groups.reduce((sum, g) => sum + groupTotal(g), 0);
/** Number of items (add-ons are not counted) – used for the cart badge. */
export const cartCount = (s: CartState) =>
  s.groups.reduce(
    (n, g) =>
      n + g.lines.filter((l) => l.kind !== "addOn").reduce((a, l) => a + l.qty, 0),
    0,
  );

/* ---------- branch (same idea as the app's cart item branchId) ---------- */

const BRANCH_KEY = "clean7_cart_branch_v1";

/** Branch found by the last serviceability check (null if none yet). */
export function getCartBranch(): string | undefined {
  try {
    return (typeof window !== "undefined" && localStorage.getItem(BRANCH_KEY)) || undefined;
  } catch {
    return undefined;
  }
}

/** Remembers the serving branch and stamps it on the cart's bookings. */
export function setCartBranch(branchId?: string | null) {
  if (!branchId) return;
  try {
    localStorage.setItem(BRANCH_KEY, branchId);
  } catch {
    /* ignore */
  }
  load();
  if (state.groups.some((g) => g.branchId !== branchId)) {
    commit({ groups: state.groups.map((g) => ({ ...g, branchId })) });
  }
}

/* ---------- actions ---------- */

export function addToCart(input: AddToCartInput) {
  load();
  const { mode = "merge", ...rest } = input;
  const key = groupKeyOf(rest);
  const incoming = rest.lines.filter((l) => l.qty > 0);
  if (incoming.length === 0) return;

  const groups = state.groups.map((g) => ({ ...g, lines: [...g.lines] }));
  const existing = groups.find((g) => g.key === key);

  if (!existing) {
    groups.push({
      ...rest,
      branchId: rest.branchId ?? getCartBranch() ?? null,
      key,
      lines: incoming.map((l) => ({ ...l })),
    });
  } else if (mode === "replace") {
    existing.lines = incoming.map((l) => ({ ...l }));
    existing.serviceName = rest.serviceName;
  } else {
    for (const l of incoming) {
      const hit = existing.lines.find((x) => lineKey(x) === lineKey(l));
      if (hit) hit.qty = clampQty(hit, hit.qty + l.qty);
      else existing.lines.push({ ...l });
    }
  }
  commit({ groups });
}

export function setLineQty(
  groupKey: string,
  line: Pick<BookingLine, "id" | "kind">,
  qty: number,
) {
  load();
  const k = `${line.kind ?? "item"}:${line.id}`;
  const groups = state.groups
    .map((g) =>
      g.key !== groupKey
        ? g
        : {
            ...g,
            lines: g.lines
              .map((l) => (lineKey(l) === k ? { ...l, qty: clampQty(l, qty) } : l))
              .filter((l) => l.qty > 0),
          },
    )
    // a group without any real item is dropped (add-ons alone can't be booked)
    .filter((g) => g.lines.some((l) => l.kind !== "addOn"));
  commit({ groups });
}

export function removeGroup(groupKey: string) {
  load();
  commit({ groups: state.groups.filter((g) => g.key !== groupKey) });
}

/**
 * Call whenever the logged-in user changes (login, logout, switch account).
 * Loads THAT user's cart; a logged-out visitor gets an empty cart.
 */
export function setCartOwner(userId: string | null) {
  if (typeof window === "undefined") return;
  if (ownerKnown && owner === userId) return;
  ownerKnown = true;
  owner = userId;
  state = EMPTY;
  loaded = false;
  try {
    localStorage.removeItem(LEGACY_KEY); // old cart shared by all users
  } catch {
    /* ignore */
  }
  load();
  listeners.forEach((l) => l());
}

export function clearCart() {
  load();
  commit(EMPTY);
}

/* ---------- hook ---------- */

export function useCart() {
  const s = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return {
    groups: s.groups,
    count: cartCount(s),
    total: cartTotal(s),
    isEmpty: s.groups.length === 0,
  };
}