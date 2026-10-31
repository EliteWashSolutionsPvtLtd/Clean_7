import { Check } from "lucide-react";

export default function Stepper({
  steps,
  current,
}: {
  steps: string[];
  current: number; // 1-based
}) {
  return (
    <ol className="mb-8 flex items-start" aria-label="Sign up progress">
      {steps.map((label, i) => {
        const n = i + 1;
        const done = n < current;
        const active = n === current;
        return (
          <li
            key={label}
            className="relative flex flex-1 flex-col items-center"
            aria-current={active ? "step" : undefined}
          >
            {i > 0 && (
              <span
                className={`absolute right-1/2 top-[15px] h-0.5 w-full ${
                  n <= current ? "bg-[var(--gold)]" : "bg-[var(--line)]"
                }`}
              />
            )}
            <span
              className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-[14px] font-semibold ${
                done || active
                  ? "bg-[var(--gold)] text-white"
                  : "border border-[var(--line)] bg-[var(--card)] text-[var(--ink-soft)]"
              }`}
            >
              {done ? <Check size={16} strokeWidth={3} /> : n}
            </span>
            <span
              className={`mt-2 px-0.5 text-center text-[11px] leading-tight sm:text-[12px] ${
                active
                  ? "font-semibold text-[var(--ink)]"
                  : "text-[var(--ink-soft)]"
              }`}
            >
              {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
