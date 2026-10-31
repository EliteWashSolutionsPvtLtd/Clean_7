"use client";

import { useState } from "react";

/** Text clamped to 2 lines with Read more / Show less (span-based, safe inside <label>). */
export default function ClampedText({
  text,
  threshold = 100,
  className = "",
}: {
  text: string;
  threshold?: number;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const long = text.length > threshold;

  return (
    <span className={`block ${className}`}>
      <span className={open || !long ? "block" : "line-clamp-2"}>{text}</span>
      {long && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault(); // don't toggle the radio/checkbox it sits in
            e.stopPropagation();
            setOpen((v) => !v);
          }}
          className="mt-1 text-[13px] font-semibold text-[var(--gold-bright)] hover:underline underline-offset-4"
        >
          {open ? "Show less" : "Read more"}
        </button>
      )}
    </span>
  );
}
