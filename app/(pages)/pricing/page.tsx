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
  ClipboardList,
  UserCheck,
  Clock,
  ShieldCheck,
  Wallet,
  Check,
  ArrowRight,
  Percent,
  Download,
  Shield,
  Calendar
} from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Transparent pricing for laundry, car wash, pest control, and home cleaning services.",
  alternates: { canonical: canonicalPath("/pricing") },
};

const servicesData = [
  {
    title: "Laundry Service",
    imgSrc: "/images/services/laundry_service_img.png",
    price: "149",
    unit: "/load",
    features: ["Wash & Fold", "Steam Ironing", "Stain Treatment", "Premium Detergents"],
    btnText: "Book Laundry",
    href: "/services/laundry",
  },
  {
    title: "Door to Door Car Wash",
    imgSrc: "/images/services/car_wash_img.png",
    price: "249",
    unit: "/wash",
    features: ["Exterior Wash", "Interior Cleaning", "Deep Cleaning", "Premium Products"],
    btnText: "Book Car Wash",
    href: "/services/car-wash",
  },
  // {
  //   title: "Pest Control",
  //   imgSrc: "/images/pricing/pest_control.png",
  //   price: "299",
  //   unit: "/service",
  //   features: ["General Pest Control", "Cockroach Control", "Termite Control", "Mosquito Control"],
  //   btnText: "Book Pest Control",
  //   href: "/services/pest-control",
  // },
  // {
  //   title: "Home Cleaning",
  //   imgSrc: "/images/pricing/home_cleaning.png",
  //   price: "399",
  //   unit: "/visit",
  //   features: ["Deep Cleaning", "Kitchen Cleaning", "Bathroom Cleaning", "Sofa & Carpet Cleaning"],
  //   btnText: "Book Home Cleaning",
  //   href: "/services/home-cleaning",
  // }
];

