"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { WixMadeForDisplayFont } from "@/app/fonts";
import OrangeGradientButton from "../ui/buttons/OrangeGradientButton";
import { Download, Menu, X } from "lucide-react";
import { scrollToSection as scrollToSectionUtil } from "@/app/utils/scrollToSection";

export default function MobileNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "/services" },
    { name: "Pricing", href: "/pricing" },
    { name: "Reviews", href: "#reviews" },
    { name: "About", href: "/about" },
    { name: "Get Franchise", href: "/get-franchise" },
  ];

  /** Matches Footer Help + Legal routes */
  const menuFooterLinks = {
    help: [
      { name: "About", href: "/about" },
      { name: "FAQs", href: "/faq" },
      { name: "Contact", href: "/contact" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms and Conditions", href: "/terms-and-conditions" },
      { name: "Terms of Use", href: "/terms-of-use" },
    ],
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const scrollToSection = (href: string) => {
    scrollToSectionUtil(href);
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] h-[80px] min-[1000px]:hidden">
      {/* Top Bar */}
      <div className="bg-[#FDFCF9] shadow-sm h-[80px]">
        <div className="flex items-center justify-between px-[20px] h-[80px]">
          <Link
            href="/"
            scroll={false}
            onClick={() => setIsMenuOpen(false)}
            className="inline-flex cursor-pointer items-center gap-2"
            style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
          >
            <Image
              src="/logo.png"
              alt="Wash & Wow"
              width={52}
              height={52}
              className="h-[52px] w-[52px] shrink-0 object-contain drop-shadow-sm"
              priority
            />
            <div className="flex flex-col leading-none gap-[4px]">
              <span className="text-[1rem] font-extrabold tracking-tight">
                <span className="text-brown">Wash</span>{" "}
                <span className="text-brown">&amp;</span>{" "}
                <span className="text-orange">Wow</span>
              </span>
              <span
                className="text-[12px] font-semibold tracking-wide block"
                style={{
                  background:
                    "linear-gradient(90deg,#b85000 0%,#FF7700 55%,#d45e00 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  paddingBottom: "3px",
                  lineHeight: "1.3",
                }}
              >
                Handled with Care, Delivered with Trust.
              </span>
            </div>
          </Link>

          <button
            className="text-dark-blue p-2 cursor-pointer select-none active:scale-95 transition-transform duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Full-Screen Menu Overlay */}
      <div
        className={`fixed inset-0 bg-[#FDFCF9] z-[101] flex flex-col transition-transform duration-300 ease-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header with Logo and Close */}
        <div className="flex items-center justify-between px-[20px] h-[80px] border-b border-gray-100">
          <Link
            href="/"
            scroll={false}
            onClick={() => setIsMenuOpen(false)}
            className="inline-flex items-center gap-2"
            style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
          >
            <Image
              src="/logo.png"
              alt="Wash & Wow"
              width={52}
              height={52}
              className="h-[52px] w-[52px] shrink-0 object-contain drop-shadow-sm"
            />
            <div className="flex flex-col leading-none gap-[4px]">
              <span className="text-[1rem] font-extrabold tracking-tight">
                <span className="text-brown">Wash</span>{" "}
                <span className="text-brown">&amp;</span>{" "}
                <span className="text-orange">Wow</span>
              </span>
              <span
                className="text-[12px] font-semibold tracking-wide block"
                style={{
                  background:
                    "linear-gradient(90deg,#b85000 0%,#FF7700 55%,#d45e00 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  paddingBottom: "3px",
                  lineHeight: "1.3",
                }}
              >
                Handled with Care, Delivered with Trust.
              </span>
            </div>
          </Link>
          <button
            className="text-gray-500 p-2 cursor-pointer select-none hover:text-gray-700 active:scale-95 transition-all duration-200"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto min-h-0" data-lenis-prevent>
          {/* Navigation Links */}
          <div className="px-[20px] py-[16px]">
            <ul className="flex flex-col">
              {navItems.map((item) => {
                const rowClass =
                  "flex min-h-[48px] w-full items-center justify-between py-3 text-gray-900 font-medium text-[16px] active:text-orange transition-colors duration-200";

                if (!item.href.startsWith("#")) {
                  return (
                    <li
                      key={item.name}
                      className="group border-b border-gray-100 last:border-b-0"
                    >
                      <Link
                        href={item.href}
                        scroll={false}
                        onClick={() => setIsMenuOpen(false)}
                        className={rowClass}
                      >
                        <span className="flex-1">{item.name}</span>
                      </Link>
                    </li>
                  );
                }

                if (pathname !== "/") {
                  const href = item.name === "Home" ? "/" : `/${item.href}`;
                  return (
                    <li
                      key={item.name}
                      className="group border-b border-gray-100 last:border-b-0"
                    >
                      <Link
                        href={href}
                        scroll={false}
                        onClick={() => setIsMenuOpen(false)}
                        className={rowClass}
                      >
                        <span className="flex-1">{item.name}</span>
                      </Link>
                    </li>
                  );
                }

                return (
                  <li
                    key={item.name}
                    className="group border-b border-gray-100 last:border-b-0"
                  >
                    <button
                      type="button"
                      className={`${rowClass} cursor-pointer appearance-none border-0 bg-transparent text-left font-inherit`}
                      onClick={() => scrollToSection(item.href)}
                    >
                      <span className="flex-1">{item.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Download App Button - right after navlinks */}
            <div className="mt-[20px]">
              <OrangeGradientButton
                className="rounded-[10px] px-5 py-[10px] flex justify-center items-center gap-[8px] w-full text-[15px] font-semibold active:scale-[0.98] transition-all duration-200"
                onClick={() => {
                  if (pathname === "/") scrollToSection("#download-app");
                  else {
                    setIsMenuOpen(false);
                    router.push("/#download-app");
                  }
                }}
              >
                <Download size={20} />
                Download App
              </OrangeGradientButton>
            </div>
          </div>

          {/* Footer links (same routes as site footer) */}
          <div className="px-[20px] py-[20px] border-t border-gray-100 mt-auto">
            <div className="grid grid-cols-2 gap-x-[40px] gap-y-[12px]">
              <div>
                <p className="mb-2 text-[12px] font-semibold uppercase tracking-wide text-gray-400">
                  Help
                </p>
                <div className="flex flex-col gap-[12px]">
                  {menuFooterLinks.help.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      scroll={false}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-left text-[16px] text-gray-600 transition-colors duration-200 hover:text-gray-900 active:text-orange"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-[12px] font-semibold uppercase tracking-wide text-gray-400">
                  Legal
                </p>
                <div className="flex flex-col gap-[12px]">
                  {menuFooterLinks.legal.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      scroll={false}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-left text-[16px] text-gray-600 transition-colors duration-200 hover:text-gray-900 active:text-orange"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
