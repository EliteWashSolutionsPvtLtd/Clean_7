import type { Metadata } from "next";
import AuthShell from "@/app/components/auth/AuthShell";
import SignupFlow from "./SignupFlow";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Create your Clean7 account.",
};

export default function SignupPage() {
  return (
    <AuthShell>
      <SignupFlow />
    </AuthShell>
  );
}
