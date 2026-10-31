"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { WixMadeForDisplayFont } from "@/app/fonts";
import { linkClass } from "@/app/components/auth/styles";

export const RESEND_SECONDS = 30;

export function Heading({
  title,
  subtitle,
}: {
  title: string;
  subtitle: React.ReactNode;
}) {
  return (
    <div className="mb-8 text-center">
      <h1
        className="text-[28px] font-semibold tracking-tight sm:text-[34px]"
        style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
      >
        {title}
      </h1>
      <p className="mt-2 text-[16px] leading-relaxed text-[var(--ink-soft)]">
        {subtitle}
      </p>
    </div>
  );
}

export function BackButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mb-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
    >
      <ArrowLeft size={16} />
      {label}
    </button>
  );
}

export function ResendRow({
  seconds,
  onResend,
}: {
  seconds: number;
  onResend: () => void;
}) {
  return (
    <p className="text-center text-[14px] text-[var(--ink-soft)]">
      Didn&apos;t receive the code?{" "}
      {seconds > 0 ? (
        <span className="font-medium text-[var(--ink)]">
          Resend in 0:{String(seconds).padStart(2, "0")}
        </span>
      ) : (
        <button type="button" onClick={onResend} className={linkClass}>
          Resend code
        </button>
      )}
    </p>
  );
}

/** Resend countdown: `const [seconds, start] = useCountdown()` */
export function useCountdown(): [number, () => void] {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const start = useCallback(() => setSeconds(RESEND_SECONDS), []);
  return [seconds, start];
}

/** Phone input with the fixed +91 prefix (10 digits). */
export function PhoneField({
  id,
  value,
  onChange,
  inputClass,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  inputClass: string;
}) {
  return (
    <div className="flex gap-2">
      <span className="flex items-center rounded-xl bg-[var(--ink)]/5 px-4 text-[16px] font-medium text-[var(--ink)]">
        +91
      </span>
      <input
        id={id}
        type="tel"
        inputMode="numeric"
        required
        autoComplete="tel-national"
        placeholder="10-digit mobile number"
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, 10))}
        className={inputClass}
      />
    </div>
  );
}

/**
 * Reads a check-email / check-phone response. The exact shape isn't
 * documented, so accept the common variants. Returns true when the
 * value is already registered.
 */
export function isAlreadyRegistered(res: unknown): boolean {
  const r = (res ?? {}) as Record<string, unknown>;
  const d = ((r.data as Record<string, unknown> | undefined) ?? r) as Record<
    string,
    unknown
  >;
  return (
    d.exists === true ||
    d.registered === true ||
    d.isRegistered === true ||
    d.available === false ||
    d.isAvailable === false
  );
}
