"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenisInstance } from "@/app/lib/lenis-instance";

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  // Every route change: jump to top before paint (matches hero pages + fixes /about, /help, etc.).
  // Skip when URL has a real hash so HomeHashScroll (/#section) and in-page anchors still work.
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash.length > 1) return;

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    ScrollTrigger.refresh();
  }, [pathname]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
      stopInertiaOnNavigate: true,
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    lenis.on("scroll", ScrollTrigger.update);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      setLenisInstance(null);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Keep Lenis internal scroll position in sync after each navigation.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash.length > 1) return;
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return <>{children}</>;
}
