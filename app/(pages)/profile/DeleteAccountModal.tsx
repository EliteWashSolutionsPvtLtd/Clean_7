"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TriangleAlert } from "lucide-react";

import Modal, { secondaryBtnClass } from "@/app/components/ui/modals/Modal";
import PasswordInput from "@/app/components/auth/PasswordInput";
import { labelClass } from "@/app/components/auth/styles";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/slices/authSlice";
import { useDeleteAccountMutation } from "@/redux/api/authApi";

// Same styling as primaryBtnClass, but red. text-[#fff] is used because --white is not defined in globals.css, so text-white resolves to black.
const dangerBtnClass =
  "w-full rounded-full bg-red-400 px-8 py-3.5 text-[16px] font-semibold text-[#fff] shadow-lg shadow-red-400/30 transition-colors hover:bg-red-500 active:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50";

export default function DeleteAccountModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [deleteAccount, { isLoading }] = useDeleteAccountMutation();
  const [confirmed, setConfirmed] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const password = String(form.get("password") ?? "");

    try {
      await deleteAccount(password ? { password } : {}).unwrap();
      toast.success("Your account deletion request has been submitted");
      dispatch(logout());
      router.replace("/");
    } catch {
      // error toast is shown globally in apiSlice
    }
  }

  return (
    <Modal
      open
      onClose={onClose}
      title="Delete account"
      size="md"
      closeOnBackdrop={!isLoading}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex items-start gap-3 rounded-2xl border border-red-600/25 bg-red-600/10 p-4">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-600/15">
            <TriangleAlert size={18} className="text-red-600" />
          </span>
          <div className="text-[14px] leading-snug text-[var(--ink)]">
            <p className="font-semibold text-red-600">
              This action is permanent
            </p>
            <p className="mt-0.5 text-[var(--ink-soft)]">
              Once your request is confirmed, your account can&apos;t be
              recovered.
            </p>
          </div>
        </div>

        <div>
          <p className="mb-2.5 text-[15px] font-semibold text-[var(--ink)]">
            What will be deleted
          </p>
          <ul className="space-y-2 rounded-2xl bg-[var(--ink)]/5 p-4 text-[14px] leading-snug text-[var(--ink-soft)]">
            {[
              "Your profile information",
              "Saved addresses and preferences",
              "Booking history and account data",
              "Loyalty points and rewards",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[13px] leading-snug text-[var(--ink-soft)]">
            You&apos;ll be signed out on all devices. Some data may be kept for
            a limited time where required by law (tax records, fraud
            prevention).
          </p>
        </div>

        <div>
          <label htmlFor="da-password" className={labelClass}>
            Password <span className="font-normal text-[var(--ink-soft)]">(optional)</span>
          </label>
          <PasswordInput
            id="da-password"
            name="password"
            placeholder="Enter your password to verify"
            autoComplete="current-password"
          />
        </div>

        <label className="flex cursor-pointer items-start gap-3 text-[14px] leading-snug text-[var(--ink)]">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="mt-0.5 h-[18px] w-[18px] shrink-0 cursor-pointer accent-red-600"
          />
          <span>I understand my account will be permanently deleted.</span>
        </label>

        <div className="grid grid-cols-2 gap-3 border-t border-[var(--line)] pt-5">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className={secondaryBtnClass}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!confirmed || isLoading}
            className={dangerBtnClass}
          >
            {isLoading ? "Submitting..." : "Delete account"}
          </button>
        </div>
      </form>
    </Modal>
  );
}