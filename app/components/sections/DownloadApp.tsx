"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ScrollReveal } from "../ui/ScrollReveal";
import AppStoreButton from "../ui/buttons/AppStoreButton";
import GooglePlayButton from "../ui/buttons/GooglePlayButton";
import {
  gsap,
  prefersReducedMotion,
  getResponsiveConfig,
  ANIMATION_CONFIG,
} from "@/app/lib/animations";

// ---- Icons ----
const IconCalendar = () => (
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
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const IconBox = () => (
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
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const IconShirt = () => (
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
    <path d="M12 8L4 12v2h3v7h10v-7h3v-2L12 8z" />
    <path d="M12 8c0-2-1-2.5-1-3.5 0-1 1-1.5 1-1.5s1 .5 1 1.5c0 1-1 1.5-1 3.5" />
  </svg>
);

const IconBell = () => (
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
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

// ---- Phone Component ----
function Phone({ rotation }: { rotation: { x: number; y: number } }) {
  const phoneRef = useRef<HTMLDivElement>(null);
  const [gyroRotation, setGyroRotation] = useState({ x: 0, y: 0 });

  const finalRotation = {
    x: rotation.x || gyroRotation.x,
    y: rotation.y || gyroRotation.y,
  };

  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.beta !== null && event.gamma !== null) {
        const x = Math.max(-15, Math.min(15, -(event.beta - 45) * 0.3));
        const y = Math.max(-15, Math.min(15, -event.gamma * 0.4));
        setGyroRotation({ x, y });
      }
    };
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (!isIOS) {
      window.addEventListener("deviceorientation", handleOrientation);
    }
    return () =>
      window.removeEventListener("deviceorientation", handleOrientation);
  }, []);

  return (
    <div
      ref={phoneRef}
      className="group relative select-none"
      style={{ perspective: "1000px" }}
    >
      <div
        className="transition-transform duration-150 ease-out"
        style={{
          transform: `rotateX(${finalRotation.x}deg) rotateY(${finalRotation.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <div className="animate-[float_6s_ease-in-out_infinite]">
          {/* Glow effect behind phone */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#CBAA6A]/20 to-transparent blur-3xl scale-150 opacity-100 transition-opacity duration-700"></div>

          {/* Phone frame (Gold/Cream) */}
          <div className="relative bg-gradient-to-b from-[#EADBB4] via-[#CFB579] to-[#997732] w-[280px] h-[580px] sm:w-[310px] sm:h-[620px] rounded-[44px] p-[6px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15),0_0_40px_rgba(0,0,0,0.05)] md:group-hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.2),0_0_60px_rgba(203,170,106,0.2)] transition-all duration-500 md:group-hover:scale-[1.02]">
            {/* Side buttons */}
            <div className="absolute -left-[3px] top-[100px] w-[3px] h-[30px] bg-gradient-to-b from-[#C4A86A] to-[#A38545] rounded-l-sm"></div>
            <div className="absolute -left-[3px] top-[150px] w-[3px] h-[60px] bg-gradient-to-b from-[#C4A86A] to-[#A38545] rounded-l-sm"></div>
            <div className="absolute -right-[3px] top-[130px] w-[3px] h-[50px] bg-gradient-to-b from-[#C4A86A] to-[#A38545] rounded-r-sm"></div>

            {/* Screen */}
            <div className="relative bg-[#FBF9F4] overflow-hidden w-full h-full rounded-[38px] border-[4px] border-black/90">
              {/* Dynamic Island */}
              {/* <div className="absolute top-[8px] left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-[20px] z-20 shadow-sm"></div> */}

              {/* App Screenshot */}
              <div className="absolute inset-0 top-0">
                <Image
                  src="/images/download-app/download.png"
                  alt="Clean7 App Screenshot"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Screen shine */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/30 pointer-events-none"></div>

              {/* Animated shine sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-[2000ms] pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Floor Shadow */}
      <div className="absolute -bottom-[60px] left-1/2 -translate-x-1/2 w-[220px] h-[60px] bg-black/10 blur-[20px] rounded-[100%] pointer-events-none"></div>
    </div>
  );
}

export default function DownloadApp() {
  const sectionRef = useRef<HTMLElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const sectionElement = sectionRef.current;
    if (!sectionElement) return;

    const isTouchDevice = "ontouchstart" in window;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = sectionElement.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = ((e.clientY - centerY) / (rect.height / 2)) * 10;
      const y = ((e.clientX - centerX) / (rect.width / 2)) * 10;
      setRotation({
        x: Math.max(-15, Math.min(15, x)),
        y: Math.max(-15, Math.min(15, y)),
      });
    };

    const handleMouseLeave = () => {
      setRotation({ x: 0, y: 0 });
    };

    sectionElement.addEventListener("mousemove", handleMouseMove);
    sectionElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      sectionElement.removeEventListener("mousemove", handleMouseMove);
      sectionElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const config = getResponsiveConfig();

      gsap.fromTo(
        ".download-left-col",
        { opacity: 0, y: config.distance.medium },
        {
          opacity: 1,
          y: 0,
          duration: config.duration.normal * 1.3,
          ease: ANIMATION_CONFIG.ease.default,
          scrollTrigger: {
            trigger: ".download-left-col",
            start: "top 75%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".download-phone-col",
        { opacity: 0, scale: 0.95, y: config.distance.small },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: config.duration.slow * 1.1,
          delay: 0.2,
          ease: ANIMATION_CONFIG.ease.smooth,
          scrollTrigger: {
            trigger: ".download-phone-col",
            start: "top 75%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const featureItems = [
    {
      title: "Schedule with ease",
      desc: "Book pickups and deliveries in seconds.",
      icon: <IconCalendar />,
    },
    {
      title: "Track in real time",
      desc: "Stay updated at every step of your order.",
      icon: <IconBox />,
    },
    {
      title: "Service made simple",
      desc: "Explore services and choose what you need.",
      icon: <IconShirt />,
    },
    {
      title: "Stay in the loop",
      desc: "Get notifications and reminders effortlessly.",
      icon: <IconBell />,
    },
  ];

  return (
    <section
      id="download-app"
      ref={sectionRef}
      className="relative bg-[var(--ground)] py-[80px] md:py-[120px] overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-[24px] md:px-[48px] flex flex-col min-[900px]:flex-row items-center justify-between gap-[20px] lg:gap-[100px]">
        {/* Left Content */}
        <div className="download-left-col gsap-animate opacity-0 flex-1 w-full">
          <p className="text-[15px] sm:text-[20px] font-bold tracking-[0.15em] text-[var(--gold)] uppercase mb-[16px] md:mb-[24px]">
            DOWNLOAD OUR APP
          </p>
          <h2
            className="text-[36px] md:text-[48px] lg:text-[64px] text-[var(--ink)] mb-[16px] md:mb-[24px] leading-[1.05]"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            Care at your fingertips.
            <br />
            <span className="italic text-[var(--gold)] font-light">
              Anytime, anywhere.
            </span>
          </h2>
          <p className="text-[var(--ink-soft)] text-[17px] leading-[1.7] max-w-[500px] mb-[40px]">
            Book a pickup, track your order, and manage everything with just a
            few taps.
          </p>

          {/* Features List */}
          <div className="flex flex-col gap-[28px] mb-[50px]">
            {featureItems.map((item, i) => (
              <ScrollReveal delay={i * 150} key={i}>
                <div className="flex items-start gap-[20px]">
                  <div className="w-[48px] h-[48px] rounded-full bg-[var(--ground-soft)] flex items-center justify-center text-[var(--gold)] shrink-0 border border-[var(--line)]">
                    {item.icon}
                  </div>
                  <div className="pt-[2px]">
                    <h4
                      className="text-[17px] text-[var(--ink)] font-medium mb-[4px]"
                      style={{ fontFamily: "var(--font-fraunces)" }}
                    >
                      {item.title}
                    </h4>
                    <p className="text-[14px] text-[var(--ink-soft)] leading-[1.5]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="w-full h-[1px] bg-[var(--line)] mb-[40px]"></div>

          {/* Download Box */}
          <div className="flex items-center justify-between gap-[10px]">
            <div className="flex flex-col gap-[12px] z-10">
              <div>
                <p className="text-[16px] font-bold tracking-[0.1em] text-[var(--gold)] uppercase mb-[4px]">
                  DOWNLOAD THE APP
                </p>
                <p className="text-[15px] text-[var(--ink-soft)] max-w-[200px] leading-[1.4] mb-4">
                  Available directly from the App Store or Google Play.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-[12px]">
                <AppStoreButton />
                <GooglePlayButton />
              </div>
            </div>

            {/* Mobile Phone */}
            <div className="block min-[900px]:hidden relative w-[168px] h-[348px] shrink-0 pointer-events-none">
              <div className="absolute top-1/2 right-0 -translate-y-1/2 origin-right scale-[0.6]">
                <Phone rotation={rotation} />
              </div>
            </div>
          </div>
        </div>

        {/* Right Content (Phone) for Desktop */}
        <div className="hidden min-[900px]:flex download-phone-col gsap-animate opacity-0 relative w-full md:w-[400px] justify-center perspective-[1000px] shrink-0">
          <Phone rotation={rotation} />
        </div>
      </div>
    </section>
  );
}
