"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { WixMadeForDisplayFont } from "@/app/fonts";
import Container from "../layout/Container";
import { SERVICE_CATEGORIES, categoryPath } from "@/app/lib/service-categories";
import {
  gsap,
  prefersReducedMotion,
  getResponsiveConfig,
  ANIMATION_CONFIG,
} from "@/app/lib/animations";

type Props = {
  /** When set, wraps the section with this id (e.g. home hash navigation). */
  sectionId?: string;
  /** Show section eyebrow + title (hub page can use its own hero). */
  showHeader?: boolean;
  /**
   * When true (e.g. /services hub), adds a bit more stagger delay.
   */
  deepStagger?: boolean;
  /** Tighter section + grid gaps (e.g. /services hub). */
  compactSpacing?: boolean;
};

const categoryImageMap: Record<string, string> = {
  "laundry": "/images/about/service-laundry.png",
  "home-cleaning": "/images/about/service-home-cleaning.png",
  "doorstep-car-wash": "/images/about/service-car-wash.png",
  "pest-control": "/images/about/service-pest-control.png",
};

export default function ServiceCategoriesGrid({
  sectionId,
  showHeader = true,
  deepStagger = false,
  compactSpacing = false,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set(".scg-reveal", { opacity: 1, y: 0 });
      gsap.set(".scg-card", { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const config = getResponsiveConfig();

      if (showHeader) {
        gsap.fromTo(
          ".scg-reveal",
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: config.duration.normal,
            stagger: 0.1,
            ease: ANIMATION_CONFIG.ease.smooth,
            scrollTrigger: {
              trigger: ".scg-header",
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      const cards = gsap.utils.toArray(".scg-card") as HTMLElement[];
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: config.duration.normal,
            delay: deepStagger ? index * 0.1 : index * 0.05,
            ease: ANIMATION_CONFIG.ease.smooth,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [showHeader, deepStagger]);

  const sectionPad = compactSpacing
    ? "pt-0 pb-16 sm:pb-20 md:pb-24"
    : "py-16 sm:py-20 md:py-24";
  const gridGap = compactSpacing ? "gap-5 sm:gap-6" : "gap-6 sm:gap-8";
  const headerMb = compactSpacing ? "mb-10 sm:mb-12" : "mb-14 sm:mb-16";

  const inner = (
    <>
      {showHeader && (
        <div className={`scg-header mx-auto max-w-2xl text-center ${headerMb}`}>
          <span className="scg-reveal block text-[11px] font-bold uppercase tracking-[0.26em] text-[#FF9431] sm:text-[12px] mb-3">
            What We Offer
          </span>
          <h2
            className="scg-reveal text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-tight text-[#2C2118]"
            style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
          >
            Services for a cleaner home &amp; life
          </h2>
          <p className="scg-reveal mt-4 text-[15px] leading-relaxed text-[#6B5E54] sm:text-[16px] max-w-lg mx-auto">
            Four categories, one trusted partner — book everything you need from
            a single app.
          </p>
        </div>
      )}

      <div className={`grid grid-cols-1 md:grid-cols-2 ${gridGap}`}>
        {SERVICE_CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={categoryPath(cat.slug)}
            scroll={true}
            className="scg-card group relative flex flex-col overflow-hidden rounded-[24px] sm:rounded-[32px] border border-[#E5E0DB] bg-white transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-[#FF9431]/30 hover:shadow-[0_24px_48px_-12px_rgba(255,148,49,0.12)] opacity-0"
          >
            <span className="absolute right-6 top-6 sm:right-10 sm:top-10 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-[#E5E0DB] bg-white text-[#8A7B72] transition-all duration-300 group-hover:border-[#FF9431] group-hover:bg-[#FF9431] group-hover:text-white group-hover:-rotate-12 group-hover:scale-110 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <ArrowUpRight className="h-5 w-5" />
            </span>

            {/* Top Text Content */}
            <div className="flex flex-col p-6 sm:p-10 pb-0 sm:pb-0 z-10 relative bg-white">
              <h3
                className="text-[1.5rem] font-bold text-[#2C2118] sm:text-[1.75rem] leading-tight pr-12"
                style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
              >
                {cat.cardTitle}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[#6B5E54]">
                {cat.teaser}
              </p>
            </div>

            {/* Bottom Image Container */}
            <div className="relative mt-10 flex-1 w-full overflow-hidden min-h-[240px] sm:min-h-[280px] z-0">
              <div className="absolute inset-0 bg-gradient-to-b from-white via-white/20 to-transparent z-10 h-16 pointer-events-none" />
              <Image
                src={categoryImageMap[cat.slug] || "/images/about/hero-towels.png"}
                alt={cat.cardTitle}
                fill
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </Link>
        ))}
      </div>
    </>
  );

  const wrapperProps = {
    ref: sectionRef,
    className: `${sectionPad} px-5 bg-white`,
    ...(sectionId ? { id: sectionId } : {}),
  };

  return (
    <section {...wrapperProps}>
      <Container isMaxWidth={true} className="max-w-[1160px]">
        {inner}
      </Container>
    </section>
  );
}
