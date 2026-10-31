// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import { ArrowLeft } from "lucide-react";
// import { WixMadeForDisplayFont } from "@/app/fonts";
// import Stepper from "@/app/components/auth/Stepper";
// import OtpInput from "@/app/components/auth/OtpInput";
// import PasswordInput from "@/app/components/auth/PasswordInput";
// import GoogleButton from "@/app/components/auth/GoogleButton";
// import OrDivider from "@/app/components/auth/OrDivider";
// import {
//   inputClass,
//   labelClass,
//   linkClass,
//   primaryBtnClass,
// } from "@/app/components/auth/styles";
// import {
//   useSendEmailOtpMutation,
//   useVerifyEmailOtpMutation,
//   useSendPhoneOtpMutation,
//   useVerifyPhoneOtpMutation,
//   useRegisterMutation,
//   getAuthPayload,
// } from "@/redux/api/authApi";
// import { setCredentials } from "@/redux/slices/authSlice";
// import { useAppDispatch } from "@/redux/hooks";

// const STEPS = ["Email", "Email OTP", "Phone", "Phone OTP", "Details"];
// const RESEND_SECONDS = 30;

// function Heading({ title, subtitle }: { title: string; subtitle: React.ReactNode }) {
//   return (
//     <div className="mb-8 text-center">
//       <h1
//         className="text-[28px] font-semibold tracking-tight sm:text-[34px]"
//         style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
//       >
//         {title}
//       </h1>
//       <p className="mt-2 text-[16px] leading-relaxed text-[var(--ink-soft)]">
//         {subtitle}
//       </p>
//     </div>
//   );
// }

// function BackButton({ onClick, label }: { onClick: () => void; label: string }) {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className="mb-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
//     >
//       <ArrowLeft size={16} />
//       {label}
//     </button>
//   );
// }

// function ResendRow({ seconds, onResend }: { seconds: number; onResend: () => void }) {
//   return (
//     <p className="text-center text-[14px] text-[var(--ink-soft)]">
//       Didn&apos;t receive the code?{" "}
//       {seconds > 0 ? (
//         <span className="font-medium text-[var(--ink)]">
//           Resend in 0:{String(seconds).padStart(2, "0")}
//         </span>
//       ) : (
//         <button type="button" onClick={onResend} className={linkClass}>
//           Resend code
//         </button>
//       )}
//     </p>
//   );
// }

// export default function SignupFlow() {
//   const [step, setStep] = useState(1);
//   const [email, setEmail] = useState("");
//   const [emailOtp, setEmailOtp] = useState("");
//   const [phone, setPhone] = useState("");
//   const [phoneOtp, setPhoneOtp] = useState("");
//   const [seconds, setSeconds] = useState(0);
//   const fullPhone = `+91${phone}`; // E.164

//   const router = useRouter();
//   const dispatch = useAppDispatch();
//   const [sendEmailOtp, { isLoading: sendingEmail }] = useSendEmailOtpMutation();
//   const [verifyEmailOtp, { isLoading: verifyingEmail }] =
//     useVerifyEmailOtpMutation();
//   const [sendPhoneOtp, { isLoading: sendingPhone }] = useSendPhoneOtpMutation();
//   const [verifyPhoneOtp, { isLoading: verifyingPhone }] =
//     useVerifyPhoneOtpMutation();
//   const [register, { isLoading: registering }] = useRegisterMutation();

//   // Resend countdown (starts whenever an OTP step is entered)
//   useEffect(() => {
//     if (seconds <= 0) return;
//     const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
//     return () => clearTimeout(t);
//   }, [seconds]);

//   function goTo(n: number) {
//     setStep(n);
//     if (n === 2 || n === 4) setSeconds(RESEND_SECONDS);
//   }

//   // Error toasts come from apiSlice; we only move ahead when the call succeeds.
//   async function handleSendEmailOtp(e: React.FormEvent) {
//     e.preventDefault();
//     try {
//       await sendEmailOtp({ email: email.trim() }).unwrap();
//       toast.success("Verification code sent to your email");
//       goTo(2);
//     } catch {}
//   }

//   async function handleResendEmailOtp() {
//     try {
//       await sendEmailOtp({ email: email.trim() }).unwrap();
//       toast.success("Code sent again");
//       setSeconds(RESEND_SECONDS);
//     } catch {}
//   }

