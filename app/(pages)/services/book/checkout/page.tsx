

// "use client";

// import { useEffect, useMemo, useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import BackLink from "@/app/components/ui/BackLink";
// import { ArrowLeft, Loader2, MapPin, Minus, Plus, Tag, Trash2, X, Zap } from "lucide-react";
// import { toast } from "sonner";

// import BookingShell from "@/app/components/booking/BookingShell";
// import { PageSkeleton } from "@/app/components/booking/BookingSkeleton";
// import { useRequireAuth } from "@/app/hooks/useBookingAuth";
// import { usePlaceOrder } from "@/app/hooks/usePlaceOrder";
// import {
//   MIN_ORDER_TOTAL,
//   SLOTS,
//   gstOn,
//   isSlotAvailable,
//   nextBookingDays,
//   rupee,
//   toYMD,
//   walletBalanceOf,
//   type SlotCode,
// } from "@/app/lib/booking";
// import { useTaxRate } from "@/app/hooks/useTaxRate";
// import {
//   clearCart,
//   groupTotal,
//   removeGroup,
//   setLineQty,
//   useCart,
//   type CartGroup,
// } from "@/app/lib/cart";
// import { useAppSelector } from "@/redux/hooks";
// import { useGetAddressesQuery } from "@/redux/api/profileApi";
// import {
//   readServiceability,
//   useCheckServiceabilityQuery,
//   useGetCatalogSettingQuery,
// } from "@/redux/api/catalogApi";
// import {
//   useGetAvailableCouponsQuery,
//   useGetBranchCodSettingsQuery,
//   useGetDeliverySettingsQuery,
//   useGetWalletQuery,
//   useValidateCouponMutation,
//   type BookingBody,
//   type PaymentMethod,
// } from "@/redux/api/orderApi";

// const card =
//   "rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4 sm:p-5";
// const chip = (on: boolean, disabled = false) =>
//   `rounded-xl border px-4 py-2.5 text-left text-[14px] transition-colors ${
//     disabled
//       ? "cursor-not-allowed opacity-40 border-[var(--line)]"
//       : on
//         ? "border-[var(--gold)] bg-[var(--gold)]/5 text-[var(--ink)]"
//         : "border-[var(--line)] hover:border-[var(--gold)]/50 text-[var(--ink)]"
//   }`;

// type Express = { enabled: boolean; fee: number; label: string; eta: string };
// const DEFAULT_EXPRESS: Express = {
//   enabled: true,
//   fee: 70,
//   label: "Express arrival",
//   eta: "Within ~2 hours",
// };

// export default function CheckoutPage() {
//   const router = useRouter();
//   const { allowed } = useRequireAuth();
//   const user = useAppSelector((s) => s.auth.user);

//   // The cart is saved in localStorage (survives closing the site); it holds
//   // every service the user added: dry cleaning + house help + car wash …
//   const { groups } = useCart();
//   const [ready, setReady] = useState(false);
//   useEffect(() => setReady(true), []);
//   const draft = ready ? (groups.length ? { groups } : null) : undefined;

//   const [addressId, setAddressId] = useState<string | null>(null);
//   const [bookingType, setBookingType] = useState<"ASAP" | "SCHEDULED">("ASAP");
//   const days = useMemo(() => nextBookingDays(), []);
//   const [date, setDate] = useState<Date | null>(null);
//   const [slot, setSlot] = useState<SlotCode | null>(null);
//   const [notes, setNotes] = useState("");
//   const [couponInput, setCouponInput] = useState("");
//   const [coupon, setCoupon] = useState<{ code: string; discount: number } | null>(
//     null,
//   );
//   const [showOffers, setShowOffers] = useState(false);
//   const [payMethod, setPayMethod] = useState<PaymentMethod>("RAZORPAY");

//   /* ----- data ----- */
//   const { data: addrRes, isLoading: addrLoading } = useGetAddressesQuery(
//     undefined,
//     { skip: !allowed },
//   );
//   const addresses = useMemo(
//     () => (Array.isArray(addrRes?.data) ? addrRes.data : []),
//     [addrRes],
//   );
//   const address =
//     addresses.find((a) => a.id === addressId) ??
//     addresses.find((a) => a.isDefault) ??
//     addresses[0];

//   const hasCoords =
//     typeof address?.latitude === "number" &&
//     typeof address?.longitude === "number";
//   const { data: svcRes, isFetching: checkingArea } =
//     useCheckServiceabilityQuery(
//       { latitude: address?.latitude ?? 0, longitude: address?.longitude ?? 0 },
//       { skip: !hasCoords },
//     );
//   const area = readServiceability(svcRes);
//   const notServiceable = hasCoords && !checkingArea && !!svcRes && !area.serviceable;

//   const { data: expressRes } = useGetCatalogSettingQuery("express_delivery");
//   const express = useMemo<Express>(() => {
//     const v = expressRes?.data?.value as
//       | { enabled?: boolean; fee?: number; label?: string; deliveryTimeEstimate?: string }
//       | undefined;
//     if (!v || typeof v !== "object") return DEFAULT_EXPRESS;
//     return {
//       enabled: v.enabled !== false,
//       fee: typeof v.fee === "number" ? Math.max(0, v.fee) : DEFAULT_EXPRESS.fee,
//       label: v.label || DEFAULT_EXPRESS.label,
//       eta: v.deliveryTimeEstimate || DEFAULT_EXPRESS.eta,
//     };
//   }, [expressRes]);

//   const [validateCoupon, { isLoading: validating }] = useValidateCouponMutation();
//   const { data: offersRes, isFetching: offersLoading } =
//     useGetAvailableCouponsQuery(undefined, { skip: !allowed || !showOffers });

//   /* ----- money ----- */
//   const allLines = groups.flatMap((g) => g.lines);
//   const subtotal = allLines
//     .filter((l) => l.kind !== "addOn")
//     .reduce((s, l) => s + l.price * l.qty, 0);
//   const addOnTotal = allLines
//     .filter((l) => l.kind === "addOn")
//     .reduce((s, l) => s + l.price * l.qty, 0);
//   const cartTotal = subtotal + addOnTotal;
//   // each service is its own booking → the express fee applies per booking
//   const expressFee =
//     bookingType === "ASAP" && express.enabled ? express.fee * groups.length : 0;
//   // GST is charged on top, after the coupon (same as the mobile app)
//   const taxable = Math.max(0, cartTotal - (coupon?.discount ?? 0));
//   const { rate: gstRate, loaded: gstLoaded, error: gstError, retry: retryGst } = useTaxRate(!allowed);
//   const gstAmount = gstOn(taxable, gstRate);

//   // delivery charge (per city) - added once, like the app
//   const city = address?.city?.trim() ?? "";
//   const {
//     data: deliveryRes,
//     isFetching: deliveryLoading,
//     isError: deliveryFailed,
//     refetch: refetchDelivery,
//   } = useGetDeliverySettingsQuery(city, { skip: !allowed || !city });
//   const delivery = deliveryRes?.data;
//   // same validation as the app: city must be active with a valid charge (₹0 is valid)
//   const deliveryCharge = Number(delivery?.deliveryCharge);
//   const deliveryReady =
//     !!delivery &&
//     delivery.isActive === true &&
//     Number.isFinite(deliveryCharge) &&
//     deliveryCharge >= 0;
//   const deliveryError = !address
//     ? null
//     : !city
//       ? "This address is missing a city. Please update it in your profile."
//       : deliveryLoading
//         ? null
//         : deliveryReady
//           ? null
//           : delivery && delivery.isActive !== true
//             ? `Delivery is not available in ${delivery.cityName || city} yet.`
//             : deliveryFailed || !delivery
//               ? "Could not load delivery settings. Please try again."
//               : "Delivery settings are incomplete. Please try again later.";
//   const deliveryFee = deliveryReady ? deliveryCharge : 0;

