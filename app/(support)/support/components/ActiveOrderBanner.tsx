"use client";

import React from "react";
import { Package, ArrowDown } from "lucide-react";
import { WixMadeForDisplayFont } from "@/app/fonts";

export default function ActiveOrderBanner() {
  const scrollToForm = () => {
    const el = document.getElementById("contact-support-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      // Focus on orderId input if available
      setTimeout(() => {
        const orderInput = document.getElementById("support-order-id");
        if (orderInput) {
          orderInput.focus();
        }
      }, 400);
    }
  };

  return (
    <section className="py-8" aria-label="Active order assistance">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="rounded-2xl border border-[var(--gold)]/30 bg-gradient-to-r from-[var(--gold)]/5 via-[var(--card)] to-[var(--gold)]/10 p-6 sm:p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[var(--gold)]/15 text-[var(--gold)] flex items-center justify-center shrink-0 mt-0.5">
              <Package size={24} />
            </div>
            <div>
              <h2
                className="text-xl sm:text-2xl font-semibold text-[var(--ink)] tracking-tight"
                style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
              >
                Need help with an active order?
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[var(--ink-soft)] leading-relaxed max-w-2xl">
                Having an issue with a current Clean7 order? Include your Order ID when contacting support so we can help you faster.
              </p>
            </div>
          </div>

          <div className="shrink-0 pl-16 md:pl-0">
            <button
              type="button"
              onClick={scrollToForm}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[var(--gold)] text-white text-sm font-semibold tracking-wide hover:bg-[var(--brass)] transition-all duration-200 shadow-sm active:scale-[0.98] cursor-pointer"
            >
              <span>Contact Support</span>
              <ArrowDown size={15} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
