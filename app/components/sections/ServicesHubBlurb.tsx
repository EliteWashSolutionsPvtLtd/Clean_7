"use client";

import { useEffect, useRef } from "react";
import Container from "@/app/components/layout/Container";
import { WixMadeForDisplayFont } from "@/app/fonts";
import {
  gsap,
  prefersReducedMotion,
  ANIMATION_CONFIG,
} from "@/app/lib/animations";

/**
 * Section title under the services hero — staggered eyebrow + headline on scroll.
 */
export default function ServicesHubBlurb() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set(".services-hub-blurb-line", { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".services-hub-blurb-line",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.11,
          ease: ANIMATION_CONFIG.ease.smooth,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 88%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="border-t border-[#E8DFD6]/40 bg-white px-[20px] pt-12 pb-12 sm:pt-16 sm:pb-16 md:pt-20 md:pb-20"
    >
      <Container isMaxWidth={true} className="max-w-[800px] text-center">
        <span className="services-hub-blurb-line block text-sm font-medium uppercase tracking-[0.2em] text-[#FF9431] opacity-0 sm:text-base">
          Service categories
        </span>
        <h2
          className="services-hub-blurb-line mt-2 text-[clamp(1.5rem,4vw,2.125rem)] font-semibold leading-tight text-[#33302E] opacity-0"
          style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
        >
          Explore what we offer
        </h2>
      </Container>
    </section>
  );
}
