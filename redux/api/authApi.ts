import { apiSlice } from "./apiSlice";
import { ENDPOINTS } from "@/lib/constants";
import type { AuthUser } from "@/redux/slices/authSlice";

// Response shape is a guess ({ success, data, message }) — adjust to the backend.
export interface ApiResponse<T = unknown> {
  success?: boolean;
  message?: string;
  data?: T;
  user?: AuthUser;
  token?: string;
  accessToken?: string;
}

interface AuthData {
  token?: string;
  accessToken?: string;
  user?: AuthUser;
}

// Pulls token + user out of a login/register response.
// Adjust here if the backend uses different field names.
export const getAuthPayload = (res: ApiResponse<AuthData>) => {
  const d: AuthData = res.data ?? res;
  return {
    token: d.token ?? d.accessToken ?? null,
    user: d.user ?? res.user ?? null,
  };
};

/* ---------- request bodies ---------- */

export interface LoginBody {
  email: string;
  password: string;
}
export interface GoogleLoginBody {
  idToken: string;
}
export interface RegisterBody {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  otp: string;
  acceptedTerms: boolean;
}
export interface GoogleRegisterBody {
  idToken: string;
  phoneNumber: string;
  otp: string;
  acceptedTerms: boolean;
}
export interface PhoneLoginBody {
  phoneNumber: string;
  otp: string;
}
export interface PhoneRegisterBody {
  phoneNumber: string;
  otp: string;
  name: string;
  email?: string; // optional
  acceptedTerms: boolean;
}
export interface AddPhoneBody {
  phoneNumber: string;
  otp: string;
}
export interface ResetPasswordBody {
  phoneNumber: string;
  otp: string;
  newPassword: string;
}
export interface DeleteAccountBody {
  password?: string; // send whichever credential applies
  idToken?: string;
}
export interface CheckEmailBody {
  email: string;
}
export interface CheckPhoneBody {
  phoneNumber: string;
}

// OTP endpoints use `phone` (not `phoneNumber`)
export interface EmailBody {
  email: string;
}
export interface EmailOtpBody extends EmailBody {
  otp: string;
}
export interface PhoneBody {
  phone: string;
}
export interface PhoneOtpBody extends PhoneBody {
  otp: string;
}

/* ---------- endpoints ---------- */

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ---------- Public: availability checks ----------
    checkEmail: builder.mutation<ApiResponse, CheckEmailBody>({
      query: (body) => ({ url: ENDPOINTS.CHECK_EMAIL, method: "POST", body }),
    }),
    checkPhone: builder.mutation<ApiResponse, CheckPhoneBody>({
      query: (body) => ({ url: ENDPOINTS.CHECK_PHONE, method: "POST", body }),
    }),

    // ---------- Public: login ----------
    login: builder.mutation<ApiResponse<AuthData>, LoginBody>({
      query: (body) => ({ url: ENDPOINTS.LOGIN, method: "POST", body }),
      invalidatesTags: ["User"],
    }),
    googleLogin: builder.mutation<ApiResponse<AuthData>, GoogleLoginBody>({
      query: (body) => ({ url: ENDPOINTS.GOOGLE_LOGIN, method: "POST", body }),
      invalidatesTags: ["User"],
    }),
    phoneLogin: builder.mutation<ApiResponse<AuthData>, PhoneLoginBody>({
      query: (body) => ({ url: ENDPOINTS.PHONE_LOGIN, method: "POST", body }),
      invalidatesTags: ["User"],
    }),

    // ---------- Public: register ----------
    register: builder.mutation<ApiResponse<AuthData>, RegisterBody>({
      query: (body) => ({ url: ENDPOINTS.REGISTER, method: "POST", body }),
      invalidatesTags: ["User"],
    }),
    googleRegister: builder.mutation<ApiResponse<AuthData>, GoogleRegisterBody>(
      {
        query: (body) => ({
          url: ENDPOINTS.GOOGLE_REGISTER,
          method: "POST",
          body,
        }),
        invalidatesTags: ["User"],
      },
    ),
    phoneRegister: builder.mutation<ApiResponse<AuthData>, PhoneRegisterBody>({
      query: (body) => ({
        url: ENDPOINTS.PHONE_REGISTER,
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    // ---------- Public: OTP ----------
    sendEmailOtp: builder.mutation<ApiResponse, EmailBody>({
      query: (body) => ({
        url: ENDPOINTS.SEND_EMAIL_OTP,
        method: "POST",
        body,
      }),
    }),
    verifyEmailOtp: builder.mutation<ApiResponse, EmailOtpBody>({
      query: (body) => ({
        url: ENDPOINTS.VERIFY_EMAIL_OTP,
        method: "POST",
        body,
      }),
    }),
    sendPhoneOtp: builder.mutation<ApiResponse, PhoneBody>({
      query: (body) => ({
        url: ENDPOINTS.SEND_PHONE_OTP,
        method: "POST",
        body,
      }),
    }),
    verifyPhoneOtp: builder.mutation<ApiResponse, PhoneOtpBody>({
      query: (body) => ({
        url: ENDPOINTS.VERIFY_PHONE_OTP,
        method: "POST",
        body,
      }),
    }),

    // ---------- Public: password reset (phone OTP) ----------
    resetPassword: builder.mutation<ApiResponse, ResetPasswordBody>({
      query: (body) => ({
        url: ENDPOINTS.RESET_PASSWORD,
        method: "POST",
        body,
      }),
    }),

    // ---------- Authenticated ----------
    getCurrentUser: builder.query<ApiResponse<AuthUser>, void>({
      query: () => ({ url: ENDPOINTS.ME, method: "GET" }),
      providesTags: ["User"],
    }),
    addPhone: builder.mutation<ApiResponse, AddPhoneBody>({
      query: (body) => ({ url: ENDPOINTS.ADD_PHONE, method: "POST", body }),
      invalidatesTags: ["User", "Profile"],
    }),
    logout: builder.mutation<ApiResponse, void>({
      query: () => ({ url: ENDPOINTS.LOGOUT, method: "POST" }),
      invalidatesTags: ["User"],
    }),
    deleteAccount: builder.mutation<ApiResponse, DeleteAccountBody>({
      query: (body) => ({
        url: ENDPOINTS.DELETE_ACCOUNT,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useCheckEmailMutation,
  useCheckPhoneMutation,
  useLoginMutation,
  useGoogleLoginMutation,
  usePhoneLoginMutation,
  useRegisterMutation,
  useGoogleRegisterMutation,
  usePhoneRegisterMutation,
  useSendEmailOtpMutation,
  useVerifyEmailOtpMutation,
  useSendPhoneOtpMutation,
  useVerifyPhoneOtpMutation,
  useResetPasswordMutation,
  useGetCurrentUserQuery,
  useAddPhoneMutation,
  useLogoutMutation,
  useDeleteAccountMutation,
} = authApi;
