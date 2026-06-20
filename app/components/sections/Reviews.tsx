"use client";

import { WixMadeForDisplayFont } from "@/app/fonts";
import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Quote, User } from "lucide-react";
import {
  gsap,
  prefersReducedMotion,
  getResponsiveConfig,
  ANIMATION_CONFIG,
} from "@/app/lib/animations";

interface Review {
  id: number;
  name: string;
  review: string;
  rating: number;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Rahul Sharma",
    review:
      "Bahut hi shandaar service! Mere kapde hamesha ekdam saaf, taaje aur acche se fold hokar aate hain. Inki kaam karne ki lagan dekhkar bahut accha lagta hai. Main is service se bahut khush hoon.",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Gupta",
    review:
      "Mere mehnge aur naazuk kapdon ka bahut acche se dhyan rakha gaya. Pickup time par hua aur delivery bhi ekdam sahi samay par. Maine isse behtar service pehle kabhi nahi dekhi.",
    rating: 5,
  },
  {
    id: 3,
    name: "Sameer Verma",
    review:
      "Inki pickup aur delivery service bahut convenient hai. App se booking karna bahut aasan hai aur mujhe har update milti rehti hai. Meri busy lifestyle ke liye ye ekdam perfect hai!",
    rating: 5,
  },
  {
    id: 4,
    name: "Aditi Singh",
    review:
      "Shehar ki sabse behtareen laundry service! Inka staff bahut professional hai aur hamesha samay par aata hai. Kapdon se hamesha ek bahut acchi khushboo aati hai. Ab main khud kapde dhone ke baare mein soch bhi nahi sakti.",
    rating: 5,
  },
  {
    id: 5,
    name: "Vikram Rathore",
    review:
      "Aakhirkar mujhe ek aisi service mil gayi jis par main apne suits aur formal kapdon ke liye bharosa kar sakta hoon. Inki dry cleaning ki quality behtareen hai aur ye kapdon ko bahut sambhal kar rakhte hain.",
    rating: 5,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="flex justify-center gap-0.5 rounded-full bg-amber-50/90 px-2.5 py-1 ring-1 ring-amber-200/40"
      aria-label={`${rating} out of 5 stars`}
    >
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 sm:h-[18px] sm:w-[18px] ${
            i < rating
              ? "text-amber-500 drop-shadow-[0_1px_1px_rgba(245,158,11,0.35)]"
              : "text-amber-200/80"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const excerpt =
    review.review.length > 120
      ? `${review.review.slice(0, 120).trim()}…`
      : review.review;

  return (
    <article className="group relative flex h-full min-h-[360px] w-full flex-col overflow-hidden rounded-[28px] border border-[#E8DFD6]/55 bg-gradient-to-br from-white via-[#FFFCFA] to-[#F5F0EB] text-center shadow-[6px_8px_24px_rgba(209,199,189,0.28),-4px_-4px_16px_rgba(255,255,255,0.95),inset_0_1px_0_rgba(255,255,255,0.9)] transition-all duration-300 ease-out motion-reduce:transition-none hover:-translate-y-1 hover:border-[#FF9431]/28 hover:shadow-[10px_16px_36px_rgba(255,148,49,0.12),8px_10px_28px_rgba(209,199,189,0.32),-6px_-6px_20px_rgba(255,255,255,1)] motion-reduce:hover:translate-y-0 sm:min-h-[380px]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-[#FF9431]/85 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-gradient-to-br from-[#FF9431]/12 to-transparent blur-2xl transition-opacity duration-500 group-hover:from-[#FF9431]/18" />
      <Quote
        className="pointer-events-none absolute right-5 top-16 size-14 text-[#FF9431]/[0.09] transition-colors duration-300 group-hover:text-[#FF9431]/[0.14] sm:right-6 sm:top-[4.5rem] sm:size-16"
        strokeWidth={1}
        aria-hidden
      />

      <div className="relative flex flex-1 flex-col items-center px-6 pb-8 pt-7 sm:px-8 sm:pb-9 sm:pt-8">
        <div className="relative mb-5 shrink-0">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[#FF9431]/50 via-[#FFB86C]/30 to-[#98BCD6]/25 opacity-70 blur-md transition duration-300 group-hover:opacity-100" />
          <div className="relative rounded-full bg-white p-[3px] shadow-[0_4px_14px_rgba(209,199,189,0.45)] ring-2 ring-white/90">
            <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-[#F5F0EB] sm:h-[76px] sm:w-[76px]">
              <User className="size-8 text-[#B5A49A] sm:size-10" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        <p className="relative z-[1] line-clamp-5 min-h-0 flex-1 text-[15px] leading-[1.65] text-[#5E5450] sm:text-[16px] md:text-[17px]">
          <span className="font-serif text-[#FF9431]/90" aria-hidden>
            &ldquo;
          </span>
          {excerpt}
          <span className="font-serif text-[#FF9431]/90" aria-hidden>
            &rdquo;
          </span>
        </p>

        <div className="mt-6 w-full shrink-0 border-t border-[#E8DFD6]/60 pt-5">
          <p className="font-semibold tracking-tight text-[#33302E] sm:text-[17px]">
            {review.name}
          </p>
          <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.14em] text-[#B5A49A]">
            Verified customer
          </p>
          <div className="mt-3 flex justify-center">
            <StarRating rating={review.rating} />
          </div>
        </div>
      </div>
    </article>
  );
}

function getScrollStepPx(scrollRoot: HTMLDivElement): number {
  const track = scrollRoot.firstElementChild as HTMLElement | null;
  const firstSlide = track?.firstElementChild as HTMLElement | null;
  if (!track || !firstSlide) return 320;
  const gap =
    parseFloat(
      getComputedStyle(track).columnGap || getComputedStyle(track).gap,
    ) || 20;
  return firstSlide.offsetWidth + gap;
}

export default function Reviews() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const updateScrollEdges = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const epsilon = 4;
    const max = el.scrollWidth - el.clientWidth;
    if (max <= epsilon) {
      setCanScrollPrev(false);
      setCanScrollNext(false);
      return;
    }
    setCanScrollPrev(el.scrollLeft > epsilon);
    setCanScrollNext(el.scrollLeft < max - epsilon);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const config = getResponsiveConfig();

      gsap.fromTo(
        ".reviews-header",
        { opacity: 0, y: config.distance.medium },
        {
          opacity: 1,
          y: 0,
          duration: config.duration.normal * 1.3,
          ease: ANIMATION_CONFIG.ease.default,
          scrollTrigger: {
            trigger: ".reviews-header",
            start: "top 75%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".reviews-carousel",
        { opacity: 0, y: config.distance.small },
        {
          opacity: 1,
          y: 0,
          duration: config.duration.normal * 1.3,
          delay: 0.2,
          ease: ANIMATION_CONFIG.ease.default,
          scrollTrigger: {
            trigger: ".reviews-carousel",
            start: "top 78%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let cancelled = false;
    const onScroll = () => updateScrollEdges();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateScrollEdges);
    const raf1 = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!cancelled) updateScrollEdges();
      });
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf1);
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateScrollEdges);
    };
  }, [updateScrollEdges]);

  const scrollPrev = () => {
    const el = scrollRef.current;
    if (!el) return;
    const step = getScrollStepPx(el);
    const motion = prefersReducedMotion() ? "auto" : "smooth";
    el.scrollTo({ left: Math.max(0, el.scrollLeft - step), behavior: motion });
  };

  const scrollNext = () => {
    const el = scrollRef.current;
    if (!el) return;
    const step = getScrollStepPx(el);
    const max = el.scrollWidth - el.clientWidth;
    const motion = prefersReducedMotion() ? "auto" : "smooth";
    el.scrollTo({
      left: Math.min(max, el.scrollLeft + step),
      behavior: motion,
    });
  };

  return (
    <section id="reviews" ref={sectionRef} className="py-[60px] bg-[#FDFBF9]">
      <div className="reviews-header gsap-animate text-center max-w-[700px] mx-auto mb-[40px] sm:mb-[50px] px-[20px] opacity-0">
        <span className="text-[#FF9431] text-lg sm:text-xl">Testimonials</span>
        <h2
          className="text-[#2D2D2D] text-2xl sm:text-3xl font-semibold mt-[8px]"
          style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
        >
          What our customers are saying
        </h2>
        <p className="text-[#6B635C] text-[16px] sm:text-md mt-[12px]">
          Real stories from customers who rely on us for laundry, home care, and
          more.
        </p>
      </div>

      <div className="reviews-carousel gsap-animate relative mx-auto max-w-[1200px] px-[20px] opacity-0">
        <div className="relative">
          {/* Left fade */}
          <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-[5] w-12 bg-gradient-to-r from-[#FDFBF9] to-transparent sm:w-16" />
          {/* Right fade */}
          <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-[5] w-12 bg-gradient-to-l from-[#FDFBF9] to-transparent sm:w-16" />

          <button
            type="button"
            aria-label="Previous testimonials"
            disabled={!canScrollPrev}
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[#E8DFD6]/80 bg-white/95 text-[#33302E] shadow-[4px_6px_16px_rgba(209,199,189,0.35)] backdrop-blur-sm transition-all duration-200 hover:border-[#FF9431]/35 hover:text-[#FF7700] hover:shadow-[6px_10px_22px_rgba(255,148,49,0.2)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-35 sm:left-1 sm:h-12 sm:w-12"
          >
            <ChevronLeft className="size-6" strokeWidth={2} aria-hidden />
          </button>
          <button
            type="button"
            aria-label="Next testimonials"
            disabled={!canScrollNext}
            onClick={scrollNext}
            className="absolute right-0 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[#E8DFD6]/80 bg-white/95 text-[#33302E] shadow-[4px_6px_16px_rgba(209,199,189,0.35)] backdrop-blur-sm transition-all duration-200 hover:border-[#FF9431]/35 hover:text-[#FF7700] hover:shadow-[6px_10px_22px_rgba(255,148,49,0.2)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-35 sm:right-1 sm:h-12 sm:w-12"
          >
            <ChevronRight className="size-6" strokeWidth={2} aria-hidden />
          </button>

          <div
            ref={scrollRef}
            className="scrollbar-hide overflow-x-hidden pb-5 pl-12 pr-12 pt-1 sm:pl-14 sm:pr-14"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") {
                e.preventDefault();
                scrollPrev();
              }
              if (e.key === "ArrowRight") {
                e.preventDefault();
                scrollNext();
              }
            }}
          >
            <div className="flex w-max gap-5 py-4 sm:gap-6">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="w-[300px] shrink-0 sm:w-[360px]"
                >
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Read More Button */}
      {/* <div className="flex justify-center mt-[30px] sm:mt-[40px] px-[20px]">
        <OrangeGradientButton className="rounded-full px-[32px] sm:px-[40px] py-[14px] sm:py-[16px] text-[15px] sm:text-base font-semibold">
          Read More Reviews
        </OrangeGradientButton>
      </div> */}
    </section>
  );
}
