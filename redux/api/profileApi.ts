import { apiSlice } from "./apiSlice";
import type { ApiResponse } from "./authApi";
import { ENDPOINTS, addressPath } from "@/lib/constants";

/* ---------- types ---------- */

export interface Profile {
  fullName?: string;
  phoneNumber?: string;
  avatarUrl?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  [key: string]: unknown;
}

// All fields optional
export type UpdateProfileBody = Pick<
  Profile,
  | "fullName"
  | "phoneNumber"
  | "avatarUrl"
  | "emergencyContactName"
  | "emergencyContactPhone"
>;

// All fields optional
export interface PreferencesBody {
  emailOptIn?: boolean;
  smsOptIn?: boolean;
  whatsappOptIn?: boolean;
}

export interface AvatarUploadIntentBody {
  mimeType: string; // e.g. "image/jpeg"
}

// Upload the image bytes with PUT to `uploadUrl` (+ `headers`),
// then save the resulting asset URL via PATCH /profiles/me.
export interface AvatarUploadIntent {
  uploadUrl: string;
  headers?: Record<string, string>;
  storageKey: string;
}

export interface Address {
  id?: string;
  label: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  latitude?: number;
  longitude?: number;
  isDefault?: boolean;
}

// Create: label, line1, city, state, postalCode, country are required
export type CreateAddressBody = Address;
// Update: same fields, all optional
export type UpdateAddressBody = Partial<Omit<Address, "id">>;

/* ---------- endpoints ---------- */

export const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ---------- Profile ----------
    getProfile: builder.query<ApiResponse<Profile>, void>({
      query: () => ({ url: ENDPOINTS.PROFILE, method: "GET" }),
      providesTags: ["Profile"],
    }),
    updateProfile: builder.mutation<ApiResponse<Profile>, UpdateProfileBody>({
      query: (body) => ({ url: ENDPOINTS.PROFILE, method: "PATCH", body }),
      invalidatesTags: ["Profile", "User"],
    }),
    updatePreferences: builder.mutation<ApiResponse, PreferencesBody>({
      query: (body) => ({
        url: ENDPOINTS.PROFILE_PREFERENCES,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Profile"],
    }),
    createAvatarUploadIntent: builder.mutation<
      ApiResponse<AvatarUploadIntent>,
      AvatarUploadIntentBody
    >({
      query: (body) => ({
        url: ENDPOINTS.AVATAR_UPLOAD_INTENT,
        method: "POST",
        body,
      }),
    }),

    // ---------- Addresses ----------
    getAddresses: builder.query<ApiResponse<Address[]>, void>({
      query: () => ({ url: ENDPOINTS.ADDRESSES, method: "GET" }),
      providesTags: ["Address"],
    }),
    addAddress: builder.mutation<ApiResponse<Address>, CreateAddressBody>({
      query: (body) => ({ url: ENDPOINTS.ADDRESSES, method: "POST", body }),
      invalidatesTags: ["Address"],
    }),
    updateAddress: builder.mutation<
      ApiResponse<Address>,
      { addressId: string; body: UpdateAddressBody }
    >({
      query: ({ addressId, body }) => ({
        url: addressPath(addressId),
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Address"],
    }),
    deleteAddress: builder.mutation<ApiResponse, string>({
      query: (addressId) => ({
        url: addressPath(addressId),
        method: "DELETE",
      }),
      invalidatesTags: ["Address"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUpdatePreferencesMutation,
  useCreateAvatarUploadIntentMutation,
  useGetAddressesQuery,
  useAddAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} = profileApi;
