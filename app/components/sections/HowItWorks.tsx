"use client";

import { useEffect, useRef } from "react";
import { WixMadeForDisplayFont } from "@/app/fonts";
import Container from "../layout/Container";
import {
  gsap,
  prefersReducedMotion,
  getResponsiveConfig,
  ANIMATION_CONFIG,
} from "@/app/lib/animations";

// Custom SVG Icons based on the image
const HandIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 11V6C12 4.34315 10.6569 3 9 3C7.34315 3 6 4.34315 6 6V13" stroke="#E48737" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11 14L8 11M8 11H5.5C4.11929 11 3 12.1193 3 13.5C3 14.8807 4.11929 16 5.5 16H8M8 11V18" stroke="#E48737" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-0"/>
    <path d="M12 11L14.5 11C15.8807 11 17 12.1193 17 13.5C17 14.8807 15.8807 16 14.5 16H12" stroke="#E48737" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-0"/>
    <path d="M10 20C10 21.1046 10.8954 22 12 22C14.7614 22 17 19.7614 17 17V12.5C17 11.6716 16.3284 11 15.5 11C14.6716 11 14 11.6716 14 12.5M14 12.5V11.5C14 10.6716 13.3284 10 12.5 10C11.6716 10 11 10.6716 11 11.5V14" stroke="#E48737" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 7V5M12 5C12 3.89543 11.1046 3 10 3C8.89543 3 8 3.89543 8 5V14M12 5C12 3.89543 12.8954 3 14 3C15.1046 3 16 3.89543 16 5V13" stroke="#E48737" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-0"/>
    
    <path d="M10 2L10 5" stroke="#E48737" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M5.5 4.5L7.5 6.5" stroke="#E48737" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M14.5 4.5L12.5 6.5" stroke="#E48737" strokeWidth="1.5" strokeLinecap="round"/>
    
    <path d="M7 14L8 15" stroke="#E48737" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M7 20C4.79086 20 3 18.2091 3 16C3 14.5516 3.76953 13.2825 4.93913 12.6074L7 14M10 22C7.79086 22 6 20.2091 6 18" stroke="#E48737" strokeWidth="1.5" strokeLinecap="round"/>
    <rect x="7" y="10" width="14" height="12" rx="3" stroke="#E48737" strokeWidth="1.5" fill="none" className="opacity-0"/>
    
    <path d="M14 11V9C14 7.89543 13.1046 7 12 7C10.8954 7 10 7.89543 10 9V11.5" stroke="#E48737" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.5 13H15.5C16.3284 13 17 13.6716 17 14.5V19.5C17 20.3284 16.3284 21 15.5 21H9.5C8.67157 21 8 20.3284 8 19.5V14.5C8 13.6716 8.67157 13 9.5 13Z" stroke="#E48737" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HandPointIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3V5M16.2426 4.75736L14.8284 6.17157M19 9H17M16.2426 13.2426L14.8284 11.8284M12 11V16C12 17.6569 10.6569 19 9 19C7.34315 19 6 17.6569 6 16V14M6 14C6 12.8954 6.89543 12 8 12C9.10457 12 10 12.8954 10 14V16C10 16.5523 9.55228 17 9 17C8.44772 17 8 16.5523 8 16V14C8 13.4477 8.44772 13 9 13C9.55228 13 10 13.4477 10 14V16C10 17.1046 10.8954 18 12 18C13.1046 18 14 17.1046 14 16V10M14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10V11M14 10C14 11.1046 14.8954 12 16 12C17.1046 12 18 11.1046 18 10C18 8.89543 17.1046 8 16 8C14.8954 8 14 8.89543 14 10Z" stroke="#E48737" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 10V14C14 15.1046 13.1046 16 12 16" stroke="#E48737" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 10V11" stroke="#E48737" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CustomPointerIcon = () => (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 5L11 2M16 6L18 4M6 10H3M8 6L6 4" stroke="#E48737" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M11 11V8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8V14L15.352 11.1793C15.6563 10.814 16.1952 10.7423 16.5862 11.0163L16.6346 11.0501C17.0321 11.3283 17.1265 11.8841 16.8407 12.2642L14.5428 15.3283C14.1956 15.7913 13.9788 16.3344 13.9149 16.9102L13.8291 17.6826C13.6841 18.9877 12.5855 20 11.2725 20H10C8.34315 20 7 18.6569 7 17V16.3686C7 15.9084 6.84076 15.4623 6.54923 15.1051L5.35201 13.6385C5.04764 13.2657 5.10453 12.7153 5.48007 12.4042L5.53936 12.3551C5.93809 12.0248 6.53678 12.0622 6.88587 12.4392L9 14.723" stroke="#E48737" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

