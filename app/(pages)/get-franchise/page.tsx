"use client";

import Container from "@/app/components/layout/Container";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/sections/Footer";
import { SatoshiFont, WixMadeForDisplayFont } from "@/app/fonts";
import { 
  ArrowRight, CheckCircle2, TrendingUp, MapPin, 
  ShieldCheck, Users, PieChart, Layers, 
  Sparkles, Building2, Smartphone 
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import OrangeGradientButton from "@/app/components/ui/buttons/OrangeGradientButton";
import FranchiseForm from "./FranchiseForm";


function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-4 py-1 rounded-full bg-orange/10 text-orange text-xs font-bold uppercase tracking-wider mb-6">
      {children}
    </span>
  );
}

function BenefitCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="bg-white p-8 rounded-3xl border border-[#E8DFD6] hover:shadow-xl transition-all duration-300 group">
      <div className="w-14 h-14 rounded-2xl bg-[#FBF6F2] flex items-center justify-center text-orange mb-6 group-hover:scale-110 transition-transform">
        <Icon size={28} />
      </div>
      <h3 className="text-xl font-bold text-[#33302E] mb-3" style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}>
        {title}
      </h3>
      <p className="text-[#5E5450] leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function StepCard({ number, title, description, image }: { number: string, title: string, description: string, image: string }) {
  return (
    <div className="flex flex-col items-center text-center group">
      <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden mb-8 border border-[#E8DFD6]">
        <Image src={image} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="w-10 h-10 rounded-full bg-orange text-white flex items-center justify-center font-bold text-lg mb-4">
        {number}
      </div>
      <h3 className="text-xl font-bold text-[#33302E] mb-2" style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}>
        {title}
      </h3>
      <p className="text-[#91776C] text-[15px]">
        {description}
      </p>
    </div>
  );
}

