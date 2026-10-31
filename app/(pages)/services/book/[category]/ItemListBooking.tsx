
// "use client";

// import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import { ChevronLeft, ChevronRight, Minus, Plus, Search, X } from "lucide-react";
// import { useRouter } from "next/navigation";
// import type { CatalogService, PricingItem } from "@/redux/api/catalogApi";
// import { toast } from "sonner";
// import { useAppSelector } from "@/redux/hooks";
// import { addToCart, useCart } from "@/app/lib/cart";
// import { useServiceabilityGate } from "@/app/hooks/useServiceabilityGate";
// import {
//   CHECKOUT_PATH,
//   GST_PERCENT,
//   MIN_ORDER_TOTAL,
//   itemSubtitle,
//   rupee,
// } from "@/app/lib/booking";

// type Row = { key: string; svc: CatalogService; item: PricingItem };

// const plural = (n: number) => `${n} ${n === 1 ? "item" : "items"}`;

// /**
//  * Laundry / dry-clean layout:
//  * title + subtitle → search → service chips → items of the selected service
//  * (name, subtitle, price, add button) → "Continue to booking" bar.
//  */
// export default function ItemListBooking({
//   categorySlug,
//   title,
//   subtitle,
//   services,
//   onGuestContinue,
//   hideHeader = false,
// }: {
//   categorySlug: string;
//   title: string;
//   subtitle: string;
//   services: CatalogService[];
//   /**
//    * Used by the public Pricing page. When given and the visitor is NOT logged
//    * in, the button calls this (e.g. open the "download app / log in" modal)
//    * instead of going to checkout. Logged-in users go straight to the booking flow.
//    */
//   onGuestContinue?: () => void;
//   /** Hide the big title + subtitle (the host page already has its own heading). */
//   hideHeader?: boolean;
// }) {
//   const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
//   const guest = !!onGuestContinue && !isAuthenticated;
//   const router = useRouter();
//   const [activeSlug, setActiveSlug] = useState<string | undefined>();
//   const [query, setQuery] = useState("");
//   const [qtys, setQtys] = useState<Record<string, number>>({});

//   // chips scroller + < > arrows
//   const chipsRef = useRef<HTMLDivElement>(null);
//   const [canLeft, setCanLeft] = useState(false);
//   const [canRight, setCanRight] = useState(false);

//   const updateArrows = useCallback(() => {
//     const el = chipsRef.current;
//     if (!el) return;
//     setCanLeft(el.scrollLeft > 4);
//     setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
//   }, []);

//   useEffect(() => {
//     updateArrows();
//     window.addEventListener("resize", updateArrows);
//     return () => window.removeEventListener("resize", updateArrows);
//   }, [updateArrows, services]);

//   const scrollChips = (dir: -1 | 1) => {
//     const el = chipsRef.current;
//     if (el) el.scrollBy({ left: dir * el.clientWidth * 0.7 });
//   };

//   const active = services.find((s) => s.slug === activeSlug) ?? services[0];

//   const allRows = useMemo<Row[]>(
//     () =>
//       services.flatMap((svc) =>
//         (svc.items ?? []).map((item) => ({
//           key: `${svc.slug}::${item.id ?? item.name}`,
//           svc,
//           item,
//         })),
//       ),
//     [services],
//   );

//   const q = query.trim().toLowerCase();
//   const rows: Row[] = q
//     ? allRows.filter(
//         ({ svc, item }) =>
//           item.name.toLowerCase().includes(q) ||
//           (item.description ?? "").toLowerCase().includes(q) ||
//           svc.name.toLowerCase().includes(q),
//       )
//     : allRows.filter((r) => r.svc.slug === active?.slug);

//   const setQty = (row: Row, next: number) =>
//     setQtys((prev) => {
//       const max = row.item.maxQty ?? 99;
//       const value = Math.max(0, Math.min(next, max));
//       const copy = { ...prev };
//       if (value === 0) delete copy[row.key];
//       else copy[row.key] = value;
//       return copy;
//     });

//   const picked = allRows.filter((r) => qtys[r.key] > 0);
//   const count = picked.reduce((n, r) => n + qtys[r.key], 0);
//   const total = picked.reduce((sum, r) => sum + r.item.price * qtys[r.key], 0);
//   // the minimum order is checked on the WHOLE cart (other services included)
//   const cart = useCart();
//   const grand = cart.total + total;
//   const remaining = Math.max(0, MIN_ORDER_TOTAL - grand);
//   const hasSomething = count > 0 || !cart.isEmpty;
//   const canContinue = guest ? hasSomething : hasSomething && grand >= MIN_ORDER_TOTAL;

