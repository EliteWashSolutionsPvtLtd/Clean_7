import PricingClient from "./PricingClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | Clean7",
  description:
    "Transparent and affordable pricing for our premium laundry, car wash, and home cleaning services.",
};

export const dynamic = "force-dynamic";

async function fetchServices() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.clean7.in";
  try {
    const res = await fetch(`${API_URL}/catalog/services`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch services:", res.status);
      return [];
    }

    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error("Error fetching catalog services:", err);
    return [];
  }
}

export default async function PricingPage() {
  const services = await fetchServices();

  return <PricingClient services={services} />;
}
