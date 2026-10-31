"use client";

import { useCallback, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { loginUrl } from "@/lib/authRedirect";
import { bookingPath } from "@/app/lib/booking";

/**
 * "Book now" handler: logged in → booking page, otherwise → login page
 * (which sends the user back to the booking page after login).
 * `ready` is false until the saved login has been read from localStorage.
 */
export function useBookNow() {
  const router = useRouter();
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  const hydrated = useAppSelector((s) => s.auth.hydrated);

  const bookNow = useCallback(
    (categorySlug: string) => {
      if (!hydrated) return;
      const target = bookingPath(categorySlug);
      router.push(isAuthenticated ? target : loginUrl(target));
    },
    [hydrated, isAuthenticated, router],
  );

  return { bookNow, ready: hydrated };
}

/**
 * Guard for the booking pages themselves (direct URL / logout on the page):
 * sends logged-out users to /login?next=<this page>.
 */
export function useRequireAuth() {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  const hydrated = useAppSelector((s) => s.auth.hydrated);

  useEffect(() => {
    if (hydrated && !isAuthenticated) router.replace(loginUrl(pathname));
  }, [hydrated, isAuthenticated, pathname, router]);

  return { allowed: hydrated && isAuthenticated };
}