//   // On the public Pricing page (onGuestContinue given) check the device location.
//   const gate = useServiceabilityGate({ useBrowserLocation: !!onGuestContinue });

//   /** Puts the picked items in the (saved) cart and clears the picker. */
//   function addPickedToCart() {
//     if (picked.length === 0) return;
//     addToCart({
//       category: categorySlug,
//       categoryName: title,
//       // one "mixed" booking per category (items of several services together,
//       // like the app) → the real serviceId is decided at checkout from the lines
//       serviceId: null,
//       serviceName: title,
//       serviceMode: String(picked[0]?.svc.serviceMode ?? "PICKUP_DELIVERY"),
//       lines: picked.map((r) => ({
//         id: String(r.item.id ?? r.key),
//         name: r.item.name,
//         serviceName: r.svc.name,
//         serviceId: r.svc.id,
//         price: r.item.price,
//         qty: qtys[r.key],
//         kind: "item" as const,
//         maxQty: r.item.maxQty ?? null,
//       })),
//     });
//     setQtys({});
//   }

//   function handleAddToCart() {
//     if (count === 0) return;
//     addPickedToCart();
//     toast.success("Added to cart");
//   }

//   function handleContinue() {
//     if (!canContinue) return;
//     if (guest) {
//       addPickedToCart();
//       onGuestContinue?.();
//       return;
//     }
//     void gate.run(() => {
//       addPickedToCart();
//       router.push(CHECKOUT_PATH);
//     });
//   }

//   if (services.length === 0) {
//     return (
//       <p className="py-16 text-center text-[var(--ink-soft)]">
//         No services are available in this category right now.
//       </p>
//     );
//   }

//   return (
//     <div>
//       {/* Title + subtitle */}
//       {!hideHeader && (
//         <>
//           <h2
//             className="text-[32px] leading-tight md:text-[40px]"
//             style={{ fontFamily: "var(--font-fraunces)" }}
//           >
//             {title}
//           </h2>
//           <p className="mt-2 text-[16px] leading-[1.7] text-[var(--ink-soft)]">
//             {subtitle}
//           </p>
//         </>
//       )}

//       {/* Search */}
//       <div className={`relative ${hideHeader ? "mt-0" : "mt-7"}`}>
//         <Search
//           size={18}
//           className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink-soft)]"
//         />
//         <input
//           type="search"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Search items, e.g. shirt, saree, curtain"
//           aria-label="Search items"
//           className="w-full rounded-full border border-[var(--line)] bg-[var(--card)] py-3.5 pl-11 pr-11 text-[15px] text-[var(--ink)] outline-none placeholder:text-[var(--ink-soft)]/70 focus:border-[var(--gold)]"
//         />
//         {query && (
//           <button
//             type="button"
//             onClick={() => setQuery("")}
//             aria-label="Clear search"
//             className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-[var(--ink-soft)] hover:bg-[var(--ink)]/5"
//           >
//             <X size={16} />
//           </button>
//         )}
//       </div>

//       {/* Service chips (Dry cleaning men / women / …) */}
//       <div className="relative mt-5">
//         {canLeft && (
//           <button
//             type="button"
//             onClick={() => scrollChips(-1)}
//             aria-label="Scroll service types left"
//             className="absolute left-0 top-[calc(50%-4px)] z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--card)] text-[var(--ink)] shadow-md hover:border-[var(--gold)] sm:flex"
//           >
//             <ChevronLeft size={18} />
//           </button>
//         )}

//         <div
//           ref={chipsRef}
//           onScroll={updateArrows}
//           className="flex gap-2.5 overflow-x-auto px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
//           role="tablist"
//           aria-label="Service types"
//         >
//           {services.map((svc) => {
//             const selected = !q && svc.slug === active?.slug;
//             return (
//               <button
//                 key={svc.slug}
//                 type="button"
//                 role="tab"
//                 aria-selected={selected}
//                 onClick={() => {
//                   setQuery("");
//                   setActiveSlug(svc.slug);
//                 }}
//                 className={`shrink-0 rounded-full border px-5 py-2.5 text-[14px] font-semibold transition-colors ${
//                   selected
//                     ? "border-[var(--gold)] bg-[var(--gold)] text-[#fff]"
//                     : "border-[var(--line)] bg-[var(--card)] text-[var(--ink)] hover:border-[var(--gold)]/60"
//                 }`}
//               >
//                 {svc.name}
//               </button>
//             );
//           })}
//         </div>

