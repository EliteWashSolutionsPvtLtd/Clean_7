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
  Sparkles,
  CheckCircle2,
  ChevronRight,
  X,
  HelpCircle,
  Download,
  PieChart,
} from "lucide-react";
import { franchiseFaqs } from "./faqs";
import { ServiceCategory } from "../lib/service-categories";

const categoryImageMap: Record<string, string> = {
  laundry: "/images/services/laundry.png",
  "home-cleaning": "/images/services/house-help.png",
  "doorstep-car-wash": "/images/services/car-wash.png",
  "door-to-door-car-wash": "/images/services/car-wash.png",
  "pest-control": "/images/services/pest-control.png", // Or a fallback
};

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
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6"
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

export default function FranchiseClient({ categories = [] }: { categories?: ServiceCategory[] }) {
  const [activeModal, setActiveModal] = useState<
    "industry" | "financials" | "investor" | null
  >(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.clean7.in";

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    model: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const res = await fetch(`${apiUrl}/enquiries/franchise`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", phone: "", email: "", model: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-24 pb-16 min-h-screen font-sans bg-ground selection:bg-gold/30">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative px-6 md:px-14 lg:px-14 mx-auto max-w-[1400px] py-10 lg:py-14"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-[30px] items-center">
          <div className="space-y-8 max-w-[720px] relative z-10">
            <div>
              <h1 className="font-serif text-[clamp(38px,6vw,70px)] leading-[1.02] tracking-tight text-ink mb-4">
                <span className="block">
                  Own a{" "}
                  <em className="italic font-light text-gold-bright pr-2">
                    Clean7
                  </em>
                </span>
                <span className="block">Franchise.</span>
              </h1>
              <h2 className="text-[20px] md:text-[24px] font-serif text-ink-soft leading-[1.3]">
                Where Premium Service Meets Profitable Growth.
              </h2>
            </div>

            <div className="space-y-4 max-w-[640px]">
              <p className="text-[14px] md:text-[15px] leading-[1.7] text-ink-soft">
                Be a part of a modern home services brand redefining convenience
                across India. From premium laundry and doorstep car wash to home
                cleaning, Clean7 combines multiple high-demand services into one
                powerful business model.
              </p>
              <p className="text-[14px] md:text-[15px] leading-[1.7] text-ink-soft">
                With end-to-end operational support, technology-driven management,
                national branding, and continuous training, we help you build a
                business designed for sustainable growth and long-term profitability.
              </p>
              <p className="text-[15px] md:text-[16px] font-medium text-ink pt-2">
                Your Investment. Our Expertise. Shared Success.
              </p>
            </div>

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

            <div className="flex flex-col sm:flex-row gap-6 mt-2 lg:mt-0 items-center">
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
              <a
                href={`${apiUrl}/catalog/brochure`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-[30px] py-[16px] border border-gold/30 bg-transparent hover:bg-gold/5 text-ink rounded-full font-medium text-[14.5px] tracking-[0.02em] transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 text-gold-bright" /> Download
                Brochure
              </a>
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

          <div className="hidden lg:block relative w-full aspect-[4/3] rounded-3xl overflow-hidden group border border-line bg-ground-soft shadow-2xl lg:-mt-20">
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
        <div className="px-6 md:px-14 lg:px-14 mx-auto max-w-[1400px]">
          <div className="max-w-[720px] mb-16 space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-gold"></div>
              <span className="text-[12.5px] tracking-[0.14em] uppercase text-ink-soft font-medium">
                Why Now?
              </span>
            </div>
            <h2 className="text-[clamp(36px,4.5vw,64px)] leading-[1.05] tracking-tight font-serif text-ink">
              Invest in a Market Built for{" "}
              <em className="italic font-light text-gold-bright pr-1">
                Long-Term Growth.
              </em>
            </h2>
            <p className="text-[15px] md:text-[17px] leading-[1.7] text-ink-soft max-w-[600px]">
              India's home services industry is evolving faster than ever. Urban households are seeking trusted brands that provide multiple doorstep services through a single platform. With over 95% of the market still unorganized, Clean7 offers franchise partners the opportunity to enter a high-growth industry backed by technology, operational support, marketing expertise, and a proven multi-service business model.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line rounded-3xl overflow-hidden border border-line shadow-sm mb-12">
            {[
              { value: <>USD 11–15 Billion <br />(₹90,000 Cr+)</>, label: "Laundry & Dry Cleaning Market" },
              { value: "8–10% CAGR", label: "Home Care Market Growth" },
              { value: "300M+", label: "Registered Vehicles" },
              { value: "<5%", label: "Organized Laundry Market" },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-8 md:p-12 bg-ground flex flex-col justify-center text-center hover:bg-ground-soft transition-colors"
              >
                <div className="text-[20px] md:text-[24px] lg:text-[28px] font-serif text-gold-bright mb-1 md:mb-3">
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
        <div className="px-6 md:px-14 lg:px-14 mx-auto max-w-[1400px]">
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
        <div className="px-6 md:px-14 lg:px-14 mx-auto max-w-[1400px]">
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
            {categories.map((cat, i) => {
              const imageSrc = cat.webImageUrl || categoryImageMap[cat.slug] || "/images/services/laundry.png";
              const isRemote = imageSrc.startsWith("http");

              return (
                <div
                  key={i}
                  className="group rounded-3xl overflow-hidden border border-line bg-ground flex flex-col hover:border-gold/40 transition-colors shadow-sm"
                >
                  <div className="relative w-full aspect-[4/3] overflow-hidden">
                    <Image
                      src={imageSrc}
                      alt={cat.cardTitle}
                      fill
                      unoptimized={isRemote}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-8 flex-1 bg-ground group-hover:bg-gold/5 transition-colors flex flex-col justify-center">
                    <h3 className="text-[24px] font-serif text-gold-bright mb-3">
                      {cat.cardTitle}
                    </h3>
                    <p className="text-[14px] text-ink-soft leading-[1.6]">
                      {cat.teaser}
                    </p>
                  </div>
                </div>
              )
            })}
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
        <div className="px-6 md:px-14 lg:px-14 mx-auto max-w-[1400px]">
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
        <div className="px-6 md:px-14 lg:px-14 mx-auto max-w-[1400px]">
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
                name: "Clean7 Essential",
                inv: "₹15 Lakh + GST",
                desc: "Perfect for entrepreneurs starting a professional home services business in emerging markets.",
                bestFor: "Residential (B2C) Operations",
                includes: [
                  "Laundry Equipment",
                  "Car Wash Kit",
                  "Home Cleaning Kit",
                  "Standard Store Setup",
                  "Branding & Signage",
                  "Technology Platform",
                  "Staff Training",
                  "Marketing Support",
                  "Launch Assistance",
                  "Operational Guidance"
                ]
              },
              {
                name: "Clean7 Premium",
                inv: "₹20 Lakh + GST",
                desc: "Designed for growing markets with higher service capacity and commercial business opportunities.",
                popular: true,
                bestFor: "Residential (B2C) & Commercial (B2B) Operations",
                includes: [
                  "Enhanced Laundry Equipment",
                  "Car Wash Kit",
                  "Home Cleaning Kit",
                  "Premium Store Setup",
                  "Branding & Signage",
                  "Technology Platform",
                  "Staff Training",
                  "Marketing Support",
                  "Priority Launch Support",
                  "Operational Guidance",
                  "B2B Business Capability"
                ]
              },
              {
                name: "Clean7 Signature",
                inv: "₹25 Lakh + GST",
                desc: "Built for high-demand locations with maximum operational efficiency and business scalability.",
                bestFor: "Large-Scale Residential (B2C) & Commercial (B2B) Operations",
                includes: [
                  "Advanced Laundry Equipment",
                  "Premium Car Wash Kit",
                  "Premium Home Cleaning Kit",
                  "Signature Store Setup",
                  "Premium Branding Package",
                  "Advanced Technology Platform",
                  "Comprehensive Staff Training",
                  "National Marketing Support",
                  "Dedicated Launch Assistance",
                  "Priority Operational Support",
                  "Advanced B2B Business Capability"
                ]
              },
            ].map((tier, i) => (
              <div
                key={i}
                className={`relative p-8 md:p-10 rounded-3xl border flex flex-col transition-transform hover:-translate-y-1 ${tier.popular
                  ? "border-gold-bright bg-ground shadow-lg shadow-gold/5"
                  : "border-line bg-ground"
                  }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold-bright text-ground px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.1em] whitespace-nowrap">
                    Most Popular
                  </div>
                )}
                <h3 className="text-[22px] font-serif text-ink mb-2">
                  {tier.name}
                </h3>
                <div className="text-[clamp(24px,2.5vw,32px)] font-serif text-gold-bright mb-4">
                  {tier.inv}
                </div>
                <p className="text-[15px] text-ink-soft mb-6">
                  {tier.desc}
                </p>
                <div className="mb-8 flex-grow">
                  <div className="text-[11px] uppercase tracking-[0.1em] text-ink-soft font-medium mb-2">
                    Best For
                  </div>
                  <div className="text-[14px] text-ink font-medium">
                    {tier.bestFor}
                  </div>
                </div>
                <div className="space-y-4 pt-6 border-t border-line/70">
                  <div className="text-[11px] uppercase tracking-[0.1em] text-ink-soft font-medium mb-4">
                    Includes
                  </div>
                  {tier.includes.map((item, j) => (
                    <div
                      key={j}
                      className="flex items-start gap-3 text-[14px] text-ink-soft leading-[1.4]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-gold-bright/70 shrink-0 mt-0.5" />{" "}
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
        className="px-6 md:px-14 lg:px-14 mx-auto max-w-[1400px] py-16 md:py-24"
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

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Name"
                    className="w-full bg-ground border border-line rounded-xl px-5 py-4 text-ink placeholder:text-ink-soft/60 focus:outline-none focus:border-gold-bright focus:ring-1 focus:ring-gold-bright transition-colors text-[14px]"
                  />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Phone Number"
                    className="w-full bg-ground border border-line rounded-xl px-5 py-4 text-ink placeholder:text-ink-soft/60 focus:outline-none focus:border-gold-bright focus:ring-1 focus:ring-gold-bright transition-colors text-[14px]"
                  />
                </div>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Email Address"
                  className="w-full bg-ground border border-line rounded-xl px-5 py-4 text-ink placeholder:text-ink-soft/60 focus:outline-none focus:border-gold-bright focus:ring-1 focus:ring-gold-bright transition-colors text-[14px]"
                />
                <select
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  className="w-full bg-ground border border-line rounded-xl px-5 py-4 text-ink focus:outline-none focus:border-gold-bright focus:ring-1 focus:ring-gold-bright transition-colors appearance-none text-[14px]"
                >
                  <option value="" className="text-ink">
                    Interested Franchise Model
                  </option>
                  <option value="essential" className="text-ink">
                    Essential (₹15 Lakh)
                  </option>
                  <option value="premium" className="text-ink">
                    Premium (₹20 Lakh)
                  </option>
                  <option value="signature" className="text-ink">
                    Signature (₹25 Lakh)
                  </option>
                </select>

                {submitStatus === "success" && (
                  <div className="text-green-500 text-[14px] bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                    Thank you! Your enquiry has been submitted successfully. Our team will contact you shortly.
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="text-red-500 text-[14px] bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                    Failed to submit enquiry. Please try again later.
                  </div>
                )}

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gold hover:bg-gold-bright text-ground px-[30px] py-[16px] rounded-full font-medium text-[14.5px] tracking-[0.02em] transition-colors text-center shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Applying..." : "Apply Now"}
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
        className="px-6 md:px-14 lg:px-14 mx-auto max-w-[1400px] pb-24 md:pb-32"
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
                className={`grid transition-all duration-300 ease-in-out ${openFaq === i
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
              India's home services sector—including laundry, car wash, and
              residential cleaning—is experiencing strong growth, driven by rapid urbanization, rising disposable incomes, and increasing numbers of dual-income households. Industry estimates value India's laundry and dry-cleaning market at{" "}
              <strong className="text-gold-bright font-medium">
                ₹30,000+ crore (≈USD 3.5–4.0 billion)
              </strong>
              , growing at approximately 5–8% annually.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-line rounded-3xl p-6 md:p-8">
              <h4 className="text-[16px] font-medium text-ink mb-3">
                Laundry Services
              </h4>
              <p className="text-[14px] leading-[1.7] mb-6">
                The organized, technology-enabled laundry segment is projected to reach approximately USD 1.0 billion by 2030, growing at around 5.2% CAGR. With organized players accounting for only 4–5% of the overall market, there remains significant opportunity for branded and tech-enabled service providers.
              </p>
              <div className="text-[clamp(32px,3vw,42px)] font-serif text-gold-bright leading-none">
                5.2%{" "}
                <span className="block text-[12px] text-ink-soft font-sans uppercase tracking-[0.1em] mt-2">
                  CAGR
                </span>
              </div>
            </div>
            <div className="border border-line rounded-3xl p-6 md:p-8">
              <h4 className="text-[16px] font-medium text-ink mb-3">
                Residential Cleaning
              </h4>
              <p className="text-[14px] leading-[1.7] mb-6">
                India's residential cleaning services market was valued at approximately USD 3.8 billion in 2024 and is projected to reach USD 6.9 billion by 2032, growing at a 7.3% CAGR, fueled by increasing hygiene awareness, urban lifestyles, and demand for convenience.
              </p>
              <div className="text-[clamp(32px,3vw,42px)] font-serif text-gold-bright leading-none">
                7.3%{" "}
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
          <div className="bg-ground-soft p-6 md:p-8 rounded-3xl border border-line">
            <h3 className="text-[20px] font-serif text-ink mb-4">
              Illustrative Financial Estimates
            </h3>
            <p className="text-[14px] leading-[1.7] text-ink-soft mb-6">
              The following figures are indicative estimates based on industry benchmarks, projected operating assumptions, and mature business performance. They are provided for illustrative purposes only and should not be interpreted as guaranteed returns or financial commitments.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[14px] border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-line text-ink">
                    <th className="p-4 font-medium uppercase tracking-[0.05em] text-[11px] text-ink-soft">
                      Model
                    </th>
                    <th className="p-4 font-medium uppercase tracking-[0.05em] text-[11px] text-ink-soft">
                      Market
                    </th>
                    <th className="p-4 font-medium uppercase tracking-[0.05em] text-[11px] text-ink-soft">
                      Initial Investment
                    </th>
                    <th className="p-4 font-medium uppercase tracking-[0.05em] text-[11px] text-ink-soft">
                      Estimated Monthly Revenue*
                    </th>
                    <th className="p-4 font-medium uppercase tracking-[0.05em] text-[11px] text-ink-soft">
                      Estimated Payback*
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  <tr className="hover:bg-ground-soft transition-colors">
                    <td className="p-4 font-medium text-ink">Essential</td>
                    <td className="p-4">Tier-2 & Emerging Cities</td>
                    <td className="p-4 text-gold-bright font-medium">₹15 Lakh</td>
                    <td className="p-4 text-gold-bright font-medium">₹1.5–2.5 Lakh</td>
                    <td className="p-4">18–24 Months</td>
                  </tr>
                  <tr className="hover:bg-ground-soft transition-colors bg-ground-soft">
                    <td className="p-4 font-medium text-ink">Premium</td>
                    <td className="p-4">Tier-1 & Tier-2 Cities</td>
                    <td className="p-4 text-gold-bright font-medium">₹20 Lakh</td>
                    <td className="p-4 text-gold-bright font-medium">₹3.0–4.0 Lakh</td>
                    <td className="p-4">14–20 Months</td>
                  </tr>
                  <tr className="hover:bg-ground-soft transition-colors">
                    <td className="p-4 font-medium text-ink">Signature</td>
                    <td className="p-4">Metro & High-Demand Markets</td>
                    <td className="p-4 text-gold-bright font-medium">₹25 Lakh</td>
                    <td className="p-4 text-gold-bright font-medium">₹3.5–4.5 Lakh</td>
                    <td className="p-4">12–18 Months</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[12px] italic text-ink-soft mt-4">
              *Actual investment, revenue, profitability, and payback may vary depending on location, market demand, operational efficiency, staffing, pricing, competition, and local business conditions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-ground-soft p-6 rounded-3xl border border-line">
              <div className="text-[12px] uppercase tracking-[0.1em] text-ink-soft font-medium mb-4">
                Average Order Values
              </div>
              <ul className="text-[14px] space-y-3">
                <li className="flex justify-between border-b border-line pb-3">
                  <span>Laundry</span>
                  <span className="text-gold-bright font-medium">₹500–800</span>
                </li>
                <li className="flex justify-between border-b border-line pb-3">
                  <span>Car Wash</span>
                  <span className="text-gold-bright font-medium">₹300–700</span>
                </li>
                <li className="flex justify-between">
                  <span>Home Cleaning</span>
                  <span className="text-gold-bright font-medium">₹2,000–5,000</span>
                </li>
              </ul>
            </div>
            <div className="bg-ground-soft p-6 rounded-3xl border border-line">
              <div className="text-[12px] uppercase tracking-[0.1em] text-ink-soft font-medium mb-4">
                Operating Margins
              </div>
              <div className="text-[clamp(32px,3vw,42px)] font-serif text-gold-bright leading-none mb-3">
                25–35%
              </div>
              <p className="text-[13px] leading-[1.6] mb-3">
                Well-managed Clean7 franchise outlets may achieve operating margins in this range through efficient operations, optimized resource utilization, recurring customer demand, and a diversified portfolio of home services.
              </p>
              <p className="text-[12px] text-ink-soft italic leading-[1.5]">
                Operating margin estimates are indicative only and may vary depending on service mix, labor costs, occupancy levels, local competition, marketing expenses, and overall operational efficiency.
              </p>
            </div>
          </div>

          <div className="p-6 md:p-8 border border-gold/30 rounded-3xl bg-gold/5">
            <h3 className="text-[16px] font-medium text-gold-bright mb-3">
              Important Disclaimer
            </h3>
            <p className="text-[13px] text-ink-soft leading-[1.6]">
              The financial information presented in this document is intended solely for illustrative purposes and is based on internal business assumptions together with publicly available industry benchmarks. It does not constitute a guarantee, forecast, or promise of future financial performance. Actual results may differ materially based on market conditions, franchise location, customer demand, operating practices, and other business factors. Prospective franchise partners are encouraged to conduct their own independent financial and commercial due diligence before making any investment decision.
            </p>
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