export default function PricingPage() {
  return (
    <div className="overflow-x-hidden antialiased bg-[#FAFAFA]" style={{ fontFamily: SatoshiFont.style.fontFamily }}>
      <Navbar />

      <main className="pt-[60px] lg:pt-[80px]">
        {/* ─── HERO SECTION ──────────────────────────────────────────────────────── */}
        <section className="relative w-full pt-16 pb-16 lg:pb-20 bg-gradient-to-b from-[#FDFBF9] to-[#F5F0EA] overflow-hidden px-5">
          {/* Left Decorative Image */}
          <div className="absolute left-[-5%] bottom-0 w-[400px] h-[300px] hidden lg:block opacity-90 z-0">
            <Image src="/images/pricing/hero_left.png" alt="Towels in basket" fill className="object-contain object-bottom" priority />
          </div>
          {/* Right Decorative Image */}
          <div className="absolute right-[-2%] bottom-0 w-[400px] h-[300px] hidden lg:block opacity-90 z-0">
            <Image src="/images/pricing/hero_right.png" alt="Folded towels and vase" fill className="object-contain object-bottom" priority />
          </div>

          <Container isMaxWidth className="relative z-10 text-center">
            <div className="text-[16px] font-bold uppercase tracking-[0.2em] text-[#F26B21] mb-5">
              PRICING
            </div>
            <h1
              className="text-[clamp(46px,5vw,59px)] leading-[1.05] font-extrabold text-[#1A1A1A] tracking-tight mb-5"
              style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
            >
              Simple pricing.<br />
              <span className="text-[#F26B21]">Exceptional</span> care.
            </h1>
            <p className="text-[21px] leading-relaxed text-[#5B5B5B] max-w-sm mx-auto">
              Choose what you need. Pay transparently.
              <br />No hidden charges, ever.
            </p>
          </Container>
        </section>


        {/* ─── PRICING CARDS ─────────────────────────────────────────────────────── */}
        <section className="pt-20 pb-16 px-5">
          <Container isMaxWidth>
            <div className="text-center mb-16">
              <div className="text-[16px] font-bold uppercase tracking-[0.2em] text-[#F26B21] mb-3">
                OUR SERVICES &amp; PRICING
              </div>
              <h2
                className="text-[clamp(35px,4vw,46px)] font-bold text-[#1A1A1A] mb-3"
                style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
              >
                Choose your service
              </h2>
              <p className="text-[#5B5B5B] text-[21px]">Professional care for every need.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {servicesData.map((service, idx) => (
                <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-gray-100/60 flex flex-col transition-transform hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative h-[220px] w-full bg-gray-50">
                    <Image src={service.imgSrc} alt={service.title} fill className="object-cover" />
                  </div>
                  <div className="p-7 flex-1 flex flex-col">
                    <h3 className="text-[21px] font-bold text-[#1A1A1A] leading-snug mb-5" style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}>
                      {service.title}
                    </h3>

                    <div className="mb-6">
                      <p className="text-[16px] text-[#7A7A7A] mb-1">Starting from</p>
                      <div className="flex items-baseline gap-1 text-[#1A1A1A]">
                        <span className="text-[35px] font-extrabold leading-none">₹{service.price}</span>
                        <span className="text-[16px] font-medium text-[#7A7A7A]">{service.unit}</span>
                      </div>
                    </div>

                    <ul className="space-y-3.5 mb-8 flex-1">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-[16px] text-[#5B5B5B]">
                          <Check className="w-[18px] h-[18px] text-[#F26B21] shrink-0" strokeWidth={2.5} /> {feature}
                        </li>
                      ))}
                    </ul>

                    {service.href ? (
                      <Link href={service.href} className="w-full py-3 rounded-full border-2 border-[#FCECE4] text-[#F26B21] font-bold text-[16px] flex items-center justify-center gap-2 hover:border-[#F26B21] hover:bg-[#F26B21] hover:text-white transition-all">
                        {service.btnText} <ArrowRight size={16} />
                      </Link>
                    ) : (
                      <button className="w-full py-3 rounded-full border-2 border-[#FCECE4] text-[#F26B21] font-bold text-[16px] flex items-center justify-center gap-2 hover:border-[#F26B21] hover:bg-[#F26B21] hover:text-white transition-all">
                        {service.btnText} <ArrowRight size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ─── WHY CHOOSE US / FEATURES (iOS STYLE) ───────────────────────────── */}
        <section className="pb-24 px-5">
          <Container isMaxWidth>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
              {/* Feature 1 */}
              <div className="bg-white rounded-[2.5rem] p-9 shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-gray-50 flex flex-col items-center text-center group transition-all duration-500 hover:shadow-[0_15px_45px_rgba(0,0,0,0.06)] hover:-translate-y-1.5">
                <div className="w-16 h-16 rounded-[1.25rem] bg-[#F2F2F7] flex items-center justify-center text-[#F26B21] mb-6 group-hover:scale-110 transition-transform duration-500">
                  <ClipboardList strokeWidth={1.5} size={30} />
                </div>
                <h4 className="font-bold text-[#1D1D1F] text-[19px] mb-2 leading-tight tracking-tight">No Hidden Charges</h4>
                <p className="text-[15px] text-[#86868B] leading-relaxed">What you see is what you pay</p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white rounded-[2.5rem] p-9 shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-gray-50 flex flex-col items-center text-center group transition-all duration-500 hover:shadow-[0_15px_45px_rgba(0,0,0,0.06)] hover:-translate-y-1.5">
                <div className="w-16 h-16 rounded-[1.25rem] bg-[#F2F2F7] flex items-center justify-center text-[#F26B21] mb-6 group-hover:scale-110 transition-transform duration-500">
                  <UserCheck strokeWidth={1.5} size={30} />
                </div>
                <h4 className="font-bold text-[#1D1D1F] text-[19px] mb-2 leading-tight tracking-tight">Trained Professionals</h4>
                <p className="text-[15px] text-[#86868B] leading-relaxed">Verified and fully trained</p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white rounded-[2.5rem] p-9 shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-gray-50 flex flex-col items-center text-center group transition-all duration-500 hover:shadow-[0_15px_45px_rgba(0,0,0,0.06)] hover:-translate-y-1.5">
                <div className="w-16 h-16 rounded-[1.25rem] bg-[#F2F2F7] flex items-center justify-center text-[#F26B21] mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Clock strokeWidth={1.5} size={30} />
                </div>
                <h4 className="font-bold text-[#1D1D1F] text-[19px] mb-2 leading-tight tracking-tight">On-Time Service</h4>
                <p className="text-[15px] text-[#86868B] leading-relaxed">We value your time</p>
              </div>

              {/* Feature 4 */}
              <div className="bg-white rounded-[2.5rem] p-9 shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-gray-50 flex flex-col items-center text-center group transition-all duration-500 hover:shadow-[0_15px_45px_rgba(0,0,0,0.06)] hover:-translate-y-1.5">
                <div className="w-16 h-16 rounded-[1.25rem] bg-[#F2F2F7] flex items-center justify-center text-[#F26B21] mb-6 group-hover:scale-110 transition-transform duration-500">
                  <ShieldCheck strokeWidth={1.5} size={30} />
                </div>
                <h4 className="font-bold text-[#1D1D1F] text-[19px] mb-2 leading-tight tracking-tight">Satisfaction Guaranteed</h4>
                <p className="text-[15px] text-[#86868B] leading-relaxed">We&apos;ll make it right</p>
              </div>

              {/* Feature 5 */}
              <div className="bg-white rounded-[2.5rem] p-9 shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-gray-50 flex flex-col items-center text-center group transition-all duration-500 hover:shadow-[0_15px_45px_rgba(0,0,0,0.06)] hover:-translate-y-1.5">
                <div className="w-16 h-16 rounded-[1.25rem] bg-[#F2F2F7] flex items-center justify-center text-[#F26B21] mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Wallet strokeWidth={1.5} size={30} />
                </div>
                <h4 className="font-bold text-[#1D1D1F] text-[19px] mb-2 leading-tight tracking-tight">Secure Payments</h4>
                <p className="text-[15px] text-[#86868B] leading-relaxed">Safe and easy booking</p>
              </div>
            </div>
          </Container>
        </section>



        {/* ─── MEMBERSHIP BOX ────────────────────────────────────────────────────── */}
        <section className="pb-16 px-5">
          <Container isMaxWidth>
            <div className="bg-[#FCF9F6] rounded-3xl p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-10 shadow-sm border border-[#F5EFEA]">
              {/* Left Side */}
              <div className="lg:w-[45%] text-center lg:text-left">
                <h3 className="text-[35px] font-bold text-[#1A1A1A] mb-3 leading-tight" style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}>
                  Save more with<br />Wash &amp; Wow Membership
                </h3>
                <p className="text-[#5B5B5B] text-[21px] mb-8">Enjoy exclusive benefits and priority service.</p>
                <button className="bg-[#F26B21] text-white px-7 py-3.5 rounded-full text-[16px] font-bold flex items-center justify-center gap-2 hover:bg-[#D95D1A] shadow-md transition-colors mx-auto lg:mx-0">
                  View Membership Plans <ArrowRight size={16} />
                </button>
              </div>

              {/* Right Side Grid */}
              <div className="lg:w-[55%] grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-[52px] h-[52px] rounded-full bg-[#EAF5EE] flex items-center justify-center">
                    <Percent className="w-6 h-6 text-[#4CAF50]" strokeWidth={1.5} />
                  </div>
                  <p className="text-[21px] font-bold text-[#1A1A1A] leading-tight">Up to 20% Off<br /><span className="text-[16px] font-normal text-[#7A7A7A] mt-1 block">on all services</span></p>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-[52px] h-[52px] rounded-full bg-[#EEF2FC] flex items-center justify-center">
                    <Download className="w-6 h-6 text-[#3F51B5]" strokeWidth={1.5} />
                  </div>
                  <p className="text-[21px] font-bold text-[#1A1A1A] leading-tight">Priority<br /><span className="text-[16px] font-normal text-[#7A7A7A] mt-1 block">Booking</span></p>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-[52px] h-[52px] rounded-full bg-[#FDF2E9] flex items-center justify-center">
                    <Shield className="w-6 h-6 text-[#F26B21]" strokeWidth={1.5} />
                  </div>
                  <p className="text-[21px] font-bold text-[#1A1A1A] leading-tight">Exclusive<br /><span className="text-[16px] font-normal text-[#7A7A7A] mt-1 block">Offers</span></p>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-[52px] h-[52px] rounded-full bg-[#FCEEEA] flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-[#E53935]" strokeWidth={1.5} />
                  </div>
                  <p className="text-[21px] font-bold text-[#1A1A1A] leading-tight">Free<br /><span className="text-[16px] font-normal text-[#7A7A7A] mt-1 block">Rescheduling</span></p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ─── APP BANNER ────────────────────────────────────────────────────────── */}
        <section className="pb-24 px-5">
          <Container isMaxWidth>
            <div className="bg-[#FFF6F0] rounded-[2.5rem] p-0 flex flex-col md:flex-row items-center overflow-hidden relative min-h-[350px] shadow-[0_8px_30px_rgba(0,0,0,0.09)] border border-[#f0e2db]">

              {/* Left Side Image (App Mockup) */}
              <div className="w-full md:w-5/12 relative h-[300px] md:h-auto self-stretch overflow-hidden">
                <Image src="/images/pricing/app_mockup.png" alt="Wash and Wow App Mockup" fill className="object-cover object-left" />
              </div>

              {/* Right Side Content */}
              <div className="w-full md:w-7/12 p-10 lg:p-16 relative z-10 flex flex-col justify-center">
                <div className="text-[16px] font-bold uppercase tracking-[0.2em] text-[#F26B21] mb-4">
                  GET STARTED TODAY
                </div>
                <h2
                  className="text-[clamp(35px,4vw,46px)] font-bold text-[#1A1A1A] leading-[1.15] mb-8"
                  style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
                >
                  Book in seconds.<br />Relax while we care for the rest.
                </h2>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  <button className="bg-[#F26B21] text-white px-7 py-3.5 rounded-full text-[16px] font-bold flex items-center gap-2 hover:bg-[#D95D1A] transition-colors shadow-md">
                    Book a Service Now <ArrowRight size={16} />
                  </button>
                  <span className="text-[#5B5B5B] text-[16px]">or download the app</span>
                  <div className="flex items-center gap-2">
                    {/* App store buttons have been removed as requested */}
                  </div>
                </div>

                {/* Decorative plane/arrow in background */}
                <div className="absolute right-10 bottom-10 opacity-20 pointer-events-none hidden lg:block">
                  <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 90 Q 50 100 90 20 L 70 20 M 90 20 L 80 40" stroke="#F26B21" strokeWidth="2" strokeDasharray="4 4" fill="none" />
                  </svg>
                </div>
              </div>
            </div>
          </Container>
        </section>

      </main>

      <Footer />
    </div>
  );
}
