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
  CarFront,
  ShieldCheck,
  Droplet,
  Clock,
  ThumbsUp,
  ArrowRight,
  PlayCircle,
  Check,
  Sparkles,
  Shield,
  Wind,
  Bike,
  UserCheck,
  Leaf,
  Home,
  ChevronRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Doorstep Car Wash",
  description: "Professional car wash, at your doorstep. We come to you with water-saving technology, premium products & expert care.",
  alternates: { canonical: canonicalPath("/services/car-wash") },
};

const washCards = [
  {
    id: "basic",
    title: "Basic Wash",
    description: "Exterior wash to remove dust & dirt",
    price: "₹299",
    time: "30 mins",
    icon: <CarFront className="w-7 h-7 text-[#F26B21]" strokeWidth={1.5} />,
    iconBg: "bg-[#FFF6F0]",
    isPopular: false,
  },
  {
    id: "standard",
    title: "Standard Wash",
    description: "Exterior + Interior vacuum & dashboard cleaning",
    price: "₹499",
    time: "45 mins",
    icon: <CarFront className="w-7 h-7 text-[#F26B21]" strokeWidth={1.5} />,
    iconBg: "bg-[#FFF6F0]",
    isPopular: true,
  },
  {
    id: "premium",
    title: "Premium Wash",
    description: "Exterior + Interior deep cleaning & polishing",
    price: "₹799",
    time: "60 mins",
    icon: <Sparkles className="w-7 h-7 text-[#F26B21]" strokeWidth={1.5} />,
    iconBg: "bg-[#FFF6F0]",
    isPopular: false,
  },
  {
    id: "ceramic",
    title: "Ceramic Wash",
    description: "Premium wash with ceramic coating for long protection",
    price: "₹1,299",
    time: "90 mins",
    icon: <Shield className="w-7 h-7 text-[#4CAF50]" strokeWidth={1.5} />,
    iconBg: "bg-[#F0FDF4]",
    isPopular: false,
  },
  {
    id: "steam",
    title: "Steam Wash",
    description: "High temperature steam cleaning & sanitization",
    price: "₹999",
    time: "60 mins",
    icon: <Wind className="w-7 h-7 text-[#8B5CF6]" strokeWidth={1.5} />,
    iconBg: "bg-[#F5F3FF]",
    isPopular: true,
  },
  {
    id: "two-wheeler",
    title: "Two Wheeler Wash",
    description: "Complete bike/scooter wash & polish",
    price: "₹199",
    time: "20 mins",
    icon: <Bike className="w-7 h-7 text-[#3B82F6]" strokeWidth={1.5} />,
    iconBg: "bg-[#EFF6FF]",
    isPopular: false,
  },
];

