// Static skeletons (no pulse / shimmer) — keeps motion minimal.
const block = "rounded-lg bg-[var(--ink)]/10";

export function HeadingSkeleton() {
  return (
    <div className="space-y-3" aria-hidden>
      <div className={`${block} h-9 w-56`} />
      <div className={`${block} h-4 w-72 max-w-full`} />
    </div>
  );
}

export function ChipsSkeleton() {
  return (
    <div className="flex gap-2.5 overflow-hidden" aria-hidden>
      {[110, 130, 96, 120].map((w, i) => (
        <div key={i} className={`${block} h-10 rounded-full`} style={{ width: w }} />
      ))}
    </div>
  );
}

export function RowsSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div
      className="divide-y divide-[var(--line)] rounded-2xl border border-[var(--line)] bg-[var(--card)]"
      aria-hidden
    >
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center justify-between gap-4 px-5 py-4">
          <div className="space-y-2">
            <div className={`${block} h-4 w-40`} />
            <div className={`${block} h-3 w-28`} />
          </div>
          <div className="flex items-center gap-4">
            <div className={`${block} h-4 w-12`} />
            <div className={`${block} h-9 w-9 rounded-full`} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function GridRowsSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <div className="grid gap-3 md:grid-cols-2" aria-hidden>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--line)] bg-[var(--card)] px-4 py-3.5"
        >
          <div className={`${block} h-4 w-32`} />
          <div className="flex items-center gap-3">
            <div className={`${block} h-4 w-12`} />
            <div className={`${block} h-9 w-9 rounded-full`} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function CardsSkeleton({ cards = 4 }: { cards?: number }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2" aria-hidden>
      {Array.from({ length: cards }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--card)]"
        >
         <div className={`${block} aspect-[4/3] w-full rounded-none`} />
          <div className="space-y-2 p-5">
            <div className={`${block} h-5 w-40`} />
            <div className={`${block} h-3 w-full`} />
            <div className={`${block} h-3 w-2/3`} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function PageSkeleton({ variant }: { variant: "list" | "cards" | "options" }) {
  return (
    <div className="space-y-8" role="status" aria-label="Loading">
      <HeadingSkeleton />
      {variant === "list" && (
        <>
          <div className={`${block} h-12 w-full rounded-full`} aria-hidden />
          <ChipsSkeleton />
          <GridRowsSkeleton />
        </>
      )}
      {variant === "cards" && <CardsSkeleton />}
      {variant === "options" && <RowsSkeleton rows={3} />}
    </div>
  );
}
