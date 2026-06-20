"use client";

import { useEffect, useRef } from "react";
import { WixMadeForDisplayFont } from "@/app/fonts";
import Container from "../layout/Container";
import ServicesSvg from "../svg/ServicesSvg";
import {
  gsap,
  prefersReducedMotion,
  getResponsiveConfig,
  ANIMATION_CONFIG,
} from "@/app/lib/animations";

/**
 * Original services section hero (background curve, racks image, headline)
 * for the /services hub page only.
 */
export default function ServicesPageHeader() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set(".services-hero-bg", { opacity: 1 });
      gsap.set(".services-image", { opacity: 1, y: 0, scale: 1, rotation: 0 });
      gsap.set(".services-h-line", { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const config = getResponsiveConfig();

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          once: true,
        },
      });

      tl.fromTo(
        ".services-hero-bg",
        { opacity: 0 },
        { opacity: 1, duration: 0.55, ease: ANIMATION_CONFIG.ease.default },
        0,
      );

      tl.fromTo(
        ".services-image",
        {
          opacity: 0,
          y: config.distance.large + 8,
          scale: 1.07,
          rotation: -2.5,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: config.duration.slow * 1.25,
          ease: ANIMATION_CONFIG.ease.smooth,
        },
        0.06,
      );

      tl.fromTo(
        ".services-h-line",
        { opacity: 0, y: 38 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.14,
          ease: ANIMATION_CONFIG.ease.snappy,
        },
        0.18,
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative px-[20px] py-10 sm:py-12 md:py-16"
    >
      <div className="services-hero-bg pointer-events-none absolute inset-0 z-[-1] opacity-0">
        <ServicesSvg />
      </div>

      <Container
        className="flex max-w-[1200px] flex-col items-center justify-center gap-5 md:flex-row md:gap-0"
        isMaxWidth={true}
      >
        <div
          className="services-image relative order-2 flex w-full items-center justify-center opacity-0 md:order-1 md:w-auto"
          style={{ transformOrigin: "50% 50%" }}
        >
          <img
            src="/images/services/racks.png"
            alt="Laundry racks"
            className="-ml-[55px] w-full max-w-[350px] rounded-[20px] sm:max-w-[350px] md:ml-0 md:max-w-[500px] md:pr-[60px] lg:max-w-[600px] lg:pr-[110px]"
          />
        </div>

        <div className="services-header order-1 flex max-w-[500px] flex-col justify-center self-center text-center md:order-2 md:max-w-[450px] md:self-start md:text-right">
          <span
            className="services-h-line text-orange-services font-medium opacity-0"
            style={{ fontSize: "clamp(1rem, 0.5rem + 2vw, 1.563rem)" }}
          >
            Our Services
          </span>
          <h2
            className="services-h-line mt-2 font-semibold text-brown-services opacity-0"
            style={{
              fontFamily: WixMadeForDisplayFont.style.fontFamily,
              fontSize: "clamp(1.8rem,5vw,3rem)",
            }}
          >
            Care Designed <br className="hidden md:block" /> for Every Fabric
          </h2>
          <p
            className="services-h-line mt-3 text-[16px] leading-[1.65] text-dark-brown opacity-0 sm:mt-4 sm:text-[18px]"
          >
            From everyday laundry to delicate garments, we handle every piece
            with precision and care.
          </p>
        </div>
      </Container>
    </section>
  );
}
