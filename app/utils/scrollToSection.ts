import { getLenisInstance } from "@/app/lib/lenis-instance";

export function scrollToSection(href: string, navbarHeight: number = 70) {
  const lenis = getLenisInstance();

  if (href === "#home") {
    if (lenis) {
      lenis.scrollTo(0, { offset: 0 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    return;
  }

  const element = document.querySelector(href);
  if (!element) return;

  if (lenis) {
    // Lenis ignores window.scrollTo; use its API so clicks work during smooth scroll.
    lenis.scrollTo(element as HTMLElement, {
      offset: -navbarHeight,
      force: true,
    });
  } else {
    const elementPosition =
      element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: elementPosition - navbarHeight,
      behavior: "smooth",
    });
  }
}
