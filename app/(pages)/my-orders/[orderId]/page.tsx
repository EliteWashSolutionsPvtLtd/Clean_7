// "use client";

// import { use, useState } from "react";
// import Link from "next/link";
// import {
//   ArrowLeft,
//   Bike,
//   Car,
//   CheckCircle2,
//   Clock3,
//   FileText,
//   HardHat,
//   Info,
//   Loader2,
//   Phone,
//   RotateCcw,
//   Wallet,
//   AlertCircle,
//   XCircle,
//   Zap,
// } from "lucide-react";
// import { toast } from "sonner";

// import BookingShell from "@/app/components/booking/BookingShell";
// import { PageSkeleton } from "@/app/components/booking/BookingSkeleton";
// import { useRequireAuth } from "@/app/hooks/useBookingAuth";
// import { useRazorpay } from "@/app/hooks/useRazorpay";
// import { SLOTS, newIdempotencyKey, rupee } from "@/app/lib/booking";
// import { BASE_URL } from "@/lib/constants";
// import { useAppSelector } from "@/redux/hooks";
// import {
//   useCancelOrderMutation,
//   useCreateReviewMutation,
//   useGetOrderByIdQuery,
//   useInitiateOrderPaymentMutation,
//   useVerifyOrderPaymentMutation,
//   type Order,
//   type OrderStatus,
// } from "@/redux/api/orderApi";

// const card = "rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4 sm:p-5";
// const money = (v?: string | number | null) => rupee(Math.round(Number(v) || 0));
// const time = (iso?: string | null) =>
//   iso
//     ? new Date(iso).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
//     : "";
// const dateTime = (iso?: string | null) =>
//   iso
//     ? new Date(iso).toLocaleString("en-IN", {
//         day: "numeric",
//         month: "short",
//         year: "numeric",
//         hour: "numeric",
//         minute: "2-digit",
//       })
//     : null;

// /** Activity timeline - identical steps/wording to the mobile app. */
// const TIMELINE_STEPS = [
//   { key: "placed", label: "Order Placed", description: "We have received your booking." },
//   { key: "confirmed", label: "Pickup assigned / confirmed", description: "Your schedule has been confirmed." },
//   { key: "in_progress", label: "Pickup completed", description: "Your items have been picked up." },
//   { key: "received", label: "Received at branch", description: "Your items are at the facility." },
//   { key: "processing", label: "Laundry in process", description: "Your order is being worked on." },
//   { key: "ready", label: "Ready for delivery", description: "Your items are ready to be returned." },
//   { key: "out_for_delivery", label: "Out for delivery", description: "Final handoff is in progress." },
//   { key: "delivered", label: "Delivered", description: "Your order has been completed." },
// ];
// const STATUS_TO_STEP: Record<OrderStatus, number> = {
//   PENDING: 0, CONFIRMED: 1, IN_PROGRESS: 2, RECEIVED_AT_BRANCH: 3, PROCESSING: 4,
//   READY_FOR_DELIVERY: 5, OUT_FOR_DELIVERY: 6, DELIVERED: 7, COMPLETED: 7,
//   CANCELLED: -1, PICKUP_FAILED: -1, DELIVERY_FAILED: -1,
// };
// const SLOT_LABELS: Record<string, string> = {
//   MORNING: "Morning (8 AM – 12 PM)",
//   AFTERNOON: "Afternoon (12 PM – 4 PM)",
//   EVENING: "Evening (4 PM – 8 PM)",
// };
// const dateOnly = (iso?: string | null) =>
//   iso && !isNaN(new Date(iso).getTime())
//     ? new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
//     : "";

// type Tone = "green" | "amber" | "red" | "blue" | "grey";
// const TONE: Record<Tone, string> = {
//   green: "bg-green-500/15 text-green-600",
//   amber: "bg-amber-500/15 text-amber-600",
//   red: "bg-red-500/15 text-red-500",
//   blue: "bg-blue-500/15 text-blue-500",
//   grey: "bg-[var(--ink)]/10 text-[var(--ink-soft)]",
// };

// /** Same payment states / wording as the mobile app's Payment Details card. */
// function paymentInfo(o: Order) {
//   const method =
//     o.paymentMethod === "COD"
//       ? "Cash on Delivery"
//       : o.paymentMethod === "RAZORPAY"
//         ? "Online Payment (Razorpay)"
//         : o.paymentMethod || "Online Payment";
//   const total = money(o.grandTotalAmount);
//   const paidAttempt = o.paymentAttempts?.find((a) => a.status === "PAID");
//   const txnId =
//     paidAttempt?.providerPaymentId || o.paymentAttempts?.[0]?.providerPaymentId || null;
//   const when = dateTime(
//     o.paymentSettledAt || paidAttempt?.verifiedAt || (o.paymentStatus === "PAID" ? o.createdAt : null),
//   );

//   switch (o.paymentStatus) {
//     case "PAID":
//       return { badge: "Payment Successful", tone: "green" as Tone, Icon: CheckCircle2, headline: "Payment Received",
//         text: `Payment of ${total} was successfully received via ${method}. Your booking is confirmed.`, method, txnId, when };
//     case "PENDING":
//       return { badge: "Payment Pending", tone: "amber" as Tone, Icon: Clock3, headline: "Payment Pending",
//         text: `Payment of ${total} is awaiting completion. Please pay now to confirm your service.`, method, txnId: null, when: null };
//     case "FAILED":
//       return { badge: "Payment Failed", tone: "red" as Tone, Icon: XCircle, headline: "Payment Unsuccessful",
//         text: `The payment attempt for ${total} could not be completed. Please retry your payment.`, method, txnId: null, when: null };
//     case "REFUNDED":
//       return { badge: "Refund Processed", tone: "blue" as Tone, Icon: RotateCcw, headline: "Refund Processed",
//         text: `A refund of ${total} has been processed back to your original payment method.`, method, txnId, when };
//     case "COD_PENDING_COLLECTION":
//       return { badge: "Cash on Delivery", tone: "amber" as Tone, Icon: Wallet, headline: "Pay Upon Service",
//         text: `Please keep ${total} in cash ready to pay your service professional upon delivery.`, method: "Cash on Delivery (COD)", txnId: null, when: null };
//     case "COD_COLLECTED":
//       return { badge: "Cash Collected", tone: "green" as Tone, Icon: CheckCircle2, headline: "Cash Payment Received",
//         text: `Cash payment of ${total} was collected by your Clean7 professional.`, method: "Cash on Delivery (COD)", txnId: null, when };
//     default:
//       return { badge: String(o.paymentStatus || "Unknown"), tone: "grey" as Tone, Icon: Info, headline: "Payment Status",
//         text: `Status: ${o.paymentStatus}`, method, txnId: null, when: null };
//   }
// }

// export default function OrderDetailPage({
//   params,
// }: {
//   params: Promise<{ orderId: string }>;
// }) {
//   const { orderId } = use(params);
//   const { allowed } = useRequireAuth();
//   const user = useAppSelector((s) => s.auth.user);
//   const token = useAppSelector((s) => s.auth.token);
//   const { data, isLoading } = useGetOrderByIdQuery(orderId, { skip: !allowed });
//   const order = data?.data;

