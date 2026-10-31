import { toast } from "sonner";
import { apiSlice } from "./apiSlice";
import type { ApiResponse } from "./authApi";
import {
  ENDPOINTS,
  orderPath,
  myOrderPath,
  myOrderCancelPath,
  orderPaymentPath,
  orderProofPath,
  orderReviewsPath,
  voucherPurchasePath,
} from "@/lib/constants";

/* ---------- types ---------- */

export type PaymentMethod = "COD" | "RAZORPAY" | "WALLET";
export type BookingType = "ASAP" | "SCHEDULED";
export type SlotCode = "MORNING" | "AFTERNOON" | "EVENING";
export type ProofType = "BEFORE" | "AFTER";

export interface OrderItemInput {
  itemId: string;
  quantity: number;
}
export interface OrderAddOnInput {
  addOnId: string;
  quantity: number;
}
export interface ContactOverride {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
}

/** Booking fields shared by POST /orders and the Razorpay initiate calls. */
export interface BookingBody {
  /** null for mixed laundry carts (items span several services) */
  serviceId?: string | null;
  items: OrderItemInput[];
  addOns?: OrderAddOnInput[];
  bookingType?: BookingType;
  /** YYYY-MM-DD */
  scheduledDate?: string;
  scheduledSlotCode?: SlotCode;
  addressId: string;
  branchId?: string | null;
  specialInstructions?: string;
  serviceDateTimeNotes?: string | null;
  contactOverride?: ContactOverride;
  couponCode?: string;
}

export interface CreateOrderBody extends BookingBody {
  paymentMethod?: PaymentMethod;
}
export type InitiateRazorpayBody = BookingBody; // paymentMethod is "RAZORPAY"
export type BulkBooking = BookingBody;

/** Every mutation that supports it accepts an optional idempotency key. */
export interface WithIdempotency {
  idempotencyKey?: string;
}

export type CreateOrderArgs = CreateOrderBody & WithIdempotency;
export type InitiateRazorpayArgs = InitiateRazorpayBody & WithIdempotency;
export interface InitiateBulkRazorpayArgs extends WithIdempotency {
  bookings: BulkBooking[];
}

