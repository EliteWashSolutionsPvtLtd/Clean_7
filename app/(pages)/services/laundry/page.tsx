import React from "react";
import Link from "next/link";
import Navbar from "@/app/components/layout/Navbar";
import styles from "./Laundry.module.css";
import type { Metadata } from "next";
import { canonicalPath } from "@/app/lib/site-config";

export const metadata: Metadata = {
  title: "Laundry Services",
  description: "Garment care, done properly.",
  alternates: { canonical: canonicalPath("/services/laundry") },
};

export default function LaundryServicePage() {
  return (
    <section className={styles.hero}>
      <Navbar />

      <div className={styles.copy}>
        <div className={styles.eyebrow}>
          <div className={styles.eyebrowDash}></div>
          <span>Garment care, done properly</span>
        </div>

        <h1 className={styles.h1}>
          <span className={styles.line}><span>Worn well.</span></span>
          <span className={styles.line}><span>Cared for</span></span>
          <span className={styles.line}><span><em>even better.</em></span></span>
        </h1>

        <p className={styles.sub}>
          We pick up, hand-finish, and return every garment pressed,
          folded, and smelling like nothing at all — just clean.
          No queues, no plastic, no guesswork.
        </p>

        <div className={styles.ctaRow}>
          <Link href="#" className={styles.btnPrimary}>
            Schedule your first pickup
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
          <Link href="/#how-it-works" className={styles.btnGhost}>See how it works</Link>
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
          <div className={`${styles.foldCard} ${styles.card1}`}><div className={styles.stitch}></div></div>
          <div className={`${styles.foldCard} ${styles.card2}`}><div className={styles.stitch}></div></div>
          <div className={`${styles.foldCard} ${styles.card3}`}><div className={styles.stitch}></div></div>
        </div>
        <div className={styles.visualCaption}>
          <p className={styles.vcText}>Every order folded by hand to a five-point standard before it leaves our care.</p>
          <span className={styles.vcMark}>No. 01 — Press &amp; fold</span>
        </div>
      </div>
    </section>
  );
}
