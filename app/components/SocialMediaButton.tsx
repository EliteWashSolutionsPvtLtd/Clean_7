// "use client";

// import FacebookButton from "./FacebookButton";
// import InstagramAppButton from "./InstagramAppButton";
// import WhatsAppButton from "./WhatsAppButton";

// export default function SocialMediaButton() {
//   return (
//     <div className="fixed right-4 sm:right-6 bottom-6 z-[9999] flex flex-col items-center justify-end gap-3">
//       <FacebookButton />
//       <InstagramAppButton />
//       <WhatsAppButton />
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { Share2, X } from "lucide-react";
import FacebookButton from "./FacebookButton";
import InstagramAppButton from "./InstagramAppButton";
import WhatsAppButton from "./WhatsAppButton";

export default function SocialMediaButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-4 sm:right-6 z-[9999] flex flex-col items-center">
      {/* Social media dropdown */}
      <div
        className={`
          flex flex-col items-center gap-3
          md:gap-3
          md:relative md:bottom-auto md:right-auto
          md:mb-0
          ${
            isOpen
              ? "visible mb-3 opacity-100 translate-y-0"
              : "invisible absolute bottom-full right-0 mb-3 translate-y-3 opacity-0"
          }
          md:visible md:translate-y-0 md:opacity-100
          transition-all duration-300 ease-out
        `}
      >
        <FacebookButton />
        <InstagramAppButton />
        <WhatsAppButton />
      </div>

      {/* Main toggle button — mobile only */}
      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-label={
          isOpen ? "Close social media menu" : "Open social media menu"
        }
        aria-expanded={isOpen}
        className="
          flex h-12 w-12 items-center justify-center
          rounded-full bg-[var(--gold)] text-white
          shadow-lg shadow-black/20
          transition-all duration-300
          hover:scale-105 active:scale-95
          md:hidden
        "
      >
        {isOpen ? (
          <X size={23} />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="23"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.6" y1="10.5" x2="15.4" y2="6.5" />
            <line x1="8.6" y1="13.5" x2="15.4" y2="17.5" />
          </svg>
        )}
      </button>
    </div>
  );
}
