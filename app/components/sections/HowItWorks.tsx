"use client";

import Image from "next/image";
import { ScrollReveal } from "../ui/ScrollReveal";

const laundrySteps = [
  {
    num: 1,
    title: "Book a pickup",
    desc: "Schedule a time that works best for you. We'll pick up right from your door.",
    img: "/images/how-it-works/step-1.png",
  },
  {
    num: 2,
    title: "Powered by advanced cleaning technology",
    desc: "Every item is carefully inspected and cleaned using advanced, high-performance machines for a deeper, more consistent clean.",
    img: "/images/how-it-works/step-2.png",
  },
  {
    num: 3,
    title: "Precision-finished",
    desc: "Every piece is carefully inspected and finished using advanced machines for consistent, exceptional results.",
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

const houseHelpSteps = [
  {
    num: 1,
    title: "Book a help",
    desc: "Choose the type of help you need, select a convenient time and location. We'll take care of the rest.",
    img: "/images/how-it-works/house-help/step-1.png",
  },
  {
    num: 2,
    title: "We assign the right help",
    desc: "We carefully verify and assign a trained and experienced house help based on your requirements.",
    img: "/images/how-it-works/house-help/step-2.png",
  },
  {
    num: 3,
    title: "Help you can trust",
    desc: "They arrive on time and get the job done with care, respect and professionalism.",
    img: "/images/how-it-works/house-help/step-3.png",
  },
  {
    num: 4,
    title: "Come home to comfort",
    desc: "Relax in a clean, organized home while we take care of what matters.",
    img: "/images/how-it-works/house-help/step-4.png",
  },
];

function StepGrid({
  steps,
  isCircularImage = false,
}: {
  steps: typeof laundrySteps;
  isCircularImage?: boolean;
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 items-start justify-between w-full relative gap-x-[12px] gap-y-[32px] sm:gap-[48px] md:gap-[24px]">
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
          <ScrollReveal
            delay={idx * 150}
            className="w-full flex justify-center mb-[16px] sm:mb-[32px]"
          >
            <div className="w-[28px] h-[28px] sm:w-[32px] sm:h-[32px] rounded-full bg-[var(--gold)] text-[#FFFFFF] flex items-center justify-center text-[13px] sm:text-[15px] font-medium">
              {step.num}
            </div>
          </ScrollReveal>

          {/* Image with glow behind it */}
          <ScrollReveal
            delay={idx * 150 + 100}
            className="w-full flex justify-center mb-[16px] sm:mb-[32px] md:mb-[40px]"
          >
            <div className="relative flex items-center justify-center w-full h-[140px] sm:h-[200px] md:h-[260px]">
              {/* Background circle (only for non-circular images) */}
              {!isCircularImage && (
                <div className="absolute w-[150px] h-[150px] sm:w-[160px] sm:h-[160px] md:w-[200px] md:h-[200px] lg:w-[220px] lg:h-[220px] bg-[#e6dfcf] rounded-full -z-10"></div>
              )}

              {/* Image container */}
              <div
                className={`relative ${isCircularImage
                  ? "w-[150px] h-[150px] sm:w-[160px] sm:h-[160px] md:w-[200px] md:h-[200px] lg:w-[220px] lg:h-[220px] rounded-full overflow-hidden"
                  : "w-[200px] h-[200px] sm:w-[220px] sm:h-[220px] md:w-[240px] md:h-[240px] lg:w-[300px] lg:h-[300px]"
                  }`}
              >
                <Image
                  src={step.img}
                  alt={step.title}
                  fill
                  className={
                    isCircularImage
                      ? "object-cover"
                      : "object-contain drop-shadow-[0_20px_30px_rgba(33,28,19,0.1)] scale-110"
                  }
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Text */}
          <ScrollReveal delay={idx * 150 + 200}>
            <h3
              className="text-[15px] sm:text-[22px] text-[var(--ink)] mb-[8px] sm:mb-[16px] font-medium"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              {step.title}
            </h3>
          </ScrollReveal>

          <ScrollReveal delay={idx * 150 + 300}>
            <p className="text-[13px] sm:text-[15px] text-[var(--ink-soft)] leading-[1.4] sm:leading-[1.6] max-w-[240px]">
              {step.desc}
            </p>
          </ScrollReveal>
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
          <ScrollReveal delay={0}>
            <p className="text-[15px] sm:text-[20px] font-bold tracking-[0.15em] text-[var(--gold)] uppercase mb-[16px] md:mb-[24px]">
              HOW IT WORKS
            </p>
          </ScrollReveal>
          <ScrollReveal delay={150}>
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
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <p className="text-[var(--ink-soft)] text-[17px] leading-[1.7] max-w-[500px] mx-auto">
              We handle the hard work so you don&apos;t have to.
              <br />
              Clean, refreshed clothes in four easy steps.
            </p>
          </ScrollReveal>
        </div>

        {/* Laundry Section */}
        <div className="w-full mb-[60px] md:mb-[80px]">
          <ScrollReveal delay={0}>
            <h3
              className="text-[28px] md:text-[36px] text-[var(--ink)] mb-[32px] md:mb-[48px] font-medium text-center"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Laundry
            </h3>
          </ScrollReveal>
          <StepGrid steps={laundrySteps} />
        </div>

        {/* Car Wash Section */}
        <div className="w-full mb-[60px] md:mb-[80px]">
          <ScrollReveal delay={0}>
            <h3
              className="text-[28px] md:text-[36px] text-[var(--ink)] mb-[32px] md:mb-[48px] font-medium text-center"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Doorstep Car Wash
            </h3>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <StepGrid steps={carWashSteps} />
          </ScrollReveal>
        </div>

        {/* House Help Section */}
        <div className="w-full">
          <ScrollReveal delay={0}>
            <h3
              className="text-[28px] md:text-[36px] text-[var(--ink)] mb-[32px] md:mb-[48px] font-medium text-center"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              House Help
            </h3>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <StepGrid steps={houseHelpSteps} isCircularImage={true} />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
