// "use client";

// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import ClampedText from "@/app/components/booking/ClampedText";
// import { toast } from "sonner";
// import { useAppSelector } from "@/redux/hooks";
// import { addToCart } from "@/app/lib/cart";
// import { useServiceabilityGate } from "@/app/hooks/useServiceabilityGate";
// import {
//   CHECKOUT_PATH,
//   GST_PERCENT,
//   itemSubtitle,
//   rupee,
// } from "@/app/lib/booking";
// import type { CatalogService } from "@/redux/api/catalogApi";

// const keyOf = (x: { id?: string; name: string }) => x.id ?? x.name;

// /**
//  * Pricing-page version of the "service module" for House Help, Door-to-door
//  * Car Wash, Solar Panel Cleaning, etc.:
//  *   pick ONE service (chips) → pick ONE option (radio) → optional add-ons →
//  *   "Book now".
//  * Logged in  → serviceability check → saves the draft → checkout.
//  * Logged out → onGuestContinue() (the download-app / login modal).
//  */
// export default function PricingServiceSelect({
//   categorySlug,
//   services,
//   onGuestContinue,
// }: {
//   categorySlug: string;
//   services: CatalogService[];
//   onGuestContinue: () => void;
// }) {
//   const router = useRouter();
//   const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
//   const gate = useServiceabilityGate({ useBrowserLocation: true });

//   const [serviceSlug, setServiceSlug] = useState<string | null>(null);
//   const [optionKey, setOptionKey] = useState<string | null>(null);
//   const [addOnKeys, setAddOnKeys] = useState<string[]>([]);

//   const service = services.find((s) => s.slug === serviceSlug) ?? services[0];

//   function pickService(slug: string) {
//     if (slug === service?.slug) return;
//     setServiceSlug(slug);
//     setOptionKey(null);
//     setAddOnKeys([]);
//   }

//   if (!service) {
//     return (
//       <p className="rounded-2xl border border-[var(--line)] bg-[var(--card)] px-5 py-10 text-center text-[var(--ink-soft)]">
//         No services are available in this category right now.
//       </p>
//     );
//   }

//   const items = service.items ?? [];
//   const addOns = service.addOns ?? [];
//   const option = items.find((i) => keyOf(i) === optionKey);
//   const chosenAddOns = addOns.filter((a) => addOnKeys.includes(keyOf(a)));
//   const total =
//     (option?.price ?? 0) + chosenAddOns.reduce((s, a) => s + a.price, 0);

//   const toggleAddOn = (k: string) =>
//     setAddOnKeys((prev) =>
//       prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k],
//     );

//   /** One booking per service: choosing again replaces the previous option. */
//   const saveToCart = () => {
//     if (!option) return;
//     addToCart({
//       mode: "replace",
//       category: categorySlug,
//       categoryName: service.category?.name,
//       service: service.slug,
//       serviceId: service.id,
//       serviceName: service.name,
//       serviceMode: String(service.serviceMode ?? "AT_HOME"),
//       lines: [
//         {
//           id: String(keyOf(option)),
//           name: option.name,
//           serviceName: service.name,
//           price: option.price,
//           qty: 1,
//           kind: "item" as const,
//         },
//         ...chosenAddOns.map((a) => ({
//           id: String(keyOf(a)),
//           name: a.name,
//           serviceName: service.name,
//           price: a.price,
//           qty: 1,
//           kind: "addOn" as const,
//         })),
//       ],
//     });
//   };

//   const handleAddToCart = () => {
//     if (!option) return;
//     saveToCart();
//     toast.success("Added to cart");
//   };

//   const handleBook = () => {
//     if (!option) return;
//     saveToCart();
//     if (!isAuthenticated) {
//       onGuestContinue();
//       return;
//     }
//     void gate.run(() => router.push(CHECKOUT_PATH));
//   };

