import React from "react";
import type { Metadata } from "next";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/sections/Footer";
import Container from "@/app/components/layout/Container";
import { SatoshiFont } from "@/app/fonts";
import { canonicalPath } from "@/app/lib/site-config";
import SupportHero from "./components/SupportHero";
import ContactCards from "./components/ContactCards";
import ActiveOrderBanner from "./components/ActiveOrderBanner";
import SupportForm from "./components/SupportForm";
import SupportFaq from "./components/SupportFaq";
import ImportantLinks from "./components/ImportantLinks";

export const metadata: Metadata = {
  title: "Clean7 Support | Help & Customer Service",
  description:
    "Get help with Clean7 bookings, laundry, dry cleaning, home cleaning, household services, doorstep car wash, payments and more.",
  alternates: {
    canonical: canonicalPath("/support"),
  },
  openGraph: {
    title: "Clean7 Support | Help & Customer Service",
    description:
      "Get help with Clean7 bookings, laundry, dry cleaning, home cleaning, household services, doorstep car wash, payments and more.",
    url: canonicalPath("/support"),
    siteName: "Clean7",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clean7 Support | Help & Customer Service",
    description:
      "Get help with Clean7 bookings, laundry, dry cleaning, home cleaning, household services, doorstep car wash, payments and more.",
  },
};

export default function SupportPage() {
  return (
    <div
      className="bg-[var(--ground)] min-h-screen text-[var(--ink)] flex flex-col justify-between"
      style={{ fontFamily: SatoshiFont.style.fontFamily }}
    >
      <Navbar />

      <main className="flex-1 w-full overflow-hidden">
        {/* Hero Section */}
        <SupportHero />

        {/* 3 Contact Options: Call Us, Email Us, Business Address */}
        <ContactCards />

        {/* Active Order Help Section */}
        <ActiveOrderBanner />

        {/* Real Functional Support Form */}
        <SupportForm />

        {/* FAQ Section */}
        <SupportFaq />

        {/* Important Links: Privacy, Terms, Refund, Account Deletion */}
        <ImportantLinks />
      </main>

      <Footer />
    </div>
  );
}