//   async function handleVerifyEmailOtp(e: React.FormEvent) {
//     e.preventDefault();
//     try {
//       await verifyEmailOtp({ email: email.trim(), otp: emailOtp }).unwrap();
//       goTo(3);
//     } catch {}
//   }

//   async function handleSendPhoneOtp(e: React.FormEvent) {
//     e.preventDefault();
//     try {
//       await sendPhoneOtp({ phone: fullPhone }).unwrap();
//       toast.success("Verification code sent to your phone");
//       goTo(4);
//     } catch {}
//   }

//   async function handleResendPhoneOtp() {
//     try {
//       await sendPhoneOtp({ phone: fullPhone }).unwrap();
//       toast.success("Code sent again");
//       setSeconds(RESEND_SECONDS);
//     } catch {}
//   }

//   async function handleVerifyPhoneOtp(e: React.FormEvent) {
//     e.preventDefault();
//     try {
//       await verifyPhoneOtp({ phone: fullPhone, otp: phoneOtp }).unwrap();
//       goTo(5);
//     } catch {}
//   }

//   async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     const form = new FormData(e.currentTarget);
//     const password = String(form.get("password"));
//     if (password !== String(form.get("confirm"))) {
//       toast.error("Passwords do not match");
//       return;
//     }
//     try {
//       const res = await register({
//         name: String(form.get("name")).trim(),
//         email: email.trim(),
//         password,
//         phoneNumber: fullPhone,
//         otp: phoneOtp,
//         acceptedTerms: form.get("terms") === "on",
//       }).unwrap();
//       toast.success("Account created successfully");
//       const auth = getAuthPayload(res);
//       if (auth.token) {
//         dispatch(setCredentials(auth)); // register auto-logs in
//         router.replace("/");
//       } else {
//         router.replace("/login");
//       }
//     } catch {}
//   }

//   return (
//     <>
//       <Stepper steps={STEPS} current={step} />

//       {/* STEP 1 — Email */}
//       {step === 1 && (
//         <>
//           <Heading
//             title="Create an account"
//             subtitle="We'll send a verification code to confirm your email address"
//           />
//           <form onSubmit={handleSendEmailOtp} className="space-y-5">
//             <div>
//               <label htmlFor="su-email" className={labelClass}>
//                 Email
//               </label>
//               <input
//                 id="su-email"
//                 type="email"
//                 required
//                 autoComplete="email"
//                 placeholder="you@example.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className={inputClass}
//               />
//             </div>
//             <button
//               type="submit"
//               disabled={sendingEmail}
//               className={primaryBtnClass}
//             >
//               {sendingEmail ? "Sending..." : "Send verification code"}
//             </button>
//           </form>

//           <OrDivider />
//           <GoogleButton />

//           <p className="mt-6 text-center text-[15px] text-[var(--ink-soft)]">
//             Already have an account?{" "}
//             <Link href="/login" className={linkClass}>
//               Login
//             </Link>
//           </p>
//         </>
//       )}

//       {/* STEP 2 — Email OTP */}
//       {step === 2 && (
//         <>
//           <BackButton onClick={() => goTo(1)} label="Change email" />
//           <Heading
//             title="Enter email OTP"
//             subtitle={
//               <>
//                 Enter the code sent to your email to verify. Enter the 6-digit
//                 OTP sent to{" "}
//                 <span className="break-all font-semibold text-[var(--ink)]">
//                   {email}
//                 </span>
//               </>
//             }
//           />
//           <form onSubmit={handleVerifyEmailOtp} className="space-y-6">
//             <OtpInput value={emailOtp} onChange={setEmailOtp} />
//             <button
//               type="submit"
//               disabled={emailOtp.length < 6 || verifyingEmail}
//               className={primaryBtnClass}
//             >
//               {verifyingEmail ? "Verifying..." : "Verify email"}
//             </button>
//             <ResendRow seconds={seconds} onResend={handleResendEmailOtp} />
//           </form>
//         </>
//       )}