//   // COD availability + charge (per branch). COD charge applies to a single booking.
//   // same order as the app: branch saved on the cart item, else the nearest branch
//   // to the checkout address (GET /branches/serviceability → nearbyBranches[0])
//   const branchId = groups[0]?.branchId || area.branchId || undefined;
//   const { data: codRes, isFetching: codLoading, isError: codFailed } = useGetBranchCodSettingsQuery(
//     branchId ?? "",
//     { skip: !allowed || !branchId },
//   );
//   const cod = codRes?.data;
//   // same rule as the app: the branch COD setting must be active AND enabled
//   const codAllowed =
//     cod?.isActive === true &&
//     cod?.codEnabled === true &&
//     (!cod.branchId || cod.branchId === branchId);
//   // why COD is unavailable - shown under the option so it can be compared with the app
//   const codReason = codLoading
//     ? "Checking availability…"
//     : !address
//       ? "Select an address first"
//       : !hasCoords
//         ? "This address has no map location"
//         : checkingArea
//           ? "Checking your area…"
//           : !branchId
//             ? "No service branch found for this address"
//             : codFailed || !cod
//               ? "Couldn't load COD settings for this branch"
//               : cod.isActive !== true
//                 ? "COD isn't configured for this branch"
//                 : cod.codEnabled !== true
//                   ? "COD is switched off for this branch"
//                   : "";
//   // temporary: open the browser console to compare with the app for the same address
//   useEffect(() => {
//     if (process.env.NODE_ENV === "production" && !/[?&]debug=1/.test(window.location.search)) return;
//     console.info("[checkout-debug] COD", {
//       city, lat: address?.latitude, lng: address?.longitude,
//       branchId, cartBranch: groups[0]?.branchId, nearestBranch: area.branchId, serviceable: area.serviceable, cod, delivery,
//     });
//   }, [city, address?.latitude, address?.longitude, branchId, groups, area.branchId, area.serviceable, cod, delivery]);
//   const codCharge =
//     payMethod === "COD" && codAllowed
//       ? Math.max(0, Number(cod?.codCharge) || 0)
//       : 0;

//   // wallet
//   const { data: walletRes, isLoading: walletLoading, isError: walletError } =
//     useGetWalletQuery(undefined, { skip: !allowed });
//   const walletBalance = walletBalanceOf(walletRes?.data);

//   const total = taxable + gstAmount + expressFee + deliveryFee + codCharge;
//   const walletOk =
//     groups.length === 1 && walletBalance !== null && walletBalance >= Math.round(total);

//   // COD got switched off for this branch → fall back to online payment
//   useEffect(() => {
//     if (payMethod === "COD" && !codLoading && !codAllowed) setPayMethod("RAZORPAY");
//   }, [payMethod, codLoading, codAllowed]);

//   async function applyCoupon(code: string) {
//     const c = code.trim();
//     if (!c) return toast.error("Enter a coupon code.");
//     try {
//       const res = await validateCoupon({ code: c, cartTotal }).unwrap();
//       const d = Number(res.data?.discountAmount) || 0;
//       setCoupon({ code: c.toUpperCase(), discount: d });
//       setCouponInput("");
//       setShowOffers(false);
//       toast.success(`You saved ${rupee(Math.round(d))} with ${c.toUpperCase()}.`);
//     } catch {
//       /* base query already toasted the reason */
//     }
//   }

//   /* ----- place order ----- */
//   const { placeOrder, placeBulkOrder, placeOffline, recover, status, busy } = usePlaceOrder({
//     onConfirmed: (orderId, orderNumber) => {
//       const multi = groups.length > 1;
//       clearCart();
//       const q = new URLSearchParams({ orderId });
//       if (orderNumber) q.set("orderNumber", orderNumber);
//       if (multi) q.set("multi", "1");
//       router.replace(`/order-success?${q}`);
//     },
//   });
//   // Paid earlier but never confirmed (refresh / closed tab)? Finish it now.
//   useEffect(() => {
//     if (allowed) void recover();
//   }, [allowed, recover]);

//   const problem = !draft
//     ? "Your cart is empty."
//     : cartTotal < MIN_ORDER_TOTAL
//       ? `Minimum order is ${rupee(MIN_ORDER_TOTAL)}.`
//       : !address
//         ? "Select a service address."
//         : !hasCoords
//           ? "This address has no map location. Edit it in your profile."
//           : deliveryLoading
//             ? "Checking delivery availability…"
//             : deliveryError
//               ? deliveryError
//           : notServiceable
//             ? "We don't serve this area yet."
//             : bookingType === "SCHEDULED" && !date
//               ? "Select a service date."
//               : bookingType === "SCHEDULED" && !slot
//                 ? "Select a time slot."
//                 : payMethod === "COD" && !codAllowed
//                   ? "Cash on delivery isn't available for this area."
//                   : payMethod === "WALLET" && groups.length > 1
//                     ? "Wallet payment isn't available for multi-service bookings."
//                     : payMethod === "WALLET" && !walletOk
//                       ? "Your wallet balance is too low for this order."
//                       : null;

//   // Edit the cart right here. A changed cart invalidates an applied coupon.
//   const editQty = (g: CartGroup, l: CartGroup["lines"][number], qty: number) => {
//     setCoupon(null);
//     setLineQty(g.key, l, qty);
//   };
//   const dropGroup = (key: string) => {
//     setCoupon(null);
//     removeGroup(key);
//   };

//   /** One booking per cart group (service). */
//   function bookingFor(g: CartGroup, index: number, addressId: string): BookingBody {
//     const items = g.lines.filter((l) => l.kind !== "addOn");
//     const addOns = g.lines
//       .filter((l) => l.kind === "addOn")
//       .map((l) => ({ addOnId: l.id, quantity: l.qty }));
//     // mixed laundry (items of several services) → serviceId null, like the app
//     const svcIds = new Set(items.map((l) => l.serviceId).filter(Boolean));
//     const serviceId =
//       g.serviceId ?? (svcIds.size === 1 ? [...svcIds][0]! : null);
//     return {
//       serviceId,
//       items: items.map((l) => ({ itemId: l.id, quantity: l.qty })),
//       addOns: addOns.length ? addOns : undefined,
//       bookingType,
//       scheduledDate: bookingType === "SCHEDULED" && date ? toYMD(date) : undefined,
//       scheduledSlotCode: bookingType === "SCHEDULED" ? (slot ?? undefined) : undefined,
//       addressId,
//       // Same rule as the app: a normal single-service booking sends branchId null
//       // (the server resolves the branch from addressId + service). Only mixed
//       // laundry carts (serviceId null) and multi-service COD send the cart branch.
//       branchId:
//         serviceId !== null && groups.length === 1
//           ? null
//           : g.branchId || area.branchId || null,
//       specialInstructions: notes.trim() || undefined,
//       // the coupon is validated against the whole cart → send it once
//       couponCode: index === 0 ? coupon?.code : undefined,
//       contactOverride: {
//         fullName: user?.name || undefined,
//         email: user?.email || undefined,
//         phoneNumber: user?.phone || undefined,
//       },
//     };
//   }

//   async function pay() {
//     if (problem || !draft || !address?.id) return toast.error(problem ?? "Check your booking.");
//     // re-check delivery for this city right before paying, like the app
//     try {
//       const fresh = (await refetchDelivery().unwrap()).data;
//       const c = Number(fresh?.deliveryCharge);
//       if (!fresh || fresh.isActive !== true || !Number.isFinite(c) || c < 0) {
//         return toast.error(`Delivery is not available in ${fresh?.cityName || city || "this city"} yet. Please select another address.`);
//       }
//       if (c !== deliveryFee) return toast("The delivery charge was updated. Please review the total.");
//     } catch {
//       return toast.error("Could not verify delivery for this city. Please try again.");
//     }
//     const bookings = groups.map((g, i) => bookingFor(g, i, address.id as string));
//     const prefill = { name: user?.name, email: user?.email, contact: user?.phone };
//     if (typeof window !== "undefined" && /[?&]debug=1/.test(window.location.search)) {
//       console.info("[checkout-debug] order request", payMethod, JSON.stringify(bookings, null, 2));
//     }
//     // COD / wallet → no payment popup, the order is placed straight away
//     if (payMethod === "COD" || payMethod === "WALLET") {
//       void placeOffline(bookings, payMethod);
//       return;
//     }
//     // one service → normal order; several services → ONE payment for all bookings
//     void (bookings.length === 1
//       ? placeOrder(bookings[0], prefill)
//       : placeBulkOrder(bookings, prefill));
//   }

//   /* ----- render ----- */
//   const back = draft ? "/cart" : "/services";
//   const slotsOf = (d: Date) => SLOTS.map((s) => ({ ...s, ok: isSlotAvailable(d, s.code) }));

//   return (
//     <BookingShell>
//       <BackLink
//         fallback={back}
//         className="mb-8 inline-flex items-center gap-1.5 text-[14px] font-medium text-[var(--ink-soft)] hover:text-[var(--ink)]"
//       >
//         <ArrowLeft size={16} /> Back
//       </BackLink>

//       {!allowed || draft === undefined ? (
//         <PageSkeleton variant="options" />
//       ) : !draft ? (
//         <div className="py-16 text-center">
//           <h2 className="text-[28px]" style={{ fontFamily: "var(--font-fraunces)" }}>
//             Your cart is empty
//           </h2>
//           <Link href="/services" className="mt-4 inline-block text-[var(--gold)] underline">
//             Browse services
//           </Link>
//         </div>
//       ) : (
//         <div className="mx-auto max-w-[760px] space-y-5">
//           {/* <h2 className="text-[32px] md:text-[40px]" style={{ fontFamily: "var(--font-fraunces)" }}>
//             Checkout
//           </h2> */}

