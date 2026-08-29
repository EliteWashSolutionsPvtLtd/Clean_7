"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./Hero.module.css";
import { useState, useEffect, useRef } from "react";

const AnimatedNumber = ({
  end,
  suffix = "",
  duration = 2000,
  decimals = 0,
}: {
  end: number;
  suffix?: string;
  duration?: number;
  decimals?: number;
}) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          setTimeout(() => {
            let startTimestamp: number | null = null;
            const step = (timestamp: number) => {
              if (!startTimestamp) startTimestamp = timestamp;
              const progress = Math.min(
                (timestamp - startTimestamp) / duration,
                1,
              );
              const easeProgress = 1 - Math.pow(1 - progress, 2);
              setCount(easeProgress * end);
              if (progress < 1) {
                window.requestAnimationFrame(step);
              } else {
                setCount(end);
              }
            };
            window.requestAnimationFrame(step);
          }, 600);
        }
      },
      { threshold: 1.0 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [end, duration, hasAnimated]);

  return (
    <span ref={ref}>
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
};

const TrustStats = ({ className }: { className?: string }) => (
  <div className={`${styles.trustRow} ${className || ""}`}>
    <div className={styles.trustStat}>
      <div className={styles.num}>
        <AnimatedNumber end={24} suffix=" hr" />
      </div>
      <div className={styles.label}>Turnaround</div>
    </div>
    <div className={styles.trustDivider}></div>
    <div className={styles.trustStat}>
      <div className={styles.num}>
        <AnimatedNumber end={40} suffix="k+" />
      </div>
      <div className={styles.label}>Expected Garments monthly</div>
    </div>
    <div className={styles.trustDivider}></div>
    <div className={styles.trustStat}>
      <div className={styles.num}>
        <AnimatedNumber end={4.9} decimals={1} />
      </div>
      <div className={styles.label}>Expected Rating</div>
    </div>
  </div>
);

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.copy}>
        <h1 className={styles.h1}>
          <span className={styles.line}>
            <span>Everything You Need. <em>Professionally Cared For.</em></span>
          </span>
        </h1>

        <p className={styles.sub}>
          {/* Clean7 brings together premium laundry and dry cleaning, doorstep car washing, and professional home cleaning—all under one trusted brand. Backed by advanced equipment, trained professionals, and reliable service, we deliver exceptional quality, unmatched convenience, and complete peace of mind, right to your doorstep. */}
          Clean7 brings premium laundry, dry cleaning, doorstep car washing, and professional home cleaning under one trusted brand. With advanced equipment, trained professionals, and reliable service, we deliver exceptional quality, unmatched convenience, and complete peace of mind—right to your doorstep.
          <br />
          <br />
          <em>Laundry. Car Wash. Home Cleaning. One Trusted Brand.</em>
        </p>

        <div className={styles.ctaRow}>
          <Link href="#" className={styles.btnPrimary}>
            Schedule your first pickup
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        <div className="max-[980px]:hidden">
          <TrustStats />
        </div>
      </div>

      <div className={styles.visual}>
        <div className="flex flex-col w-full min-[981px]:max-w-[560px] px-4 min-[981px]:px-0 pt-0 min-[981px]:pt-20 pb-0 min-[981px]:pb-12 mt-[30px] min-[981px]:mt-12">
          <div className="relative w-full h-[220px] min-[981px]:h-[500px] overflow-hidden rounded-2xl min-[981px]:rounded-3xl group">
            {/* Fade Overlays */}
            <div className="hidden min-[981px]:block absolute top-0 left-0 w-full h-[100px] bg-gradient-to-b from-[var(--ground)] to-transparent z-10 pointer-events-none"></div>
            <div className="hidden min-[981px]:block absolute bottom-0 left-0 w-full h-[100px] bg-gradient-to-t from-[var(--ground)] to-transparent z-10 pointer-events-none"></div>

            <div className="min-[981px]:hidden absolute top-0 left-0 h-full w-[60px] bg-gradient-to-r from-[var(--ground)] to-transparent z-10 pointer-events-none"></div>
            <div className="min-[981px]:hidden absolute top-0 right-0 h-full w-[60px] bg-gradient-to-l from-[var(--ground)] to-transparent z-10 pointer-events-none"></div>

            {/* Mobile Scrolling Container */}
            <div className="min-[981px]:hidden flex flex-row gap-4 w-max h-full animate-horizontal-marquee group-hover:[animation-play-state:paused] will-change-transform">
              {/* First Set */}
              <div className="flex flex-row gap-4 h-full">
                <div className="relative w-[280px] h-full rounded-2xl overflow-hidden shrink-0">
                  <Image
                    src="/images/services/laundry.png"
                    fill
                    className="object-cover"
                    alt="Premium Laundry"
                    priority
                  />
                </div>
                <div className="relative w-[280px] h-full rounded-2xl overflow-hidden shrink-0">
                  <Image
                    src="/images/services/car-wash.png"
                    fill
                    className="object-cover"
                    alt="Professional Car Wash"
                    priority
                  />
                </div>
                <div className="relative w-[280px] h-full rounded-2xl overflow-hidden shrink-0">
                  <Image
                    src="/images/services/house-help.png"
                    fill
                    className="object-cover"
                    alt="House Help Services"
                    priority
                  />
                </div>
              </div>

              {/* Duplicated Second Set */}
              <div className="flex flex-row gap-4 h-full">
                <div className="relative w-[280px] h-full rounded-2xl overflow-hidden shrink-0">
                  <Image
                    src="/images/services/laundry.png"
                    fill
                    className="object-cover"
                    alt="Premium Laundry"
                  />
                </div>
                <div className="relative w-[280px] h-full rounded-2xl overflow-hidden shrink-0">
                  <Image
                    src="/images/services/car-wash.png"
                    fill
                    className="object-cover"
                    alt="Professional Car Wash"
                  />
                </div>
                <div className="relative w-[280px] h-full rounded-2xl overflow-hidden shrink-0">
                  <Image
                    src="/images/services/house-help.png"
                    fill
                    className="object-cover"
                    alt="House Help Services"
                  />
                </div>
              </div>
            </div>

            {/* Desktop Scrolling Container */}
            <div className="hidden min-[981px]:flex flex-col gap-6 w-auto h-auto animate-vertical-marquee group-hover:[animation-play-state:paused] will-change-transform">
              {/* First Set */}
              <div className="flex flex-col gap-6 h-auto">
                <div className="relative w-full h-[400px] rounded-3xl overflow-hidden shrink-0">
                  <Image
                    src="/images/services/laundry.png"
                    fill
                    className="object-cover"
                    alt="Premium Laundry"
                    priority
                  />
                </div>
                <div className="relative w-full h-[400px] rounded-3xl overflow-hidden shrink-0">
                  <Image
                    src="/images/services/car-wash.png"
                    fill
                    className="object-cover"
                    alt="Professional Car Wash"
                    priority
                  />
                </div>
                <div className="relative w-full h-[400px] rounded-3xl overflow-hidden shrink-0">
                  <Image
                    src="/images/services/house-help.png"
                    fill
                    className="object-cover"
                    alt="House Help Services"
                    priority
                  />
                </div>
              </div>

              {/* Duplicated Second Set */}
              <div className="flex flex-col gap-6 h-auto">
                <div className="relative w-full h-[400px] rounded-3xl overflow-hidden shrink-0">
                  <Image
                    src="/images/services/laundry.png"
                    fill
                    className="object-cover"
                    alt="Premium Laundry"
                  />
                </div>
                <div className="relative w-full h-[400px] rounded-3xl overflow-hidden shrink-0">
                  <Image
                    src="/images/services/car-wash.png"
                    fill
                    className="object-cover"
                    alt="Professional Car Wash"
                  />
                </div>
                <div className="relative w-full h-[400px] rounded-3xl overflow-hidden shrink-0">
                  <Image
                    src="/images/services/house-help.png"
                    fill
                    className="object-cover"
                    alt="House Help Services"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="min-[981px]:hidden flex w-full px-4 pb-16 justify-center">
        <TrustStats className="!mt-[50px]" />
      </div>
    </section>
  );
}
