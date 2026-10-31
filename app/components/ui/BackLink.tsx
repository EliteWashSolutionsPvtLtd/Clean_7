"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

/**
 * "Back" that returns to the page the user actually came from (browser
 * history). If there is no previous page on this site (opened in a new tab,
 * refreshed from a bookmark…) it goes to `fallback` instead.
 */
export default function BackLink({
  fallback,
  className,
  children,
}: {
  fallback: string;
  className?: string;
  children: ReactNode;
}) {
  const router = useRouter();

  function goBack() {
    let cameFromThisSite = false;
    try {
      cameFromThisSite =
        window.history.length > 1 &&
        !!document.referrer &&
        new URL(document.referrer).origin === window.location.origin;
    } catch {
      /* ignore */
    }
    // client-side navigations keep the referrer of the first load, so also
    // trust the history length when the app was navigated inside the SPA
    if (cameFromThisSite || window.history.length > 2) router.back();
    else router.push(fallback);
  }

  return (
    <button type="button" onClick={goBack} className={className}>
      {children}
    </button>
  );
}