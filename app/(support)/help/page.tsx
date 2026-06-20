import type { Metadata } from "next";
import { canonicalPath } from "@/app/lib/site-config";

export const metadata: Metadata = {
  title: "Help",
  description:
    "Help center for Clean7 (clean7): laundry, dry cleaning, orders, pickup and delivery, and the mobile app.",
  alternates: { canonical: canonicalPath("/help") },
  openGraph: {
    url: canonicalPath("/help"),
    description:
      "Get help with Clean7 laundry and dry cleaning services and the app.",
  },
};

export default function HelpPage() {
  return <div>page</div>;
}
