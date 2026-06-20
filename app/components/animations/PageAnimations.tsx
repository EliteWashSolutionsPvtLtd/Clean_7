"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  gsap,
  ScrollTrigger,
  prefersReducedMotion,
  getResponsiveConfig,
  isMobile,
  ANIMATION_CONFIG,
} from "@/app/lib/animations";

/** Next step starts when the previous tween has reached this fraction of its duration (GSAP `"<70%"`). */
const SEQUENCE_CHAIN_AT_PREV_PROGRESS = 0.4;
const sequenceAfterPrev = `<${Math.round(SEQUENCE_CHAIN_AT_PREV_PROGRESS * 100)}%`;

interface PageHeroAnimationProps {
  children: React.ReactNode;
  variant?: "default" | "split" | "centered" | "centeredSequential" | "none";
}

export function PageHeroAnimation({
  children,
  variant = "default",
}: PageHeroAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Scroll-to-top on navigation is handled globally in LenisProvider (all routes).

  useEffect(() => {
    if (prefersReducedMotion()) return;

    // Parent page drives animation (e.g. pricing full-column sequence)
    if (variant === "none") return;

    const config = getResponsiveConfig();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: ANIMATION_CONFIG.ease.default },
      });

      if (variant === "split") {
        tl.fromTo(
          ".page-hero-left",
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: config.duration.normal * 1.2 },
        ).fromTo(
          ".page-hero-right",
          { opacity: 0, x: 50 },
          { opacity: 1, x: 0, duration: config.duration.normal * 1.2 },
          "<",
        );
      } else if (variant === "centered") {
        tl.fromTo(
          ".page-hero-title",
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: config.duration.normal,
            ease: ANIMATION_CONFIG.ease.smooth,
          },
        )
          .fromTo(
            ".page-hero-meta",
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: config.duration.fast,
              ease: ANIMATION_CONFIG.ease.default,
            },
            sequenceAfterPrev,
          )
          .fromTo(
            ".page-hero-subtitle",
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: config.duration.fast,
              ease: ANIMATION_CONFIG.ease.default,
            },
            sequenceAfterPrev,
          );
      } else if (variant === "centeredSequential") {
        tl.fromTo(
          ".page-hero-title",
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: config.duration.normal,
            ease: ANIMATION_CONFIG.ease.smooth,
          },
        )
          .fromTo(
            ".page-hero-meta",
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: config.duration.fast,
              ease: ANIMATION_CONFIG.ease.default,
            },
            sequenceAfterPrev,
          )
          .fromTo(
            ".page-hero-subtitle",
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: config.duration.fast,
              ease: ANIMATION_CONFIG.ease.default,
            },
            sequenceAfterPrev,
          )
          .fromTo(
            ".page-hero-cta",
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: config.duration.fast,
              ease: ANIMATION_CONFIG.ease.default,
            },
            sequenceAfterPrev,
          );
      } else {
        tl.fromTo(
          ".page-hero-content",
          { opacity: 0, y: config.distance.medium },
          { opacity: 1, y: 0, duration: config.duration.normal },
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [pathname, variant]);

  return <div ref={containerRef}>{children}</div>;
}

interface PageSectionsAnimationProps {
  children: React.ReactNode;
  className?: string;
  /** Animate `.page-section` in order with stagger when the first section hits the viewport (single trigger). */
  sequentialSections?: boolean;
}

export function PageSectionsAnimation({
  children,
  className = "",
  sequentialSections = false,
}: PageSectionsAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    let ctx: gsap.Context;

    const delayMs = isMobile() ? 1200 : 800;
    const heroDelay = setTimeout(() => {
      ctx = gsap.context(() => {
        const config = getResponsiveConfig();

        const sections = gsap.utils.toArray(".page-section") as Element[];
        if (sequentialSections && sections.length > 0) {
          const sectionDuration = config.duration.normal * 1.3;
          gsap.fromTo(
            sections,
            { opacity: 0, y: config.distance.medium },
            {
              opacity: 1,
              y: 0,
              duration: sectionDuration,
              ease: ANIMATION_CONFIG.ease.default,
              stagger: sectionDuration * SEQUENCE_CHAIN_AT_PREV_PROGRESS,
              scrollTrigger: {
                trigger: sections[0],
                start: "top 80%",
                once: true,
              },
            },
          );
        } else {
          sections.forEach((section) => {
            gsap.fromTo(
              section,
              { opacity: 0, y: config.distance.medium },
              {
                opacity: 1,
                y: 0,
                duration: config.duration.normal * 1.3,
                ease: ANIMATION_CONFIG.ease.default,
                scrollTrigger: {
                  trigger: section,
                  start: "top 80%",
                  once: true,
                },
              },
            );
          });
        }

        const cards = gsap.utils.toArray(".page-card") as Element[];
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: config.distance.small, scale: 1.02 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: config.duration.normal * 1.2,
              ease: ANIMATION_CONFIG.ease.smooth,
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                once: true,
              },
            },
          );
        });

        const faqItems = gsap.utils.toArray(".page-faq-item") as Element[];
        faqItems.forEach((item) => {
          gsap.fromTo(
            item,
            { opacity: 0, x: -20 },
            {
              opacity: 1,
              x: 0,
              duration: config.duration.fast * 1.2,
              ease: ANIMATION_CONFIG.ease.default,
              scrollTrigger: {
                trigger: item,
                start: "top 88%",
                once: true,
              },
            },
          );
        });
      }, containerRef);
    }, delayMs);

    return () => {
      clearTimeout(heroDelay);
      if (ctx) ctx.revert();
    };
  }, [sequentialSections]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

interface FooterAnimationProps {
  children: React.ReactNode;
}

function revealFooterWithoutAnimation(root: HTMLElement) {
  root
    .querySelectorAll<HTMLElement>(".footer-main, .footer-copyright")
    .forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
}

export function FooterAnimation({ children }: FooterAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    if (prefersReducedMotion()) {
      revealFooterWithoutAnimation(root);
      return;
    }

    const ctx = gsap.context(() => {
      const config = getResponsiveConfig();

      // One ScrollTrigger on `.footer-main` drives both tweens so copyright cannot get a stale
      // start position when page height changes (e.g. pricing tab switch) and max scroll < old trigger.
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".footer-main",
            start: "top bottom",
            once: true,
            invalidateOnRefresh: true,
          },
        })
        .fromTo(
          ".footer-main",
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: config.duration.normal * 1.3,
            ease: ANIMATION_CONFIG.ease.default,
          },
        )
        .fromTo(
          ".footer-copyright",
          { opacity: 0 },
          {
            opacity: 1,
            duration: config.duration.fast,
            ease: ANIMATION_CONFIG.ease.default,
          },
          "<20%",
        );
    }, containerRef);

    const refresh = () => ScrollTrigger.refresh();
    requestAnimationFrame(refresh);
    const delayedRefresh = window.setTimeout(refresh, 150);

    return () => {
      window.clearTimeout(delayedRefresh);
      ctx.revert();
    };
  }, []);

  return <div ref={containerRef}>{children}</div>;
}