//           {status === "unconfirmed" && (
//             <div className="rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4 text-[14px]">
//               Your payment went through, but we couldn&apos;t confirm your order
//               yet. <b>Don&apos;t pay again.</b>{" "}
//               <button onClick={() => void recover()} className="font-semibold underline">
//                 Retry now
//               </button>
//             </div>
//           )}

//           {/* Cart */}
//           <section className={card}>
//             <div className="mb-3 flex items-center justify-between">
//               <h3 className="text-[17px] font-semibold">Your selection</h3>
//               <Link href="/services" className="text-[13px] text-[var(--gold)] underline">
//                 + Add more services
//               </Link>
//             </div>
//             <div className="space-y-4">
//               {groups.map((g) => (
//                 <div key={g.key}>
//                   <div className="mb-3 flex items-start justify-between gap-3 border-b border-[var(--line)] pb-3">
//                     <div className="min-w-0">
//                       <h4 className="text-[17px] font-semibold text-[var(--ink)]">{g.serviceName}</h4>
//                       {g.categoryName && (
//                         <p className="text-[13px] text-[var(--ink-soft)]">{g.categoryName}</p>
//                       )}
//                     </div>
//                     <button
//                       type="button"
//                       onClick={() => dropGroup(g.key)}
//                       aria-label={`Remove ${g.serviceName}`}
//                       className="flex shrink-0 items-center gap-1 text-[13px] text-[var(--ink-soft)] hover:text-red-500"
//                     >
//                       <Trash2 size={15} /> Remove
//                     </button>
//                   </div>
//                   <ul className="space-y-3 text-[14px]">
//                     {g.lines.map((l) => (
//                       <li key={`${l.kind}-${l.id}`} className="flex items-center justify-between gap-3">
//                         <span className="min-w-0">
//                           {l.name}
//                           {l.kind === "addOn" && (
//                             <span className="ml-2 rounded-full bg-[var(--gold)]/10 px-2 py-0.5 text-[11px] font-semibold text-[var(--gold-bright)]">
//                               Add-on
//                             </span>
//                           )}
//                           {l.serviceName && l.serviceName !== g.serviceName && (
//                             <span className="block text-[12px] text-[var(--ink-soft)]">{l.serviceName}</span>
//                           )}
//                           <span className="block text-[13px] text-[var(--ink-soft)]">
//                             {rupee(l.price)}
//                             {l.qty > 1 && ` × ${l.qty}`}
//                           </span>
//                         </span>
//                         <span className="flex shrink-0 items-center gap-3">
//                           {l.kind === "addOn" ? (
//                             <button
//                               type="button"
//                               onClick={() => editQty(g, l, 0)}
//                               aria-label={`Remove ${l.name}`}
//                               className="text-[var(--ink-soft)] hover:text-red-500"
//                             >
//                               <X size={16} />
//                             </button>
//                           ) : (
//                             <span className="flex items-center rounded-full border border-[var(--gold)] bg-[var(--gold)] text-white">
//                               <button
//                                 type="button"
//                                 onClick={() => editQty(g, l, l.qty - 1)}
//                                 aria-label={`Remove one ${l.name}`}
//                                 className="flex h-7 w-7 items-center justify-center"
//                               >
//                                 <Minus size={14} />
//                               </button>
//                               <span className="min-w-[1.3rem] text-center text-[13px] font-semibold">{l.qty}</span>
//                               <button
//                                 type="button"
//                                 onClick={() => editQty(g, l, l.qty + 1)}
//                                 aria-label={`Add one more ${l.name}`}
//                                 className="flex h-7 w-7 items-center justify-center"
//                               >
//                                 <Plus size={14} />
//                               </button>
//                             </span>
//                           )}
//                           <span className="w-[68px] text-right font-medium">{rupee(l.price * l.qty)}</span>
//                         </span>
//                       </li>
//                     ))}
//                   </ul>
//                   <p className="mt-3 flex justify-between border-t border-[var(--line)] pt-3 text-[14px]">
//                     <span className="text-[var(--ink-soft)]">Subtotal</span>
//                     <span className="font-semibold">{rupee(groupTotal(g))}</span>
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* Address */}
//           <section className={card}>
//             <h3 className="mb-3 flex items-center gap-2 text-[17px] font-semibold">
//               <MapPin size={18} /> Service address
//             </h3>
//             {addrLoading ? (
//               <p className="text-[14px] text-[var(--ink-soft)]">Loading addresses…</p>
//             ) : addresses.length === 0 ? (
//               <p className="text-[14px] text-[var(--ink-soft)]">
//                 No saved address.{" "}
//                 <Link href="/profile" className="text-[var(--gold)] underline">
//                   Add one in your profile
//                 </Link>
//                 , then come back.
//               </p>
//             ) : (
//               <div className="grid gap-2">
//                 {addresses.map((a) => (
//                   <label key={a.id} className={`${chip(a.id === address?.id)} cursor-pointer`}>
//                     <input
//                       type="radio"
//                       name="address"
//                       className="sr-only"
//                       checked={a.id === address?.id}
//                       onChange={() => setAddressId(a.id ?? null)}
//                     />
//                     <b>{a.label}</b>
//                     <span className="block text-[13px] text-[var(--ink-soft)]">
//                       {[a.line1, a.line2, a.city, a.postalCode].filter(Boolean).join(", ")}
//                     </span>
//                   </label>
//                 ))}
//                 <Link href="/profile" className="text-[13px] text-[var(--gold)] underline">
//                   Manage addresses
//                 </Link>
//               </div>
//             )}
//             {notServiceable && (
//               <p className="mt-3 text-[14px] text-red-400">
//                 We don&apos;t serve this area yet. Pick another address.
//               </p>
//             )}
//             {address && !notServiceable && (
//               <p className="mt-3 text-[13px] text-[var(--ink-soft)]">
//                 {deliveryLoading ? (
//                   <>Checking delivery availability for {city}…</>
//                 ) : deliveryError ? (
//                   <span className="text-red-400">
//                     {deliveryError}{" "}
//                     {city && (
//                       <button type="button" onClick={() => void refetchDelivery()} className="font-semibold text-[var(--gold)] underline">
//                         Retry delivery check
//                       </button>
//                     )}
//                   </span>
//                 ) : deliveryReady ? (
//                   <>Delivery charge: {rupee(deliveryFee)}</>
//                 ) : null}
//               </p>
//             )}
//           </section>

//           {/* When */}
//           <section className={card}>
//             <h3 className="mb-3 text-[17px] font-semibold">When</h3>
//             <div className="grid gap-2 sm:grid-cols-2">
//               <button type="button" className={chip(bookingType === "ASAP")} onClick={() => setBookingType("ASAP")}>
//                 <b>Instant / ASAP</b>
//                 <span className="block text-[13px] text-[var(--ink-soft)]">
//                   {express.eta}
//                   {express.enabled && express.fee > 0 && ` · +${rupee(express.fee)}`}
//                 </span>
//               </button>
//               <button type="button" className={chip(bookingType === "SCHEDULED")} onClick={() => setBookingType("SCHEDULED")}>
//                 <b>Schedule</b>
//                 <span className="block text-[13px] text-[var(--ink-soft)]">Pick a day and time slot</span>
//               </button>
//             </div>

//             {bookingType === "ASAP" && (
//               <div className="mt-4 flex items-start gap-3 rounded-xl border border-[var(--gold)]/40 bg-[var(--gold)]/5 p-4">
//                 <Zap size={22} className="mt-0.5 shrink-0 text-[var(--gold)]" />
//                 <div className="text-[14px] leading-[1.6]">
//                   <p className="font-semibold text-[var(--ink)]">
//                     {express.label} ({express.eta.toLowerCase()})
//                     {express.enabled && express.fee > 0 && ` + ${rupee(express.fee)}`}
//                   </p>
//                   <p className="text-[var(--ink-soft)]">
//                     {groups.every((g) => g.serviceMode === "PICKUP_DELIVERY")
//                       ? `Our team will arrive to pick up your laundry ${express.eta.toLowerCase()}.`
//                       : `Our team will arrive ${express.eta.toLowerCase()}.`}
//                   </p>
//                 </div>
//               </div>
//             )}

