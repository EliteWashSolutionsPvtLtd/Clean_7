"use client";

import { useEffect, useState } from "react";

/** True after mount — use to avoid SSR/client mismatches for locale, TZ, battery, etc. */
export function useClientMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

export function useLiveTimes() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const now = new Date();

  /** en-US 12h uses capital AM/PM; local timezone (viewer's device). */
  const statusTime = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(now);

  void tick;
  return { statusTime };
}

type BatteryState = {
  supported: boolean;
  level: number;
  charging: boolean;
};

export function useDeviceBattery(): BatteryState {
  const [state, setState] = useState<BatteryState>({
    supported: false,
    level: 1,
    charging: false,
  });

  useEffect(() => {
    const nav = navigator as Navigator & {
      getBattery?: () => Promise<{
        level: number;
        charging: boolean;
        addEventListener: (type: string, fn: () => void) => void;
        removeEventListener: (type: string, fn: () => void) => void;
      }>;
    };

    if (typeof nav.getBattery !== "function") {
      return;
    }

    let cancelled = false;
    let battery: Awaited<ReturnType<NonNullable<typeof nav.getBattery>>> | null =
      null;

    const sync = () => {
      if (!battery || cancelled) return;
      setState({
        supported: true,
        level: battery.level,
        charging: battery.charging,
      });
    };

    nav.getBattery().then((b) => {
      if (cancelled) return;
      battery = b;
      sync();
      b.addEventListener("levelchange", sync);
      b.addEventListener("chargingchange", sync);
    });

    return () => {
      cancelled = true;
      if (battery) {
        battery.removeEventListener("levelchange", sync);
        battery.removeEventListener("chargingchange", sync);
      }
    };
  }, []);

  return state;
}