//   const [cancel, { isLoading: cancelling }] = useCancelOrderMutation();
//   const [initPay] = useInitiateOrderPaymentMutation();
//   const [verify] = useVerifyOrderPaymentMutation();
//   const [review, { isLoading: reviewing }] = useCreateReviewMutation();
//   const { openCheckout } = useRazorpay();
//   const [paying, setPaying] = useState(false);
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState("");

//   const canCancel = order && (order.status === "PENDING" || order.status === "CONFIRMED");
//   const showRetryPayment =
//     !!order &&
//     order.status !== "CANCELLED" &&
//     order.paymentMethod === "RAZORPAY" &&
//     (order.paymentStatus === "PENDING" || order.paymentStatus === "FAILED");
//   const canReview =
//     order && (order.status === "COMPLETED" || order.status === "DELIVERED") && !order.review;

//   async function retryPayment() {
//     if (!order) return;
//     setPaying(true);
//     try {
//       const res = await initPay({ orderId: order.id, idempotencyKey: newIdempotencyKey() }).unwrap();
//       const co = res.data?.checkout;
//       if (!co) throw new Error("no checkout");
//       const verifyKey = newIdempotencyKey();
//       await openCheckout({
//         key: co.key,
//         razorpayOrderId: co.orderId,
//         amount: co.amount,
//         currency: co.currency,
//         description: `Order ${co.orderNumber}`,
//         prefill: { name: user?.name, email: user?.email, contact: user?.phone },
//         onSuccess: async (r) => {
//           try {
//             await verify({
//               orderId: order.id,
//               razorpayOrderId: r.razorpay_order_id,
//               razorpayPaymentId: r.razorpay_payment_id,
//               razorpaySignature: r.razorpay_signature,
//               idempotencyKey: verifyKey,
//             }).unwrap();
//             toast.success("Payment completed.");
//           } catch {
//             toast.error("Payment couldn't be verified. If you were charged, contact support.");
//           } finally {
//             setPaying(false);
//           }
//         },
//         onFailure: (m) => toast.error(m),
//         onDismiss: () => setPaying(false),
//       });
//     } catch {
//       setPaying(false);
//     }
//   }

//   function downloadInvoice() {
//     if (!order) return;
//     // same URL the mobile app opens
//     window.open(
//       `${BASE_URL}/orders/${order.id}/invoice?token=${encodeURIComponent(token || "")}`,
//       "_blank",
//       "noopener",
//     );
//   }

//   const isLaundry =
//     !!order &&
//     (order.serviceMode === "PICKUP_DELIVERY" ||
//       order.fulfillmentType === "PICKUP_SERVICE" ||
//       order.scheduleLabelKey === "pickup_time" ||
//       [order.serviceCategoryCode, order.serviceSlug, order.serviceCode].some((v) =>
//         String(v ?? "").toLowerCase().includes("laundry"),
//       ));

//   const showExpress =
//     !!order &&
//     order.bookingType === "ASAP" &&
//     !["CANCELLED", "PICKUP_FAILED", "DELIVERY_FAILED"].includes(order.status);

//   const expressFee = Number(
//     order?.expressFeeAmount ||
//       (order?.bookingType === "ASAP" && Number(order.grandTotalAmount) > 0 ? "70" : "0"),
//   );
//   const invoiceReady = order?.paymentStatus === "PAID" || order?.paymentStatus === "COD_COLLECTED";
//   const pay = order ? paymentInfo(order) : null;

//   const slot = !order
//     ? ""
//     : order.bookingType === "ASAP"
//       ? "Express (Within 2 Hours)"
//       : order.scheduledSlot
//         ? `${order.scheduledSlot.label} (${order.scheduledSlot.startTime} – ${order.scheduledSlot.endTime})`
//         : order.scheduledSlotCode
//           ? SLOT_LABELS[order.scheduledSlotCode] || order.scheduledSlotCode.replace(/_/g, " ")
//           : "Scheduled";

//   const currentStep = order ? STATUS_TO_STEP[order.status] ?? 0 : 0;
//   const isDeliveryPhase =
//     !!order && ["READY_FOR_DELIVERY", "OUT_FOR_DELIVERY", "DELIVERED"].includes(order.status);
//   const hasStaff = order
//     ? isLaundry
//       ? !!(order.pickupRider || order.deliveryRider || order.pickupRiderAuthUserId)
//       : !!order.assignedOperator
//     : false;
//   const activeStaff = !order
//     ? null
//     : isDeliveryPhase
//       ? order.deliveryRider || order.pickupRider || order.assignedOperator
//       : order.pickupRider || order.assignedOperator || order.deliveryRider;
//   const roleTitle = isDeliveryPhase ? "Delivery Rider" : isLaundry ? "Pickup Rider" : "Service Professional";
//   const staffInstructions = !order
//     ? ""
//     : isDeliveryPhase
//       ? order.status === "OUT_FOR_DELIVERY"
//         ? "Your rider is on the way to deliver your fresh laundry to your doorstep."
//         : order.status === "DELIVERED"
//           ? "Your laundry was successfully delivered."
//           : "Your rider is assigned and will deliver your order soon."
//       : order.status === "IN_PROGRESS" || order.status === "RECEIVED_AT_BRANCH"
//         ? "Your laundry has been picked up and is at our branch facility."
//         : "Your rider will arrive at your address to collect your laundry. Please have items ready.";
//   const addr = order?.serviceAddressSnapshot;

//   return (
//     <BookingShell>
//       <Link href="/my-orders" className="mb-8 inline-flex items-center gap-1.5 text-[14px] font-medium text-[var(--ink-soft)] hover:text-[var(--ink)]">
//         <ArrowLeft size={16} /> My orders
//       </Link>

//       {!allowed || isLoading ? (
//         <PageSkeleton variant="options" />
//       ) : !order || !pay ? (
//         <p className="py-16 text-center text-[var(--ink-soft)]">Order not found.</p>
//       ) : (
//         <div className="mx-auto max-w-[760px] space-y-5">
//           <div>
//             <h2 className="text-[30px]" style={{ fontFamily: "var(--font-fraunces)" }}>
//               Order Details
//             </h2>
//             <p className="text-[14px] text-[var(--ink-soft)]">#{order.orderNumber}</p>
//           </div>

//           {/* Express booking (ASAP) */}
//           {showExpress && (
//             <section className="rounded-2xl border border-[var(--gold)]/30 bg-[var(--gold)]/5 p-4 sm:p-5">
//               <div className="flex items-start gap-3">
//                 <Zap size={24} className="mt-0.5 shrink-0 text-[var(--gold)]" />
//                 <div className="text-[14px] leading-[1.6]">
//                   <p className="text-[15px] font-bold">Express Booking</p>
//                   <p className="text-[var(--ink-soft)]">
//                     {isLaundry
//                       ? "Your laundry pickup is scheduled. Our team will arrive within 2 hours. Please have your laundry ready."
//                       : "Your Clean7 professional will arrive within 2 hours. Please be available at the service address."}
//                   </p>
//                   {order.promisedArrivalFrom && order.promisedArrivalTo && (
//                     <p className="mt-2 text-[13px] font-semibold text-[var(--gold)]">
//                       Expected arrival: {time(order.promisedArrivalFrom)} – {time(order.promisedArrivalTo)}
//                     </p>
//                   )}
//                   {order.actualArrivalTime && (
//                     <p className="mt-1.5 text-[13px] font-semibold text-green-600">
//                       ✓ Arrived at {time(order.actualArrivalTime)}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </section>
//           )}

