"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import Modal, { secondaryBtnClass } from "@/app/components/ui/modals/Modal";
import OtpInput from "@/app/components/auth/OtpInput";
import PasswordInput from "@/app/components/auth/PasswordInput";
import {
  inputClass,
  labelClass,
  linkClass,
  primaryBtnClass,
} from "@/app/components/auth/styles";
import { useAppSelector } from "@/redux/hooks";
import {
  useResetPasswordMutation,
  useSendPhoneOtpMutation,
} from "@/redux/api/authApi";
import { useGetProfileQuery } from "@/redux/api/profileApi";

const RESEND_SECONDS = 30;
const MIN_PASSWORD_LENGTH = 8;

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

// Normalise to E.164 (+91 for bare 10-digit Indian numbers)
function toE164(raw: string) {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  if (raw.trim().startsWith("+")) return `+${digits}`;
  if (digits.length === 10) return `+91${digits}`;
  return `+${digits}`;
}

export default function ChangePasswordModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const user = useAppSelector((s) => s.auth.user);
  const userPhone = toE164(str(user?.phone) || str(user?.phoneNumber));

  // Phone isn't in the login response → fall back to GET /profiles/me
  const { data: profileRes, isLoading: loadingProfile } = useGetProfileQuery(
    undefined,
    { skip: !!userPhone },
  );
  const profilePhone = toE164(str(profileRes?.data?.phoneNumber));

  const [step, setStep] = useState<1 | 2>(1);
  const [manualPhone, setManualPhone] = useState(""); // only if no phone on file
  const [otp, setOtp] = useState("");
  const [seconds, setSeconds] = useState(0);

  const [sendPhoneOtp, { isLoading: sending }] = useSendPhoneOtpMutation();
  const [resetPassword, { isLoading: changing }] = useResetPasswordMutation();

  const knownPhone = userPhone || profilePhone;
  const needsManual = !knownPhone && !loadingProfile;
  const phone =
    knownPhone || (manualPhone.length === 10 ? `+91${manualPhone}` : "");

  // Resend countdown
  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  async function sendOtp(): Promise<boolean> {
    if (!phone) {
      toast.error("Enter a valid 10-digit phone number");
      return false;
    }
    try {
      await sendPhoneOtp({ phone }).unwrap();
      toast.success("OTP sent");
      setSeconds(RESEND_SECONDS);
      return true;
    } catch {
      return false; // error toast is shown globally in apiSlice
    }
  }

  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    if (await sendOtp()) {
      setOtp("");
      setStep(2);
    }
  }

  async function handleChange(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const newPassword = String(form.get("newPassword"));
    const confirm = String(form.get("confirm"));

    if (otp.length < 6) {
      toast.error("Enter the 6-digit OTP");
      return;
    }
    if (newPassword.length < MIN_PASSWORD_LENGTH) {
      toast.error(`Password must be at least ${MIN_PASSWORD_LENGTH} characters`);
      return;
    }
    if (newPassword !== confirm) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await resetPassword({ phoneNumber: phone, otp, newPassword }).unwrap();
      toast.success("Password changed successfully");
      onClose();
    } catch {
      // error toast is shown globally in apiSlice
    }
  }

  return (
    <Modal
      open
      onClose={onClose}
      title={step === 1 ? "Verify identity" : "Set new password"}
      size="sm"
    >
      {step === 1 ? (
        <form onSubmit={handleSendOtp} className="space-y-5">
          <div>
            <span className={labelClass}>Phone number</span>

            {loadingProfile ? (
              <div
                aria-busy="true"
                aria-label="Loading phone number"
                className="h-[52px] rounded-xl bg-[var(--ink)]/10"
              />
            ) : needsManual ? (
              <div className="flex gap-2">
                <span className="flex items-center rounded-xl bg-[var(--ink)]/5 px-4 text-[16px] font-medium">
                  +91
                </span>
                <input
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  placeholder="10-digit mobile number"
                  aria-label="Phone number"
                  value={manualPhone}
                  onChange={(e) =>
                    setManualPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                  }
                  required
                  className={inputClass}
                />
              </div>
            ) : (
              <p className="rounded-xl bg-[var(--ink)]/5 px-4 py-3.5 text-[16px] font-medium">
                {knownPhone}
              </p>
            )}

            <p className="mt-2 text-[14px] text-[var(--ink-soft)]">
              We&apos;ll send a one-time code to this number to confirm it&apos;s
              you.
            </p>
          </div>

          <button
            type="submit"
            disabled={sending || loadingProfile}
            className={primaryBtnClass}
          >
            {sending ? "Sending..." : "Send OTP"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleChange} className="space-y-5">
          <div>
            <span className={labelClass}>OTP</span>
            <OtpInput value={otp} onChange={setOtp} />
            <p className="mt-3 text-[14px] text-[var(--ink-soft)]">
              Code sent to {phone}.{" "}
              {seconds > 0 ? (
                <span>Resend in 0:{String(seconds).padStart(2, "0")}</span>
              ) : (
                <button
                  type="button"
                  onClick={sendOtp}
                  disabled={sending}
                  className={linkClass}
                >
                  Resend OTP
                </button>
              )}
            </p>
          </div>

          <div>
            <label htmlFor="cp-new" className={labelClass}>
              New password
            </label>
            <PasswordInput
              id="cp-new"
              name="newPassword"
              placeholder="Enter new password"
              autoComplete="new-password"
            />
          </div>

          <div>
            <label htmlFor="cp-confirm" className={labelClass}>
              Confirm password
            </label>
            <PasswordInput
              id="cp-confirm"
              name="confirm"
              placeholder="Re-enter new password"
              autoComplete="new-password"
            />
          </div>

          <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row">
            <button
              type="button"
              onClick={() => setStep(1)}
              disabled={changing}
              className={secondaryBtnClass}
            >
              Back
            </button>
            <button
              type="submit"
              disabled={changing}
              className={primaryBtnClass}
            >
              {changing ? "Changing..." : "Change password"}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
