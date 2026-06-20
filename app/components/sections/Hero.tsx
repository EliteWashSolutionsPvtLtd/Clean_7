"use client";

import React from "react";
import Link from "next/link";
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
          <Link href="#" className={styles.btnGhost}>
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
        <div className={styles.foldStack}>
          <div className={styles.careTag}>Hand-finished</div>
          <div className={`${styles.foldCard} ${styles.card1}`}>
            <div className={styles.stitch}></div>
          </div>
          <div className={`${styles.foldCard} ${styles.card2}`}>
            <div className={styles.stitch}></div>
          </div>
          <div className={`${styles.foldCard} ${styles.card3}`}>
            <div className={styles.stitch}></div>
          </div>
        </div>
        <div className={styles.visualCaption}>
          <p className={styles.vcText}>
            Every order folded by hand to a five-point standard before it leaves
            our care.
          </p>
          <span className={styles.vcMark}>No. 01 — Press &amp; fold</span>
        </div>
      </div>
    </section>
  );
}
