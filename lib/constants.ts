// // lib/constants.ts
// export const BASE_URL =
//   process.env.NEXT_PUBLIC_API_URL || "https://api.clean7.in";

// export const ENDPOINTS = {
//   // ---------- Auth (public) ----------
//   CHECK_EMAIL: "/auth/check-email",
//   CHECK_PHONE: "/auth/check-phone",
//   REGISTER: "/auth/register",
//   LOGIN: "/auth/login",
//   GOOGLE_LOGIN: "/auth/google",
//   GOOGLE_REGISTER: "/auth/google-register",
//   PHONE_LOGIN: "/auth/phone-login",
//   PHONE_REGISTER: "/auth/phone-register",
//   RESET_PASSWORD: "/auth/reset-password",

//   // ---------- Auth (authenticated) ----------
//   ADD_PHONE: "/auth/add-phone",
//   LOGOUT: "/auth/logout", // app sends this WITHOUT the auth header
//   ME: "/auth/me",
//   DELETE_ACCOUNT: "/auth/delete-account",

//   // ---------- OTP (public) ----------
//   SEND_PHONE_OTP: "/otp/send-otp",
//   VERIFY_PHONE_OTP: "/otp/verify-otp",
//   SEND_EMAIL_OTP: "/otp/email/send-otp",
//   VERIFY_EMAIL_OTP: "/otp/email/verify-otp",

//   // ---------- Profile & addresses (authenticated) ----------
//   PROFILE: "/profiles/me",
//   PROFILE_PREFERENCES: "/profiles/me/preferences",
//   AVATAR_UPLOAD_INTENT: "/profiles/me/avatar/upload-intent",
//   ADDRESSES: "/profiles/me/addresses",
// } as const;

// // /profiles/me/addresses/{addressId}
// export const addressPath = (addressId: string) =>
//   `${ENDPOINTS.ADDRESSES}/${addressId}`;

// // ----- Orders -----
export const orderPath = (orderId: string) => `${ENDPOINTS.ORDERS}/${orderId}`;
export const myOrderPath = (orderId: string) =>
  `${ENDPOINTS.MY_ORDERS}/${orderId}`;
export const myOrderCancelPath = (orderId: string) =>
  `${myOrderPath(orderId)}/cancel`;
export const orderPaymentPath = (
  orderId: string,
  action: "initiate" | "verify" | "cod-collect",
) => `${orderPath(orderId)}/payment/${action}`;
export const orderProofPath = (
  orderId: string,
  action: "upload-intent" | "confirm",
) => `${orderPath(orderId)}/proof/${action}`;
export const orderPickupPath = (orderId: string, action: "complete" | "fail") =>
  `${orderPath(orderId)}/pickup/${action}`;
export const orderReviewsPath = (orderId: string) =>
  `${orderPath(orderId)}/reviews`;
export const voucherPurchasePath = (voucherId: string) =>
  `${ENDPOINTS.WALLET_VOUCHERS}/${voucherId}/purchase`;

// ----- Operator & rider -----
export const assignmentPath = (assignmentId: string) =>
  `${ENDPOINTS.OPERATOR_ASSIGNMENTS}/${assignmentId}`;
export const deliveryTripPath = (tripId: string) =>
  `${ENDPOINTS.RIDER_DELIVERY_TRIPS}/${tripId}`;
export const deliveryStopPath = (
  tripId: string,
  stopId: string,
  action: "complete" | "fail",
) => `${deliveryTripPath(tripId)}/stops/${stopId}/${action}`;

// Requests to these must never trigger the "session expired" redirect
// // (a 401 here means "wrong credentials / bad OTP / wrong password",
// // not "token expired").
// export const AUTH_ENDPOINTS: string[] = [
//   ENDPOINTS.CHECK_EMAIL,
//   ENDPOINTS.CHECK_PHONE,
//   ENDPOINTS.REGISTER,
//   ENDPOINTS.LOGIN,
//   ENDPOINTS.GOOGLE_LOGIN,
//   ENDPOINTS.GOOGLE_REGISTER,
//   ENDPOINTS.PHONE_LOGIN,
//   ENDPOINTS.PHONE_REGISTER,
//   ENDPOINTS.RESET_PASSWORD,
//   ENDPOINTS.DELETE_ACCOUNT, // wrong password must not log the user out
//   ENDPOINTS.SEND_PHONE_OTP,
//   ENDPOINTS.VERIFY_PHONE_OTP,
//   ENDPOINTS.SEND_EMAIL_OTP,
//   ENDPOINTS.VERIFY_EMAIL_OTP,
// ];





// lib/constants.ts
export const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.clean7.in";

