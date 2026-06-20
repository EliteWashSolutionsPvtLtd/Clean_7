"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/app/(pages)/services/laundry/Laundry.module.css";

const heroSlides = [
  {
    image: "/images/services/laundry.png",
    alt: "Laundry Service",
  },
  {
    image: "/images/services/car-wash.png",
    alt: "Car Wash",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isShuffling, setIsShuffling] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsShuffling(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        setIsShuffling(false);
      }, 500);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

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
            <div className={styles.label}>Garments handled monthly</div>
          </div>
          <div className={styles.trustDivider}></div>
          <div className={styles.trustStat}>
            <div className={styles.num}>4.9</div>
            <div className={styles.label}>Average rating</div>
          </div>
        </div>
      </div>

      <div className={styles.visual}>
        <div className="flex flex-col items-center max-w-[400px] w-full px-6 md:px-0 pt-32 md:pt-40 pb-12">
          <div className="relative w-full aspect-[4/5] md:w-[400px] md:h-[500px] mb-6 z-10">
            {heroSlides.map((slide, idx) => {
              const isActive = idx === currentSlide;
              const isShufflingOut = isShuffling && isActive;

              let cardClass = "";
              if (isShufflingOut) {
                cardClass =
                  "z-30 translate-x-[110%] scale-[0.9] rotate-[12deg] opacity-100";
              } else if (isActive) {
                cardClass = "z-20 translate-x-0 scale-100 rotate-0 opacity-100";
              } else {
                cardClass =
                  "z-10 translate-x-[24px] -translate-y-[16px] scale-[0.9] rotate-[6deg] opacity-90 shadow-none";
              }

              return (
                <div
                  key={idx}
                  className={`absolute inset-0 rounded-2xl overflow-hidden shadow-2xl border-2 border-[var(--line)] transition-all duration-500 ease-in-out origin-bottom-right ${cardClass}`}
                >
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  <div
                    className={`absolute inset-0 bg-black transition-opacity duration-500 pointer-events-none ${isActive && !isShufflingOut ? "opacity-0" : "opacity-30"}`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
