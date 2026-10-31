// Static placeholder (no pulse) — keeps motion minimal.
const block = "rounded-lg bg-[var(--ink)]/10";

function RowSkeleton() {
  return (
    <div className="flex items-center gap-4 px-5 py-4">
      <div className="h-10 w-10 shrink-0 rounded-full bg-[var(--ink)]/10" />
      <div className={`${block} h-4 w-40`} />
    </div>
  );
}

export default function ProfileSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading profile" className="space-y-6">
      {/* Card 1 */}
      <div className="flex items-center gap-5 rounded-3xl border border-[var(--line)] bg-[var(--card)] p-6 sm:gap-7 sm:p-8">
        <div className="h-20 w-20 shrink-0 rounded-full bg-[var(--ink)]/10 sm:h-28 sm:w-28" />
        <div className="w-full space-y-3">
          <div className={`${block} h-6 w-48 max-w-full`} />
          <div className={`${block} h-4 w-56 max-w-full`} />
          <div className={`${block} h-4 w-40 max-w-full`} />
          <div className={`${block} h-4 w-36 max-w-full`} />
        </div>
      </div>

      {/* Cards 2 & 3 */}
      {[4, 8].map((rows) => (
        <div
          key={rows}
          className="rounded-3xl border border-[var(--line)] bg-[var(--card)] py-3"
        >
          <div className="px-5 pb-2 pt-3">
            <div className={`${block} h-5 w-44`} />
          </div>
          {Array.from({ length: rows }).map((_, i) => (
            <RowSkeleton key={i} />
          ))}
        </div>
      ))}
    </div>
  );
}
