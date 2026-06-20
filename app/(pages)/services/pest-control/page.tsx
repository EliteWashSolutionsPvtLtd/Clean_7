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
  ShieldAlert,
  ShieldCheck,
  Leaf,
  UserCheck,
  Shield,
  ArrowRight,
  PlayCircle,
  Check,
  BugOff,
  CalendarCheck,
  Clock,
  BadgeCheck,
  Home,
  ChevronRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Pest Control Services",
  description: "Safe, effective and eco-friendly pest control solutions for a healthier home and worry-free living.",
  alternates: { canonical: canonicalPath("/services/pest-control") },
};

const pestCards = [
  { id: "cockroach", title: "Cockroach Control", description: "Eliminate cockroaches & prevent re-infestation" },
  { id: "rodent", title: "Rodent Control", description: "Effective solution to keep rats & mice away" },
  { id: "termite", title: "Termite Control", description: "Protect your home from termites & structural damage" },
  { id: "bed-bug", title: "Bed Bug Treatment", description: "Advanced treatment to eliminate bed bugs" },
  { id: "mosquito", title: "Mosquito Control", description: "Reduce mosquito breeding & enjoy a peaceful home" },
  { id: "fly", title: "Fly Control", description: "Hygienic treatment to eliminate flies" },
  { id: "other", title: "Other Pests", description: "Ants, lizards, spiders & other common pests" },
];

