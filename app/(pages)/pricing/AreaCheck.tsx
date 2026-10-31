"use client";

import { useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, LocateFixed, MapPinOff } from "lucide-react";
import {
  readServiceability,
  useLazyCheckServiceabilityQuery,
} from "@/redux/api/catalogApi";

export type AreaResult = {
  serviceable: boolean;
  branchId?: string;
  branchName?: string;
};

/**
 * "Check your area" bar — GET /branches/serviceability with the browser's
 * location. Reports the result (and branchId) to the parent.
 */
export default function AreaCheck({
  result,
  onResult,
}: {
  result: AreaResult | null;
  onResult: (r: AreaResult | null) => void;
}) {
  const [check, { isFetching }] = useLazyCheckServiceabilityQuery();
  const [locating, setLocating] = useState(false);
  const busy = locating || isFetching;

  function handleCheck() {
    if (!navigator.geolocation) {
      toast.error("Location isn't supported on this device.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        setLocating(false);
        try {
          const res = await check({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          }).unwrap();
          onResult(readServiceability(res));
        } catch {
          // error toast is shown globally in apiSlice
        }
      },
      () => {
        setLocating(false);
        toast.error("Couldn't get your location. Please allow location access.");
      },
      { timeout: 10000 },
    );
  }

  return (
    <div className="mx-auto mb-10 flex max-w-[640px] flex-col items-center justify-between gap-3 rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4 text-[14px] sm:flex-row">
      <div className="flex items-center gap-2.5 text-center sm:text-left">
        {result ? (
          result.serviceable ? (
            <>
              <CheckCircle2 size={18} className="shrink-0 text-green-600" />
              <span className="text-[var(--ink)]">
                We deliver to your area
                {result.branchName ? ` — ${result.branchName}` : ""}. Prices
                shown are for your area.
              </span>
            </>
          ) : (
            <>
              <MapPinOff size={18} className="shrink-0 text-red-500" />
              <span className="text-[var(--ink)]">
                We don&apos;t serve your area yet. Showing standard prices.
              </span>
            </>
          )
        ) : (
          <span className="text-[var(--ink-soft)]">
            Check if Clean7 serves your area to see local prices.
          </span>
        )}
      </div>
      <button
        type="button"
        onClick={handleCheck}
        disabled={busy}
        className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[var(--gold)] px-5 py-2 font-semibold text-[var(--gold-bright)] transition-colors hover:bg-[var(--gold)]/10 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <LocateFixed size={16} />
        {busy ? "Checking..." : result ? "Check again" : "Check my area"}
      </button>
    </div>
  );
}
