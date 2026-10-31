
// "use client";

// import { use, useState } from "react";
// import Link from "next/link";
// import { ArrowLeft } from "lucide-react";
// import { useRouter } from "next/navigation";
// import BookingShell from "@/app/components/booking/BookingShell";
// import { PageSkeleton } from "@/app/components/booking/BookingSkeleton";
// import ClampedText from "@/app/components/booking/ClampedText";
// import { toast } from "sonner";
// import { useRequireAuth } from "@/app/hooks/useBookingAuth";
// import { addToCart } from "@/app/lib/cart";
// import { useServiceabilityGate } from "@/app/hooks/useServiceabilityGate";
// import {
//   CHECKOUT_PATH,
//   GST_PERCENT,
//   bookingPath,
//   itemSubtitle,
//   rupee,
// } from "@/app/lib/booking";
// import { useGetServiceBySlugQuery } from "@/redux/api/catalogApi";

// /**
//  * Service option page: "select option" card with radio options
//  * (name + price incl. GST), then an "Other" section for add-ons.
//  */
// export default function BookServicePage({
//   params,
// }: {
//   params: Promise<{ category: string; service: string }>;
// }) {
//   const { category, service: slug } = use(params);
//   const router = useRouter();
//   const { allowed } = useRequireAuth();

//   const { data, isLoading, isError } = useGetServiceBySlugQuery(
//     { slug },
//     { skip: !allowed },
//   );
//   const service = isError ? undefined : data?.data;

//   const [optionKey, setOptionKey] = useState<string | null>(null);
//   const [addOnKeys, setAddOnKeys] = useState<string[]>([]);

//   const items = service?.items ?? [];
//   const addOns = service?.addOns ?? [];
//   const keyOf = (x: { id?: string; name: string }) => x.id ?? x.name;

//   const option = items.find((i) => keyOf(i) === optionKey);
//   const chosenAddOns = addOns.filter((a) => addOnKeys.includes(keyOf(a)));
//   const total =
//     (option?.price ?? 0) + chosenAddOns.reduce((s, a) => s + a.price, 0);

//   const toggleAddOn = (k: string) =>
//     setAddOnKeys((prev) =>
//       prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k],
//     );

//   const gate = useServiceabilityGate();

//   function handleContinue() {
//     if (!option || !service) return;
//     void gate.run(() => {
//       saveToCart();
//       router.push(CHECKOUT_PATH);
//     });
//   }

//   function handleAddToCart() {
//     if (!option || !service) return;
//     saveToCart();
//     toast.success("Added to cart");
//   }

//   /** One booking per service: choosing again replaces the previous option. */
//   function saveToCart() {
//     if (!option || !service) return;
//     addToCart({
//       mode: "replace",
//       category,
//       categoryName: service.category?.name,
//       service: service.slug,
//       serviceId: service.id,
//       serviceName: service.name,
//       serviceMode: service.serviceMode ?? "AT_HOME",
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
//   }

//   return (
//     <BookingShell>
//       <Link
//         href={bookingPath(category)}
//         className="mb-8 inline-flex items-center gap-1.5 text-[14px] font-medium text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
//       >
//         <ArrowLeft size={16} />
//         Back
//       </Link>

//       {!allowed || isLoading ? (
//         <PageSkeleton variant="options" />
//       ) : !service ? (
//         <div className="py-16 text-center">
//           <h2
//             className="text-[28px]"
//             style={{ fontFamily: "var(--font-fraunces)" }}
//           >
//             Service not found
//           </h2>
//           <p className="mt-3 text-[var(--ink-soft)]">
//             We couldn&apos;t find this service. Please go back and pick another.
//           </p>
//         </div>
//       ) : (
//         <div className="mx-auto max-w-[760px]">
//           <h2
//             className="text-[32px] leading-tight md:text-[40px]"
//             style={{ fontFamily: "var(--font-fraunces)" }}
//           >
//             {service.name}
//           </h2>
//           {(service.longDescription || service.shortDescription ) && (
//             <ClampedText
//               text={
//                 (service.longDescription || service.shortDescription) as string
//               }
//               threshold={160}
//               className="mt-3 text-[15px] leading-[1.7] text-[var(--ink-soft)]"
//             />
//           )}
//           <p className="mt-2 text-[16px] text-[var(--ink-soft)]">
//             Select option
//           </p>

