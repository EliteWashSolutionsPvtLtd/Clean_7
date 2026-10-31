"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { CatalogService } from "@/redux/api/catalogApi";
import { bookingPath, imageFor } from "@/app/lib/booking";

/**
 * House help / door-to-door car wash / solar panel cleaning layout:
 * "select a service below to view" → cards (image, name, subtitle, ›)
 * → each opens /services/book/<category>/<service> to choose an option.
 */
export default function ServicePicker({
  categorySlug,
  title,
  services,
}: {
  categorySlug: string;
  title: string;
  services: CatalogService[];
}) {
  return (
    <div>
      <h2
        className="text-[32px] leading-tight md:text-[40px]"
        style={{ fontFamily: "var(--font-fraunces)" }}
      >
        {title}
      </h2>
      <p className="mt-2 text-[16px] text-[var(--ink-soft)]">
        Select a service below to view
      </p>

      <h3
        className="mb-4 mt-9 text-[22px] md:text-[26px]"
        style={{ fontFamily: "var(--font-fraunces)" }}
      >
        Our services
      </h3>

      {services.length === 0 ? (
        <p className="rounded-2xl border border-[var(--line)] bg-[var(--card)] px-5 py-10 text-center text-[var(--ink-soft)]">
          No services are available in this category right now.
        </p>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2">
          {services.map((svc) => {
            const src = imageFor(categorySlug, svc.webImageUrl);
            return (
              <li key={svc.slug}>
                <Link
                  href={bookingPath(categorySlug, svc.slug)}
                  className="flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--card)] transition-colors hover:border-[var(--gold)]/60"
                >
                  <span className="relative block aspect-[4/3] w-full overflow-hidden bg-[var(--ink)]/5">
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      unoptimized={src.startsWith("http")}
                      className="object-cover object-top"
                    />
                  </span>
                  <span className="flex flex-1 flex-col p-5">
                    <span className="line-clamp-2 text-[18px] font-semibold text-[var(--ink)]">
                      {svc.name}
                    </span>
                    {svc.shortDescription && (
                      <span className="mt-1.5 line-clamp-3 text-[14px] leading-[1.6] text-[var(--ink-soft)]">
                        {svc.shortDescription}
                      </span>
                    )}
                    <span className="mt-auto inline-flex items-center gap-1 pt-4 text-[14px] font-semibold text-[var(--gold-bright)]">
                      View options
                      <ChevronRight size={16} />
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
