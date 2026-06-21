"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/sections/Footer";
import { SatoshiFont } from "@/app/fonts";
import { 
  ArrowRight, Clock, Star, ShieldCheck, Heart,
  Smartphone, Sparkles, Package, Car, Box, BadgeCheck, MapPin, Search
} from "lucide-react";
import Container from "@/app/components/layout/Container";
import { Fraunces } from "next/font/google";

const fraunces = Fraunces({ subsets: ["latin"], style: ["normal", "italic"] });

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="overflow-x-hidden bg-[#15130F] text-[#F3EDE0] min-h-screen" style={{ fontFamily: SatoshiFont.style.fontFamily }}>
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-10 px-5">
        <Container isMaxWidth>
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-[45%]">
              <p className="text-[#C9A24B] uppercase text-[10px] font-bold tracking-[0.2em] mb-6">About Clean7</p>
              <h1 className={`text-5xl md:text-7xl text-white mb-6 leading-[1.1] ${fraunces.className}`}>
                More than clean.<br />
                It&apos;s <span className="text-[#C9A24B] italic">care</span> you can<br />count on.
              </h1>
              <p className="text-[#C9C2B2] text-sm md:text-base mb-10 max-w-md leading-relaxed">
                Clean7 was built to make laundry and car care feel effortless, reliable, and thoughtfully handled. From pickup to delivery, every detail is designed to save time while delivering premium results.
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <Link href="/services" className="bg-[#C9A24B] text-[#15130F] px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-[#E2BD6C] transition-colors">
                  Schedule your first pickup <ArrowRight size={16} strokeWidth={2.5} />
                </Link>
                <Link href="#how-it-works" className="text-white text-sm font-medium border-b border-white/30 pb-0.5 hover:text-[#C9A24B] hover:border-[#C9A24B] transition-colors">
                  See how it works
                </Link>
              </div>
              
              {/* Avatars */}
              <div className="flex items-center gap-4 mt-14">
                <div className="flex -space-x-3">
                   {/* Avatar placeholders using standard UI faces or colored circles */}
                   <div className="w-10 h-10 rounded-full bg-[#1C1914] border-2 border-[#15130F] overflow-hidden relative"><Image src="https://i.pravatar.cc/100?img=1" fill alt="Customer" className="object-cover"/></div>
                   <div className="w-10 h-10 rounded-full bg-[#1C1914] border-2 border-[#15130F] overflow-hidden relative"><Image src="https://i.pravatar.cc/100?img=2" fill alt="Customer" className="object-cover"/></div>
                   <div className="w-10 h-10 rounded-full bg-[#1C1914] border-2 border-[#15130F] overflow-hidden relative"><Image src="https://i.pravatar.cc/100?img=3" fill alt="Customer" className="object-cover"/></div>
                   <div className="w-10 h-10 rounded-full bg-[#1C1914] border-2 border-[#15130F] overflow-hidden relative"><Image src="https://i.pravatar.cc/100?img=4" fill alt="Customer" className="object-cover"/></div>
                </div>
                <div>
                  <p className="text-white text-[13px] font-bold leading-tight">Trusted by 40,000+</p>
                  <p className="text-[#C9C2B2] text-[11px] leading-tight mt-0.5">happy customers</p>
                </div>
              </div>
            </div>
            
            <div className="lg:w-[55%] flex gap-4 lg:gap-6 mt-10 lg:mt-0 w-full h-[400px] md:h-[600px]">
              <div className="relative w-1/2 h-full rounded-2xl md:rounded-3xl overflow-hidden border border-white/5 mt-8 md:mt-12">
                <Image src="/images/about/about_premium_laundry_1782044569187.png" fill className="object-cover" alt="Premium Laundry" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-[#15130F]/80 via-transparent to-transparent pointer-events-none"/>
                <div className="absolute top-4 left-4 right-4 md:top-6 md:left-6 md:right-6 bg-[#1C1914]/40 backdrop-blur-md rounded-2xl p-4 md:p-5 border border-white/10 shadow-lg">
                   <div className="w-9 h-9 rounded-xl border border-[#C9A24B]/30 text-[#C9A24B] flex items-center justify-center mb-3 bg-[#1C1914]/80"><Box size={16}/></div>
                   <p className="text-white font-bold text-sm md:text-base leading-tight mb-1">Premium<br/>Laundry</p>
                   <p className="text-[#C9C2B2] text-[10px] md:text-xs">Care for every fabric.</p>
                </div>
              </div>
              <div className="relative w-1/2 h-full rounded-2xl md:rounded-3xl overflow-hidden border border-white/5 mb-8 md:mb-12">
                <Image src="/images/about/about_professional_car_wash_1782044582076.png" fill className="object-cover" alt="Professional Car Wash" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-[#15130F]/80 via-transparent to-transparent pointer-events-none"/>
                <div className="absolute top-4 left-4 right-4 md:top-6 md:left-6 md:right-6 bg-[#1C1914]/40 backdrop-blur-md rounded-2xl p-4 md:p-5 border border-white/10 shadow-lg">
                   <div className="w-9 h-9 rounded-xl border border-[#C9A24B]/30 text-[#C9A24B] flex items-center justify-center mb-3 bg-[#1C1914]/80"><Car size={16}/></div>
                   <p className="text-white font-bold text-sm md:text-base leading-tight mb-1">Professional<br/>Car Wash</p>
                   <p className="text-[#C9C2B2] text-[10px] md:text-xs">Shine in every detail.</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats Bar */}
      <section className="px-5 my-10">
        <Container isMaxWidth>
          <div className="bg-[#1C1914] rounded-3xl p-8 md:p-10 border border-white/5 flex flex-wrap lg:flex-nowrap justify-between gap-8 md:gap-10">
            <div className="flex items-center gap-5 w-full md:w-[45%] lg:w-auto">
              <div className="w-12 h-12 rounded-full border border-[#C9A24B] text-[#C9A24B] flex items-center justify-center shrink-0"><Clock size={20} strokeWidth={1.5}/></div>
              <div>
                <p className={`text-white font-bold text-2xl ${fraunces.className}`}>24 hr</p>
                <p className="text-[#C9C2B2] text-[11px] uppercase tracking-wider mt-1">Turnaround</p>
              </div>
            </div>
            <div className="hidden lg:block w-px bg-white/5 h-12 self-center"></div>
            <div className="flex items-center gap-5 w-full md:w-[45%] lg:w-auto">
              <div className="w-12 h-12 rounded-full border border-[#C9A24B] text-[#C9A24B] flex items-center justify-center shrink-0"><Box size={20} strokeWidth={1.5}/></div>
              <div>
                <p className={`text-white font-bold text-2xl ${fraunces.className}`}>40k+</p>
                <p className="text-[#C9C2B2] text-[11px] uppercase tracking-wider mt-1">Garments handled monthly</p>
              </div>
            </div>
            <div className="hidden lg:block w-px bg-white/5 h-12 self-center"></div>
            <div className="flex items-center gap-5 w-full md:w-[45%] lg:w-auto">
              <div className="w-12 h-12 rounded-full border border-[#C9A24B] text-[#C9A24B] flex items-center justify-center shrink-0"><Star size={20} strokeWidth={1.5}/></div>
              <div>
                <p className={`text-white font-bold text-2xl ${fraunces.className}`}>4.9</p>
                <p className="text-[#C9C2B2] text-[11px] uppercase tracking-wider mt-1">Average rating</p>
              </div>
            </div>
            <div className="hidden lg:block w-px bg-white/5 h-12 self-center"></div>
            <div className="flex items-center gap-5 w-full md:w-[45%] lg:w-auto">
              <div className="w-12 h-12 rounded-full border border-[#C9A24B] text-[#C9A24B] flex items-center justify-center shrink-0"><Heart size={20} strokeWidth={1.5}/></div>
              <div>
                <p className={`text-white font-bold text-2xl ${fraunces.className}`}>Premium</p>
                <p className="text-[#C9C2B2] text-[11px] uppercase tracking-wider mt-1">Care experience</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Who We Are */}
      <section className="py-20 px-5">
        <Container isMaxWidth>
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2 relative h-[350px] md:h-[450px] w-full rounded-3xl overflow-hidden border border-white/5">
               <Image src="/images/about/about_delivery_van_1782044596394.png" fill className="object-cover" alt="Clean7 Delivery Van"/>
            </div>
            <div className="lg:w-1/2 lg:pl-10">
               <p className="text-[#C9A24B] uppercase text-[10px] font-bold tracking-[0.2em] mb-4">Who We Are</p>
               <h2 className={`text-4xl md:text-5xl text-white mb-8 leading-[1.1] ${fraunces.className}`}>Built on purpose.<br/>Driven by care.</h2>
               <div className="text-[#C9C2B2] text-sm md:text-[15px] space-y-6 leading-relaxed max-w-lg">
                 <p>
                   Clean7 began with a simple idea — everyday services should feel premium. We saw how inconsistent laundry and car wash experiences could be, so we created a service focused on quality, convenience, and consistency from start to finish.
                 </p>
                 <p>
                   Today, we continue improving every detail to create an experience customers genuinely enjoy using.
                 </p>
               </div>
               <p className={`text-[#C9A24B] text-xl mt-10 ${fraunces.className} italic`}>The Clean7 Team 💛</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-5 bg-gradient-to-b from-[#15130F] to-[#1C1914]">
        <Container isMaxWidth>
          <div className="text-center mb-16">
            <p className="text-[#C9A24B] uppercase text-[10px] font-bold tracking-[0.2em] mb-4">Why Choose Us</p>
            <h2 className={`text-3xl md:text-5xl text-white ${fraunces.className}`}>Care in every detail.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#1C1914] border border-white/5 rounded-3xl p-8 flex flex-col items-center text-center transition-transform hover:-translate-y-1 hover:border-[#C9A24B]/20">
               <div className="text-[#C9A24B] mb-6"><BadgeCheck size={36} strokeWidth={1.5}/></div>
               <h3 className="text-white font-bold text-[15px] mb-3">Premium Quality</h3>
               <p className="text-[#C9C2B2] text-xs leading-relaxed">Fabric-safe cleaning and careful handling for every order.</p>
            </div>
            <div className="bg-[#1C1914] border border-white/5 rounded-3xl p-8 flex flex-col items-center text-center transition-transform hover:-translate-y-1 hover:border-[#C9A24B]/20">
               <div className="text-[#C9A24B] mb-6"><Car size={36} strokeWidth={1.5}/></div>
               <h3 className="text-white font-bold text-[15px] mb-3">Pickup & Delivery</h3>
               <p className="text-[#C9C2B2] text-xs leading-relaxed">Doorstep convenience designed around your schedule.</p>
            </div>
            <div className="bg-[#1C1914] border border-white/5 rounded-3xl p-8 flex flex-col items-center text-center transition-transform hover:-translate-y-1 hover:border-[#C9A24B]/20">
               <div className="text-[#C9A24B] mb-6"><Clock size={36} strokeWidth={1.5}/></div>
               <h3 className="text-white font-bold text-[15px] mb-3">Fast Turnaround</h3>
               <p className="text-[#C9C2B2] text-xs leading-relaxed">Freshly cleaned and delivered back within 24 hours.</p>
            </div>
            <div className="bg-[#1C1914] border border-white/5 rounded-3xl p-8 flex flex-col items-center text-center transition-transform hover:-translate-y-1 hover:border-[#C9A24B]/20">
               <div className="text-[#C9A24B] mb-6"><Heart size={36} strokeWidth={1.5}/></div>
               <h3 className="text-white font-bold text-[15px] mb-3">Thoughtful Service</h3>
               <p className="text-[#C9C2B2] text-xs leading-relaxed">Attention to detail in every fold, finish, and delivery.</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Our Process */}
      <section className="py-24 px-5">
        <Container isMaxWidth>
          <div className="text-center mb-16">
            <p className="text-[#C9A24B] uppercase text-[10px] font-bold tracking-[0.2em] mb-4">Our Process</p>
            <h2 className={`text-3xl md:text-4xl text-white max-w-2xl mx-auto leading-tight ${fraunces.className}`}>How Clean7 delivers premium laundry & car wash services.</h2>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-4 items-stretch justify-between relative">
            {/* Step 1 */}
            <div className="bg-[#1C1914] border border-white/5 rounded-3xl p-8 flex-1 flex flex-col items-center text-center relative z-10">
               <div className="flex items-center justify-between w-full mb-6">
                 <div className="w-8 h-8 rounded-full border border-[#C9A24B] text-[#C9A24B] text-xs font-bold flex items-center justify-center">01</div>
                 <div className="text-white"><Smartphone size={24} strokeWidth={1.5}/></div>
               </div>
               <h3 className="text-white font-bold text-[14px] mb-2">Schedule Pickup</h3>
               <p className="text-[#C9C2B2] text-[11px] leading-relaxed">Choose a pickup time that works for you.</p>
            </div>
            <div className="hidden lg:flex items-center justify-center text-white/20"><ArrowRight size={20}/></div>
            
            {/* Step 2 */}
            <div className="bg-[#1C1914] border border-white/5 rounded-3xl p-8 flex-1 flex flex-col items-center text-center relative z-10">
               <div className="flex items-center justify-between w-full mb-6">
                 <div className="w-8 h-8 rounded-full border border-[#C9A24B] text-[#C9A24B] text-xs font-bold flex items-center justify-center">02</div>
                 <div className="text-white"><Package size={24} strokeWidth={1.5}/></div>
               </div>
               <h3 className="text-white font-bold text-[14px] mb-2">We Collect</h3>
               <p className="text-[#C9C2B2] text-[11px] leading-relaxed">Our team arrives at your doorstep for pickup.</p>
            </div>
            <div className="hidden lg:flex items-center justify-center text-white/20"><ArrowRight size={20}/></div>
            
            {/* Step 3 */}
            <div className="bg-[#1C1914] border border-white/5 rounded-3xl p-8 flex-1 flex flex-col items-center text-center relative z-10">
               <div className="flex items-center justify-between w-full mb-6">
                 <div className="w-8 h-8 rounded-full border border-[#C9A24B] text-[#C9A24B] text-xs font-bold flex items-center justify-center">03</div>
                 <div className="text-white"><Sparkles size={24} strokeWidth={1.5}/></div>
               </div>
               <h3 className="text-white font-bold text-[14px] mb-2">Professional Care</h3>
               <p className="text-[#C9C2B2] text-[11px] leading-relaxed">Items are cleaned using premium products and careful techniques.</p>
            </div>
            <div className="hidden lg:flex items-center justify-center text-white/20"><ArrowRight size={20}/></div>

            {/* Step 4 */}
            <div className="bg-[#1C1914] border border-white/5 rounded-3xl p-8 flex-1 flex flex-col items-center text-center relative z-10">
               <div className="flex items-center justify-between w-full mb-6">
                 <div className="w-8 h-8 rounded-full border border-[#C9A24B] text-[#C9A24B] text-xs font-bold flex items-center justify-center">04</div>
                 <div className="text-white"><Search size={24} strokeWidth={1.5}/></div>
               </div>
               <h3 className="text-white font-bold text-[14px] mb-2">Quality Check</h3>
               <p className="text-[#C9C2B2] text-[11px] leading-relaxed">Every order is inspected, folded, packed, and prepared carefully.</p>
            </div>
            <div className="hidden lg:flex items-center justify-center text-white/20"><ArrowRight size={20}/></div>

            {/* Step 5 */}
            <div className="bg-[#1C1914] border border-white/5 rounded-3xl p-8 flex-1 flex flex-col items-center text-center relative z-10">
               <div className="flex items-center justify-between w-full mb-6">
                 <div className="w-8 h-8 rounded-full border border-[#C9A24B] text-[#C9A24B] text-xs font-bold flex items-center justify-center">05</div>
                 <div className="text-white"><Box size={24} strokeWidth={1.5}/></div>
               </div>
               <h3 className="text-white font-bold text-[14px] mb-2">Delivered Back</h3>
               <p className="text-[#C9C2B2] text-[11px] leading-relaxed">Fresh, clean, and delivered right on time.</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Focus / Mission / Vision Cards */}
      <section className="py-10 px-5">
        <Container isMaxWidth>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Focus Card */}
            <div className="bg-[#1C1914] border border-white/5 rounded-[32px] p-8 md:p-10 flex flex-col h-[550px] md:h-[650px] overflow-hidden relative">
              <p className="text-[#C9A24B] uppercase text-[10px] font-bold tracking-[0.2em] mb-4">Our Focus</p>
              <h3 className={`text-3xl text-white mb-10 ${fraunces.className}`}>Designed around<br/>modern living.</h3>
              
              <div className="flex gap-4 mb-6 relative z-10">
                <div className="w-10 h-10 rounded-xl border border-white/5 bg-white/5 text-[#C9A24B] flex items-center justify-center shrink-0"><Smartphone size={18}/></div>
                <div>
                  <p className="text-white text-[13px] font-bold mb-1">Convenience First</p>
                  <p className="text-[#C9C2B2] text-[11px] leading-relaxed">Pickup, tracking, and delivery designed to fit seamlessly into your routine.</p>
                </div>
              </div>
              <div className="flex gap-4 relative z-10">
                <div className="w-10 h-10 rounded-xl border border-white/5 bg-white/5 text-[#C9A24B] flex items-center justify-center shrink-0"><Sparkles size={18}/></div>
                <div>
                  <p className="text-white text-[13px] font-bold mb-1">Premium Experience</p>
                  <p className="text-[#C9C2B2] text-[11px] leading-relaxed">From cleaning quality to packaging, every detail is crafted to feel premium.</p>
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 h-64 md:h-80">
                <Image src="/images/about/about_focus_1782044614704.png" fill className="object-cover object-bottom" alt="Focus" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1914] via-[#1C1914]/50 to-transparent pointer-events-none"/>
              </div>
            </div>

            {/* Mission Card */}
            <div className="bg-[#1C1914] border border-white/5 rounded-[32px] p-8 md:p-10 flex flex-col h-[550px] md:h-[650px] overflow-hidden relative">
              <p className="text-[#C9A24B] uppercase text-[10px] font-bold tracking-[0.2em] mb-4">Our Mission</p>
              <p className="text-[#C9C2B2] text-[13px] leading-[1.8] relative z-10 md:w-[90%]">
                To simplify everyday care services through reliable, premium experiences that save people time and deliver consistent quality.
              </p>
              <div className="absolute bottom-0 left-0 right-0 h-[300px] md:h-[450px]">
                <Image src="/images/about/about_mission_1782044627703.png" fill className="object-cover object-bottom" alt="Mission" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1914] via-[#1C1914]/40 to-transparent pointer-events-none"/>
              </div>
            </div>

            {/* Vision Card */}
            <div className="bg-[#1C1914] border border-white/5 rounded-[32px] p-8 md:p-10 flex flex-col h-[550px] md:h-[650px] overflow-hidden relative">
              <p className="text-[#C9A24B] uppercase text-[10px] font-bold tracking-[0.2em] mb-4">Our Vision Ahead</p>
              <div className="text-[#C9C2B2] text-[13px] leading-[1.8] relative z-10 md:w-[95%] space-y-4">
                <p>
                  We envision Clean7 becoming the most trusted premium care platform for modern households — combining thoughtful service, technology, and convenience into one seamless experience.
                </p>
                <p>
                  As we grow, our focus remains the same: exceptional care, consistent quality, and experiences customers genuinely love.
                </p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-[250px] md:h-[350px]">
                <Image src="/images/about/about_vision_1782044639738.png" fill className="object-cover object-bottom" alt="Vision" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1914] via-[#1C1914]/40 to-transparent pointer-events-none"/>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-5 mb-10">
        <Container isMaxWidth>
          <div className="bg-gradient-to-r from-[#1C1914] to-[#211C13] border border-[#C9A24B]/20 rounded-[40px] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between relative overflow-hidden min-h-[300px] md:min-h-[250px]">
            {/* Background Image */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[200px] md:h-[280px] w-full md:w-[700px] opacity-80 mix-blend-screen pointer-events-none">
              <Image src="/images/about/about_cta_towels_1782044661279.png" fill className="object-contain object-bottom" alt="Premium Towels" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#1C1914]/80 via-transparent to-[#1C1914] pointer-events-none"/>
            </div>
            
            <div className="relative z-10 mb-10 md:mb-0 text-center md:text-left">
              <h2 className={`text-4xl md:text-5xl text-white mb-4 leading-tight ${fraunces.className}`}>
                Laundry that<br/>
                <span className="text-[#C9A24B] italic">fits your life.</span>
              </h2>
              <p className="text-[#C9C2B2] text-sm">
                Less time on chores. More time for<br className="hidden md:block"/>what matters.
              </p>
            </div>
            
            <div className="relative z-10 flex flex-col items-center gap-4 mt-16 md:mt-0">
              <Link href="/services" className="bg-[#C9A24B] text-[#15130F] px-8 py-4 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-[#E2BD6C] transition-colors whitespace-nowrap">
                Schedule your first pickup <ArrowRight size={16} strokeWidth={2.5}/>
              </Link>
              <p className="text-[#C9C2B2] text-[11px]">Quick. Easy. Reliable.</p>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
