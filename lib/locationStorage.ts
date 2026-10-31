import type { LocalAddress } from "@/redux/slices/locationSlice";

const KEY = "clean7_local_addresses";

export function loadLocalAddresses(): LocalAddress[] {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveLocalAddresses(list: LocalAddress[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    /* storage full / blocked — ignore */
  }
}
