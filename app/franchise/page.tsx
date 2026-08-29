import type { Metadata } from "next";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/sections/Footer";
import FranchiseClient from "./FranchiseClient";
import { canonicalPath } from "../lib/site-config";
import { getDynamicCategories } from "../lib/service-categories";

export const metadata: Metadata = {
  title:
    "Clean7 Franchise Opportunity | Build a Business Designed for Modern Convenience",
  description:
    "Join India's fastest-growing home services brand. Clean7 offers a multi-service franchise model with premium laundry, car wash, home cleaning, and pest control.",
  alternates: { canonical: canonicalPath("/franchise") },
  openGraph: {
    url: canonicalPath("/franchise"),
    title: "Own a Clean7 Franchise",
    description:
      "Start a profitable business with a brand designed for long-term expansion in the ₹30,000+ Cr home services industry.",
  },
};

export default async function FranchisePage() {
  const categories = await getDynamicCategories();
  
  return (
    <div className="bg-ground text-ink min-h-screen selection:bg-gold/30">
      <Navbar />
      <FranchiseClient categories={categories} />
      <Footer />
    </div>
  );
}
