import type { Metadata } from "next";
import { canonicalPath } from "@/app/lib/site-config";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Wash & Wow — making life easier with reliable, convenient, and affordable laundry and home services designed around you.",
  alternates: { canonical: canonicalPath("/about") },
  openGraph: {
    url: canonicalPath("/about"),
    description:
      "Premium laundry, home cleaning, car care, and pest control — designed to give your time back.",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
