"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/sections/Footer";
import { SatoshiFont, WixMadeForDisplayFont } from "@/app/fonts";
import {
  ArrowRight,
  Clock,
  Star,
  ShieldCheck,
  Heart,
  Smartphone,
  Sparkles,
  Package,
  Car,
  Box,
  BadgeCheck,
  MapPin,
  Search,
  ChevronRight,
} from "lucide-react";
import Container from "@/app/components/layout/Container";
import { Fraunces } from "next/font/google";

const fraunces = Fraunces({ subsets: ["latin"], style: ["normal", "italic"] });

const heroSlides = [
  {
    image: "/images/services/laundry.png",
    alt: "Laundry Service",
  },
  {
    image: "/images/services/car-wash.png",
    alt: "Car Wash",
  },
  {
    image: "/images/services/house-help.png",
    alt: "House Help",
  },
];

export default function AboutPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isShuffling, setIsShuffling] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsShuffling(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        setIsShuffling(false);
      }, 500);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="bg-[var(--ground)] text-[var(--ink)] overflow-clip"
      style={{ fontFamily: SatoshiFont.style.fontFamily }}
    >
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-10">
        <Container isMaxWidth className="px-[clamp(20px,5vw,56px)]">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 justify-between mr-[90px]">
            <div className="lg:w-[50%]">
              <p className="text-[var(--gold)] uppercase text-[22px] font-bold tracking-[0.2em] mb-6">
                About Clean7
              </p>
              <h1
                className={`text-[clamp(32px,8vw,72px)] text-[var(--ink)] mb-6 leading-[1.1] flex flex-col ${fraunces.className}`}
              >
                <span className="whitespace-nowrap">More than clean.</span>
                <span className="whitespace-nowrap">
                  It&apos;s{" "}
                  <span className="text-[var(--gold)] italic">care</span> you
                  can
                </span>
                <span className="whitespace-nowrap">count on.</span>
              </h1>
              <p className="text-[var(--ink-soft)] text-sm md:text-base mb-10 max-w-md leading-relaxed">
                Clean7 was built to make laundry and car care feel effortless,
                reliable, and thoughtfully handled. From pickup to delivery,
                every detail is designed to save time while delivering premium
                results.
              </p>
            </div>

            <div className="lg:w-[40%] relative h-[400px] lg:h-[500px] lg:mt-0 w-full rounded-2xl md:rounded-3xl group flex items-center justify-center">
              <div className="relative w-[280px] h-[350px] md:w-[300px] md:h-[380px] lg:w-[320px] lg:h-[420px]">
                {heroSlides.map((slide, idx) => {
                  const stackIndex =
                    (idx - currentSlide + heroSlides.length) %
                    heroSlides.length;

                  let cardClass = "";
                  let overlayOpacity = "opacity-30";

                  if (isShuffling) {
                    if (stackIndex === 0) {
                      cardClass =
                        "z-40 translate-x-[110%] scale-[0.9] rotate-[12deg] opacity-100";
                      overlayOpacity = "opacity-30";
                    } else if (stackIndex === 1) {
                      cardClass =
                        "z-30 translate-x-0 scale-100 rotate-0 opacity-100";
                      overlayOpacity = "opacity-0";
                    } else {
                      cardClass =
                        "z-20 translate-x-[24px] -translate-y-[16px] scale-[0.95] rotate-[6deg] opacity-90";
                      overlayOpacity = "opacity-30";
                    }
                  } else {
                    if (stackIndex === 0) {
                      cardClass =
                        "z-30 translate-x-0 scale-100 rotate-0 opacity-100";
                      overlayOpacity = "opacity-0";
                    } else if (stackIndex === 1) {
                      cardClass =
                        "z-20 translate-x-[24px] -translate-y-[16px] scale-[0.95] rotate-[6deg] opacity-90";
                      overlayOpacity = "opacity-30";
                    } else {
                      cardClass =
                        "z-10 translate-x-[48px] -translate-y-[32px] scale-[0.9] rotate-[12deg] opacity-80";
                      overlayOpacity = "opacity-50";
                    }
                  }

                  return (
                    <div
                      key={idx}
                      className={`absolute inset-0 rounded-2xl overflow-hidden transition-all duration-500 ease-in-out origin-bottom-right ${cardClass}`}
                    >
                      <Image
                        src={slide.image}
                        alt={slide.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                      <div
                        className={`absolute inset-0 bg-black transition-opacity duration-500 pointer-events-none ${overlayOpacity}`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats Bar */}
      <section className="my-10">
        <Container isMaxWidth className="px-[clamp(20px,5vw,56px)]">
          <div className="bg-[var(--ground-soft)] rounded-3xl p-8 md:p-10 flex flex-wrap lg:flex-nowrap justify-between gap-8 md:gap-10">
            <div className="flex items-center gap-5 w-full md:w-[45%] lg:w-auto">
              <div className="w-12 h-12 rounded-full border border-[var(--gold)] text-[var(--gold)] flex items-center justify-center shrink-0">
                <Clock size={20} strokeWidth={1.5} />
              </div>
              <div>
                <p
                  className={`text-[var(--ink)] font-bold text-2xl ${fraunces.className}`}
                >
                  24 hr
                </p>
                <p className="text-[var(--ink-soft)] text-[11px] uppercase tracking-wider mt-1">
                  Turnaround
                </p>
              </div>
            </div>
            <div className="hidden lg:block w-px bg-[var(--line)] h-12 self-center"></div>
            <div className="flex items-center gap-5 w-full md:w-[45%] lg:w-auto">
              <div className="w-12 h-12 rounded-full border border-[var(--gold)] text-[var(--gold)] flex items-center justify-center shrink-0">
                <Box size={20} strokeWidth={1.5} />
              </div>
              <div>
                <p
                  className={`text-[var(--ink)] font-bold text-2xl ${fraunces.className}`}
                >
                  40k+
                </p>
                <p className="text-[var(--ink-soft)] text-[11px] uppercase tracking-wider mt-1">
                  Garments handled monthly
                </p>
              </div>
            </div>
            <div className="hidden lg:block w-px bg-[var(--line)] h-12 self-center"></div>
            <div className="flex items-center gap-5 w-full md:w-[45%] lg:w-auto">
              <div className="w-12 h-12 rounded-full border border-[var(--gold)] text-[var(--gold)] flex items-center justify-center shrink-0">
                <Star size={20} strokeWidth={1.5} />
              </div>
              <div>
                <p
                  className={`text-[var(--ink)] font-bold text-2xl ${fraunces.className}`}
                >
                  4.9
                </p>
                <p className="text-[var(--ink-soft)] text-[11px] uppercase tracking-wider mt-1">
                  Average rating
                </p>
              </div>
            </div>
            <div className="hidden lg:block w-px bg-[var(--line)] h-12 self-center"></div>
            <div className="flex items-center gap-5 w-full md:w-[45%] lg:w-auto">
              <div className="w-12 h-12 rounded-full border border-[var(--gold)] text-[var(--gold)] flex items-center justify-center shrink-0">
                <Heart size={20} strokeWidth={1.5} />
              </div>
              <div>
                <p
                  className={`text-[var(--ink)] font-bold text-2xl ${fraunces.className}`}
                >
                  Premium
                </p>
                <p className="text-[var(--ink-soft)] text-[11px] uppercase tracking-wider mt-1">
                  Care experience
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Who We Are */}
      <section className="py-20">
        <Container isMaxWidth className="px-[clamp(20px,5vw,56px)]">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2 relative h-[350px] md:h-[450px] w-full rounded-3xl overflow-hidden">
              <Image
                src="/images/about/delivery-bike.png"
                fill
                className="object-cover"
                alt="Clean7 Delivery Bike"
              />
            </div>
            <div className="lg:w-1/2 lg:pl-10">
              <p className="text-[var(--gold)] uppercase text-[10px] font-bold tracking-[0.2em] mb-4">
                Who We Are
              </p>
              <h2
                className={`text-4xl md:text-5xl text-[var(--ink)] mb-8 leading-[1.1] ${fraunces.className}`}
              >
                Built on purpose.
                <br />
                Driven by care.
              </h2>
              <div className="text-[var(--ink-soft)] text-sm md:text-[15px] space-y-6 leading-relaxed max-w-lg">
                <p>
                  Clean7 began with a simple idea — everyday services should
                  feel premium. We saw how inconsistent laundry and car wash
                  experiences could be, so we created a service focused on
                  quality, convenience, and consistency from start to finish.
                </p>
                <p>
                  Today, we continue improving every detail to create an
                  experience customers genuinely enjoy using.
                </p>
              </div>
              <p
                className={`text-[var(--gold)] text-xl mt-10 ${fraunces.className} italic`}
              >
                The Clean7 Team 💛
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-gradient-to-b from-[var(--ground)] to-[var(--ground-soft)]">
        <Container isMaxWidth className="px-[clamp(20px,5vw,56px)]">
          <div className="text-center mb-16">
            <p className="text-[var(--gold)] uppercase text-[10px] font-bold tracking-[0.2em] mb-4">
              Why Choose Us
            </p>
            <h2
              className={`text-3xl md:text-5xl text-[var(--ink)] ${fraunces.className}`}
            >
              Care in every detail.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[var(--ground-soft)] border border-transparent rounded-3xl p-8 flex flex-col items-center text-center transition-transform hover:-translate-y-1 hover:border-[var(--gold)]/20">
              <div className="text-[var(--gold)] mb-6">
                <BadgeCheck size={36} strokeWidth={1.5} />
              </div>
              <h3 className="text-[var(--ink)] font-bold text-[15px] mb-3">
                Premium Quality
              </h3>
              <p className="text-[var(--ink-soft)] text-xs leading-relaxed">
                Fabric-safe cleaning and careful handling for every order.
              </p>
            </div>
            <div className="bg-[var(--ground-soft)] border border-transparent rounded-3xl p-8 flex flex-col items-center text-center transition-transform hover:-translate-y-1 hover:border-[var(--gold)]/20">
              <div className="text-[var(--gold)] mb-6">
                <Car size={36} strokeWidth={1.5} />
              </div>
              <h3 className="text-[var(--ink)] font-bold text-[15px] mb-3">
                Pickup & Delivery
              </h3>
              <p className="text-[var(--ink-soft)] text-xs leading-relaxed">
                Doorstep convenience designed around your schedule.
              </p>
            </div>
            <div className="bg-[var(--ground-soft)] border border-transparent rounded-3xl p-8 flex flex-col items-center text-center transition-transform hover:-translate-y-1 hover:border-[var(--gold)]/20">
              <div className="text-[var(--gold)] mb-6">
                <Clock size={36} strokeWidth={1.5} />
              </div>
              <h3 className="text-[var(--ink)] font-bold text-[15px] mb-3">
                Fast Turnaround
              </h3>
              <p className="text-[var(--ink-soft)] text-xs leading-relaxed">
                Freshly cleaned and delivered back within 24 hours.
              </p>
            </div>
            <div className="bg-[var(--ground-soft)] border border-transparent rounded-3xl p-8 flex flex-col items-center text-center transition-transform hover:-translate-y-1 hover:border-[var(--gold)]/20">
              <div className="text-[var(--gold)] mb-6">
                <Heart size={36} strokeWidth={1.5} />
              </div>
              <h3 className="text-[var(--ink)] font-bold text-[15px] mb-3">
                Thoughtful Service
              </h3>
              <p className="text-[var(--ink-soft)] text-xs leading-relaxed">
                Attention to detail in every fold, finish, and delivery.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Our Process */}
      {/* Our Process - Premium Dark Theme */}
      <section className="py-32 bg-[#0B0B0C] relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[var(--gold)]/10 blur-[120px] pointer-events-none rounded-full"></div>

        <Container
          isMaxWidth
          className="px-[clamp(20px,5vw,56px)] relative z-10"
        >
          <div className="text-center mb-24 flex flex-col items-center">
            {/* Glowing Pill Badge */}
            <div className="flex items-center gap-4 mb-8">
              <div className="border border-[var(--gold)]/30 rounded-full px-6 py-1.5 bg-[var(--gold)]/5 relative overflow-hidden">
                <p className="text-[var(--gold)] uppercase text-[11px] font-bold tracking-[0.2em] relative z-10 mt-0.5">
                  Our Process
                </p>
              </div>
            </div>

            <h2
              className="text-[40px] md:text-[56px] text-white max-w-4xl mx-auto leading-[1.1] mb-6 font-semibold"
              style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
            >
              How Clean7 Delivers <br className="hidden md:block" />
              <span className="text-[var(--gold)]">Premium</span> Laundry & Car
              Wash <br className="hidden md:block" />
              <span className="text-[var(--gold)]">Services.</span>
            </h2>

            <p className="text-[#A3A3A3] text-lg md:text-xl tracking-wide mb-12">
              Thoughtful. Reliable. Consistent. Every time.
            </p>

            {/* Glowing divider line */}
            <div className="w-[300px] md:w-[700px] h-[1px] bg-gradient-to-r from-transparent via-[var(--gold)]/30 to-transparent relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-[var(--gold)] shadow-[0_0_15px_var(--gold)]"></div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-3 xl:gap-6 items-stretch justify-between relative">
            {/* Step 1 */}
            <div className="bg-[#141415] border border-white/5 rounded-3xl p-6 xl:p-8 flex-1 flex flex-col items-center text-center shadow-2xl relative overflow-hidden w-full lg:w-auto min-h-[340px] group transition-all hover:bg-[#1A1A1B]">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[3px] bg-[var(--gold)]/80 shadow-[0_0_20px_var(--gold)] opacity-70 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute top-6 left-6 w-9 h-9 rounded-full bg-[var(--gold)] text-[#111] text-[13px] font-extrabold flex items-center justify-center shadow-[0_0_15px_var(--gold)]">
                01
              </div>
              <div className="w-28 h-28 xl:w-32 xl:h-32 relative mt-4 mb-8">
                <Image
                  src="/images/about/process1.png"
                  fill
                  className="object-contain drop-shadow-2xl"
                  alt="Schedule Pickup"
                />
              </div>
              <h3 className="text-white font-bold text-[17px] mb-3 mt-auto">
                Schedule Pickup
              </h3>
              <p className="text-[#858585] text-[13px] leading-relaxed">
                Choose a pickup time that works best for you.
              </p>
            </div>

            {/* Arrow 1 */}
            <div className="hidden lg:flex items-center justify-center -mx-2 xl:-mx-4 z-20">
              <div className="w-8 h-8 rounded-full bg-[var(--gold)] flex items-center justify-center text-[#111] shadow-[0_0_15px_var(--gold)]">
                <ChevronRight size={20} strokeWidth={3.5} className="ml-0.5" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#141415] border border-white/5 rounded-3xl p-6 xl:p-8 flex-1 flex flex-col items-center text-center shadow-2xl relative overflow-hidden w-full lg:w-auto min-h-[340px] group transition-all hover:bg-[#1A1A1B]">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[3px] bg-[var(--gold)]/80 shadow-[0_0_20px_var(--gold)] opacity-70 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute top-6 left-6 w-9 h-9 rounded-full bg-[var(--gold)] text-[#111] text-[13px] font-extrabold flex items-center justify-center shadow-[0_0_15px_var(--gold)]">
                02
              </div>
              <div className="w-28 h-28 xl:w-32 xl:h-32 relative mt-4 mb-8">
                <Image
                  src="/images/about/process2.png"
                  fill
                  className="object-contain drop-shadow-2xl"
                  alt="We Collect"
                />
              </div>
              <h3 className="text-white font-bold text-[17px] mb-3 mt-auto">
                We Collect
              </h3>
              <p className="text-[#858585] text-[13px] leading-relaxed">
                Our team arrives at your doorstep for pickup.
              </p>
            </div>

            {/* Arrow 2 */}
            <div className="hidden lg:flex items-center justify-center -mx-2 xl:-mx-4 z-20">
              <div className="w-8 h-8 rounded-full bg-[var(--gold)] flex items-center justify-center text-[#111] shadow-[0_0_15px_var(--gold)]">
                <ChevronRight size={20} strokeWidth={3.5} className="ml-0.5" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#141415] border border-white/5 rounded-3xl p-6 xl:p-8 flex-1 flex flex-col items-center text-center shadow-2xl relative overflow-hidden w-full lg:w-auto min-h-[340px] group transition-all hover:bg-[#1A1A1B]">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[3px] bg-[var(--gold)]/80 shadow-[0_0_20px_var(--gold)] opacity-70 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute top-6 left-6 w-9 h-9 rounded-full bg-[var(--gold)] text-[#111] text-[13px] font-extrabold flex items-center justify-center shadow-[0_0_15px_var(--gold)]">
                03
              </div>
              <div className="w-28 h-28 xl:w-32 xl:h-32 relative mt-4 mb-8">
                <Image
                  src="/images/about/process3.png"
                  fill
                  className="object-contain drop-shadow-2xl"
                  alt="Professional Care"
                />
              </div>
              <h3 className="text-white font-bold text-[17px] mb-3 mt-auto">
                Professional Care
              </h3>
              <p className="text-[#858585] text-[13px] leading-relaxed">
                Items are cleaned using premium products and careful techniques.
              </p>
            </div>

            {/* Arrow 3 */}
            <div className="hidden lg:flex items-center justify-center -mx-2 xl:-mx-4 z-20">
              <div className="w-8 h-8 rounded-full bg-[var(--gold)] flex items-center justify-center text-[#111] shadow-[0_0_15px_var(--gold)]">
                <ChevronRight size={20} strokeWidth={3.5} className="ml-0.5" />
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-[#141415] border border-white/5 rounded-3xl p-6 xl:p-8 flex-1 flex flex-col items-center text-center shadow-2xl relative overflow-hidden w-full lg:w-auto min-h-[340px] group transition-all hover:bg-[#1A1A1B]">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[3px] bg-[var(--gold)]/80 shadow-[0_0_20px_var(--gold)] opacity-70 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute top-6 left-6 w-9 h-9 rounded-full bg-[var(--gold)] text-[#111] text-[13px] font-extrabold flex items-center justify-center shadow-[0_0_15px_var(--gold)]">
                04
              </div>
              <div className="w-28 h-28 xl:w-32 xl:h-32 relative mt-4 mb-8">
                <Image
                  src="/images/about/process4.png"
                  fill
                  className="object-contain drop-shadow-2xl"
                  alt="Quality Check"
                />
              </div>
              <h3 className="text-white font-bold text-[17px] mb-3 mt-auto">
                Quality Check
              </h3>
              <p className="text-[#858585] text-[13px] leading-relaxed">
                Every order is inspected, folded, packed, and prepared
                carefully.
              </p>
            </div>

            {/* Arrow 4 */}
            <div className="hidden lg:flex items-center justify-center -mx-2 xl:-mx-4 z-20">
              <div className="w-8 h-8 rounded-full bg-[var(--gold)] flex items-center justify-center text-[#111] shadow-[0_0_15px_var(--gold)]">
                <ChevronRight size={20} strokeWidth={3.5} className="ml-0.5" />
              </div>
            </div>

            {/* Step 5 */}
            <div className="bg-[#141415] border border-white/5 rounded-3xl p-6 xl:p-8 flex-1 flex flex-col items-center text-center shadow-2xl relative overflow-hidden w-full lg:w-auto min-h-[340px] group transition-all hover:bg-[#1A1A1B]">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[3px] bg-[var(--gold)]/80 shadow-[0_0_20px_var(--gold)] opacity-70 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute top-6 left-6 w-9 h-9 rounded-full bg-[var(--gold)] text-[#111] text-[13px] font-extrabold flex items-center justify-center shadow-[0_0_15px_var(--gold)]">
                05
              </div>
              <div className="w-28 h-28 xl:w-32 xl:h-32 relative mt-4 mb-8">
                <Image
                  src="/images/about/process5.png"
                  fill
                  className="object-contain drop-shadow-2xl"
                  alt="Delivered Back"
                />
              </div>
              <h3 className="text-white font-bold text-[17px] mb-3 mt-auto">
                Delivered Back
              </h3>
              <p className="text-[#858585] text-[13px] leading-relaxed">
                Fresh, clean, and delivered right on time.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Focus / Mission / Vision Cards */}
      <section className="py-10">
        <Container isMaxWidth className="px-[clamp(20px,5vw,56px)]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Focus Card */}
            <div className="bg-[var(--ground-soft)] rounded-[32px] p-8 md:p-10 flex flex-col h-[460px] md:h-[650px] overflow-hidden relative">
              <p className="text-[var(--gold)] uppercase text-[10px] font-bold tracking-[0.2em] mb-4">
                Our Focus
              </p>
              <h3
                className={`text-3xl text-[var(--ink)] mb-10 ${fraunces.className}`}
              >
                Designed around
                <br />
                modern living.
              </h3>

              <div className="flex gap-4 mb-6 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-[var(--line)] text-[var(--gold)] flex items-center justify-center shrink-0">
                  <Smartphone size={18} />
                </div>
                <div>
                  <p className="text-[var(--ink)] text-[13px] font-bold mb-1">
                    Convenience First
                  </p>
                  <p className="text-[var(--ink-soft)] text-[11px] leading-relaxed">
                    Pickup, tracking, and delivery designed to fit seamlessly
                    into your routine.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-[var(--line)] text-[var(--gold)] flex items-center justify-center shrink-0">
                  <Sparkles size={18} />
                </div>
                <div>
                  <p className="text-[var(--ink)] text-[13px] font-bold mb-1">
                    Premium Experience
                  </p>
                  <p className="text-[var(--ink-soft)] text-[11px] leading-relaxed">
                    From cleaning quality to packaging, every detail is crafted
                    to feel premium.
                  </p>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-64 md:h-80">
                <Image
                  src="/images/about/about_focus_1782044614704.png"
                  fill
                  className="object-cover object-bottom"
                  alt="Focus"
                />
              </div>
            </div>

            {/* Mission Card */}
            <div className="bg-[var(--ground-soft)] rounded-[32px] p-8 md:p-10 flex flex-col h-[460px] md:h-[650px] overflow-hidden relative">
              <p className="text-[var(--gold)] uppercase text-[10px] font-bold tracking-[0.2em] mb-4">
                Our Mission
              </p>
              <p className="text-[var(--ink-soft)] text-[13px] leading-[1.8] relative z-10 md:w-[90%]">
                To simplify everyday care services through reliable, premium
                experiences that save people time and deliver consistent
                quality.
              </p>
              <div className="absolute bottom-0 left-0 right-0 h-[300px] md:h-[450px]">
                <Image
                  src="/images/about/about_mission_1782044627703.png"
                  fill
                  className="object-cover object-bottom"
                  alt="Mission"
                />
              </div>
            </div>

            {/* Vision Card */}
            <div className="bg-[var(--ground-soft)] rounded-[32px] p-8 md:p-10 flex flex-col h-[460px] md:h-[650px] overflow-hidden relative">
              <p className="text-[var(--gold)] uppercase text-[10px] font-bold tracking-[0.2em] mb-4">
                Our Vision Ahead
              </p>
              <div className="text-[var(--ink-soft)] text-[13px] leading-[1.8] relative z-10 md:w-[95%] space-y-4">
                <p>
                  We envision Clean7 becoming the most trusted premium care
                  platform for modern households — combining thoughtful service,
                  technology, and convenience into one seamless experience.
                </p>
                <p>
                  As we grow, our focus remains the same: exceptional care,
                  consistent quality, and experiences customers genuinely love.
                </p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-[250px] md:h-[350px]">
                <Image
                  src="/images/about/about_vision_1782044639738.png"
                  fill
                  className="object-cover object-bottom"
                  alt="Vision"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 mb-10">
        <Container isMaxWidth className="px-[clamp(20px,5vw,56px)]">
          <div className="bg-gradient-to-r from-[var(--ground-soft)] to-[var(--ground)] rounded-[40px] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between relative overflow-hidden min-h-[300px] md:min-h-[250px]">
            <div className="relative z-10 mb-10 md:mb-0 text-center md:text-left">
              <h2
                className={`text-4xl md:text-5xl text-[var(--ink)] mb-4 leading-tight ${fraunces.className}`}
              >
                Laundry that{" "}
                <span className="text-[var(--gold)] italic">
                  fits your life.
                </span>
              </h2>
              <p className="text-[var(--ink-soft)] text-[14px]">
                Less time on chores. More time for what matters.
              </p>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-4 mt-16 md:mt-0">
              <Link
                href="/services"
                className="bg-[var(--gold)] text-[var(--ground)] px-8 py-4 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-[var(--gold-bright)] transition-colors whitespace-nowrap"
              >
                Schedule your first pickup{" "}
                <ArrowRight size={16} strokeWidth={2.5} />
              </Link>
              <p className="text-[var(--ink-soft)] text-[14px]">
                Quick. Easy. Reliable.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