//           {/* Items & Invoice */}
//           <section className={card}>
//             <h3 className="mb-3 text-[17px] font-semibold">Items &amp; Invoice</h3>
//             <table className="w-full text-[14px]">
//               <thead>
//                 <tr className="border-b border-[var(--line)] text-left text-[12px] uppercase tracking-wide text-[var(--ink-soft)]">
//                   <th className="pb-2 font-medium">Item</th>
//                   <th className="pb-2 text-center font-medium">Qty</th>
//                   <th className="pb-2 text-right font-medium">Total</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {order.items?.map((i) => (
//                   <tr key={i.id} className="border-b border-[var(--line)]/60 last:border-0">
//                     <td className="py-2.5 pr-2">
//                       <span className="font-medium">{i.itemName}</span>
//                       {i.serviceName && (
//                         <span className="block text-[12px] text-[var(--ink-soft)]">{i.serviceName}</span>
//                       )}
//                     </td>
//                     <td className="py-2.5 text-center">{Number(i.quantity)}</td>
//                     <td className="py-2.5 text-right">{money(i.lineTotal)}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             <dl className="mt-3 space-y-1.5 border-t border-[var(--line)] pt-3 text-[14px]">
//               <div className="flex justify-between"><dt className="text-[var(--ink-soft)]">Sub Total</dt><dd>{money(order.subtotalAmount)}</dd></div>
//               {order.addOns?.map((a) => (
//                 <div key={a.id} className="flex justify-between">
//                   <dt className="text-[var(--ink-soft)]">{a.name} (x{Number(a.quantity)})</dt>
//                   <dd>{money(a.lineTotal)}</dd>
//                 </div>
//               ))}
//               {Number(order.discountAmount) > 0 && (
//                 <div className="flex justify-between text-[var(--gold)]"><dt>Coupon Discount</dt><dd>-{money(order.discountAmount)}</dd></div>
//               )}
//               <div className="flex justify-between"><dt className="text-[var(--ink-soft)]">GST</dt><dd>+{money(order.taxAmount)}</dd></div>
//               {Number(order.deliveryChargeAmount) > 0 && (
//                 <div className="flex justify-between"><dt className="text-[var(--ink-soft)]">Delivery Charge</dt><dd>+{money(order.deliveryChargeAmount)}</dd></div>
//               )}
//               {Number(order.codCharge) > 0 && (
//                 <div className="flex justify-between"><dt className="text-[var(--ink-soft)]">COD Charge</dt><dd>+{money(order.codChargeAmount)}</dd></div>
//               )}
//               {expressFee > 0 && (
//                 <div className="flex justify-between"><dt className="text-[var(--ink-soft)]">⚡ Express Booking Fee</dt><dd>+{money(expressFee)}</dd></div>
//               )}
//               <div className="flex justify-between border-t border-[var(--line)] pt-3 text-[17px] font-bold">
//                 <dt>Total</dt><dd>{money(order.grandTotalAmount)}</dd>
//               </div>
//             </dl>

//             {invoiceReady ? (
//               <button
//                 type="button"
//                 onClick={downloadInvoice}
//                 className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--gold)] py-3 text-[15px] font-bold text-white hover:bg-[var(--gold-bright)]"
//               >
//                 <FileText size={18} /> Download Order Invoice
//               </button>
//             ) : (
//               <div className="mt-4 flex items-start gap-2 rounded-xl border border-[var(--line)] bg-[var(--ink)]/[0.03] px-4 py-3 text-[13px] text-[var(--ink-soft)]">
//                 <Info size={18} className="mt-px shrink-0" />
//                 {order.paymentMethod === "COD"
//                   ? "Tax invoice will be available after cash payment is completed on delivery."
//                   : "Tax invoice will be available after payment is completed."}
//               </div>
//             )}
//           </section>

//           {/* Payment Details */}
//           <section className={card}>
//             <div className="mb-3 flex items-center justify-between gap-3">
//               <h3 className="text-[17px] font-semibold">Payment Details</h3>
//               <span className={`rounded-lg px-2.5 py-1 text-[12px] font-bold ${TONE[pay.tone]}`}>{pay.badge}</span>
//             </div>

//             <div className="mb-3 flex items-start gap-3 rounded-xl border border-[var(--line)] bg-[var(--ink)]/[0.03] p-3">
//               <pay.Icon size={22} className="mt-0.5 shrink-0 text-[var(--gold)]" />
//               <div className="text-[14px]">
//                 <p className="font-semibold">{pay.headline}</p>
//                 <p className="mt-0.5 text-[var(--ink-soft)]">{pay.text}</p>
//               </div>
//             </div>

//             <dl className="space-y-2 text-[14px]">
//               <Line k="Payment Status" v={pay.badge} />
//               <Line k="Payment Method" v={pay.method} />
//               <Line k="Total Amount" v={money(order.grandTotalAmount)} bold />
//               {pay.when && <Line k="Payment Date" v={pay.when} />}
//               {pay.txnId && <Line k="Transaction ID" v={pay.txnId} />}
//             </dl>

//             {showRetryPayment && (
//               <button
//                 type="button"
//                 onClick={() => void retryPayment()}
//                 disabled={paying}
//                 className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--gold)] px-8 py-3.5 font-semibold text-white hover:bg-[var(--gold-bright)] disabled:opacity-50"
//               >
//                 {paying && <Loader2 size={18} className="animate-spin" />}
//                 Pay Now • {money(order.grandTotalAmount)}
//               </button>
//             )}
//           </section>

//           {/* Activity */}
//           {currentStep >= 0 && (
//             <section className={card}>
//               <h3 className="mb-4 text-[17px] font-semibold">Activity</h3>
//               <ol>
//                 {TIMELINE_STEPS.slice(0, currentStep + 1).map((step, i) => {
//                   const current = i === currentStep && currentStep < TIMELINE_STEPS.length - 1;
//                   const last = i === currentStep;
//                   return (
//                     <li key={step.key} className="flex gap-3">
//                       <div className="flex flex-col items-center">
//                         <span
//                           className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
//                             current
//                               ? "border-[var(--gold)] bg-[var(--gold)]/20"
//                               : "border-green-500 bg-green-500/20"
//                           }`}
//                         >
//                           <span className={`h-2 w-2 rounded-full ${current ? "bg-[var(--gold)]" : "bg-green-500"}`} />
//                         </span>
//                         {!last && <span className="my-1 w-0.5 flex-1 bg-green-500/50" />}
//                       </div>
//                       <div className={`text-[14px] ${last ? "" : "pb-4"}`}>
//                         <p className="font-semibold">{step.label}</p>
//                         <p className="text-[13px] text-[var(--ink-soft)]">{step.description}</p>
//                       </div>
//                     </li>
//                   );
//                 })}
//               </ol>
//             </section>
//           )}

