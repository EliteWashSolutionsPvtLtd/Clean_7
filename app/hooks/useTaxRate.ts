"use client";

import { GST_PERCENT, parseRate } from "@/app/lib/booking";
import { useGetTaxSettingsQuery } from "@/redux/api/orderApi";

/**
 * Configured GST rate from GET /orders/tax-settings.
 * `loaded` is false while loading / on error - the UI then shows the
 * GST_PERCENT estimate (the server computes the final tax on the order).
 */
export function useTaxRate(skip = false) {
  const { data, isLoading, isError, refetch } = useGetTaxSettingsQuery(undefined, { skip });
  const raw = data?.data;
  const rate = parseRate(raw?.gstRate ?? raw?.taxRate);
  return {
    rate: rate ?? GST_PERCENT,
    loaded: rate !== null,
    loading: isLoading,
    error: isError || (!isLoading && !!data && rate === null),
    retry: refetch,
  };
}
