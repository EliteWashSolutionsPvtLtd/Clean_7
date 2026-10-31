// import { apiSlice } from "./apiSlice";
// import type { ApiResponse } from "./authApi";
// import {
//   ENDPOINTS,
//   catalogSettingPath,
//   servicePath,
// } from "@/lib/constants";

// /* ---------- types ---------- */

// export interface PricingItem {
//   id?: string;
//   code?: string;
//   slug?: string;
//   name: string;
//   price: number;
//   basePrice?: number;
//   currency?: string;
//   /** e.g. "piece", "pair" */
//   unitLabel?: string | null;
//   pricingType?: string;
//   description?: string | null;
//   minQty?: number | null;
//   maxQty?: number | null;
//   [key: string]: unknown;
// }

// export interface CatalogService {
//   id: string;
//   code?: string;
//   slug: string;
//   name: string;
//   shortDescription?: string | null;
//   longDescription?: string | null;
//   tags?: string[] | null;
//   appImageUrl?: string | null;
//   webImageUrl?: string | null;
//   serviceMode?: string;
//   durationEstimateMinutes?: number | null;
//   arrivalSlaMinutes?: number | null;
//   sortOrder?: number;
//   category?: {
//     id?: string;
//     code?: string;
//     slug: string;
//     name: string;
//     description?: string | null;
//     [key: string]: unknown;
//   };
//   items?: PricingItem[];
//   addOns?: PricingItem[];
//   [key: string]: unknown;
// }

// export interface CatalogCategory {
//   id: string;
//   code?: string;
//   slug: string;
//   name: string;
//   description?: string | null;
//   sortOrder?: number;
//   webImageUrl?: string | null;
//   appImageUrl?: string | null;
//   services?: CatalogService[];
//   [key: string]: unknown;
// }

// /** Setting keys known so far — any other string key also works. */
// export type CatalogSettingKey = "home_carousel" | "express_delivery" | (string & {});

// // Settings come back as { success, data: { key, value } } (see Footer social_links)
// export type CatalogSetting<T = unknown> = ApiResponse<{
//   key?: string;
//   value?: T;
//   [key: string]: unknown;
// }>;

// export interface Serviceability {
//   serviceable?: boolean;
//   isServiceable?: boolean;
//   branchId?: string;
//   branch?: { id?: string; name?: string; [key: string]: unknown } | null;
//   [key: string]: unknown;
// }

// export interface CategoriesArgs {
//   branchId?: string;
// }
// export interface ServicesArgs {
//   category?: string;
//   branchId?: string;
//   /** Sent as ?tags=a,b */
//   tags?: string[] | string;
// }
// export interface ServiceBySlugArgs {
//   slug: string;
//   branchId?: string;
// }
// export interface ServiceabilityArgs {
//   latitude: number;
//   longitude: number;
// }

// // Drop empty values so they don't end up as "?branchId=" in the URL
// function clean(params: Record<string, string | number | undefined | null>) {
//   const out: Record<string, string | number> = {};
//   for (const [k, v] of Object.entries(params)) {
//     if (v !== undefined && v !== null && v !== "") out[k] = v;
//   }
//   return out;
// }

// /* ---------- helpers ---------- */

// // The API has names like "Dry Cleaning               Men" → collapse spaces
// const tidy = (v: string) => v.replace(/\s+/g, " ").trim();

// const tidyItems = (list?: PricingItem[]) =>
//   list?.map((i) => ({ ...i, name: tidy(i.name) }));

// function tidyService(svc: CatalogService): CatalogService {
//   return {
//     ...svc,
//     name: tidy(svc.name),
//     items: tidyItems(svc.items),
//     addOns: tidyItems(svc.addOns),
//   };
// }

// function tidyCategory(cat: CatalogCategory): CatalogCategory {
//   return {
//     ...cat,
//     name: tidy(cat.name),
//     services: cat.services?.map(tidyService),
//   };
// }


// /** First readable text from a setting value (string, or common text fields). */
// export function settingText(res: CatalogSetting | undefined): string {
//   const v = res?.data?.value as unknown;
//   if (typeof v === "string") return v.trim();
//   if (v && typeof v === "object") {
//     const o = v as Record<string, unknown>;
//     for (const k of ["message", "text", "description", "title", "label"]) {
//       if (typeof o[k] === "string" && (o[k] as string).trim()) {
//         return (o[k] as string).trim();
//       }
//     }
//   }
//   return "";
// }

// /** Normalises the serviceability response. */
// export function readServiceability(res: ApiResponse<Serviceability> | undefined): {
//   serviceable: boolean;
//   branchId?: string;
//   branchName?: string;
// } {
//   const d = (res?.data ?? res ?? {}) as Serviceability;
//   const branchId = d.branchId ?? d.branch?.id ?? undefined;
//   const flag = d.serviceable ?? d.isServiceable;
//   return {
//     serviceable: typeof flag === "boolean" ? flag : !!branchId,
//     branchId,
//     branchName: typeof d.branch?.name === "string" ? d.branch.name : undefined,
//   };
// }

// /* ---------- endpoints ---------- */

