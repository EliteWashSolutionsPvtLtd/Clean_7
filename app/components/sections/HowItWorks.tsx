"use client";

import Image from "next/image";

const laundrySteps = [
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

const carWashSteps = [
  {
    num: 1,
    title: "Book a wash",
    desc: "Choose a convenient time and location. We'll come to you.",
    img: "/images/how-it-works/car-wash/step-1.png",
  },
  {
    num: 2,
    title: "We arrive equipped",
    desc: "Our professional team arrives with everything needed for a premium wash.",
    img: "/images/how-it-works/car-wash/step-2.png",
  },
  {
    num: 3,
    title: "Thorough clean",
    desc: "We clean every inch, inside and out, with safe products and expert care.",
    img: "/images/how-it-works/car-wash/step-3.png",
  },
  {
    num: 4,
    title: "Delivered spotless",
    desc: "Sit back and enjoy a spotless, gleaming car—right at your doorstep.",
    img: "/images/how-it-works/car-wash/step-4.png",
  },
];

function StepGrid({ steps }: { steps: typeof laundrySteps }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 items-start justify-between w-full relative gap-[48px] md:gap-[24px]">
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
          <div className="relative flex items-center justify-center mb-[32px] md:mb-[40px] w-full h-[200px] md:h-[260px]">
            {/* Background circle */}
            <div className="absolute w-[160px] h-[160px] md:w-[200px] md:h-[200px] lg:w-[220px] lg:h-[220px] bg-[#e6dfcf] rounded-full -z-10"></div>
            {/* Image container */}
            <div className="relative w-[220px] h-[220px] md:w-[240px] md:h-[240px] lg:w-[300px] lg:h-[300px]">
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
  );
}

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="pt-[80px] md:pt-[120px] pb-[60px] px-[24px] md:px-[48px] bg-[var(--ground)] text-[var(--ink)]"
    >
      <div className="max-w-[1200px] mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-[48px] md:mb-[80px]">
          <p className="text-[15px] sm:text-[20px] font-bold tracking-[0.15em] text-[var(--gold)] uppercase mb-[16px] md:mb-[24px]">
            HOW IT WORKS
          </p>
          <h2
            className="text-[36px] md:text-[48px] lg:text-[64px] text-[var(--ink)] mb-[16px] md:mb-[24px] leading-[1.05]"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            Care that&apos;s simple.
            <br />
            <span className="italic text-[var(--gold)] font-light">
              Results that last.
            </span>
          </h2>
          <p className="text-[var(--ink-soft)] text-[17px] leading-[1.7] max-w-[500px] mx-auto">
            We handle the hard work so you don&apos;t have to.
            <br />
            Clean, refreshed clothes in four easy steps.
          </p>
        </div>

        {/* Laundry Section */}
        <div className="w-full mb-[60px] md:mb-[80px]">
          <h3
            className="text-[28px] md:text-[36px] text-[var(--ink)] mb-[32px] md:mb-[48px] font-medium text-center"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            Laundry
          </h3>
          <StepGrid steps={laundrySteps} />
        </div>

        {/* Car Wash Section */}
        <div className="w-full">
          <h3
            className="text-[28px] md:text-[36px] text-[var(--ink)] mb-[32px] md:mb-[48px] font-medium text-center"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            Doorstep Car Wash
          </h3>
          <StepGrid steps={carWashSteps} />
        </div>
      </div>
    </section>
  );
}
