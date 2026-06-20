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
  Sparkles,
  ShieldCheck,
  Leaf,
  Clock,
  ArrowRight,
  PlayCircle,
  CheckCircle2,
  ArrowRightCircle,
  Armchair,
  SprayCan,
  CookingPot,
  Bath,
  Home,
  Package,
  CalendarClock,
  Wallet,
  Smile,
  ChevronRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Home Cleaning Services",
  description: "Professional home cleaning services for a spotless, healthy and happy home.",
  alternates: { canonical: canonicalPath("/services/home-cleaning") },
};

const cleaningCards = [
  {
    id: "basic",
    title: "Basic Home Cleaning",
    description: "General cleaning for a fresh and tidy home.",
    price: "₹399",
    icon: <Armchair className="w-7 h-7 text-[#22C55E]" strokeWidth={1.5} />,
    iconBg: "bg-[#F0FDF4]",
  },
  {
    id: "deep",
    title: "Deep Cleaning",
    description: "Thorough cleaning for every nook and corner.",
    price: "₹999",
    icon: <SprayCan className="w-7 h-7 text-[#3B82F6]" strokeWidth={1.5} />,
    iconBg: "bg-[#EFF6FF]",
  },
  {
    id: "kitchen",
    title: "Kitchen Cleaning",
    description: "Deep clean & degrease your modular kitchen.",
    price: "₹599",
    icon: <CookingPot className="w-7 h-7 text-[#F97316]" strokeWidth={1.5} />,
    iconBg: "bg-[#FFF7ED]",
  },
  {
    id: "bathroom",
    title: "Bathroom Cleaning",
    description: "Sanitize & disinfect for a hygienic bathroom.",
    price: "₹499",
    icon: <Bath className="w-7 h-7 text-[#0EA5E9]" strokeWidth={1.5} />,
    iconBg: "bg-[#F0F9FF]",
  },
  {
    id: "full",
    title: "Full Home Cleaning",
    description: "Complete home cleaning for a sparkling home.",
    price: "₹1,499",
    icon: <Home className="w-7 h-7 text-[#A855F7]" strokeWidth={1.5} />,
    iconBg: "bg-[#FAF5FF]",
  },
  {
    id: "move",
    title: "Move In / Move Out",
    description: "Perfect cleaning for a fresh new start.",
    price: "₹1,199",
    icon: <Package className="w-7 h-7 text-[#EAB308]" strokeWidth={1.5} />,
    iconBg: "bg-[#FEFCE8]",
  },
];

