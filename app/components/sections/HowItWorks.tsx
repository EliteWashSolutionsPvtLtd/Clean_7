"use client";

import React from "react";
import Image from "next/image";

const steps = [
  {
    num: 1,
    title: "Book a pickup",
    desc: "Schedule a time that works best for you. We'll pick up right from your door.",
    img: "/images/how-it-works/step-1.png",
  },
  {
    num: 2,
    title: "We clean with care",
    desc: "Your items are inspected, expertly cleaned, and finished by hand.",
    img: "/images/how-it-works/step-2.png",
  },
  {
    num: 3,
    title: "Hand-finished",
    desc: "Every piece is pressed, folded, and quality-checked to perfection.",
    img: "/images/how-it-works/step-3.png",
  },
  {
    num: 4,
    title: "Delivered fresh",
    desc: "We return your clothes looking their best—clean, crisp, and ready to wear.",
    img: "/images/how-it-works/step-4.png",
  },
];

const features = [
  {
    title: "Quality guaranteed",
    desc: "If you're not satisfied, we'll make it right.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--gold-bright)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Sustainable care",
    desc: "Eco-friendly products and responsible processes.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--gold-bright)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 22l10-10" />
      </svg>
    ),
  },
  {
    title: "Always on time",
    desc: "Reliable pickups and on-time delivery.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--gold-bright)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: "We treat it like our own",
    desc: "Because your clothes deserve the best care.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--gold-bright)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-[120px] px-[24px] md:px-[48px] bg-[var(--ground)] text-[var(--ink)]"
    >
      <div className="max-w-[1200px] mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-[80px]">
          <p className="text-[13px] font-bold tracking-[0.15em] text-[var(--gold)] uppercase mb-[24px]">
            HOW IT WORKS
          </p>
          <h2
            className="text-[48px] md:text-[64px] text-[var(--ink)] mb-[24px] leading-[1.05]"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            Care that's simple.
            <br />
            <span className="italic text-[var(--gold)] font-light">
              Results that last.
            </span>
          </h2>
          <p className="text-[var(--ink-soft)] text-[17px] leading-[1.7] max-w-[500px] mx-auto">
            We handle the hard work so you don't have to.
            <br />
            Clean, refreshed clothes in four easy steps.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 items-start justify-between w-full relative mb-[100px] gap-[48px] md:gap-[24px]">
          {/* Dashed arrows (desktop only) */}
          <div className="hidden md:flex absolute top-[16px] left-0 w-full z-0 pointer-events-none justify-evenly -translate-y-1/2">
            <div className="flex items-center justify-center w-[60px] lg:w-[80px]">
              <svg
                width="100%"
                height="24"
                viewBox="0 0 60 24"
                fill="none"
                stroke="var(--gold)"
                style={{ overflow: "visible" }}
              >
                <path d="M0 12h56" strokeWidth="1.5" strokeDasharray="3 4" />
                <path
                  d="M52 6l6 6-6 6"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex items-center justify-center w-[60px] lg:w-[80px]">
              <svg
                width="100%"
                height="24"
                viewBox="0 0 60 24"
                fill="none"
                stroke="var(--gold)"
                style={{ overflow: "visible" }}
              >
                <path d="M0 12h56" strokeWidth="1.5" strokeDasharray="3 4" />
                <path
                  d="M52 6l6 6-6 6"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex items-center justify-center w-[60px] lg:w-[80px]">
              <svg
                width="100%"
                height="24"
                viewBox="0 0 60 24"
                fill="none"
                stroke="var(--gold)"
                style={{ overflow: "visible" }}
              >
                <path d="M0 12h56" strokeWidth="1.5" strokeDasharray="3 4" />
                <path
                  d="M52 6l6 6-6 6"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {steps.map((step, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center flex-1 z-10 w-full"
            >
              {/* Badge */}
              <div className="w-[32px] h-[32px] rounded-full bg-[var(--gold)] text-[#FFFFFF] flex items-center justify-center text-[15px] font-medium mb-[32px]">
                {step.num}
              </div>

              {/* Image with glow behind it */}
              <div className="relative flex items-center justify-center mb-[40px] w-full h-[260px]">
                {/* Background circle */}
                <div className="absolute w-[200px] h-[200px] lg:w-[220px] lg:h-[220px] bg-[#e6dfcf] rounded-full -z-10"></div>
                {/* Image container */}
                <div className="relative w-[240px] h-[240px] lg:w-[300px] lg:h-[300px]">
                  <Image
                    src={step.img}
                    alt={step.title}
                    fill
                    className="object-contain drop-shadow-[0_20px_30px_rgba(33,28,19,0.1)] scale-110"
                  />
                </div>
              </div>

              {/* Text */}
              <h3
                className="text-[22px] text-[var(--ink)] mb-[16px] font-medium"
                style={{ fontFamily: "var(--font-fraunces)" }}
              >
                {step.title}
              </h3>
              <p className="text-[15px] text-[var(--ink-soft)] leading-[1.6] max-w-[240px]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Features Bottom Bar */}
        <div className="w-full bg-[#F5F0E6] border border-[#EBE4D5] rounded-[24px] px-[24px] py-[40px] md:py-[48px] md:px-[48px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 justify-between gap-[40px] md:gap-[24px]">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center flex-1 relative"
            >
              <div className="mb-[20px] opacity-80">{feat.icon}</div>
              <h4
                className="text-[17px] text-[var(--ink)] font-medium mb-[12px]"
                style={{ fontFamily: "var(--font-fraunces)" }}
              >
                {feat.title}
              </h4>
              <p className="text-[14px] text-[var(--ink-soft)] leading-[1.6] max-w-[220px]">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
