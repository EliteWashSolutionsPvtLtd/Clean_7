

// "use client";

// import { Suspense, useEffect, useState } from "react";
// import Link from "next/link";
// import { useSearchParams } from "next/navigation";
// import { CheckCircle2, Clock3, XCircle } from "lucide-react";

// import BookingShell from "@/app/components/booking/BookingShell";
// import { useRequireAuth } from "@/app/hooks/useBookingAuth";
// import { rupee } from "@/app/lib/booking";
// import { useGetOrderByIdQuery } from "@/redux/api/orderApi";

// function Success() {
//   const sp = useSearchParams();
//   const orderId = sp.get("orderId") ?? "";
//   const fallbackNumber = sp.get("orderNumber") ?? "";
//   const multi = sp.get("multi") === "1";
//   const { allowed } = useRequireAuth();

//   // Payment may still be settling after confirm → poll every 5s until PAID/FAILED
//   const [settled, setSettled] = useState(false);
//   const { data } = useGetOrderByIdQuery(orderId, {
//     skip: !allowed || !orderId,
//     pollingInterval: settled ? 0 : 5000,
//     skipPollingIfUnfocused: true,
//   });
//   const order = data?.data;
//   const pay = order?.paymentStatus;
//   useEffect(() => {
//     // COD orders never turn PAID until cash is collected -> stop polling for them too
//     if (pay === "PAID" || pay === "FAILED" || pay === "COD_PENDING_COLLECTION" || pay === "COD_COLLECTED") setSettled(true);
//   }, [pay]);

//   const Icon = pay === "FAILED" ? XCircle : pay === "PAID" || !order ? CheckCircle2 : Clock3;
//   const title =
//     pay === "FAILED"
//       ? "Payment failed"
//       : pay === "PAID"
//         ? "Booking confirmed"
//         : "Booking received";
//   const number = order?.orderNumber || fallbackNumber;