//       {/* STEP 3 — Phone */}
//       {step === 3 && (
//         <>
//           <Heading
//             title="Add your phone number"
//             subtitle="We'll send a verification code to confirm your phone number"
//           />
//           <form onSubmit={handleSendPhoneOtp} className="space-y-5">
//             <div>
//               <label htmlFor="su-phone" className={labelClass}>
//                 Phone number
//               </label>
//               <div className="flex gap-2">
//                 <span className="flex items-center rounded-xl bg-[var(--ink)]/5 px-4 text-[16px] font-medium text-[var(--ink)]">
//                   +91
//                 </span>
//                 <input
//                   id="su-phone"
//                   type="tel"
//                   inputMode="numeric"
//                   required
//                   autoComplete="tel-national"
//                   placeholder="10-digit mobile number"
//                   value={phone}
//                   onChange={(e) =>
//                     setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
//                   }
//                   className={inputClass}
//                 />
//               </div>
//             </div>
//             <button
//               type="submit"
//               disabled={phone.length < 10 || sendingPhone}
//               className={primaryBtnClass}
//             >
//               {sendingPhone ? "Sending..." : "Send verification code"}
//             </button>
//           </form>
//         </>
//       )}

//       {/* STEP 4 — Phone OTP */}
//       {step === 4 && (
//         <>
//           <BackButton onClick={() => goTo(3)} label="Change number" />
//           <Heading
//             title="Enter phone OTP"
//             subtitle={
//               <>
//                 Enter the 6-digit OTP sent to{" "}
//                 <span className="font-semibold text-[var(--ink)]">
//                   +91 {phone}
//                 </span>
//               </>
//             }
//           />
//           <form onSubmit={handleVerifyPhoneOtp} className="space-y-6">
//             <OtpInput value={phoneOtp} onChange={setPhoneOtp} />
//             <button
//               type="submit"
//               disabled={phoneOtp.length < 6 || verifyingPhone}
//               className={primaryBtnClass}
//             >
//               {verifyingPhone ? "Verifying..." : "Verify phone"}
//             </button>
//             <ResendRow seconds={seconds} onResend={handleResendPhoneOtp} />
//           </form>
//         </>
//       )}

//       {/* STEP 5 — Details */}
//       {step === 5 && (
//         <>
//           <Heading
//             title="Almost there"
//             subtitle="Tell us a little about yourself to finish setting up your account"
//           />
//           <form onSubmit={handleRegister} className="space-y-5">
//             <div>
//               <label htmlFor="su-name" className={labelClass}>
//                 Full name
//               </label>
//               <input
//                 id="su-name"
//                 name="name"
//                 type="text"
//                 required
//                 autoComplete="name"
//                 placeholder="Your name"
//                 className={inputClass}
//               />
//             </div>
//             <div>
//               <label htmlFor="su-password" className={labelClass}>
//                 Password
//               </label>
//               <PasswordInput
//                 id="su-password"
//                 name="password"
//                 placeholder="Create a password"
//                 autoComplete="new-password"
//               />
//             </div>
//             <div>
//               <label htmlFor="su-confirm" className={labelClass}>
//                 Confirm password
//               </label>
//               <PasswordInput
//                 id="su-confirm"
//                 name="confirm"
//                 placeholder="Re-enter your password"
//                 autoComplete="new-password"
//               />
//             </div>
//             <label className="flex items-start gap-3 text-[14px] text-[var(--ink-soft)]">
//               <input
//                 type="checkbox"
//                 name="terms"
//                 required
//                 className="mt-1 h-4 w-4 accent-[var(--gold)]"
//               />
//               <span>
//                 I agree to the{" "}
//                 <Link href="/terms-and-conditions" className={linkClass}>
//                   Terms
//                 </Link>{" "}
//                 and{" "}
//                 <Link href="/privacy-policy" className={linkClass}>
//                   Privacy Policy
//                 </Link>
//               </span>
//             </label>
//             <button
//               type="submit"
//               disabled={registering}
//               className={primaryBtnClass}
//             >
//               {registering ? "Creating account..." : "Create account"}
//             </button>
//           </form>
//         </>
//       )}
//     </>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Stepper from "@/app/components/auth/Stepper";
import OtpInput from "@/app/components/auth/OtpInput";
import PasswordInput from "@/app/components/auth/PasswordInput";
import GoogleButton from "@/app/components/auth/GoogleButton";
import OrDivider from "@/app/components/auth/OrDivider";
import PhoneSignupFlow from "@/app/components/auth/PhoneSignupFlow";
import {
  BackButton,
  Heading,
  RESEND_SECONDS,
  ResendRow,
  isAlreadyRegistered,
} from "@/app/components/auth/AuthParts";
import {
  inputClass,
  labelClass,
  linkClass,
  primaryBtnClass,
} from "@/app/components/auth/styles";
import {
  useSendEmailOtpMutation,
  useVerifyEmailOtpMutation,
  useSendPhoneOtpMutation,
  useVerifyPhoneOtpMutation,
  useRegisterMutation,
  useCheckEmailMutation,
  useCheckPhoneMutation,
  getAuthPayload,
} from "@/redux/api/authApi";
import { setCredentials } from "@/redux/slices/authSlice";
import { useAppDispatch } from "@/redux/hooks";

