"use client";

import React from "react";
import { PhoneCall, Mail, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { WixMadeForDisplayFont } from "@/app/fonts";
import { SUPPORT_CONFIG } from "@/app/lib/support-config";

export default function ContactCards() {
  return (
    <section className="py-12 md:py-16" aria-labelledby="contact-options-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2
            id="contact-options-heading"
            className="text-2xl sm:text-3xl font-semibold text-[var(--ink)] tracking-tight"
            style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
          >
            Direct Support Channels
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[var(--ink-soft)]">
            Connect directly with the Clean7 operations and customer experience team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Call Us */}
          <div className="flex flex-col justify-between p-6 sm:p-8 rounded-2xl border border-[var(--line)] bg-[var(--card)] shadow-xs hover:border-[var(--gold)]/50 transition-all duration-200">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[var(--gold)]/10 text-[var(--gold)] flex items-center justify-center mb-5">
                <PhoneCall size={22} />
              </div>
              <h3
                className="text-xl font-semibold text-[var(--ink)] mb-2"
                style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
              >
                Call Us
              </h3>
              <p className="text-sm text-[var(--ink-soft)] leading-relaxed mb-4">
                Talk to our support team for help with your bookings and services.
              </p>
              <div className="flex items-center gap-1.5 text-xs text-[var(--ink-soft)] mb-6">
                <Clock size={14} className="text-[var(--gold)] shrink-0" />
                <span>{SUPPORT_CONFIG.operatingHours}</span>
              </div>
            </div>

            <a
              href={SUPPORT_CONFIG.phoneTel}
              className="group inline-flex items-center justify-between w-full pt-4 border-t border-[var(--line)] text-[15px] font-semibold text-[var(--gold)] hover:text-[var(--brass)] transition-colors"
              aria-label={`Call Clean7 support at ${SUPPORT_CONFIG.phoneDisplay}`}
            >
              <span>{SUPPORT_CONFIG.phoneDisplay}</span>
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>

          {/* Card 2: Email Us */}
          <div className="flex flex-col justify-between p-6 sm:p-8 rounded-2xl border border-[var(--line)] bg-[var(--card)] shadow-xs hover:border-[var(--gold)]/50 transition-all duration-200">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[var(--gold)]/10 text-[var(--gold)] flex items-center justify-center mb-5">
                <Mail size={22} />
              </div>
              <h3
                className="text-xl font-semibold text-[var(--ink)] mb-2"
                style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
              >
                Email Us
              </h3>
              <p className="text-sm text-[var(--ink-soft)] leading-relaxed mb-4">
                Send us your question and our support team will get back to you.
              </p>
              <div className="flex items-center gap-1.5 text-xs text-[var(--ink-soft)] mb-6">
                <Clock size={14} className="text-[var(--gold)] shrink-0" />
                <span>Response {SUPPORT_CONFIG.responseTime.toLowerCase()}</span>
              </div>
            </div>

            <a
              href={SUPPORT_CONFIG.emailMailto}
              className="group inline-flex items-center justify-between w-full pt-4 border-t border-[var(--line)] text-[15px] font-semibold text-[var(--gold)] hover:text-[var(--brass)] transition-colors break-all"
              aria-label={`Email Clean7 support at ${SUPPORT_CONFIG.email}`}
            >
              <span>{SUPPORT_CONFIG.email}</span>
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 ml-2"
              />
            </a>
          </div>

          {/* Card 3: Business Address */}
          <div className="flex flex-col justify-between p-6 sm:p-8 rounded-2xl border border-[var(--line)] bg-[var(--card)] shadow-xs hover:border-[var(--gold)]/50 transition-all duration-200">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[var(--gold)]/10 text-[var(--gold)] flex items-center justify-center mb-5">
                <MapPin size={22} />
              </div>
              <h3
                className="text-xl font-semibold text-[var(--ink)] mb-2"
                style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
              >
                Visit / Business Address
              </h3>
              <p className="text-sm text-[var(--ink-soft)] leading-relaxed mb-4">
                Clean7 Operations & Regional Center
              </p>
              <address className="not-italic text-sm text-[var(--ink)] leading-snug mb-6">
                {SUPPORT_CONFIG.businessAddress}
              </address>
            </div>

            <div className="pt-4 border-t border-[var(--line)] text-xs text-[var(--ink-soft)]">
              Registered Office: Shamli, Uttar Pradesh
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