export interface RazorpayConfirmArgs extends WithIdempotency {
  pendingOrderToken?: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

export interface BranchAvailabilityArgs {
  serviceId: string;
  addressId: string;
}

export interface CancelOrderArgs extends WithIdempotency {
  orderId: string;
}
export interface InitiatePaymentArgs extends WithIdempotency {
  orderId: string;
}
export interface VerifyPaymentArgs extends WithIdempotency {
  orderId: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}
export interface CodCollectArgs extends WithIdempotency {
  orderId: string;
  collectedAmount: number;
  note?: string;
}

export interface ProofUploadIntentArgs extends WithIdempotency {
  orderId: string;
  proofType: ProofType;
  /** defaults to image/jpeg */
  mimeType?: string;
}
export interface ProofUploadIntent {
  uploadUrl: string;
  storageKey: string;
  headers?: Record<string, string>;
  [key: string]: unknown;
}
export interface ProofConfirmArgs extends WithIdempotency {
  orderId: string;
  assignmentId?: string;
  proofType: ProofType;
  storageKey: string;
  mimeType: string;
  sizeBytes: number;
  etag?: string;
}

export interface ValidateCouponBody {
  code: string;
  cartTotal: number;
}

export interface PurchaseVoucherArgs {
  voucherId: string;
  /** Generated automatically when not supplied. */
  idempotencyKey?: string;
}
export interface ConfirmVoucherPurchaseBody {
  purchaseId: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

export interface CreateReviewArgs {
  orderId: string;
  /** 1 – 5 */
  rating: number;
  description?: string;
}

/* Response shapes (taken from the mobile app's types). */
export type OrderStatus =
  | "PENDING" | "CONFIRMED" | "IN_PROGRESS" | "PICKUP_FAILED"
  | "RECEIVED_AT_BRANCH" | "PROCESSING" | "READY_FOR_DELIVERY"
  | "OUT_FOR_DELIVERY" | "DELIVERY_FAILED" | "DELIVERED" | "COMPLETED"
  | "CANCELLED";
export type PaymentStatus =
  | "PENDING" | "PAID" | "FAILED" | "REFUNDED"
  | "COD_PENDING_COLLECTION" | "COD_COLLECTED";

export interface OrderItemAddOn {
  id: string;
  addOnId: string;
  name: string;
  quantity: string;
  unitPrice: string;
  lineTotal: string;
}
export interface OrderLine {
  id: string;
  serviceName: string;
  itemId: string;
  itemName: string;
  quantity: string;
  unitPrice: string;
  lineTotal: string;
  addOns?: OrderItemAddOn[];
}
export interface StaffInfo {
  id?: string;
  authUserId?: string;
  displayName: string;
  phoneNumber?: string | null;
  avatarUrl?: string | null;
  role?: string;
  vehicleType?: string | null;
  vehicleNumber?: string | null;
}
export interface ProofArtifact {
  id: string;
  type: ProofType | string;
  storageKey: string;
  assetUrl?: string | null;
}
export interface Order {
  id: string;
  orderNumber: string;
  serviceName?: string;
  serviceCategoryName?: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod?: PaymentMethod;
  bookingType?: BookingType;
  scheduledDate?: string | null;
  scheduledSlotCode?: SlotCode | null;
  scheduledSlot?: { label: string; startTime: string; endTime: string } | null;
  scheduleLabelKey?: "appointment_time" | "pickup_time";
  serviceAddressSnapshot?: {
    label?: string; line1: string; line2?: string | null;
    city: string; state?: string; postalCode: string;
  };
  specialInstructions?: string | null;
  subtotalAmount?: string;
  addOnTotalAmount?: string;
  discountAmount?: string;
  taxAmount?: string;
  expressFeeAmount?: string;
  codChargeAmount?: string;
  deliveryChargeAmount?: string;
  grandTotalAmount?: string;
  createdAt?: string;
  cancelledAt?: string | null;
  items?: OrderLine[];
  addOns?: OrderItemAddOn[];
  review?: unknown;
  serviceMode?: string;
  fulfillmentType?: string;
  serviceCategoryCode?: string;
  serviceSlug?: string;
  serviceCode?: string;
  promisedArrivalFrom?: string | null;
  promisedArrivalTo?: string | null;
  actualArrivalTime?: string | null;
  paymentSettledAt?: string | null;
  paymentAttempts?: {
    status: "PENDING" | "PAID" | "FAILED";
    providerPaymentId: string | null;
    verifiedAt: string | null;
  }[];
  assignedOperator?: StaffInfo | null;
  pickupRider?: StaffInfo | null;
  deliveryRider?: StaffInfo | null;
  pickupRiderAuthUserId?: string | null;
  proofArtifacts?: ProofArtifact[];
  [key: string]: unknown;
}
export interface LatestOrder {
  order?: Order | null;
  checkoutDraft?: Record<string, unknown> | null;
}
export interface Branch {
  id: string;
  code?: string;
  name?: string;
}
export interface Coupon {
  id: string;
  code: string;
  discountType: "FLAT" | "PERCENTAGE";
  discountValue: string;
  maxDiscountAmount: string | null;
  minOrderValue: string | null;
  isFirstOrderOnly?: boolean;
  validUntil?: string | null;
}
export interface CouponValidation {
  discountAmount: number;
  couponId: string;
}
export interface Wallet {
  balance?: number | string;
  balanceAmount?: number | string;
  availableBalance?: number | string;
  currency?: string;
  transactions?: WalletTransaction[];
  history?: WalletTransaction[];
  wallet?: Wallet;
  [key: string]: unknown;
}
export interface WalletTransaction {
  id: string;
  type?: string;
  amount?: number | string;
  description?: string | null;
  status?: string;
  createdAt?: string;
}
/** GET /orders/tax-settings (the app reads gstRate, falling back to taxRate) */
export interface TaxSettings {
  gstRate?: number | string;
  taxRate?: number | string;
}
/** GET /orders/delivery-settings?city= */
export interface DeliverySettings {
  cityName?: string;
  deliveryCharge: number | string;
  codEnabled: boolean;
  isActive: boolean;
  currency?: string;
}
/** GET /orders/branch-cod-settings?branchId= */
export interface BranchCodSettings {
  id?: string;
  branchId?: string;
  codEnabled: boolean;
  codCharge: number | string;
  isActive: boolean;
  currency?: string;
}
export interface BulkCodArgs extends WithIdempotency {
  bookings: BookingBody[];
}
export interface WalletVoucher {
  id: string;
  [key: string]: unknown;
}
export interface RazorpayCheckout {
  key: string;
  /** Razorpay order id → `order_id` in checkout options */
  orderId: string;
  /** in paise, as returned by the server */
  amount: number;
  currency: string;
  orderNumber: string;
}
/** POST /orders/razorpay/initiate (single) and /orders/bulk/razorpay/initiate */
export interface RazorpayInitiateData {
  orderId?: string;
  pendingOrderToken: string;
  provider?: "RAZORPAY";
  checkout: RazorpayCheckout;
}
/** POST /orders/{id}/payment/initiate (retry on an existing order) */
export interface OrderPaymentInitData {
  paymentAttemptId: string;
  provider: "RAZORPAY";
  checkout: RazorpayCheckout;
}
/** POST /orders/razorpay/confirm */
export interface RazorpayConfirmData {
  acknowledged?: boolean;
  order?: Order;
  orderId?: string;
  orderNumber?: string;
  paymentStatus?: string;
  message?: string;
}
/** POST /orders/bulk/razorpay/confirm */
export interface BulkConfirmData {
  acknowledged: boolean;
  groupId: string;
  groupNumber: string;
  paymentStatus: string;
  status: string;
  orders: Pick<Order, "id" | "orderNumber" | "status" | "paymentStatus">[];
}

/** Order id out of a confirm response (same fallback as the mobile app). */
export const confirmedOrderId = (
  d: RazorpayConfirmData | undefined,
  fallback?: string,
) => d?.order?.id || d?.orderId || fallback;

/* ---------- helpers ---------- */

const idemHeaders = (key?: string): Record<string, string> | undefined =>
  key ? { "idempotency-key": key } : undefined;

const newIdempotencyKey = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

/** Pulls the idempotency key out so it is not sent in the JSON body. */
function split<T extends WithIdempotency>(args: T) {
  const { idempotencyKey, ...body } = args;
  return { body: body as Omit<T, "idempotencyKey">, headers: idemHeaders(idempotencyKey) };
}

/* ---------- endpoints ---------- */

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ---------- Availability ----------
    // GET /orders/availability/branches?serviceId=&addressId=
    getAvailableBranches: builder.query<
      ApiResponse<Branch[]>,
      BranchAvailabilityArgs
    >({
      query: ({ serviceId, addressId }) => ({
        url: ENDPOINTS.ORDER_AVAILABILITY_BRANCHES,
        method: "GET",
        params: { serviceId, addressId },
      }),
    }),

