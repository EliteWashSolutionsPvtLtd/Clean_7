"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { WixMadeForDisplayFont } from "@/app/fonts";
import AppStoreButton from "../ui/buttons/AppStoreButton";
import GooglePlayButton from "../ui/buttons/GooglePlayButton";
import DownloadAppSvg from "../svg/DownloadAppSvg";
import {
  gsap,
  prefersReducedMotion,
  getResponsiveConfig,
  ANIMATION_CONFIG,
} from "@/app/lib/animations";



function LeftContent() {
  return (
    <div className="max-w-[420px] flex flex-col gap-[10px] text-center min-[900px]:text-left relative z-10">
      <h2
        className={`text-2xl sm:text-3xl font-bold tracking-wide`}
        style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
      >
        Get the app for a{" "}
        <span className="text-[#FFDAB6]">seamless experience</span>
      </h2>
      <p className="text-[16px] sm:text-md">
        Schedule picks, track orders, and manage your laundry - all from your
        phone. Available on iOS and Android.
      </p>

      <div className="flex flex-col min-[440px]:flex-row items-center justify-center min-[900px]:justify-start gap-[10px] sm:gap-[20px] mt-[20px] mb-[50px] min-[900px]:mb-0">
        <AppStoreButton className="w-full min-[440px]:w-auto" />
        <GooglePlayButton className="w-full min-[440px]:w-auto" />
      </div>
    </div>
  );
}