//           {/* Options (single choice) */}
//           <fieldset className="mt-7">
//             <legend className="sr-only">Select option</legend>
//             {items.length === 0 ? (
//               <p className="rounded-2xl border border-[var(--line)] bg-[var(--card)] px-5 py-10 text-center text-[var(--ink-soft)]">
//                 No options are available for this service right now.
//               </p>
//             ) : (
//               <ul className="space-y-3">
//                 {items.map((it) => {
//                   const k = keyOf(it);
//                   const selected = optionKey === k;
//                   const sub = itemSubtitle(it);
//                   return (
//                     <li key={k}>
//                       <label
//                         className={`flex cursor-pointer items-start justify-between gap-4 rounded-2xl border p-4 transition-colors sm:p-5 ${
//                           selected
//                             ? "border-[var(--gold)] bg-[var(--gold)]/5"
//                             : "border-[var(--line)] bg-[var(--card)] hover:border-[var(--gold)]/50"
//                         }`}
//                       >
//                         <input
//                           type="radio"
//                           name="service-option"
//                           checked={selected}
//                           onChange={() => setOptionKey(k)}
//                           className="peer sr-only"
//                         />
//                         <span className="min-w-0 flex-1">
//                           <span className="line-clamp-2 text-[16px] font-semibold text-[var(--ink)]">
//                             {it.name}
//                           </span>
//                           {sub && (
//                             <ClampedText
//                               text={sub}
//                               className="mt-1.5 text-[13px] leading-[1.6] text-[var(--ink-soft)]"
//                             />
//                           )}
//                         </span>
//                         <span className="flex shrink-0 items-start gap-3 sm:gap-4">
//                           <span className="text-right">
//                             <span className="block text-[17px] font-semibold text-[var(--ink)]">
//                               {rupee(it.price)}
//                             </span>
//                             <span className="block text-[12px] text-[var(--ink-soft)]">
//                               incl. GST
//                             </span>
//                           </span>
//                           <span
//                             aria-hidden
//                             className={`mt-0.5 flex h-6 w-6 items-center justify-center rounded-full border-2 peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--gold)] ${
//                               selected
//                                 ? "border-[var(--gold)]"
//                                 : "border-[var(--line)]"
//                             }`}
//                           >
//                             {selected && (
//                               <span className="h-3 w-3 rounded-full bg-[var(--gold)]" />
//                             )}
//                           </span>
//                         </span>
//                       </label>
//                     </li>
//                   );
//                 })}
//               </ul>
//             )}
//           </fieldset>

//           {/* Other (add-ons, multi choice) */}
//           {addOns.length > 0 && (
//             <section className="mt-9">
//               <h3
//                 className="mb-4 text-[22px] md:text-[26px]"
//                 style={{ fontFamily: "var(--font-fraunces)" }}
//               >
//                 Other
//               </h3>
//               <ul className="space-y-3">
//                 {addOns.map((a) => {
//                   const k = keyOf(a);
//                   const on = addOnKeys.includes(k);
//                   return (
//                     <li key={k}>
//                       <label
//                         className={`flex cursor-pointer items-center justify-between gap-4 rounded-2xl border p-4 transition-colors sm:p-5 ${
//                           on
//                             ? "border-[var(--gold)] bg-[var(--gold)]/5"
//                             : "border-[var(--line)] bg-[var(--card)] hover:border-[var(--gold)]/50"
//                         }`}
//                       >
//                         <input
//                           type="checkbox"
//                           checked={on}
//                           onChange={() => toggleAddOn(k)}
//                           className="peer sr-only"
//                         />
//                         <span className="line-clamp-2 min-w-0 text-[16px] font-medium text-[var(--ink)]">
//                           {a.name}
//                         </span>
//                         <span className="flex shrink-0 items-center gap-4">
//                           <span className="text-[16px] font-semibold text-[var(--ink)]">
//                             {rupee(a.price)}
//                           </span>
//                           <span
//                             aria-hidden
//                             className={`flex h-6 w-6 items-center justify-center rounded-md border-2 text-[14px] leading-none peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--gold)] ${
//                               on
//                                 ? "border-[var(--gold)] bg-[var(--gold)] text-[#fff]"
//                                 : "border-[var(--line)]"
//                             }`}
//                           >
//                             {on ? "✓" : ""}
//                           </span>
//                         </span>
//                       </label>
//                     </li>
//                   );
//                 })}
//               </ul>
//             </section>
//           )}

//           {/* Continue bar */}
//           <div className="sticky bottom-[var(--cart-bar-offset,0px)] z-10 mt-8 transition-[bottom] duration-200 rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4 shadow-lg md:p-5">
//             <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//               <div className="min-w-0">
//                 <p className="text-[15px] font-semibold text-[var(--ink)]">
//                   {option ? rupee(total) : "No option selected"}
//                   {option && (
//                     <span className="ml-2 text-[13px] font-normal text-[var(--ink-soft)]">
//                       incl. {GST_PERCENT}% GST
//                     </span>
//                   )}
//                 </p>
//                 <p className="mt-0.5 truncate text-[13px] text-[var(--ink-soft)]">
//                   {option ? option.name : "Select an option to continue."}
//                 </p>
//               </div>
//               <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto sm:flex-row">
//                 <button
//                   type="button"
//                   onClick={handleAddToCart}
//                   disabled={!option}
//                   className="w-full whitespace-nowrap rounded-full border border-[var(--gold)] px-6 py-3 text-[15px] font-semibold text-[var(--gold-bright)] transition-colors hover:bg-[var(--gold)]/10 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
//                 >
//                   Add to cart
//                 </button>
//                 <button
//                   type="button"
//                   onClick={handleContinue}
//                   disabled={!option || gate.checking}
//                   className="w-full whitespace-nowrap rounded-full bg-[var(--gold)] px-8 py-3 text-[15px] font-semibold text-[#fff] transition-colors hover:bg-[var(--gold-bright)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[var(--gold)] sm:w-auto"
//                 >
//                   {gate.checking ? "Checking location…" : "Continue to booking"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//       {gate.gateModal}
//     </BookingShell>
//   );
// }