    // ---------- Create / pay ----------
    // POST /orders
    createOrder: builder.mutation<ApiResponse<Order>, CreateOrderArgs>({
      query: (args) => {
        const { body, headers } = split(args);
        return { url: ENDPOINTS.ORDERS, method: "POST", body, headers };
      },
      invalidatesTags: ["Order", "Wallet", "Coupon"],
    }),

    // POST /orders/razorpay/initiate
    initiateRazorpayOrder: builder.mutation<
      ApiResponse<RazorpayInitiateData>,
      InitiateRazorpayArgs
    >({
      query: (args) => {
        const { body, headers } = split(args);
        return {
          url: ENDPOINTS.ORDER_RAZORPAY_INITIATE,
          method: "POST",
          body: { ...body, paymentMethod: "RAZORPAY" satisfies PaymentMethod },
          headers,
        };
      },
    }),

    // POST /orders/bulk/razorpay/initiate
    initiateBulkRazorpayOrder: builder.mutation<
      ApiResponse<Omit<RazorpayInitiateData, "orderId">>,
      InitiateBulkRazorpayArgs
    >({
      query: (args) => {
        const { body, headers } = split(args);
        return {
          url: ENDPOINTS.ORDER_BULK_RAZORPAY_INITIATE,
          method: "POST",
          body,
          headers,
        };
      },
    }),

