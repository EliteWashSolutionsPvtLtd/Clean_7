import { apiSlice } from "./apiSlice";
import type { ApiResponse } from "./authApi";
import type { WithIdempotency } from "./orderApi";
import {
  ENDPOINTS,
  assignmentPath,
  deliveryTripPath,
  deliveryStopPath,
  orderPickupPath,
} from "@/lib/constants";

/* ---------- types ---------- */

export type AssignmentStatus =
  | "OFFERED"
  | "ACCEPTED"
  | "DECLINED"
  | "EXPIRED"
  | "REASSIGNED"
  | "EN_ROUTE"
  | "ON_SITE"
  | "WORK_STARTED"
  | "PROOF_SUBMITTED"
  | "COMPLETED"
  | "CANCELLED";

export interface Assignment {
  id: string;
  status?: AssignmentStatus;
  [key: string]: unknown;
}

export interface UpdateAssignmentArgs {
  assignmentId: string;
  status: AssignmentStatus;
  note?: string;
}

export interface StatusFilterArgs {
  status?: string;
}

export interface Pickup {
  id?: string;
  orderId?: string;
  [key: string]: unknown;
}
export interface DeliveryTrip {
  id: string;
  [key: string]: unknown;
}

export interface CompletePickupArgs extends WithIdempotency {
  orderId: string;
  actualItemCount: number;
  note?: string;
}
export interface FailPickupArgs extends WithIdempotency {
  orderId: string;
  /** e.g. "CUSTOMER_UNAVAILABLE" */
  reason: string;
  note?: string;
}

export interface CompleteStopArgs extends WithIdempotency {
  tripId: string;
  stopId: string;
  collectedAmount?: number;
  codCollectedAmount?: number;
}
export interface FailStopArgs extends WithIdempotency {
  tripId: string;
  stopId: string;
  /** e.g. "CUSTOMER_UNAVAILABLE" */
  reason: string;
  note?: string;
}

/* ---------- helpers ---------- */

const idemHeaders = (key?: string): Record<string, string> | undefined =>
  key ? { "idempotency-key": key } : undefined;

// Drop empty values so they don't end up as "?status=" in the URL
const statusParams = (args?: StatusFilterArgs | void) => {
  const status = (args as StatusFilterArgs | undefined)?.status;
  return status ? { status } : undefined;
};

/* ---------- endpoints ---------- */

export const operatorApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ---------- Operator ----------
    // GET /operators/me/assignments
    getMyAssignments: builder.query<ApiResponse<Assignment[]>, void>({
      query: () => ({ url: ENDPOINTS.OPERATOR_ASSIGNMENTS, method: "GET" }),
      providesTags: ["Assignment"],
    }),

    // PATCH /operators/me/assignments/{assignmentId}
    updateAssignment: builder.mutation<
      ApiResponse<Assignment>,
      UpdateAssignmentArgs
    >({
      query: ({ assignmentId, status, note }) => ({
        url: assignmentPath(assignmentId),
        method: "PATCH",
        body: note ? { status, note } : { status },
      }),
      invalidatesTags: ["Assignment"],
    }),

    // ---------- Rider: pickups ----------
    // GET /rider/pickups?status=
    getRiderPickups: builder.query<
      ApiResponse<Pickup[]>,
      StatusFilterArgs | void
    >({
      query: (args) => ({
        url: ENDPOINTS.RIDER_PICKUPS,
        method: "GET",
        params: statusParams(args),
      }),
      providesTags: ["Pickup"],
    }),

    // POST /orders/{orderId}/pickup/complete
    completePickup: builder.mutation<ApiResponse, CompletePickupArgs>({
      query: ({ orderId, idempotencyKey, actualItemCount, note }) => ({
        url: orderPickupPath(orderId, "complete"),
        method: "POST",
        body: note ? { actualItemCount, note } : { actualItemCount },
        headers: idemHeaders(idempotencyKey),
      }),
      invalidatesTags: ["Pickup", "Order"],
    }),

    // POST /orders/{orderId}/pickup/fail
    failPickup: builder.mutation<ApiResponse, FailPickupArgs>({
      query: ({ orderId, idempotencyKey, reason, note }) => ({
        url: orderPickupPath(orderId, "fail"),
        method: "POST",
        body: note ? { reason, note } : { reason },
        headers: idemHeaders(idempotencyKey),
      }),
      invalidatesTags: ["Pickup", "Order"],
    }),

    // ---------- Rider: delivery trips ----------
    // GET /rider/delivery-trips?status=
    getDeliveryTrips: builder.query<
      ApiResponse<DeliveryTrip[]>,
      StatusFilterArgs | void
    >({
      query: (args) => ({
        url: ENDPOINTS.RIDER_DELIVERY_TRIPS,
        method: "GET",
        params: statusParams(args),
      }),
      providesTags: (res) => [
        "DeliveryTrip",
        ...(res?.data ?? []).map((t) => ({
          type: "DeliveryTrip" as const,
          id: t.id,
        })),
      ],
    }),

    // GET /rider/delivery-trips/{tripId}
    getDeliveryTripById: builder.query<ApiResponse<DeliveryTrip>, string>({
      query: (tripId) => ({ url: deliveryTripPath(tripId), method: "GET" }),
      providesTags: (_r, _e, tripId) => [{ type: "DeliveryTrip", id: tripId }],
    }),

    // POST /rider/delivery-trips/{tripId}/stops/{stopId}/complete
    completeDeliveryStop: builder.mutation<ApiResponse, CompleteStopArgs>({
      query: ({ tripId, stopId, idempotencyKey, ...body }) => ({
        url: deliveryStopPath(tripId, stopId, "complete"),
        method: "POST",
        body,
        headers: idemHeaders(idempotencyKey),
      }),
      invalidatesTags: (_r, _e, { tripId }) => [
        "DeliveryTrip",
        { type: "DeliveryTrip", id: tripId },
      ],
    }),

    // POST /rider/delivery-trips/{tripId}/stops/{stopId}/fail
    failDeliveryStop: builder.mutation<ApiResponse, FailStopArgs>({
      query: ({ tripId, stopId, idempotencyKey, reason, note }) => ({
        url: deliveryStopPath(tripId, stopId, "fail"),
        method: "POST",
        body: note ? { reason, note } : { reason },
        headers: idemHeaders(idempotencyKey),
      }),
      invalidatesTags: (_r, _e, { tripId }) => [
        "DeliveryTrip",
        { type: "DeliveryTrip", id: tripId },
      ],
    }),
  }),
});

export const {
  useGetMyAssignmentsQuery,
  useUpdateAssignmentMutation,
  useGetRiderPickupsQuery,
  useCompletePickupMutation,
  useFailPickupMutation,
  useGetDeliveryTripsQuery,
  useGetDeliveryTripByIdQuery,
  useCompleteDeliveryStopMutation,
  useFailDeliveryStopMutation,
} = operatorApi;