//   return (
//     <div>
//       {/* One service at a time */}
//       <p className="mb-3 text-[14px] text-[var(--ink-soft)]">
//         Select a service to view its options
//       </p>
//       <div
//         className="flex flex-wrap gap-2.5"
//         role="tablist"
//         aria-label="Services"
//       >
//         {services.map((svc) => {
//           const selected = svc.slug === service.slug;
//           return (
//             <button
//               key={svc.slug}
//               type="button"
//               role="tab"
//               aria-selected={selected}
//               onClick={() => pickService(svc.slug)}
//               className={`rounded-full border px-5 py-2.5 text-[14px] font-semibold transition-colors ${
//                 selected
//                   ? "border-[var(--gold)] bg-[var(--gold)] text-[#fff]"
//                   : "border-[var(--line)] bg-[var(--card)] text-[var(--ink)] hover:border-[var(--gold)]/60"
//               }`}
//             >
//               {svc.name}
//             </button>
//           );
//         })}
//       </div>

//       {(service.longDescription || service.shortDescription) && (
//         <ClampedText
//           text={(service.longDescription || service.shortDescription) as string}
//           threshold={160}
//           className="mt-5 text-[15px] leading-[1.7] text-[var(--ink-soft)]"
//         />
//       )}

//       {/* Options (single choice) */}
//       <fieldset className="mt-6">
//         <legend className="mb-3 text-[14px] text-[var(--ink-soft)]">
//           Select option
//         </legend>
//         {items.length === 0 ? (
//           <p className="rounded-2xl border border-[var(--line)] bg-[var(--card)] px-5 py-10 text-center text-[var(--ink-soft)]">
//             No options are available for this service right now.
//           </p>
//         ) : (
//           <ul className="space-y-3">
//             {items.map((it) => {
//               const k = keyOf(it);
//               const selected = optionKey === k;
//               const sub = itemSubtitle(it);
//               return (
//                 <li key={k}>
//                   <label
//                     className={`flex cursor-pointer items-start justify-between gap-4 rounded-2xl border p-4 transition-colors sm:p-5 ${
//                       selected
//                         ? "border-[var(--gold)] bg-[var(--gold)]/5"
//                         : "border-[var(--line)] bg-[var(--card)] hover:border-[var(--gold)]/50"
//                     }`}
//                   >
//                     <input
//                       type="radio"
//                       name="pricing-service-option"
//                       checked={selected}
//                       onChange={() => setOptionKey(k)}
//                       className="peer sr-only"
//                     />
//                     <span className="min-w-0 flex-1">
//                       <span className="line-clamp-2 text-[16px] font-semibold text-[var(--ink)]">
//                         {it.name}
//                       </span>
//                       {sub && (
//                         <ClampedText
//                           text={sub}
//                           className="mt-1.5 text-[13px] leading-[1.6] text-[var(--ink-soft)]"
//                         />
//                       )}
//                     </span>
//                     <span className="flex shrink-0 items-start gap-3 sm:gap-4">
//                       <span className="text-right">
//                         <span className="block text-[17px] font-semibold text-[var(--ink)]">
//                           {rupee(it.price)}
//                         </span>
//                         <span className="block text-[12px] text-[var(--ink-soft)]">
//                           incl. GST
//                         </span>
//                       </span>
//                       <span
//                         aria-hidden
//                         className={`mt-0.5 flex h-6 w-6 items-center justify-center rounded-full border-2 peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--gold)] ${
//                           selected
//                             ? "border-[var(--gold)]"
//                             : "border-[var(--line)]"
//                         }`}
//                       >
//                         {selected && (
//                           <span className="h-3 w-3 rounded-full bg-[var(--gold)]" />
//                         )}
//                       </span>
//                     </span>
//                   </label>
//                 </li>
//               );
//             })}
//           </ul>
//         )}
//       </fieldset>