export default function FranchisePage() {
  const whyPartner = [
    {
      icon: TrendingUp,
      title: "Recurring Revenue",
      description: "High demand services that customers use repeatedly every month."
    },
    {
      icon: Smartphone,
      title: "Technology Powered",
      description: "Manage bookings, payments, customers and operations through our smart platform."
    },
    {
      icon: Building2,
      title: "Doorstep Convenience",
      description: "Modern consumers prefer app-based home services that save time and effort."
    },
    {
      icon: PieChart,
      title: "Fast Growing Market",
      description: "India's organized cleaning industry is rapidly expanding with huge growth potential."
    }
  ];

  const whatYouGet = [
    { icon: Layers, title: "Brand & Marketing", description: "Brand usage, marketing materials, campaigns and local promotions." },
    { icon: Smartphone, title: "Technology Access", description: "Powerful app, dashboard and tools to manage your business easily." },
    { icon: Users, title: "Training & Support", description: "Complete training and ongoing support from our expert team." },
    { icon: ShieldCheck, title: "Operations Guidance", description: "Standardized processes and guidelines for smooth operations." },
    { icon: TrendingUp, title: "Growth Assistance", description: "Business growth strategies and insights to scale faster." },
    { icon: Sparkles, title: "Service Excellence", description: "Quality assurance and continuous support to keep customers happy." }
  ];

  const WHATSAPP_NUMBER = "7078497263";

  const franchiseModels = [
    { 
      title: "Starter Model", 
      tag: "Ideal for small cities",
      features: ["Low Investment", "Single Service Focus", "High ROI Potential"],
      message: `Hi Clean7 👋 

I’m interested in the Starter Franchise Model.

Here are my details:

👤  Full Name:
📍  City:
📞  Phone Number:
📧  Email:
💼  Current Profession:
🏢  Any Previous Business Experience:
💰  Approx Investment Budget:
📅  Preferred Starting Timeline:

I would like to know more about:
- Initial setup process
- Expected operations
- Support provided by Clean7
- Service coverage in my city

Looking forward to hearing from your team. 🚀 `
    },
    { 
      title: "Growth Model", 
      tag: "Most Popular",
      features: ["Perfect for multi-service", "Multiple Services", "Higher Revenue Potential", "Scalable Operations"],
      popular: true,
      message: `Hi Clean7 👋 

I’m interested in the Growth Franchise Model.

Please find my details below:

👤  Full Name:
📍  City:
📞  Phone Number:
📧  Email:
💼  Current Profession:
🏢  Current Business (if any):
📈  Experience Managing Teams:
💰  Approx Investment Budget:
📅  Preferred Launch Timeline:

I’m interested in learning more about:
- Multi-service operations
- Revenue opportunities
- Marketing & branding support
- Technology and app infrastructure
- Territory availability

Please share the next steps for partnership. 🚀 `
    },
    { 
      title: "Premium Expansion", 
      tag: "For larger territory",
      features: ["Wide Area Coverage", "Strong Brand Presence", "Maximum Growth"],
      message: `Hi Clean7 👋 

I’m interested in the Premium Expansion Franchise Opportunity.

My details:

👤  Full Name:
📍  City / Region:
📞  Phone Number:
📧  Email:
💼  Current Profession / Business:
🏢  Existing Business Experience:
👥  Team Size (if applicable):
💰  Planned Investment Capacity:
🌆  Preferred Expansion Territory:
📅  Expected Launch Timeline:

I would like to discuss:
- Territory-based partnership opportunities
- Long-term expansion plans
- Operational scalability
- Dedicated support structure
- Brand collaboration opportunities

Looking forward to connecting with your franchise team. 🚀 `
    }
  ];

  const GENERAL_ENQUIRY_MESSAGE = `Hi Clean7 👋 

I’m interested in becoming a franchise partner with Clean7.

Here are my details:

👤  Full Name:
📍  City:
📞  Phone Number:
💼  Current Profession:
🏢  Any Previous Business Experience:
💰  Approx Investment Budget:
📅  Preferred Starting Timeline:

I would like to know more about:
• Franchise models
• Investment requirements
• Operational support
• Service availability in my city
• Next steps to get started

Looking forward to connecting with your team. 🚀 `;

  const handleEnquiry = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://api.whatsapp.com/send?phone=91${WHATSAPP_NUMBER}&text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="bg-[#FDFCF9]" style={{ fontFamily: SatoshiFont.style.fontFamily }}>
      <Navbar />

      {/* Hero Section */}
      <section className="pt-[140px] pb-16 md:pb-24">
        <Container isMaxWidth={true} className="px-[20px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionBadge>Franchise Opportunities Open</SectionBadge>
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#33302E] leading-[1.2] mb-6"
                style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
              >
                Build the Future of Home Services <br />
                <span className="text-orange">With Clean7.</span>
              </h1>
              <p className="text-lg text-[#5E5450] leading-[1.6] mb-10 max-w-xl">
                Partner with India&apos;s trusted cleaning brand and grow a future-ready business with multiple services and recurring customers.
              </p>
              <div className="flex flex-nowrap items-center gap-3 sm:gap-4">
                <OrangeGradientButton 
                  className="px-4 sm:px-8 py-3.5 sm:py-4 rounded-full flex items-center justify-center gap-2 sm:gap-2 text-[14px] sm:text-lg font-bold whitespace-nowrap"
                  onClick={() => handleEnquiry(GENERAL_ENQUIRY_MESSAGE)}
                >
                  Become a Partner <ArrowRight size={18} className="sm:w-[20px] sm:h-[20px]" />
                </OrangeGradientButton>
                <Link 
                  href="#investment-models"
                  className="px-4 sm:px-8 py-3.5 sm:py-4 rounded-full border border-[#E8DFD6] text-[#33302E] font-bold hover:bg-[#FBF6F2] transition-colors flex items-center justify-center gap-2 sm:gap-2 text-[14px] sm:text-lg whitespace-nowrap"
                >
                  Explore Business Models <ArrowRight size={18} className="sm:w-[20px] sm:h-[20px]" />
                </Link>
              </div>

              {/* Quick Stats/Badges */}
              <div className="mt-12 flex flex-wrap gap-6 border-t border-[#E8DFD6] pt-12">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange/10 flex items-center justify-center text-orange">
                    <Users size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#33302E]">High Repeat Customers</p>
                    <p className="text-xs text-[#91776C]">4 Services • One Platform</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange/10 flex items-center justify-center text-orange">
                    <Smartphone size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#33302E]">App Based Booking</p>
                    <p className="text-xs text-[#91776C]">Orders Managed Digitally</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/3] rounded-[40px] overflow-hidden shadow-2xl">
                <Image 
                  src="/images/franchise-hero.png" 
                  alt="Franchise Opportunity" 
                  fill 
                  className="object-cover"
                  priority
                />
              </div>
              {/* Floating Cards */}
              <div className="absolute -right-8 top-12 bg-white p-6 rounded-2xl shadow-xl border border-[#E8DFD6] hidden xl:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#33302E]">Trusted Local Brand</p>
                    <p className="text-xs text-[#91776C]">Loved by Thousands</p>
                  </div>
                </div>
              </div>
              <div className="absolute -left-8 bottom-12 bg-white p-6 rounded-2xl shadow-xl border border-[#E8DFD6] hidden xl:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <PieChart size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#33302E]">Proven Business Model</p>
                    <p className="text-xs text-[#91776C]">Low Risk • High Returns</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Why Partner Section */}
      <section id="why-us" className="py-20 bg-white">
        <Container isMaxWidth={true} className="px-[20px]">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-orange font-bold uppercase tracking-widest text-sm mb-4">Why Partner With Us</p>
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#33302E]"
              style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
            >
              Why Entrepreneurs Choose <span className="text-orange">Clean7</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyPartner.map((item, idx) => (
              <BenefitCard key={idx} {...item} />
            ))}
          </div>
        </Container>
      </section>

      {/* Services Ecosystem */}
      <section className="py-20">
        <Container isMaxWidth={true} className="px-[20px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-orange font-bold uppercase tracking-widest text-sm mb-4">Our Services Ecosystem</p>
              <h2 
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#33302E] mb-6 leading-tight"
                style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
              >
                One Brand. <br />
                Multiple Services. <br />
                More Opportunities.
              </h2>
              <p className="text-lg text-[#5E5450] leading-relaxed mb-8">
                Offer multiple services to your customers under one trusted brand and maximize your business potential.
              </p>
              <div className="space-y-4">
                {["Laundry & Dry Cleaning", "Doorstep Car Wash"].map((service) => (
                  <div key={service} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-orange/10 flex items-center justify-center text-orange">
                      <CheckCircle2 size={16} />
                    </div>
                    <span className="font-bold text-[#33302E]">{service}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              {/* Visual Ecosystem Representation */}
              <div className="relative aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-orange/5 rounded-full animate-pulse"></div>
                <div className="absolute inset-[15%] bg-orange/10 rounded-full"></div>
                <div className="absolute inset-[30%] bg-white rounded-full shadow-lg flex items-center justify-center z-10 border border-[#E8DFD6]">
                  <Image src="/logo.png" alt="Logo" width={100} height={100} className="object-contain" />
                </div>
                
                {/* Service Nodes */}
                {[
                  { icon: "🧺", label: "Laundry", pos: "top-0 left-1/2 -translate-x-1/2" },
                  // { icon: "🏠", label: "Home Cleaning", pos: "top-1/2 right-0 -translate-y-1/2" },
                  { icon: "🚗", label: "Car Wash", pos: "bottom-0 left-1/2 -translate-x-1/2" },
                  // { icon: "🪳", label: "Pest Control", pos: "top-1/2 left-0 -translate-y-1/2" },
                ].map((node, idx) => (
                  <div key={idx} className={`absolute ${node.pos} flex flex-col items-center`}>
                    <div className="w-16 h-16 rounded-full bg-white shadow-xl border border-[#E8DFD6] flex items-center justify-center text-2xl mb-2">
                      {node.icon}
                    </div>
                    <span className="text-xs font-bold text-[#33302E] whitespace-nowrap">{node.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <Container isMaxWidth={true} className="px-[20px]">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-orange font-bold uppercase tracking-widest text-sm mb-4">How It Works</p>
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#33302E]"
              style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
            >
              Simple Steps. Smart Service.
            </h2>
            <p className="mt-4 text-[#91776C]">From booking to doorstep, we make the entire process smooth and worry-free.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StepCard 
              number="1"
              title="Choose a Service"
              description="Pick the service you need from our trusted options."
              image="/images/how-it-works/step-1.png"
            />
            <StepCard 
              number="2"
              title="Pick a Time"
              description="Select a date and time that works best for you."
              image="/images/how-it-works/step-2.png"
            />
            <StepCard 
              number="3"
              title="We Arrive"
              description="Our verified professional arrives at your doorstep, right on time."
              image="/images/how-it-works/step-3.png"
            />
            <StepCard 
              number="4"
              title="You Relax"
              description="Sit back and relax while we take care of the rest."
              image="/images/how-it-works/step-4.png"
            />
          </div>
        </Container>
      </section>

      {/* What You Get */}
      <section className="py-20">
        <Container isMaxWidth={true} className="px-[20px]">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-orange font-bold uppercase tracking-widest text-sm mb-4">What You Get As A Partner</p>
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#33302E]"
              style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
            >
              Everything You Need To Succeed
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whatYouGet.map((item, idx) => (
              <div key={idx} className="flex gap-6 p-6 rounded-3xl bg-white border border-[#E8DFD6]">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-orange/10 flex items-center justify-center text-orange">
                  <item.icon size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#33302E] mb-2" style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}>
                    {item.title}
                  </h3>
                  <p className="text-[#5E5450] text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Investment Models */}
      <section id="investment-models" className="py-20 bg-white">
        <Container isMaxWidth={true} className="px-[20px]">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-orange font-bold uppercase tracking-widest text-sm mb-4">Investment Models</p>
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#33302E]"
              style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
            >
              Flexible Models. Your Way.
            </h2>
            <p className="mt-4 text-[#91776C]">Choose the model that fits your city, goals and investment plan.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {franchiseModels.map((model, idx) => (
              <div key={idx} className={`relative p-10 rounded-[40px] border-2 ${model.popular ? "border-orange shadow-2xl" : "border-[#E8DFD6]"} flex flex-col`}>
                {model.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange text-white text-xs font-bold uppercase py-2 px-6 rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-[#33302E] mb-2" style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}>
                    {model.title}
                  </h3>
                  <p className="text-sm text-[#91776C]">{model.tag}</p>
                </div>
                <ul className="space-y-4 mb-10 flex-1">
                  {model.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-[#5E5450]">
                      <CheckCircle2 size={18} className="text-orange" />
                      {f}
                    </li>
                  ))}
                </ul>
                <OrangeGradientButton 
                  className="w-full py-4 rounded-2xl font-bold"
                  onClick={() => handleEnquiry(model.message)}
                >
                  Enquire Now
                </OrangeGradientButton>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Who Can Partner & Ideal Cities */}
      <section className="py-20">
        <Container isMaxWidth={true} className="px-[20px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-10 rounded-[40px] border border-[#E8DFD6]">
              <div className="w-12 h-12 rounded-2xl bg-orange/10 flex items-center justify-center text-orange mb-6">
                <Users size={24} />
              </div>
              <h3 className="text-2xl font-bold text-[#33302E] mb-6" style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}>
                Who Can Partner With Us?
              </h3>
              <ul className="grid grid-cols-2 gap-4">
                {["Entrepreneurs", "Working professionals", "Local business owners", "Investors", "Service operators", "First-time founders"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[#5E5450] text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange"></div>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm text-[#91776C] leading-relaxed">
                No prior experience in cleaning services is necessary. Passion, consistency, and customer focus matter most.
              </p>
            </div>

            <div className="bg-white p-10 rounded-[40px] border border-[#E8DFD6]">
              <div className="w-12 h-12 rounded-2xl bg-orange/10 flex items-center justify-center text-orange mb-6">
                <MapPin size={24} />
              </div>
              <h3 className="text-2xl font-bold text-[#33302E] mb-6" style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}>
                Ideal Cities for Expansion
              </h3>
              <ul className="grid grid-cols-2 gap-4">
                {["Tier 1 Cities", "Tier 2 Cities", "Growing Urban Areas", "Smart Cities", "Residential Hubs"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[#5E5450] text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange"></div>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm text-[#91776C] leading-relaxed">
                The demand for organized doorstep services is growing rapidly across India. We are actively looking to expand into high-density locations.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Final CTA & Form Section */}
      <section className="py-20 bg-[#FBF6F2]/50">
        <Container isMaxWidth={true} className="px-[20px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 
                className="text-4xl md:text-5xl font-bold text-[#33302E] mb-8 leading-tight"
                style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
              >
                Ready to Build <br />
                Something Big?
              </h2>
              <p className="text-lg text-[#5E5450] leading-relaxed mb-10">
                Join Clean7 and become part of India&apos;s next-generation home services ecosystem.
              </p>
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl mb-10">
                <Image src="/images/franchise-ready.png" alt="Ready to build something big" fill className="object-cover" />
              </div>
              <OrangeGradientButton 
                className="px-10 py-4 rounded-full font-bold text-lg"
                onClick={() => handleEnquiry(GENERAL_ENQUIRY_MESSAGE)}
              >
                Apply for Franchise <ArrowRight size={20} />
              </OrangeGradientButton>
            </div>

            <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl border border-[#E8DFD6]">
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-[#33302E] mb-2" style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}>
                  Tell us about yourself
                </h3>
                <p className="text-[#91776C]">Our team will get back to you within 24 hours.</p>
              </div>
              <FranchiseForm />
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
