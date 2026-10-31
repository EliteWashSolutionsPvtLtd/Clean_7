/** /login?next=<path> — so the user comes back to where they started. */
export const loginUrl = (next: string) =>
  `/login?next=${encodeURIComponent(next)}`;

/**
 * Where to go after a successful login: the ?next= path if it is a safe
 * in-site path, otherwise the fallback. Reads window.location directly so
 * the login pages don't need a <Suspense> boundary for useSearchParams.
 */
export function getPostLoginPath(fallback = "/"): string {
  if (typeof window === "undefined") return fallback;
  const next = new URLSearchParams(window.location.search).get("next");
  if (!next) return fallback;
  // only same-site paths (blocks //evil.com and /\evil.com)
  if (!next.startsWith("/") || next.startsWith("//") || next.startsWith("/\\")) {
    return fallback;
  }
  return next;
}
