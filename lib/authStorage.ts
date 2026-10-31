import type { AuthUser } from "@/redux/slices/authSlice";

const KEY = "clean7_auth";

export function loadAuth(): { token: string; user: AuthUser | null } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const { token, user } = JSON.parse(raw);
    return token ? { token, user: user ?? null } : null;
  } catch {
    return null;
  }
}

export function saveAuth(token: string, user: AuthUser | null) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ token, user }));
  } catch {}
}

export function clearAuth() {
  try {
    localStorage.removeItem(KEY);
  } catch {}
}