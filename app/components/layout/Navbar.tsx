"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";
import ThemeToggle from "../ui/ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.navLeft}>
        <div className={styles.wordmark}>
          Clean<span style={{ color: "var(--gold-bright)" }}>7</span>
        </div>
      </div>

      <ul className={styles.navLinks}>
        <li>
          <Link href="#">Services</Link>
        </li>
        <li>
          <Link href="#">How it works</Link>
        </li>
        <li>
          <Link href="#">Pricing</Link>
        </li>
      </ul>

      <div
        className={styles.navRight}
        style={{ display: "flex", alignItems: "center" }}
      >
        <ThemeToggle />
        <Link href="#" className={styles.navCta}>
          Book a pickup
        </Link>
      </div>

      <button
        className={styles.navToggle}
        aria-label="Open menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </svg>
      </button>

      <div className={`${styles.navMobilePanel} ${isOpen ? styles.open : ""}`}>
        <Link href="#">Services</Link>
        <Link href="#">How it works</Link>
        <Link href="#">Pricing</Link>
        <Link href="#" className={styles.navCta}>
          Book a pickup
        </Link>
      </div>
    </nav>
  );
}
