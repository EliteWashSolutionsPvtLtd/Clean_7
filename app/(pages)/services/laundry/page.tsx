import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/sections/Footer";
import Container from "@/app/components/layout/Container";
import { WixMadeForDisplayFont, SatoshiFont } from "@/app/fonts";
import type { Metadata } from "next";
import { canonicalPath } from "@/app/lib/site-config";
import {
  ShieldCheck,
  Droplet,
  Clock,
  Percent,
  WashingMachine,
  Shirt,
  Crown,
  Sparkles,
  Footprints,
  Baby,
  Bed,
  Heart,
  Plus,
  Home,
  LayoutTemplate,
  Package,
  Truck,
  Zap,
  ShoppingBasket,
  ChevronRight,
  ArrowRight,
  Leaf
} from "lucide-react";

export const metadata: Metadata = {
  title: "Laundry Services",
  description: "Complete laundry care for every need.",
  alternates: { canonical: canonicalPath("/services/laundry") },
};

const serviceCards = [
  {
    id: "wash-fold",
    title: "Wash & Fold",
    description: "Everyday clothes washed, dried & neatly folded",
    price: "₹99",
    unit: "/ kg Onwards",
    icon: <ShoppingBasket className="w-7 h-7 text-[#F26B21]" strokeWidth={1.5} />,
    iconBg: "bg-[#FFF6F0]",
  },
  {
    id: "ironing",
    title: "Ironing",
    description: "Perfectly ironed clothes ready to wear",
    price: "₹20",
    unit: "/ piece",
    icon: <Zap className="w-7 h-7 text-[#4CAF50]" strokeWidth={1.5} />,
    iconBg: "bg-[#F0FDF4]",
  },
  {
    id: "dry-cleaning",
    title: "Dry Cleaning",
    description: "Gentle care for delicate & formal wear",
    price: "₹150",
    unit: "/ piece",
    icon: <Shirt className="w-7 h-7 text-[#3B82F6]" strokeWidth={1.5} />,
    iconBg: "bg-[#EFF6FF]",
  },
  {
    id: "premium",
    title: "Premium Laundry",
    description: "Deep cleaning for luxury & special fabrics",
    price: "₹199",
    unit: "/ piece",
    icon: <Crown className="w-7 h-7 text-[#8B5CF6]" strokeWidth={1.5} />,
    iconBg: "bg-[#F5F3FF]",
  },
  {
    id: "stain",
    title: "Stain Removal",
    description: "Tough stain treatment for a spotless clean",
    price: "₹50",
    unit: "/ item",
    icon: <Sparkles className="w-7 h-7 text-[#F97316]" strokeWidth={1.5} />,
    iconBg: "bg-[#FFF7ED]",
  },
  {
    id: "shoe",
    title: "Shoe Laundry",
    description: "Special care for all types of footwear",
    price: "₹199",
    unit: "/ pair",
    icon: <Footprints className="w-7 h-7 text-[#0EA5E9]" strokeWidth={1.5} />,
    iconBg: "bg-[#F0F9FF]",
  },
  {
    id: "curtains",
    title: "Curtains & Upholstery",
    description: "Cleans curtains, sofas & cushions",
    price: "₹20",
    unit: "/ sq.ft.",
    icon: <LayoutTemplate className="w-7 h-7 text-[#6366F1]" strokeWidth={1.5} />,
    iconBg: "bg-[#EEF2FF]",
  },
  {
    id: "baby",
    title: "Baby Laundry",
    description: "Safe, gentle & chemical-free baby care",
    price: "₹99",
    unit: "/ kg",
    icon: <Baby className="w-7 h-7 text-[#10B981]" strokeWidth={1.5} />,
    iconBg: "bg-[#ECFDF5]",
  },
  {
    id: "bed-bath",
    title: "Bed & Bath Linen",
    description: "Bedsheets, pillow covers, towels & more",
    price: "₹120",
    unit: "/ piece",
    icon: <Bed className="w-7 h-7 text-[#D946EF]" strokeWidth={1.5} />,
    iconBg: "bg-[#FDF4FF]",
  },
  {
    id: "special",
    title: "Special Care",
    description: "Sarees, lehengas & ethnic wear",
    price: "₹250",
    unit: "/ piece",
    icon: <Heart className="w-7 h-7 text-[#E11D48]" strokeWidth={1.5} />,
    iconBg: "bg-[#FFF1F2]",
  },
];

