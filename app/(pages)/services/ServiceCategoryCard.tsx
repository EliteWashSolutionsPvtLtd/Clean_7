"use client";

import Image from "next/image";

export type CardService = {
  title: string;
  slug?: string;
  /** Lowest item price for the service (from the API) */
  fromPrice?: number;
  itemCount?: number;
};

const rupee = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export default function ServiceCategoryCard({
  title,
  description,
  imageSrc,
  services,
  index,
  onBook,
  bookDisabled = false,
}: {
  title: string;
  description: string;
  imageSrc: string;
  services: CardService[];
  index: number;
  onBook: () => void;
  bookDisabled?: boolean;
}) {
  const isRemote = imageSrc.startsWith("http");
  const cheapest = services
    .map((s) => s.fromPrice)
    .filter((p): p is number => typeof p === "number" && p >= 0)
    .sort((a, b) => a - b)[0];

  return (
    <article
      className="group flex flex-col overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--card)] transition-colors duration-300 hover:border-[var(--gold)]/40"
      style={{ animationDelay: `${(index + 1) * 0.1}s` }}
    >
      {/* Image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          fill
          unoptimized={isRemote}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
        <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-2">
          <span className="rounded-full bg-[var(--card)]/90 px-3.5 py-1.5 text-[13px] font-semibold text-[var(--ink)] backdrop-blur">
            {services.length} {services.length === 1 ? "service" : "services"}
          </span>
          {cheapest !== undefined && (
            <span className="rounded-full bg-[var(--gold)] px-3.5 py-1.5 text-[13px] font-semibold text-[#fff]">
              From {rupee(cheapest)}
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-7 md:p-9">
        <h2
          className="text-[30px] leading-tight text-[var(--ink)] md:text-[36px]"
          style={{ fontFamily: "var(--font-fraunces)" }}
        >
          {title}
        </h2>
        <p className="mt-3 line-clamp-3 flex-1 text-[16px] leading-[1.7] text-[var(--ink-soft)] md:text-[17px]">
          {description}
        </p>

        {/* Action — Book now only */}
        <button
          type="button"
          onClick={onBook}
          disabled={bookDisabled}
          className="mt-7 w-full rounded-full bg-[var(--gold)] px-6 py-3 text-[15px] font-semibold text-[#fff] shadow-lg shadow-[var(--gold)]/25 transition-colors hover:bg-[var(--gold-bright)] disabled:cursor-wait disabled:opacity-60"
        >
          Book now
        </button>
      </div>
    </article>
  );
}