const STEPS = ["Email", "Email OTP", "Phone", "Phone OTP", "Details"];

export default function SignupFlow() {
  const [usePhoneSignup, setUsePhoneSignup] = useState(false);
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [emailOtp, setEmailOtp] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneOtp, setPhoneOtp] = useState("");
  const [seconds, setSeconds] = useState(0);
  const fullPhone = `+91${phone}`; // E.164

  const router = useRouter();
  const dispatch = useAppDispatch();
  const [sendEmailOtp, { isLoading: sendingEmail }] = useSendEmailOtpMutation();
  const [verifyEmailOtp, { isLoading: verifyingEmail }] =
    useVerifyEmailOtpMutation();
  const [sendPhoneOtp, { isLoading: sendingPhone }] = useSendPhoneOtpMutation();
  const [verifyPhoneOtp, { isLoading: verifyingPhone }] =
    useVerifyPhoneOtpMutation();
  const [register, { isLoading: registering }] = useRegisterMutation();
  const [checkEmail, { isLoading: checkingEmail }] = useCheckEmailMutation();
  const [checkPhone, { isLoading: checkingPhone }] = useCheckPhoneMutation();

  // Resend countdown (starts whenever an OTP step is entered)
  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  function goTo(n: number) {
    setStep(n);
    if (n === 2 || n === 4) setSeconds(RESEND_SECONDS);
  }

  // Error toasts come from apiSlice; we only move ahead when the call succeeds.
  async function handleSendEmailOtp(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await checkEmail({ email: email.trim() }).unwrap();
      if (isAlreadyRegistered(res)) {
        toast.error("This email is already registered. Please login.");
        return;
      }
      await sendEmailOtp({ email: email.trim() }).unwrap();
      toast.success("Verification code sent to your email");
      goTo(2);
    } catch {}
  }

  async function handleResendEmailOtp() {
    try {
      await sendEmailOtp({ email: email.trim() }).unwrap();
      toast.success("Code sent again");
      setSeconds(RESEND_SECONDS);
    } catch {}
  }

  async function handleVerifyEmailOtp(e: React.FormEvent) {
    e.preventDefault();
    try {
      await verifyEmailOtp({ email: email.trim(), otp: emailOtp }).unwrap();
      goTo(3);
    } catch {}
  }

  async function handleSendPhoneOtp(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await checkPhone({ phoneNumber: fullPhone }).unwrap();
      if (isAlreadyRegistered(res)) {
        toast.error("This phone number is already registered. Please login.");
        return;
      }
      await sendPhoneOtp({ phone: fullPhone }).unwrap();
      toast.success("Verification code sent to your phone");
      goTo(4);
    } catch {}
  }

  async function handleResendPhoneOtp() {
    try {
      await sendPhoneOtp({ phone: fullPhone }).unwrap();
      toast.success("Code sent again");
      setSeconds(RESEND_SECONDS);
    } catch {}
  }

  async function handleVerifyPhoneOtp(e: React.FormEvent) {
    e.preventDefault();
    try {
      await verifyPhoneOtp({ phone: fullPhone, otp: phoneOtp }).unwrap();
      goTo(5);
    } catch {}
  }

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const password = String(form.get("password"));
    if (password !== String(form.get("confirm"))) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const res = await register({
        name: String(form.get("name")).trim(),
        email: email.trim(),
        password,
        phoneNumber: fullPhone,
        otp: phoneOtp,
        acceptedTerms: form.get("terms") === "on",
      }).unwrap();
      toast.success("Account created successfully");
      const auth = getAuthPayload(res);
      if (auth.token) {
        dispatch(setCredentials(auth)); // register auto-logs in
        router.replace("/");
      } else {
        router.replace("/login");
      }
    } catch {}
  }

  if (usePhoneSignup) {
    return (
      <>
        <PhoneSignupFlow />
        <button
          type="button"
          onClick={() => setUsePhoneSignup(false)}
          className={`mt-6 block w-full text-center text-[15px] ${linkClass}`}
        >
          Sign up with email instead
        </button>
      </>
    );
  }

  return (
    <>
      <Stepper steps={STEPS} current={step} />

      {/* STEP 1 — Email */}
      {step === 1 && (
        <>
          <Heading
            title="Create an account"
            subtitle="We'll send a verification code to confirm your email address"
          />
          <form onSubmit={handleSendEmailOtp} className="space-y-5">
            <div>
              <label htmlFor="su-email" className={labelClass}>
                Email
              </label>
              <input
                id="su-email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
              />
            </div>
            <button
              type="submit"
              disabled={sendingEmail || checkingEmail}
              className={primaryBtnClass}
            >
              {sendingEmail || checkingEmail ? "Sending..." : "Send verification code"}
            </button>
          </form>

          <OrDivider />
          <GoogleButton />

          <button
            type="button"
            onClick={() => setUsePhoneSignup(true)}
            className={`mt-4 block w-full text-center text-[15px] ${linkClass}`}
          >
            Sign up with phone number (OTP)
          </button>

          <p className="mt-6 text-center text-[15px] text-[var(--ink-soft)]">
            Already have an account?{" "}
            <Link href="/login" className={linkClass}>
              Login
            </Link>
          </p>
        </>
      )}

      {/* STEP 2 — Email OTP */}
      {step === 2 && (
        <>
          <BackButton onClick={() => goTo(1)} label="Change email" />
          <Heading
            title="Enter email OTP"
            subtitle={
              <>
                Enter the code sent to your email to verify. Enter the 6-digit
                OTP sent to{" "}
                <span className="break-all font-semibold text-[var(--ink)]">
                  {email}
                </span>
              </>
            }
          />
          <form onSubmit={handleVerifyEmailOtp} className="space-y-6">
            <OtpInput value={emailOtp} onChange={setEmailOtp} />
            <button
              type="submit"
              disabled={emailOtp.length < 6 || verifyingEmail}
              className={primaryBtnClass}
            >
              {verifyingEmail ? "Verifying..." : "Verify email"}
            </button>
            <ResendRow seconds={seconds} onResend={handleResendEmailOtp} />
          </form>
        </>
      )}

      {/* STEP 3 — Phone */}
      {step === 3 && (
        <>
          <Heading
            title="Add your phone number"
            subtitle="We'll send a verification code to confirm your phone number"
          />
          <form onSubmit={handleSendPhoneOtp} className="space-y-5">
            <div>
              <label htmlFor="su-phone" className={labelClass}>
                Phone number
              </label>
              <div className="flex gap-2">
                <span className="flex items-center rounded-xl bg-[var(--ink)]/5 px-4 text-[16px] font-medium text-[var(--ink)]">
                  +91
                </span>
                <input
                  id="su-phone"
                  type="tel"
                  inputMode="numeric"
                  required
                  autoComplete="tel-national"
                  placeholder="10-digit mobile number"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                  }
                  className={inputClass}
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={phone.length < 10 || sendingPhone || checkingPhone}
              className={primaryBtnClass}
            >
              {sendingPhone || checkingPhone ? "Sending..." : "Send verification code"}
            </button>
          </form>
        </>
      )}

      {/* STEP 4 — Phone OTP */}
      {step === 4 && (
        <>
          <BackButton onClick={() => goTo(3)} label="Change number" />
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
          <form onSubmit={handleVerifyPhoneOtp} className="space-y-6">
            <OtpInput value={phoneOtp} onChange={setPhoneOtp} />
            <button
              type="submit"
              disabled={phoneOtp.length < 6 || verifyingPhone}
              className={primaryBtnClass}
            >
              {verifyingPhone ? "Verifying..." : "Verify phone"}
            </button>
            <ResendRow seconds={seconds} onResend={handleResendPhoneOtp} />
          </form>
        </>
      )}

      {/* STEP 5 — Details */}
      {step === 5 && (
        <>
          <Heading
            title="Almost there"
            subtitle="Tell us a little about yourself to finish setting up your account"
          />
          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label htmlFor="su-name" className={labelClass}>
                Full name
              </label>
              <input
                id="su-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Your name"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="su-password" className={labelClass}>
                Password
              </label>
              <PasswordInput
                id="su-password"
                name="password"
                placeholder="Create a password"
                autoComplete="new-password"
              />
            </div>
            <div>
              <label htmlFor="su-confirm" className={labelClass}>
                Confirm password
              </label>
              <PasswordInput
                id="su-confirm"
                name="confirm"
                placeholder="Re-enter your password"
                autoComplete="new-password"
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