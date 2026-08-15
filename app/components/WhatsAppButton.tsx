"use client";

import { useState, useRef, useEffect } from "react";
import { X, Briefcase, Store } from "lucide-react";
import Link from "next/link";

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartState, setCartState] = useState({ hasItems: false, isExpanded: false });
  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleCartState = (e: any) => {
      setCartState(e.detail);
    };
    window.addEventListener("cartStateChange", handleCartState);
    return () => window.removeEventListener("cartStateChange", handleCartState);
  }, []);

  const phoneNumber = "917078497263"; // With country code
  const bookServiceMessage = encodeURIComponent(
    "Hi, I would like to book a service.",
  );
  const franchiseMessage = encodeURIComponent(
    "Hi, I am interested in franchise opportunities.",
  );

  return (
    <div className={`fixed right-6 z-50 flex flex-col items-end pointer-events-none transition-all duration-300 ${cartState.isExpanded ? 'max-[900px]:opacity-0 max-[900px]:scale-90 max-[900px]:translate-y-4 opacity-100 scale-100' : 'opacity-100 scale-100'} ${cartState.hasItems ? 'bottom-6 max-[900px]:bottom-[120px]' : 'bottom-6'}`}>
      {/* Modal */}
      <div
        ref={modalRef}
        className={`mb-4 w-72 origin-bottom-right transform transition-all duration-300 ease-out pointer-events-auto ${isOpen
          ? "scale-100 opacity-100 translate-y-0"
          : "scale-95 opacity-0 translate-y-4 pointer-events-none"
          } rounded-2xl bg-[var(--card)] border border-[var(--line)] p-5 shadow-2xl overflow-hidden relative`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-[var(--line)]">
          <div>
            <h3 className="font-serif text-lg font-semibold text-[var(--ink)]">
              Chat with us
            </h3>
            <p className="text-xs text-[var(--ink-soft)] mt-1">
              How can we help you today?
            </p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="cursor-pointer p-1.5 rounded-full hover:bg-[var(--ink)]/5 text-[var(--ink-soft)] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-3">
          <Link
            href={`https://wa.me/${phoneNumber}?text=${bookServiceMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-xl border border-[var(--line)] hover:border-gold hover:bg-[var(--ink)]/5 transition-all group"
          >
            <div className="bg-[var(--gold)]/10 p-2.5 rounded-full text-[var(--gold)] group-hover:scale-110 transition-transform">
              <Briefcase size={20} />
            </div>
            <div>
              <p className="font-medium text-sm text-[var(--ink)] group-hover:text-gold transition-colors">
                Book Service
              </p>
              <p className="text-xs text-[var(--ink-soft)]">
                Schedule a laundry pickup
              </p>
            </div>
          </Link>

          <Link
            href={`https://wa.me/${phoneNumber}?text=${franchiseMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-xl border border-[var(--line)] hover:border-gold hover:bg-[var(--ink)]/5 transition-all group"
          >
            <div className="bg-[var(--gold)]/10 p-2.5 rounded-full text-[var(--gold)] group-hover:scale-110 transition-transform">
              <Store size={20} />
            </div>
            <div>
              <p className="font-medium text-sm text-[var(--ink)] group-hover:text-gold transition-colors">
                Franchise
              </p>
              <p className="text-xs text-[var(--ink-soft)]">
                Partner with Clean7
              </p>
            </div>
          </Link>
        </div>
      </div>

      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer flex h-14 w-14 items-center justify-center rounded-full bg-[var(--gold)] text-white shadow-lg shadow-[var(--gold)]/30 hover:scale-105 hover:shadow-xl transition-all duration-300 relative group pointer-events-auto"
        aria-label="Open WhatsApp Chat"
      >
        <X
          size={28}
          className={`transition-transform duration-300 absolute ${isOpen ? "rotate-0 scale-100" : "rotate-90 scale-0"}`}
          style={{ color: "white", stroke: "white" }}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={`w-8 h-8 transition-transform duration-300 ${isOpen ? "scale-0 -rotate-90" : "scale-100 rotate-0"}`}
          style={{ fill: "white" }}
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413z" />
        </svg>
      </button>
    </div>
  );
}
