// "use client";

// import { useCallback, useEffect, useRef, useState } from "react";
// import { toast } from "sonner";
// import {
//   confirmedOrderId,
//   useConfirmRazorpayOrderMutation,
//   useInitiateRazorpayOrderMutation,
//   type BookingBody,
// } from "@/redux/api/orderApi";
// import { useRazorpay, type RazorpaySuccess } from "@/app/hooks/useRazorpay";
// import { newIdempotencyKey } from "@/app/lib/booking";
// import {
//   clearPendingPayment,
//   loadPendingPayment,
//   savePendingPayment,
//   type PendingPayment,
// } from "@/app/lib/pendingPayment";

// export type PlaceOrderStatus =
//   | "idle"
//   | "starting" // POST /orders/razorpay/initiate
//   | "paying" // Razorpay popup open
//   | "confirming" // POST /orders/razorpay/confirm
//   | "unconfirmed"; // paid, but server hasn't confirmed yet → keep retrying

// const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// /**
//  * Booking → pay flow, same as the mobile app:
//  *   initiate (gets pendingOrderToken + Razorpay checkout)
//  *   → Razorpay popup → confirm (token + payment ids) → order exists.
//  *
//  * Differences from the app: the payment ids are saved before confirm, so a
//  * refresh / closed tab / timeout can't lose a paid-but-unconfirmed order;
//  * confirm is retried with the SAME idempotency key (safe to repeat).
//  */
// export function usePlaceOrder(opts: {
//   onConfirmed: (orderId: string, orderNumber?: string) => void;
// }) {
//   const [status, setStatus] = useState<PlaceOrderStatus>("idle");
//   const [initiate] = useInitiateRazorpayOrderMutation();
//   const [confirm] = useConfirmRazorpayOrderMutation();
//   const { openCheckout } = useRazorpay();
//   const onConfirmed = useRef(opts.onConfirmed);
//   useEffect(() => {
//     onConfirmed.current = opts.onConfirmed;
//   });
//   const confirming = useRef(false);

//   const runConfirm = useCallback(
//     async (p: PendingPayment): Promise<boolean> => {
//       if (confirming.current) return false;
//       if (!p.razorpayOrderId || !p.razorpayPaymentId || !p.razorpaySignature) {
//         return false;
//       }
//       confirming.current = true;
//       setStatus("confirming");
//       try {
//         // Retry transient failures (timeout / 5xx / offline) - same key each time.
//         for (let attempt = 0; attempt < 4; attempt++) {
//           try {
//             const res = await confirm({
//               pendingOrderToken: p.pendingOrderToken,
//               razorpayOrderId: p.razorpayOrderId,
//               razorpayPaymentId: p.razorpayPaymentId,
//               razorpaySignature: p.razorpaySignature,
//               idempotencyKey: p.confirmKey,
//             }).unwrap();
//             const id = confirmedOrderId(res.data, p.fallbackOrderId);
//             clearPendingPayment();
//             setStatus("idle");
//             if (id) {
//               onConfirmed.current(
//                 id,
//                 res.data?.orderNumber || res.data?.order?.orderNumber || p.orderNumber,
//               );
//             } else {
//               toast.success("Payment confirmed. Check My Orders.");
//             }
//             return true;
//           } catch (e) {
//             const status = (e as { status?: unknown }).status;
//             const transient =
//               typeof status !== "number" || status >= 500 || status === 408;
//             if (!transient) break; // 4xx → retrying the same call won't help
//             await sleep(1500 * (attempt + 1));
//           }
//         }
//         setStatus("unconfirmed");
//         toast.error(
//           "Your payment went through but we couldn't confirm the order yet. Please don't pay again - we'll keep trying.",
//           { duration: 10000 },
//         );
//         return false;
//       } finally {
//         confirming.current = false;
//       }
//     },
//     [confirm],
//   );

