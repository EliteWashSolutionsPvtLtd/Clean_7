"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Container from "../layout/Container";
import { WixMadeForDisplayFont } from "@/app/fonts";
import DownloadAppModal from "../ui/modals/DownloadAppModal";
import { scrollToSection } from "@/app/utils/scrollToSection";
import { 
  ArrowRight, ShieldCheck, Clock, ThumbsUp, Zap,
  Shirt, Car, Bug, Home, CalendarCheck, Shield, MapPin, Smile, Sparkles, CalendarDays
} from "lucide-react";

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <section id="home" ref={sectionRef} className="relative pt-[90px] pb-10 bg-[#FDFCF9] overflow-hidden">
      
      {/* Right Side Huge Abstract Background Shape */}
      <div className="absolute top-[-10%] right-[-10%] w-[800px] lg:w-[1200px] h-[800px] lg:h-[1200px] bg-[#FFF3E5] rounded-bl-[400px] rounded-tl-[600px] rounded-tr-[100px] rounded-br-[100px] -z-10 opacity-70" />

      <Container isMaxWidth={true} className="px-[20px] relative z-10">
        
        {/* Top Hero Layout: Text (Left) + Image (Right) */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          
          {/* Left: Text Content */}
          <div className="w-full lg:w-[55%] flex flex-col items-start text-left">
            {/* Headline */}
            <h1 
              className="text-[2.2rem] xs:text-[2.5rem] sm:text-[3.2rem] md:text-[4.5rem] lg:text-[4.8rem] font-extrabold text-[#2D2422] mb-6 tracking-tight flex flex-col"
              style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily, lineHeight: 1.15 }}
            >
              <span className="whitespace-nowrap">Everything Clean.</span>
              <span className="text-[#FF7700] whitespace-nowrap">Everything Wow.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-[#6B5E5B] text-[1.05rem] md:text-[1.15rem] leading-[1.3] mb-10 max-w-[540px]">
              Laundry, car wash, pest control, and home cleaning — handled seamlessly, delivered to your doorstep.
            </p>

            {/* Buttons */}
            <div className="flex flex-nowrap items-center gap-3 sm:gap-4 mb-12">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center gap-2 sm:gap-4 bg-[#FF7700] text-white px-4 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-[14px] sm:text-[1.1rem] hover:bg-[#e66a00] hover:scale-105 active:scale-95 transition-all shadow-[0_8px_20px_rgba(255,119,0,0.25)] whitespace-nowrap"
              >
                Book a Service
                <span className="bg-white text-[#FF7700] rounded-full p-1 sm:p-1.5 flex items-center justify-center shrink-0">
                  <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" strokeWidth={3} />
                </span>
              </button>
              
              <Link 
                href="/services"
                className="flex items-center justify-center gap-2 sm:gap-3 bg-white text-[#2D2422] px-4 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-[14px] sm:text-[1.1rem] border border-gray-200 hover:shadow-lg hover:border-transparent hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
              >
                Explore Services
                <ArrowRight size={18} className="text-[#FF7700] sm:w-[20px] sm:h-[20px] shrink-0" strokeWidth={2.5} />
              </Link>
            </div>

            {/* Info Card */}
            <div className="flex items-center gap-4 bg-[#FFF6EE] border border-[#FFE0C2] rounded-2xl px-5 py-3.5 w-fit">
              <div className="w-10 h-10 shrink-0 bg-[#FF7700] rounded-xl flex items-center justify-center shadow-sm">
                <Zap size={20} className="text-white fill-white" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[15px] font-bold text-[#2D2422] leading-snug">
                  Book your first service in{" "}
                  <span className="text-[#FF7700]">under 60 seconds</span>
                </p>
                <p className="text-[13px] text-[#6B5E5B] mt-0.5">No calls. No confusion. Just clean homes.</p>
              </div>
            </div>
          </div>

          {/* Right: Hero Image & Floating Card */}
          <div className="w-full lg:w-[45%] relative mt-16 lg:mt-0">
            {/* Main Image Container */}
            <div className="relative w-full h-[400px] md:h-[550px] rounded-bl-[120px] rounded-tl-[240px] rounded-tr-[40px] rounded-br-[40px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.12)]">
              <Image 
                src="/images/hero/woman.png" 
                alt="Woman using phone to book home services" 
                fill 
                className="object-cover"
                priority
              />
            </div>

            {/* Floating Card — glassmorphism */}
            <div className="absolute top-[10%] lg:top-[20%] right-[-5%] lg:right-[-12%] rounded-[24px] p-6 lg:p-8 z-10 min-w-[260px]
              bg-white/40 backdrop-blur-xl
              border border-white/60
              shadow-[0_8px_32px_rgba(255,119,0,0.08),0_2px_8px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.8)]"
            >
              {/* Subtle inner glow top edge */}
              <div className="absolute inset-0 rounded-[24px] bg-gradient-to-b from-white/50 to-transparent pointer-events-none" />
              <ul className="flex flex-col gap-5 relative z-10">
                {[
                  { icon: CalendarDays, text: "Easy Booking" },
                  { icon: ShieldCheck, text: "Verified Experts" },
                  { icon: Clock, text: "On-Time Service" },
                  { icon: ThumbsUp, text: "Satisfaction Guaranteed" },
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-4">
                    <div className="bg-[#FF7700]/15 backdrop-blur-sm p-2 rounded-full text-[#FF7700] border border-[#FF7700]/20 shadow-sm">
                      <item.icon size={20} strokeWidth={2.5} />
                    </div>
                    <span className="text-[#2D2422] font-bold text-[15px] drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </Container>

      {/* Overlapping Service Cards */}
      <div className="relative z-20 mt-[100px] lg:mt-[80px] pb-10">
        <Container isMaxWidth={true} className="px-[20px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {[
              {
                id: "01",
                title: "Laundry",
                desc: "Fresh, clean and perfectly cared for.",
                img: "/images/services/laundry.png",
                icon: Shirt
              },
              {
                id: "02",
                title: "Door to Door Car Wash",
                desc: "Spotless shine, right at your door.",
                img: "/images/services/car-wash.png",
                icon: Car
              },
              // {
              //   id: "03",
              //   title: "Pest Control",
              //   desc: "Safe, effective and home-friendly solutions.",
              //   img: "/images/services/pest-control.png",
              //   icon: Bug
              // },
              // {
              //   id: "04",
              //   title: "Home Cleaning",
              //   desc: "A cleaner home for a healthier you.",
              //   img: "/images/services/home-cleaning.png",
              //   icon: Home
              // }
            ].map((service) => (
              <div key={service.id} className="bg-white rounded-[24px] shadow-[0_12px_30px_rgba(0,0,0,0.06)] overflow-hidden group hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full border border-gray-50">
                {/* Image Area with Wavy Bottom */}
                <div className="relative h-[200px] w-full bg-[#F5F2EF]">
                  <Image src={service.img} alt={service.title} fill className="object-cover" />
                  
                  {/* Top Left Badge */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-lg shadow-sm border border-gray-100">
                    <span className="text-[#FF7700] font-extrabold text-sm tracking-wide">{service.id}</span>
                  </div>

                  {/* SVG Wavy Bottom */}
                  <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-[0]">
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[35px] lg:h-[45px]">
                      <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,152.47,125.75,223.1,104.7,258.12,94.25,291.61,75.14,321.39,56.44Z" fill="#ffffff"></path>
                    </svg>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 pt-1 flex flex-col flex-grow relative bg-white">
                  {/* Overlapping Icon Badge */}
                  <div className="absolute top-[-30px] left-6 w-[52px] h-[52px] bg-[#FF7700] rounded-full flex items-center justify-center shadow-lg border-[4px] border-white transition-transform group-hover:scale-110">
                    <service.icon className="text-white w-[22px] h-[22px]" />
                  </div>
                  
                  <div className="mt-8 flex-grow">
                    <h3 className="text-[1.35rem] font-extrabold text-[#2D2422] mb-2.5 leading-tight" style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}>
                      {service.title}
                    </h3>
                    <p className="text-[#6B5E5B] text-[15px] leading-[1.3]">
                      {service.desc}
                    </p>
                  </div>

                  <div className="mt-6">
                    <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 text-[#FF7700] font-bold hover:gap-3 transition-all text-[15px]">
                      Book Now <ArrowRight size={18} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Bottom Features Bar */}
      <div className="relative z-20 pb-20">
        <Container isMaxWidth={true} className="px-[20px]">
          <div className="bg-white rounded-[24px] shadow-[0_5px_20px_rgba(0,0,0,0.03)] p-8 lg:p-10 border border-gray-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: CalendarCheck, title: "Quick & Easy Booking", desc: "Book in minutes,\nrelax for hours." },
                { icon: Shield, title: "Trusted Professionals", desc: "Verified, trained and\nbackground-checked." },
                { icon: MapPin, title: "Doorstep Service", desc: "We come to you,\nanytime, anywhere." },
                { icon: Smile, title: "Satisfaction Guaranteed", desc: "Quality service you can\nalways count on." }
              ].map((feature, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-[48px] h-[48px] shrink-0 bg-[#FFF3E5] rounded-full flex items-center justify-center text-[#FF7700] border border-[#FFE8D6]">
                    <feature.icon size={22} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className="text-[#2D2422] font-bold text-[15px] mb-1 leading-tight">{feature.title}</h4>
                    <p className="text-[#6B5E5B] text-[13px] leading-[1.3] whitespace-pre-line">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>

      <DownloadAppModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