const CustomCalendarIcon = () => (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 2V5M16 2V5" stroke="#E48737" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 10H20" stroke="#E48737" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="4" y="6" width="16" height="15" rx="2" stroke="#E48737" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="16" cy="16" r="5" fill="#FCFAF7" stroke="#E48737" strokeWidth="1.5"/>
        <path d="M16 14V16L17.5 17.5" stroke="#E48737" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 14H8.01" stroke="#E48737" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11 14H11.01" stroke="#E48737" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

const CustomTruckIcon = () => (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 8H20.5C21.3284 8 22 8.67157 22 9.5V15H19" stroke="#E48737" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 11H22" stroke="#E48737" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 15H2V6C2 4.89543 2.89543 4 4 4H15C16.1046 4 17 4.89543 17 6V15H14" stroke="#E48737" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="6.5" cy="16.5" r="1.5" stroke="#E48737" strokeWidth="1.5"/>
        <circle cx="17.5" cy="16.5" r="1.5" stroke="#E48737" strokeWidth="1.5"/>
        <path d="M9 15H15" stroke="#E48737" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 11H12" stroke="#E48737" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 11H2.01" stroke="#E48737" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

const CustomRelaxIcon = () => (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 19H20" stroke="#E48737" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 19L7.5 13M18 19L16.5 13" stroke="#E48737" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H5C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" stroke="#E48737" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 11L9.2 5.5C9.44521 4.88697 10.0465 4.5 10.7071 4.5H16.5" stroke="#E48737" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15 4.5V11" stroke="#E48737" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 4.5V11" stroke="#E48737" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7.5 13L9 16.5H15L16.5 13" stroke="#E48737" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

const ShieldIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="#4A4A4A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 12L11 14L15 10" stroke="#4A4A4A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

const ClockIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="#4A4A4A" strokeWidth="1.5"/>
        <path d="M12 6V12L16 14" stroke="#4A4A4A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

const PinIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10Z" stroke="#4A4A4A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="10" r="3" stroke="#4A4A4A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

const ChatIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 11.5C21 16.1944 16.9706 20 12 20C10.6358 20 9.34185 19.6896 8.1969 19.1417L3 21L4.85834 15.8031C4.31043 14.6581 4 13.3642 4 12C4 7.30558 8.02944 3.5 13 3.5C17.9706 3.5 21 7.30558 21 11.5Z" stroke="#4A4A4A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 12H15" stroke="#4A4A4A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

const steps = [
  {
    title: "Choose a Service",
    desc: "Pick the service you need from our trusted options.",
    img: "/images/how-it-works/step-1.png",
    Icon: CustomPointerIcon,
    borderRadius: "20% 15% 30% 25% / 15% 30% 20% 25%",
  },
  {
    title: "Pick a Time",
    desc: "Select a date and time that works best for your schedule.",
    img: "/images/how-it-works/step-2.png",
    Icon: CustomCalendarIcon,
    borderRadius: "25% 30% 15% 20% / 30% 20% 25% 15%",
  },
  {
    title: "We Arrive",
    desc: "Our verified professional arrives at your doorstep, right on time.",
    img: "/images/how-it-works/step-3.png",
    Icon: CustomTruckIcon,
    borderRadius: "15% 25% 20% 30% / 25% 15% 30% 20%",
  },
  {
    title: "You Relax",
    desc: "Sit back and relax while we take care of the rest.",
    img: "/images/how-it-works/step-4.png",
    Icon: CustomRelaxIcon,
    borderRadius: "30% 20% 25% 15% / 20% 25% 15% 30%",
  },
];

const features = [
  {
    title: "Verified Professionals",
    desc: "Trained, background-verified and trustworthy experts.",
    Icon: ShieldIcon,
  },
  {
    title: "On-Time, Every Time",
    desc: "We value your time and always show up as promised.",
    Icon: ClockIcon,
  },
  {
    title: "Doorstep Convenience",
    desc: "No travel, no waiting—we come to you.",
    Icon: PinIcon,
  },
  {
    title: "Hassle-Free Experience",
    desc: "Simple booking, easy payments, and dedicated support.",
    Icon: ChatIcon,
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const config = getResponsiveConfig();

      gsap.fromTo(
        ".hiw-header",
        { opacity: 0, y: config.distance.medium },
        {
          opacity: 1,
          y: 0,
          duration: config.duration.normal * 1.3,
          ease: ANIMATION_CONFIG.ease.default,
          scrollTrigger: {
            trigger: ".hiw-header",
            start: "top 75%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".hiw-step",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: config.duration.normal,
          stagger: config.stagger.relaxed,
          ease: ANIMATION_CONFIG.ease.default,
          scrollTrigger: {
            trigger: ".hiw-steps-container",
            start: "top 75%",
            once: true,
          },
        },
      );
      
      gsap.fromTo(
        ".hiw-feature",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: config.duration.normal,
          stagger: config.stagger.tight,
          ease: ANIMATION_CONFIG.ease.default,
          scrollTrigger: {
            trigger: ".hiw-features-container",
            start: "top 85%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="bg-[#FCFAF7] overflow-hidden">
      <Container
        className="py-[90px] sm:py-[70px] md:py-[120px] px-[20px]"
        isMaxWidth={false}
      >
        {/* Header Section */}
        <div className="hiw-header gsap-animate text-center flex flex-col items-center gap-[12px] opacity-0 mb-[60px] md:mb-[80px]">
          <p className="text-[14px] font-bold tracking-[0.2em] text-[#E48737] uppercase">
            HOW IT WORKS
          </p>
          <h2
            className="text-[36px] sm:text-[42px] md:text-[48px] font-bold text-[#2A231F] leading-tight"
            style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
          >
            Simple steps. Smart service.
          </h2>
          <p className="text-[#77706B] mx-auto max-w-[600px] text-[17px] sm:text-[18px] leading-relaxed">
            From booking to doorstep, we make the entire <br className="hidden md:block" />
            process smooth and worry-free.
          </p>
          <div className="w-[40px] h-[4px] bg-[#E48737] rounded-full mt-[8px]"></div>
        </div>

        {/* Content Section - Steps */}
        <div className="hiw-steps-container relative max-w-[1200px] mx-auto w-full flex flex-col md:flex-row items-stretch justify-between gap-[40px] md:gap-[20px] mb-[80px] md:mb-[100px]">
          
          {/* Dashed curved lines linking the steps (desktop only) */}
          <div className="hidden md:block absolute left-0 right-0 top-[110px] w-full h-[150px] z-0 pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 1000 150" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <path d="M 125 50 C 180 30, 220 80, 250 80 C 280 80, 320 30, 375 50" stroke="#E48737" strokeWidth="1.5" strokeDasharray="6 6" />
              <path d="M 375 50 C 430 30, 470 80, 500 80 C 530 80, 570 30, 625 50" stroke="#E48737" strokeWidth="1.5" strokeDasharray="6 6" />
              <path d="M 625 50 C 680 30, 720 80, 750 80 C 780 80, 820 30, 875 50" stroke="#E48737" strokeWidth="1.5" strokeDasharray="6 6" />
            </svg>
          </div>

          {steps.map((step, index) => (
            <div key={index} className="hiw-step gsap-animate opacity-0 flex flex-col items-center flex-1 z-10">
              <div 
                className="w-[200px] h-[220px] md:w-[220px] md:h-[240px] overflow-hidden mb-[24px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] bg-gray-100"
                style={{ borderRadius: step.borderRadius }}
              >
                <img 
                  src={step.img} 
                  alt={step.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col items-center text-center px-[10px]">
                <div className="mb-[12px] text-[#E48737]">
                  <step.Icon />
                </div>
                <h3 className="text-[20px] font-bold text-[#2A231F] mb-[8px]" style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}>
                  {step.title}
                </h3>
                <p className="text-[15px] text-[#77706B] leading-snug max-w-[240px]">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Features Bottom Bar */}
        <div className="hiw-features-container max-w-[1100px] mx-auto w-full">
            <div className="bg-white rounded-[24px] md:rounded-[40px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] px-[20px] py-[30px] md:px-[40px] md:py-[24px] flex flex-col md:flex-row items-center justify-between gap-[30px] md:gap-[20px] divide-y md:divide-y-0 md:divide-x divide-gray-100">
                {features.map((feature, index) => (
                    <div key={index} className="hiw-feature gsap-animate opacity-0 flex items-start gap-[16px] w-full pt-[20px] md:pt-0 md:px-[20px] first:pt-0 first:pl-0 last:pr-0">
                        <div className="mt-[2px] shrink-0 text-[#4A4A4A]">
                            <feature.Icon />
                        </div>
                        <div className="flex flex-col">
                            <h4 className="text-[15px] font-bold text-[#2A231F] mb-[4px]" style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}>
                                {feature.title}
                            </h4>
                            <p className="text-[13px] text-[#77706B] leading-snug">
                                {feature.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </Container>
    </section>
  );
}