// export const catalogApi = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     // GET /catalog/categories?branchId=
//     getCategories: builder.query<
//       ApiResponse<CatalogCategory[]>,
//       CategoriesArgs | void
//     >({
//       query: (args) => ({
//         url: ENDPOINTS.CATALOG_CATEGORIES,
//         method: "GET",
//         params: clean({ branchId: args?.branchId }),
//       }),
//       transformResponse: (res: ApiResponse<CatalogCategory[]>) =>
//         Array.isArray(res?.data)
//           ? { ...res, data: res.data.map(tidyCategory) }
//           : res,
//     }),

//     // GET /catalog/services?category=&branchId=&tags=
//     getServices: builder.query<
//       ApiResponse<CatalogService[]>,
//       ServicesArgs | void
//     >({
//       query: (args) => ({
//         url: ENDPOINTS.CATALOG_SERVICES,
//         method: "GET",
//         params: clean({
//           category: args?.category,
//           branchId: args?.branchId,
//           tags: Array.isArray(args?.tags) ? args.tags.join(",") : args?.tags,
//         }),
//       }),
//       transformResponse: (res: ApiResponse<CatalogService[]>) =>
//         Array.isArray(res?.data)
//           ? { ...res, data: res.data.map(tidyService) }
//           : res,
//     }),

//     // GET /catalog/services/{slug}?branchId=
//     getServiceBySlug: builder.query<
//       ApiResponse<CatalogService>,
//       ServiceBySlugArgs
//     >({
//       query: ({ slug, branchId }) => ({
//         url: servicePath(slug),
//         method: "GET",
//         params: clean({ branchId }),
//       }),
//       transformResponse: (res: ApiResponse<CatalogService>) =>
//         res?.data ? { ...res, data: tidyService(res.data) } : res,
//     }),

//     // GET /catalog/settings/{key}  (home_carousel, express_delivery, …)
//     getCatalogSetting: builder.query<CatalogSetting, CatalogSettingKey>({
//       query: (key) => ({ url: catalogSettingPath(key), method: "GET" }),
//     }),

//     // GET /branches/serviceability?latitude=&longitude=
//     checkServiceability: builder.query<
//       ApiResponse<Serviceability>,
//       ServiceabilityArgs
//     >({
//       query: ({ latitude, longitude }) => ({
//         url: ENDPOINTS.BRANCH_SERVICEABILITY,
//         method: "GET",
//         params: { latitude, longitude },
//       }),
//     }),
//   }),
// });

// export const {
//   useGetCategoriesQuery,
//   useGetServicesQuery,
//   useGetServiceBySlugQuery,
//   useGetCatalogSettingQuery,
//   useCheckServiceabilityQuery,
//   useLazyCheckServiceabilityQuery,
// } = catalogApi;


import { apiSlice } from "./apiSlice";
import type { ApiResponse } from "./authApi";
import {
  ENDPOINTS,
  catalogSettingPath,
  servicePath,
} from "@/lib/constants";

/* ---------- types ---------- */

export interface PricingItem {
  id?: string;
  code?: string;
  slug?: string;
  name: string;
  price: number;
  basePrice?: number;
  currency?: string;
  /** e.g. "piece", "pair" */
  unitLabel?: string | null;
  pricingType?: string;
  description?: string | null;
  minQty?: number | null;
  maxQty?: number | null;
  [key: string]: unknown;
}

export interface CatalogService {
  id: string;
  code?: string;
  slug: string;
  name: string;
  shortDescription?: string | null;
  longDescription?: string | null;
  tags?: string[] | null;
  appImageUrl?: string | null;
  webImageUrl?: string | null;
  serviceMode?: string;
  durationEstimateMinutes?: number | null;
  arrivalSlaMinutes?: number | null;
  sortOrder?: number;
  category?: {
    id?: string;
    code?: string;
    slug: string;
    name: string;
    description?: string | null;
    [key: string]: unknown;
  };
  items?: PricingItem[];
  addOns?: PricingItem[];
  [key: string]: unknown;
}

export interface CatalogCategory {
  id: string;
  code?: string;
  slug: string;
  name: string;
  description?: string | null;
  sortOrder?: number;
  webImageUrl?: string | null;
  appImageUrl?: string | null;
  services?: CatalogService[];
  [key: string]: unknown;
}

/** Setting keys known so far — any other string key also works. */
export type CatalogSettingKey = "home_carousel" | "express_delivery" | (string & {});

// Settings come back as { success, data: { key, value } } (see Footer social_links)
export type CatalogSetting<T = unknown> = ApiResponse<{
  key?: string;
  value?: T;
  [key: string]: unknown;
}>;

export interface Serviceability {
  serviceable?: boolean;
  isServiceable?: boolean;
  branchId?: string;
  branch?: { id?: string; name?: string; [key: string]: unknown } | null;
  /** GET /branches/serviceability returns the branches in range, nearest first */
  nearbyBranches?: { id?: string; name?: string; [key: string]: unknown }[];
  [key: string]: unknown;
}