//       {/* Add-ons (multi choice) */}
//       {addOns.length > 0 && (
//         <section className="mt-8">
//           <h4
//             className="mb-4 text-[20px] md:text-[22px]"
//             style={{ fontFamily: "var(--font-fraunces)" }}
//           >
//             Other
//           </h4>
//           <ul className="space-y-3">
//             {addOns.map((a) => {
//               const k = keyOf(a);
//               const on = addOnKeys.includes(k);
//               return (
//                 <li key={k}>
//                   <label
//                     className={`flex cursor-pointer items-center justify-between gap-4 rounded-2xl border p-4 transition-colors sm:p-5 ${
//                       on
//                         ? "border-[var(--gold)] bg-[var(--gold)]/5"
//                         : "border-[var(--line)] bg-[var(--card)] hover:border-[var(--gold)]/50"
//                     }`}
//                   >
//                     <input
//                       type="checkbox"
//                       checked={on}
//                       onChange={() => toggleAddOn(k)}
//                       className="peer sr-only"
//                     />
//                     <span className="line-clamp-2 min-w-0 text-[16px] font-medium text-[var(--ink)]">
//                       {a.name}
//                     </span>
//                     <span className="flex shrink-0 items-center gap-4">
//                       <span className="text-[16px] font-semibold text-[var(--ink)]">
//                         {rupee(a.price)}
//                       </span>
//                       <span
//                         aria-hidden
//                         className={`flex h-6 w-6 items-center justify-center rounded-md border-2 text-[14px] leading-none peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--gold)] ${
//                           on
//                             ? "border-[var(--gold)] bg-[var(--gold)] text-[#fff]"
//                             : "border-[var(--line)]"
//                         }`}
//                       >
//                         {on ? "✓" : ""}
//                       </span>
//                     </span>
//                   </label>
//                 </li>
//               );
//             })}
//           </ul>
//         </section>
//       )}

//       {/* Book bar */}
//       <div className="sticky bottom-0 z-10 mt-8 rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4 shadow-lg md:p-5">
//         <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//           <div className="min-w-0">
//             <p className="text-[15px] font-semibold text-[var(--ink)]">
//               {option ? rupee(total) : "No option selected"}
//               {option && (
//                 <span className="ml-2 text-[13px] font-normal text-[var(--ink-soft)]">
//                   incl. {GST_PERCENT}% GST
//                 </span>
//               )}
//             </p>
//             <p className="mt-0.5 truncate text-[13px] text-[var(--ink-soft)]">
//               {option ? option.name : "Select an option to continue."}
//             </p>
//           </div>
//           <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto sm:flex-row">
//             <button
//               type="button"
//               onClick={handleAddToCart}
//               disabled={!option}
//               className="w-full whitespace-nowrap rounded-full border border-[var(--gold)] px-6 py-3 text-[15px] font-semibold text-[var(--gold-bright)] transition-colors hover:bg-[var(--gold)]/10 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
//             >
//               Add to cart
//             </button>
//             <button
//               type="button"
//               onClick={handleBook}
//               disabled={!option || gate.checking}
//               className="w-full whitespace-nowrap rounded-full bg-[var(--gold)] px-8 py-3 text-[15px] font-semibold text-[#fff] transition-colors hover:bg-[var(--gold-bright)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[var(--gold)] sm:w-auto"
//             >
//               {gate.checking ? "Checking location…" : "Book now"}
//             </button>
//           </div>
//         </div>
//       </div>
//       {gate.gateModal}
//     </div>
//   );
// }


"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ClampedText from "@/app/components/booking/ClampedText";
import { toast } from "sonner";
import { useAppSelector } from "@/redux/hooks";
import { addToCart } from "@/app/lib/cart";
import { useServiceabilityGate } from "@/app/hooks/useServiceabilityGate";
import {
  CHECKOUT_PATH,
  GST_PERCENT,
  itemSubtitle,
  rupee,
} from "@/app/lib/booking";
import type { CatalogService } from "@/redux/api/catalogApi";

const keyOf = (x: { id?: string; name: string }) => x.id ?? x.name;

/**
 * Pricing-page version of the "service module" for House Help, Door-to-door
 * Car Wash, Solar Panel Cleaning, etc.:
 *   pick ONE service (chips) → pick ONE option (radio) → optional add-ons →
 *   "Book now".
 * Logged in  → serviceability check → saves the draft → checkout.
 * Logged out → onGuestContinue() (the download-app / login modal).
 */