//   /** Call on page load: finishes a payment that was paid but not confirmed. */
//   const recover = useCallback(async () => {
//     const p = loadPendingPayment();
//     if (!p) return;
//     if (p.stage === "paid") {
//       await runConfirm(p);
//     } else if (Date.now() - p.savedAt > 30 * 60 * 1000) {
//       clearPendingPayment(); // abandoned checkout, nothing was paid
//     }
//   }, [runConfirm]);

//   const placeOrder = useCallback(
//     async (
//       body: BookingBody,
//       prefill?: { name?: string; email?: string; contact?: string },
//     ) => {
//       if (status !== "idle") return;
//       setStatus("starting");

//       let init;
//       try {
//         // Errors are already toasted by the shared base query.
//         init = (
//           await initiate({
//             ...body,
//             idempotencyKey: newIdempotencyKey(),
//           }).unwrap()
//         ).data;
//       } catch {
//         setStatus("idle");
//         return;
//       }
//       if (!init?.pendingOrderToken || !init.checkout) {
//         setStatus("idle");
//         toast.error("Payment could not be started. Please try again.");
//         return;
//       }

//       const { checkout, pendingOrderToken } = init;
//       const pending: PendingPayment = {
//         stage: "initiated",
//         pendingOrderToken,
//         fallbackOrderId: init.orderId,
//         orderNumber: checkout.orderNumber,
//         confirmKey: newIdempotencyKey(),
//         savedAt: Date.now(),
//       };
//       savePendingPayment(pending);
//       setStatus("paying");

//       await openCheckout({
//         key: checkout.key,
//         razorpayOrderId: checkout.orderId,
//         amount: checkout.amount,
//         currency: checkout.currency,
//         description: `Order ${checkout.orderNumber}`,
//         prefill,
//         onSuccess: (r: RazorpaySuccess) => {
//           const paid: PendingPayment = {
//             ...pending,
//             stage: "paid",
//             razorpayOrderId: r.razorpay_order_id,
//             razorpayPaymentId: r.razorpay_payment_id,
//             razorpaySignature: r.razorpay_signature,
//           };
//           if (
//             !paid.razorpayOrderId ||
//             !paid.razorpayPaymentId ||
//             !paid.razorpaySignature
//           ) {
//             setStatus("idle");
//             toast.error(
//               "Payment details were incomplete. If you were charged, please contact support.",
//             );
//             return;
//           }
//           savePendingPayment(paid); // persist BEFORE confirming
//           void runConfirm(paid);
//         },
//         onFailure: (message) => toast.error(message),
//         onDismiss: () => {
//           clearPendingPayment();
//           setStatus("idle");
//           toast("Payment cancelled. Your booking was not placed.");
//         },
//       });
//     },
//     [initiate, openCheckout, runConfirm, status],
//   );

//   return { placeOrder, recover, status, busy: status !== "idle" };
// }


"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  confirmedOrderId,
  useCreateBulkCodOrderMutation,
  useCreateOrderMutation,
  useConfirmBulkRazorpayOrderMutation,
  useConfirmRazorpayOrderMutation,
  useInitiateBulkRazorpayOrderMutation,
  useInitiateRazorpayOrderMutation,
  type BookingBody,
  type RazorpayInitiateData,
} from "@/redux/api/orderApi";
import { useRazorpay, type RazorpaySuccess } from "@/app/hooks/useRazorpay";
import { newIdempotencyKey } from "@/app/lib/booking";
import {
  clearPendingPayment,
  loadPendingPayment,
  savePendingPayment,
  type PendingPayment,
} from "@/app/lib/pendingPayment";

export type PlaceOrderStatus =
  | "idle"
  | "starting" // POST /orders/razorpay/initiate
  | "paying" // Razorpay popup open
  | "confirming" // POST /orders/razorpay/confirm
  | "unconfirmed"; // paid, but server hasn't confirmed yet → keep retrying

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Booking → pay flow, same as the mobile app:
 *   initiate (gets pendingOrderToken + Razorpay checkout)
 *   → Razorpay popup → confirm (token + payment ids) → order exists.
 *
 * Differences from the app: the payment ids are saved before confirm, so a
 * refresh / closed tab / timeout can't lose a paid-but-unconfirmed order;
 * confirm is retried with the SAME idempotency key (safe to repeat).
 */
