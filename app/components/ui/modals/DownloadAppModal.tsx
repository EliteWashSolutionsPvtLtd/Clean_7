"use client";

import { useEffect, useRef, useState } from "react";
import { X, Smartphone, Maximize2, Minimize2 } from "lucide-react";
import AppStoreButton from "../buttons/AppStoreButton";
import GooglePlayButton from "../buttons/GooglePlayButton";
import gsap from "gsap";
import { QRCodeSVG } from "qrcode.react";

interface DownloadAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DownloadAppModal({
  isOpen,
  onClose,
}: DownloadAppModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const qrContainerRef = useRef<HTMLDivElement>(null);
  const [isQrExpanded, setIsQrExpanded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      // eslint-disable-next-line
      setIsQrExpanded(false);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const syncNarrowLayout = () => {
      if (window.innerWidth < 470 && qrContainerRef.current) {
        setIsQrExpanded(false);
        gsap.set(qrContainerRef.current, { clearProps: "flexDirection" });
      }
    };
    syncNarrowLayout();
    window.addEventListener("resize", syncNarrowLayout);
    return () => window.removeEventListener("resize", syncNarrowLayout);
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const toggleQrExpand = () => {
    if (window.innerWidth < 470 || !qrContainerRef.current) return;

    if (!isQrExpanded) {
      gsap.to(qrContainerRef.current, {
        flexDirection: "column",
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(qrContainerRef.current, {
        flexDirection: "row",
        duration: 0.3,
        ease: "power2.out",
      });
    }

    setIsQrExpanded(!isQrExpanded);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]" />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative bg-[var(--ground)] border border-[var(--line)] rounded-[32px] w-full max-w-[600px] max-h-[90vh] overflow-hidden shadow-[0_25px_80px_-12px_rgba(0,0,0,0.5)] animate-[modalSlideUp_0.4s_ease-out]"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-[16px] right-[16px] z-10 w-[36px] h-[36px] rounded-full bg-[var(--ground-soft)] border border-[var(--line)] flex items-center justify-center text-[var(--ink-soft)] hover:bg-[var(--line)] hover:text-[var(--ink)] active:scale-95 transition-all duration-200 cursor-pointer select-none"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Scrollable content wrapper */}
        <div
          className="overflow-y-auto overflow-x-hidden max-h-[90vh] modal-scrollbar p-[32px] sm:p-[40px]"
          data-lenis-prevent
        >
          {/* Header */}
          <div className="text-center mb-[28px]">
            <div className="inline-flex items-center justify-center w-[64px] h-[64px] rounded-full bg-[var(--ground-soft)] border border-[var(--line)] shadow-sm mb-[20px]">
              <Smartphone className="w-[28px] h-[28px] text-[var(--gold)]" />
            </div>

            <p className="text-[13px] font-bold tracking-[0.15em] text-[var(--gold)] uppercase mb-[8px]">
              DOWNLOAD OUR APP
            </p>

            <h2
              className="text-[var(--ink)] text-[28px] sm:text-[34px] font-medium leading-[1.1]"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Get Started in <br className="sm:hidden" />
              <span className="text-[var(--gold)] italic font-light">
                30 seconds.
              </span>
            </h2>

            <p className="text-[var(--ink-soft)] text-[16px] md:text-[17px] mt-[12px] max-w-[400px] mx-auto leading-[1.6]">
              Download our app and schedule your first pickup today.
            </p>
          </div>

          {/* QR Code Section */}
          <div className="bg-[var(--card)] rounded-[20px] p-[24px] border border-[var(--line)] shadow-sm mb-[24px] overflow-hidden">
            <div
              ref={qrContainerRef}
              className="flex flex-col min-[470px]:flex-row items-center gap-[20px] min-w-0"
            >
              {/* QR Code */}
              <div
                className={`relative min-w-0 max-[469px]:w-full ${
                  isQrExpanded
                    ? "min-[470px]:w-auto min-[470px]:shrink-0"
                    : "min-[470px]:shrink-0"
                }`}
              >
                <div
                  className={`bg-white rounded-[12px] p-[12px] border border-black/5 flex items-center justify-center transition-all duration-500 ease-out max-[469px]:w-full max-[469px]:aspect-square max-[469px]:max-w-full max-[469px]:cursor-default min-[470px]:cursor-pointer ${
                    isQrExpanded
                      ? "min-[470px]:w-[280px] min-[470px]:h-[280px] min-[470px]:max-w-[280px]"
                      : "min-[470px]:w-[140px] min-[470px]:h-[140px] min-[470px]:sm:w-[160px] min-[470px]:sm:h-[160px]"
                  }`}
                  onClick={toggleQrExpand}
                >
                  <QRCodeSVG
                    value="https://www.clean7.in"
                    size={384}
                    level="M"
                    bgColor="#ffffff"
                    fgColor="#1a1a1a"
                    className="max-h-full max-w-full h-full w-full object-contain"
                  />
                  {/* Expand/Collapse — desktop (≥470px) only */}
                  <div className="absolute bottom-[12px] right-[12px] hidden min-[470px]:flex w-[28px] h-[28px] rounded-full bg-[var(--gold)] items-center justify-center shadow-md pointer-events-none">
                    {isQrExpanded ? (
                      <Minimize2 className="w-[14px] h-[14px] text-white" />
                    ) : (
                      <Maximize2 className="w-[14px] h-[14px] text-white" />
                    )}
                  </div>
                </div>
                {/* Decorative ring */}
                <div className="absolute -inset-[3px] rounded-[15px] border-2 border-dashed border-[var(--gold)]/30 pointer-events-none" />
              </div>

              {/* Scan text */}
              <div
                className={`flex-1 text-center min-[470px]:text-left ${isQrExpanded ? "min-[470px]:text-center" : ""}`}
              >
                <div className="text-[12px] font-bold tracking-[0.1em] text-[var(--gold)] uppercase mb-[6px]">
                  SCAN TO DOWNLOAD
                </div>
                <p className="text-[var(--ink)] text-[16px] md:text-[17px] font-medium leading-[1.4]">
                  <span className="inline min-[470px]:hidden">
                    Point your camera at the QR code to get the app instantly
                  </span>
                  <span className="hidden min-[470px]:inline">
                    {isQrExpanded
                      ? "Tap the QR code to minimize"
                      : "Point your camera at the QR code to get the app instantly"}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-[16px] mb-[24px]">
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[var(--line)] to-transparent" />
            <span className="text-[var(--ink-soft)] text-[13px] font-medium uppercase tracking-[0.1em]">
              OR
            </span>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[var(--line)] to-transparent" />
          </div>

          {/* Download Buttons */}
          <div className="flex flex-col min-[470px]:flex-row gap-[12px]">
            <AppStoreButton className="flex-1 justify-center" />
            <GooglePlayButton className="flex-1 justify-center" />
          </div>

          {/* Footer note */}
          <p className="text-center text-[var(--ink-soft)] text-[14px] mt-[24px]">
            Free download • No credit card required
          </p>
        </div>
      </div>
    </div>
  );
}
