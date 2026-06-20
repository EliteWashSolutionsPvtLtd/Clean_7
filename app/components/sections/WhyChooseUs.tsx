"use client";

import { useEffect, useRef } from "react";
import { WixMadeForDisplayFont } from "@/app/fonts";
import Container from "../layout/Container";
import { Truck, BadgeCheck, Shield, Clock } from "lucide-react";
import {
  gsap,
  prefersReducedMotion,
  getResponsiveConfig,
  ANIMATION_CONFIG,
} from "@/app/lib/animations";

const trustFeatures = [
  {
    title: "Free Pickup & Delivery",
    description: "Doorstep convenience.",
    icon: <Truck className="h-8 w-8 sm:h-10 sm:w-10" />,
    gradient: { from: "#FFAB5C", to: "#FF7700" },
  },
  {
    title: "No Hidden Charges",
    description: "Transparent pricing, always",
    icon: <BadgeCheck className="h-8 w-8 sm:h-10 sm:w-10" />,
    gradient: { from: "#98BCD6", to: "#6A9BC3" },
  },
  {
    title: "Hygienic Cleaning",
    description: "Fabric-safe and sanitized",
    icon: <Shield className="h-8 w-8 sm:h-10 sm:w-10" />,
    gradient: { from: "#D4B8AD", to: "#A68B7B" },
  },
  {
    title: "On-Time Delivery",
    description: "Reliable and punctual service",
    icon: <Clock className="h-8 w-8 sm:h-10 sm:w-10" />,
    gradient: { from: "#E6C29E", to: "#D4A574" },
  },
];

function TrustCard({ feature }: { feature: (typeof trustFeatures)[0] }) {
  return (
    <div className="group flex h-full flex-col items-center justify-between gap-3 min-[520px]:gap-4 sm:gap-5 rounded-[20px] min-[520px]:rounded-[24px] sm:rounded-[28px] border border-[#E8DFD6]/50 bg-gradient-to-br from-[#FEFEFE] to-[#F8F5F2] p-4 min-[520px]:p-5 sm:p-8 text-center shadow-[6px_6px_16px_rgba(209,199,189,0.45),-6px_-6px_16px_rgba(255,255,255,0.9),inset_1px_1px_2px_rgba(255,255,255,0.8),inset_-1px_-1px_2px_rgba(209,199,189,0.15)] transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 hover:shadow-[8px_8px_20px_rgba(209,199,189,0.5),-8px_-8px_20px_rgba(255,255,255,0.95),inset_1px_1px_3px_rgba(255,255,255,0.9),inset_-1px_-1px_3px_rgba(209,199,189,0.2)]">
      <span
        className="flex h-14 w-14 min-[520px]:h-16 min-[520px]:w-16 sm:h-20 sm:w-20 md:h-22 md:w-22 shrink-0 items-center justify-center rounded-xl min-[520px]:rounded-2xl sm:rounded-3xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110"
        style={{
          background: `linear-gradient(135deg, ${feature.gradient.from} 0%, ${feature.gradient.to} 100%)`,
          boxShadow: `0 6px 20px rgba(0,0,0,0.18), inset 0 1px 2px rgba(255,255,255,0.3)`,
        }}
      >
        {feature.icon}
      </span>
      <h3
        className="text-[15px] min-[520px]:text-base sm:text-lg md:text-xl font-semibold text-[#33302E]"
        style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
      >
        {feature.title}
      </h3>
      <p className="text-[13px] min-[520px]:text-[14px] sm:text-[15px] md:text-base text-[#5E5450] leading-relaxed">
        {feature.description}
      </p>
    </div>
  );
}

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const config = getResponsiveConfig();

      gsap.fromTo(
        ".why-choose-header",
        { opacity: 0, y: config.distance.medium },
        {
          opacity: 1,
          y: 0,
          duration: config.duration.normal * 1.3,
          ease: ANIMATION_CONFIG.ease.default,
          scrollTrigger: {
            trigger: ".why-choose-header",
            start: "top 75%",
            once: true,
          },
        },
      );

      const cards = gsap.utils.toArray(".why-choose-card") as Element[];
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: config.distance.large, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: config.duration.normal * 1.2,
            delay: index * 0.1,
            ease: ANIMATION_CONFIG.ease.smooth,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              once: true,
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="why-choose-us"
      ref={sectionRef}
      className="py-[60px] sm:py-[80px] md:py-[100px] px-[20px] bg-gradient-to-b from-white to-[#FFFBF6]"
    >
      <Container isMaxWidth={true} className="max-w-[1200px]">
        <div className="why-choose-header gsap-animate text-center mb-10 sm:mb-14 opacity-0">
          <h2
            className="font-semibold text-[#33302E] -mt-4"
            style={{
              fontFamily: WixMadeForDisplayFont.style.fontFamily,
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            }}
          >
            Why Choose <span className="text-orange-services">Wash & Wow</span>?
          </h2>
          <p className="text-[#5E5450] mt-3 max-w-xl mx-auto text-[16px] sm:text-[17px]">
            Convenience, transparent pricing, and dependable quality across
            every service we offer.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 min-[520px]:grid-cols-2 lg:grid-cols-4 auto-rows-fr">
          {trustFeatures.map((feature) => (
            <div
              key={feature.title}
              className="why-choose-card gsap-animate opacity-0 h-full"
            >
              <TrustCard feature={feature} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
