"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";
import ThemeToggle from "../ui/ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Helper to check if a link is active
  const isActive = (path: string) => pathname?.startsWith(path);

  return (
    <nav className={styles.nav}>
      <div className={styles.navLeft}>
        <Link href="/" className={styles.wordmark}>
          Clean<span style={{ color: "var(--gold-bright)" }}>7</span>
        </Link>
      </div>

      <ul className={styles.navLinks}>
        <li>
          <Link
            href="/services"
            className={isActive("/services") ? styles.active : ""}
          >
            Services
          </Link>
        </li>
        <li>
          <Link href="#">How it works</Link>
        </li>
        <li>
          <Link
            href="/pricing"
            className={isActive("/pricing") ? styles.active : ""}
          >
            Pricing
          </Link>
        </li>
      </ul>

      <div
        className={styles.navRight}
        style={{ display: "flex", alignItems: "center" }}
      >
        <ThemeToggle />
        <Link href="#download-app" className={styles.navCta}>
          Download App
        </Link>
      </div>

      <button
        className={styles.navToggle}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
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
        <Link
          href="/services"
          className={isActive("/services") ? styles.active : ""}
        >
          Services
        </Link>
        <Link href="#">How it works</Link>
        <Link
          href="/pricing"
          className={isActive("/pricing") ? styles.active : ""}
        >
          Pricing
        </Link>
        <Link href="#download-app" className={styles.navCta}>
          Download App
        </Link>
      </div>
    </nav>
  );
}
