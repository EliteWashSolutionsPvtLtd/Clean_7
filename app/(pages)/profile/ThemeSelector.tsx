"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Palette, Sun } from "lucide-react";

const OPTIONS = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
  { value: "system", label: "System", Icon: Monitor },
] as const;

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  // Before mount the saved theme is unknown — show a static placeholder
  const active = mounted ? (theme ?? "system") : null;

  return (
    <div className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--gold)]/12 text-[var(--gold-bright)]">
          <Palette size={19} />
        </span>
        <span className="text-[16px] font-medium text-[var(--ink)]">
          Appearance
        </span>
      </div>

      <div
        role="radiogroup"
        aria-label="Appearance"
        className="grid grid-cols-3 gap-1 rounded-full border border-[var(--line)] bg-[var(--ink)]/5 p-1 sm:w-[300px]"
      >
        {OPTIONS.map(({ value, label, Icon }) => {
          const selected = active === value;
          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => setTheme(value)}
              className={`flex items-center justify-center gap-1.5 rounded-full px-3 py-2 text-[14px] font-medium ${
                selected
                  ? "bg-[var(--gold)] text-white"
                  : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
              }`}
            >
              <Icon size={15} />
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