    // POST /orders/razorpay/confirm
    confirmRazorpayOrder: builder.mutation<
      ApiResponse<RazorpayConfirmData>,
      RazorpayConfirmArgs
    >({
      query: (args) => {
        const { body, headers } = split(args);
        return {
          url: ENDPOINTS.ORDER_RAZORPAY_CONFIRM,
          method: "POST",
          body,
          headers,
        };
      },
      invalidatesTags: ["Order", "Wallet", "Coupon"],
    }),

    // POST /orders/bulk/razorpay/confirm
    confirmBulkRazorpayOrder: builder.mutation<
      ApiResponse<BulkConfirmData>,
      RazorpayConfirmArgs
    >({
      query: (args) => {
        const { body, headers } = split(args);
        return {
          url: ENDPOINTS.ORDER_BULK_RAZORPAY_CONFIRM,
          method: "POST",
          body,
          headers,
        };
      },
      invalidatesTags: ["Order", "Wallet", "Coupon"],
    }),

    // ---------- Read ----------
    // GET /orders/me
    getMyOrders: builder.query<ApiResponse<Order[]>, void>({
      query: () => ({ url: ENDPOINTS.MY_ORDERS, method: "GET" }),
      providesTags: (res) => [
        "Order",
        ...(res?.data ?? []).map((o) => ({ type: "Order" as const, id: o.id })),
      ],
    }),

    // GET /orders/me/latest  (latest order + checkout draft)
    getLatestOrder: builder.query<ApiResponse<LatestOrder>, void>({
      query: () => ({ url: ENDPOINTS.MY_LATEST_ORDER, method: "GET" }),
      providesTags: ["Order"],
    }),

    // GET /orders/me/{orderId}  — falls back to GET /orders/{orderId} like the app
    getOrderById: builder.query<ApiResponse<Order>, string>({
      async queryFn(orderId, _api, _extra, baseQuery) {
        // a miss here is expected (extraOptions.silent) - the fallback may succeed
        const primary = await baseQuery({
          url: myOrderPath(orderId),
          method: "GET",
        });
        if (!primary.error) return { data: primary.data as ApiResponse<Order> };

        const fallback = await baseQuery({
          url: orderPath(orderId),
          method: "GET",
        });
        if (fallback.error) {
          toast.error("Order not found.");
          return { error: fallback.error };
        }
        return { data: fallback.data as ApiResponse<Order> };
      },
      extraOptions: { silent: true },
      providesTags: (_r, _e, orderId) => [{ type: "Order", id: orderId }],
    }),

    // PATCH /orders/me/{orderId}/cancel
    cancelOrder: builder.mutation<ApiResponse, CancelOrderArgs>({
      query: ({ orderId, idempotencyKey }) => ({
        url: myOrderCancelPath(orderId),
        method: "PATCH",
        body: {},
        headers: idemHeaders(idempotencyKey),
      }),
      invalidatesTags: (_r, _e, { orderId }) => [
        "Order",
        { type: "Order", id: orderId },
        "Wallet",
      ],
    }),

    // ---------- Payment on an existing order ----------
    // POST /orders/{orderId}/payment/initiate
    initiateOrderPayment: builder.mutation<
      ApiResponse<OrderPaymentInitData>,
      InitiatePaymentArgs
    >({
      query: ({ orderId, idempotencyKey }) => ({
        url: orderPaymentPath(orderId, "initiate"),
        method: "POST",
        body: {},
        headers: idemHeaders(idempotencyKey),
      }),
    }),