export const ENDPOINTS = {
  // ---------- Auth (public) ----------
  CHECK_EMAIL: "/auth/check-email",
  CHECK_PHONE: "/auth/check-phone",
  REGISTER: "/auth/register",
  LOGIN: "/auth/login",
  GOOGLE_LOGIN: "/auth/google",
  GOOGLE_REGISTER: "/auth/google-register",
  PHONE_LOGIN: "/auth/phone-login",
  PHONE_REGISTER: "/auth/phone-register",
  RESET_PASSWORD: "/auth/reset-password",

  // ---------- Auth (authenticated) ----------
  ADD_PHONE: "/auth/add-phone",
  LOGOUT: "/auth/logout", // app sends this WITHOUT the auth header
  ME: "/auth/me",
  DELETE_ACCOUNT: "/auth/delete-account",

  // ---------- OTP (public) ----------
  SEND_PHONE_OTP: "/otp/send-otp",
  VERIFY_PHONE_OTP: "/otp/verify-otp",
  SEND_EMAIL_OTP: "/otp/email/send-otp",
  VERIFY_EMAIL_OTP: "/otp/email/verify-otp",

  // ---------- Profile & addresses (authenticated) ----------
  PROFILE: "/profiles/me",
  PROFILE_PREFERENCES: "/profiles/me/preferences",
  AVATAR_UPLOAD_INTENT: "/profiles/me/avatar/upload-intent",
  ADDRESSES: "/profiles/me/addresses",

  // ---------- Catalog & serviceability (public) ----------
  CATALOG_CATEGORIES: "/catalog/categories",
  CATALOG_SERVICES: "/catalog/services",
  BRANCH_SERVICEABILITY: "/branches/serviceability",

  // ---------- Orders, booking & payment (authenticated) ----------
  ORDERS: "/orders",
  ORDER_AVAILABILITY_BRANCHES: "/orders/availability/branches",
  ORDER_RAZORPAY_INITIATE: "/orders/razorpay/initiate",
  ORDER_RAZORPAY_CONFIRM: "/orders/razorpay/confirm",
  ORDER_BULK_RAZORPAY_INITIATE: "/orders/bulk/razorpay/initiate",
  ORDER_BULK_RAZORPAY_CONFIRM: "/orders/bulk/razorpay/confirm",
  MY_ORDERS: "/orders/me",
  MY_LATEST_ORDER: "/orders/me/latest",
  COUPONS_AVAILABLE: "/orders/coupons/available",
  COUPONS_VALIDATE: "/orders/coupons/validate",
  WALLET: "/orders/wallet",
  WALLET_VOUCHERS: "/orders/wallet/vouchers",
  WALLET_VOUCHER_PURCHASE_CONFIRM: "/orders/wallet/voucher-purchases/confirm",
  ORDER_BULK_COD: "/orders/bulk/cod",
  TAX_SETTINGS: "/orders/tax-settings",
  DELIVERY_SETTINGS: "/orders/delivery-settings",
  BRANCH_COD_SETTINGS: "/orders/branch-cod-settings",

  // ---------- Operator & rider (authenticated) ----------
  OPERATOR_ASSIGNMENTS: "/operators/me/assignments",
  RIDER_PICKUPS: "/rider/pickups",
  RIDER_DELIVERY_TRIPS: "/rider/delivery-trips",
} as const;

// /catalog/services/{slug}
export const servicePath = (slug: string) =>
  `${ENDPOINTS.CATALOG_SERVICES}/${encodeURIComponent(slug)}`;

// /catalog/settings/{key}  (e.g. home_carousel, express_delivery)
export const catalogSettingPath = (key: string) =>
  `/catalog/settings/${encodeURIComponent(key)}`;

// /profiles/me/addresses/{addressId}
export const addressPath = (addressId: string) =>
  `${ENDPOINTS.ADDRESSES}/${addressId}`;

// Requests to these must never trigger the "session expired" redirect
// (a 401 here means "wrong credentials / bad OTP / wrong password",
// not "token expired").
export const AUTH_ENDPOINTS: string[] = [
  ENDPOINTS.CHECK_EMAIL,
  ENDPOINTS.CHECK_PHONE,
  ENDPOINTS.REGISTER,
  ENDPOINTS.LOGIN,
  ENDPOINTS.GOOGLE_LOGIN,
  ENDPOINTS.GOOGLE_REGISTER,
  ENDPOINTS.PHONE_LOGIN,
  ENDPOINTS.PHONE_REGISTER,
  ENDPOINTS.RESET_PASSWORD,
  ENDPOINTS.DELETE_ACCOUNT, // wrong password must not log the user out
  ENDPOINTS.SEND_PHONE_OTP,
  ENDPOINTS.VERIFY_PHONE_OTP,
  ENDPOINTS.SEND_EMAIL_OTP,
  ENDPOINTS.VERIFY_EMAIL_OTP,
];
