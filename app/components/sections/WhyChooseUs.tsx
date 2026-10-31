"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ScrollReveal } from "../ui/ScrollReveal";

const IconShirt = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 8L4 12v2h3v7h10v-7h3v-2L12 8z" />
    <path d="M12 8c0-2-1-2.5-1-3.5 0-1 1-1.5 1-1.5s1 .5 1 1.5c0 1-1 1.5-1 3.5" />
  </svg>
);

const IconHeartHands = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 14c-2.5-2.5-4-4.5-4-6.5a3.5 3.5 0 0 1 7-2 3.5 3.5 0 0 1 7 2c0 2-1.5 4-4 6.5L12 18z" />
    <path d="M6 16.5c-1.5.5-3 1-3 2.5 0 1.5 2 2 6 2s6-.5 6-2c0-1.5-1.5-2-3-2.5" />
  </svg>
);

const IconLeaf = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 22l10-10" />
  </svg>
);

const IconClock = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconShield = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const StarSparkle = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="var(--gold-bright)"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3C12 12 3 12 3 12C12 12 12 21 12 21C12 12 21 12 21 12C12 12 12 3 12 3Z" />
  </svg>
);

const features = [
  {
    title: "Expert care",
    desc: "Trained professionals who treat every garment like it's their own.",
    Icon: IconShirt,
  },
  {
    title: "Hand-finished",
    desc: "Every piece is hand-finished for a crisp, polished result.",
    Icon: IconHeartHands,
  },
  {
    title: "Better for fabrics",
    desc: "Gentle, premium products that protect fabric and extend life.",
    Icon: IconLeaf,
  },
  {
    title: "Save time",
    desc: "We handle the details so you can focus on what matters.",
    Icon: IconClock,
  },
  {
    title: "No guesswork",
    desc: "Simple pricing, clear process, and updates you can count on.",
    Icon: IconShield,
  },
];

export default function WhyChooseUs() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [gridVisible, setGridVisible] = useState(false);

  // Waterfall trigger: fires once when the card grid enters the viewport
  useEffect(() => {
    const node = gridRef.current;
    if (!node) return;

    // Respect users who prefer reduced motion — reveal instantly, no animation
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setGridVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGridVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="pt-[60px] pb-[100px] px-[24px] md:px-[48px] bg-[var(--ground)]">
      <style jsx>{`
        @keyframes waterfallDrop {
          0% {
            opacity: 0;
            transform: translateY(-38px) scale(0.94);
            filter: blur(6px);
          }
          55% {
            opacity: 1;
            transform: translateY(6px) scale(1.01);
            filter: blur(0px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
        }

        @keyframes ripplePulse {
          0% {
            transform: scale(0.85);
            opacity: 0.45;
          }
          100% {
            transform: scale(1.7);
            opacity: 0;
          }
        }

        .waterfall-card {
          opacity: 0;
          animation: waterfallDrop 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-play-state: paused;
        }

        .waterfall-card.is-visible {
          animation-play-state: running;
        }

        .icon-ripple {
          position: relative;
          overflow: hidden;
        }

        .icon-ripple::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: var(--gold);
          opacity: 0;
          pointer-events: none;
        }

        .group:hover .icon-ripple::before {
          animation: ripplePulse 0.8s ease-out;
        }

        @media (prefers-reduced-motion: reduce) {
          .waterfall-card {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
          }
          .group:hover .icon-ripple::before {
            animation: none !important;
          }
        }
      `}</style>

      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center mb-[48px] md:mb-[80px]">
          <ScrollReveal delay={0}>
            <p className="text-[15px] sm:text-[20px] font-bold tracking-[0.15em] text-[var(--gold)] uppercase mb-[16px] md:mb-[24px]">
              THE CLEAN7 DIFFERENCE
            </p>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <h2
              className="text-[36px] md:text-[48px] lg:text-[64px] text-[var(--ink)] mb-[16px] md:mb-[24px] leading-[1.05]"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Everything you need.
              <br />
              <span className="italic text-[var(--gold)] font-light">
                Nothing you don&apos;t.
              </span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <p className="text-[var(--ink-soft)] text-[17px] leading-[1.7] max-w-[500px] mx-auto">
              We combine expert care with thoughtful service
              <br className="hidden md:block" />
              to deliver an experience that feels refreshingly simple.
            </p>
          </ScrollReveal>
        </div>

        {/* 5-Column Grid — waterfall reveal */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 lg:grid-cols-5 gap-[12px] md:gap-[20px] mb-[40px]"
        >
          {features.map((feat, idx) => (
            <div
              key={idx}
              className={`waterfall-card group h-full w-full ${
                gridVisible ? "is-visible" : ""
              }`}
              style={{ animationDelay: `${idx * 130}ms` }}
            >
              <div className="h-full bg-[var(--ground-soft)] rounded-[20px] md:rounded-[24px] p-[24px] md:p-[36px] flex flex-col items-center text-center shadow-md hover:shadow-lg transition-all duration-500 ease-out hover:-translate-y-1 border border-transparent hover:border-[var(--gold)]/20">
                <div className="icon-ripple w-[50px] h-[50px] md:w-[70px] md:h-[70px] rounded-full bg-[var(--gold)]/10 text-[var(--gold)] flex items-center justify-center mb-[16px] md:mb-[24px] transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-[6deg]">
                  <feat.Icon className="relative z-10 w-5 h-5 md:w-7 md:h-7" />
                </div>
                <h3
                  className="text-[16px] md:text-[15px] text-[var(--ink)] font-medium mb-[8px] md:mb-[12px]"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  {feat.title}
                </h3>
                <div className="w-[20px] md:w-[30px] h-[1px] bg-[var(--gold)]/40 mb-[10px] md:mb-[16px] transition-all duration-500 ease-out group-hover:w-[40px] md:group-hover:w-[60px] group-hover:bg-[var(--gold)]"></div>
                <p className="text-[15px] md:text-xs text-[var(--ink-soft)] leading-[1.5] md:leading-[1.6]">
                  {feat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Satisfaction Bar */}
        <ScrollReveal delay={200}>
          <div className="w-full bg-[var(--ground-soft)] border border-[var(--line)] rounded-[20px] p-[24px] md:px-[40px] md:py-[24px] flex flex-col md:flex-row items-center justify-between gap-[24px]">
            <div className="w-full md:w-auto text-center md:text-left">
              <p className="text-[var(--ink-soft)] leading-[1.6]">
                If something&apos;s not right, we&apos;ll make it right -
                because your trust is earned with every order.
              </p>
            </div>

            <Link
              href="/about"
              className="group flex items-center justify-center gap-[8px] w-full md:w-auto px-[24px] py-[12px] rounded-full border border-[var(--gold)] text-[var(--gold)] font-medium text-[15px] hover:bg-[var(--gold)] hover:!text-[#ffffff] transition-colors whitespace-nowrap"
            >
              Learn more about us
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 ease-out group-hover:translate-x-1"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}