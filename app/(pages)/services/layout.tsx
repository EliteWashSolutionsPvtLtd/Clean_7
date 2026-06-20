import type { Metadata } from "next";
import { canonicalPath } from "@/app/lib/site-config";

export const metadata: Metadata = {
  title: "Services",
  description: "Laundry, home cleaning, doorstep car wash, and pest control — explore Wash & Wow services and book from the app.",
  alternates: { canonical: canonicalPath("/services") },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
