import type { Metadata } from "next";
import Navbar from "./components/layout/Navbar";
import HomeHashScroll from "./components/HomeHashScroll";
import OrganizationJsonLd from "./components/seo/OrganizationJsonLd";
import DownloadApp from "./components/sections/DownloadApp";
import Footer from "./components/sections/Footer";
import Hero from "./components/sections/Hero";
import HowItWorks from "./components/sections/HowItWorks";
import Reviews from "./components/sections/Reviews";
import WhyChooseUs from "./components/sections/WhyChooseUs";

import { canonicalPath } from "./lib/site-config";

export const metadata: Metadata = {
  description:
    "One stop for clean living — laundry, home cleaning, doorstep car wash, and pest control with Clean7. Book pickup, care, and delivery from one app.",
  alternates: { canonical: canonicalPath("/") },
  openGraph: {
    url: canonicalPath("/"),
    description:
      "Laundry, home cleaning, car care, and pest control — premium service at your doorstep.",
  },
};

export default function Home() {
  return (
    <div className={`overflow-clip`}>
      <OrganizationJsonLd />
      <Navbar />
      <HomeHashScroll />

      <div>
        <Hero />
        <HowItWorks />
        <WhyChooseUs />

        <Reviews />
        <DownloadApp />
        <Footer />
      </div>
    </div>
  );
}
