// import {
//   createApi,
//   fetchBaseQuery,
//   type BaseQueryFn,
//   type FetchArgs,
//   type FetchBaseQueryError,
// } from "@reduxjs/toolkit/query/react";
// import { toast } from "sonner";

// import { BASE_URL, AUTH_ENDPOINTS, ENDPOINTS } from "@/lib/constants";
// import { loadAuth } from "@/lib/authStorage";
// import { logout, type AuthState } from "@/redux/slices/authSlice";

// const rawBaseQuery = fetchBaseQuery({
//   baseUrl: BASE_URL,
//   credentials: "include",
//   // Every request carries the token (state first, localStorage as fallback
//   // for requests fired before the session is hydrated)
//   prepareHeaders: (headers, { getState, endpoint }) => {
//     // Logout is sent without the auth header (same as the mobile app)
//     if (endpoint === "logout") return headers;
//     const token =
//       (getState() as { auth: AuthState }).auth.token ?? loadAuth()?.token;
//     if (token) headers.set("authorization", `Bearer ${token}`);
//     return headers;
//   },
// });

// const getUrl = (args: string | FetchArgs) =>
//   typeof args === "string" ? args : args.url;

// type ErrData = { message?: string; error?: string | { message?: string } };

// const getErrorMessage = (data: ErrData | undefined, fallback: string) => {
//   if (data?.message) return data.message;
//   if (typeof data?.error === "string") return data.error;
//   return data?.error?.message || fallback;
// };

// const isOnAuthPage = () =>
//   typeof window !== "undefined" &&
//   ["/login", "/signup"].includes(window.location.pathname);

// const baseQueryWithAuth: BaseQueryFn<
//   string | FetchArgs,
//   unknown,
//   FetchBaseQueryError
// > = async (args, api, extraOptions) => {
//   const result = await rawBaseQuery(args, api, extraOptions);

//   // Logout: the client clears its session regardless of the server response
//   if (getUrl(args) === ENDPOINTS.LOGOUT) return result;

//   const isAuthCall = AUTH_ENDPOINTS.includes(getUrl(args));
//   const data = result.error?.data as ErrData | undefined;

//   // Token expired / invalid on a normal API → logout and go to login
//   if (result.error?.status === 401 && !isAuthCall) {
//     api.dispatch(logout());
//     if (!isOnAuthPage()) {
//       toast.error("Session expired. Please login again.");
//       window.location.replace("/login");
//     }
//     return result;
//   }

//   // Wrong password / wrong OTP on auth calls
//   if (result.error?.status === 401 && isAuthCall) {
//     toast.error(getErrorMessage(data, "Invalid credentials. Please try again."));
//     return result;
//   }

//   // Any other error
//   if (result.error) {
//     toast.error(getErrorMessage(data, "Something went wrong. Please try again."));
//   }

//   return result;
// };

// export const apiSlice = createApi({
//   reducerPath: "api",
//   baseQuery: baseQueryWithAuth,
//   tagTypes: ["User", "Profile", "Address"],
//   endpoints: () => ({}),
// });

import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";

import { BASE_URL, AUTH_ENDPOINTS, ENDPOINTS } from "@/lib/constants";
import { loadAuth } from "@/lib/authStorage";
import { logout, type AuthState } from "@/redux/slices/authSlice";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
  // Every request carries the token (state first, localStorage as fallback
  // for requests fired before the session is hydrated)
  prepareHeaders: (headers, { getState, endpoint }) => {
    // Logout is sent without the auth header (same as the mobile app)
    if (endpoint === "logout") return headers;
    const token =
      (getState() as { auth: AuthState }).auth.token ?? loadAuth()?.token;
    if (token) headers.set("authorization", `Bearer ${token}`);
    return headers;
  },
});

const getUrl = (args: string | FetchArgs) =>
  typeof args === "string" ? args : args.url;

type ErrData = { message?: string; error?: string | { message?: string } };

const getErrorMessage = (data: ErrData | undefined, fallback: string) => {
  if (data?.message) return data.message;
  if (typeof data?.error === "string") return data.error;
  return data?.error?.message || fallback;
};

const isOnAuthPage = () =>
  typeof window !== "undefined" &&
  ["/login", "/signup"].includes(window.location.pathname);

const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  // Logout: the client clears its session regardless of the server response
  if (getUrl(args) === ENDPOINTS.LOGOUT) return result;

  const isAuthCall = AUTH_ENDPOINTS.includes(getUrl(args));
  const data = result.error?.data as ErrData | undefined;

  // Token expired / invalid on a normal API → logout and go to login
  if (result.error?.status === 401 && !isAuthCall) {
    api.dispatch(logout());
    if (!isOnAuthPage()) {
      toast.error("Session expired. Please login again.");
      window.location.replace("/login");
    }
    return result;
  }

  // Wrong password / wrong OTP on auth calls
  if (result.error?.status === 401 && isAuthCall) {
    toast.error(getErrorMessage(data, "Invalid credentials. Please try again."));
    return result;
  }

  // Any other error (callers can pass { silent: true } when they handle it)
  if (result.error && !(extraOptions as { silent?: boolean } | undefined)?.silent) {
    toast.error(getErrorMessage(data, "Something went wrong. Please try again."));
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
  tagTypes: [
    "User",
    "Profile",
    "Address",
    "Order",
    "Wallet",
    "Coupon",
    "Assignment",
    "Pickup",
    "DeliveryTrip",
  ],
  endpoints: () => ({}),
});