//   return (
//     <div className="mx-auto max-w-[520px] rounded-2xl border border-[var(--line)] bg-[var(--card)] p-8 text-center">
//       <Icon size={56} className="mx-auto text-[var(--gold)]" />
//       <h2 className="mt-4 text-[30px]" style={{ fontFamily: "var(--font-fraunces)" }}>
//         {title}
//       </h2>
//       {number && <p className="mt-1 text-[var(--ink-soft)]">Order #{number}</p>}
//       {multi && (
//         <p className="mt-3 text-[14px] text-[var(--ink-soft)]">
//           Your cart had several services, so they were booked as separate
//           orders with one payment. Find all of them in My Orders.
//         </p>
//       )}
//       {!settled && order && (
//         <p className="mt-3 text-[14px] text-[var(--ink-soft)]">Confirming your payment…</p>
//       )}
//       {order?.grandTotalAmount && (
//         <p className="mt-3 text-[18px] font-semibold">{rupee(Number(order.grandTotalAmount))}</p>
//       )}
//       {order?.serviceAddressSnapshot && (
//         <p className="mt-3 text-[14px] text-[var(--ink-soft)]">
//           {order.serviceAddressSnapshot.line1}, {order.serviceAddressSnapshot.city}{" "}
//           {order.serviceAddressSnapshot.postalCode}
//         </p>
//       )}
//       <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
//         {orderId && (
//           <Link
//             href={`/my-orders/${orderId}`}
//             className="rounded-full bg-[var(--gold)] px-6 py-3 text-[15px] font-semibold text-white hover:bg-[var(--gold-bright)]"
//           >
//             View order
//           </Link>
//         )}
//         <Link
//           href="/"
//           className="rounded-full border border-[var(--line)] px-6 py-3 text-[15px] font-semibold hover:bg-[var(--ink)]/5"
//         >
//           Back to home
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default function OrderSuccessPage() {
//   return (
//     <BookingShell>
//       <Suspense fallback={null}>
//         <Success />
//       </Suspense>
//     </BookingShell>
//   );
// }


// "use client";

// import { Suspense, useEffect, useState } from "react";
// import Link from "next/link";
// import { useSearchParams } from "next/navigation";
// import { CheckCircle2, Clock3, XCircle } from "lucide-react";

// import BookingShell from "@/app/components/booking/BookingShell";
// import { useRequireAuth } from "@/app/hooks/useBookingAuth";
// import { rupee } from "@/app/lib/booking";
// import { useGetOrderByIdQuery } from "@/redux/api/orderApi";

// function Success() {
//   const sp = useSearchParams();
//   const orderId = sp.get("orderId") ?? "";
//   const fallbackNumber = sp.get("orderNumber") ?? "";
//   const { allowed } = useRequireAuth();

//   // Payment may still be settling after confirm → poll every 5s until PAID/FAILED
//   const [settled, setSettled] = useState(false);
//   const { data } = useGetOrderByIdQuery(orderId, {
//     skip: !allowed || !orderId,
//     pollingInterval: settled ? 0 : 5000,
//     skipPollingIfUnfocused: true,
//   });
//   const order = data?.data;
//   const pay = order?.paymentStatus;
//   useEffect(() => {
//     if (pay === "PAID" || pay === "FAILED") setSettled(true);
//   }, [pay]);

//   const Icon = pay === "FAILED" ? XCircle : pay === "PAID" || !order ? CheckCircle2 : Clock3;
//   const title =
//     pay === "FAILED"
//       ? "Payment failed"
//       : pay === "PAID"
//         ? "Booking confirmed"
//         : "Booking received";
//   const number = order?.orderNumber || fallbackNumber;

//   return (
//     <div className="mx-auto max-w-[520px] rounded-2xl border border-[var(--line)] bg-[var(--card)] p-8 text-center">
//       <Icon size={56} className="mx-auto text-[var(--gold)]" />
//       <h2 className="mt-4 text-[30px]" style={{ fontFamily: "var(--font-fraunces)" }}>
//         {title}
//       </h2>
//       {number && <p className="mt-1 text-[var(--ink-soft)]">Order #{number}</p>}
//       {!settled && order && (
//         <p className="mt-3 text-[14px] text-[var(--ink-soft)]">Confirming your payment…</p>
//       )}
//       {order?.grandTotalAmount && (
//         <p className="mt-3 text-[18px] font-semibold">{rupee(Number(order.grandTotalAmount))}</p>
//       )}
//       {order?.serviceAddressSnapshot && (
//         <p className="mt-3 text-[14px] text-[var(--ink-soft)]">
//           {order.serviceAddressSnapshot.line1}, {order.serviceAddressSnapshot.city}{" "}
//           {order.serviceAddressSnapshot.postalCode}
//         </p>
//       )}
//       <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
//         {orderId && (
//           <Link
//             href={`/my-orders/${orderId}`}
//             className="rounded-full bg-[var(--gold)] px-6 py-3 text-[15px] font-semibold text-white hover:bg-[var(--gold-bright)]"
//           >
//             View order
//           </Link>
//         )}
//         <Link
//           href="/"
//           className="rounded-full border border-[var(--line)] px-6 py-3 text-[15px] font-semibold hover:bg-[var(--ink)]/5"
//         >
//           Back to home
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default function OrderSuccessPage() {
//   return (
//     <BookingShell>
//       <Suspense fallback={null}>
//         <Success />
//       </Suspense>
//     </BookingShell>
//   );
// }




"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, Clock3, XCircle } from "lucide-react";

import BookingShell from "@/app/components/booking/BookingShell";
import { useRequireAuth } from "@/app/hooks/useBookingAuth";
import { rupee } from "@/app/lib/booking";
import { useGetOrderByIdQuery } from "@/redux/api/orderApi";

function Success() {
  const sp = useSearchParams();
  const orderId = sp.get("orderId") ?? "";
  const fallbackNumber = sp.get("orderNumber") ?? "";
  const multi = sp.get("multi") === "1";
  const { allowed: loggedIn } = useRequireAuth();
  const router = useRouter();

  // Only open for an order that was just placed in this tab (checkout saves its id).
  // Anyone typing /order-success?... by hand is sent to My Orders instead.
  const [fromCheckout, setFromCheckout] = useState<boolean | null>(null);
  useEffect(() => {
    let ok = false;
    try {
      ok = !!orderId && sessionStorage.getItem("clean7_order_success") === orderId;
    } catch {
      /* storage blocked */
    }
    setFromCheckout(ok);
    if (!ok) router.replace("/my-orders");
  }, [orderId, router]);
  const allowed = loggedIn && fromCheckout === true;

  // Payment may still be settling after confirm → poll every 5s until PAID/FAILED
  const [settled, setSettled] = useState(false);
  const { data } = useGetOrderByIdQuery(orderId, {
    skip: !allowed || !orderId,
    pollingInterval: settled ? 0 : 5000,
    skipPollingIfUnfocused: true,
  });
  const order = data?.data;
  const pay = order?.paymentStatus;
  useEffect(() => {
    // COD orders never turn PAID until cash is collected -> stop polling for them too
    if (pay === "PAID" || pay === "FAILED" || pay === "COD_PENDING_COLLECTION" || pay === "COD_COLLECTED") setSettled(true);
  }, [pay]);

  if (!allowed) return null;

  const Icon = pay === "FAILED" ? XCircle : pay === "PAID" || !order ? CheckCircle2 : Clock3;
  const title =
    pay === "FAILED"
      ? "Payment failed"
      : pay === "PAID"
        ? "Booking confirmed"
        : "Booking received";
  const number = order?.orderNumber || fallbackNumber;

  return (
    <div className="mx-auto max-w-[520px] rounded-2xl border border-[var(--line)] bg-[var(--card)] p-8 text-center">
      <Icon size={56} className="mx-auto text-[var(--gold)]" />
      <h2 className="mt-4 text-[30px]" style={{ fontFamily: "var(--font-fraunces)" }}>
        {title}
      </h2>
      {number && <p className="mt-1 text-[var(--ink-soft)]">Order #{number}</p>}
      {multi && (
        <p className="mt-3 text-[14px] text-[var(--ink-soft)]">
          Your cart had several services, so they were booked as separate
          orders with one payment. Find all of them in My Orders.
        </p>
      )}
      {!settled && order && (
        <p className="mt-3 text-[14px] text-[var(--ink-soft)]">Confirming your payment…</p>
      )}
      {order?.grandTotalAmount && (
        <p className="mt-3 text-[18px] font-semibold">{rupee(Number(order.grandTotalAmount))}</p>
      )}
      {order?.serviceAddressSnapshot && (
        <p className="mt-3 text-[14px] text-[var(--ink-soft)]">
          {order.serviceAddressSnapshot.line1}, {order.serviceAddressSnapshot.city}{" "}
          {order.serviceAddressSnapshot.postalCode}
        </p>
      )}
      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
        {orderId && (
          <Link
            href={`/my-orders/${orderId}`}
            className="rounded-full bg-[var(--gold)] px-6 py-3 text-[15px] font-semibold text-white hover:bg-[var(--gold-bright)]"
          >
            View order
          </Link>
        )}
        <Link
          href="/"
          className="rounded-full border border-[var(--line)] px-6 py-3 text-[15px] font-semibold hover:bg-[var(--ink)]/5"
        >
          Back to home
        </Link>
      </div>
    </div>
    
  );
}

export default function OrderSuccessPage() {
  return (
    <BookingShell>
      <Suspense fallback={null}>
        <Success />
      </Suspense>
    </BookingShell>
  );
}