function Phone({
  rotation,
}: {
  rotation: { x: number; y: number };
}) {

  const [permissionGranted, setPermissionGranted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hasShownHint, setHasShownHint] = useState(false);
  const [gyroRotation, setGyroRotation] = useState({ x: 0, y: 0 });
  const phoneRef = useRef<HTMLDivElement>(null);

  const finalRotation = {
    x: rotation.x || gyroRotation.x,
    y: rotation.y || gyroRotation.y,
  };

  useEffect(() => {
    if (!phoneRef.current || hasShownHint) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasShownHint) {
          setShowHint(true);
          setHasShownHint(true);

          setTimeout(() => {
            setShowHint(false);
          }, 3000);
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(phoneRef.current);

    return () => observer.disconnect();
  }, [hasShownHint]);

  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.beta !== null && event.gamma !== null) {
        const x = Math.max(-25, Math.min(25, -(event.beta - 45) * 0.5));
        const y = Math.max(-25, Math.min(25, -event.gamma * 0.6));
        setGyroRotation({ x, y });
      }
    };

    const requestPermission = async () => {
      if (typeof window === "undefined") return;

      // Check if DeviceOrientationEvent exists and has requestPermission (iOS 13+)
      const DeviceOrientationEventTyped = DeviceOrientationEvent as unknown as {
        requestPermission?: () => Promise<"granted" | "denied">;
      };

      if (typeof DeviceOrientationEventTyped.requestPermission === "function") {
        try {
          const permission =
            await DeviceOrientationEventTyped.requestPermission();
          if (permission === "granted") {
            setPermissionGranted(true);
            window.addEventListener("deviceorientation", handleOrientation);
          }
        } catch (error) {
          console.log("Gyroscope permission denied");
        }
      } else {
        // Non-iOS devices or older iOS - just add listener
        setPermissionGranted(true);
        window.addEventListener("deviceorientation", handleOrientation);
      }
    };

    // Auto-request on component mount for non-iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (!isIOS) {
      requestPermission();
    }

    // For iOS, we'll add a click handler to request permission
    const handleClick = () => {
      if (!permissionGranted) {
        requestPermission();
      }
    };

    document.addEventListener("click", handleClick, { once: true });

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
      document.removeEventListener("click", handleClick);
    };
  }, [permissionGranted]);

  return (
    <div
      ref={phoneRef}
      className="group relative select-none"
      style={{ perspective: "1000px" }}
    >
      {/* Outer div - handles tilt rotation */}
      <div
        className="transition-transform duration-150 ease-out"
        style={{
          transform: `rotateX(${finalRotation.x}deg) rotateY(${finalRotation.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Inner div - handles floating animation */}
        <div className="animate-[float_6s_ease-in-out_infinite]">
          {/* Glow effect behind phone */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FF9431]/20 to-transparent blur-3xl scale-150 opacity-0 md:group-hover:opacity-100 transition-opacity duration-700"></div>

          {/* Phone frame */}
          <div className="relative bg-gradient-to-b from-[#d4ccc5] via-[#c5bdb6] to-[#a1978d] w-[310px] h-[620px] rounded-[24px] p-[4px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5),0_0_40px_rgba(0,0,0,0.3)] md:group-hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.6),0_0_60px_rgba(255,148,49,0.2)] transition-all duration-500 md:group-hover:scale-[1.03]">
            {/* Side buttons */}
            <div className="absolute -left-[3px] top-[100px] w-[3px] h-[30px] bg-gradient-to-b from-[#b5ada6] to-[#9a918a] rounded-l-sm"></div>
            <div className="absolute -left-[3px] top-[150px] w-[3px] h-[60px] bg-gradient-to-b from-[#b5ada6] to-[#9a918a] rounded-l-sm"></div>
            <div className="absolute -right-[3px] top-[130px] w-[3px] h-[50px] bg-gradient-to-b from-[#b5ada6] to-[#9a918a] rounded-r-sm"></div>

            {/* Screen */}
            <div className="relative bg-[#F5F2EE] overflow-hidden w-full h-full rounded-[20px]">


              {/* Generated App Mockup */}
              <div className="absolute inset-0">
                <Image
                  src="/images/app-screenshot.png"
                  alt="Wash & Wow App Screenshot"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Screen shine */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none"></div>

              {/* Animated shine sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-[2000ms] pointer-events-none"></div>

              {/* Rotate Phone Hint Overlay - mobile only */}
              <div
                className={`absolute inset-0 bg-black/70 backdrop-blur-sm rounded-[20px] flex flex-col items-center justify-center z-30 pointer-events-none transition-opacity duration-700 md:hidden ${
                  showHint ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="animate-[tilt_1.5s_ease-in-out_infinite]">
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-90"
                  >
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                    <line x1="12" y1="18" x2="12" y2="18" />
                  </svg>
                </div>
                <p className="text-white/90 text-[15px] font-medium mt-[12px] text-center px-[20px]">
                  Tilt your phone
                </p>
                <p className="text-white/60 text-[12px] mt-[4px]">
                  to see the magic
                </p>
              </div>
            </div>

            {/* Frame shine */}
            <div className="absolute top-0 left-[20%] right-[20%] h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Reflection */}
      <div className="absolute -bottom-[80px] left-1/2 -translate-x-1/2 w-[200px] h-[80px] bg-gradient-to-b from-white/10 to-transparent blur-xl rounded-full"></div>
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
      const x = ((e.clientY - centerY) / (rect.height / 2)) * 15;
      const y = ((e.clientX - centerX) / (rect.width / 2)) * 15;
      setRotation({
        x: Math.max(-20, Math.min(20, x)),
        y: Math.max(-20, Math.min(20, y)),
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
        ".download-header",
        { opacity: 0, y: config.distance.medium },
        {
          opacity: 1,
          y: 0,
          duration: config.duration.normal * 1.3,
          ease: ANIMATION_CONFIG.ease.default,
          scrollTrigger: {
            trigger: ".download-header",
            start: "top 75%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".download-content",
        { opacity: 0, y: config.distance.medium },
        {
          opacity: 1,
          y: 0,
          duration: config.duration.normal * 1.3,
          ease: ANIMATION_CONFIG.ease.default,
          scrollTrigger: {
            trigger: ".download-content",
            start: "top 75%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".download-phone",
        { opacity: 0, scale: 1.05 },
        {
          opacity: 1,
          scale: 1,
          duration: config.duration.slow * 1.3,
          ease: ANIMATION_CONFIG.ease.smooth,
          scrollTrigger: {
            trigger: ".download-phone",
            start: "top 75%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="download-app"
      ref={sectionRef}
      className="relative bg-gradient-to-b from-[#897B6E] to-[#4A4139] py-[50px]"
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <DownloadAppSvg />
      </div>

      <div className="max-w-[1200px] mx-auto text-white py-[50px] sm:py-[70px] min-[900px]:py-[100px] px-[20px] min-[900px]:px-[40px]">
        <div className="download-header gsap-animate text-center relative z-10 opacity-0">
          <h1
            className="text-2xl sm:text-3xl font-semibold"
            style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
          >
            Download Our App
          </h1>
          <p className="text-[16px] sm:text-md font-light">
            Manage your laundry on the go
          </p>
        </div>

        <div className="flex flex-col min-[900px]:flex-row items-center justify-center mt-[40px] sm:mt-[60px] min-[900px]:mt-[80px] gap-[40px] min-[900px]:gap-[100px]">
          <div className="download-content gsap-animate opacity-0">
            <LeftContent />
          </div>
          <div className="download-phone gsap-animate min-[900px]:block opacity-0">
            <Phone rotation={rotation} />
          </div>
        </div>
      </div>
    </section>
  );
}