//           {/* Customer Details */}
//           <section className={card}>
//             <h3 className="mb-3 text-[17px] font-semibold">Customer Details</h3>
//             <dl className="space-y-2 text-[14px]">
//               <Line k="Order Number" v={`#${order.orderNumber}`} />
//               <Line k="Name" v={user?.name || "Guest"} />
//               <Line k="Phone" v={user?.phone || "N/A"} />
//               <Line k="Order Placed" v={dateTime(order.createdAt) || ""} />
//               <Line
//                 k="Scheduled Slot"
//                 v={
//                   order.bookingType === "ASAP"
//                     ? `⚡ Express (Within 2 Hours)${order.createdAt ? ` • ${dateOnly(order.createdAt)}` : ""}`
//                     : `${dateOnly(order.scheduledDate || order.createdAt)}, ${slot}`
//                 }
//               />
//               {addr && (
//                 <Line
//                   k="Address"
//                   v={`${addr.line1}${addr.line2 ? `, ${addr.line2}` : ""}\n${addr.city}${addr.state ? `, ${addr.state}` : ""} ${addr.postalCode}`}
//                   multiline
//                 />
//               )}
//             </dl>
//           </section>

//           {/* Cancelled / interrupted */}
//           {currentStep < 0 && (
//             <section className="flex items-center gap-3 rounded-2xl border border-red-500/30 bg-red-500/5 p-4 sm:p-5">
//               <AlertCircle size={24} className="shrink-0 text-red-500" />
//               <div>
//                 <p className="text-[15px] font-bold text-red-500">
//                   {order.status === "CANCELLED" ? "Order Cancelled" : "Order Interrupted"}
//                 </p>
//                 <p className="text-[13px] text-[var(--ink-soft)]">
//                   {order.status === "PICKUP_FAILED"
//                     ? "Pickup could not be completed."
//                     : order.status === "DELIVERY_FAILED"
//                       ? "Delivery could not be completed."
//                       : "This order was cancelled."}
//                 </p>
//               </div>
//             </section>
//           )}

//           {/* Rider / professional assignment */}
//           {hasStaff ? (
//             <section className={card}>
//               <div className="mb-4 flex items-center justify-between gap-3">
//                 <h3 className="flex items-center gap-2 text-[17px] font-semibold">
//                   {isLaundry ? <Bike size={20} /> : <HardHat size={20} />}
//                   {isLaundry
//                     ? isDeliveryPhase ? "Delivery Rider Details" : "Pickup Rider Details"
//                     : "Assigned Professional"}
//                 </h3>
//                 <span className={`rounded-md px-2 py-0.5 text-[11.5px] font-bold ${TONE.green}`}>✓ Assigned</span>
//               </div>

//               {!activeStaff ? (
//                 <p className="text-[14px] text-[var(--ink-soft)]">
//                   A rider has been designated and is finalizing pickup routes. Full contact information will appear momentarily.
//                 </p>
//               ) : (
//                 <>
//                   <div className="flex items-center justify-between gap-3">
//                     <div className="flex min-w-0 items-center gap-3">
//                       <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/15 text-[var(--gold)]">
//                         {isLaundry ? <Bike size={22} /> : <HardHat size={22} />}
//                       </span>
//                       <div className="min-w-0">
//                         <p className="truncate text-[15px] font-bold">{activeStaff.displayName}</p>
//                         <p className="text-[12px] text-[var(--ink-soft)]">{roleTitle}</p>
//                       </div>
//                     </div>
//                     {activeStaff.phoneNumber && (
//                       <a
//                         href={`tel:${activeStaff.phoneNumber}`}
//                         className="flex shrink-0 items-center gap-1.5 rounded-xl bg-green-500 px-3.5 py-2 text-[13px] font-bold text-white shadow-md shadow-green-500/25 hover:bg-green-600"
//                       >
//                         <Phone size={16} /> Call
//                       </a>
//                     )}
//                   </div>

//                   <div className="mt-3 space-y-1.5 border-t border-[var(--line)] pt-3 text-[13px]">
//                     {activeStaff.phoneNumber && (
//                       <p className="flex items-center gap-2 font-semibold">
//                         <Phone size={16} className="text-[var(--ink-soft)]" /> {activeStaff.phoneNumber}
//                       </p>
//                     )}
//                     {(activeStaff.vehicleType || activeStaff.vehicleNumber) && (
//                       <p className="flex items-center gap-2 text-[var(--ink-soft)]">
//                         <Car size={16} /> Vehicle:{" "}
//                         <span className="font-semibold text-[var(--ink)]">
//                           {activeStaff.vehicleType || "Two Wheeler"}
//                           {activeStaff.vehicleNumber ? ` (${activeStaff.vehicleNumber})` : ""}
//                         </span>
//                       </p>
//                     )}
//                     <p className="mt-1 flex items-start gap-2 rounded-xl bg-[var(--ink)]/[0.04] p-2.5 text-[var(--ink-soft)]">
//                       <Info size={16} className="mt-0.5 shrink-0 text-[var(--gold)]" />
//                       {staffInstructions}
//                     </p>
//                   </div>
//                 </>
//               )}
//             </section>
//           ) : isLaundry && (order.status === "CONFIRMED" || order.status === "PENDING") ? (
//             <section className={card}>
//               <div className="mb-3 flex items-center justify-between gap-3">
//                 <h3 className="flex items-center gap-2 text-[17px] font-semibold">
//                   <Bike size={20} /> Rider Assignment
//                 </h3>
//                 <span className={`rounded-md px-2 py-0.5 text-[11.5px] font-bold ${TONE.amber}`}>Finding Rider</span>
//               </div>
//               <p className="text-[13.5px] leading-[1.6] text-[var(--ink-soft)]">
//                 A Clean7 rider will be assigned to your pickup shortly. You will be able to view their name, phone number, and vehicle details directly here.
//               </p>
//             </section>
//           ) : null}

//           {/* External note */}
//           {order.specialInstructions && (
//             <section className={card}>
//               <h3 className="mb-3 text-[17px] font-semibold">External Note</h3>
//               <p className="rounded-xl bg-[var(--ink)]/[0.04] p-3 text-[14px]">{order.specialInstructions}</p>
//             </section>
//           )}

//           {/* Attachments (proof photos) */}
//           {!!order.proofArtifacts?.length && (
//             <section className={card}>
//               <h3 className="mb-3 text-[17px] font-semibold">Attachments</h3>
//               <div className="grid grid-cols-2 gap-3">
//                 {order.proofArtifacts.map((p) => (
//                   <figure key={p.id} className="overflow-hidden rounded-xl border border-[var(--line)]">
//                     {/* eslint-disable-next-line @next/next/no-img-element */}
//                     <img
//                       src={p.assetUrl || `${BASE_URL}/assets/${p.storageKey}`}
//                       alt={p.type}
//                       className="aspect-square w-full object-cover"
//                     />
//                     <figcaption className="px-2.5 py-1.5 text-[12px] font-semibold text-[var(--ink-soft)]">
//                       {p.type === "BEFORE" ? "Before Service" : p.type === "AFTER" ? "After Service" : p.type}
//                     </figcaption>
//                   </figure>
//                 ))}
//               </div>
//             </section>
//           )}

//           {canReview && (
//             <section className={card}>
//               <h3 className="mb-2 font-semibold">Rate your service</h3>
//               <div className="mb-3 flex gap-1" role="radiogroup" aria-label="Rating">
//                 {[1, 2, 3, 4, 5].map((n) => (
//                   <button key={n} type="button" aria-label={`${n} star`} onClick={() => setRating(n)}
//                     className={`text-[28px] ${n <= rating ? "text-[var(--gold)]" : "text-[var(--ink)]/20"}`}>★</button>
//                 ))}
//               </div>
//               <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={3} placeholder="Tell us more (optional)"
//                 className="w-full rounded-xl border border-transparent bg-[var(--ink)]/5 px-4 py-3 text-[15px] focus:border-[var(--gold)] focus:outline-none" />
//               <button disabled={!rating || reviewing}
//                 onClick={() => void review({ orderId: order.id, rating, description: comment.trim() }).unwrap().then(() => toast.success("Thanks for your review!")).catch(() => {})}
//                 className="mt-3 rounded-full bg-[var(--gold)] px-6 py-2.5 font-semibold text-white disabled:opacity-50">
//                 Submit review
//               </button>
//             </section>
//           )}

