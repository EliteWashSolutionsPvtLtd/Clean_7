"use client";

import { useCallback, useRef } from "react";

/* Minimal typing for Razorpay's hosted checkout.js */
export interface RazorpaySuccess {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}
interface RazorpayOptions {
  key: string;
  order_id: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  prefill?: { name?: string; email?: string; contact?: string };
  theme?: { color?: string };
  handler: (res: RazorpaySuccess) => void;
  modal?: { ondismiss?: () => void };
}
interface RazorpayInstance {
  open: () => void;
  on: (
    event: "payment.failed",
    cb: (res: { error?: { description?: string; reason?: string } }) => void,
  ) => void;
}
declare global {
  interface Window {
    Razorpay?: new (o: RazorpayOptions) => RazorpayInstance;
  }
}

const SRC = "https://checkout.razorpay.com/v1/checkout.js";

function loadScript(): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (window.Razorpay) return Promise.resolve(true);
  return new Promise((resolve) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${SRC}"]`,
    );
    const s = existing ?? document.createElement("script");
    s.addEventListener("load", () => resolve(true), { once: true });
    s.addEventListener("error", () => resolve(false), { once: true });
    if (!existing) {
      s.src = SRC;
      s.async = true;
      document.body.appendChild(s);
    }
  });
}

export interface OpenCheckoutArgs {
  key: string;
  razorpayOrderId: string;
  amount: number;
  currency: string;
  description: string;
  prefill?: RazorpayOptions["prefill"];
  onSuccess: (r: RazorpaySuccess) => void;
  onFailure: (message: string) => void;
  /** A payment attempt failed (popup stays open for retry). Informational. */
  /** User closed the popup without paying. NOT called after a success. */
  onDismiss: () => void;
}

/**
 * Web Razorpay checkout. onSuccess / onDismiss fire at most once per open and
 * dismiss is NOT fired after a success - the double-callback bug the mobile
 * hook has (closeCheckout() → onClose → redirect to Orders).
 */
export function useRazorpay() {
  const busy = useRef(false);

  const openCheckout = useCallback(async (a: OpenCheckoutArgs) => {
    if (busy.current) return;
    busy.current = true;
    const finish = () => {
      busy.current = false;
    };

    if (!(await loadScript()) || !window.Razorpay) {
      finish();
      a.onFailure("Couldn't load the payment window. Check your connection.");
      a.onDismiss();
      return;
    }

    let settled = false;
    const rzp = new window.Razorpay({
      key: a.key,
      order_id: a.razorpayOrderId,
      amount: a.amount,
      currency: a.currency,
      name: "Clean7",
      description: a.description,
      prefill: a.prefill,
      theme: { color: "#B8893E" },
      handler: (res) => {
        if (settled) return;
        settled = true;
        finish();
        a.onSuccess(res);
      },
      modal: {
        ondismiss: () => {
          if (settled) return;
          settled = true;
          finish();
          a.onDismiss();
        },
      },
    });
    // A failed attempt does NOT close Razorpay's popup - the user can retry
    // inside it, so a later success must still be accepted. We only report it.
    rzp.on("payment.failed", (res) => {
      if (settled) return;
      a.onFailure(
        res.error?.description ||
          res.error?.reason ||
          "Payment could not be completed.",
      );
    });
    rzp.open();
  }, []);

  return { openCheckout };
}