export function usePlaceOrder(opts: {
  onConfirmed: (orderId: string, orderNumber?: string) => void;
}) {
  const [status, setStatus] = useState<PlaceOrderStatus>("idle");
  const [initiate] = useInitiateRazorpayOrderMutation();
  const [confirm] = useConfirmRazorpayOrderMutation();
  const [initiateBulk] = useInitiateBulkRazorpayOrderMutation();
  const [confirmBulk] = useConfirmBulkRazorpayOrderMutation();
  const [createOrder] = useCreateOrderMutation();
  const [createBulkCod] = useCreateBulkCodOrderMutation();
  const { openCheckout } = useRazorpay();
  const onConfirmed = useRef(opts.onConfirmed);
  useEffect(() => {
    onConfirmed.current = opts.onConfirmed;
  });
  const confirming = useRef(false);

  const runConfirm = useCallback(
    async (p: PendingPayment): Promise<boolean> => {
      if (confirming.current) return false;
      if (!p.razorpayOrderId || !p.razorpayPaymentId || !p.razorpaySignature) {
        return false;
      }
      confirming.current = true;
      setStatus("confirming");
      try {
        // Retry transient failures (timeout / 5xx / offline) - same key each time.
        for (let attempt = 0; attempt < 4; attempt++) {
          try {
            const args = {
              pendingOrderToken: p.pendingOrderToken,
              razorpayOrderId: p.razorpayOrderId,
              razorpayPaymentId: p.razorpayPaymentId,
              razorpaySignature: p.razorpaySignature,
              idempotencyKey: p.confirmKey,
            };
            let id: string | undefined;
            let number: string | undefined;
            if (p.bulk) {
              const res = await confirmBulk(args).unwrap();
              id = res.data?.orders?.[0]?.id || p.fallbackOrderId;
              number = res.data?.groupNumber || res.data?.orders?.[0]?.orderNumber || p.orderNumber;
            } else {
              const res = await confirm(args).unwrap();
              id = confirmedOrderId(res.data, p.fallbackOrderId);
              number = res.data?.orderNumber || res.data?.order?.orderNumber || p.orderNumber;
            }
            clearPendingPayment();
            setStatus("idle");
            if (id) {
              onConfirmed.current(id, number);
            } else {
              toast.success("Payment confirmed. Check My Orders.");
            }
            return true;
          } catch (e) {
            const status = (e as { status?: unknown }).status;
            const transient =
              typeof status !== "number" || status >= 500 || status === 408;
            if (!transient) break; // 4xx → retrying the same call won't help
            await sleep(1500 * (attempt + 1));
          }
        }
        setStatus("unconfirmed");
        toast.error(
          "Your payment went through but we couldn't confirm the order yet. Please don't pay again - we'll keep trying.",
          { duration: 10000 },
        );
        return false;
      } finally {
        confirming.current = false;
      }
    },
    [confirm, confirmBulk],
  );

  /** Call on page load: finishes a payment that was paid but not confirmed. */
  const recover = useCallback(async () => {
    const p = loadPendingPayment();
    if (!p) return;
    if (p.stage === "paid") {
      await runConfirm(p);
    } else if (Date.now() - p.savedAt > 30 * 60 * 1000) {
      clearPendingPayment(); // abandoned checkout, nothing was paid
    }
  }, [runConfirm]);

  /** Opens Razorpay for an initiated (single or bulk) order. */
  const launch = useCallback(
    async (
      init: Partial<RazorpayInitiateData> | undefined,
      bulk: boolean,
      prefill?: { name?: string; email?: string; contact?: string },
    ) => {
      if (!init?.pendingOrderToken || !init.checkout) {
        setStatus("idle");
        toast.error("Payment could not be started. Please try again.");
        return;
      }

      const { checkout, pendingOrderToken } = init;
      const pending: PendingPayment = {
        stage: "initiated",
        pendingOrderToken,
        fallbackOrderId: init.orderId,
        orderNumber: checkout.orderNumber,
        confirmKey: newIdempotencyKey(),
        bulk,
        savedAt: Date.now(),
      };
      savePendingPayment(pending);
      setStatus("paying");

      await openCheckout({
        key: checkout.key,
        razorpayOrderId: checkout.orderId,
        amount: checkout.amount,
        currency: checkout.currency,
        description: `Order ${checkout.orderNumber}`,
        prefill,
        onSuccess: (r: RazorpaySuccess) => {
          const paid: PendingPayment = {
            ...pending,
            stage: "paid",
            razorpayOrderId: r.razorpay_order_id,
            razorpayPaymentId: r.razorpay_payment_id,
            razorpaySignature: r.razorpay_signature,
          };
          if (
            !paid.razorpayOrderId ||
            !paid.razorpayPaymentId ||
            !paid.razorpaySignature
          ) {
            setStatus("idle");
            toast.error(
              "Payment details were incomplete. If you were charged, please contact support.",
            );
            return;
          }
          savePendingPayment(paid); // persist BEFORE confirming
          void runConfirm(paid);
        },
        onFailure: (message) => toast.error(message),
        onDismiss: () => {
          clearPendingPayment();
          setStatus("idle");
          toast("Payment cancelled. Your booking was not placed.");
        },
      });
    },
    [openCheckout, runConfirm],
  );

  const placeOrder = useCallback(
    async (
      body: BookingBody,
      prefill?: { name?: string; email?: string; contact?: string },
    ) => {
      if (status !== "idle") return;
      setStatus("starting");

      let init;
      try {
        // Errors are already toasted by the shared base query.
        init = (
          await initiate({
            ...body,
            idempotencyKey: newIdempotencyKey(),
          }).unwrap()
        ).data;
      } catch {
        setStatus("idle");
        return;
      }
      await launch(init, false, prefill);
    },
    [initiate, launch, status],
  );

  /** Several bookings (different services) paid with ONE payment. */
  const placeBulkOrder = useCallback(
    async (
      bookings: BookingBody[],
      prefill?: { name?: string; email?: string; contact?: string },
    ) => {
      if (status !== "idle") return;
      setStatus("starting");

      let init;
      try {
        init = (
          await initiateBulk({
            bookings,
            idempotencyKey: newIdempotencyKey(),
          }).unwrap()
        ).data;
      } catch {
        setStatus("idle");
        return;
      }
      await launch(init, true, prefill);
    },
    [initiateBulk, launch, status],
  );

  /**
   * No-popup payment methods (same as the app):
   *  - COD    → POST /orders (paymentMethod COD) or POST /orders/bulk/cod
   *  - WALLET → POST /orders (paymentMethod WALLET), single booking only
   * Errors are already toasted by the shared base query.
   */
  const placeOffline = useCallback(
    async (bookings: BookingBody[], method: "COD" | "WALLET") => {
      if (status !== "idle" || bookings.length === 0) return;
      if (method === "WALLET" && bookings.length > 1) {
        toast.error("Wallet payment isn't available for multi-service bookings. Please pay online.");
        return;
      }
      setStatus("starting");
      const idempotencyKey = newIdempotencyKey();
      try {
        let id: string | undefined;
        let number: string | undefined;
        if (bookings.length > 1) {
          const res = await createBulkCod({ bookings, idempotencyKey }).unwrap();
          id = res.data?.orders?.[0]?.id;
          number = res.data?.groupNumber || res.data?.orders?.[0]?.orderNumber;
        } else {
          const res = await createOrder({
            ...bookings[0],
            paymentMethod: method,
            idempotencyKey,
          }).unwrap();
          id = res.data?.id;
          number = res.data?.orderNumber;
        }
        setStatus("idle");
        if (id) onConfirmed.current(id, number);
        else toast.success("Order placed. Check My Orders.");
      } catch {
        setStatus("idle");
      }
    },
    [createOrder, createBulkCod, status],
  );

  return {
    placeOrder,
    placeBulkOrder,
    placeOffline,
    recover,
    status,
    busy: status !== "idle",
  };
}