export default function HomeCleaningPage() {
  return (
    <div className="overflow-x-hidden antialiased bg-[#FFFFFF]" style={{ fontFamily: SatoshiFont.style.fontFamily }}>
      <Navbar />

      <main className="pt-[56px] lg:pt-[80px] px-5">
        {/* ─── HERO SECTION ──────────────────────────────────────────────────────── */}
        <section className="relative w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-[#FFFBF7] to-[#FFF0E8] z-0" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#F26B21]/5 rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none z-0" />

          <Container isMaxWidth className="relative z-10 py-8 md:py-12 lg:py-16">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-1.5 text-[13px] text-[#7A7A7A] mb-6 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full w-fit border border-[#FCECE4] shadow-sm">
              <Link href="/" className="hover:text-[#F26B21] transition-colors flex items-center gap-1">
                <Home className="w-3 h-3" /> Home
              </Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/services" className="hover:text-[#F26B21] transition-colors">Services</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#F26B21] font-semibold">Home Cleaning</span>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              {/* Left Content */}
              <div className="w-full lg:w-[55%] z-10">
                <h1
                  className="text-[clamp(32px,6vw,58px)] leading-[1.1] font-extrabold text-[#1A1A1A] tracking-tight mb-4"
                  style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
                >
                  A Cleaner Home,<br />
                  <span className="text-[#F26B21] flex items-center gap-2 flex-wrap">
                    A Better Life. <Sparkles className="w-7 h-7 md:w-9 md:h-9 opacity-70" strokeWidth={1.5} />
                  </span>
                </h1>

                <p className="text-[15px] md:text-[17px] leading-relaxed text-[#5B5B5B] max-w-md mb-8">
                  Professional home cleaning services for a spotless, healthy and happy home.
                </p>

                {/* Feature highlights — 2 col on mobile */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {[
                    { icon: <ShieldCheck className="w-4 h-4" strokeWidth={1.5} />, title: "Trained & Verified", sub: "Professionals", colorClass: "text-green-600 bg-white border-green-100" },
                    { icon: <Leaf className="w-4 h-4" strokeWidth={1.5} />, title: "Eco-Friendly", sub: "Products", colorClass: "text-green-600 bg-white border-green-100" },
                    { icon: <Clock className="w-4 h-4" strokeWidth={1.5} />, title: "On-Time Service", sub: "Always punctual", colorClass: "text-[#F26B21] bg-white border-[#FCECE4]" },
                    { icon: <ShieldCheck className="w-4 h-4" strokeWidth={1.5} />, title: "Satisfaction", sub: "Guaranteed", colorClass: "text-[#F26B21] bg-white border-[#FCECE4]" },
                  ].map((f, i) => (
                    <div key={i} className="flex items-center gap-2.5 bg-white/80 rounded-xl p-3 border border-white/60 shadow-sm">
                      <div className={`w-8 h-8 shrink-0 rounded-full border flex items-center justify-center ${f.colorClass}`}>
                        {f.icon}
                      </div>
                      <div>
                        <h4 className="text-[12px] font-bold text-[#1A1A1A] leading-tight">{f.title}</h4>
                        <p className="text-[10px] text-[#7A7A7A] leading-tight hidden sm:block">{f.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <button className="bg-[#F26B21] text-white px-6 py-3 rounded-full text-[14px] font-bold flex items-center gap-2 hover:bg-[#D95D1A] transition-colors shadow-md">
                    Book Home Cleaning <ArrowRight className="w-4 h-4" />
                  </button>
                  <button className="bg-white border border-[#FCECE4] text-[#F26B21] px-5 py-3 rounded-full text-[14px] font-bold flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-sm">
                    How It Works <PlayCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right — Image + Card stacked on mobile */}
              <div className="w-full lg:w-[45%] flex flex-col items-center gap-6">
                {/* Hero image */}
                <div className="relative w-full h-[220px] sm:h-[300px] lg:h-[360px] rounded-3xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/home-cleaning/hero.png"
                    alt="Professional home cleaning"
                    fill
                    className="object-cover object-left"
                    priority
                    quality={100}
                  />
                </div>

                {/* Pricing card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 w-full max-w-sm lg:max-w-none">
                  <div className="flex items-center gap-2 bg-[#FFF6F0] text-[#F26B21] px-3 py-1 rounded-full text-[11px] font-bold mb-4 w-fit border border-[#FCECE4]">
                    <ShieldCheck size={12} strokeWidth={2.5} /> Book with Confidence
                  </div>
                  <p className="text-[13px] font-bold text-[#1A1A1A] mb-0.5">Starting at</p>
                  <span className="text-[42px] font-extrabold text-[#F26B21] leading-none block mb-5">₹399</span>
                  <ul className="grid grid-cols-2 gap-2 mb-5">
                    {["Deep & Detailed Cleaning", "No Hidden Charges", "Safe for Kids & Pets", "Flexible Scheduling"].map((t, i) => (
                      <li key={i} className="flex items-center gap-2 text-[12px] font-medium text-[#1A1A1A]">
                        <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" strokeWidth={2.5} /> {t}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full bg-[#F26B21] text-white py-3 rounded-xl text-[14px] font-bold flex items-center justify-center gap-2 hover:bg-[#D95D1A] transition-colors shadow-md">
                    Book Now <ArrowRightCircle className="w-4 h-4" strokeWidth={2} />
                  </button>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ─── CARDS SECTION ─────────────────────────────────────────────────────── */}
        <section className="py-12 md:py-16 bg-white border-t border-gray-50">
          <Container isMaxWidth>
            <div className="text-center mb-10">
              <h2
                className="text-[24px] md:text-[32px] font-bold text-[#1A1A1A] leading-tight mb-2"
                style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
              >
                Our Home Cleaning Services
              </h2>
              <p className="text-[14px] text-[#5B5B5B]">Tailored cleaning solutions for every corner of your home.</p>
            </div>

            {/* 2 col mobile, 3 md, 6 xl */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
              {cleaningCards.map((card) => (
                <div
                  key={card.id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col items-center p-4 text-center group cursor-pointer"
                >
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 ${card.iconBg}`}>
                    {card.icon}
                  </div>
                  <h3 className="font-bold text-[#1A1A1A] text-[13px] leading-tight mb-1">{card.title}</h3>
                  <p className="text-[11px] text-[#7A7A7A] leading-relaxed mb-4 flex-1">{card.description}</p>
                  <div className="w-full flex items-center justify-between border-t border-gray-50 pt-3">
                    <div className="flex flex-col items-start">
                      <span className="text-[9px] text-[#9E9E9E]">Starting at</span>
                      <span className="text-[15px] font-bold text-[#F26B21]">{card.price}</span>
                    </div>
                    <div className="w-7 h-7 rounded-full border border-[#FFF6F0] bg-[#FFF6F0] flex items-center justify-center text-[#F26B21] group-hover:bg-[#F26B21] group-hover:text-white transition-colors">
                      <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ─── TRUST BADGES ──────────────────────────────────────────────────────── */}
        <section className="pb-12 md:pb-16 bg-white">
          <Container isMaxWidth>
            <div className="bg-[#FCFBF9] rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { icon: <ShieldCheck strokeWidth={1.5} />, title: "Background Verified", sub: "& Trained Professionals", color: "text-green-600", bg: "bg-white", border: "border-green-100" },
                  { icon: <Leaf strokeWidth={1.5} />, title: "Eco-Friendly", sub: "Cleaning Products", color: "text-green-600", bg: "bg-white", border: "border-green-100" },
                  { icon: <CalendarClock strokeWidth={1.5} />, title: "Flexible Scheduling", sub: "As Per Your Convenience", color: "text-[#F26B21]", bg: "bg-white", border: "border-[#FCECE4]" },
                  { icon: <Wallet strokeWidth={1.5} />, title: "Transparent Pricing", sub: "No Hidden Charges", color: "text-blue-500", bg: "bg-white", border: "border-blue-100" },
                  { icon: <Smile strokeWidth={1.5} />, title: "100% Satisfaction", sub: "Guaranteed", color: "text-purple-500", bg: "bg-white", border: "border-purple-100" },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center ${b.color} ${b.bg} border ${b.border} shadow-sm`}>
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
