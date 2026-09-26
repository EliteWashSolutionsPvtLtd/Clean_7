"use client";

import React from "react";
import { WixMadeForDisplayFont } from "@/app/fonts";
import { ArrowDown, Headphones } from "lucide-react";

export default function SupportHero() {
  const scrollToForm = () => {
    const el = document.getElementById("contact-support-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="relative pt-24 pb-12 md:pt-32 md:pb-16 text-center border-b border-[var(--line)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Trust badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--card)] border border-[var(--line)] shadow-xs mb-6">
          <Headphones size={15} className="text-[var(--gold)]" />
          <span className="text-[13px] font-medium tracking-wide uppercase text-[var(--gold)]">
            Clean7 Customer Care & Help
          </span>
        </div>

        {/* Heading */}
        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-[var(--ink)] tracking-tight leading-[1.15]"
          style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
        >
          How can we help?
        </h1>

        {/* Supporting text */}
        <p className="mt-5 text-base sm:text-lg md:text-xl text-[var(--ink-soft)] leading-relaxed max-w-2xl mx-auto">
          Need help with a booking, payment, pickup, home service, or anything else? We&apos;re here to help.
        </p>

        {/* CTA Button */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={scrollToForm}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[var(--gold)] text-white text-[15px] font-semibold tracking-wide hover:bg-[var(--brass)] transition-all duration-200 shadow-md shadow-[var(--gold)]/20 active:scale-[0.98] cursor-pointer"
          >
            <span>Contact Support</span>
            <ArrowDown size={17} />
          </button>
        </div>
      </div>
    </header>
  );
}