//             {bookingType === "SCHEDULED" && (
//               <>
//                 <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
//                   {days.map((d) => {
//                     const on = !!date && toYMD(d) === toYMD(date);
//                     const anyOpen = slotsOf(d).some((s) => s.ok);
//                     return (
//                       <button
//                         key={toYMD(d)}
//                         type="button"
//                         disabled={!anyOpen}
//                         onClick={() => {
//                           setDate(d);
//                           if (slot && !isSlotAvailable(d, slot)) setSlot(null);
//                         }}
//                         className={`${chip(on, !anyOpen)} shrink-0 text-center`}
//                       >
//                         <span className="block text-[12px] text-[var(--ink-soft)]">
//                           {d.toLocaleDateString("en-IN", { weekday: "short" })}
//                         </span>
//                         <b>{d.getDate()}</b>{" "}
//                         <span className="text-[12px]">{d.toLocaleDateString("en-IN", { month: "short" })}</span>
//                       </button>
//                     );
//                   })}
//                 </div>
//                 <div className="mt-3 grid gap-2 sm:grid-cols-3">
//                   {slotsOf(date ?? days[0]).map((s) => (
//                     <button
//                       key={s.code}
//                       type="button"
//                       disabled={!date || !s.ok}
//                       onClick={() => setSlot(s.code)}
//                       className={chip(slot === s.code, !date || !s.ok)}
//                     >
//                       <b>{s.label}</b>
//                       <span className="block text-[13px] text-[var(--ink-soft)]">{s.range}</span>
//                     </button>
//                   ))}
//                 </div>
//               </>
//             )}
//           </section>

//           {/* Notes */}
//           <section className={card}>
//             <label htmlFor="notes" className="mb-2 block text-[17px] font-semibold">
//               Special instructions <span className="text-[13px] font-normal text-[var(--ink-soft)]">(optional)</span>
//             </label>
//             <textarea
//               id="notes"
//               value={notes}
//               onChange={(e) => setNotes(e.target.value)}
//               rows={3}
//               maxLength={500}
//               placeholder="e.g. Please call on arrival"
//               className="w-full rounded-xl border border-transparent bg-[var(--ink)]/5 px-4 py-3 text-[15px] focus:border-[var(--gold)] focus:outline-none"
//             />
//           </section>

//           {/* Coupon */}
//           <section className={card}>
//             <h3 className="mb-3 flex items-center gap-2 text-[17px] font-semibold">
//               <Tag size={18} /> Offers
//             </h3>
//             {coupon ? (
//               <div className="flex items-center justify-between rounded-xl bg-[var(--gold)]/10 px-4 py-3 text-[14px]">
//                 <span>
//                   <b>{coupon.code}</b> applied · saved {rupee(Math.round(coupon.discount))}
//                 </span>
//                 <button aria-label="Remove coupon" onClick={() => setCoupon(null)}>
//                   <X size={18} />
//                 </button>
//               </div>
//             ) : (
//               <>
//                 <div className="flex gap-2">
//                   <input
//                     value={couponInput}
//                     onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
//                     placeholder="Coupon code"
//                     className="min-w-0 flex-1 rounded-xl border border-transparent bg-[var(--ink)]/5 px-4 py-3 text-[15px] focus:border-[var(--gold)] focus:outline-none"
//                   />
//                   <button
//                     type="button"
//                     disabled={validating || !couponInput.trim()}
//                     onClick={() => void applyCoupon(couponInput)}
//                     className="rounded-xl bg-[var(--gold)] px-5 text-[14px] font-semibold text-white disabled:opacity-50"
//                   >
//                     {validating ? "…" : "Apply"}
//                   </button>
//                 </div>
//                 <button
//                   type="button"
//                   onClick={() => setShowOffers((v) => !v)}
//                   className="mt-3 text-[13px] text-[var(--gold)] underline"
//                 >
//                   {showOffers ? "Hide available offers" : "View available offers"}
//                 </button>
//                 {showOffers && (
//                   <ul className="mt-3 space-y-2">
//                     {offersLoading && <li className="text-[13px] text-[var(--ink-soft)]">Loading…</li>}
//                     {!offersLoading && !offersRes?.data?.length && (
//                       <li className="text-[13px] text-[var(--ink-soft)]">No offers right now.</li>
//                     )}
//                     {offersRes?.data?.map((c) => {
//                       const min = Number(c.minOrderValue) || 0;
//                       const ok = cartTotal >= min;
//                       return (
//                         <li key={c.id} className="flex items-center justify-between gap-3 rounded-xl border border-[var(--line)] px-4 py-3 text-[13px]">
//                           <span>
//                             <b>{c.code}</b>
//                             <span className="block text-[var(--ink-soft)]">
//                               {c.discountType === "PERCENTAGE" ? `${Number(c.discountValue)}% off` : `${rupee(Number(c.discountValue))} off`}
//                               {min > 0 && ` · min ${rupee(min)}`}
//                             </span>
//                           </span>
//                           <button
//                             disabled={!ok || validating}
//                             onClick={() => void applyCoupon(c.code)}
//                             className="font-semibold text-[var(--gold)] disabled:opacity-40"
//                           >
//                             Apply
//                           </button>
//                         </li>
//                       );
//                     })}
//                   </ul>
//                 )}
//               </>
//             )}
//           </section>

//           {/* Payment method */}
//           <section className={card}>
//             <h2 className="mb-3 text-[17px] font-semibold">Payment method</h2>
//             <div className="space-y-2">
//               {([
//                 {
//                   id: "RAZORPAY" as const,
//                   title: "Pay online",
//                   sub: "UPI, cards, net banking",
//                   disabled: false,
//                 },
//                 {
//                   id: "COD" as const,
//                   title: "Cash on delivery",
//                   sub: !codAllowed
//                     ? codReason || "Not available for this area"
//                       : Number(cod?.codCharge) > 0
//                         ? `Pay in cash · ${rupee(Number(cod?.codCharge))} COD charge`
//                         : "Pay in cash when the service is done",
//                   disabled: !codAllowed,
//                 },
//                 {
//                   id: "WALLET" as const,
//                   title: "Clean7 wallet",
//                   sub:
//                     groups.length > 1
//                       ? "Not available for multi-service bookings"
//                       : walletLoading
//                         ? "Checking balance…"
//                         : walletError || walletBalance === null
//                           ? "Couldn't load your balance"
//                           : `Balance ${rupee(walletBalance)}${walletBalance < Math.round(total) ? " · too low for this order" : ""}`,
//                   disabled: groups.length > 1 || walletBalance === null,
//                 },
//               ]).map((o) => (
//                 <button
//                   key={o.id}
//                   type="button"
//                   disabled={o.disabled}
//                   onClick={() => setPayMethod(o.id)}
//                   className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
//                     payMethod === o.id
//                       ? "border-[var(--gold)] bg-[var(--gold)]/10"
//                       : "border-[var(--line)] hover:border-[var(--gold)]/50"
//                   }`}
//                 >
//                   <span
//                     className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 ${
//                       payMethod === o.id ? "border-[var(--gold)]" : "border-[var(--line)]"
//                     }`}
//                   >
//                     {payMethod === o.id && <span className="h-2.5 w-2.5 rounded-full bg-[var(--gold)]" />}
//                   </span>
//                   <span className="min-w-0">
//                     <span className="block text-[15px] font-medium">{o.title}</span>
//                     <span className="block text-[13px] text-[var(--ink-soft)]">{o.sub}</span>
//                   </span>
//                 </button>
//               ))}
//             </div>
//             {payMethod === "WALLET" && !walletOk && walletBalance !== null && groups.length === 1 && (
//               <Link href="/wallet" className="mt-3 inline-block text-[13px] font-semibold text-[var(--gold)] underline">
//                 Add money with a voucher
//               </Link>
//             )}
//           </section>

//           {/* Summary + pay */}
//           <section className={card}>
//             <dl className="space-y-1.5 text-[14px]">
//               <Row k="Subtotal" v={rupee(subtotal)} />
//               {addOnTotal > 0 && <Row k="Add-ons" v={rupee(addOnTotal)} />}
//               {coupon && <Row k={`Coupon (${coupon.code})`} v={`-${rupee(Math.round(coupon.discount))}`} />}
//               <Row k={`GST (${gstRate}%)`} v={`+${rupee(gstAmount)}`} />
//               {expressFee > 0 && <Row k={express.label} v={`+${rupee(expressFee)}`} />}
//               {codCharge > 0 && <Row k="COD charge" v={`+${rupee(codCharge)}`} />}
//               {deliveryReady && <Row k="Delivery charge" v={`+${rupee(deliveryFee)}`} />}
//               <div className="flex justify-between border-t border-[var(--line)] pt-3 text-[17px] font-semibold">
//                 <dt>Total</dt>
//                 <dd>{rupee(Math.round(total))}</dd>
//               </div>
//             </dl>
//             <p className="mt-1 text-[12px] text-[var(--ink-soft)]">
//               {gstLoaded
//                 ? "GST is added on top of the item price. "
//                 : "Showing an estimated GST rate. "}
//               The final amount is confirmed when the order is placed.
//               {gstError && (
//                 <button type="button" onClick={() => void retryGst()} className="ml-1 underline">
//                   Retry GST check
//                 </button>
//               )}
//             </p>
//             <button
//               type="button"
//               onClick={() => void pay()}
//               disabled={busy || !!problem}
//               className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--gold)] px-8 py-3.5 text-[16px] font-semibold text-white transition-colors hover:bg-[var(--gold-bright)] disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               {busy && <Loader2 size={18} className="animate-spin" />}
//               {status === "starting"
//                 ? payMethod === "RAZORPAY" ? "Starting payment…" : "Placing your order…"
//                 : status === "paying"
//                   ? "Complete payment in the popup…"
//                   : status === "confirming" || status === "unconfirmed"
//                     ? "Confirming your order…"
//                     : address && !notServiceable && !deliveryReady
//                       ? deliveryLoading ? "Checking delivery…" : "Delivery unavailable"
//                     : payMethod === "COD"
//                       ? "Place order · Pay on delivery"
//                       : payMethod === "WALLET"
//                         ? `Pay ${rupee(Math.round(total))} from wallet`
//                         : "Proceed to pay"}
//             </button>
//             {problem && !busy && (
//               <p className="mt-2 text-center text-[13px] text-[var(--ink-soft)]">{problem}</p>
//             )}
//           </section>
//         </div>
//       )}
//     </BookingShell>
//   );
// }

