"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, FileText, RotateCcw, UserX, ArrowRight } from "lucide-react";
import { WixMadeForDisplayFont } from "@/app/fonts";

const IMPORTANT_LINKS = [
  {
    title: "Privacy Policy",
    description: "Learn how we handle, protect, and respect your personal information.",
    href: "/privacy-policy",
    icon: ShieldCheck,
  },
  {
    title: "Terms & Conditions",
    description: "Understand our service terms, customer commitments, and platform rules.",
    href: "/terms-and-conditions",
    icon: FileText,
  },
  {
    title: "Refund & Cancellation Policy",
    description: "Guidelines on rescheduling, order cancellations, and refund processing.",
    href: "/terms-of-use#pricing",
    icon: RotateCcw,
  },
  {
    title: "Account Deletion",
    description: "Step-by-step instructions on requesting complete account and data removal.",
    href: "/delete-account",
    icon: UserX,
  },
];

export default function ImportantLinks() {
  return (
    <section className="py-12 md:py-16 border-t border-[var(--line)]" aria-labelledby="important-links-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2
            id="important-links-heading"
            className="text-2xl sm:text-3xl font-semibold text-[var(--ink)] tracking-tight"
            style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
          >
            Important Information & Legal Policies
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[var(--ink-soft)]">
            Transparent policies governing our services, user rights, and privacy practices.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {IMPORTANT_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.title}
                href={link.href}
                className="group flex flex-col justify-between p-6 rounded-2xl border border-[var(--line)] bg-[var(--card)] hover:border-[var(--gold)]/60 shadow-xs transition-all duration-200"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[var(--gold)]/10 text-[var(--gold)] flex items-center justify-center mb-4 transition-transform group-hover:scale-105">
                    <Icon size={20} />
                  </div>
                  <h3
                    className="text-base font-semibold text-[var(--ink)] mb-1.5"
                    style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
                  >
                    {link.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--ink-soft)] leading-relaxed">
                    {link.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[var(--line)]/60 flex items-center justify-between text-xs font-semibold text-[var(--gold)] group-hover:text-[var(--brass)] transition-colors">
                  <span>View Policy</span>
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
