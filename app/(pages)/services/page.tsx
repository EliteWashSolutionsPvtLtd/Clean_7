"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/sections/Footer";
import Container from "@/app/components/layout/Container";
import DownloadAppModal from "@/app/components/ui/modals/DownloadAppModal";
import { WixMadeForDisplayFont, SatoshiFont } from "@/app/fonts";
import { ShieldCheck, Clock, Leaf, Headphones, Smile, ArrowRight, Apple, Play, Sparkles, Smartphone } from "lucide-react";

export default function ServicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="overflow-x-hidden antialiased bg-[#FDFCF9]" style={{ fontFamily: SatoshiFont.style.fontFamily }}>
      <Navbar />
      
      <main className="pt-[70px] lg:pt-[90px]">
        
        {/* ─── Hero Section ────────────────────────────────────────────────────────── */}
        <section className="relative w-full pb-20 sm:pb-32 lg:pb-40 pt-12 lg:pt-16 bg-[#FDFCF9] overflow-hidden">
          {/* Abstract background shapes */}
          <div className="absolute top-[-10%] right-[-10%] w-[600px] lg:w-[1000px] h-[600px] lg:h-[1000px] bg-[#FFF3E5] rounded-full blur-[100px] opacity-60 -z-10" />
          <div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-[#F5F2EF] rounded-full blur-[80px] opacity-40 -z-10" />
          
          <Container isMaxWidth className="relative z-10 px-5">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
              
              {/* Left Content */}
              <div className="max-w-2xl">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF7700]/10 text-[#FF7700] text-xs font-extrabold uppercase tracking-widest mb-8 border border-[#FF7700]/10">
                  <Sparkles size={14} className="animate-pulse" />
                  Premium Home Care
                </div>
                
                <h1 
                  className="text-[3.2rem] md:text-[4.5rem] lg:text-[5.2rem] leading-[1.05] font-extrabold text-[#2D2422] tracking-tight mb-8"
                  style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
                >
                  Care for every<br />
                  corner of <span className="text-[#FF7700] relative">
                    your home.
                    <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#FF7700]/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M0 5 Q 25 0 50 5 T 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                    </svg>
                  </span>
                </h1>
                
                <p className="text-[1.1rem] md:text-[1.25rem] leading-relaxed text-[#6B5E5B] mb-12 max-w-lg">
                  From laundry to doorstep car care, we bring professional expertise right to your home. Reliable, convenient, and strictly handled with care.
                </p>

                {/* Service Quick Links */}
                <div className="flex flex-wrap gap-4 mb-12">
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[#FF7700] text-white px-8 py-4 rounded-full font-bold text-[1.1rem] hover:bg-[#e66a00] hover:scale-105 transition-all shadow-[0_8px_20px_rgba(255,119,0,0.25)] flex items-center gap-3"
                  >
                    Book Now <ArrowRight size={20} strokeWidth={2.5} />
                  </button>
                  <Link 
                    href="/pricing"
                    className="bg-white text-[#2D2422] px-8 py-4 rounded-full font-bold text-[1.1rem] border border-[#E8DFD6] hover:border-[#FF7700] hover:text-[#FF7700] transition-all flex items-center gap-3"
                  >
                    View Pricing
                  </Link>
                </div>
                
                {/* Trust Stats */}
                <div className="flex items-center gap-8 border-t border-gray-100 pt-10">
                  <div>
                    <p className="text-[1.8rem] font-bold text-[#2D2422] mb-0.5">15k+</p>
                    <p className="text-[0.85rem] font-bold text-[#6B5E5B] uppercase tracking-wider">Happy Homes</p>
                  </div>
                  <div className="w-px h-10 bg-gray-200"></div>
                  <div>
                    <p className="text-[1.8rem] font-bold text-[#2D2422] mb-0.5">4.9/5</p>
                    <p className="text-[0.85rem] font-bold text-[#6B5E5B] uppercase tracking-wider">Service Rating</p>
                  </div>
                </div>
              </div>
 
              {/* Right Image Container with Floating Cards */}
              <div className="relative">
                <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-[40px] lg:rounded-[60px] overflow-hidden shadow-[0_40px_80px_rgba(45,36,34,0.15)] bg-[#F5F2EF]">
                  <Image 
                    src="/images/services/services_hero_worker.png" 
                    alt="Clean7 Professional Care" 
                    fill 
                    className="object-cover object-center"
                    priority
                  />
                  {/* Glass overlay at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2D2422]/40 via-transparent to-transparent"></div>
                </div>
                
                {/* Floating Service Cards — Refined Glassmorphism */}
                {[
                  { icon: "/images/services/laundry.png", label: "Laundry", top: "10%", left: "-10%" },
                  { icon: "/images/services/car-wash.png", label: "Car Wash", top: "25%", right: "-8%" },
                  // { icon: "/images/services/pest-control.png", label: "Pest Control", bottom: "35%", right: "-12%" },
                  // { icon: "/images/services/home-cleaning.png", label: "Home Cleaning", bottom: "15%", left: "-5%" },
                ].map((card, i) => (
                  <div 
                    key={i}
                    className="absolute hidden sm:flex items-center gap-4 bg-white/40 backdrop-blur-xl border border-white/60 p-4 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] z-20 hover:-translate-y-2 transition-transform duration-300"
                    style={{ top: card.top, left: card.left, right: card.right }}
                  >
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                      <Image src={card.icon} alt={card.label} width={28} height={28} className="object-contain" />
                    </div>
                    <div>
                      <p className="text-[14px] font-extrabold text-[#2D2422] leading-tight">{card.label}</p>
                      <p className="text-[11px] text-[#6B5E5B] font-bold uppercase tracking-wider mt-0.5">Verified</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
 
        {/* ─── Premium Services Grid ────────────────────────────────────────── */}
        <section className="py-24 bg-white">
          <Container isMaxWidth className="px-5">
            <div className="text-center mb-20 max-w-2xl mx-auto">
              <div className="inline-block px-4 py-1.5 rounded-full bg-[#FF7700]/10 text-[#FF7700] text-[11px] font-black uppercase tracking-[0.2em] mb-5">
                Our Ecosystem
              </div>
              <h2 
                className="text-[2.8rem] md:text-[3.8rem] font-extrabold text-[#2D2422] leading-tight"
                style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
              >
                Comprehensive Care<br/>for Modern Living
              </h2>
              <p className="text-[#6B5E5B] text-[1.1rem] mt-6 leading-relaxed">
                We&apos;ve designed our services to cover everything your home needs, delivered with the same high standard of excellence every single time.
              </p>
            </div>
 
            {/* Grid Layout - 4 Services Balanced */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
              
              {/* Laundry Card - Major Highlight (Full Width on Top) */}
              <div className="lg:col-span-6 relative group rounded-[40px] overflow-hidden shadow-xl h-[450px] lg:h-[500px]">
                <Image src="/images/services/laundry_service_img.png" alt="Laundry Service" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D2422]/90 via-[#2D2422]/20 to-transparent"></div>
                <div className="absolute inset-0 p-10 flex flex-col justify-end">
                  <div className="max-w-xl">
                    <span className="inline-block px-4 py-1.5 bg-[#FF7700] text-white text-[11px] font-black rounded-full mb-6 uppercase tracking-wider">
                      Most Popular
                    </span>
                    <h3 className="text-[2.8rem] md:text-[3.5rem] font-extrabold text-white mb-4 leading-tight" style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}>
                      Laundry & Dry Cleaning
                    </h3>
                    <p className="text-white/80 text-[1.1rem] mb-8 leading-relaxed max-w-md">
                      Premium care for your garments with eco-friendly solvents and specialized equipment. Fresh, clean, and delivered to your door.
                    </p>
                    <Link href="/services/laundry" className="inline-flex items-center gap-3 bg-white text-[#2D2422] px-8 py-4 rounded-full font-bold text-[1rem] hover:bg-[#FF7700] hover:text-white transition-all">
                      Explore Service <ArrowRight size={20} />
                    </Link>
                  </div>
                </div>
              </div>
 
              {/* Home Cleaning Card */}
              {/* <div className="lg:col-span-4 relative group rounded-[40px] overflow-hidden shadow-lg bg-[#33302E] h-[350px] lg:h-[400px]">
                <Image src="/images/services/home-cleaning.png" alt="Home Cleaning" fill className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D2422] to-transparent"></div>
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="text-[1.8rem] font-extrabold text-white mb-4" style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}>
                    Home<br/>Cleaning
                  </h3>
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-3 text-white font-bold group/link hover:text-[#FF7700] transition-colors text-sm"
                  >
                    Book Now <ArrowRight size={18} className="group-hover/link:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div> */}
 
              {/* Car Wash Card */}
              <div className="lg:col-span-6 relative group rounded-[40px] overflow-hidden shadow-lg bg-[#2D2422] h-[450px] lg:h-[500px]">
                <Image src="/images/services/car_wash_img.png" alt="Car Wash" fill className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D2422] to-transparent"></div>
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="text-[1.8rem] font-extrabold text-white mb-4" style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}>
                    Doorstep<br/>Car Wash
                  </h3>
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-3 text-white font-bold group/link hover:text-[#FF7700] transition-colors text-sm"
                  >
                    Book Now <ArrowRight size={18} className="group-hover/link:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Pest Control Card */}
              {/* <div className="lg:col-span-4 relative group rounded-[40px] overflow-hidden shadow-lg bg-[#1A1A1A] h-[350px] lg:h-[400px]">
              
                <div className="absolute inset-0 bg-[#FF7700]/5 group-hover:bg-[#FF7700]/10 transition-colors duration-500"></div>
                <Image src="/images/services/pest-control.png" alt="Pest Control" fill className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D2422] to-transparent"></div>
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="text-[1.8rem] font-extrabold text-white mb-4" style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}>
                    Pest<br/>Control
                  </h3>
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-3 text-white font-bold group/link hover:text-[#FF7700] transition-colors text-sm"
                  >
                    Book Now <ArrowRight size={18} className="group-hover/link:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div> */}

            </div>
          </Container>
        </section>
 
        {/* ─── Values Section ────────────────────────────────────────────────── */}
        <section className="py-24 bg-[#FDFCF9]">
          <Container isMaxWidth className="px-5">
            <div className="grid lg:grid-cols-[1.2fr_2fr] gap-20 items-center">
              <div>
                <div className="text-[#FF7700] font-black uppercase tracking-widest text-[11px] mb-6">Our Commitment</div>
                <h2 
                  className="text-[3rem] font-extrabold text-[#2D2422] leading-[1.1] mb-8"
                  style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
                >
                  We handle your home with the same care as our own.
                </h2>
                <div className="flex items-center gap-6 p-6 rounded-[32px] bg-white border border-[#E8DFD6] shadow-sm">
                  <div className="w-14 h-14 bg-[#FF7700]/10 rounded-2xl flex items-center justify-center text-[#FF7700]">
                    <ShieldCheck size={32} />
                  </div>
                  <div>
                    <p className="text-[1.1rem] font-extrabold text-[#2D2422]">100% Insured Care</p>
                    <p className="text-[0.9rem] text-[#6B5E5B] font-medium">Your peace of mind is our priority.</p>
                  </div>
                </div>
              </div>
 
              <div className="grid sm:grid-cols-2 gap-8">
                {[
                  { icon: Clock, title: "Always On-Time", desc: "We value your time as much as you do. Prompt service, every single visit." },
                  { icon: Leaf, title: "Eco-Friendly", desc: "Strict use of safe, non-toxic products that are gentle on your home and planet." },
                  { icon: Smile, title: "Joy Guaranteed", desc: "Not satisfied with our service? We'll make it right, immediately." },
                  { icon: Headphones, title: "24/7 Support", desc: "Dedicated concierge team ready to assist with any booking or query." }
                ].map((value, i) => (
                  <div key={i} className="group p-8 rounded-[40px] bg-white border border-[#E8DFD6] hover:shadow-xl hover:border-[#FF7700]/20 transition-all duration-300">
                    <div className="w-12 h-12 bg-[#F5F2EF] rounded-xl flex items-center justify-center text-[#2D2422] mb-6 group-hover:bg-[#FF7700] group-hover:text-white transition-colors">
                      <value.icon size={24} />
                    </div>
                    <h4 className="text-[1.3rem] font-extrabold text-[#2D2422] mb-3 leading-tight">{value.title}</h4>
                    <p className="text-[#6B5E5B] text-[0.95rem] leading-relaxed font-medium">{value.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
 
        {/* ─── CTA Download Section ────────────────────────────────────────────────── */}
        <section className="py-24 bg-white">
          <Container isMaxWidth className="px-5">
            <div className="relative overflow-hidden rounded-[60px] bg-[#2D2422] px-8 md:px-20 py-20 lg:py-24 text-center">
              {/* Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#FF7700]/20 blur-[120px] rounded-full pointer-events-none" />
              
              <div className="relative z-10 max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-[11px] font-black uppercase tracking-widest mb-10 border border-white/10">
                  <Smartphone size={14} className="text-[#FF7700]" />
                  Experience Clean7
                </div>
                
                <h2
                  className="text-[3rem] md:text-[4.5rem] font-extrabold text-white leading-[1.05] mb-10"
                  style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
                >
                  Your home care,<br/>just a tap away.
                </h2>
                
                <p className="text-white/70 text-[1.2rem] mb-12 leading-relaxed">
                  Join 10,000+ happy customers who trust Clean7 for their daily home needs. Get the app today and unlock premium living.
                </p>
 
                <div className="flex flex-wrap items-center justify-center gap-6">
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[#FF7700] text-white px-10 py-5 rounded-full font-bold text-[1.1rem] hover:bg-[#e66a00] hover:scale-105 transition-all shadow-[0_12px_40px_rgba(255,119,0,0.3)]"
                  >
                    Get Started Now
                  </button>
                  <div className="flex items-center gap-4">
                    <div className="group cursor-pointer bg-white/5 border border-white/10 p-3 rounded-2xl hover:bg-white/10 transition-all">
                      <Apple className="text-white" size={28} />
                    </div>
                    <div className="group cursor-pointer bg-white/5 border border-white/10 p-3 rounded-2xl hover:bg-white/10 transition-all">
                      <Play className="text-white" size={28} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
 
      </main>
 
      <Footer />
      <DownloadAppModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
