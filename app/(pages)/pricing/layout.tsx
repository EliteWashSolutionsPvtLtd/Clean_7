import type { Metadata } from "next";
import { canonicalPath } from "@/app/lib/site-config";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Wash and Wow pricing: transparent laundry, dry cleaning, and garment care. Per kg laundry, dry cleaning per item, monthly subscriptions, and free pickup & delivery.",
  keywords: [
    "laundry pricing",
    "dry cleaning prices",
    "laundry service cost",
    "wash and fold price",
    "laundry subscription",
    "affordable laundry",
    "laundry near me",
    "Wash and Wow price",
    "washandwow pricing",
  ],
  alternates: { canonical: canonicalPath("/pricing") },
  openGraph: {
    url: canonicalPath("/pricing"),
    title: "Pricing | Wash and Wow",
    description:
      "Transparent pricing for laundry, dry cleaning, and garment care. Per kg from ₹59, subscriptions, free pickup & delivery.",
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
