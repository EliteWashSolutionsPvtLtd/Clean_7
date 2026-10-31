// /**
//  * Survives a refresh / closed tab between "Razorpay says paid" and
//  * "server confirmed the order" (the mobile app keeps this only in memory,
//  * so a charged-but-unconfirmed payment is lost there).
//  *
//  * Stage 1  "initiated": checkout opened, no payment yet → only the token.
//  * Stage 2  "paid":      Razorpay returned ids → confirm must be retried
//  *                       (same idempotency key) until the server accepts it.
//  */
// export type PendingPayment = {
//   stage: "initiated" | "paid";
//   pendingOrderToken: string;
//   fallbackOrderId?: string;
//   orderNumber?: string;
//   confirmKey: string;
//   razorpayOrderId?: string;
//   razorpayPaymentId?: string;
//   razorpaySignature?: string;
//   savedAt: number;
// };

// const KEY = "clean7_pending_payment";

// export function savePendingPayment(p: PendingPayment) {
//   try {
//     localStorage.setItem(KEY, JSON.stringify(p));
//   } catch {}
// }

// export function loadPendingPayment(): PendingPayment | null {
//   try {
//     const raw = localStorage.getItem(KEY);
//     return raw ? (JSON.parse(raw) as PendingPayment) : null;
//   } catch {
//     return null;
//   }
// }

// export function clearPendingPayment() {
//   try {
//     localStorage.removeItem(KEY);
//   } catch {}
// }


/**
 * Survives a refresh / closed tab between "Razorpay says paid" and
 * "server confirmed the order" (the mobile app keeps this only in memory,
 * so a charged-but-unconfirmed payment is lost there).
 *
 * Stage 1  "initiated": checkout opened, no payment yet → only the token.
 * Stage 2  "paid":      Razorpay returned ids → confirm must be retried
 *                       (same idempotency key) until the server accepts it.
 */
export type PendingPayment = {
  stage: "initiated" | "paid";
  pendingOrderToken: string;
  fallbackOrderId?: string;
  orderNumber?: string;
  confirmKey: string;
  /** true → several bookings paid together (POST /orders/bulk/razorpay/*) */
  bulk?: boolean;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  savedAt: number;
};

const KEY = "clean7_pending_payment";

export function savePendingPayment(p: PendingPayment) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {}
}

export function loadPendingPayment(): PendingPayment | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as PendingPayment) : null;
  } catch {
    return null;
  }
}

export function clearPendingPayment() {
  try {
    localStorage.removeItem(KEY);
  } catch {}
}
