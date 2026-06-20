"use client";

import Link from "next/link";
import AppStoreButton from "../ui/buttons/AppStoreButton";
import GooglePlayButton from "../ui/buttons/GooglePlayButton";
import { Instagram, Facebook, MessageCircle, Mail } from "lucide-react";
import { FooterAnimation } from "../animations/PageAnimations";

// --- Icons ---
const IconBriefcase = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const IconShield = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const IconLeaf = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

const IconArrowRight = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const IconShieldTiny = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const IconHeart = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

const IconSparkle = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
  </svg>
);

export default function Footer() {
  const linkClass =
    "block text-[var(--ink-soft)] text-[15px] hover:text-[var(--gold)] hover:translate-x-1 transition-all duration-300";
  const headingClass =
    "text-[var(--gold)] font-bold text-[12px] tracking-[0.1em] uppercase mb-[24px]";

  return (
    <FooterAnimation>
      <footer className="footer-main gsap-animate w-full bg-[var(--ground)] pt-[80px] md:pt-[100px] pb-[30px] px-[24px] md:px-[48px] opacity-0">
        <div className="max-w-[1200px] mx-auto">
          {/* Top Section - Grid */}
          <div className="flex flex-col lg:flex-row justify-between gap-[60px] lg:gap-[40px] mb-[80px]">
            {/* Col 1: Brand */}
            <div className="max-w-[300px]">
              <h2
                className="text-[42px] text-[var(--ink)] mb-[16px] leading-none"
                style={{ fontFamily: "var(--font-fraunces)" }}
              >
                Clean7
              </h2>
              <p className="text-[16px] text-[var(--ink)] mb-[4px]">
                Premium laundry care,
              </p>
              <p
                className="text-[18px] text-[var(--gold)] italic mb-[24px]"
                style={{ fontFamily: "var(--font-fraunces)" }}
              >
                delivered with elegance.
              </p>
              <p className="text-[14px] text-[var(--ink-soft)] leading-[1.6] mb-[32px]">
                We're here to make your everyday simpler, fresher, and
                beautifully taken care of.
              </p>
              <div className="flex items-center gap-[20px] text-[var(--ink-soft)]">
                <a
                  href="#"
                  className="hover:text-[var(--gold)] transition-colors"
                >
                  <Instagram strokeWidth={1.5} size={20} />
                </a>
                <a
                  href="#"
                  className="hover:text-[var(--gold)] transition-colors"
                >
                  <Facebook strokeWidth={1.5} size={20} />
                </a>
                <a
                  href="#"
                  className="hover:text-[var(--gold)] transition-colors"
                >
                  <MessageCircle strokeWidth={1.5} size={20} />
                </a>
                <a
                  href="#"
                  className="hover:text-[var(--gold)] transition-colors"
                >
                  <Mail strokeWidth={1.5} size={20} />
                </a>
              </div>
            </div>

            {/* Middle Cols: Links */}
            <div className="grid grid-cols-2 gap-[40px] lg:gap-[60px]">
              <div>
                <h3 className={headingClass}>Company</h3>
                <div className="flex flex-col gap-[16px]">
                  <Link href="/about" className={linkClass}>
                    About Us
                  </Link>
                  <Link href="/pricing" className={linkClass}>
                    Pricing
                  </Link>
                  <Link href="#" className={linkClass}>
                    Careers
                  </Link>
                  <Link href="#" className={linkClass}>
                    Blog
                  </Link>
                  <Link href="/contact" className={linkClass}>
                    Contact Us
                  </Link>
                </div>
              </div>

              <div>
                <h3 className={headingClass}>Help</h3>
                <div className="flex flex-col gap-[16px]">
                  <Link href="/faq" className={linkClass}>
                    FAQs
                  </Link>
                  <Link href="#" className={linkClass}>
                    Pickup & Delivery
                  </Link>
                  <Link href="#" className={linkClass}>
                    Order Tracking
                  </Link>
                  <Link href="#" className={linkClass}>
                    Returns & Refunds
                  </Link>
                  <Link href="/terms-and-conditions" className={linkClass}>
                    Terms & Conditions
                  </Link>
                  <Link href="/privacy-policy" className={linkClass}>
                    Privacy Policy
                  </Link>
                </div>
              </div>
            </div>

            {/* Col 5: Newsletter */}
            <div className="max-w-[300px]">
              <h3 className={headingClass}>Stay in the loop</h3>
              <p className="text-[14px] text-[var(--ink-soft)] leading-[1.6] mb-[24px]">
                Be the first to know about offers, new services, and laundry
                tips.
              </p>
              <div className="flex items-center h-[46px] mb-[12px]">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="h-full flex-1 bg-[var(--card)] border border-[var(--line)] border-r-0 rounded-l-[8px] px-[16px] text-[14px] text-[var(--ink)] placeholder:text-[var(--ink-soft)] outline-none focus:border-[var(--gold)] transition-colors"
                />
                <button className="h-full px-[20px] bg-[var(--gold)] text-white rounded-r-[8px] hover:brightness-90 transition-all flex items-center justify-center">
                  <IconArrowRight />
                </button>
              </div>
              <div className="flex items-center gap-[8px] text-[var(--ink-soft)] text-[12px]">
                <span className="text-[var(--gold)]">
                  <IconShieldTiny />
                </span>
                No spam. Just the good stuff.
              </div>
            </div>
          </div>

          {/* Middle Section - Features & App */}
          <div className="border-t border-b border-[var(--line)] py-[40px] flex flex-col lg:flex-row items-center lg:items-stretch justify-between gap-[40px] lg:gap-0">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-[40px] lg:w-3/4">
              {/* Feature 1 */}
              <div className="flex items-start gap-[16px] flex-1 lg:border-r border-[var(--line)] lg:pr-[40px]">
                <div className="text-[var(--gold)] shrink-0">
                  <IconBriefcase />
                </div>
                <div>
                  <h4
                    className="text-[15px] text-[var(--ink)] font-semibold mb-[4px]"
                    style={{ fontFamily: "var(--font-fraunces)" }}
                  >
                    Easy Scheduling
                  </h4>
                  <p className="text-[13px] text-[var(--ink-soft)] leading-[1.5]">
                    Book a pickup in just a few taps.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-[16px] flex-1 lg:border-r border-[var(--line)] lg:pr-[40px]">
                <div className="text-[var(--gold)] shrink-0">
                  <IconShield />
                </div>
                <div>
                  <h4
                    className="text-[15px] text-[var(--ink)] font-semibold mb-[4px]"
                    style={{ fontFamily: "var(--font-fraunces)" }}
                  >
                    Trusted Care
                  </h4>
                  <p className="text-[13px] text-[var(--ink-soft)] leading-[1.5]">
                    Handled with care, every single time.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start gap-[16px] flex-1 lg:pr-[40px]">
                <div className="text-[var(--gold)] shrink-0">
                  <IconLeaf />
                </div>
                <div>
                  <h4
                    className="text-[15px] text-[var(--ink)] font-semibold mb-[4px]"
                    style={{ fontFamily: "var(--font-fraunces)" }}
                  >
                    Sustainable Choices
                  </h4>
                  <p className="text-[13px] text-[var(--ink-soft)] leading-[1.5]">
                    Better for your clothes, better for the planet.
                  </p>
                </div>
              </div>
            </div>

            {/* App Buttons */}
            <div className="lg:w-1/4 flex flex-col items-center lg:items-start lg:pl-[40px] lg:border-l border-[var(--line)]">
              <h3 className="text-[var(--gold)] font-bold text-[12px] tracking-[0.1em] uppercase mb-[16px]">
                Download our app
              </h3>
              <div className="flex items-center gap-[12px]">
                <AppStoreButton className="scale-[0.8] origin-left" />
                <GooglePlayButton className="scale-[0.8] origin-left" />
              </div>
            </div>
          </div>

          {/* Bottom Section - Copyright */}
          <div className="pt-[30px] flex flex-col sm:flex-row items-center justify-between gap-[20px] text-[13px] text-[var(--ink-soft)]">
            <p>© 2024 Clean7. All rights reserved.</p>
            <div className="text-[var(--gold)]">
              <IconHeart />
            </div>
            <div className="flex items-center gap-[6px]">
              Made with care in India{" "}
              <span className="text-[var(--gold)]">
                <IconSparkle />
              </span>
            </div>
          </div>
        </div>
      </footer>
    </FooterAnimation>
  );
}
