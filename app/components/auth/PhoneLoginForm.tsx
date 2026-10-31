"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import OtpInput from "@/app/components/auth/OtpInput";
import {
  BackButton,
  PhoneField,
  ResendRow,
  useCountdown,
} from "@/app/components/auth/AuthParts";
import {
  inputClass,
  labelClass,
  primaryBtnClass,
} from "@/app/components/auth/styles";
import {
  getAuthPayload,
  usePhoneLoginMutation,
  useSendPhoneOtpMutation,
} from "@/redux/api/authApi";
import { setCredentials } from "@/redux/slices/authSlice";
import { useAppDispatch } from "@/redux/hooks";

import { getPostLoginPath } from "@/lib/authRedirect";
/** Login with phone number + OTP (POST /auth/phone-login). */
export default function PhoneLoginForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [step, setStep] = useState<1 | 2>(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [seconds, startCountdown] = useCountdown();
  const fullPhone = `+91${phone}`;

  const [sendPhoneOtp, { isLoading: sending }] = useSendPhoneOtpMutation();
  const [phoneLogin, { isLoading: loggingIn }] = usePhoneLoginMutation();

  async function sendOtp(): Promise<boolean> {
    try {
      await sendPhoneOtp({ phone: fullPhone }).unwrap();
      toast.success("OTP sent");
      startCountdown();
      return true;
    } catch {
      return false; // error toast is shown globally in apiSlice
    }
  }

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (await sendOtp()) {
      setOtp("");
      setStep(2);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await phoneLogin({ phoneNumber: fullPhone, otp }).unwrap();
      const auth = getAuthPayload(res);
      if (!auth.token) {
        toast.error("Login failed. Token not received.");
        return;
      }
      dispatch(setCredentials(auth));
      toast.success("Logged in successfully");
      router.replace(getPostLoginPath());
    } catch {
      // error toast is shown globally in apiSlice
    }
  }

  if (step === 1) {
    return (
      <form onSubmit={handleSend} className="space-y-5">
        <div>
          <label htmlFor="pl-phone" className={labelClass}>
            Phone number
          </label>
          <PhoneField
            id="pl-phone"
            value={phone}
            onChange={setPhone}
            inputClass={inputClass}
          />
        </div>
        <button
          type="submit"
          disabled={phone.length < 10 || sending}
          className={primaryBtnClass}
        >
          {sending ? "Sending..." : "Send OTP"}
        </button>
      </form>
    );
  }

  return (
    <>
      <BackButton onClick={() => setStep(1)} label="Change number" />
      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <span className={labelClass}>Enter the 6-digit OTP sent to +91 {phone}</span>
          <OtpInput value={otp} onChange={setOtp} />
        </div>
        <button
          type="submit"
          disabled={otp.length < 6 || loggingIn}
          className={primaryBtnClass}
        >
          {loggingIn ? "Logging in..." : "Login"}
        </button>
        <ResendRow seconds={seconds} onResend={sendOtp} />
      </form>
    </>
  );
}
