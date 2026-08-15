"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { scrollToSection } from "@/app/utils/scrollToSection";

/**
 * When landing on `/` with a hash (e.g. from `Link` to `/#services`), scroll to
 * the target with navbar offset after the page has painted.
 */
export default function HomeHashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;
    const hash = window.location.hash;
    if (!hash || hash === "#") return;
    // Scroll immediately, then again after delays to account for layout shifts from images/GSAP
    const t1 = window.setTimeout(() => scrollToSection(hash), 100);
    const t2 = window.setTimeout(() => scrollToSection(hash), 500);
    const t3 = window.setTimeout(() => scrollToSection(hash), 1200);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") return;
    const onHashChange = () => {
      const hash = window.location.hash;
      if (hash) window.setTimeout(() => scrollToSection(hash), 0);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [pathname]);

  return null;
}