export default function LaundryServicePage() {
  return (
    <div className="overflow-x-hidden antialiased bg-[#FAFAFA]" style={{ fontFamily: SatoshiFont.style.fontFamily }}>
      <Navbar />

      <main className="pt-[56px] lg:pt-[80px] px-5">
        {/* ─── HERO SECTION ──────────────────────────────────────────────────────── */}
        <section className="relative w-full bg-gradient-to-br from-[#FFFBF7] via-[#FFF6F0] to-[#FDF4EA] overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#F26B21]/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#F26B21]/5 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          <Container isMaxWidth className="relative z-10 py-8 md:py-12 lg:py-16">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-1.5 text-[13px] text-[#7A7A7A] mb-6 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full w-fit border border-[#FCECE4] shadow-sm">
              <Link href="/" className="hover:text-[#F26B21] transition-colors flex items-center gap-1">
                <Home className="w-3 h-3" /> Home
              </Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/services" className="hover:text-[#F26B21] transition-colors">Services</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#F26B21] font-semibold">Laundry</span>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              {/* Left Content */}
              <div className="w-full lg:w-3/5 z-10">
                <h1
                  className="text-[clamp(34px,6vw,58px)] leading-[1.1] font-extrabold text-[#1A1A1A] tracking-tight mb-4"
                  style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
                >
                  Complete Laundry<br />
                  <span className="text-[#F26B21]">Care for Every Need! ✨</span>
                </h1>
                <p className="text-[16px] md:text-[18px] leading-relaxed text-[#5B5B5B] max-w-lg mb-8">
                  From everyday clothes to delicate fabrics, we clean, care and deliver freshness.
                </p>

                {/* Feature highlights — 2-col on mobile, 4-col on md+ */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-sm border border-white/70">
                  {[
                    { icon: <ShieldCheck className="w-4 h-4 text-[#F26B21]" strokeWidth={2} />, title: "Hygienic Wash", sub: "Deep clean with care" },
                    { icon: <Droplet className="w-4 h-4 text-[#F26B21]" strokeWidth={2} />, title: "Safe for Fabrics", sub: "Gentle on clothes" },
                    { icon: <Clock className="w-4 h-4 text-[#F26B21]" strokeWidth={2} />, title: "On-Time Delivery", sub: "As promised" },
                    { icon: <Percent className="w-4 h-4 text-[#F26B21]" strokeWidth={2} />, title: "No Hidden Charges", sub: "Transparent pricing" },
                  ].map((f, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-2">
                      <div className="w-8 h-8 shrink-0 rounded-full bg-[#FFF6F0] flex items-center justify-center border border-[#FCECE4]">
                        {f.icon}
                      </div>
                      <div>
                        <h4 className="text-[12px] font-bold text-[#1A1A1A] leading-tight">{f.title}</h4>
                        <p className="text-[10px] text-[#7A7A7A] leading-tight mt-0.5 hidden sm:block">{f.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap items-center gap-3 mt-8">
                  <button className="bg-[#F26B21] text-white px-6 py-3 rounded-full text-[14px] font-bold flex items-center gap-2 hover:bg-[#D95D1A] transition-colors shadow-md">
                    Book Now <ArrowRight className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-2 text-[13px] text-[#5B5B5B] bg-white rounded-full px-4 py-2.5 border border-gray-200 shadow-sm">
                    <Truck className="w-4 h-4 text-[#F26B21]" /> Free Pickup & Delivery
                  </div>
                </div>
              </div>

              {/* Hero Image */}
              <div className="w-full lg:w-2/5 relative h-[240px] sm:h-[320px] lg:h-[420px]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src="/images/laundry/hero.png"
                    alt="Folded towels and laundry basket"
                    fill
                    className="object-contain object-center drop-shadow-2xl"
                    priority
                    quality={100}
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ─── SERVICES SECTION ──────────────────────────────────────────────────── */}
        <section className="py-12 md:py-16">
          <Container isMaxWidth>
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-6 border-b border-gray-200 gap-4">
              <div>
                <h2
                  className="text-[24px] md:text-[30px] font-bold text-[#1A1A1A] leading-tight"
                  style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
                >
                  All Laundry Services
                </h2>
                <p className="text-[14px] text-[#7A7A7A] mt-1">
                  Choose from our wide range of professional laundry services.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 text-[12px] font-medium text-[#5B5B5B] bg-white rounded-full px-3 py-1.5 border border-gray-200 shadow-sm">
                  <Truck className="w-4 h-4 text-[#7A7A7A]" strokeWidth={1.5} /> Free Pickup
                </div>
                <div className="flex items-center gap-2 text-[12px] font-medium text-[#1A1A1A] bg-[#FFF6F0] rounded-full px-3 py-1.5 border border-[#FCECE4]">
                  <Zap className="w-4 h-4 text-[#F26B21]" strokeWidth={1.5} /> Express Available
                </div>
              </div>
            </div>

            {/* Cards Grid - 2 cols mobile, 3 md, 4 lg */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
              {serviceCards.map((card) => (
                <div
                  key={card.id}
                  className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all group flex flex-col cursor-pointer"
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 ${card.iconBg}`}>
                    {card.icon}
                  </div>
                  <h3 className="font-bold text-[#1A1A1A] text-[13px] md:text-[14px] leading-tight mb-1">{card.title}</h3>
                  <p className="text-[11px] md:text-[12px] text-[#7A7A7A] leading-snug flex-1">{card.description}</p>
                  <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between">
                    <div>
                      <span className="text-[16px] md:text-[18px] font-bold text-[#F26B21]">{card.price}</span>
                      <span className="text-[10px] text-[#9E9E9E] ml-1 hidden sm:inline">{card.unit}</span>
                    </div>
                    <div className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-[#9E9E9E] group-hover:bg-[#F26B21] group-hover:border-[#F26B21] group-hover:text-white transition-colors">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              ))}
              {/* Bulk Laundry CTA Card */}
              <div className="bg-gradient-to-br from-[#EEF2FF] to-[#DDD6FE] rounded-2xl p-4 border border-[#E0E7FF] flex flex-col justify-between cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm text-[#6366F1] mb-3">
                  <Package className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-bold text-[#1A1A1A] text-[13px] md:text-[14px] mb-1">Bulk Laundry?</h4>
                  <p className="text-[11px] text-[#5B5B5B] mb-3">Special pricing for bulk orders</p>
                </div>
                <div className="flex items-center gap-1.5 text-[#6366F1] text-[12px] font-bold">
                  Contact Us <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ─── TRUST BADGES ──────────────────────────────────────────────────────── */}
        <section className="bg-[#FFFBF7] py-8 border-t border-[#F5EFEA]">
          <Container isMaxWidth>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              {[
                { icon: <ShieldCheck strokeWidth={1.5} />, title: "100% Quality", sub: "Assurance" },
                { icon: <Leaf strokeWidth={1.5} />, title: "Eco-friendly", sub: "Products" },
                { icon: <Truck strokeWidth={1.5} />, title: "Free Pickup", sub: "& Delivery" },
                { icon: <ShieldCheck strokeWidth={1.5} />, title: "Satisfaction", sub: "Guaranteed" },
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-3 bg-white rounded-2xl p-4 border border-[#FCECE4] shadow-sm">
                  <div className="w-10 h-10 shrink-0 rounded-full border border-[#FCECE4] bg-[#FFF6F0] flex items-center justify-center text-[#F26B21]">
                    {b.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1A1A1A] text-[13px]">{b.title}</h4>
                    <p className="text-[11px] text-[#7A7A7A]">{b.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
