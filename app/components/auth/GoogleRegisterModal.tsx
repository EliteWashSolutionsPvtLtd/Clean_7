"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import Modal, { secondaryBtnClass } from "@/app/components/ui/modals/Modal";
import OtpInput from "@/app/components/auth/OtpInput";
import {
  PhoneField,
  ResendRow,
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
  useGoogleRegisterMutation,
  useSendPhoneOtpMutation,
} from "@/redux/api/authApi";
import { setCredentials } from "@/redux/slices/authSlice";
import { useAppDispatch } from "@/redux/hooks";

import { getPostLoginPath } from "@/lib/authRedirect";
/**
 * Finishes a Google sign-up: POST /auth/google-register needs a verified
 * phone number (OTP) and accepted terms on top of the Google idToken.
 */
export default function GoogleRegisterModal({
  idToken,
  onClose,
}: {
  idToken: string;
  onClose: () => void;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [step, setStep] = useState<1 | 2>(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [terms, setTerms] = useState(false);
  const [seconds, startCountdown] = useCountdown();
  const fullPhone = `+91${phone}`;

  const [sendPhoneOtp, { isLoading: sending }] = useSendPhoneOtpMutation();
  const [googleRegister, { isLoading: registering }] =
    useGoogleRegisterMutation();

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
    if (await sendOtp()) {
      setOtp("");
      setStep(2);
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (otp.length < 6) {
      toast.error("Enter the 6-digit OTP");
      return;
    }
    try {
      const res = await googleRegister({
        idToken,
        phoneNumber: fullPhone,
        otp,
        acceptedTerms: terms,
      }).unwrap();
      const auth = getAuthPayload(res);
      if (!auth.token) {
        toast.error("Sign up failed. Token not received.");
        return;
      }
      dispatch(setCredentials(auth));
      toast.success("Account created successfully");
      router.replace(getPostLoginPath());
    } catch {
      // error toast is shown globally in apiSlice
    }
  }

  return (
    <Modal
      open
      onClose={onClose}
      title={step === 1 ? "Add your phone number" : "Verify your phone"}
      size="sm"
      closeOnBackdrop={!registering}
    >
      {step === 1 ? (
        <form onSubmit={handleSend} className="space-y-5">
          <p className="text-[15px] text-[var(--ink-soft)]">
            You&apos;re new here. Add your phone number to finish creating your
            account with Google.
          </p>
          <div>
            <label htmlFor="gr-phone" className={labelClass}>
              Phone number
            </label>
            <PhoneField
              id="gr-phone"
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
            {sending ? "Sending..." : "Send verification code"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <span className={labelClass}>OTP sent to +91 {phone}</span>
            <OtpInput value={otp} onChange={setOtp} />
          </div>
          <ResendRow seconds={seconds} onResend={sendOtp} />

          <label className="flex items-start gap-3 text-[14px] text-[var(--ink-soft)]">
            <input
              type="checkbox"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
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

          <div className="flex flex-col-reverse gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setStep(1)}
              disabled={registering}
              className={secondaryBtnClass}
            >
              Back
            </button>
            <button
              type="submit"
              disabled={!terms || otp.length < 6 || registering}
              className={primaryBtnClass}
            >
              {registering ? "Creating..." : "Create account"}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
