"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "./hooks";
import { logout } from "./slices/authSlice";

const MAX_TIMEOUT = 2 ** 31 - 1; // setTimeout limit (~24.8 days)

// Reads `exp` (seconds) from a JWT payload. Returns ms timestamp or null.
function getExpiry(token: string): number | null {
  try {
    const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(base64));
    return typeof payload.exp === "number" ? payload.exp * 1000 : null;
  } catch {
    return null; // not a JWT — expiry is then caught by the 401 handler
  }
}

// Logs the user out and sends them to /login the moment the token expires.
export default function AuthExpiryWatcher() {
  const token = useAppSelector((s) => s.auth.token);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!token) return;
    const exp = getExpiry(token);
    if (!exp) return;

    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const remaining = exp - Date.now();
      if (remaining <= 0) {
        dispatch(logout());
        toast.error("Session expired. Please login again.");
        router.replace("/login");
        return;
      }
      timer = setTimeout(tick, Math.min(remaining, MAX_TIMEOUT));
    };

    tick();
    return () => clearTimeout(timer);
  }, [token, dispatch, router]);

  return null;
}