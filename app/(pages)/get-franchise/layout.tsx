import type { Metadata } from "next";
import { canonicalPath } from "@/app/lib/site-config";

export const metadata: Metadata = {
  title: "Franchise Opportunities",
  description: "Join Wash & Wow as a franchise partner and build the future of home services in India. Tech-powered cleaning and laundry services.",
  alternates: { canonical: canonicalPath("/get-franchise") },
};

export default function FranchiseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
