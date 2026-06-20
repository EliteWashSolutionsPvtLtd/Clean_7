"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const PREFETCH_HREFS = ["/about", "/services", "/pricing"] as const;

/**
 * Warms the client router cache for main marketing routes on every full load.
 */
export default function RoutePrefetch() {
  const router = useRouter();

  useEffect(() => {
    for (const href of PREFETCH_HREFS) {
      router.prefetch(href);
    }
  }, [router]);

  return null;
}