//         {canRight && (
//           <button
//             type="button"
//             onClick={() => scrollChips(1)}
//             aria-label="Scroll service types right"
//             className="absolute right-0 top-[calc(50%-4px)] z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--card)] text-[var(--ink)] shadow-md hover:border-[var(--gold)] sm:flex"
//           >
//             <ChevronRight size={18} />
//           </button>
//         )}
//       </div>

//       {/* Selected service heading + count */}
//       <h3
//         className="mb-4 mt-7 text-[22px] md:text-[26px]"
//         style={{ fontFamily: "var(--font-fraunces)" }}
//       >
//         {q ? "Search results" : active?.name}{" "}
//         <span className="text-[16px] text-[var(--ink-soft)]">
//           ({plural(rows.length)})
//         </span>
//       </h3>

//       {/* Items */}
//       {rows.length === 0 ? (
//         <p className="rounded-2xl border border-[var(--line)] bg-[var(--card)] px-5 py-10 text-center text-[var(--ink-soft)]">
//           {q ? `No items match “${query.trim()}”.` : "No items in this service yet."}
//         </p>
//       ) : (
//         <ul className="grid gap-3 md:grid-cols-2">
//           {rows.map((row) => {
//             const qty = qtys[row.key] ?? 0;
//             const sub = itemSubtitle(row.item);
//             return (
//               <li
//                 key={row.key}
//                 className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--line)] bg-[var(--card)] px-4 py-3.5"
//               >
//                 <div className="min-w-0">
//                   <p className="line-clamp-2 text-[16px] font-medium text-[var(--ink)]">
//                     {row.item.name}
//                   </p>
//                   {(sub || q) && (
//                     <p className="mt-0.5 line-clamp-2 text-[13px] text-[var(--ink-soft)]">
//                       {q ? [row.svc.name, sub].filter(Boolean).join(" · ") : sub}
//                     </p>
//                   )}
//                 </div>

//                 <div className="flex shrink-0 items-center gap-3">
//                   <span className="text-[16px] font-semibold text-[var(--ink)]">
//                     {rupee(row.item.price)}
//                   </span>

//                   {qty === 0 ? (
//                     <button
//                       type="button"
//                       onClick={() => setQty(row, 1)}
//                       aria-label={`Add ${row.item.name}`}
//                       className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--gold)] text-[var(--gold-bright)] transition-colors hover:bg-[var(--gold)] hover:text-[#fff]"
//                     >
//                       <Plus size={18} />
//                     </button>
//                   ) : (
//                     <div className="flex items-center rounded-full border border-[var(--gold)] bg-[var(--gold)] text-[#fff]">
//                       <button
//                         type="button"
//                         onClick={() => setQty(row, qty - 1)}
//                         aria-label={`Remove one ${row.item.name}`}
//                         className="flex h-9 w-9 items-center justify-center rounded-full"
//                       >
//                         <Minus size={16} />
//                       </button>
//                       <span className="min-w-[1.5rem] text-center text-[14px] font-semibold">
//                         {qty}
//                       </span>
//                       <button
//                         type="button"
//                         onClick={() => setQty(row, qty + 1)}
//                         aria-label={`Add one more ${row.item.name}`}
//                         className="flex h-9 w-9 items-center justify-center rounded-full"
//                       >
//                         <Plus size={16} />
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </li>
//             );
//           })}
//         </ul>
//       )}