export interface CategoriesArgs {
  branchId?: string;
}
export interface ServicesArgs {
  category?: string;
  branchId?: string;
  /** Sent as ?tags=a,b */
  tags?: string[] | string;
}
export interface ServiceBySlugArgs {
  slug: string;
  branchId?: string;
}
export interface ServiceabilityArgs {
  latitude: number;
  longitude: number;
}

// Drop empty values so they don't end up as "?branchId=" in the URL
function clean(params: Record<string, string | number | undefined | null>) {
  const out: Record<string, string | number> = {};
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== "") out[k] = v;
  }
  return out;
}

/* ---------- helpers ---------- */

// The API has names like "Dry Cleaning               Men" → collapse spaces
const tidy = (v: string) => v.replace(/\s+/g, " ").trim();

const tidyItems = (list?: PricingItem[]) =>
  list?.map((i) => ({ ...i, name: tidy(i.name) }));

function tidyService(svc: CatalogService): CatalogService {
  return {
    ...svc,
    name: tidy(svc.name),
    items: tidyItems(svc.items),
    addOns: tidyItems(svc.addOns),
  };
}

function tidyCategory(cat: CatalogCategory): CatalogCategory {
  return {
    ...cat,
    name: tidy(cat.name),
    services: cat.services?.map(tidyService),
  };
}


/** First readable text from a setting value (string, or common text fields). */
export function settingText(res: CatalogSetting | undefined): string {
  const v = res?.data?.value as unknown;
  if (typeof v === "string") return v.trim();
  if (v && typeof v === "object") {
    const o = v as Record<string, unknown>;
    for (const k of ["message", "text", "description", "title", "label"]) {
      if (typeof o[k] === "string" && (o[k] as string).trim()) {
        return (o[k] as string).trim();
      }
    }
  }
  return "";
}

/** Normalises the serviceability response. */
export function readServiceability(res: ApiResponse<Serviceability> | undefined): {
  serviceable: boolean;
  branchId?: string;
  branchName?: string;
} {
  const d = (res?.data ?? res ?? {}) as Serviceability;
  // the real API answers with nearbyBranches[0] (same as the mobile app)
  const nearest = Array.isArray(d.nearbyBranches) ? d.nearbyBranches[0] : undefined;
  const branchId = d.branchId ?? d.branch?.id ?? nearest?.id ?? undefined;
  const flag = d.serviceable ?? d.isServiceable;
  return {
    serviceable: typeof flag === "boolean" ? flag : !!branchId,
    branchId,
    branchName:
      typeof d.branch?.name === "string"
        ? d.branch.name
        : typeof nearest?.name === "string"
          ? nearest.name
          : undefined,
  };
}

/* ---------- endpoints ---------- */

export const catalogApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET /catalog/categories?branchId=
    getCategories: builder.query<
      ApiResponse<CatalogCategory[]>,
      CategoriesArgs | void
    >({
      query: (args) => ({
        url: ENDPOINTS.CATALOG_CATEGORIES,
        method: "GET",
        params: clean({ branchId: args?.branchId }),
      }),
      transformResponse: (res: ApiResponse<CatalogCategory[]>) =>
        Array.isArray(res?.data)
          ? { ...res, data: res.data.map(tidyCategory) }
          : res,
    }),

    // GET /catalog/services?category=&branchId=&tags=
    getServices: builder.query<
      ApiResponse<CatalogService[]>,
      ServicesArgs | void
    >({
      query: (args) => ({
        url: ENDPOINTS.CATALOG_SERVICES,
        method: "GET",
        params: clean({
          category: args?.category,
          branchId: args?.branchId,
          tags: Array.isArray(args?.tags) ? args.tags.join(",") : args?.tags,
        }),
      }),
      transformResponse: (res: ApiResponse<CatalogService[]>) =>
        Array.isArray(res?.data)
          ? { ...res, data: res.data.map(tidyService) }
          : res,
    }),

    // GET /catalog/services/{slug}?branchId=
    getServiceBySlug: builder.query<
      ApiResponse<CatalogService>,
      ServiceBySlugArgs
    >({
      query: ({ slug, branchId }) => ({
        url: servicePath(slug),
        method: "GET",
        params: clean({ branchId }),
      }),
      transformResponse: (res: ApiResponse<CatalogService>) =>
        res?.data ? { ...res, data: tidyService(res.data) } : res,
    }),

    // GET /catalog/settings/{key}  (home_carousel, express_delivery, …)
    getCatalogSetting: builder.query<CatalogSetting, CatalogSettingKey>({
      query: (key) => ({ url: catalogSettingPath(key), method: "GET" }),
    }),

    // GET /branches/serviceability?latitude=&longitude=
    checkServiceability: builder.query<
      ApiResponse<Serviceability>,
      ServiceabilityArgs
    >({
      query: ({ latitude, longitude }) => ({
        url: ENDPOINTS.BRANCH_SERVICEABILITY,
        method: "GET",
        params: { latitude, longitude },
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetServicesQuery,
  useGetServiceBySlugQuery,
  useGetCatalogSettingQuery,
  useCheckServiceabilityQuery,
  useLazyCheckServiceabilityQuery,
} = catalogApi;