// function Row({ k, v }: { k: string; v: string }) {
//   return (
//     <div className="flex justify-between">
//       <dt className="text-[var(--ink-soft)] font-semibold">{k}</dt>
//       <dd>{v}</dd>
//     </div>
//   );
// }


"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BackLink from "@/app/components/ui/BackLink";
import { ArrowLeft, Loader2, MapPin, Minus, Plus, Tag, Trash2, X, Zap } from "lucide-react";
import { toast } from "sonner";

import BookingShell from "@/app/components/booking/BookingShell";
import { PageSkeleton } from "@/app/components/booking/BookingSkeleton";
import { useRequireAuth } from "@/app/hooks/useBookingAuth";
import { usePlaceOrder } from "@/app/hooks/usePlaceOrder";
import {
  MIN_ORDER_TOTAL,
  SLOTS,
  gstOn,
  isSlotAvailable,
  nextBookingDays,
  rupee,
  toYMD,
  walletBalanceOf,
  type SlotCode,
} from "@/app/lib/booking";
import { useTaxRate } from "@/app/hooks/useTaxRate";
import {
  clearCart,
  groupTotal,
  removeGroup,
  setLineQty,
  useCart,
  type CartGroup,
} from "@/app/lib/cart";
import { useAppSelector } from "@/redux/hooks";
import { useGetAddressesQuery } from "@/redux/api/profileApi";
import {
  readServiceability,
  useCheckServiceabilityQuery,
  useGetCatalogSettingQuery,
} from "@/redux/api/catalogApi";
import {
  useGetAvailableCouponsQuery,
  useGetBranchCodSettingsQuery,
  useGetDeliverySettingsQuery,
  useGetWalletQuery,
  useValidateCouponMutation,
  type BookingBody,
  type PaymentMethod,
} from "@/redux/api/orderApi";

const card =
  "rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4 sm:p-5";
const chip = (on: boolean, disabled = false) =>
  `rounded-xl border px-4 py-2.5 text-left text-[14px] transition-colors ${
    disabled
      ? "cursor-not-allowed opacity-40 border-[var(--line)]"
      : on
        ? "border-[var(--gold)] bg-[var(--gold)]/5 text-[var(--ink)]"
        : "border-[var(--line)] hover:border-[var(--gold)]/50 text-[var(--ink)]"
  }`;

type Express = { enabled: boolean; fee: number; label: string; eta: string };
const DEFAULT_EXPRESS: Express = {
  enabled: true,
  fee: 70,
  label: "Express arrival",
  eta: "Within ~2 hours",
};

