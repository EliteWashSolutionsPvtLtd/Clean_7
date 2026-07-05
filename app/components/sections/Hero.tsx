"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "@/app/(pages)/services/laundry/Laundry.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.copy}>
        <h1 className={styles.h1}>
          <span className={styles.line}>
            <span>Worn well.</span>
          </span>
          <span className={styles.line}>
            <span>Cared for</span>
          </span>
          <span className={styles.line}>
            <span>
              <em>even better.</em>
            </span>
          </span>
        </h1>

        <p className={styles.sub}>
          We pick up, hand-finish, and return every garment pressed, folded, and
          smelling like nothing at all — just clean. No queues, no plastic, no
          guesswork.
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
          <Link href="#how-it-works" className={styles.btnGhost}>
            See how it works
          </Link>
        </div>

        <div className={styles.trustRow}>
          <div className={styles.trustStat}>
            <div className={styles.num}>24 hr</div>
            <div className={styles.label}>Turnaround</div>
          </div>
          <div className={styles.trustDivider}></div>
          <div className={styles.trustStat}>
            <div className={styles.num}>40k+</div>
            <div className={styles.label}>Expected Garments monthly</div>
          </div>
          <div className={styles.trustDivider}></div>
          <div className={styles.trustStat}>
            <div className={styles.num}>4.9</div>
            <div className={styles.label}>Expected Rating</div>
          </div>
        </div>
      </div>

      <div className={styles.visual}>
        <div className="flex flex-col w-full max-w-[340px] md:max-w-[560px] px-4 md:px-0 pt-0 md:pt-20 pb-12 mt-12">
          <div className="relative w-full aspect-[4/5] md:w-[560px] md:h-[600px] overflow-hidden rounded-2xl md:rounded-3xl group">
            {/* Fade Overlays */}
            <div className="absolute top-0 left-0 w-full h-[60px] md:h-[100px] bg-gradient-to-b from-[var(--ground)] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-full h-[60px] md:h-[100px] bg-gradient-to-t from-[var(--ground)] to-transparent z-10 pointer-events-none"></div>

            {/* Scrolling Container */}
            <div className="flex flex-col gap-6 animate-vertical-marquee group-hover:[animation-play-state:paused] will-change-transform">
              {/* First Set */}
              <div className="flex flex-col gap-6">
                <div className="relative w-full h-[280px] md:h-[480px] rounded-2xl md:rounded-3xl overflow-hidden shrink-0">
                  <Image
                    src="/images/services/laundry.png"
                    fill
                    className="object-cover"
                    alt="Premium Laundry"
                    priority
                  />
                </div>
                <div className="relative w-full h-[280px] md:h-[480px] rounded-2xl md:rounded-3xl overflow-hidden shrink-0">
                  <Image
                    src="/images/services/car-wash.png"
                    fill
                    className="object-cover"
                    alt="Professional Car Wash"
                    priority
                  />
                </div>
                <div className="relative w-full h-[280px] md:h-[480px] rounded-2xl md:rounded-3xl overflow-hidden shrink-0">
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
              <div className="flex flex-col gap-6">
                <div className="relative w-full h-[280px] md:h-[480px] rounded-2xl md:rounded-3xl overflow-hidden shrink-0">
                  <Image
                    src="/images/services/laundry.png"
                    fill
                    className="object-cover"
                    alt="Premium Laundry"
                  />
                </div>
                <div className="relative w-full h-[280px] md:h-[480px] rounded-2xl md:rounded-3xl overflow-hidden shrink-0">
                  <Image
                    src="/images/services/car-wash.png"
                    fill
                    className="object-cover"
                    alt="Professional Car Wash"
                  />
                </div>
                <div className="relative w-full h-[280px] md:h-[480px] rounded-2xl md:rounded-3xl overflow-hidden shrink-0">
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
    </section>
  );
}