export default function PricingServiceSelect({
  categorySlug,
  services,
  onGuestContinue,
}: {
  categorySlug: string;
  services: CatalogService[];
  onGuestContinue: () => void;
}) {
  const router = useRouter();
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  const gate = useServiceabilityGate({ useBrowserLocation: true });

  const [serviceSlug, setServiceSlug] = useState<string | null>(null);
  const [optionKey, setOptionKey] = useState<string | null>(null);
  const [addOnKeys, setAddOnKeys] = useState<string[]>([]);

  const service = services.find((s) => s.slug === serviceSlug) ?? services[0];

  function pickService(slug: string) {
    if (slug === service?.slug) return;
    setServiceSlug(slug);
    setOptionKey(null);
    setAddOnKeys([]);
  }

  if (!service) {
    return (
      <p className="rounded-2xl border border-[var(--line)] bg-[var(--card)] px-5 py-10 text-center text-[var(--ink-soft)]">
        No services are available in this category right now.
      </p>
    );
  }

  const items = service.items ?? [];
  const addOns = service.addOns ?? [];
  const option = items.find((i) => keyOf(i) === optionKey);
  const chosenAddOns = addOns.filter((a) => addOnKeys.includes(keyOf(a)));
  const total =
    (option?.price ?? 0) + chosenAddOns.reduce((s, a) => s + a.price, 0);

  const toggleAddOn = (k: string) =>
    setAddOnKeys((prev) =>
      prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k],
    );

  /** One booking per service: choosing again replaces the previous option. */
  const saveToCart = () => {
    if (!option) return;
    addToCart({
      mode: "replace",
      category: categorySlug,
      categoryName: service.category?.name,
      service: service.slug,
      serviceId: service.id,
      serviceName: service.name,
      serviceMode: String(service.serviceMode ?? "AT_HOME"),
      lines: [
        {
          id: String(keyOf(option)),
          name: option.name,
          serviceName: service.name,
          price: option.price,
          qty: 1,
          kind: "item" as const,
        },
        ...chosenAddOns.map((a) => ({
          id: String(keyOf(a)),
          name: a.name,
          serviceName: service.name,
          price: a.price,
          qty: 1,
          kind: "addOn" as const,
        })),
      ],
    });
  };

  const handleAddToCart = () => {
    if (!option) return;
    saveToCart();
    toast.success("Added to cart");
  };

  const handleBook = () => {
    if (!option) return;
    saveToCart();
    if (!isAuthenticated) {
      onGuestContinue();
      return;
    }
    void gate.run(() => router.push(CHECKOUT_PATH));
  };

  return (
    <div>
      {/* One service at a time */}
      <p className="mb-3 text-[14px] text-[var(--ink-soft)]">
        Select a service to view its options
      </p>
      <div
        className="flex flex-wrap gap-2.5"
        role="tablist"
        aria-label="Services"
      >
        {services.map((svc) => {
          const selected = svc.slug === service.slug;
          return (
            <button
              key={svc.slug}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => pickService(svc.slug)}
              className={`rounded-full border px-5 py-2.5 text-[14px] font-semibold transition-colors ${
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

      {(service.longDescription || service.shortDescription) && (
        <ClampedText
          text={(service.longDescription || service.shortDescription) as string}
          threshold={160}
          className="mt-5 text-[15px] leading-[1.7] text-[var(--ink-soft)]"
        />
      )}

      {/* Options (single choice) */}
      <fieldset className="mt-6">
        <legend className="mb-3 text-[14px] text-[var(--ink-soft)]">
          Select option
        </legend>
        {items.length === 0 ? (
          <p className="rounded-2xl border border-[var(--line)] bg-[var(--card)] px-5 py-10 text-center text-[var(--ink-soft)]">
            No options are available for this service right now.
          </p>
        ) : (
          <ul className="space-y-3">
            {items.map((it) => {
              const k = keyOf(it);
              const selected = optionKey === k;
              const sub = itemSubtitle(it);
              return (
                <li key={k}>
                  <label
                    className={`flex cursor-pointer items-start justify-between gap-4 rounded-2xl border p-4 transition-colors sm:p-5 ${
                      selected
                        ? "border-[var(--gold)] bg-[var(--gold)]/5"
                        : "border-[var(--line)] bg-[var(--card)] hover:border-[var(--gold)]/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="pricing-service-option"
                      checked={selected}
                      onChange={() => setOptionKey(k)}
                      className="peer sr-only"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="line-clamp-2 text-[16px] font-semibold text-[var(--ink)]">
                        {it.name}
                      </span>
                      {sub && (
                        <ClampedText
                          text={sub}
                          className="mt-1.5 text-[13px] leading-[1.6] text-[var(--ink-soft)]"
                        />
                      )}
                    </span>
                    <span className="flex shrink-0 items-start gap-3 sm:gap-4">
                      <span className="text-right">
                        <span className="block text-[17px] font-semibold text-[var(--ink)]">
                          {rupee(it.price)}
                        </span>
                        <span className="block text-[12px] text-[var(--ink-soft)]">
                          incl. GST
                        </span>
                      </span>
                      <span
                        aria-hidden
                        className={`mt-0.5 flex h-6 w-6 items-center justify-center rounded-full border-2 peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--gold)] ${
                          selected
                            ? "border-[var(--gold)]"
                            : "border-[var(--line)]"
                        }`}
                      >
                        {selected && (
                          <span className="h-3 w-3 rounded-full bg-[var(--gold)]" />
                        )}
                      </span>
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        )}
      </fieldset>

      {/* Add-ons (multi choice) */}
      {addOns.length > 0 && (
        <section className="mt-8">
          <h4
            className="mb-4 text-[20px] md:text-[22px]"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            Other
          </h4>
          <ul className="space-y-3">
            {addOns.map((a) => {
              const k = keyOf(a);
              const on = addOnKeys.includes(k);
              return (
                <li key={k}>
                  <label
                    className={`flex cursor-pointer items-center justify-between gap-4 rounded-2xl border p-4 transition-colors sm:p-5 ${
                      on
                        ? "border-[var(--gold)] bg-[var(--gold)]/5"
                        : "border-[var(--line)] bg-[var(--card)] hover:border-[var(--gold)]/50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={on}
                      onChange={() => toggleAddOn(k)}
                      className="peer sr-only"
                    />
                    <span className="line-clamp-2 min-w-0 text-[16px] font-medium text-[var(--ink)]">
                      {a.name}
                    </span>
                    <span className="flex shrink-0 items-center gap-4">
                      <span className="text-[16px] font-semibold text-[var(--ink)]">
                        {rupee(a.price)}
                      </span>
                      <span
                        aria-hidden
                        className={`flex h-6 w-6 items-center justify-center rounded-md border-2 text-[14px] leading-none peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--gold)] ${
                          on
                            ? "border-[var(--gold)] bg-[var(--gold)] text-[#fff]"
                            : "border-[var(--line)]"
                        }`}
                      >
                        {on ? "✓" : ""}
                      </span>
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* Book bar */}
      <div className="sticky bottom-[var(--cart-bar-offset,0px)] z-10 mt-8 transition-[bottom] duration-200 rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4 shadow-lg md:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-[15px] font-semibold text-[var(--ink)]">
              {option ? rupee(total) : "No option selected"}
              {option && (
                <span className="ml-2 text-[13px] font-normal text-[var(--ink-soft)]">
                  incl. {GST_PERCENT}% GST
                </span>
              )}
            </p>
            <p className="mt-0.5 truncate text-[13px] text-[var(--ink-soft)]">
              {option ? option.name : "Select an option to continue."}
            </p>
          </div>
          <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto sm:flex-row">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!option}
              className="w-full whitespace-nowrap rounded-full border border-[var(--gold)] px-6 py-3 text-[15px] font-semibold text-[var(--gold-bright)] transition-colors hover:bg-[var(--gold)]/10 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
            >
              Add to cart
            </button>
            <button
              type="button"
              onClick={handleBook}
              disabled={!option || gate.checking}
              className="w-full whitespace-nowrap rounded-full bg-[var(--gold)] px-8 py-3 text-[15px] font-semibold text-[#fff] transition-colors hover:bg-[var(--gold-bright)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[var(--gold)] sm:w-auto"
            >
              {gate.checking ? "Checking location…" : "Book now"}
            </button>
          </div>
        </div>
      </div>
      {gate.gateModal}
    </div>
  );
}