export default function CheckoutPage() {
  const router = useRouter();
  const { allowed } = useRequireAuth();
  const user = useAppSelector((s) => s.auth.user);

  // The cart is saved in localStorage (survives closing the site); it holds
  // every service the user added: dry cleaning + house help + car wash …
  const { groups } = useCart();
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const draft = ready ? (groups.length ? { groups } : null) : undefined;

  const [addressId, setAddressId] = useState<string | null>(null);
  const [bookingType, setBookingType] = useState<"ASAP" | "SCHEDULED">("ASAP");
  const days = useMemo(() => nextBookingDays(), []);
  const [date, setDate] = useState<Date | null>(null);
  const [slot, setSlot] = useState<SlotCode | null>(null);
  const [notes, setNotes] = useState("");
  const [couponInput, setCouponInput] = useState("");
  const [coupon, setCoupon] = useState<{ code: string; discount: number } | null>(
    null,
  );
  const [showOffers, setShowOffers] = useState(false);
  const [payMethod, setPayMethod] = useState<PaymentMethod>("RAZORPAY");

  /* ----- data ----- */
  const { data: addrRes, isLoading: addrLoading } = useGetAddressesQuery(
    undefined,
    { skip: !allowed },
  );
  const addresses = useMemo(
    () => (Array.isArray(addrRes?.data) ? addrRes.data : []),
    [addrRes],
  );
  const address =
    addresses.find((a) => a.id === addressId) ??
    addresses.find((a) => a.isDefault) ??
    addresses[0];

  const hasCoords =
    typeof address?.latitude === "number" &&
    typeof address?.longitude === "number";
  const { data: svcRes, isFetching: checkingArea } =
    useCheckServiceabilityQuery(
      { latitude: address?.latitude ?? 0, longitude: address?.longitude ?? 0 },
      { skip: !hasCoords },
    );
  const area = readServiceability(svcRes);
  const notServiceable = hasCoords && !checkingArea && !!svcRes && !area.serviceable;

  const { data: expressRes } = useGetCatalogSettingQuery("express_delivery");
  const express = useMemo<Express>(() => {
    const v = expressRes?.data?.value as
      | { enabled?: boolean; fee?: number; label?: string; deliveryTimeEstimate?: string }
      | undefined;
    if (!v || typeof v !== "object") return DEFAULT_EXPRESS;
    return {
      enabled: v.enabled !== false,
      fee: typeof v.fee === "number" ? Math.max(0, v.fee) : DEFAULT_EXPRESS.fee,
      label: v.label || DEFAULT_EXPRESS.label,
      eta: v.deliveryTimeEstimate || DEFAULT_EXPRESS.eta,
    };
  }, [expressRes]);

  const [validateCoupon, { isLoading: validating }] = useValidateCouponMutation();
  const { data: offersRes, isFetching: offersLoading } =
    useGetAvailableCouponsQuery(undefined, { skip: !allowed || !showOffers });

  /* ----- money ----- */
  const allLines = groups.flatMap((g) => g.lines);
  const subtotal = allLines
    .filter((l) => l.kind !== "addOn")
    .reduce((s, l) => s + l.price * l.qty, 0);
  const addOnTotal = allLines
    .filter((l) => l.kind === "addOn")
    .reduce((s, l) => s + l.price * l.qty, 0);
  const cartTotal = subtotal + addOnTotal;
  // each service is its own booking → the express fee applies per booking
  const expressFee =
    bookingType === "ASAP" && express.enabled ? express.fee * groups.length : 0;
  // GST is charged on top, after the coupon (same as the mobile app)
  const taxable = Math.max(0, cartTotal - (coupon?.discount ?? 0));
  const { rate: gstRate, loaded: gstLoaded, error: gstError, retry: retryGst } = useTaxRate(!allowed);
  const gstAmount = gstOn(taxable, gstRate);

  // delivery charge (per city) - added once, like the app
  const city = address?.city?.trim() ?? "";
  const {
    data: deliveryRes,
    isFetching: deliveryLoading,
    isError: deliveryFailed,
    refetch: refetchDelivery,
  } = useGetDeliverySettingsQuery(city, { skip: !allowed || !city });
  const delivery = deliveryRes?.data;
  // same validation as the app: city must be active with a valid charge (₹0 is valid)
  const deliveryCharge = Number(delivery?.deliveryCharge);
  const deliveryReady =
    !!delivery &&
    delivery.isActive === true &&
    Number.isFinite(deliveryCharge) &&
    deliveryCharge >= 0;
  const deliveryError = !address
    ? null
    : !city
      ? "This address is missing a city. Please update it in your profile."
      : deliveryLoading
        ? null
        : deliveryReady
          ? null
          : delivery && delivery.isActive !== true
            ? `Delivery is not available in ${delivery.cityName || city} yet.`
            : deliveryFailed || !delivery
              ? "Could not load delivery settings. Please try again."
              : "Delivery settings are incomplete. Please try again later.";
  const deliveryFee = deliveryReady ? deliveryCharge : 0;

  // COD availability + charge (per branch). COD charge applies to a single booking.
  // same order as the app: branch saved on the cart item, else the nearest branch
  // to the checkout address (GET /branches/serviceability → nearbyBranches[0])
  const branchId = groups[0]?.branchId || area.branchId || undefined;
  const { data: codRes, isFetching: codLoading, isError: codFailed } = useGetBranchCodSettingsQuery(
    branchId ?? "",
    { skip: !allowed || !branchId },
  );
  const cod = codRes?.data;
  // same rule as the app: the branch COD setting must be active AND enabled
  const codAllowed =
    cod?.isActive === true &&
    cod?.codEnabled === true &&
    (!cod.branchId || cod.branchId === branchId);
  // why COD is unavailable - shown under the option so it can be compared with the app
  const codReason = codLoading
    ? "Checking availability…"
    : !address
      ? "Select an address first"
      : !hasCoords
        ? "This address has no map location"
        : checkingArea
          ? "Checking your area…"
          : !branchId
            ? "No service branch found for this address"
            : codFailed || !cod
              ? "Couldn't load COD settings for this branch"
              : cod.isActive !== true
                ? "COD isn't configured for this branch"
                : cod.codEnabled !== true
                  ? "COD is switched off for this branch"
                  : "";
  // temporary: open the browser console to compare with the app for the same address
  useEffect(() => {
    if (process.env.NODE_ENV === "production" && !/[?&]debug=1/.test(window.location.search)) return;
    console.info("[checkout-debug] COD", {
      city, lat: address?.latitude, lng: address?.longitude,
      branchId, cartBranch: groups[0]?.branchId, nearestBranch: area.branchId, serviceable: area.serviceable, cod, delivery,
    });
  }, [city, address?.latitude, address?.longitude, branchId, groups, area.branchId, area.serviceable, cod, delivery]);
  const codCharge =
    payMethod === "COD" && codAllowed
      ? Math.max(0, Number(cod?.codCharge) || 0)
      : 0;

  // wallet
  const { data: walletRes, isLoading: walletLoading, isError: walletError } =
    useGetWalletQuery(undefined, { skip: !allowed });
  const walletBalance = walletBalanceOf(walletRes?.data);

  const total = taxable + gstAmount + expressFee + deliveryFee + codCharge;
  const walletOk =
    groups.length === 1 && walletBalance !== null && walletBalance >= Math.round(total);

  // COD got switched off for this branch → fall back to online payment
  useEffect(() => {
    if (payMethod === "COD" && !codLoading && !codAllowed) setPayMethod("RAZORPAY");
  }, [payMethod, codLoading, codAllowed]);

  async function applyCoupon(code: string) {
    const c = code.trim();
    if (!c) return toast.error("Enter a coupon code.");
    try {
      const res = await validateCoupon({ code: c, cartTotal }).unwrap();
      const d = Number(res.data?.discountAmount) || 0;
      setCoupon({ code: c.toUpperCase(), discount: d });
      setCouponInput("");
      setShowOffers(false);
      toast.success(`You saved ${rupee(Math.round(d))} with ${c.toUpperCase()}.`);
    } catch {
      /* base query already toasted the reason */
    }
  }

  /* ----- place order ----- */
  const { placeOrder, placeBulkOrder, placeOffline, recover, status, busy } = usePlaceOrder({
    onConfirmed: (orderId, orderNumber) => {
      const multi = groups.length > 1;
      clearCart();
      const q = new URLSearchParams({ orderId });
      if (orderNumber) q.set("orderNumber", orderNumber);
      if (multi) q.set("multi", "1");
      // /order-success only opens for an order placed in this tab (typing the URL does nothing)
      try {
        sessionStorage.setItem("clean7_order_success", orderId);
      } catch {
        /* storage blocked: the page falls back to My Orders */
      }
      router.replace(`/order-success?${q}`);
    },
  });
  // Paid earlier but never confirmed (refresh / closed tab)? Finish it now.
  useEffect(() => {
    if (allowed) void recover();
  }, [allowed, recover]);

  const problem = !draft
    ? "Your cart is empty."
    : cartTotal < MIN_ORDER_TOTAL
      ? `Minimum order is ${rupee(MIN_ORDER_TOTAL)}.`
      : !address
        ? "Select a service address."
        : !hasCoords
          ? "This address has no map location. Edit it in your profile."
          : deliveryLoading
            ? "Checking delivery availability…"
            : deliveryError
              ? deliveryError
          : notServiceable
            ? "We don't serve this area yet."
            : bookingType === "SCHEDULED" && !date
              ? "Select a service date."
              : bookingType === "SCHEDULED" && !slot
                ? "Select a time slot."
                : payMethod === "COD" && !codAllowed
                  ? "Cash on delivery isn't available for this area."
                  : payMethod === "WALLET" && groups.length > 1
                    ? "Wallet payment isn't available for multi-service bookings."
                    : payMethod === "WALLET" && !walletOk
                      ? "Your wallet balance is too low for this order."
                      : null;

  // Edit the cart right here. A changed cart invalidates an applied coupon.
  const editQty = (g: CartGroup, l: CartGroup["lines"][number], qty: number) => {
    setCoupon(null);
    setLineQty(g.key, l, qty);
  };
  const dropGroup = (key: string) => {
    setCoupon(null);
    removeGroup(key);
  };

  /** One booking per cart group (service). */
  function bookingFor(g: CartGroup, index: number, addressId: string): BookingBody {
    const items = g.lines.filter((l) => l.kind !== "addOn");
    const addOns = g.lines
      .filter((l) => l.kind === "addOn")
      .map((l) => ({ addOnId: l.id, quantity: l.qty }));
    // mixed laundry (items of several services) → serviceId null, like the app
    const svcIds = new Set(items.map((l) => l.serviceId).filter(Boolean));
    const serviceId =
      g.serviceId ?? (svcIds.size === 1 ? [...svcIds][0]! : null);
    return {
      serviceId,
      items: items.map((l) => ({ itemId: l.id, quantity: l.qty })),
      addOns: addOns.length ? addOns : undefined,
      bookingType,
      scheduledDate: bookingType === "SCHEDULED" && date ? toYMD(date) : undefined,
      scheduledSlotCode: bookingType === "SCHEDULED" ? (slot ?? undefined) : undefined,
      addressId,
      // Same rule as the app: a normal single-service booking sends branchId null
      // (the server resolves the branch from addressId + service). Only mixed
      // laundry carts (serviceId null) and multi-service COD send the cart branch.
      branchId:
        serviceId !== null && groups.length === 1
          ? null
          : g.branchId || area.branchId || null,
      specialInstructions: notes.trim() || undefined,
      // the coupon is validated against the whole cart → send it once
      couponCode: index === 0 ? coupon?.code : undefined,
      contactOverride: {
        fullName: user?.name || undefined,
        email: user?.email || undefined,
        phoneNumber: user?.phone || undefined,
      },
    };
  }

  async function pay() {
    if (problem || !draft || !address?.id) return toast.error(problem ?? "Check your booking.");
    // re-check delivery for this city right before paying, like the app
    try {
      const fresh = (await refetchDelivery().unwrap()).data;
      const c = Number(fresh?.deliveryCharge);
      if (!fresh || fresh.isActive !== true || !Number.isFinite(c) || c < 0) {
        return toast.error(`Delivery is not available in ${fresh?.cityName || city || "this city"} yet. Please select another address.`);
      }
      if (c !== deliveryFee) return toast("The delivery charge was updated. Please review the total.");
    } catch {
      return toast.error("Could not verify delivery for this city. Please try again.");
    }
    const bookings = groups.map((g, i) => bookingFor(g, i, address.id as string));
    const prefill = { name: user?.name, email: user?.email, contact: user?.phone };
    if (typeof window !== "undefined" && /[?&]debug=1/.test(window.location.search)) {
      console.info("[checkout-debug] order request", payMethod, JSON.stringify(bookings, null, 2));
    }
    // COD / wallet → no payment popup, the order is placed straight away
    if (payMethod === "COD" || payMethod === "WALLET") {
      void placeOffline(bookings, payMethod);
      return;
    }
    // one service → normal order; several services → ONE payment for all bookings
    void (bookings.length === 1
      ? placeOrder(bookings[0], prefill)
      : placeBulkOrder(bookings, prefill));
  }

  /* ----- render ----- */
  const back = draft ? "/cart" : "/services";
  const slotsOf = (d: Date) => SLOTS.map((s) => ({ ...s, ok: isSlotAvailable(d, s.code) }));

  return (
    <BookingShell>
      <BackLink
        fallback={back}
        className="mb-8 inline-flex items-center gap-1.5 text-[14px] font-medium text-[var(--ink-soft)] hover:text-[var(--ink)]"
      >
        <ArrowLeft size={16} /> Back
      </BackLink>

      {!allowed || draft === undefined ? (
        <PageSkeleton variant="options" />
      ) : !draft ? (
        <div className="py-16 text-center">
          <h2 className="text-[28px]" style={{ fontFamily: "var(--font-fraunces)" }}>
            Your cart is empty
          </h2>
          <Link href="/services" className="mt-4 inline-block text-[var(--gold)] underline">
            Browse services
          </Link>
        </div>
      ) : (
        <div className="mx-auto max-w-[760px] space-y-5">
          {/* <h2 className="text-[32px] md:text-[40px]" style={{ fontFamily: "var(--font-fraunces)" }}>
            Checkout
          </h2> */}

          {status === "unconfirmed" && (
            <div className="rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4 text-[14px]">
              Your payment went through, but we couldn&apos;t confirm your order
              yet. <b>Don&apos;t pay again.</b>{" "}
              <button onClick={() => void recover()} className="font-semibold underline">
                Retry now
              </button>
            </div>
          )}

          {/* Cart */}
          <section className={card}>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-[17px] font-semibold">Your selection</h3>
              <Link href="/services" className="text-[13px] text-[var(--gold)] underline">
                + Add more services
              </Link>
            </div>
            <div className="space-y-4">
              {groups.map((g) => (
                <div key={g.key}>
                  <div className="mb-3 flex items-start justify-between gap-3 border-b border-[var(--line)] pb-3">
                    <div className="min-w-0">
                      <h4 className="text-[17px] font-semibold text-[var(--ink)]">{g.serviceName}</h4>
                      {g.categoryName && (
                        <p className="text-[13px] text-[var(--ink-soft)]">{g.categoryName}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => dropGroup(g.key)}
                      aria-label={`Remove ${g.serviceName}`}
                      className="flex shrink-0 items-center gap-1 text-[13px] text-[var(--ink-soft)] hover:text-red-500"
                    >
                      <Trash2 size={15} /> Remove
                    </button>
                  </div>
                  <ul className="space-y-3 text-[14px]">
                    {g.lines.map((l) => (
                      <li key={`${l.kind}-${l.id}`} className="flex items-center justify-between gap-3">
                        <span className="min-w-0">
                          {l.name}
                          {l.kind === "addOn" && (
                            <span className="ml-2 rounded-full bg-[var(--gold)]/10 px-2 py-0.5 text-[11px] font-semibold text-[var(--gold-bright)]">
                              Add-on
                            </span>
                          )}
                          {l.serviceName && l.serviceName !== g.serviceName && (
                            <span className="block text-[12px] text-[var(--ink-soft)]">{l.serviceName}</span>
                          )}
                          <span className="block text-[13px] text-[var(--ink-soft)]">
                            {rupee(l.price)}
                            {l.qty > 1 && ` × ${l.qty}`}
                          </span>
                        </span>
                        <span className="flex shrink-0 items-center gap-3">
                          {l.kind === "addOn" ? (
                            <button
                              type="button"
                              onClick={() => editQty(g, l, 0)}
                              aria-label={`Remove ${l.name}`}
                              className="text-[var(--ink-soft)] hover:text-red-500"
                            >
                              <X size={16} />
                            </button>
                          ) : (
                            <span className="flex items-center rounded-full border border-[var(--gold)] bg-[var(--gold)] text-white">
                              <button
                                type="button"
                                onClick={() => editQty(g, l, l.qty - 1)}
                                aria-label={`Remove one ${l.name}`}
                                className="flex h-7 w-7 items-center justify-center"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="min-w-[1.3rem] text-center text-[13px] font-semibold">{l.qty}</span>
                              <button
                                type="button"
                                onClick={() => editQty(g, l, l.qty + 1)}
                                aria-label={`Add one more ${l.name}`}
                                className="flex h-7 w-7 items-center justify-center"
                              >
                                <Plus size={14} />
                              </button>
                            </span>
                          )}
                          <span className="w-[68px] text-right font-medium">{rupee(l.price * l.qty)}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 flex justify-between border-t border-[var(--line)] pt-3 text-[14px]">
                    <span className="text-[var(--ink-soft)]">Subtotal</span>
                    <span className="font-semibold">{rupee(groupTotal(g))}</span>
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Address */}
          <section className={card}>
            <h3 className="mb-3 flex items-center gap-2 text-[17px] font-semibold">
              <MapPin size={18} /> Service address
            </h3>
            {addrLoading ? (
              <p className="text-[14px] text-[var(--ink-soft)]">Loading addresses…</p>
            ) : addresses.length === 0 ? (
              <p className="text-[14px] text-[var(--ink-soft)]">
                No saved address.{" "}
                <Link href="/profile" className="text-[var(--gold)] underline">
                  Add one in your profile
                </Link>
                , then come back.
              </p>
            ) : (
              <div className="grid gap-2">
                {addresses.map((a) => (
                  <label key={a.id} className={`${chip(a.id === address?.id)} cursor-pointer`}>
                    <input
                      type="radio"
                      name="address"
                      className="sr-only"
                      checked={a.id === address?.id}
                      onChange={() => setAddressId(a.id ?? null)}
                    />
                    <b>{a.label}</b>
                    <span className="block text-[13px] text-[var(--ink-soft)]">
                      {[a.line1, a.line2, a.city, a.postalCode].filter(Boolean).join(", ")}
                    </span>
                  </label>
                ))}
                <Link href="/profile" className="text-[13px] text-[var(--gold)] underline">
                  Manage addresses
                </Link>
              </div>
            )}
            {notServiceable && (
              <p className="mt-3 text-[14px] text-red-400">
                We don&apos;t serve this area yet. Pick another address.
              </p>
            )}
            {address && !notServiceable && (
              <p className="mt-3 text-[13px] text-[var(--ink-soft)]">
                {deliveryLoading ? (
                  <>Checking delivery availability for {city}…</>
                ) : deliveryError ? (
                  <span className="text-red-400">
                    {deliveryError}{" "}
                    {city && (
                      <button type="button" onClick={() => void refetchDelivery()} className="font-semibold text-[var(--gold)] underline">
                        Retry delivery check
                      </button>
                    )}
                  </span>
                ) : deliveryReady ? (
                  <>Delivery charge: {rupee(deliveryFee)}</>
                ) : null}
              </p>
            )}
          </section>

          {/* When */}
          <section className={card}>
            <h3 className="mb-3 text-[17px] font-semibold">When</h3>
            <div className="grid gap-2 sm:grid-cols-2">
              <button type="button" className={chip(bookingType === "ASAP")} onClick={() => setBookingType("ASAP")}>
                <b>Instant / ASAP</b>
                <span className="block text-[13px] text-[var(--ink-soft)]">
                  {express.eta}
                  {express.enabled && express.fee > 0 && ` · +${rupee(express.fee)}`}
                </span>
              </button>
              <button type="button" className={chip(bookingType === "SCHEDULED")} onClick={() => setBookingType("SCHEDULED")}>
                <b>Schedule</b>
                <span className="block text-[13px] text-[var(--ink-soft)]">Pick a day and time slot</span>
              </button>
            </div>

            {bookingType === "ASAP" && (
              <div className="mt-4 flex items-start gap-3 rounded-xl border border-[var(--gold)]/40 bg-[var(--gold)]/5 p-4">
                <Zap size={22} className="mt-0.5 shrink-0 text-[var(--gold)]" />
                <div className="text-[14px] leading-[1.6]">
                  <p className="font-semibold text-[var(--ink)]">
                    {express.label} ({express.eta.toLowerCase()})
                    {express.enabled && express.fee > 0 && ` + ${rupee(express.fee)}`}
                  </p>
                  <p className="text-[var(--ink-soft)]">
                    {groups.every((g) => g.serviceMode === "PICKUP_DELIVERY")
                      ? `Our team will arrive to pick up your laundry ${express.eta.toLowerCase()}.`
                      : `Our team will arrive ${express.eta.toLowerCase()}.`}
                  </p>
                </div>
              </div>
            )}

            {bookingType === "SCHEDULED" && (
              <>
                <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                  {days.map((d) => {
                    const on = !!date && toYMD(d) === toYMD(date);
                    const anyOpen = slotsOf(d).some((s) => s.ok);
                    return (
                      <button
                        key={toYMD(d)}
                        type="button"
                        disabled={!anyOpen}
                        onClick={() => {
                          setDate(d);
                          if (slot && !isSlotAvailable(d, slot)) setSlot(null);
                        }}
                        className={`${chip(on, !anyOpen)} shrink-0 text-center`}
                      >
                        <span className="block text-[12px] text-[var(--ink-soft)]">
                          {d.toLocaleDateString("en-IN", { weekday: "short" })}
                        </span>
                        <b>{d.getDate()}</b>{" "}
                        <span className="text-[12px]">{d.toLocaleDateString("en-IN", { month: "short" })}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-3 grid gap-2 sm:grid-cols-3">
                  {slotsOf(date ?? days[0]).map((s) => (
                    <button
                      key={s.code}
                      type="button"
                      disabled={!date || !s.ok}
                      onClick={() => setSlot(s.code)}
                      className={chip(slot === s.code, !date || !s.ok)}
                    >
                      <b>{s.label}</b>
                      <span className="block text-[13px] text-[var(--ink-soft)]">{s.range}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </section>

          {/* Notes */}
          <section className={card}>
            <label htmlFor="notes" className="mb-2 block text-[17px] font-semibold">
              Special instructions <span className="text-[13px] font-normal text-[var(--ink-soft)]">(optional)</span>
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              maxLength={500}
              placeholder="e.g. Please call on arrival"
              className="w-full rounded-xl border border-transparent bg-[var(--ink)]/5 px-4 py-3 text-[15px] focus:border-[var(--gold)] focus:outline-none"
            />
          </section>

          {/* Coupon */}
          <section className={card}>
            <h3 className="mb-3 flex items-center gap-2 text-[17px] font-semibold">
              <Tag size={18} /> Offers
            </h3>
            {coupon ? (
              <div className="flex items-center justify-between rounded-xl bg-[var(--gold)]/10 px-4 py-3 text-[14px]">
                <span>
                  <b>{coupon.code}</b> applied · saved {rupee(Math.round(coupon.discount))}
                </span>
                <button aria-label="Remove coupon" onClick={() => setCoupon(null)}>
                  <X size={18} />
                </button>
              </div>
            ) : (
              <>
                <div className="flex gap-2">
                  <input
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    placeholder="Coupon code"
                    className="min-w-0 flex-1 rounded-xl border border-transparent bg-[var(--ink)]/5 px-4 py-3 text-[15px] focus:border-[var(--gold)] focus:outline-none"
                  />
                  <button
                    type="button"
                    disabled={validating || !couponInput.trim()}
                    onClick={() => void applyCoupon(couponInput)}
                    className="rounded-xl bg-[var(--gold)] px-5 text-[14px] font-semibold text-white disabled:opacity-50"
                  >
                    {validating ? "…" : "Apply"}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setShowOffers((v) => !v)}
                  className="mt-3 text-[13px] text-[var(--gold)] underline"
                >
                  {showOffers ? "Hide available offers" : "View available offers"}
                </button>
                {showOffers && (
                  <ul className="mt-3 space-y-2">
                    {offersLoading && <li className="text-[13px] text-[var(--ink-soft)]">Loading…</li>}
                    {!offersLoading && !offersRes?.data?.length && (
                      <li className="text-[13px] text-[var(--ink-soft)]">No offers right now.</li>
                    )}
                    {offersRes?.data?.map((c) => {
                      const min = Number(c.minOrderValue) || 0;
                      const ok = cartTotal >= min;
                      return (
                        <li key={c.id} className="flex items-center justify-between gap-3 rounded-xl border border-[var(--line)] px-4 py-3 text-[13px]">
                          <span>
                            <b>{c.code}</b>
                            <span className="block text-[var(--ink-soft)]">
                              {c.discountType === "PERCENTAGE" ? `${Number(c.discountValue)}% off` : `${rupee(Number(c.discountValue))} off`}
                              {min > 0 && ` · min ${rupee(min)}`}
                            </span>
                          </span>
                          <button
                            disabled={!ok || validating}
                            onClick={() => void applyCoupon(c.code)}
                            className="font-semibold text-[var(--gold)] disabled:opacity-40"
                          >
                            Apply
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </>
            )}
          </section>

          {/* Payment method */}
          <section className={card}>
            <h2 className="mb-3 text-[17px] font-semibold">Payment method</h2>
            <div className="space-y-2">
              {([
                {
                  id: "RAZORPAY" as const,
                  title: "Pay online",
                  sub: "UPI, cards, net banking",
                  disabled: false,
                },
                {
                  id: "COD" as const,
                  title: "Cash on delivery",
                  sub: !codAllowed
                    ? codReason || "Not available for this area"
                      : Number(cod?.codCharge) > 0
                        ? `Pay in cash · ${rupee(Number(cod?.codCharge))} COD charge`
                        : "Pay in cash when the service is done",
                  disabled: !codAllowed,
                },
                {
                  id: "WALLET" as const,
                  title: "Clean7 wallet",
                  sub:
                    groups.length > 1
                      ? "Not available for multi-service bookings"
                      : walletLoading
                        ? "Checking balance…"
                        : walletError || walletBalance === null
                          ? "Couldn't load your balance"
                          : `Balance ${rupee(walletBalance)}${walletBalance < Math.round(total) ? " · too low for this order" : ""}`,
                  disabled: groups.length > 1 || walletBalance === null,
                },
              ]).map((o) => (
                <button
                  key={o.id}
                  type="button"
                  disabled={o.disabled}
                  onClick={() => setPayMethod(o.id)}
                  className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                    payMethod === o.id
                      ? "border-[var(--gold)] bg-[var(--gold)]/10"
                      : "border-[var(--line)] hover:border-[var(--gold)]/50"
                  }`}
                >
                  <span
                    className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 ${
                      payMethod === o.id ? "border-[var(--gold)]" : "border-[var(--line)]"
                    }`}
                  >
                    {payMethod === o.id && <span className="h-2.5 w-2.5 rounded-full bg-[var(--gold)]" />}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[15px] font-medium">{o.title}</span>
                    <span className="block text-[13px] text-[var(--ink-soft)]">{o.sub}</span>
                  </span>
                </button>
              ))}
            </div>
            {payMethod === "WALLET" && !walletOk && walletBalance !== null && groups.length === 1 && (
              <Link href="/wallet" className="mt-3 inline-block text-[13px] font-semibold text-[var(--gold)] underline">
                Add money with a voucher
              </Link>
            )}
          </section>

          {/* Summary + pay */}
          <section className={card}>
            <dl className="space-y-1.5 text-[14px]">
              <Row k="Subtotal" v={rupee(subtotal)} />
              {addOnTotal > 0 && <Row k="Add-ons" v={rupee(addOnTotal)} />}
              {coupon && <Row k={`Coupon (${coupon.code})`} v={`-${rupee(Math.round(coupon.discount))}`} />}
              <Row k={`GST (${gstRate}%)`} v={`+${rupee(gstAmount)}`} />
              {expressFee > 0 && <Row k={express.label} v={`+${rupee(expressFee)}`} />}
              {codCharge > 0 && <Row k="COD charge" v={`+${rupee(codCharge)}`} />}
              {deliveryReady && <Row k="Delivery charge" v={`+${rupee(deliveryFee)}`} />}
              <div className="flex justify-between border-t border-[var(--line)] pt-3 text-[17px] font-semibold">
                <dt>Total</dt>
                <dd>{rupee(Math.round(total))}</dd>
              </div>
            </dl>
            <p className="mt-1 text-[12px] text-[var(--ink-soft)]">
              {gstLoaded
                ? "GST is added on top of the item price. "
                : "Showing an estimated GST rate. "}
              The final amount is confirmed when the order is placed.
              {gstError && (
                <button type="button" onClick={() => void retryGst()} className="ml-1 underline">
                  Retry GST check
                </button>
              )}
            </p>
            <button
              type="button"
              onClick={() => void pay()}
              disabled={busy || !!problem}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--gold)] px-8 py-3.5 text-[16px] font-semibold text-white transition-colors hover:bg-[var(--gold-bright)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {busy && <Loader2 size={18} className="animate-spin" />}
              {status === "starting"
                ? payMethod === "RAZORPAY" ? "Starting payment…" : "Placing your order…"
                : status === "paying"
                  ? "Complete payment in the popup…"
                  : status === "confirming" || status === "unconfirmed"
                    ? "Confirming your order…"
                    : address && !notServiceable && !deliveryReady
                      ? deliveryLoading ? "Checking delivery…" : "Delivery unavailable"
                    : payMethod === "COD"
                      ? "Place order · Pay on delivery"
                      : payMethod === "WALLET"
                        ? `Pay ${rupee(Math.round(total))} from wallet`
                        : "Proceed to pay"}
            </button>
            {problem && !busy && (
              <p className="mt-2 text-center text-[13px] text-[var(--ink-soft)]">{problem}</p>
            )}
          </section>
        </div>
      )}
    </BookingShell>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-[var(--ink-soft)] font-semibold">{k}</dt>
      <dd>{v}</dd>
    </div>
  );
}