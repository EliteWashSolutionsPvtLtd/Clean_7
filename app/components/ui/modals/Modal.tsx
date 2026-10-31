"use client";

import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { SatoshiFont, WixMadeForDisplayFont } from "@/app/fonts";
import { getLenisInstance } from "@/app/lib/lenis-instance";

// Secondary (outlined) button — pairs with primaryBtnClass from auth/styles
export const secondaryBtnClass =
  "w-full rounded-full border border-[var(--line)] bg-transparent px-8 py-3.5 text-[16px] font-semibold text-[var(--ink)] hover:bg-[var(--ink)]/5 disabled:cursor-not-allowed disabled:opacity-50";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  /** Max width of the dialog on larger screens */
  size?: "sm" | "md" | "lg";
  /** Close when the dark backdrop is clicked (default true) */
  closeOnBackdrop?: boolean;
}

const SIZE_CLASS = {
  sm: "sm:max-w-[400px]",
  md: "sm:max-w-[480px]",
  lg: "sm:max-w-[600px]",
} as const;

/**
 * Reusable modal: portal, backdrop, Escape to close, focus trap,
 * focus restore, page scroll lock. No animation (minimal motion).
 * Bottom sheet on mobile, centered dialog from `sm` up.
 */
export default function Modal({
  open,
  onClose,
  title,
  children,
  size = "md",
  closeOnBackdrop = true,
}: ModalProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const lenis = getLenisInstance();

    // Lock page scroll (same approach as the mobile navbar menu)
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    lenis?.stop();

    dialogRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;

      const items = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      );
      if (items.length === 0) {
        e.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || active === dialogRef.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      lenis?.start();
      previouslyFocused?.focus?.();
    };
  }, [open]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[300] flex items-end justify-center sm:items-center sm:p-6">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/50"
        onMouseDown={closeOnBackdrop ? onClose : undefined}
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        style={{ fontFamily: SatoshiFont.style.fontFamily }}
        className={`relative flex max-h-[90vh] w-full flex-col rounded-t-3xl border border-[var(--line)] bg-[var(--card)] text-[var(--ink)] shadow-xl outline-none sm:rounded-3xl ${SIZE_CLASS[size]}`}
      >
        <div className="flex items-start justify-between gap-4 px-6 pb-3 pt-6">
          <h2
            id={titleId}
            className="text-[22px] font-semibold tracking-tight sm:text-[24px]"
            style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-2 -mt-1 rounded-full p-2 text-[var(--ink-soft)] hover:bg-[var(--ink)]/5 hover:text-[var(--ink)]"
          >
            <X size={20} />
          </button>
        </div>

        {/* data-lenis-prevent lets the wheel scroll inside the dialog */}
        <div data-lenis-prevent className="overflow-y-auto px-6 pb-6">
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}
