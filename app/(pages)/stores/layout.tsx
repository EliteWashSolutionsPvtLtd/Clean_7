import type { Metadata } from "next";
import { canonicalPath } from "@/app/lib/site-config";

export const metadata: Metadata = {
  title: "Clean7 Stores | Find a Store Near You",
  description:
    "Find the nearest Clean7 store for premium laundry, car wash, and home care services available at 28+ locations.",
  alternates: { canonical: canonicalPath("/stores") },
  openGraph: {
    url: canonicalPath("/stores"),
    title: "Clean7 Stores | Find a Store Near You",
    description:
      "Find the nearest Clean7 store for premium laundry, car wash, and home care services available at 28+ locations.",
  },
};

export default function StoresLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
