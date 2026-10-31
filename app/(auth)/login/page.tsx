import type { Metadata } from "next";
import AuthShell from "@/app/components/auth/AuthShell";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Login",
  description: "Log in to your Clean7 account.",
};

export default function LoginPage() {
  return (
    <AuthShell>
      <LoginForm />
    </AuthShell>
  );
}
