"use client";

import { useState } from "react";
import { toast } from "sonner";

import Modal, { secondaryBtnClass } from "@/app/components/ui/modals/Modal";
import OtpInput from "@/app/components/auth/OtpInput";
import {
  PhoneField,
  ResendRow,
  isAlreadyRegistered,
  useCountdown,
} from "@/app/components/auth/AuthParts";
import {
  inputClass,
  labelClass,
  primaryBtnClass,
} from "@/app/components/auth/styles";
import {
  useAddPhoneMutation,
  useCheckPhoneMutation,
  useSendPhoneOtpMutation,
} from "@/redux/api/authApi";

/** Adds a verified phone number to the account (POST /auth/add-phone). */
export default function AddPhoneModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<1 | 2>(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [seconds, startCountdown] = useCountdown();
  const fullPhone = `+91${phone}`;

  const [checkPhone, { isLoading: checking }] = useCheckPhoneMutation();
  const [sendPhoneOtp, { isLoading: sending }] = useSendPhoneOtpMutation();
  const [addPhone, { isLoading: adding }] = useAddPhoneMutation();

  async function sendOtp(): Promise<boolean> {
    try {
      await sendPhoneOtp({ phone: fullPhone }).unwrap();
      toast.success("OTP sent");
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
        toast.error("This phone number is already used by another account.");
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

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    try {
      await addPhone({ phoneNumber: fullPhone, otp }).unwrap();
      toast.success("Phone number added");
      onClose(); // the "User" tag is invalidated → /auth/me refreshes
    } catch {
      // error toast is shown globally in apiSlice
    }
  }

  return (
    <Modal
      open
      onClose={onClose}
      title={step === 1 ? "Add phone number" : "Verify phone number"}
      size="sm"
      closeOnBackdrop={!adding}
    >
      {step === 1 ? (
        <form onSubmit={handleSend} className="space-y-5">
          <div>
            <label htmlFor="ap-phone" className={labelClass}>
              Phone number
            </label>
            <PhoneField
              id="ap-phone"
              value={phone}
              onChange={setPhone}
              inputClass={inputClass}
            />
            <p className="mt-2 text-[14px] text-[var(--ink-soft)]">
              We&apos;ll send a one-time code to confirm this number.
            </p>
          </div>
          <button
            type="submit"
            disabled={phone.length < 10 || checking || sending}
            className={primaryBtnClass}
          >
            {checking || sending ? "Sending..." : "Send OTP"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleAdd} className="space-y-5">
          <div>
            <span className={labelClass}>OTP sent to +91 {phone}</span>
            <OtpInput value={otp} onChange={setOtp} />
          </div>
          <ResendRow seconds={seconds} onResend={sendOtp} />
          <div className="flex flex-col-reverse gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setStep(1)}
              disabled={adding}
              className={secondaryBtnClass}
            >
              Back
            </button>
            <button
              type="submit"
              disabled={otp.length < 6 || adding}
              className={primaryBtnClass}
            >
              {adding ? "Adding..." : "Add number"}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
