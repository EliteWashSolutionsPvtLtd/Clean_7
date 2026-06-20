"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { WixMadeForDisplayFont } from "@/app/fonts";
import OrangeGradientButton from "../ui/buttons/OrangeGradientButton";
import { Download } from "lucide-react";
import Container from "./Container";
import { scrollToSection } from "@/app/utils/scrollToSection";

export default function DesktopNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "/services" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
    { name: "Get Franchise", href: "/get-franchise" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 hidden min-h-[80px] h-auto min-[1000px]:block py-2 ${isScrolled ? "bg-[#FDFCF9] backdrop-blur-sm shadow-sm" : "bg-[#FDFCF9]"}`}
    >
      <Container
        isMaxWidth={true}
        className="flex w-full flex-nowrap items-center justify-between gap-x-2 xl:gap-x-4 px-[20px] py-1"
      >
        <Link
          href="/"
          scroll={false}
          className="inline-flex shrink-0 cursor-pointer items-center gap-3 transition-transform duration-300 hover:scale-[1.03]"
          style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
        >
          <Image
            src="/logo.png"
            alt="Wash & Wow"
            height={68}
            width={68}
            className="h-[68px] w-[68px] shrink-0 object-contain drop-shadow-sm"
            priority
          />
          <div className="flex flex-col leading-none gap-[4px]">
            <span className="text-[1.4rem] font-extrabold tracking-tight">
              <span className="text-brown">Wash</span>{" "}
              <span className="text-brown">&amp;</span>{" "}
              <span className="text-orange">Wow</span>
            </span>
            <span
              className="text-[13px] font-semibold tracking-wide block"
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

        {/* Desktop nav: flex-nowrap to prevent dropping to next line */}
        <ul className="flex min-w-0 max-w-full flex-1 list-none flex-nowrap items-center justify-end gap-1 lg:gap-2 xl:gap-3 text-[13px] xl:text-sm font-medium text-dark-blue">
          {navItems.map((item) => {
            const navPillClass =
              "group relative inline-flex min-h-[44px] cursor-pointer select-none items-center justify-center rounded-full px-2 lg:px-3 xl:px-5 py-2.5 leading-none hover:text-[#FF7700] active:scale-[0.95] transition-all duration-200 overflow-hidden before:pointer-events-none before:absolute before:inset-[2px] before:z-0 before:rounded-full before:bg-gradient-to-b before:from-white/90 before:via-[#fff3ea]/60 before:to-[#ffe8d6]/40 before:scale-0 hover:before:scale-100 before:transition-transform before:duration-300 before:ease-out before:shadow-[inset_0_-2px_4px_rgba(255,148,49,0.15),inset_0_2px_4px_rgba(255,255,255,0.8)] after:pointer-events-none after:absolute after:top-[3px] after:left-[15%] after:z-0 after:w-[70%] after:h-[40%] after:rounded-full after:bg-gradient-to-b after:from-white/80 after:to-transparent after:scale-0 hover:after:scale-100 after:transition-transform after:duration-300 hover:shadow-[0_2px_8px_rgba(255,148,49,0.2)]";

            const labelClass = "relative z-[1]";

            if (!item.href.startsWith("#")) {
              return (
                <li key={item.name} className="shrink-0">
                  <Link
                    href={item.href}
                    scroll={false}
                    className={navPillClass}
                  >
                    <span className={labelClass}>{item.name}</span>
                  </Link>
                </li>
              );
            }

            if (pathname !== "/") {
              const href = item.name === "Home" ? "/" : `/${item.href}`;
              return (
                <li key={item.name} className="shrink-0">
                  <Link href={href} scroll={false} className={navPillClass}>
                    <span className={labelClass}>{item.name}</span>
                  </Link>
                </li>
              );
            }

            return (
              <li key={item.name} className="shrink-0">
                <button
                  type="button"
                  className={`${navPillClass} border-0 bg-transparent font-inherit text-inherit`}
                  onClick={() => scrollToSection(item.href)}
                >
                  <span className={labelClass}>{item.name}</span>
                </button>
              </li>
            );
          })}
          <li className="shrink-0 ml-1 xl:ml-2">
            <OrangeGradientButton
              className="flex items-center justify-center gap-[5px] rounded-[20px] px-3 xl:px-4 py-2 text-[13px] xl:text-sm whitespace-nowrap"
              onClick={() => {
                if (pathname === "/") scrollToSection("#download-app");
                else router.push("/#download-app");
              }}
            >
              <Download size={18} className="xl:w-[20px] xl:h-[20px]" />
              <span className="hidden lg:inline">Download App</span>
              <span className="lg:hidden">Download</span>
            </OrangeGradientButton>
          </li>
        </ul>
      </Container>
    </nav>
  );
}
