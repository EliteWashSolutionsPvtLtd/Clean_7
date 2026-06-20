"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";
import ThemeToggle from "../ui/ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Prevent scrolling when mobile menu is open (including iOS Safari bounce)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      const preventScroll = (e: TouchEvent) => {
        e.preventDefault();
      };
      // Passive must be false to allow preventDefault
      document.addEventListener("touchmove", preventScroll, { passive: false });

      return () => {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
        document.removeEventListener("touchmove", preventScroll);
      };
    }
  }, [isOpen]);

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
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          zIndex: 60,
          position: "relative",
        }}
      >
        <ThemeToggle />
        <Link href="#download-app" className={styles.navCta}>
          Download App
        </Link>
        <button
          className={styles.navToggle}
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
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
      </div>

      {/* Mobile Full-Screen Menu Overlay */}
      <div className={`${styles.navMobilePanel} ${isOpen ? styles.open : ""}`}>
        <div className={styles.mobileHeader}>
          <button
            className={styles.closeButton}
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className={styles.mobileLinks}>
          <Link
            href="/services"
            className={isActive("/services") ? styles.active : ""}
            onClick={() => setIsOpen(false)}
          >
            Services
          </Link>
          <Link href="#" onClick={() => setIsOpen(false)}>
            How it works
          </Link>
          <Link
            href="/pricing"
            className={isActive("/pricing") ? styles.active : ""}
            onClick={() => setIsOpen(false)}
          >
            Pricing
          </Link>
        </div>
        <div className={styles.mobileFooter}>
          <Link
            href="#download-app"
            className={styles.navCta}
            onClick={() => setIsOpen(false)}
          >
            Download App
          </Link>
        </div>
      </div>
    </nav>
  );
}
