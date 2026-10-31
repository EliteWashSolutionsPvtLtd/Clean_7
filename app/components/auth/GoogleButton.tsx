"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import GoogleRegisterModal from "@/app/components/auth/GoogleRegisterModal";
import { getAuthPayload, useGoogleLoginMutation } from "@/redux/api/authApi";
import { setCredentials } from "@/redux/slices/authSlice";
import { useAppDispatch } from "@/redux/hooks";

import { getPostLoginPath } from "@/lib/authRedirect";
/* ---------- Google Identity Services (minimal types) ---------- */

interface CredentialResponse {
  credential?: string;
}
interface GoogleId {
  initialize: (cfg: {
    client_id: string;
    callback: (res: CredentialResponse) => void;
  }) => void;
  renderButton: (el: HTMLElement, opts: Record<string, unknown>) => void;
}
declare global {
  interface Window {
    google?: { accounts: { id: GoogleId } };
  }
}

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const GSI_SRC = "https://accounts.google.com/gsi/client";

// /auth/google answers with this status when no account exists for the
// Google user yet → we then collect phone + OTP and call /auth/google-register
const NOT_REGISTERED_STATUS = 404;

function loadGsi(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.google?.accounts?.id) return resolve();
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${GSI_SRC}"]`,
    );
    const script = existing ?? document.createElement("script");
    script.addEventListener("load", () => resolve());
    script.addEventListener("error", () => reject(new Error("gsi")));
    if (!existing) {
      script.src = GSI_SRC;
      script.async = true;
      document.head.appendChild(script);
    }
  });
}

function FallbackButton() {
  return (
    <button
      type="button"
      onClick={() => toast.error("Google sign-in isn't available right now.")}
      className="flex w-full items-center justify-center gap-3 rounded-full border border-[var(--line)] bg-[var(--card)] px-8 py-3.5 text-[16px] font-semibold text-[var(--ink)] transition-colors hover:bg-[var(--ink)]/5"
    >
      Continue with Google
    </button>
  );
}

export default function GoogleButton() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [googleLogin] = useGoogleLoginMutation();
  const holderRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const [registerToken, setRegisterToken] = useState<string | null>(null);

  // Keep the latest handler without re-initialising Google.
  // The ref is updated in an effect (not during render).
  const onCredentialRef = useRef<(idToken: string) => void>(() => {});
  useEffect(() => {
    onCredentialRef.current = async (idToken: string) => {
      try {
        const res = await googleLogin({ idToken }).unwrap();
        const auth = getAuthPayload(res);
        if (!auth.token) {
          toast.error("Login failed. Token not received.");
          return;
        }
        dispatch(setCredentials(auth));
        toast.success("Logged in successfully");
        router.replace(getPostLoginPath());
      } catch (err) {
        // error toast is shown globally in apiSlice
        if ((err as { status?: number })?.status === NOT_REGISTERED_STATUS) {
          setRegisterToken(idToken);
        }
      }
    };
  }, [googleLogin, dispatch, router]);

  useEffect(() => {
    if (!CLIENT_ID) return;
    let cancelled = false;

    loadGsi()
      .then(() => {
        const el = holderRef.current;
        if (cancelled || !el || !window.google) return;
        window.google.accounts.id.initialize({
          client_id: CLIENT_ID,
          callback: (res) => {
            if (res.credential) onCredentialRef.current(res.credential);
          },
        });
        window.google.accounts.id.renderButton(el, {
          type: "standard",
          theme: "outline",
          size: "large",
          shape: "pill",
          text: "continue_with",
          logo_alignment: "center",
          width: Math.min(400, Math.max(200, el.offsetWidth)),
        });
      })
      .catch(() => !cancelled && setFailed(true));

    return () => {
      cancelled = true;
    };
  }, []);

  if (!CLIENT_ID || failed) return <FallbackButton />;

  return (
    <>
      <div
        ref={holderRef}
        className="flex min-h-[44px] w-full justify-center"
        aria-label="Continue with Google"
      />
      {registerToken && (
        <GoogleRegisterModal
          idToken={registerToken}
          onClose={() => setRegisterToken(null)}
        />
      )}
    </>
  );
}