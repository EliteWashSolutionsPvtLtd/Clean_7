"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  TrendingUp,
  BarChart3,
  Users,
  ShieldCheck,
  Smartphone,
  Target,
  Car,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  X,
  HelpCircle,
  Briefcase,
  Download,
  PieChart,
} from "lucide-react";
import { franchiseFaqs } from "./faqs";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) => {
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onWheel={(e) => e.stopPropagation()}
    >
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-ground border border-line rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl animate-modalSlideUp">
        <div className="shrink-0 flex items-center justify-between p-6 md:p-8 border-b border-line bg-ground-soft rounded-t-3xl">
          <h2 className="text-[clamp(24px,3vw,32px)] font-serif text-ink tracking-tight">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-line/50 rounded-full transition-colors text-ink-soft hover:text-ink"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div
          className="flex-1 overflow-y-auto overscroll-contain modal-scrollbar p-6 md:p-8 text-ink-soft space-y-8 bg-ground rounded-b-3xl"
          onWheel={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default function FranchiseClient() {
  const [activeModal, setActiveModal] = useState<
    "industry" | "financials" | "investor" | null
  >(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="pt-24 pb-16 min-h-screen font-sans bg-ground selection:bg-gold/30">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative px-6 md:px-14 lg:px-14 mx-auto max-w-[1300px] py-10 lg:py-14"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-8 items-center">
          <div className="space-y-8 max-w-[620px] relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-gold"></div>
              <span className="text-[12.5px] tracking-[0.14em] uppercase text-ink-soft font-medium">
                Franchise Opportunity
              </span>
            </div>

            <h1 className="font-serif text-[clamp(48px,6.4vw,84px)] leading-[1.02] tracking-tight text-ink">
              <span className="block">
                Own a{" "}
                <em className="italic font-light text-gold-bright pr-2">
                  Clean7
                </em>
              </span>
              <span className="block">Franchise.</span>
            </h1>

            <p className="text-[15px] md:text-[17px] leading-[1.7] text-ink-soft max-w-[440px]">
              Clean7 is building a modern home services brand that combines
              premium laundry, doorstep car wash, home cleaning, and pest
              control into one seamless customer experience. Become an early
              franchise partner and grow with a brand designed for long-term
              expansion.
            </p>

            {/* Mobile Image (Visible only on mobile/tablet) */}
            <div className="block lg:hidden relative w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden group border border-line bg-ground-soft shadow-2xl">
              <Image
                src="/images/franchise/store.png"
                alt="Clean7 Franchise Storefront"
                fill
                className="object-cover transform group-hover:scale-[1.03] transition-transform duration-[1.5s] ease-out"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-50" />
            </div>

            <div className="flex flex-col sm:flex-row gap-6 pt-6 items-center">
              <button
                onClick={() =>
                  document
                    .getElementById("apply")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="w-full sm:w-auto px-[30px] py-[16px] bg-gold hover:bg-gold-bright text-ground rounded-full font-medium text-[14.5px] tracking-[0.02em] transition-transform hover:-translate-y-[1px] flex items-center justify-center gap-2 group shadow-xl shadow-gold/20"
              >
                Apply for Franchise
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button className="w-full sm:w-auto px-[30px] py-[16px] border border-gold/30 bg-transparent hover:bg-gold/5 text-ink rounded-full font-medium text-[14.5px] tracking-[0.02em] transition-colors flex items-center justify-center gap-2">
                <Download className="w-4 h-4 text-gold-bright" /> Download
                Brochure
              </button>
            </div>

            <div className="pt-12 mt-4 flex items-center gap-8 md:gap-12 opacity-90">
              <div className="flex flex-col gap-1.5">
                <div className="font-serif text-[26px] font-medium text-gold-bright flex items-center gap-2">
                  High <TrendingUp className="w-5 h-5 text-gold-bright/60" />
                </div>
                <div className="text-[12px] text-ink-soft tracking-[0.02em]">
                  Market Demand
                </div>
              </div>
              <div className="w-[1px] h-[36px] bg-line"></div>
              <div className="flex flex-col gap-1.5">
                <div className="font-serif text-[26px] font-medium text-gold-bright flex items-center gap-2">
                  Proven <ShieldCheck className="w-5 h-5 text-gold-bright/60" />
                </div>
                <div className="text-[12px] text-ink-soft tracking-[0.02em]">
                  Tested operations
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block relative w-full lg:h-[400px] rounded-3xl overflow-hidden group border border-line bg-ground-soft shadow-2xl lg:-mt-30">
            <Image
              src="/images/franchise/store.png"
              alt="Clean7 Franchise Storefront"
              fill
              className="object-cover transform group-hover:scale-[1.03] transition-transform duration-[1.5s] ease-out"
              priority
            />
            {/* Premium overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-50" />
          </div>
        </div>
      </motion.section>

      {/* Why This Opportunity Exists */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-ground-soft py-24 md:py-32 border-y border-line"
      >
        <div className="px-6 md:px-14 lg:px-14 mx-auto max-w-[1300px]">
          <div className="max-w-[720px] mb-16 space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-gold"></div>
              <span className="text-[12.5px] tracking-[0.14em] uppercase text-ink-soft font-medium">
                Why Now?
              </span>
            </div>
            <h2 className="text-[clamp(36px,4.5vw,64px)] leading-[1.05] tracking-tight font-serif text-ink">
              Home Services Are Entering Their{" "}
              <em className="italic font-light text-gold-bright pr-1">
                Next Growth Phase.
              </em>
            </h2>
            <p className="text-[15px] md:text-[17px] leading-[1.7] text-ink-soft max-w-[600px]">
              Across India, changing lifestyles are transforming the way people
              manage everyday household tasks. Growing urban populations,
              dual-income families, and increasingly busy schedules are driving
              demand for reliable doorstep services.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line rounded-3xl overflow-hidden border border-line shadow-sm mb-12">
            {[
              { value: "₹30K+ Cr", label: "Laundry Industry" },
              { value: "7%+", label: "Res. Cleaning Growth" },
              { value: "295M+", label: "Registered Vehicles" },
              { value: "~4-5%", label: "Organized Market" },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-8 md:p-12 bg-ground flex flex-col justify-center text-center hover:bg-ground-soft transition-colors"
              >
                <div className="text-[24px] md:text-[32px] lg:text-[42px] font-serif text-gold-bright mb-1 md:mb-3 whitespace-nowrap">
                  {stat.value}
                </div>
                <div className="text-[10px] md:text-[12px] text-ink-soft uppercase tracking-[0.05em] md:tracking-[0.1em] font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => setActiveModal("industry")}
              className="inline-flex items-center gap-3 px-[24px] py-[12px] rounded-full border border-gold/40 text-gold-bright hover:bg-gold/5 transition-colors font-medium text-[14px]"
            >
              <PieChart className="w-4 h-4" /> Learn More About The Industry
            </button>
          </div>
        </div>
      </motion.section>

      {/* Why Clean7 */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-24 md:py-32"
      >
        <div className="px-6 md:px-14 lg:px-14 mx-auto max-w-[1300px]">
          <div className="text-center mb-20 space-y-4">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-gold"></div>
              <span className="text-[12.5px] tracking-[0.14em] uppercase text-ink-soft font-medium">
                Why Franchise With Clean7?
              </span>
              <div className="w-8 h-[1px] bg-gold"></div>
            </div>
            <h2 className="text-[clamp(36px,4.5vw,56px)] leading-[1.05] tracking-tight font-serif text-ink max-w-[800px] mx-auto">
              Built for the{" "}
              <em className="italic font-light text-gold-bright pr-1">
                Next Generation
              </em>{" "}
              of Home Services.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: Target,
                title: "Multi-Service Brand",
                desc: "Serve multiple customer needs under one trusted brand, increasing lifetime value and frequency.",
              },
              {
                icon: Smartphone,
                title: "Technology-Driven",
                desc: "Digital booking, scheduling, and operational workflows simplify your day-to-day management.",
              },
              {
                icon: Sparkles,
                title: "Premium Experience",
                desc: "Designed around convenience, transparency, and professional service delivery at every step.",
              },
              {
                icon: TrendingUp,
                title: "Scalable Operations",
                desc: "Structured systems and standardized SOPs designed to support your long-term expansion.",
              },
              {
                icon: BarChart3,
                title: "Marketing Support",
                desc: "Branding, digital acquisition, and comprehensive launch assistance to build local awareness.",
              },
              {
                icon: Users,
                title: "Operational Guidance",
                desc: "Extensive training, onboarding, and ongoing field support to maintain exceptional quality.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-8 md:p-10 rounded-3xl bg-ground-soft border border-line hover:border-gold/30 hover:bg-gold/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-ground border border-line flex items-center justify-center text-gold-bright mb-8 shadow-sm">
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className="text-[20px] font-medium mb-3 text-ink tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-[15px] leading-[1.7] text-ink-soft">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Services Visuals */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-ground-soft text-ink py-24 md:py-32 border-y border-line"
      >
        <div className="px-6 md:px-14 lg:px-14 mx-auto max-w-[1300px]">
          <div className="mb-20 max-w-[600px]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-gold"></div>
              <span className="text-[12.5px] tracking-[0.14em] uppercase text-ink-soft font-medium">
                Our Services
              </span>
            </div>
            <h2 className="text-[clamp(36px,4.5vw,56px)] leading-[1.05] tracking-tight font-serif text-ink">
              One Brand. <br />
              <em className="italic font-light text-gold-bright">
                Multiple Revenue Streams.
              </em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Laundry",
                desc: "Professional garment care with pickup and delivery. High repeat usage.",
                image: "/images/services/laundry.png",
              },
              {
                title: "Car Wash",
                desc: "Doorstep vehicle cleaning designed for convenience. Subscription potential.",
                image: "/images/services/car-wash.png",
              },
              {
                title: "Home Cleaning",
                desc: "Professional deep cleaning for modern households. High order values.",
                image: "/images/services/house-help.png",
              },
            ].map((service, i) => (
              <div
                key={i}
                className="group rounded-3xl overflow-hidden border border-line bg-ground flex flex-col hover:border-gold/40 transition-colors shadow-sm"
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="p-8 flex-1 bg-ground group-hover:bg-gold/5 transition-colors flex flex-col justify-center">
                  <h3 className="text-[24px] font-serif text-gold-bright mb-3">
                    {service.title}
                  </h3>
                  <p className="text-[14px] text-ink-soft leading-[1.6]">
                    {service.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Why Investors Like This Industry */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-24 md:py-32"
      >
        <div className="px-6 md:px-14 lg:px-14 mx-auto max-w-[1300px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8">
            <div className="max-w-[500px] space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[1px] bg-gold"></div>
                <span className="text-[12.5px] tracking-[0.14em] uppercase text-ink-soft font-medium">
                  The Industry
                </span>
              </div>
              <h2 className="text-[clamp(36px,4vw,56px)] leading-[1.05] tracking-tight font-serif text-ink">
                Built Around{" "}
                <em className="italic font-light text-gold-bright">
                  Recurring
                </em>{" "}
                Consumer Needs.
              </h2>
              <p className="text-[15px] md:text-[17px] leading-[1.7] text-ink-soft mb-8">
                Investors favour the home services sector for its inherent
                frequency and resilience. These aren&apos;t luxury purchases;
                they are essential, weekly routines.
              </p>

              <button
                onClick={() => setActiveModal("investor")}
                className="inline-flex items-center gap-3 px-[24px] py-[12px] rounded-full border border-gold/40 text-gold-bright hover:bg-gold/5 transition-colors font-medium text-[14px]"
              >
                <TrendingUp className="w-4 h-4" /> View Complete Industry Report
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: "Weekly Demand",
                  desc: "Laundry is a recurring necessity.",
                },
                {
                  title: "Monthly Cleaning",
                  desc: "Generates repeat business and contracts.",
                },
                {
                  title: "Urban Growth",
                  desc: "Convenience drives organized adoption.",
                },
                {
                  title: "Cross-Selling",
                  desc: "Multiple services increase LTV.",
                },
                {
                  title: "Tech Adoption",
                  desc: "Digital tracking improves retention.",
                },
                {
                  title: "Unorganized Market",
                  desc: "Massive opportunity for brands.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl border border-line bg-ground-soft hover:bg-ground transition-colors"
                >
                  <h4 className="text-[16px] font-medium text-ink mb-2">
                    {item.title}
                  </h4>
                  <p className="text-[13.5px] text-ink-soft leading-[1.6]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Investment */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-ground-soft py-24 md:py-32 border-y border-line"
      >
        <div className="px-6 md:px-14 lg:px-14 mx-auto max-w-[1300px]">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-gold"></div>
              <span className="text-[12.5px] tracking-[0.14em] uppercase text-ink-soft font-medium">
                Investment
              </span>
              <div className="w-8 h-[1px] bg-gold"></div>
            </div>
            <h2 className="text-[clamp(36px,4vw,56px)] leading-[1.05] tracking-tight font-serif text-ink">
              Choose A Model That{" "}
              <em className="italic font-light text-gold-bright">
                Fits Your Market.
              </em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
            {[
              {
                name: "Starter",
                inv: "₹5–8L",
                desc: "Perfect for Tier 2 & Tier 3 cities.",
              },
              {
                name: "Standard",
                inv: "₹8–15L",
                desc: "Designed for growing urban markets.",
                popular: true,
              },
              {
                name: "Premium",
                inv: "₹15L+",
                desc: "Ideal for larger cities and higher service demand.",
              },
            ].map((tier, i) => (
              <div
                key={i}
                className={`relative p-8 md:p-10 rounded-3xl border flex flex-col transition-transform hover:-translate-y-1 ${
                  tier.popular
                    ? "border-gold-bright bg-ground shadow-lg shadow-gold/5"
                    : "border-line bg-ground"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold-bright text-ground px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.1em]">
                    Most Popular
                  </div>
                )}
                <h3 className="text-[22px] font-serif text-ink mb-2">
                  {tier.name}
                </h3>
                <div className="text-[clamp(32px,3vw,42px)] font-serif text-gold-bright mb-4">
                  {tier.inv}
                </div>
                <p className="text-[15px] text-ink-soft mb-10 flex-grow">
                  {tier.desc}
                </p>
                <div className="space-y-4 pt-6 border-t border-line/70">
                  <div className="text-[11px] uppercase tracking-[0.1em] text-ink-soft font-medium mb-4">
                    Includes
                  </div>
                  {[
                    "Branding",
                    "Technology",
                    "Training",
                    "Operational Guidance",
                    "Launch Support",
                  ].map((item, j) => (
                    <div
                      key={j}
                      className="flex items-center gap-3 text-[14px] text-ink-soft"
                    >
                      <CheckCircle2 className="w-4 h-4 text-gold-bright/70" />{" "}
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => setActiveModal("financials")}
              className="inline-flex items-center gap-3 px-[24px] py-[12px] rounded-full border border-gold/40 text-gold-bright hover:bg-gold/5 transition-colors font-medium text-[14px]"
            >
              <BarChart3 className="w-4 h-4" /> View Financial Details
            </button>
          </div>
        </div>
      </motion.section>

      {/* Vision & CTA Container */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="px-6 md:px-14 lg:px-14 mx-auto max-w-[1300px] py-16 md:py-24"
      >
        <div className="bg-ground rounded-3xl overflow-hidden shadow-2xl relative text-ink border border-line">
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-line">
            {/* Vision */}
            <div className="p-10 md:p-16 space-y-6 relative overflow-hidden">
              <div className="absolute -top-32 -left-32 w-96 h-96 bg-gold/10 rounded-full blur-[80px]" />

              <div className="flex items-center gap-3 mb-8 relative z-10">
                <div className="w-8 h-[1px] bg-gold"></div>
                <span className="text-[12.5px] tracking-[0.14em] uppercase text-ink-soft font-medium">
                  Our Vision
                </span>
              </div>
              <h3 className="text-[clamp(32px,3.5vw,48px)] leading-[1.05] tracking-tight font-serif relative z-10 text-ink">
                Building A{" "}
                <em className="italic font-light text-gold-bright pr-1">
                  Modern
                </em>{" "}
                Home Services Brand.
              </h3>
              <div className="space-y-4 text-ink-soft leading-[1.7] text-[15px] relative z-10">
                <p>We believe everyday services should feel effortless.</p>
                <p>
                  Our vision is to build a trusted brand that brings together
                  thoughtful operations, premium customer experiences, and
                  technology to simplify daily life.
                </p>
                <p>
                  As organized home services continue growing across India, we
                  aim to expand responsibly while maintaining quality,
                  consistency, and customer trust.
                </p>
              </div>
            </div>

            {/* CTA Form / Actions */}
            <div
              id="apply"
              className="p-10 md:p-16 flex flex-col justify-center space-y-8 bg-ground-soft"
            >
              <div>
                <h3 className="text-[clamp(32px,3.5vw,48px)] leading-[1.05] tracking-tight font-serif text-gold-bright mb-4">
                  Let&apos;s Build The Future Together.
                </h3>
                <p className="text-ink-soft text-[15px] leading-[1.7]">
                  If you&apos;re looking to build a scalable business backed by
                  structured operations, growing consumer demand, and a modern
                  brand vision, we&apos;d love to start the conversation.
                </p>
              </div>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full bg-ground border border-line rounded-xl px-5 py-4 text-ink placeholder:text-ink-soft/60 focus:outline-none focus:border-gold-bright focus:ring-1 focus:ring-gold-bright transition-colors text-[14px]"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full bg-ground border border-line rounded-xl px-5 py-4 text-ink placeholder:text-ink-soft/60 focus:outline-none focus:border-gold-bright focus:ring-1 focus:ring-gold-bright transition-colors text-[14px]"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-ground border border-line rounded-xl px-5 py-4 text-ink placeholder:text-ink-soft/60 focus:outline-none focus:border-gold-bright focus:ring-1 focus:ring-gold-bright transition-colors text-[14px]"
                />
                <select className="w-full bg-ground border border-line rounded-xl px-5 py-4 text-ink focus:outline-none focus:border-gold-bright focus:ring-1 focus:ring-gold-bright transition-colors appearance-none text-[14px]">
                  <option value="" className="text-ink">
                    Interested Franchise Model
                  </option>
                  <option value="starter" className="text-ink">
                    Starter (₹5-8L)
                  </option>
                  <option value="standard" className="text-ink">
                    Standard (₹8-15L)
                  </option>
                  <option value="premium" className="text-ink">
                    Premium (₹15L+)
                  </option>
                </select>

                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gold hover:bg-gold-bright text-ground px-[30px] py-[16px] rounded-full font-medium text-[14.5px] tracking-[0.02em] transition-colors text-center shadow-sm"
                  >
                    Apply Now
                  </button>
                  <button
                    type="button"
                    className="flex-1 bg-ground hover:bg-ground-soft border border-line text-ink px-[30px] py-[16px] rounded-full font-medium text-[14.5px] tracking-[0.02em] transition-colors text-center"
                  >
                    Schedule Call
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </motion.section>

      {/* FAQ Section Moved to Bottom */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="px-6 md:px-14 lg:px-14 mx-auto max-w-[1300px] pb-24 md:pb-32"
      >
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="flex items-center gap-3 mb-10 justify-center">
            <HelpCircle className="w-5 h-5 text-gold-bright" />
            <span className="text-[clamp(24px,3vw,32px)] font-serif text-ink">
              Frequently Asked Questions
            </span>
          </div>
          {franchiseFaqs.map((faq, i) => (
            <div
              key={i}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              className="group bg-ground border border-line rounded-2xl overflow-hidden hover:border-gold/30 transition-colors cursor-pointer"
            >
              <div className="flex w-full items-center justify-between p-6 font-medium text-left text-ink hover:text-gold-bright transition-colors">
                <span className="text-[15px] pr-4">{faq.q}</span>
                <ChevronRight
                  className={`w-4 h-4 shrink-0 transition-transform duration-300 text-gold-bright ${openFaq === i ? "rotate-90" : ""}`}
                />
              </div>
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  openFaq === i
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="p-6 pt-5 text-[14px] text-ink-soft leading-[1.7] border-t border-line whitespace-pre-line">
                    {faq.a}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Modals for Deep Research */}
      <Modal
        isOpen={activeModal === "industry"}
        onClose={() => setActiveModal(null)}
        title="Industry Market Size & Growth"
      >
        <div className="space-y-8">
          <div className="bg-ground-soft p-6 md:p-8 rounded-3xl border border-line">
            <h3 className="text-[20px] font-serif text-ink mb-4">
              Executive Summary
            </h3>
            <p className="text-[15px] leading-[1.7]">
              India’s home services sector – encompassing laundry, car wash, and
              residential cleaning – is booming. Urbanisation, rising incomes
              and dual-income households are driving sustained growth. Industry
              analyses estimate India’s total laundry and dry-cleaning market at{" "}
              <strong className="text-gold-bright font-medium">
                ₹30,000+ crore (~USD 36B)
              </strong>
              , growing ~5–10% annually.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-line rounded-3xl p-6 md:p-8">
              <h4 className="text-[16px] font-medium text-ink mb-3">
                Laundry Services
              </h4>
              <p className="text-[14px] leading-[1.7] mb-6">
                Organized laundry (tech-enabled) is projected to reach USD 1.0B
                by 2030 (~5.2% CAGR). Penetration is currently low (only ~4-5%),
                offering massive room for organized chains.
              </p>
              <div className="text-[clamp(32px,3vw,42px)] font-serif text-gold-bright leading-none">
                8-10%{" "}
                <span className="block text-[12px] text-ink-soft font-sans uppercase tracking-[0.1em] mt-2">
                  Growth Rate
                </span>
              </div>
            </div>
            <div className="border border-line rounded-3xl p-6 md:p-8">
              <h4 className="text-[16px] font-medium text-ink mb-3">
                Residential Cleaning
              </h4>
              <p className="text-[14px] leading-[1.7] mb-6">
                Valued at roughly USD 3.8B in 2024, expected to hit USD 6.9B by
                2032 (~7.3% CAGR). Driven by hygiene awareness and convenience
                preferences.
              </p>
              <div className="text-[clamp(32px,3vw,42px)] font-serif text-gold-bright leading-none">
                ~7.3%{" "}
                <span className="block text-[12px] text-ink-soft font-sans uppercase tracking-[0.1em] mt-2">
                  CAGR
                </span>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === "financials"}
        onClose={() => setActiveModal(null)}
        title="Financial Details & Unit Economics"
      >
        <div className="space-y-8">
          <p className="text-[13px] italic text-gold-bright/90 bg-gold/5 p-4 md:p-5 rounded-2xl border border-gold/20 leading-[1.6]">
            * Note: These are illustrative assumptions based on industry
            benchmarks and mature run-rates, not absolute guarantees.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[14px] border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-line text-ink">
                  <th className="p-4 font-medium uppercase tracking-[0.05em] text-[11px] text-ink-soft">
                    Model
                  </th>
                  <th className="p-4 font-medium uppercase tracking-[0.05em] text-[11px] text-ink-soft">
                    Coverage
                  </th>
                  <th className="p-4 font-medium uppercase tracking-[0.05em] text-[11px] text-ink-soft">
                    Initial Inv.
                  </th>
                  <th className="p-4 font-medium uppercase tracking-[0.05em] text-[11px] text-ink-soft">
                    Est. Revenue
                  </th>
                  <th className="p-4 font-medium uppercase tracking-[0.05em] text-[11px] text-ink-soft">
                    Est. Profit
                  </th>
                  <th className="p-4 font-medium uppercase tracking-[0.05em] text-[11px] text-ink-soft">
                    Payback
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                <tr className="hover:bg-ground-soft transition-colors">
                  <td className="p-4 font-medium text-ink">Starter</td>
                  <td className="p-4">Tier 3 / Small T2</td>
                  <td className="p-4">₹5–8L</td>
                  <td className="p-4">₹1.0–1.2L</td>
                  <td className="p-4 text-gold-bright font-medium">
                    ~₹30k–40k
                  </td>
                  <td className="p-4">18–24 mo</td>
                </tr>
                <tr className="hover:bg-ground-soft transition-colors bg-ground-soft">
                  <td className="p-4 font-medium text-ink flex items-center gap-2">
                    Standard{" "}
                    <span className="text-[9px] bg-gold-bright text-ground px-2 py-0.5 rounded-full uppercase tracking-[0.1em]">
                      Popular
                    </span>
                  </td>
                  <td className="p-4">Tier 2 Medium</td>
                  <td className="p-4">₹8–15L</td>
                  <td className="p-4">₹2.0–3.0L</td>
                  <td className="p-4 text-gold-bright font-medium">
                    ~₹60k–90k
                  </td>
                  <td className="p-4">16–20 mo</td>
                </tr>
                <tr className="hover:bg-ground-soft transition-colors">
                  <td className="p-4 font-medium text-ink">Premium</td>
                  <td className="p-4">Metro / Tier-1</td>
                  <td className="p-4">₹15–25L</td>
                  <td className="p-4">₹4.0–5.0L</td>
                  <td className="p-4 text-gold-bright font-medium">
                    ~₹1.4–1.75L
                  </td>
                  <td className="p-4">12–16 mo</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-ground-soft p-6 rounded-3xl border border-line">
              <div className="text-[12px] uppercase tracking-[0.1em] text-ink-soft font-medium mb-4">
                Average Order Values
              </div>
              <ul className="text-[14px] space-y-3">
                <li className="flex justify-between border-b border-line pb-3">
                  <span>Laundry (8-10kg)</span>{" "}
                  <span className="text-gold-bright font-medium">~₹600</span>
                </li>
                <li className="flex justify-between border-b border-line pb-3">
                  <span>Car Wash</span>{" "}
                  <span className="text-gold-bright font-medium">~₹300</span>
                </li>
                <li className="flex justify-between">
                  <span>Deep Cleaning</span>{" "}
                  <span className="text-gold-bright font-medium">~₹1,500</span>
                </li>
              </ul>
            </div>
            <div className="bg-ground-soft p-6 rounded-3xl border border-line">
              <div className="text-[12px] uppercase tracking-[0.1em] text-ink-soft font-medium mb-4">
                Profit Margins
              </div>
              <div className="text-[clamp(32px,3vw,42px)] font-serif text-gold-bright leading-none mb-3">
                20–35%
              </div>
              <p className="text-[13px] leading-[1.6]">
                Net margins after operational expenses. Gross margins sit at
                ~60%.
              </p>
            </div>
            <div className="bg-ground-soft p-6 rounded-3xl border border-line">
              <div className="text-[12px] uppercase tracking-[0.1em] text-ink-soft font-medium mb-4">
                Customer LTV
              </div>
              <div className="text-[clamp(32px,3vw,42px)] font-serif text-gold-bright leading-none mb-3">
                ₹50k+
              </div>
              <p className="text-[13px] leading-[1.6]">
                With high retention, loyal laundry customers generate
                significant lifetime value.
              </p>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === "investor"}
        onClose={() => setActiveModal(null)}
        title="Investor Resources"
      >
        <div className="space-y-8">
          <div>
            <h3 className="text-[20px] font-serif text-ink mb-4">
              Competitor Landscape
            </h3>
            <p className="text-[14px] leading-[1.7] mb-6">
              India&apos;s home-services market is highly fragmented. While
              several single-service chains exist, Clean7&apos;s multi-service
              model (laundry + car wash + cleaning) is uniquely positioned to
              capture cross-service value under a single trusted platform.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[14px] leading-[1.6]">
              <div className="p-6 border border-line rounded-3xl bg-ground">
                <strong className="text-ink font-medium block mb-2">
                  The Unorganized Reality
                </strong>
                <p className="text-ink-soft">
                  ~95% of the market relies on local mom-and-pop shops or
                  unbranded freelancers. They struggle with digital discovery,
                  consistent quality, and modern customer service expectations.
                </p>
              </div>
              <div className="p-6 border border-gold/30 rounded-3xl bg-gold/5">
                <strong className="text-gold-bright font-medium block mb-2">
                  The Clean7 Advantage
                </strong>
                <p className="text-ink-soft">
                  We provide tech-enabled booking, SOP-driven quality control,
                  transparent pricing, and the ability to bundle high-frequency
                  needs.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-[20px] font-serif text-ink mb-4">
              Business Risks & Mitigations
            </h3>
            <div className="space-y-4 text-[14px] leading-[1.6]">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 p-4 border border-line rounded-2xl bg-ground">
                <div className="sm:w-1/3 font-medium text-ink shrink-0">
                  Price Sensitivity
                </div>
                <div className="text-ink-soft">
                  <strong className="text-ink font-medium">Mitigation:</strong>{" "}
                  Emphasize quality, reliability, and service guarantees. Build
                  loyalty with subscription packages.
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 p-4 border border-line rounded-2xl bg-ground">
                <div className="sm:w-1/3 font-medium text-ink shrink-0">
                  Seasonality
                </div>
                <div className="text-ink-soft">
                  <strong className="text-ink font-medium">Mitigation:</strong>{" "}
                  Cross-sell services (e.g., promote home cleaning during
                  monsoons when car washes dip).
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 p-4 border border-line rounded-2xl bg-ground">
                <div className="sm:w-1/3 font-medium text-ink shrink-0">
                  Staff Attrition
                </div>
                <div className="text-ink-soft">
                  <strong className="text-ink font-medium">Mitigation:</strong>{" "}
                  Provide robust training, performance incentives, and clear
                  career paths within the franchise.
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-line">
            <button className="flex items-center justify-center gap-2 px-[24px] py-[12px] bg-ground-soft border border-line hover:border-gold-bright rounded-full text-[14px] transition-colors text-ink font-medium">
              <Download className="w-4 h-4" /> Download Full Pitch Deck (PDF)
            </button>
            <button className="flex items-center justify-center gap-2 px-[24px] py-[12px] bg-ground-soft border border-line hover:border-gold-bright rounded-full text-[14px] transition-colors text-ink font-medium">
              <Download className="w-4 h-4" /> Market Research Summary
            </button>
          </div>
        </div>
      </Modal>
    </main>
  );
}