    // POST /orders/{orderId}/payment/verify
    verifyOrderPayment: builder.mutation<ApiResponse, VerifyPaymentArgs>({
      query: ({ orderId, idempotencyKey, ...body }) => ({
        url: orderPaymentPath(orderId, "verify"),
        method: "POST",
        body,
        headers: idemHeaders(idempotencyKey),
      }),
      invalidatesTags: (_r, _e, { orderId }) => [
        "Order",
        { type: "Order", id: orderId },
      ],
    }),

    // POST /orders/{orderId}/payment/cod-collect
    // idempotency-key is required by the API → generated if not supplied
    collectCod: builder.mutation<ApiResponse, CodCollectArgs>({
      query: ({ orderId, idempotencyKey, ...body }) => ({
        url: orderPaymentPath(orderId, "cod-collect"),
        method: "POST",
        body,
        headers: idemHeaders(idempotencyKey ?? newIdempotencyKey()),
      }),
      invalidatesTags: (_r, _e, { orderId }) => [
        "Order",
        { type: "Order", id: orderId },
      ],
    }),

    // ---------- Proof (before / after photos) ----------
    // POST /orders/{orderId}/proof/upload-intent
    // Then: PUT raw bytes to data.uploadUrl (see uploadToSignedUrl below).
    createProofUploadIntent: builder.mutation<
      ApiResponse<ProofUploadIntent>,
      ProofUploadIntentArgs
    >({
      query: ({ orderId, idempotencyKey, proofType, mimeType }) => ({
        url: orderProofPath(orderId, "upload-intent"),
        method: "POST",
        body: { proofType, mimeType: mimeType ?? "image/jpeg" },
        headers: idemHeaders(idempotencyKey),
      }),
    }),

    // POST /orders/{orderId}/proof/confirm
    confirmProof: builder.mutation<ApiResponse, ProofConfirmArgs>({
      query: ({ orderId, idempotencyKey, ...body }) => ({
        url: orderProofPath(orderId, "confirm"),
        method: "POST",
        body,
        headers: idemHeaders(idempotencyKey),
      }),
      invalidatesTags: (_r, _e, { orderId }) => [
        { type: "Order", id: orderId },
        "Assignment",
      ],
    }),

    // ---------- Coupons ----------
    // GET /orders/coupons/available
    getAvailableCoupons: builder.query<ApiResponse<Coupon[]>, void>({
      query: () => ({ url: ENDPOINTS.COUPONS_AVAILABLE, method: "GET" }),
      providesTags: ["Coupon"],
    }),

    // POST /orders/coupons/validate
    validateCoupon: builder.mutation<ApiResponse<CouponValidation>, ValidateCouponBody>({
      query: (body) => ({
        url: ENDPOINTS.COUPONS_VALIDATE,
        method: "POST",
        body,
      }),
    }),

    // ---------- Charges & settings ----------
    // GET /orders/tax-settings
    getTaxSettings: builder.query<ApiResponse<TaxSettings>, void>({
      query: () => ({ url: ENDPOINTS.TAX_SETTINGS, method: "GET" }),
    }),

    // GET /orders/delivery-settings?city=
    getDeliverySettings: builder.query<ApiResponse<DeliverySettings>, string>({
      query: (city) => ({
        url: ENDPOINTS.DELIVERY_SETTINGS,
        method: "GET",
        params: { city },
      }),
    }),

    // GET /orders/branch-cod-settings?branchId=
    getBranchCodSettings: builder.query<ApiResponse<BranchCodSettings>, string>({
      query: (branchId) => ({
        url: ENDPOINTS.BRANCH_COD_SETTINGS,
        method: "GET",
        params: { branchId },
      }),
    }),