//       {/* Continue bar */}
//       <div className="sticky bottom-0 z-10 mt-8 rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4 shadow-lg md:p-5">
//         <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//           <div className="min-w-0">
//             <p className="text-[15px] font-semibold text-[var(--ink)]">
//               {count > 0 ? `${plural(count)} · ${rupee(total)}` : "No items added"}
//               <span className="ml-2 text-[13px] font-normal text-[var(--ink-soft)]">
//                 incl. {GST_PERCENT}% GST
//               </span>
//             </p>
//             <p className="mt-0.5 text-[13px] text-[var(--ink-soft)]">
//               {canContinue
//                 ? "You’re all set to continue."
//                 : hasSomething
//                   ? `Add ${rupee(remaining)} more to continue (minimum ${rupee(MIN_ORDER_TOTAL)}).`
//                   : `Minimum order ${rupee(MIN_ORDER_TOTAL)}, GST included.`}
//               {!cart.isEmpty && (
//                 <span className="ml-1">
//                   · In cart: {plural(cart.count)} ({rupee(cart.total)})
//                 </span>
//               )}
//             </p>
//           </div>
//           <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto sm:flex-row">
//             <button
//               type="button"
//               onClick={handleAddToCart}
//               disabled={count === 0}
//               className="w-full whitespace-nowrap rounded-full border border-[var(--gold)] px-6 py-3 text-[15px] font-semibold text-[var(--gold-bright)] transition-colors hover:bg-[var(--gold)]/10 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
//             >
//               Add to cart
//             </button>
//             <button
//               type="button"
//               onClick={handleContinue}
//               disabled={!canContinue || gate.checking}
//               className="w-full whitespace-nowrap rounded-full bg-[var(--gold)] px-8 py-3 text-[15px] font-semibold text-[#fff] transition-colors hover:bg-[var(--gold-bright)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[var(--gold)] sm:w-auto"
//             >
//               {gate.checking
//                 ? "Checking location…"
//                 : onGuestContinue
//                   ? "Book now"
//                   : "Continue to booking"}
//             </button>
//           </div>
//         </div>
//       </div>
//       {gate.gateModal}
//     </div>
//   );
// }

"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Minus, Plus, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import type { CatalogService, PricingItem } from "@/redux/api/catalogApi";
import { toast } from "sonner";
import { useAppSelector } from "@/redux/hooks";
import { addToCart, useCart } from "@/app/lib/cart";
import { useServiceabilityGate } from "@/app/hooks/useServiceabilityGate";
import {
  CHECKOUT_PATH,
  GST_PERCENT,
  MIN_ORDER_TOTAL,
  itemSubtitle,
  rupee,
} from "@/app/lib/booking";

type Row = { key: string; svc: CatalogService; item: PricingItem };

const plural = (n: number) => `${n} ${n === 1 ? "item" : "items"}`;

/**
 * Laundry / dry-clean layout:
 * title + subtitle → search → service chips → items of the selected service
 * (name, subtitle, price, add button) → "Continue to booking" bar.
 */
