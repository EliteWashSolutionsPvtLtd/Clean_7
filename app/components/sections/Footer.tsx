"use client"

import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import AppStoreButton from "../ui/buttons/AppStoreButton";
import GooglePlayButton from "../ui/buttons/GooglePlayButton";
import { Instagram, Facebook, Linkedin, Twitter, MessageCircle, Mail } from "lucide-react";
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
    "block text-[var(--ink-soft)] text-[14px] hover:text-[var(--gold)] hover:translate-x-1 transition-all duration-300";
  const headingClass =
    "text-[var(--gold)] font-bold text-[12px] tracking-[0.1em] uppercase mb-[24px]";

  const [socialLinks, setSocialLinks] = useState({
    instagram: "",
    facebook: "",
    linkedin: "",
    x: "",
  });

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [newsletterMessage, setNewsletterMessage] = useState("");

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    setNewsletterStatus("loading");
    setNewsletterMessage("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.clean7.in";
      const res = await fetch(`${apiUrl}/newsletters/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: newsletterEmail }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setNewsletterStatus("success");
        setNewsletterMessage("Thanks for subscribing!");
        setNewsletterEmail("");
      } else {
        setNewsletterStatus("error");
        setNewsletterMessage(data.message || "Failed to subscribe. Please try again.");
      }
    } catch (error) {
      setNewsletterStatus("error");
      setNewsletterMessage("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.clean7.in";
        const res = await fetch(`${apiUrl}/catalog/settings/social_links`);
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.data && data.data.value) {
            setSocialLinks(data.data.value);
          }
        }
      } catch (error) {
        console.error("Failed to fetch social links", error);
      }
    };
    fetchSocialLinks();
  }, []);

  return (
    <FooterAnimation>
      <footer className="footer-main gsap-animate w-full bg-[var(--ground)] pt-[80px] md:pt-[100px] pb-[30px] px-[24px] md:px-[48px] opacity-0">
        <div className="max-w-[1200px] mx-auto">
          {/* Top Section - Grid */}
          <div className="flex flex-col lg:flex-row justify-between gap-[60px] lg:gap-[40px] mb-[80px]">
            {/* Col 1: Brand */}
            <div className="max-w-[300px]">
              <div className="flex flex-col items-start mb-[24px]">
                <div className="flex flex-col items-center">
                  <Image
                    src="/images/logo/logo.png"
                    alt="Clean7 Logo"
                    width={110}
                    height={110}
                    className="mb-4"
                    style={{ width: "auto", height: "auto" }}
                  />
                  <h2 className="text-[32px] tracking-[0.25em] text-[var(--ink)] font-medium mb-[4px] ml-[0.25em]">
                    CLEAN<span className="text-[var(--gold)]">7</span>
                  </h2>
                  <div className="w-full h-px bg-[var(--gold)] opacity-50 mb-2" />
                  <p className="text-[9px] tracking-[0.12em] text-[var(--ink)] uppercase mb-2">
                    Premium care, delivered with elegance
                  </p>
                  <div className="w-[60px] h-px bg-[var(--gold)] opacity-50" />
                </div>
              </div>
              <p className="text-[14px] text-[var(--ink-soft)] leading-[1.6] mb-[16px]">
                We&apos;re here to make your everyday simpler, fresher, and
                beautifully taken care of.
              </p>
              <div className="flex items-start gap-[12px] mb-[32px] text-[var(--ink-soft)]">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0 mt-0.5"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <p className="text-[14px] leading-[1.6]">
                  NH 58 Rohta Bypass Flyover Service Road Khadoli, Meerut
                </p>
              </div>
              <div className="flex items-center gap-[20px] text-[var(--ink-soft)]">
                {socialLinks.instagram && (
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--gold)] transition-colors"
                  >
                    <Instagram strokeWidth={1.5} size={20} />
                  </a>
                )}
                {socialLinks.facebook && (
                  <a
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--gold)] transition-colors"
                  >
                    <Facebook strokeWidth={1.5} size={20} />
                  </a>
                )}
                {socialLinks.linkedin && (
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--gold)] transition-colors"
                  >
                    <Linkedin strokeWidth={1.5} size={20} />
                  </a>
                )}
                {socialLinks.x && (
                  <a
                    href={socialLinks.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--gold)] transition-colors"
                  >
                    <Twitter strokeWidth={1.5} size={20} />
                  </a>
                )}
                {!socialLinks.instagram && !socialLinks.facebook && !socialLinks.linkedin && !socialLinks.x && (
                  <>
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
                  </>
                )}
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
                  <Link href="/careers" className={linkClass}>
                    Careers
                  </Link>
                  <Link href="/pricing" className={linkClass}>
                    Pricing
                  </Link>
                  <Link href="/blog" className={linkClass}>
                    Blog
                  </Link>
                  <Link href="/contact" className={linkClass}>
                    Contact Us
                  </Link>
                  <Link href="/franchise" className={linkClass}>
                    Franchise
                  </Link>
                  <Link href="/reviews" className={linkClass}>
                    Reviews
                  </Link>
                </div>
              </div>

              <div>
                <h3 className={headingClass}>Help</h3>
                <div className="flex flex-col gap-[16px]">
                  <Link href="/faq" className={linkClass}>
                    FAQs
                  </Link>
                  <Link href="/terms-of-use" className={linkClass}>
                    Terms of Use
                  </Link>
                  <Link href="/terms-and-conditions" className={linkClass}>
                    Terms & Conditions
                  </Link>
                  <Link href="/privacy-policy" className={linkClass}>
                    Privacy Policy
                  </Link>
                  <Link href="/delete-account" className={linkClass}>
                    Delete Account
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
              <form onSubmit={handleSubscribe} className="mb-[12px]">
                <div className="flex items-center h-[46px]">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    disabled={newsletterStatus === "loading"}
                    placeholder="Enter your email"
                    required
                    className="h-full flex-1 bg-[var(--card)] border border-[var(--line)] border-r-0 rounded-l-[8px] px-[16px] text-[14px] text-[var(--ink)] placeholder:text-[var(--ink-soft)] outline-none focus:border-[var(--gold)] transition-colors disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={newsletterStatus === "loading"}
                    className="h-full px-[20px] bg-[var(--gold)] text-white rounded-r-[8px] hover:brightness-90 transition-all flex items-center justify-center disabled:opacity-50"
                  >
                    {newsletterStatus === "loading" ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <IconArrowRight />
                    )}
                  </button>
                </div>
                {newsletterMessage && (
                  <div className={`mt-2 text-[12px] ${newsletterStatus === "success" ? "text-green-500" : "text-red-500"}`}>
                    {newsletterMessage}
                  </div>
                )}
              </form>
              <div className="flex items-center gap-[8px] text-[var(--ink-soft)] text-[12px]">
                <span className="text-[var(--gold)]">
                  <IconShieldTiny />
                </span>
                No spam. Just the good stuff.
              </div>
            </div>
          </div>

          {/* Middle Section - App */}
          <div className="border-t border-b border-[var(--line)] py-[40px] flex justify-center">
            {/* App Buttons */}
            <div className="flex flex-col items-center">
              <h3 className="text-[var(--gold)] font-bold text-[12px] tracking-[0.1em] uppercase mb-[16px]">
                Download our app
              </h3>
              <div className="flex flex-row gap-[12px]">
                <AppStoreButton />
                <GooglePlayButton />
              </div>
            </div>
          </div>

          {/* Bottom Section - Copyright */}
          <div className="footer-copyright pt-[30px] flex flex-col sm:flex-row items-center justify-between gap-[20px] text-[13px] text-[var(--ink-soft)] opacity-0">
            <p>@2026 Elite Wash Solution Pvt. Ltd. All Rights Reserved.</p>
            <div className="flex flex-col sm:flex-row items-center gap-[8px] sm:gap-[20px]">
              <p>CIN: U96010UW2026PTC255529</p>
              <p>GSTIN: 09AAJCE8249F1ZA</p>
            </div>
          </div>
        </div>
      </footer>
    </FooterAnimation>
  );
}
