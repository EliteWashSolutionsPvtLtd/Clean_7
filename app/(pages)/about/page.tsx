"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/sections/Footer";
import { SatoshiFont, WixMadeForDisplayFont } from "@/app/fonts";
import {
  Smartphone, Home, Sparkles, Package, ShieldCheck, Clock,
  ArrowRight, Car, Bug, CalendarCheck, Heart
} from "lucide-react";
import Container from "@/app/components/layout/Container";

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="overflow-x-hidden bg-white" style={{ fontFamily: SatoshiFont.style.fontFamily }}>
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-5 bg-white">
        <Container isMaxWidth>
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-[45%]">
              <p className="text-[12px] font-bold text-[#FF7700] tracking-wider uppercase mb-4">About Clean7</p>
              <h1 className="text-[3.2rem] lg:text-[4rem] font-extrabold leading-[1.1] text-[#2D2422] mb-6" style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}>
                We bring ease<br />to your everyday<br />
                <span className="text-[#FF7700]">in just a few clicks.</span>
              </h1>
              <p className="text-[1.1rem] text-[#6B5E5B] leading-relaxed mb-12 max-w-lg">
                From laundry to living rooms, from dusty cars to hidden pests — everything you need, picked up, handled, and delivered. All while you stay right where you are.
              </p>
              <div className="flex gap-8 flex-wrap">
                <div className="flex flex-col items-center gap-3 w-[70px]">
                  <div className="text-[#FF7700]"><Smartphone size={28} strokeWidth={1.5} /></div>
                  <p className="text-[12px] font-bold text-[#2D2422] text-center leading-tight">Few clicks<br />to book</p>
                </div>
                <div className="flex flex-col items-center gap-3 w-[70px]">
                  <div className="text-[#FF7700]"><Home size={28} strokeWidth={1.5} /></div>
                  <p className="text-[12px] font-bold text-[#2D2422] text-center leading-tight">We come<br />to you</p>
                </div>
                <div className="flex flex-col items-center gap-3 w-[70px]">
                  <div className="text-[#FF7700]"><Sparkles size={28} strokeWidth={1.5} /></div>
                  <p className="text-[12px] font-bold text-[#2D2422] text-center leading-tight">We clean<br />everything</p>
                </div>
                <div className="flex flex-col items-center gap-3 w-[70px]">
                  <div className="text-[#FF7700]"><Package size={28} strokeWidth={1.5} /></div>
                  <p className="text-[12px] font-bold text-[#2D2422] text-center leading-tight">We deliver<br />it back</p>
                </div>
              </div>
            </div>
            <div className="lg:w-[55%] relative w-full">
              <div className="w-full h-[500px] lg:h-[600px] relative rounded-tl-[120px] rounded-bl-[200px] rounded-br-[200px] rounded-tr-[40px] overflow-hidden bg-[#FFF3E5]">
                <Image src="/images/about/about_hero_woman_1777741860228.png" fill alt="Woman relaxing" className="object-cover object-top" priority />
              </div>
              {/* Floating Card — highly transparent white glassmorphism */}
              <div className="absolute top-[10%] lg:top-[15%] left-0 lg:left-[-5%] rounded-3xl p-6 w-[280px] lg:w-[320px] z-10
                bg-white/25 backdrop-blur-xl 
                border border-white/50 
                shadow-[0_8px_32px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.7)]"
              >
                {/* Subtle inner glow top edge */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/60 to-transparent pointer-events-none" />

                <div className="flex flex-col gap-6 relative z-10">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/50 rounded-xl flex items-center justify-center text-[#FF7700] shrink-0 border border-white/60"><Smartphone size={20} /></div>
                    <div>
                      <h4 className="text-[14px] font-bold text-[#2D2422] tracking-wide">Book in a few clicks</h4>
                      <p className="text-[12px] text-[#2D2422]/70 mt-1 font-medium">Choose your service</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/50 rounded-xl flex items-center justify-center text-[#FF7700] shrink-0 border border-white/60"><Car size={20} /></div>
                    <div>
                      <h4 className="text-[14px] font-bold text-[#2D2422] tracking-wide">We pick up / arrive</h4>
                      <p className="text-[12px] text-[#2D2422]/70 mt-1 font-medium">Right at your doorstep</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/50 rounded-xl flex items-center justify-center text-[#FF7700] shrink-0 border border-white/60"><ShieldCheck size={20} /></div>
                    <div>
                      <h4 className="text-[14px] font-bold text-[#2D2422] tracking-wide">We get everything done</h4>
                      <p className="text-[12px] text-[#2D2422]/70 mt-1 font-medium">Professionally & carefully</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/50 rounded-xl flex items-center justify-center text-[#FF7700] shrink-0 border border-white/60"><Package size={20} /></div>
                    <div>
                      <h4 className="text-[14px] font-bold text-[#2D2422] tracking-wide">We deliver it back</h4>
                      <p className="text-[12px] text-[#2D2422]/70 mt-1 font-medium">Fresh, clean & hassle-free</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-black/5">
                    <p className="text-[16px] font-bold text-[#48413b] tracking-wide leading-relaxed">
                      All this while you relax.😊
                    </p>
                  </div>
                </div>
              </div>
              {/* Dashed arrow */}
              <div className="hidden lg:block absolute bottom-10 -left-16 w-32 h-32 opacity-30">
                <svg viewBox="0 0 100 100" fill="none" stroke="#FF7700" strokeWidth="2" strokeDasharray="4 4" className="w-full h-full">
                  <path d="M10,90 Q50,90 90,50" />
                  <path d="M80,50 L90,50 L90,60" />
                </svg>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-[#FFF8F3] px-5">
        <Container isMaxWidth>
          <div className="flex flex-col xl:flex-row gap-16 items-center">
            <div className="xl:w-1/3 text-center xl:text-left">
              <p className="text-[12px] font-bold text-[#FF7700] tracking-wider uppercase mb-4">How It Works</p>
              <h2 className="text-[2.8rem] lg:text-[3.2rem] font-extrabold leading-[1.1] text-[#2D2422] mb-6" style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}>
                Tap. Book. <span className="text-[#FF7700]">Done.</span>
              </h2>
              <p className="text-[1.1rem] text-[#6B5E5B] leading-relaxed max-w-md mx-auto xl:mx-0">
                No calls. No chasing. No stress. We pick up, clean, fix and deliver — while your day continues.
              </p>
            </div>
            <div className="xl:w-2/3 w-full grid grid-cols-2 md:flex md:flex-row items-start justify-between gap-x-4 gap-y-12 md:gap-4 relative mt-8 xl:mt-0">
              {/* Desktop connecting arrows */}
              <div className="hidden md:flex absolute top-[100px] left-[20%] right-[20%] justify-between items-center z-0 text-[#FF7700] opacity-40 px-10">
                <ArrowRight size={24} />
                <ArrowRight size={24} />
                <ArrowRight size={24} />
              </div>
              {/* Step 1 */}
              <div className="flex flex-col items-center flex-1 relative z-10 w-full md:w-auto">
                <div className="h-[220px] flex items-center justify-center">
                  <div className="h-[200px] w-[100px] relative">
                    <Image src="/images/about/about_phone_app_1777741999909.png" fill alt="Phone app" className="object-contain" />
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#FF7700] text-white flex items-center justify-center font-bold text-[14px] mt-6 mb-3 shadow-lg">01</div>
                <p className="text-[15px] font-bold text-[#2D2422] text-center">Open the app</p>
              </div>
              {/* Step 2 */}
              <div className="flex flex-col items-center flex-1 relative z-10 w-full md:w-auto">
                <div className="h-[220px] flex items-center justify-center">
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col gap-3 w-[160px]">
                    <div className="flex items-center gap-3"><div className="w-8 h-8 bg-[#FFF3E5] rounded-full text-[#FF7700] flex items-center justify-center"><Package size={14} /></div><span className="text-[12px] font-bold text-[#2D2422]">Laundry</span></div>
                    {/* <div className="flex items-center gap-3"><div className="w-8 h-8 bg-[#EBF4FC] rounded-full text-[#3E8FD4] flex items-center justify-center"><Home size={14} /></div><span className="text-[12px] font-bold text-[#2D2422]">Home Cleaning</span></div> */}
                    <div className="flex items-center gap-3"><div className="w-8 h-8 bg-[#EFF8F2] rounded-full text-[#4CAF85] flex items-center justify-center"><Car size={14} /></div><span className="text-[12px] font-bold text-[#2D2422]">Car Wash</span></div>
                    {/* <div className="flex items-center gap-3"><div className="w-8 h-8 bg-[#F6F0FE] rounded-full text-[#9B51E0] flex items-center justify-center"><Bug size={14} /></div><span className="text-[12px] font-bold text-[#2D2422]">Pest Control</span></div> */}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#FF7700] text-white flex items-center justify-center font-bold text-[14px] mt-6 mb-3 shadow-lg">02</div>
                <p className="text-[15px] font-bold text-[#2D2422] text-center">Choose<br />your service</p>
              </div>
              {/* Step 3 */}
              <div className="flex flex-col items-center flex-1 relative z-10 w-full md:w-auto">
                <div className="h-[220px] flex items-center justify-center">
                  <div className="h-[220px] w-[140px] relative">
                    <Image src="/images/about/about_worker_1777741885196.png" fill alt="Worker" className="object-contain" />
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#FF7700] text-white flex items-center justify-center font-bold text-[14px] mt-6 mb-3 shadow-lg">03</div>
                <p className="text-[15px] font-bold text-[#2D2422] text-center">We handle<br />everything</p>
              </div>
              {/* Step 4 */}
              <div className="flex flex-col items-center flex-1 relative z-10 w-full md:w-auto">
                <div className="h-[220px] flex items-center justify-center">
                  <div className="h-[180px] w-[160px] relative">
                    <Image src="/images/about/about_folded_clothes_1777741898985.png" fill alt="Folded clothes" className="object-contain" />
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#FF7700] text-white flex items-center justify-center font-bold text-[14px] mt-6 mb-3 shadow-lg">04</div>
                <p className="text-[15px] font-bold text-[#2D2422] text-center">Sit back,<br />we deliver</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white text-center px-5">
        <Container isMaxWidth>
          <p className="text-[12px] font-bold text-[#FF7700] tracking-wider uppercase mb-4">Everything You Need, Handled For You</p>
          <h2 className="text-[2.8rem] lg:text-[3.2rem] font-extrabold leading-[1.1] text-[#2D2422] mb-16" style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}>
            One app. Many solutions.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 text-left">
            {/* Card 1 */}
            <div className="bg-[#F0F6FE] rounded-3xl p-8 pb-32 xl:pb-8 xl:min-h-[280px] relative overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
              <h3 className="text-[#3E8FD4] text-[20px] font-bold mb-2">Laundry<br />Pickup & Delivery</h3>
              <p className="text-[14px] text-[#2D2422] mb-12 relative z-10 w-[70%]">We take it. We clean it. We bring it back fresh.</p>
              <div className="absolute bottom-[-10%] right-[-10%] w-[180px] h-[180px] md:w-[220px] md:h-[220px] xl:w-[180px] xl:h-[180px]">
                <Image src="/images/about/about_laundry_basket_1777741915329.png" fill alt="Laundry" className="object-contain object-bottom right-0" />
              </div>
              <button className="w-10 h-10 rounded-full bg-[#3E8FD4] text-white flex items-center justify-center absolute bottom-6 left-6 transition-transform group-hover:translate-x-2 shadow-md z-10">
                <ArrowRight size={18} />
              </button>
            </div>
            {/* Card 2 */}
            {/* <div className="bg-[#FEF4EA] rounded-3xl p-8 pb-32 xl:pb-8 xl:min-h-[280px] relative overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
              <h3 className="text-[#FF7700] text-[20px] font-bold mb-2">Home<br />Cleaning</h3>
              <p className="text-[14px] text-[#2D2422] mb-12 relative z-10 w-[70%]">Your space reset without you lifting a finger.</p>
              <div className="absolute bottom-[-5%] right-[-15%] w-[180px] h-[180px] md:w-[220px] md:h-[220px] xl:w-[200px] xl:h-[200px]">
                <Image src="/images/about/about_home_cleaning_sofa_1777741933846.png" fill alt="Cleaning" className="object-contain object-bottom right-0" />
              </div>
              <button className="w-10 h-10 rounded-full bg-[#FF7700] text-white flex items-center justify-center absolute bottom-6 left-6 transition-transform group-hover:translate-x-2 shadow-md z-10">
                <ArrowRight size={18} />
              </button>
            </div> */}
            {/* Card 3 */}
            <div className="bg-[#EFF8F2] rounded-3xl p-8 pb-32 xl:pb-8 xl:min-h-[280px] relative overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
              <h3 className="text-[#4CAF85] text-[20px] font-bold mb-2">Doorstep<br />Car Wash</h3>
              <p className="text-[14px] text-[#2D2422] mb-12 relative z-10 w-[70%]">Your car cleaned while you chill inside.</p>
              <div className="absolute bottom-[0%] right-[-10%] w-[180px] h-[180px] md:w-[240px] md:h-[240px] xl:w-[200px] xl:h-[200px]">
                <Image src="/images/about/about_car_wash_car_1777741958725.png" fill alt="Car wash" className="object-contain object-bottom right-0" />
              </div>
              <button className="w-10 h-10 rounded-full bg-[#4CAF85] text-white flex items-center justify-center absolute bottom-6 left-6 transition-transform group-hover:translate-x-2 shadow-md z-10">
                <ArrowRight size={18} />
              </button>
            </div>
            {/* Card 4 */}
            {/* <div className="bg-[#F6F0FE] rounded-3xl p-8 pb-32 xl:pb-8 xl:min-h-[280px] relative overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
              <h3 className="text-[#9B51E0] text-[20px] font-bold mb-2">Pest<br />Control</h3>
              <p className="text-[14px] text-[#2D2422] mb-12 relative z-10 w-[70%]">Safe, quick and handled professionally.</p>
              <div className="absolute bottom-[-10%] right-[-10%] w-[160px] h-[160px] md:w-[200px] md:h-[200px] xl:w-[160px] xl:h-[160px]">
                <Image src="/images/about/about_pest_control_spray_1777741974315.png" fill alt="Pest control" className="object-contain object-bottom right-0" />
              </div>
              <button className="w-10 h-10 rounded-full bg-[#9B51E0] text-white flex items-center justify-center absolute bottom-6 left-6 transition-transform group-hover:translate-x-2 shadow-md z-10">
                <ArrowRight size={18} />
              </button>
            </div> */}
          </div>
        </Container>
      </section>

      {/* Why We're Different Section */}
      <section className="py-20 bg-white px-5">
        <Container isMaxWidth>
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-[35%] w-full">
              <p className="text-[12px] font-bold text-[#FF7700] tracking-wider uppercase mb-4">Why We're Different</p>
              <h2 className="text-[2.8rem] lg:text-[3.2rem] font-extrabold leading-[1.1] text-[#2D2422] mb-10" style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}>
                We remove the friction. <span className="text-[#FF7700]">Completely.</span>
              </h2>
              <ul className="flex flex-col gap-5">
                {[
                  "Few-click booking",
                  "At-home everything",
                  "Trusted professionals",
                  "Pickup & delivery built-in"
                ].map(item => (
                  <li key={item} className="flex items-center gap-4">
                    <div className="w-7 h-7 rounded-full bg-[#FF7700] text-white flex items-center justify-center shrink-0">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span className="text-[1.1rem] font-bold text-[#2D2422]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-[65%] w-full relative h-[400px] lg:h-[500px] rounded-[40px] bg-[#FFF8F3] flex items-end justify-center pt-10 px-4 mt-10 lg:mt-0">
              {/* Central image */}
              <div className="relative w-full max-w-[500px] h-[90%]">
                <Image src="/images/about/about_relaxing_woman_1777741986971.png" fill alt="Relaxing woman" className="object-contain object-bottom" priority />
              </div>
              {/* Floating pills */}
              <div className="absolute top-[10%] left-[0%] lg:left-[5%] bg-white rounded-full px-4 lg:px-5 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.06)] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FFF3E5] flex items-center justify-center text-[#FF7700]"><CalendarCheck size={18} /></div>
                <div><p className="text-[13px] lg:text-[14px] font-bold text-[#2D2422]">Easy booking</p><p className="text-[11px] lg:text-[12px] text-[#6B5E5B]">Done in seconds</p></div>
              </div>
              <div className="absolute bottom-[15%] left-[-5%] lg:left-[0%] bg-white rounded-full px-4 lg:px-5 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.06)] flex items-center gap-3 z-10">
                <div className="w-10 h-10 rounded-full bg-[#FFF3E5] flex items-center justify-center text-[#FF7700]"><ShieldCheck size={18} /></div>
                <div><p className="text-[13px] lg:text-[14px] font-bold text-[#2D2422]">Verified experts</p><p className="text-[11px] lg:text-[12px] text-[#6B5E5B]">You can trust</p></div>
              </div>
              <div className="absolute top-[15%] right-[0%] lg:right-[5%] bg-white rounded-full px-4 lg:px-5 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.06)] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FFF3E5] flex items-center justify-center text-[#FF7700]"><Clock size={18} /></div>
                <div><p className="text-[13px] lg:text-[14px] font-bold text-[#2D2422]">On-time service</p><p className="text-[11px] lg:text-[12px] text-[#6B5E5B]">Always</p></div>
              </div>
              <div className="absolute bottom-[20%] right-[-5%] lg:right-[0%] bg-white rounded-full px-4 lg:px-5 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.06)] flex items-center gap-3 z-10">
                <div className="w-10 h-10 rounded-full bg-[#FFF3E5] flex items-center justify-center text-[#FF7700]"><Home size={18} /></div>
                <div><p className="text-[13px] lg:text-[14px] font-bold text-[#2D2422]">100% at-home</p><p className="text-[11px] lg:text-[12px] text-[#6B5E5B]">Zero hassle</p></div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Our Vision & CTA */}
      <section className="py-24 pb-32 bg-white px-5">
        <Container isMaxWidth>
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-[35%] w-full pt-10">
              <p className="text-[12px] font-bold text-[#FF7700] tracking-wider uppercase mb-4">Our Vision</p>
              <h2 className="text-[2.8rem] lg:text-[3.2rem] font-extrabold leading-[1.1] text-[#2D2422] mb-12" style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}>
                A future where<br />clean feels <span className="text-[#FF7700]">effortless.</span>
              </h2>
              <div className="flex gap-6 lg:gap-8">
                <div className="flex flex-col items-center gap-3 text-center w-24">
                  <div className="text-[#FF7700]"><Heart size={28} strokeWidth={1.5} /></div>
                  <p className="text-[13px] font-bold text-[#2D2422] leading-tight mt-2">Home services<br />feel invisible</p>
                </div>
                <div className="flex flex-col items-center gap-3 text-center w-24">
                  <div className="text-[#FF7700]"><Sparkles size={28} strokeWidth={1.5} /></div>
                  <p className="text-[13px] font-bold text-[#2D2422] leading-tight mt-2">Everything<br />just works</p>
                </div>
                <div className="flex flex-col items-center gap-3 text-center w-24">
                  <div className="text-[#FF7700]"><Clock size={28} strokeWidth={1.5} /></div>
                  <p className="text-[13px] font-bold text-[#2D2422] leading-tight mt-2">Your time<br />stays yours</p>
                </div>
              </div>
            </div>
            <div className="lg:w-[65%] w-full bg-[#FF7700] rounded-[40px] p-10 lg:p-16 relative flex flex-col justify-center min-h-[400px]">
              <h2 className="text-[2.8rem] lg:text-[3.5rem] font-extrabold text-white leading-[1.1] mb-6" style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}>
                Relax.<br />We've got it from here.
              </h2>
              <p className="text-[1.1rem] text-white/90 mb-10 lg:w-[60%]">
                Book once. Experience the difference. Never go back to the old way again.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 relative z-20">
                <Link href="/services" className="bg-[#2D2422] text-white rounded-full px-8 py-4 font-bold text-[15px] flex items-center justify-center gap-2 hover:bg-black transition-colors">
                  Book a Service <ArrowRight size={18} />
                </Link>
                <Link href="/services" className="bg-white text-[#FF7700] rounded-full px-8 py-4 font-bold text-[15px] flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                  Explore Services <ArrowRight size={18} />
                </Link>
              </div>
              {/* Phone mockup on the right side */}
              <div className="hidden lg:block absolute bottom-0 right-[5%] w-[260px] h-[90%] bg-white rounded-t-[40px] shadow-2xl border-[8px] border-b-0 border-[#2D2422] overflow-hidden translate-y-[0px]">
                <div className="p-5 bg-white h-full flex flex-col pt-8">
                  <div className="w-1/2 h-6 bg-[#2D2422] rounded-b-2xl absolute top-0 left-1/4 z-20"></div>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-[11px] text-[#6B5E5B]">Hello, Neha 👋</p>
                      <p className="text-[14px] font-bold text-[#2D2422] leading-tight mt-1">What can we help<br />you with today?</p>
                    </div>
                  </div>
                  {/* Quick icons inside phone */}
                  <div className="grid grid-cols-4 gap-2 mt-8">
                    <div className="flex flex-col items-center gap-2"><div className="w-10 h-10 bg-[#FFF3E5] rounded-xl flex items-center justify-center text-[#FF7700]"><Package size={16} /></div><p className="text-[9px] font-bold text-center">Laundry</p></div>
                    {/* <div className="flex flex-col items-center gap-2"><div className="w-10 h-10 bg-[#FFF3E5] rounded-xl flex items-center justify-center text-[#FF7700]"><Home size={16} /></div><p className="text-[9px] font-bold text-center leading-[1.1]">Home<br />Cleaning</p></div> */}
                    <div className="flex flex-col items-center gap-2"><div className="w-10 h-10 bg-[#FFF3E5] rounded-xl flex items-center justify-center text-[#FF7700]"><Car size={16} /></div><p className="text-[9px] font-bold text-center leading-[1.1]">Car<br />Wash</p></div>
                    {/* <div className="flex flex-col items-center gap-2"><div className="w-10 h-10 bg-[#FFF3E5] rounded-xl flex items-center justify-center text-[#FF7700]"><Bug size={16} /></div><p className="text-[9px] font-bold text-center leading-[1.1]">Pest<br />Control</p></div> */}
                  </div>
                  {/* Bottom image decoration */}
                  <div className="mt-auto relative h-32 -mx-5 mb-0 bg-white">
                    <Image src="/images/about/about_home_cleaning_sofa_1777741933846.png" fill alt="Plant" className="object-cover object-bottom opacity-80" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