export default function CarWashPage() {
  return (
    <div className="overflow-x-hidden antialiased bg-[#FAFAFA]" style={{ fontFamily: SatoshiFont.style.fontFamily }}>
      <Navbar />

      <main className="pt-[56px] lg:pt-[80px] px-5">
        {/* ─── HERO SECTION ──────────────────────────────────────────────────────── */}
        <section className="relative w-full bg-gradient-to-br from-[#FFF9F5] via-[#FFF6F0] to-[#F2E8DF] overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#F26B21]/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#F26B21]/5 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          <Container isMaxWidth className="relative z-10 py-8 md:py-12 lg:py-16">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-1.5 text-[13px] text-[#7A7A7A] mb-6 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full w-fit border border-[#FCECE4] shadow-sm">
              <Link href="/" className="hover:text-[#F26B21] transition-colors flex items-center gap-1">
                <Home className="w-3 h-3" /> Home
              </Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/services" className="hover:text-[#F26B21] transition-colors">Services</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#F26B21] font-semibold">Car Wash</span>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              {/* Left Content */}
              <div className="w-full lg:w-1/2 z-10">
                <div className="flex items-center gap-2 bg-[#FFF6F0] border border-[#FCECE4] text-[#F26B21] px-3 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-wide w-fit mb-5 shadow-sm">
                  <CarFront size={14} strokeWidth={2.5} /> Doorstep Car Wash
                </div>

                <h1
                  className="text-[clamp(32px,6vw,56px)] leading-[1.1] font-extrabold text-[#1A1A1A] tracking-tight mb-4"
                  style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
                >
                  Professional Car Wash,<br />
                  <span className="text-[#F26B21]">At Your Doorstep.</span>
                </h1>

                <p className="text-[15px] md:text-[17px] leading-relaxed text-[#5B5B5B] max-w-md mb-8">
                  We come to you with water-saving technology, premium products &amp; expert care.
                </p>

                {/* Feature highlights — 2-col on mobile */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {[
                    { icon: <Droplet className="w-4 h-4" strokeWidth={1.5} />, title: "Saves Water", sub: "Eco-friendly wash" },
                    { icon: <Clock className="w-4 h-4" strokeWidth={1.5} />, title: "Saves Time", sub: "We come to you" },
                    { icon: <ShieldCheck className="w-4 h-4" strokeWidth={1.5} />, title: "Premium Care", sub: "Best quality products" },
                    { icon: <ThumbsUp className="w-4 h-4" strokeWidth={1.5} />, title: "100% Safe", sub: "No scratches" },
                  ].map((f, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white/80 rounded-xl p-3 border border-white/60 shadow-sm">
                      <div className="w-8 h-8 shrink-0 rounded-full bg-[#FFF6F0] border border-[#FCECE4] flex items-center justify-center text-[#F26B21]">
                        {f.icon}
                      </div>
                      <div>
                        <h4 className="text-[12px] font-bold text-[#1A1A1A] leading-tight">{f.title}</h4>
                        <p className="text-[10px] text-[#7A7A7A] leading-tight hidden sm:block">{f.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-3">
                  <button className="bg-[#F26B21] text-white px-6 py-3 rounded-full text-[14px] font-bold flex items-center gap-2 hover:bg-[#D95D1A] transition-colors shadow-md">
                    Book Car Wash <ArrowRight className="w-4 h-4" />
                  </button>
                  <button className="bg-white border border-gray-200 text-[#1A1A1A] px-5 py-3 rounded-full text-[14px] font-bold flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-sm">
                    How It Works <PlayCircle className="w-4 h-4 text-[#F26B21]" />
                  </button>
                </div>
              </div>

              {/* Right — Image + Pricing Card stacked on mobile */}
              <div className="w-full lg:w-1/2 flex flex-col items-center gap-6">
                {/* Hero image */}
                <div className="relative w-full h-[220px] sm:h-[300px] lg:h-[380px]">
                  <Image
                    src="/images/car-wash/hero.png"
                    alt="Car wash professional at doorstep"
                    fill
                    className="object-contain object-center drop-shadow-2xl"
                    priority
                    quality={100}
                  />
                </div>

                {/* Pricing Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 flex items-center gap-6 w-full max-w-sm lg:max-w-none">
                  <div className="shrink-0">
                    <p className="text-[12px] font-medium text-[#7A7A7A] mb-0.5">Starting at</p>
                    <span className="text-[36px] font-extrabold text-[#F26B21] leading-none">₹299</span>
                  </div>
                  <div className="w-px h-14 bg-gray-100 shrink-0 hidden sm:block" />
                  <ul className="space-y-2 flex-1">
                    {["Free Pickup & Delivery", "No Hidden Charges", "Satisfaction Guaranteed"].map((t, i) => (
                      <li key={i} className="flex items-center gap-2 text-[12px] font-medium text-[#5B5B5B]">
                        <div className="bg-[#FFF6F0] rounded-full p-0.5 shrink-0"><Check className="w-3 h-3 text-[#F26B21]" strokeWidth={3} /></div> {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ─── CARDS SECTION ─────────────────────────────────────────────────────── */}
        <section className="py-12 md:py-16">
          <Container isMaxWidth>
            <div className="text-center mb-10">
              <h2
                className="text-[24px] md:text-[32px] font-bold text-[#1A1A1A] leading-tight mb-2"
                style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
              >
                Our Doorstep Car Wash Services
              </h2>
              <p className="text-[14px] text-[#5B5B5B]">Choose the perfect wash for your car</p>
            </div>

            {/* 2 cols mobile, 3 md, 6 xl */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
              {washCards.map((card) => (
                <div key={card.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all relative flex flex-col items-center p-4 text-center group cursor-pointer">
                  {card.isPopular && (
                    <div className="absolute top-0 right-3 bg-[#F26B21] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-b-lg shadow-sm">
                      Popular
                    </div>
                  )}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${card.iconBg}`}>
                    {card.icon}
                  </div>
                  <h3 className="font-bold text-[#1A1A1A] text-[13px] leading-tight mb-1">{card.title}</h3>
                  <p className="text-[11px] text-[#7A7A7A] leading-snug mb-4 flex-1">{card.description}</p>
                  <div className="w-full flex items-center justify-between mb-3">
                    <span className="text-[16px] font-bold text-[#F26B21] leading-none">{card.price}</span>
                    <div className="flex items-center gap-1 text-[#9E9E9E]">
                      <Clock className="w-3 h-3" />
                      <span className="text-[10px]">{card.time}</span>
                    </div>
                  </div>
                  <button className="w-full py-2 rounded-full border border-[#F26B21] text-[#F26B21] font-bold text-[12px] hover:bg-[#F26B21] hover:text-white transition-colors">
                    Book Now
                  </button>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ─── TRUST BADGES ──────────────────────────────────────────────────────── */}
        <section className="pb-12 md:pb-16">
          <Container isMaxWidth>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
                {[
                  { icon: <UserCheck strokeWidth={1.5} />, title: "Verified Professionals", sub: "Trained & background verified", color: "text-[#F26B21]", bg: "bg-[#FFF6F0]", border: "border-[#FCECE4]" },
                  { icon: <Leaf strokeWidth={1.5} />, title: "Eco-Friendly Products", sub: "Safe for your car", color: "text-[#4CAF50]", bg: "bg-[#F0FDF4]", border: "border-[#DCFCE7]" },
                  { icon: <Droplet strokeWidth={1.5} />, title: "Water Saving Technology", sub: "90% less water", color: "text-[#0EA5E9]", bg: "bg-[#F0F9FF]", border: "border-[#E0F2FE]" },
                  { icon: <Clock strokeWidth={1.5} />, title: "On-Time Service", sub: "Always on schedule", color: "text-[#F97316]", bg: "bg-[#FFF7ED]", border: "border-[#FFEDD5]" },
                  { icon: <ShieldCheck strokeWidth={1.5} />, title: "Satisfaction Guaranteed", sub: "Not happy? We'll fix it", color: "text-[#F26B21]", bg: "bg-[#FFF6F0]", border: "border-[#FCECE4]" },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center ${b.color} ${b.bg} border ${b.border}`}>
                      {b.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1A1A1A] text-[12px] leading-tight">{b.title}</h4>
                      <p className="text-[10px] text-[#7A7A7A] leading-snug">{b.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