export default function PestControlPage() {
  return (
    <div className="overflow-x-hidden antialiased bg-[#FFFFFF]" style={{ fontFamily: SatoshiFont.style.fontFamily }}>
      <Navbar />

      <main className="pt-[56px] lg:pt-[80px] px-5">
        {/* ─── HERO SECTION ──────────────────────────────────────────────────────── */}
        <section className="relative w-full overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-[#FFFBF7] to-[#FFF6F0] z-0" />
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#F26B21]/5 rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none z-0" />

          <Container isMaxWidth className="relative z-10 py-8 md:py-12 lg:py-16">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-1.5 text-[13px] text-[#7A7A7A] mb-6 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full w-fit border border-[#FCECE4] shadow-sm">
              <Link href="/" className="hover:text-[#F26B21] transition-colors flex items-center gap-1">
                <Home className="w-3 h-3" /> Home
              </Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/services" className="hover:text-[#F26B21] transition-colors">Services</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#F26B21] font-semibold">Pest Control</span>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              {/* Left Content */}
              <div className="w-full lg:w-[55%] z-10">
                <div className="flex items-center gap-2 bg-[#FFF6F0] border border-[#FCECE4] text-[#F26B21] px-3 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-wide w-fit mb-5 shadow-sm">
                  <ShieldAlert size={14} strokeWidth={2.5} /> Pest Control
                </div>

                <h1
                  className="text-[clamp(32px,6vw,56px)] leading-[1.1] font-extrabold text-[#1A1A1A] tracking-tight mb-4"
                  style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
                >
                  Protect Your Home.<br />
                  Protect Your <span className="text-[#F26B21]">Loved Ones.</span>
                </h1>

                <p className="text-[15px] md:text-[17px] leading-relaxed text-[#5B5B5B] max-w-md mb-8">
                  Safe, effective and eco-friendly pest control solutions for a healthier home and worry-free living.
                </p>

                {/* Feature highlights — 2 col on mobile */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {[
                    { icon: <Leaf className="w-4 h-4" strokeWidth={1.5} />, title: "Eco-Friendly", sub: "Safe for kids, pets & environment" },
                    { icon: <ShieldCheck className="w-4 h-4" strokeWidth={1.5} />, title: "Safe & Odourless", sub: "No bad smell" },
                    { icon: <UserCheck className="w-4 h-4" strokeWidth={1.5} />, title: "Expert Technicians", sub: "Trained & verified" },
                    { icon: <Shield className="w-4 h-4" strokeWidth={1.5} />, title: "Service Warranty", sub: "Guaranteed protection" },
                  ].map((f, i) => (
                    <div key={i} className="flex items-center gap-2.5 bg-white/80 rounded-xl p-3 border border-white/60 shadow-sm">
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

                {/* CTA */}
                <div className="flex flex-wrap gap-3">
                  <button className="bg-[#F26B21] text-white px-6 py-3 rounded-full text-[14px] font-bold flex items-center gap-2 hover:bg-[#D95D1A] transition-colors shadow-md">
                    Book Pest Control <ArrowRight className="w-4 h-4" />
                  </button>
                  <button className="bg-white border border-[#FCECE4] text-[#F26B21] px-5 py-3 rounded-full text-[14px] font-bold flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-sm">
                    How It Works <PlayCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right — Image + Pricing stacked on mobile */}
              <div className="w-full lg:w-[45%] flex flex-col items-center gap-6">
                {/* Hero image */}
                <div className="relative w-full h-[220px] sm:h-[300px] lg:h-[360px] rounded-3xl overflow-hidden">
                  <Image
                    src="/images/pest-control/hero.png"
                    alt="Pest control technician at work"
                    fill
                    className="object-cover object-left"
                    priority
                    quality={100}
                  />
                </div>

                {/* Pricing card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 w-full max-w-sm lg:max-w-none">
                  <p className="text-[13px] font-bold text-[#1A1A1A] mb-1">Starting at</p>
                  <span className="text-[42px] font-extrabold text-[#F26B21] leading-none block mb-5">₹499</span>
                  <ul className="grid grid-cols-2 gap-2">
                    {["Free Inspection", "No Hidden Charges", "Safe & Odourless", "Warranty on Service"].map((t, i) => (
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
        <section className="py-12 md:py-16 bg-white">
          <Container isMaxWidth>
            <div className="text-center mb-10">
              <h2
                className="text-[24px] md:text-[32px] font-bold text-[#1A1A1A] leading-tight mb-2"
                style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
              >
                Our Pest Control Services
              </h2>
              <p className="text-[14px] text-[#5B5B5B]">Customized solutions for every pest problem</p>
            </div>

            {/* 2 col mobile, 4 desktop */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {pestCards.map((card) => (
                <div
                  key={card.id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col items-start p-5 cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-full bg-[#FFF6F0] flex items-center justify-center mb-4 text-[#F26B21]">
                    <BugOff className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-bold text-[#1A1A1A] text-[14px] leading-tight mb-2">{card.title}</h3>
                  <p className="text-[12px] text-[#7A7A7A] leading-relaxed flex-1">{card.description}</p>
                  <div className="mt-4 w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-[#9E9E9E] group-hover:bg-[#F26B21] group-hover:border-[#F26B21] group-hover:text-white transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ─── TRUST BADGES ──────────────────────────────────────────────────────── */}
        <section className="pb-12 md:pb-16">
          <Container isMaxWidth>
            <div className="bg-[#FAFAFA] rounded-2xl border border-gray-100 p-6 md:p-8">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { icon: <BadgeCheck strokeWidth={1.5} />, title: "Trained Professionals", sub: "Background verified", color: "text-[#F26B21]", bg: "bg-white", border: "border-[#FCECE4]" },
                  { icon: <Leaf strokeWidth={1.5} />, title: "Eco-Friendly Products", sub: "Safe for family & pets", color: "text-[#F26B21]", bg: "bg-white", border: "border-[#FCECE4]" },
                  { icon: <CalendarCheck strokeWidth={1.5} />, title: "Long Lasting Results", sub: "Lasting protection", color: "text-[#F26B21]", bg: "bg-white", border: "border-[#FCECE4]" },
                  { icon: <Clock strokeWidth={1.5} />, title: "On-Time Service", sub: "Always on schedule", color: "text-[#F26B21]", bg: "bg-white", border: "border-[#FCECE4]" },
                  { icon: <ShieldCheck strokeWidth={1.5} />, title: "Satisfaction Guarantee", sub: "Not happy? We'll fix it", color: "text-[#F26B21]", bg: "bg-white", border: "border-[#FCECE4]" },
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