//           {canCancel && (
//             <button disabled={cancelling}
//               onClick={() => { if (confirm("Are you sure you want to cancel this order?")) void cancel({ orderId: order.id, idempotencyKey: newIdempotencyKey() }).unwrap().then(() => toast.success("Order cancelled.")).catch(() => {}); }}
//               className="w-full rounded-full border border-red-400/50 px-8 py-3 font-semibold text-red-400 hover:bg-red-400/5 disabled:opacity-50">
//               {cancelling ? "Cancelling…" : "Cancel order"}
//             </button>
//           )}
//         </div>
//       )}
//     </BookingShell>
//   );
// }

// function Line({ k, v, bold, multiline }: { k: string; v: string; bold?: boolean; multiline?: boolean }) {
//   return (
//     <div className="flex justify-between gap-4">
//       <dt className="text-[var(--ink-soft)]">{k}</dt>
//       <dd className={`min-w-0 text-right ${multiline ? "whitespace-pre-line" : "break-all"} ${bold ? "font-bold" : ""}`}>{v}</dd>
//     </div>
//   );
// }


"use client";

import BackLink from "@/app/components/ui/BackLink";
import { use, useState } from "react";
import {
  ArrowLeft,
  Bike,
  Car,
  CheckCircle2,
  Clock3,
  FileText,
  HardHat,
  Info,
  Loader2,
  Phone,
  RotateCcw,
  Wallet,
  AlertCircle,
  XCircle,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

import BookingShell from "@/app/components/booking/BookingShell";
import { PageSkeleton } from "@/app/components/booking/BookingSkeleton";
import { useRequireAuth } from "@/app/hooks/useBookingAuth";
import { useRazorpay } from "@/app/hooks/useRazorpay";
import { SLOTS, newIdempotencyKey, rupee } from "@/app/lib/booking";
import { BASE_URL } from "@/lib/constants";
import { useAppSelector } from "@/redux/hooks";
import {
  useCancelOrderMutation,
  useCreateReviewMutation,
  useGetOrderByIdQuery,
  useInitiateOrderPaymentMutation,
  useVerifyOrderPaymentMutation,
  type Order,
  type OrderStatus,
} from "@/redux/api/orderApi";

const card = "rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4 sm:p-5";
const money = (v?: string | number | null) => rupee(Math.round(Number(v) || 0));
const time = (iso?: string | null) =>
  iso
    ? new Date(iso).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
    : "";
const dateTime = (iso?: string | null) =>
  iso
    ? new Date(iso).toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : null;

/** Activity timeline - identical steps/wording to the mobile app. */
const TIMELINE_STEPS = [
  { key: "placed", label: "Order Placed", description: "We have received your booking." },
  { key: "confirmed", label: "Pickup assigned / confirmed", description: "Your schedule has been confirmed." },
  { key: "in_progress", label: "Pickup completed", description: "Your items have been picked up." },
  { key: "received", label: "Received at branch", description: "Your items are at the facility." },
  { key: "processing", label: "Laundry in process", description: "Your order is being worked on." },
  { key: "ready", label: "Ready for delivery", description: "Your items are ready to be returned." },
  { key: "out_for_delivery", label: "Out for delivery", description: "Final handoff is in progress." },
  { key: "delivered", label: "Delivered", description: "Your order has been completed." },
];
const STATUS_TO_STEP: Record<OrderStatus, number> = {
  PENDING: 0, CONFIRMED: 1, IN_PROGRESS: 2, RECEIVED_AT_BRANCH: 3, PROCESSING: 4,
  READY_FOR_DELIVERY: 5, OUT_FOR_DELIVERY: 6, DELIVERED: 7, COMPLETED: 7,
  CANCELLED: -1, PICKUP_FAILED: -1, DELIVERY_FAILED: -1,
};
const SLOT_LABELS: Record<string, string> = {
  MORNING: "Morning (8 AM – 12 PM)",
  AFTERNOON: "Afternoon (12 PM – 4 PM)",
  EVENING: "Evening (4 PM – 8 PM)",
};
const dateOnly = (iso?: string | null) =>
  iso && !isNaN(new Date(iso).getTime())
    ? new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "";

type Tone = "green" | "amber" | "red" | "blue" | "grey";
const TONE: Record<Tone, string> = {
  green: "bg-green-500/15 text-green-600",
  amber: "bg-amber-500/15 text-amber-600",
  red: "bg-red-500/15 text-red-500",
  blue: "bg-blue-500/15 text-blue-500",
  grey: "bg-[var(--ink)]/10 text-[var(--ink-soft)]",
};

/** Same payment states / wording as the mobile app's Payment Details card. */
function paymentInfo(o: Order) {
  const method =
    o.paymentMethod === "COD"
      ? "Cash on Delivery"
      : o.paymentMethod === "RAZORPAY"
        ? "Online Payment (Razorpay)"
        : o.paymentMethod || "Online Payment";
  const total = money(o.grandTotalAmount);
  const paidAttempt = o.paymentAttempts?.find((a) => a.status === "PAID");
  const txnId =
    paidAttempt?.providerPaymentId || o.paymentAttempts?.[0]?.providerPaymentId || null;
  const when = dateTime(
    o.paymentSettledAt || paidAttempt?.verifiedAt || (o.paymentStatus === "PAID" ? o.createdAt : null),
  );

  switch (o.paymentStatus) {
    case "PAID":
      return { badge: "Payment Successful", tone: "green" as Tone, Icon: CheckCircle2, headline: "Payment Received",
        text: `Payment of ${total} was successfully received via ${method}. Your booking is confirmed.`, method, txnId, when };
    case "PENDING":
      return { badge: "Payment Pending", tone: "amber" as Tone, Icon: Clock3, headline: "Payment Pending",
        text: `Payment of ${total} is awaiting completion. Please pay now to confirm your service.`, method, txnId: null, when: null };
    case "FAILED":
      return { badge: "Payment Failed", tone: "red" as Tone, Icon: XCircle, headline: "Payment Unsuccessful",
        text: `The payment attempt for ${total} could not be completed. Please retry your payment.`, method, txnId: null, when: null };
    case "REFUNDED":
      return { badge: "Refund Processed", tone: "blue" as Tone, Icon: RotateCcw, headline: "Refund Processed",
        text: `A refund of ${total} has been processed back to your original payment method.`, method, txnId, when };
    case "COD_PENDING_COLLECTION":
      return { badge: "Cash on Delivery", tone: "amber" as Tone, Icon: Wallet, headline: "Pay Upon Service",
        text: `Please keep ${total} in cash ready to pay your service professional upon delivery.`, method: "Cash on Delivery (COD)", txnId: null, when: null };
    case "COD_COLLECTED":
      return { badge: "Cash Collected", tone: "green" as Tone, Icon: CheckCircle2, headline: "Cash Payment Received",
        text: `Cash payment of ${total} was collected by your Clean7 professional.`, method: "Cash on Delivery (COD)", txnId: null, when };
    default:
      return { badge: String(o.paymentStatus || "Unknown"), tone: "grey" as Tone, Icon: Info, headline: "Payment Status",
        text: `Status: ${o.paymentStatus}`, method, txnId: null, when: null };
  }
}

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = use(params);
  const { allowed } = useRequireAuth();
  const user = useAppSelector((s) => s.auth.user);
  const token = useAppSelector((s) => s.auth.token);
  const { data, isLoading } = useGetOrderByIdQuery(orderId, { skip: !allowed });
  const order = data?.data;

  const [cancel, { isLoading: cancelling }] = useCancelOrderMutation();
  const [initPay] = useInitiateOrderPaymentMutation();
  const [verify] = useVerifyOrderPaymentMutation();
  const [review, { isLoading: reviewing }] = useCreateReviewMutation();
  const { openCheckout } = useRazorpay();
  const [paying, setPaying] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const canCancel = order && (order.status === "PENDING" || order.status === "CONFIRMED");
  const showRetryPayment =
    !!order &&
    order.status !== "CANCELLED" &&
    order.paymentMethod === "RAZORPAY" &&
    (order.paymentStatus === "PENDING" || order.paymentStatus === "FAILED");
  const canReview =
    order && (order.status === "COMPLETED" || order.status === "DELIVERED") && !order.review;

  async function retryPayment() {
    if (!order) return;
    setPaying(true);
    try {
      const res = await initPay({ orderId: order.id, idempotencyKey: newIdempotencyKey() }).unwrap();
      const co = res.data?.checkout;
      if (!co) throw new Error("no checkout");
      const verifyKey = newIdempotencyKey();
      await openCheckout({
        key: co.key,
        razorpayOrderId: co.orderId,
        amount: co.amount,
        currency: co.currency,
        description: `Order ${co.orderNumber}`,
        prefill: { name: user?.name, email: user?.email, contact: user?.phone },
        onSuccess: async (r) => {
          try {
            await verify({
              orderId: order.id,
              razorpayOrderId: r.razorpay_order_id,
              razorpayPaymentId: r.razorpay_payment_id,
              razorpaySignature: r.razorpay_signature,
              idempotencyKey: verifyKey,
            }).unwrap();
            toast.success("Payment completed.");
          } catch {
            toast.error("Payment couldn't be verified. If you were charged, contact support.");
          } finally {
            setPaying(false);
          }
        },
        onFailure: (m) => toast.error(m),
        onDismiss: () => setPaying(false),
      });
    } catch {
      setPaying(false);
    }
  }

  function downloadInvoice() {
    if (!order) return;
    // same URL the mobile app opens
    window.open(
      `${BASE_URL}/orders/${order.id}/invoice?token=${encodeURIComponent(token || "")}`,
      "_blank",
      "noopener",
    );
  }

  const isLaundry =
    !!order &&
    (order.serviceMode === "PICKUP_DELIVERY" ||
      order.fulfillmentType === "PICKUP_SERVICE" ||
      order.scheduleLabelKey === "pickup_time" ||
      [order.serviceCategoryCode, order.serviceSlug, order.serviceCode].some((v) =>
        String(v ?? "").toLowerCase().includes("laundry"),
      ));

  const showExpress =
    !!order &&
    order.bookingType === "ASAP" &&
    !["CANCELLED", "PICKUP_FAILED", "DELIVERY_FAILED"].includes(order.status);

  const expressFee = Number(
    order?.expressFeeAmount ||
      (order?.bookingType === "ASAP" && Number(order.grandTotalAmount) > 0 ? "70" : "0"),
  );
  const invoiceReady = order?.paymentStatus === "PAID" || order?.paymentStatus === "COD_COLLECTED";
  const pay = order ? paymentInfo(order) : null;

  const slot = !order
    ? ""
    : order.bookingType === "ASAP"
      ? "Express (Within 2 Hours)"
      : order.scheduledSlot
        ? `${order.scheduledSlot.label} (${order.scheduledSlot.startTime} – ${order.scheduledSlot.endTime})`
        : order.scheduledSlotCode
          ? SLOT_LABELS[order.scheduledSlotCode] || order.scheduledSlotCode.replace(/_/g, " ")
          : "Scheduled";

  const currentStep = order ? STATUS_TO_STEP[order.status] ?? 0 : 0;
  const isDeliveryPhase =
    !!order && ["READY_FOR_DELIVERY", "OUT_FOR_DELIVERY", "DELIVERED"].includes(order.status);
  const hasStaff = order
    ? isLaundry
      ? !!(order.pickupRider || order.deliveryRider || order.pickupRiderAuthUserId)
      : !!order.assignedOperator
    : false;
  const activeStaff = !order
    ? null
    : isDeliveryPhase
      ? order.deliveryRider || order.pickupRider || order.assignedOperator
      : order.pickupRider || order.assignedOperator || order.deliveryRider;
  const roleTitle = isDeliveryPhase ? "Delivery Rider" : isLaundry ? "Pickup Rider" : "Service Professional";
  const staffInstructions = !order
    ? ""
    : isDeliveryPhase
      ? order.status === "OUT_FOR_DELIVERY"
        ? "Your rider is on the way to deliver your fresh laundry to your doorstep."
        : order.status === "DELIVERED"
          ? "Your laundry was successfully delivered."
          : "Your rider is assigned and will deliver your order soon."
      : order.status === "IN_PROGRESS" || order.status === "RECEIVED_AT_BRANCH"
        ? "Your laundry has been picked up and is at our branch facility."
        : "Your rider will arrive at your address to collect your laundry. Please have items ready.";
  const addr = order?.serviceAddressSnapshot;

  return (
    <BookingShell>
      <BackLink fallback="/my-orders" className="mb-8 inline-flex items-center gap-1.5 text-[14px] font-medium text-[var(--ink-soft)] hover:text-[var(--ink)]">
        <ArrowLeft size={16} /> Back
      </BackLink>

      {!allowed || isLoading ? (
        <PageSkeleton variant="options" />
      ) : !order || !pay ? (
        <p className="py-16 text-center text-[var(--ink-soft)]">Order not found.</p>
      ) : (
        <div className="mx-auto max-w-[760px] space-y-5">
          {/* <div>
            <h2 className="text-[30px]" style={{ fontFamily: "var(--font-fraunces)" }}>
              Order Details
            </h2>
            <p className="text-[14px] text-[var(--ink-soft)]">#{order.orderNumber}</p>
          </div> */}

          {/* Express booking (ASAP) */}
          {showExpress && (
            <section className="rounded-2xl border border-[var(--gold)]/30 bg-[var(--gold)]/5 p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <Zap size={24} className="mt-0.5 shrink-0 text-[var(--gold)]" />
                <div className="text-[14px] leading-[1.6]">
                  <p className="text-[15px] font-bold">Express Booking</p>
                  <p className="text-[var(--ink-soft)]">
                    {isLaundry
                      ? "Your laundry pickup is scheduled. Our team will arrive within 2 hours. Please have your laundry ready."
                      : "Your Clean7 professional will arrive within 2 hours. Please be available at the service address."}
                  </p>
                  {order.promisedArrivalFrom && order.promisedArrivalTo && (
                    <p className="mt-2 text-[13px] font-semibold text-[var(--gold)]">
                      Expected arrival: {time(order.promisedArrivalFrom)} – {time(order.promisedArrivalTo)}
                    </p>
                  )}
                  {order.actualArrivalTime && (
                    <p className="mt-1.5 text-[13px] font-semibold text-green-600">
                      ✓ Arrived at {time(order.actualArrivalTime)}
                    </p>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Items & Invoice */}
          <section className={card}>
            <h3 className="mb-3 text-[17px] font-semibold">Items &amp; Invoice</h3>
            <table className="w-full text-[14px]">
              <thead>
                <tr className="border-b border-[var(--line)] text-left text-[12px] uppercase tracking-wide text-[var(--ink-soft)]">
                  <th className="pb-2 font-medium">Item</th>
                  <th className="pb-2 text-center font-medium">Qty</th>
                  <th className="pb-2 text-right font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items?.map((i) => (
                  <tr key={i.id} className="border-b border-[var(--line)]/60 last:border-0">
                    <td className="py-2.5 pr-2">
                      <span className="font-medium">{i.itemName}</span>
                      {i.serviceName && (
                        <span className="block text-[12px] text-[var(--ink-soft)]">{i.serviceName}</span>
                      )}
                    </td>
                    <td className="py-2.5 text-center">{Number(i.quantity)}</td>
                    <td className="py-2.5 text-right">{money(i.lineTotal)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <dl className="mt-3 space-y-1.5 border-t border-[var(--line)] pt-3 text-[14px]">
              <div className="flex justify-between"><dt className="text-[var(--ink-soft)]">Sub Total</dt><dd>{money(order.subtotalAmount)}</dd></div>
              {order.addOns?.map((a) => (
                <div key={a.id} className="flex justify-between">
                  <dt className="text-[var(--ink-soft)]">{a.name} (x{Number(a.quantity)})</dt>
                  <dd>{money(a.lineTotal)}</dd>
                </div>
              ))}
              {Number(order.discountAmount) > 0 && (
                <div className="flex justify-between text-[var(--gold)]"><dt>Coupon Discount</dt><dd>-{money(order.discountAmount)}</dd></div>
              )}
              <div className="flex justify-between"><dt className="text-[var(--ink-soft)]">GST</dt><dd>+{money(order.taxAmount)}</dd></div>
              {Number(order.deliveryChargeAmount) > 0 && (
                <div className="flex justify-between"><dt className="text-[var(--ink-soft)]">Delivery Charge</dt><dd>+{money(order.deliveryChargeAmount)}</dd></div>
              )}
              {Number(order.codChargeAmount) > 0 && (
                <div className="flex justify-between"><dt className="text-[var(--ink-soft)]">COD Charge</dt><dd>+{money(order.codChargeAmount)}</dd></div>
              )}
              {expressFee > 0 && (
                <div className="flex justify-between"><dt className="text-[var(--ink-soft)]">⚡ Express Booking Fee</dt><dd>+{money(expressFee)}</dd></div>
              )}
              <div className="flex justify-between border-t border-[var(--line)] pt-3 text-[17px] font-bold">
                <dt>Total</dt><dd>{money(order.grandTotalAmount)}</dd>
              </div>
            </dl>

            {invoiceReady ? (
              <button
                type="button"
                onClick={downloadInvoice}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--gold)] py-3 text-[15px] font-bold text-white hover:bg-[var(--gold-bright)]"
              >
                <FileText size={18} /> Download Order Invoice
              </button>
            ) : (
              <div className="mt-4 flex items-start gap-2 rounded-xl border border-[var(--line)] bg-[var(--ink)]/[0.03] px-4 py-3 text-[13px] text-[var(--ink-soft)]">
                <Info size={18} className="mt-px shrink-0" />
                {order.paymentMethod === "COD"
                  ? "Tax invoice will be available after cash payment is completed on delivery."
                  : "Tax invoice will be available after payment is completed."}
              </div>
            )}
          </section>

          {/* Payment Details */}
          <section className={card}>
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="text-[17px] font-semibold">Payment Details</h3>
              <span className={`rounded-lg px-2.5 py-1 text-[12px] font-bold ${TONE[pay.tone]}`}>{pay.badge}</span>
            </div>

            <div className="mb-3 flex items-start gap-3 rounded-xl border border-[var(--line)] bg-[var(--ink)]/[0.03] p-3">
              <pay.Icon size={22} className="mt-0.5 shrink-0 text-[var(--gold)]" />
              <div className="text-[14px]">
                <p className="font-semibold">{pay.headline}</p>
                <p className="mt-0.5 text-[var(--ink-soft)]">{pay.text}</p>
              </div>
            </div>

            <dl className="space-y-2 text-[14px]">
              <Line k="Payment Status" v={pay.badge} />
              <Line k="Payment Method" v={pay.method} />
              <Line k="Total Amount" v={money(order.grandTotalAmount)} bold />
              {pay.when && <Line k="Payment Date" v={pay.when} />}
              {pay.txnId && <Line k="Transaction ID" v={pay.txnId} />}
            </dl>

            {showRetryPayment && (
              <button
                type="button"
                onClick={() => void retryPayment()}
                disabled={paying}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--gold)] px-8 py-3.5 font-semibold text-white hover:bg-[var(--gold-bright)] disabled:opacity-50"
              >
                {paying && <Loader2 size={18} className="animate-spin" />}
                Pay Now • {money(order.grandTotalAmount)}
              </button>
            )}
          </section>

          {/* Activity */}
          {currentStep >= 0 && (
            <section className={card}>
              <h3 className="mb-4 text-[17px] font-semibold">Activity</h3>
              <ol>
                {TIMELINE_STEPS.slice(0, currentStep + 1).map((step, i) => {
                  const current = i === currentStep && currentStep < TIMELINE_STEPS.length - 1;
                  const last = i === currentStep;
                  return (
                    <li key={step.key} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <span
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                            current
                              ? "border-[var(--gold)] bg-[var(--gold)]/20"
                              : "border-green-500 bg-green-500/20"
                          }`}
                        >
                          <span className={`h-2 w-2 rounded-full ${current ? "bg-[var(--gold)]" : "bg-green-500"}`} />
                        </span>
                        {!last && <span className="my-1 w-0.5 flex-1 bg-green-500/50" />}
                      </div>
                      <div className={`text-[14px] ${last ? "" : "pb-4"}`}>
                        <p className="font-semibold">{step.label}</p>
                        <p className="text-[13px] text-[var(--ink-soft)]">{step.description}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </section>
          )}

          {/* Customer Details */}
          <section className={card}>
            <h3 className="mb-3 text-[17px] font-semibold">Customer Details</h3>
            <dl className="space-y-2 text-[14px]">
              <Line k="Order Number" v={`#${order.orderNumber}`} />
              <Line k="Name" v={user?.name || "Guest"} />
              <Line k="Phone" v={user?.phone || "N/A"} />
              <Line k="Order Placed" v={dateTime(order.createdAt) || ""} />
              <Line
                k="Scheduled Slot"
                v={
                  order.bookingType === "ASAP"
                    ? `⚡ Express (Within 2 Hours)${order.createdAt ? ` • ${dateOnly(order.createdAt)}` : ""}`
                    : `${dateOnly(order.scheduledDate || order.createdAt)}, ${slot}`
                }
              />
              {addr && (
                <Line
                  k="Address"
                  v={`${addr.line1}${addr.line2 ? `, ${addr.line2}` : ""}\n${addr.city}${addr.state ? `, ${addr.state}` : ""} ${addr.postalCode}`}
                  multiline
                />
              )}
            </dl>
          </section>

          {/* Cancelled / interrupted */}
          {currentStep < 0 && (
            <section className="flex items-center gap-3 rounded-2xl border border-red-500/30 bg-red-500/5 p-4 sm:p-5">
              <AlertCircle size={24} className="shrink-0 text-red-500" />
              <div>
                <p className="text-[15px] font-bold text-red-500">
                  {order.status === "CANCELLED" ? "Order Cancelled" : "Order Interrupted"}
                </p>
                <p className="text-[13px] text-[var(--ink-soft)]">
                  {order.status === "PICKUP_FAILED"
                    ? "Pickup could not be completed."
                    : order.status === "DELIVERY_FAILED"
                      ? "Delivery could not be completed."
                      : "This order was cancelled."}
                </p>
              </div>
            </section>
          )}

          {/* Rider / professional assignment */}
          {hasStaff ? (
            <section className={card}>
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="flex items-center gap-2 text-[17px] font-semibold">
                  {isLaundry ? <Bike size={20} /> : <HardHat size={20} />}
                  {isLaundry
                    ? isDeliveryPhase ? "Delivery Rider Details" : "Pickup Rider Details"
                    : "Assigned Professional"}
                </h3>
                <span className={`rounded-md px-2 py-0.5 text-[11.5px] font-bold ${TONE.green}`}>✓ Assigned</span>
              </div>

              {!activeStaff ? (
                <p className="text-[14px] text-[var(--ink-soft)]">
                  A rider has been designated and is finalizing pickup routes. Full contact information will appear momentarily.
                </p>
              ) : (
                <>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/15 text-[var(--gold)]">
                        {isLaundry ? <Bike size={22} /> : <HardHat size={22} />}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-[15px] font-bold">{activeStaff.displayName}</p>
                        <p className="text-[12px] text-[var(--ink-soft)]">{roleTitle}</p>
                      </div>
                    </div>
                    {activeStaff.phoneNumber && (
                      <a
                        href={`tel:${activeStaff.phoneNumber}`}
                        className="flex shrink-0 items-center gap-1.5 rounded-xl bg-green-500 px-3.5 py-2 text-[13px] font-bold text-white shadow-md shadow-green-500/25 hover:bg-green-600"
                      >
                        <Phone size={16} /> Call
                      </a>
                    )}
                  </div>

                  <div className="mt-3 space-y-1.5 border-t border-[var(--line)] pt-3 text-[13px]">
                    {activeStaff.phoneNumber && (
                      <p className="flex items-center gap-2 font-semibold">
                        <Phone size={16} className="text-[var(--ink-soft)]" /> {activeStaff.phoneNumber}
                      </p>
                    )}
                    {(activeStaff.vehicleType || activeStaff.vehicleNumber) && (
                      <p className="flex items-center gap-2 text-[var(--ink-soft)]">
                        <Car size={16} /> Vehicle:{" "}
                        <span className="font-semibold text-[var(--ink)]">
                          {activeStaff.vehicleType || "Two Wheeler"}
                          {activeStaff.vehicleNumber ? ` (${activeStaff.vehicleNumber})` : ""}
                        </span>
                      </p>
                    )}
                    <p className="mt-1 flex items-start gap-2 rounded-xl bg-[var(--ink)]/[0.04] p-2.5 text-[var(--ink-soft)]">
                      <Info size={16} className="mt-0.5 shrink-0 text-[var(--gold)]" />
                      {staffInstructions}
                    </p>
                  </div>
                </>
              )}
            </section>
          ) : isLaundry && (order.status === "CONFIRMED" || order.status === "PENDING") ? (
            <section className={card}>
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="flex items-center gap-2 text-[17px] font-semibold">
                  <Bike size={20} /> Rider Assignment
                </h3>
                <span className={`rounded-md px-2 py-0.5 text-[11.5px] font-bold ${TONE.amber}`}>Finding Rider</span>
              </div>
              <p className="text-[13.5px] leading-[1.6] text-[var(--ink-soft)]">
                A Clean7 rider will be assigned to your pickup shortly. You will be able to view their name, phone number, and vehicle details directly here.
              </p>
            </section>
          ) : null}

          {/* External note */}
          {order.specialInstructions && (
            <section className={card}>
              <h3 className="mb-3 text-[17px] font-semibold">External Note</h3>
              <p className="rounded-xl bg-[var(--ink)]/[0.04] p-3 text-[14px]">{order.specialInstructions}</p>
            </section>
          )}

          {/* Attachments (proof photos) */}
          {!!order.proofArtifacts?.length && (
            <section className={card}>
              <h3 className="mb-3 text-[17px] font-semibold">Attachments</h3>
              <div className="grid grid-cols-2 gap-3">
                {order.proofArtifacts.map((p) => (
                  <figure key={p.id} className="overflow-hidden rounded-xl border border-[var(--line)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.assetUrl || `${BASE_URL}/assets/${p.storageKey}`}
                      alt={p.type}
                      className="aspect-square w-full object-cover"
                    />
                    <figcaption className="px-2.5 py-1.5 text-[12px] font-semibold text-[var(--ink-soft)]">
                      {p.type === "BEFORE" ? "Before Service" : p.type === "AFTER" ? "After Service" : p.type}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )}

          {canReview && (
            <section className={card}>
              <h3 className="mb-2 font-semibold">Rate your service</h3>
              <div className="mb-3 flex gap-1" role="radiogroup" aria-label="Rating">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} type="button" aria-label={`${n} star`} onClick={() => setRating(n)}
                    className={`text-[28px] ${n <= rating ? "text-[var(--gold)]" : "text-[var(--ink)]/20"}`}>★</button>
                ))}
              </div>
              <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={3} placeholder="Tell us more (optional)"
                className="w-full rounded-xl border border-transparent bg-[var(--ink)]/5 px-4 py-3 text-[15px] focus:border-[var(--gold)] focus:outline-none" />
              <button disabled={!rating || reviewing}
                onClick={() => void review({ orderId: order.id, rating, description: comment.trim() }).unwrap().then(() => toast.success("Thanks for your review!")).catch(() => {})}
                className="mt-3 rounded-full bg-[var(--gold)] px-6 py-2.5 font-semibold text-white disabled:opacity-50">
                Submit review
              </button>
            </section>
          )}

          {canCancel && (
            <button disabled={cancelling}
              onClick={() => { if (confirm("Are you sure you want to cancel this order?")) void cancel({ orderId: order.id, idempotencyKey: newIdempotencyKey() }).unwrap().then(() => toast.success("Order cancelled.")).catch(() => {}); }}
              className="w-full rounded-full border border-red-400/50 px-8 py-3 font-semibold text-red-400 hover:bg-red-400/5 disabled:opacity-50">
              {cancelling ? "Cancelling…" : "Cancel order"}
            </button>
          )}
        </div>
      )}
    </BookingShell>
  );
}

function Line({ k, v, bold, multiline }: { k: string; v: string; bold?: boolean; multiline?: boolean }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-[var(--ink-soft)]">{k}</dt>
      <dd className={`min-w-0 text-right ${multiline ? "whitespace-pre-line" : "break-all"} ${bold ? "font-bold" : ""}`}>{v}</dd>
    </div>
  );
}