    // POST /orders/bulk/cod  (several bookings, cash on delivery)
    createBulkCodOrder: builder.mutation<ApiResponse<BulkConfirmData>, BulkCodArgs>({
      query: (args) => {
        const { body, headers } = split(args);
        return { url: ENDPOINTS.ORDER_BULK_COD, method: "POST", body, headers };
      },
      invalidatesTags: ["Order", "Coupon"],
    }),

    // ---------- Wallet ----------
    // GET /orders/wallet
    getWallet: builder.query<ApiResponse<Wallet>, void>({
      query: () => ({ url: ENDPOINTS.WALLET, method: "GET" }),
      providesTags: ["Wallet"],
    }),

    // GET /orders/wallet/vouchers
    getWalletVouchers: builder.query<ApiResponse<WalletVoucher[]>, void>({
      query: () => ({ url: ENDPOINTS.WALLET_VOUCHERS, method: "GET" }),
      providesTags: ["Wallet"],
    }),

    // POST /orders/wallet/vouchers/{voucherId}/purchase
    purchaseVoucher: builder.mutation<
      ApiResponse<{ purchaseId?: string; checkout?: RazorpayCheckout }>,
      PurchaseVoucherArgs
    >({
      query: ({ voucherId, idempotencyKey }) => ({
        url: voucherPurchasePath(voucherId),
        method: "POST",
        headers: idemHeaders(idempotencyKey ?? newIdempotencyKey()),
      }),
    }),

    // POST /orders/wallet/voucher-purchases/confirm
    confirmVoucherPurchase: builder.mutation<
      ApiResponse,
      ConfirmVoucherPurchaseBody
    >({
      query: (body) => ({
        url: ENDPOINTS.WALLET_VOUCHER_PURCHASE_CONFIRM,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Wallet"],
    }),

    // ---------- Reviews ----------
    // POST /orders/{orderId}/reviews  (rating 1–5, description optional)
    createReview: builder.mutation<ApiResponse, CreateReviewArgs>({
      query: ({ orderId, rating, description }) => ({
        url: orderReviewsPath(orderId),
        method: "POST",
        body: { rating, description: description ?? "" },
      }),
      invalidatesTags: (_r, _e, { orderId }) => [{ type: "Order", id: orderId }],
    }),
  }),
});

/**
 * PUT {uploadUrl} — signed storage URL, NOT an API route, so it must not go
 * through RTK Query's base query (that would add baseUrl + auth header).
 * Returns the ETag (if exposed) to pass to confirmProof.
 */
export async function uploadToSignedUrl(
  uploadUrl: string,
  file: Blob,
  mimeType: string = file.type || "image/jpeg",
  extraHeaders?: Record<string, string>,
): Promise<{ etag?: string }> {
  const res = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": mimeType, ...extraHeaders },
    body: file,
  });
  if (!res.ok) throw new Error(`Upload failed (${res.status})`);
  return { etag: res.headers.get("etag")?.replace(/"/g, "") ?? undefined };
}

export const {
  useGetAvailableBranchesQuery,
  useLazyGetAvailableBranchesQuery,
  useCreateOrderMutation,
  useGetTaxSettingsQuery,
  useGetDeliverySettingsQuery,
  useGetBranchCodSettingsQuery,
  useCreateBulkCodOrderMutation,
  useInitiateRazorpayOrderMutation,
  useInitiateBulkRazorpayOrderMutation,
  useConfirmRazorpayOrderMutation,
  useConfirmBulkRazorpayOrderMutation,
  useGetMyOrdersQuery,
  useGetLatestOrderQuery,
  useGetOrderByIdQuery,
  useCancelOrderMutation,
  useInitiateOrderPaymentMutation,
  useVerifyOrderPaymentMutation,
  useCollectCodMutation,
  useCreateProofUploadIntentMutation,
  useConfirmProofMutation,
  useGetAvailableCouponsQuery,
  useValidateCouponMutation,
  useGetWalletQuery,
  useGetWalletVouchersQuery,
  usePurchaseVoucherMutation,
  useConfirmVoucherPurchaseMutation,
  useCreateReviewMutation,
} = orderApi;