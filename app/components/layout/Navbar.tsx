"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";
import ThemeToggle from "../ui/ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll event for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
      };
    }
  }, [isOpen]);

  // Helper to check if a link is active
  const isActive = (path: string) => pathname?.startsWith(path);

  return (
    <div className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 border-b ${isScrolled ? "bg-ground/70 backdrop-blur-lg border-line shadow-sm" : "border-transparent bg-transparent"}`}>
      <nav className={`${styles.nav} ${isScrolled ? styles.navScrolled : ""}`}>
        <div className={styles.navLeft}>
          <Link href="/" className={styles.logoLink}>
            <Image
              src="/images/logo/logo.png"
              alt="Clean7 Logo"
              width={60}
              height={60}
              className={styles.logoImage}
              priority
            />
            <div className={styles.brandContainer}>
              <span className={styles.wordmark}>
                Clean<span className={styles.goldGradientText}>7</span>
              </span>
              <span className={styles.subtitle}>
                Premium care, delivered with elegance
              </span>
            </div>
          </Link>
        </div>

        <ul className={styles.navLinks}>
          <li>
            <Link href="/" className={pathname === "/" ? styles.active : ""}>
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/services"
              className={isActive("/services") ? styles.active : ""}
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              href="/pricing"
              className={isActive("/pricing") ? styles.active : ""}
              prefetch={true}
            >
              Pricing
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={isActive("/about") ? styles.active : ""}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/careers"
              className={isActive("/careers") ? styles.active : ""}
            >
              Careers
            </Link>
          </li>
          <li>
            <Link href="/blog" className={isActive("/blog") ? styles.active : ""}>
              Blog
            </Link>
          </li>
          <li>
            <Link
              href="/stores"
              className={isActive("/stores") ? styles.active : ""}
            >
              Stores
            </Link>
          </li>
          <li>
            <Link
              href="/franchise"
              className={isActive("/franchise") ? styles.active : ""}
            >
              Franchise
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
          <Link href="/#download-app" className={styles.navCta}>
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
              href="/"
              className={pathname === "/" ? styles.active : ""}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/services"
              className={isActive("/services") ? styles.active : ""}
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/pricing"
              className={isActive("/pricing") ? styles.active : ""}
              onClick={() => setIsOpen(false)}
              prefetch={true}
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className={isActive("/about") ? styles.active : ""}
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/careers"
              className={isActive("/careers") ? styles.active : ""}
              onClick={() => setIsOpen(false)}
            >
              Careers
            </Link>
            <Link
              href="/blog"
              className={isActive("/blog") ? styles.active : ""}
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/stores"
              className={isActive("/stores") ? styles.active : ""}
              onClick={() => setIsOpen(false)}
            >
              Stores
            </Link>
            <Link
              href="/franchise"
              className={isActive("/franchise") ? styles.active : ""}
              onClick={() => setIsOpen(false)}
            >
              Franchise
            </Link>
          </div>
          <div className={styles.mobileFooter}>
            {/* Legal Links Section */}
            <div className={styles.legalSection}>
              <span className={styles.legalTitle}>Legal</span>
              <Link
                href="/privacy-policy"
                className={isActive("/privacy-policy") ? styles.active : ""}
                onClick={() => setIsOpen(false)}
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-and-conditions"
                className={isActive("/terms-and-conditions") ? styles.active : ""}
                onClick={() => setIsOpen(false)}
              >
                Terms of Services
              </Link>
              <Link
                href="/terms-of-use"
                className={isActive("/terms-of-use") ? styles.active : ""}
                onClick={() => setIsOpen(false)}
              >
                Terms of Use
              </Link>
            </div>
            <Link
              href="/#download-app"
              className={styles.navCta}
              onClick={() => setIsOpen(false)}
            >
              Download App
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