"use client";
 
import { use, useState } from "react";
import { ArrowLeft } from "lucide-react";
import BackLink from "@/app/components/ui/BackLink";
import { useRouter } from "next/navigation";
import BookingShell from "@/app/components/booking/BookingShell";
import { PageSkeleton } from "@/app/components/booking/BookingSkeleton";
import ClampedText from "@/app/components/booking/ClampedText";
import { toast } from "sonner";
import { useRequireAuth } from "@/app/hooks/useBookingAuth";
import { addToCart } from "@/app/lib/cart";
import { useServiceabilityGate } from "@/app/hooks/useServiceabilityGate";
import {
  CHECKOUT_PATH,
  GST_PERCENT,
  bookingPath,
  itemSubtitle,
  rupee,
} from "@/app/lib/booking";
import { useGetServiceBySlugQuery } from "@/redux/api/catalogApi";
 
/**
 * Service option page: "select option" card with radio options
 * (name + price incl. GST), then an "Other" section for add-ons.
 */
export default function BookServicePage({
  params,
}: {
  params: Promise<{ category: string; service: string }>;
}) {
  const { category, service: slug } = use(params);
  const router = useRouter();
  const { allowed } = useRequireAuth();
 
  const { data, isLoading, isError } = useGetServiceBySlugQuery(
    { slug },
    { skip: !allowed },
  );
  const service = isError ? undefined : data?.data;
 
  const [optionKey, setOptionKey] = useState<string | null>(null);
  const [addOnKeys, setAddOnKeys] = useState<string[]>([]);
 
  const items = service?.items ?? [];
  const addOns = service?.addOns ?? [];
  const keyOf = (x: { id?: string; name: string }) => x.id ?? x.name;
 
  const option = items.find((i) => keyOf(i) === optionKey);
  const chosenAddOns = addOns.filter((a) => addOnKeys.includes(keyOf(a)));
  const total =
    (option?.price ?? 0) + chosenAddOns.reduce((s, a) => s + a.price, 0);
 
  const toggleAddOn = (k: string) =>
    setAddOnKeys((prev) =>
      prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k],
    );
 
  const gate = useServiceabilityGate();
 
  function handleContinue() {
    if (!option || !service) return;
    void gate.run(() => {
      saveToCart();
      router.push(CHECKOUT_PATH);
    });
  }
 
  function handleAddToCart() {
    if (!option || !service) return;
    saveToCart();
    toast.success("Added to cart");
  }
 
  /** One booking per service: choosing again replaces the previous option. */
  function saveToCart() {
    if (!option || !service) return;
    addToCart({
      mode: "replace",
      category,
      categoryName: service.category?.name,
      service: service.slug,
      serviceId: service.id,
      serviceName: service.name,
      serviceMode: service.serviceMode ?? "AT_HOME",
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
  }
 
  return (
    <BookingShell>
      <BackLink
        fallback={bookingPath(category)}
        className="mb-8 inline-flex items-center gap-1.5 text-[14px] font-medium text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
      >
        <ArrowLeft size={16} />
        Back
      </BackLink>
 
      {!allowed || isLoading ? (
        <PageSkeleton variant="options" />
      ) : !service ? (
        <div className="py-16 text-center">
          <h2
            className="text-[28px]"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            Service not found
          </h2>
          <p className="mt-3 text-[var(--ink-soft)]">
            We couldn&apos;t find this service. Please go back and pick another.
          </p>
        </div>
      ) : (
        <div className="mx-auto max-w-[760px]">
          <h2
            className="text-[32px] leading-tight md:text-[40px]"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            {service.name}
          </h2>
          {(service.longDescription || service.shortDescription ) && (
            <ClampedText
              text={
                (service.longDescription || service.shortDescription) as string
              }
              threshold={160}
              className="mt-3 text-[15px] leading-[1.7] text-[var(--ink-soft)]"
            />
          )}
          <p className="mt-2 text-[16px] text-[var(--ink-soft)]">
            Select option
          </p>
 
          {/* Options (single choice) */}
          <fieldset className="mt-7">
            <legend className="sr-only">Select option</legend>
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
                          name="service-option"
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
 
          {/* Other (add-ons, multi choice) */}
          {addOns.length > 0 && (
            <section className="mt-9">
              <h3
                className="mb-4 text-[22px] md:text-[26px]"
                style={{ fontFamily: "var(--font-fraunces)" }}
              >
                Other
              </h3>
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
 
          {/* Continue bar */}
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
                  onClick={handleContinue}
                  disabled={!option || gate.checking}
                  className="w-full whitespace-nowrap rounded-full bg-[var(--gold)] px-8 py-3 text-[15px] font-semibold text-[#fff] transition-colors hover:bg-[var(--gold-bright)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[var(--gold)] sm:w-auto"
                >
                  {gate.checking ? "Checking location…" : "Continue to booking"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {gate.gateModal}
    </BookingShell>
  );
}