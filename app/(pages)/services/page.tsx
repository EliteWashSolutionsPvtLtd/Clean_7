"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/sections/Footer";
import Container from "@/app/components/layout/Container";
import DownloadAppModal from "@/app/components/ui/modals/DownloadAppModal";
import { SatoshiFont } from "@/app/fonts";
import { PageHeroAnimation } from "@/app/components/animations/PageAnimations";

const CheckCircleIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-[var(--gold)] shrink-0"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

export default function ServicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div
      className="bg-[var(--ground)] min-h-screen text-[var(--ink)]"
      style={{ fontFamily: SatoshiFont.style.fontFamily }}
    >
      <Navbar />

      <PageHeroAnimation variant="split">
        <main className="pt-[100px] md:pt-[140px] pb-[80px]">
          <Container isMaxWidth className="px-[24px]">
            {/* Header */}
            <div className="text-center max-w-[700px] mx-auto mb-[60px] md:mb-[80px] gsap-animate opacity-0 page-hero-left">
              <h1
                className="text-[42px] md:text-[56px] text-[var(--ink)] leading-[1.1] mb-[16px]"
                style={{ fontFamily: "var(--font-fraunces)" }}
              >
                Our Services
              </h1>
              <div className="w-[40px] h-[2px] bg-[var(--gold)] mx-auto mb-[24px]"></div>
              <p className="text-[16px] text-[var(--ink-soft)] leading-[1.6]">
                At Clean7, we take care of the details so you can focus on what
                matters.
                <br className="hidden sm:block" /> Premium care. Reliable
                service. Every time.
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid lg:grid-cols-2 gap-[30px] md:gap-[40px] mb-[60px] md:mb-[80px]">
              {/* Laundry Card */}
              <div
                className="rounded-2xl border border-[var(--line)] bg-[var(--card)] overflow-hidden flex flex-col hover:border-[var(--gold)]/30 transition-colors duration-500 gsap-animate opacity-0 page-hero-left"
                style={{ animationDelay: "0.1s" }}
              >
                <div className="relative w-full aspect-[16/9]">
                  <Image
                    src="/images/services/laundry.png"
                    alt="Laundry Service"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-[32px] md:p-[48px] flex-1 flex flex-col">
                  <h2
                    className="text-[32px] md:text-[38px] text-[var(--ink)] mb-[24px]"
                    style={{ fontFamily: "var(--font-fraunces)" }}
                  >
                    Laundry
                  </h2>
                  <p className="text-[15px] text-[var(--ink-soft)] leading-[1.6] mb-[32px]">
                    From everyday laundry to delicate fabrics, we wash, dry,
                    fold, and deliver with the utmost care and hygiene.
                  </p>

                  <ul className="flex flex-col gap-[16px] mb-[48px] flex-1">
                    {[
                      "Wash & Fold",
                      "Premium Detergents",
                      "Fabric Care",
                      "Quick Turnaround",
                      "Doorstep Pickup & Delivery",
                    ].map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-[12px] text-[14px] text-[var(--ink-soft)]"
                      >
                        <CheckCircleIcon />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/services/laundry"
                    className="block w-full text-center py-[14px] border border-[var(--line)] rounded-lg text-[var(--gold)] text-[14px] font-semibold hover:border-[var(--gold)] hover:bg-[var(--gold)]/5 transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
              </div>

              {/* Car Wash Card */}
              <div
                className="rounded-2xl border border-[var(--line)] bg-[var(--card)] overflow-hidden flex flex-col hover:border-[var(--gold)]/30 transition-colors duration-500 gsap-animate opacity-0 page-hero-left"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="relative w-full aspect-[16/9]">
                  <Image
                    src="/images/services/car-wash.png"
                    alt="Car Wash Service"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-[32px] md:p-[48px] flex-1 flex flex-col">
                  <h2
                    className="text-[32px] md:text-[38px] text-[var(--ink)] mb-[24px]"
                    style={{ fontFamily: "var(--font-fraunces)" }}
                  >
                    Car Wash
                  </h2>
                  <p className="text-[15px] text-[var(--ink-soft)] leading-[1.6] mb-[32px]">
                    Professional cleaning that restores shine and protects your
                    vehicle, inside and out.
                  </p>

                  <ul className="flex flex-col gap-[16px] mb-[48px] flex-1">
                    {[
                      "Exterior Wash",
                      "Interior Vacuuming",
                      "Deep Cleaning",
                      "Stain Removal",
                      "Premium Finishes",
                    ].map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-[12px] text-[14px] text-[var(--ink-soft)]"
                      >
                        <CheckCircleIcon />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/services/car-wash"
                    className="block w-full text-center py-[14px] border border-[var(--line)] rounded-lg text-[var(--gold)] text-[14px] font-semibold hover:border-[var(--gold)] hover:bg-[var(--gold)]/5 transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom CTA Box */}
            <div
              className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-[40px] md:p-[60px] flex flex-col md:flex-row items-start md:items-center justify-between gap-[30px] gsap-animate opacity-0 page-hero-left"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="max-w-[400px]">
                <h3
                  className="text-[32px] md:text-[38px] text-[var(--ink)] leading-[1.1] mb-[16px]"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  Ready for a cleaner, easier life?
                </h3>
                <p className="text-[15px] text-[var(--ink-soft)] leading-[1.6]">
                  Schedule a pickup in seconds and leave the rest to us.
                </p>
              </div>
              <div className="flex flex-col items-center gap-[12px] shrink-0">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-[32px] py-[14px] rounded bg-gradient-to-r from-[#DAB875] to-[#B58B43] text-black font-semibold text-[15px] hover:brightness-110 transition-all shadow-lg shadow-[#DAB875]/20"
                >
                  Book a Pickup
                </button>
                <span className="text-[13px] text-[var(--ink-soft)] font-medium">
                  Fast. Simple. Reliable.
                </span>
              </div>
            </div>
          </Container>
        </main>
      </PageHeroAnimation>

      <Footer />
      <DownloadAppModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
