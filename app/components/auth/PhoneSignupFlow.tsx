"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import Stepper from "@/app/components/auth/Stepper";
import OtpInput from "@/app/components/auth/OtpInput";
import {
  BackButton,
  Heading,
  PhoneField,
  ResendRow,
  isAlreadyRegistered,
  useCountdown,
} from "@/app/components/auth/AuthParts";
import {
  inputClass,
  labelClass,
  linkClass,
  primaryBtnClass,
} from "@/app/components/auth/styles";
import {
  getAuthPayload,
  useCheckPhoneMutation,
  usePhoneRegisterMutation,
  useSendPhoneOtpMutation,
  useVerifyPhoneOtpMutation,
} from "@/redux/api/authApi";
import { setCredentials } from "@/redux/slices/authSlice";
import { useAppDispatch } from "@/redux/hooks";

const STEPS = ["Phone", "Phone OTP", "Details"];

/** Sign up with phone + OTP (POST /auth/phone-register). Email is optional. */
export default function PhoneSignupFlow() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [seconds, startCountdown] = useCountdown();
  const fullPhone = `+91${phone}`;

  const [checkPhone, { isLoading: checking }] = useCheckPhoneMutation();
  const [sendPhoneOtp, { isLoading: sending }] = useSendPhoneOtpMutation();
  const [verifyPhoneOtp, { isLoading: verifying }] =
    useVerifyPhoneOtpMutation();
  const [phoneRegister, { isLoading: registering }] =
    usePhoneRegisterMutation();

  async function sendOtp(): Promise<boolean> {
    try {
      await sendPhoneOtp({ phone: fullPhone }).unwrap();
      toast.success("Verification code sent to your phone");
      startCountdown();
      return true;
    } catch {
      return false;
    }
  }

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await checkPhone({ phoneNumber: fullPhone }).unwrap();
      if (isAlreadyRegistered(res)) {
        toast.error("This phone number is already registered. Please login.");
        return;
      }
    } catch {
      return;
    }
    if (await sendOtp()) {
      setOtp("");
      setStep(2);
    }
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    try {
      await verifyPhoneOtp({ phone: fullPhone, otp }).unwrap();
      setStep(3);
    } catch {}
  }

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    try {
      const res = await phoneRegister({
        phoneNumber: fullPhone,
        otp,
        name: String(form.get("name")).trim(),
        ...(email ? { email } : {}),
        acceptedTerms: form.get("terms") === "on",
      }).unwrap();
      toast.success("Account created successfully");
      const auth = getAuthPayload(res);
      if (auth.token) {
        dispatch(setCredentials(auth));
        router.replace("/");
      } else {
        router.replace("/login");
      }
    } catch {}
  }

  return (
    <>
      <Stepper steps={STEPS} current={step} />

      {step === 1 && (
        <>
          <Heading
            title="Sign up with phone"
            subtitle="We'll send a verification code to confirm your phone number"
          />
          <form onSubmit={handleSend} className="space-y-5">
            <div>
              <label htmlFor="ps-phone" className={labelClass}>
                Phone number
              </label>
              <PhoneField
                id="ps-phone"
                value={phone}
                onChange={setPhone}
                inputClass={inputClass}
              />
            </div>
            <button
              type="submit"
              disabled={phone.length < 10 || checking || sending}
              className={primaryBtnClass}
            >
              {checking || sending ? "Sending..." : "Send verification code"}
            </button>
          </form>
        </>
      )}

      {step === 2 && (
        <>
          <BackButton onClick={() => setStep(1)} label="Change number" />
          <Heading
            title="Enter phone OTP"
            subtitle={
              <>
                Enter the 6-digit OTP sent to{" "}
                <span className="font-semibold text-[var(--ink)]">
                  +91 {phone}
                </span>
              </>
            }
          />
          <form onSubmit={handleVerify} className="space-y-6">
            <OtpInput value={otp} onChange={setOtp} />
            <button
              type="submit"
              disabled={otp.length < 6 || verifying}
              className={primaryBtnClass}
            >
              {verifying ? "Verifying..." : "Verify phone"}
            </button>
            <ResendRow seconds={seconds} onResend={sendOtp} />
          </form>
        </>
      )}

      {step === 3 && (
        <>
          <Heading
            title="Almost there"
            subtitle="Tell us a little about yourself to finish setting up your account"
          />
          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label htmlFor="ps-name" className={labelClass}>
                Full name
              </label>
              <input
                id="ps-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Your name"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="ps-email" className={labelClass}>
                Email{" "}
                <span className="font-normal text-[var(--ink-soft)]">
                  (optional)
                </span>
              </label>
              <input
                id="ps-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className={inputClass}
              />
            </div>
            <label className="flex items-start gap-3 text-[14px] text-[var(--ink-soft)]">
              <input
                type="checkbox"
                name="terms"
                required
                className="mt-1 h-4 w-4 accent-[var(--gold)]"
              />
              <span>
                I agree to the{" "}
                <Link href="/terms-and-conditions" className={linkClass}>
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="/privacy-policy" className={linkClass}>
                  Privacy Policy
                </Link>
              </span>
            </label>
            <button
              type="submit"
              disabled={registering}
              className={primaryBtnClass}
            >
              {registering ? "Creating account..." : "Create account"}
            </button>
          </form>
        </>
      )}
    </>
  );
}
