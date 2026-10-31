"use client";

import { useMemo } from "react";
import { useGetCategoriesQuery } from "@/redux/api/catalogApi";
import {
  SERVICE_CATEGORIES,
  mapApiCategories,
  type ServiceCategory,
} from "@/app/lib/service-categories";

/**
 * Service categories from GET /catalog/categories (RTK Query).
 * While loading, or if the request fails / returns nothing, the built-in
 * SERVICE_CATEGORIES are used as fallback data.
 */
export function useServiceCategories(branchId?: string): {
  categories: ServiceCategory[];
  isLoading: boolean;
  isFallback: boolean;
} {
  const { data, isLoading, isError } = useGetCategoriesQuery({ branchId });

  const apiList = data?.data;
  const hasApiData = !isError && Array.isArray(apiList) && apiList.length > 0;

  const categories = useMemo(
    () => (hasApiData ? mapApiCategories(apiList) : SERVICE_CATEGORIES),
    [hasApiData, apiList],
  );

  return { categories, isLoading, isFallback: !hasApiData };
}