export default function ItemListBooking({
  categorySlug,
  title,
  subtitle,
  services,
  onGuestContinue,
  hideHeader = false,
}: {
  categorySlug: string;
  title: string;
  subtitle: string;
  services: CatalogService[];
  /**
   * Used by the public Pricing page. When given and the visitor is NOT logged
   * in, the button calls this (e.g. open the "download app / log in" modal)
   * instead of going to checkout. Logged-in users go straight to the booking flow.
   */
  onGuestContinue?: () => void;
  /** Hide the big title + subtitle (the host page already has its own heading). */
  hideHeader?: boolean;
}) {
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  const guest = !!onGuestContinue && !isAuthenticated;
  const router = useRouter();
  const [activeSlug, setActiveSlug] = useState<string | undefined>();
  const [query, setQuery] = useState("");
  const [qtys, setQtys] = useState<Record<string, number>>({});

  // chips scroller + < > arrows
  const chipsRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const updateArrows = useCallback(() => {
    const el = chipsRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, [updateArrows, services]);

  const scrollChips = (dir: -1 | 1) => {
    const el = chipsRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.7 });
  };

  const active = services.find((s) => s.slug === activeSlug) ?? services[0];

  const allRows = useMemo<Row[]>(
    () =>
      services.flatMap((svc) =>
        (svc.items ?? []).map((item) => ({
          key: `${svc.slug}::${item.id ?? item.name}`,
          svc,
          item,
        })),
      ),
    [services],
  );

  const q = query.trim().toLowerCase();
  const rows: Row[] = q
    ? allRows.filter(
        ({ svc, item }) =>
          item.name.toLowerCase().includes(q) ||
          (item.description ?? "").toLowerCase().includes(q) ||
          svc.name.toLowerCase().includes(q),
      )
    : allRows.filter((r) => r.svc.slug === active?.slug);

  const setQty = (row: Row, next: number) =>
    setQtys((prev) => {
      // const max = row.item.maxQty ?? 99;
      const max = row.item.maxQty && row.item.maxQty > 0 ? row.item.maxQty : 99;
      const value = Math.max(0, Math.min(next, max));
      const copy = { ...prev };
      if (value === 0) delete copy[row.key];
      else copy[row.key] = value;
      return copy;
    });

  const picked = allRows.filter((r) => qtys[r.key] > 0);
  const count = picked.reduce((n, r) => n + qtys[r.key], 0);
  const total = picked.reduce((sum, r) => sum + r.item.price * qtys[r.key], 0);
  // the minimum order is checked on the WHOLE cart (other services included)
  const cart = useCart();
  const grand = cart.total + total;
  const remaining = Math.max(0, MIN_ORDER_TOTAL - grand);
  const hasSomething = count > 0 || !cart.isEmpty;
  const canContinue = guest ? hasSomething : hasSomething && grand >= MIN_ORDER_TOTAL;

  // On the public Pricing page (onGuestContinue given) check the device location.
  const gate = useServiceabilityGate({ useBrowserLocation: !!onGuestContinue });

  /** Puts the picked items in the (saved) cart and clears the picker. */
  function addPickedToCart() {
    if (picked.length === 0) return;
    addToCart({
      category: categorySlug,
      categoryName: title,
      // one "mixed" booking per category (items of several services together,
      // like the app) → the real serviceId is decided at checkout from the lines
      serviceId: null,
      serviceName: title,
      serviceMode: String(picked[0]?.svc.serviceMode ?? "PICKUP_DELIVERY"),
      lines: picked.map((r) => ({
        id: String(r.item.id ?? r.key),
        name: r.item.name,
        serviceName: r.svc.name,
        serviceId: r.svc.id,
        price: r.item.price,
        qty: qtys[r.key],
        kind: "item" as const,
        maxQty: r.item.maxQty ?? null,
      })),
    });
    setQtys({});
  }

  function handleAddToCart() {
    if (count === 0) return;
    addPickedToCart();
    toast.success("Added to cart");
  }

  function handleContinue() {
    if (!canContinue) return;
    if (guest) {
      addPickedToCart();
      onGuestContinue?.();
      return;
    }
    void gate.run(() => {
      addPickedToCart();
      router.push(CHECKOUT_PATH);
    });
  }

  if (services.length === 0) {
    return (
      <p className="py-16 text-center text-[var(--ink-soft)]">
        No services are available in this category right now.
      </p>
    );
  }

  return (
    <div>
      {/* Title + subtitle */}
      {!hideHeader && (
        <>
          <h2
            className="text-[32px] leading-tight md:text-[40px]"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            {title}
          </h2>
          <p className="mt-2 text-[16px] leading-[1.7] text-[var(--ink-soft)]">
            {subtitle}
          </p>
        </>
      )}

      {/* Search */}
      <div className={`relative ${hideHeader ? "mt-0" : "mt-7"}`}>
        <Search
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink-soft)]"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search items, e.g. shirt, saree, curtain"
          aria-label="Search items"
          className="w-full rounded-full border border-[var(--line)] bg-[var(--card)] py-3.5 pl-11 pr-11 text-[15px] text-[var(--ink)] outline-none placeholder:text-[var(--ink-soft)]/70 focus:border-[var(--gold)]"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-[var(--ink-soft)] hover:bg-[var(--ink)]/5"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Service chips (Dry cleaning men / women / …) */}
      <div className="relative mt-5">
        {canLeft && (
          <button
            type="button"
            onClick={() => scrollChips(-1)}
            aria-label="Scroll service types left"
            className="absolute left-0 top-[calc(50%-4px)] z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--card)] text-[var(--ink)] shadow-md hover:border-[var(--gold)] sm:flex"
          >
            <ChevronLeft size={18} />
          </button>
        )}

        <div
          ref={chipsRef}
          onScroll={updateArrows}
          className="flex gap-2.5 overflow-x-auto px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Service types"
        >
          {services.map((svc) => {
            const selected = !q && svc.slug === active?.slug;
            return (
              <button
                key={svc.slug}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => {
                  setQuery("");
                  setActiveSlug(svc.slug);
                }}
                className={`shrink-0 rounded-full border px-5 py-2.5 text-[14px] font-semibold transition-colors ${
                  selected
                    ? "border-[var(--gold)] bg-[var(--gold)] text-[#fff]"
                    : "border-[var(--line)] bg-[var(--card)] text-[var(--ink)] hover:border-[var(--gold)]/60"
                }`}
              >
                {svc.name}
              </button>
            );
          })}
        </div>

        {canRight && (
          <button
            type="button"
            onClick={() => scrollChips(1)}
            aria-label="Scroll service types right"
            className="absolute right-0 top-[calc(50%-4px)] z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--card)] text-[var(--ink)] shadow-md hover:border-[var(--gold)] sm:flex"
          >
            <ChevronRight size={18} />
          </button>
        )}
      </div>

      {/* Selected service heading + count */}
      <h3
        className="mb-4 mt-7 text-[22px] md:text-[26px]"
        style={{ fontFamily: "var(--font-fraunces)" }}
      >
        {q ? "Search results" : active?.name}{" "}
        <span className="text-[16px] text-[var(--ink-soft)]">
          ({plural(rows.length)})
        </span>
      </h3>

      {/* Items */}
      {rows.length === 0 ? (
        <p className="rounded-2xl border border-[var(--line)] bg-[var(--card)] px-5 py-10 text-center text-[var(--ink-soft)]">
          {q ? `No items match “${query.trim()}”.` : "No items in this service yet."}
        </p>
      ) : (
        <ul className="grid gap-3 md:grid-cols-2">
          {rows.map((row) => {
            const qty = qtys[row.key] ?? 0;
            const sub = itemSubtitle(row.item);
            return (
              <li
                key={row.key}
                className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--line)] bg-[var(--card)] px-4 py-3.5"
              >
                <div className="min-w-0">
                  <p className="line-clamp-2 text-[16px] font-medium text-[var(--ink)]">
                    {row.item.name}
                  </p>
                  {(sub || q) && (
                    <p className="mt-0.5 line-clamp-2 text-[13px] text-[var(--ink-soft)]">
                      {q ? [row.svc.name, sub].filter(Boolean).join(" · ") : sub}
                    </p>
                  )}
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <span className="text-[16px] font-semibold text-[var(--ink)]">
                    {rupee(row.item.price)}
                  </span>

                  {qty === 0 ? (
                    <button
                      type="button"
                      onClick={() => setQty(row, 1)}
                      aria-label={`Add ${row.item.name}`}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--gold)] text-[var(--gold-bright)] transition-colors hover:bg-[var(--gold)] hover:text-[#fff]"
                    >
                      <Plus size={18} />
                    </button>
                  ) : (
                    <div className="flex items-center rounded-full border border-[var(--gold)] bg-[var(--gold)] text-[#fff]">
                      <button
                        type="button"
                        onClick={() => setQty(row, qty - 1)}
                        aria-label={`Remove one ${row.item.name}`}
                        className="flex h-9 w-9 items-center justify-center rounded-full"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="min-w-[1.5rem] text-center text-[14px] font-semibold">
                        {qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQty(row, qty + 1)}
                        aria-label={`Add one more ${row.item.name}`}
                        className="flex h-9 w-9 items-center justify-center rounded-full"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {/* Continue bar */}
      <div className="sticky bottom-[var(--cart-bar-offset,0px)] z-10 mt-8 transition-[bottom] duration-200 rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4 shadow-lg md:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-[15px] font-semibold text-[var(--ink)]">
              {count > 0 ? `${plural(count)} · ${rupee(total)}` : "No items added"}
              <span className="ml-2 text-[13px] font-normal text-[var(--ink-soft)]">
                incl. {GST_PERCENT}% GST
              </span>
            </p>
            <p className="mt-0.5 text-[13px] text-[var(--ink-soft)]">
              {canContinue
                ? "You’re all set to continue."
                : hasSomething
                  ? `Add ${rupee(remaining)} more to continue (minimum ${rupee(MIN_ORDER_TOTAL)}).`
                  : `Minimum order ${rupee(MIN_ORDER_TOTAL)}, GST included.`}
              {!cart.isEmpty && (
                <span className="ml-1">
                  · In cart: {plural(cart.count)} ({rupee(cart.total)})
                </span>
              )}
            </p>
          </div>
          <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto sm:flex-row">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={count === 0}
              className="w-full whitespace-nowrap rounded-full border border-[var(--gold)] px-6 py-3 text-[15px] font-semibold text-[var(--gold-bright)] transition-colors hover:bg-[var(--gold)]/10 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
            >
              Add to cart
            </button>
            <button
              type="button"
              onClick={handleContinue}
              disabled={!canContinue || gate.checking}
              className="w-full whitespace-nowrap rounded-full bg-[var(--gold)] px-8 py-3 text-[15px] font-semibold text-[#fff] transition-colors hover:bg-[var(--gold-bright)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[var(--gold)] sm:w-auto"
            >
              {gate.checking
                ? "Checking location…"
                : onGuestContinue
                  ? "Book now"
                  : "Continue to booking"}
            </button>
          </div>
        </div>
      </div>
      {gate.gateModal}
    </div>
  );
}