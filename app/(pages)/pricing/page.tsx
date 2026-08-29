import PricingClient from "./PricingClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | Clean7",
  description:
    "Transparent and affordable pricing for our premium laundry, car wash, and home cleaning services.",
};

export const dynamic = "force-dynamic";

async function fetchCategories() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.clean7.in";
  try {
    const res = await fetch(`${API_URL}/catalog/categories`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch categories:", res.status);
      return [];
    }

    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error("Error fetching catalog categories:", err);
    return [];
  }
}

export default async function PricingPage() {
  const categories = await fetchCategories();

  return <PricingClient initialCategories={categories} />;
}

