// "use client";

// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import { WixMadeForDisplayFont } from "@/app/fonts";
// import PasswordInput from "@/app/components/auth/PasswordInput";
// import GoogleButton from "@/app/components/auth/GoogleButton";
// import OrDivider from "@/app/components/auth/OrDivider";
// import {
//   inputClass,
//   labelClass,
//   linkClass,
//   primaryBtnClass,
// } from "@/app/components/auth/styles";
// import { useLoginMutation, getAuthPayload } from "@/redux/api/authApi";
// import { setCredentials } from "@/redux/slices/authSlice";
// import { useAppDispatch } from "@/redux/hooks";

// export default function LoginForm() {
//   const router = useRouter();
//   const dispatch = useAppDispatch();
//   const [login, { isLoading }] = useLoginMutation();

//   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     const form = new FormData(e.currentTarget);
//     try {
//       const res = await login({
//         email: String(form.get("email")).trim(),
//         password: String(form.get("password")),
//       }).unwrap();
//       const auth = getAuthPayload(res);
//       if (!auth.token) {
//         toast.error("Login failed. Token not received.");
//         return;
//       }
//       dispatch(setCredentials(auth));
//       toast.success("Logged in successfully");
//       router.replace("/");
//     } catch {
//       // error toast is shown globally in apiSlice
//     }
//   }

//   return (
//     <>
//       <div className="mb-8 text-center">
//         <h1
//           className="text-[30px] font-semibold tracking-tight sm:text-[36px]"
//           style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
//         >
//           Welcome back
//         </h1>
//         <p className="mt-2 text-[16px] text-[var(--ink-soft)]">
//           Login to continue to your account
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-5">
//         <div>
//           <label htmlFor="login-email" className={labelClass}>
//             Email
//           </label>
//           <input
//             id="login-email"
//             name="email"
//             type="email"
//             required
//             autoComplete="email"
//             placeholder="you@example.com"
//             className={inputClass}
//           />
//         </div>

//         <div>
//           <label htmlFor="login-password" className={labelClass}>
//             Password
//           </label>
//           <PasswordInput id="login-password" name="password" />
//           <div className="mt-2 text-right">
//             <button type="button" className={`text-[14px] ${linkClass}`}>
//               Forgot password?
//             </button>
//           </div>
//         </div>

//         <button
//           type="submit"
//           disabled={isLoading}
//           className={primaryBtnClass}
//         >
//           {isLoading ? "Logging in..." : "Login"}
//         </button>
//       </form>

//       <OrDivider />

//       <GoogleButton />

//       <p className="mt-6 text-center text-[15px] text-[var(--ink-soft)]">
//         Don&apos;t have an account?{" "}
//         <Link href="/signup" className={linkClass}>
//           Sign up
//         </Link>
//       </p>
//     </>
//   );
// }


"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { WixMadeForDisplayFont } from "@/app/fonts";
import PasswordInput from "@/app/components/auth/PasswordInput";
import GoogleButton from "@/app/components/auth/GoogleButton";
import OrDivider from "@/app/components/auth/OrDivider";
import PhoneLoginForm from "@/app/components/auth/PhoneLoginForm";
import {
  inputClass,
  labelClass,
  linkClass,
  primaryBtnClass,
} from "@/app/components/auth/styles";
import { useLoginMutation, getAuthPayload } from "@/redux/api/authApi";
import { setCredentials } from "@/redux/slices/authSlice";
import { useAppDispatch } from "@/redux/hooks";

import { getPostLoginPath } from "@/lib/authRedirect";
export default function LoginForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [usePhone, setUsePhone] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    try {
      const res = await login({
        email: String(form.get("email")).trim(),
        password: String(form.get("password")),
      }).unwrap();
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

  return (
    <>
      <div className="mb-8 text-center">
        <h1
          className="text-[30px] font-semibold tracking-tight sm:text-[36px]"
          style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
        >
          Welcome back
        </h1>
        <p className="mt-2 text-[16px] text-[var(--ink-soft)]">
          Login to continue to your account
        </p>
      </div>

      {usePhone ? (
        <PhoneLoginForm />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="login-email" className={labelClass}>
              Email
            </label>
            <input
              id="login-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="login-password" className={labelClass}>
              Password
            </label>
            <PasswordInput id="login-password" name="password" />
            <div className="mt-2 text-right">
              <button type="button" className={`text-[14px] ${linkClass}`}>
                Forgot password?
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={primaryBtnClass}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      )}

      <button
        type="button"
        onClick={() => setUsePhone((v) => !v)}
        className={`mt-4 block w-full text-center text-[15px] ${linkClass}`}
      >
        {usePhone ? "Login with email and password" : "Login with phone number (OTP)"}
      </button>

      <OrDivider />

      <GoogleButton />

      <p className="mt-6 text-center text-[15px] text-[var(--ink-soft)]">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className={linkClass}>
          Sign up
        </Link>
      </p>
    </>
  );
}