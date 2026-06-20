"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { WixMadeForDisplayFont } from "@/app/fonts";
import Container from "../layout/Container";
import { gsap, prefersReducedMotion } from "@/app/lib/animations";
import { Leaf, Trash2, Droplet, Users, Recycle, HeartHandshake, MapPin } from "lucide-react";

export default function CleanIndiaSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ci-animate-up",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        }
      );

      gsap.fromTo(
        ".ci-animate-image",
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".ci-animate-image", start: "top 75%", once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="clean-india-commitment"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#FAFAFA] py-16 md:py-24"
    >
      {/* Curved Beige Background */}
      <div className="absolute right-0 top-0 h-full w-[80%] md:w-[60%] pointer-events-none z-0">
        <svg viewBox="0 0 500 1000" preserveAspectRatio="none" className="h-full w-full">
          <path d="M250,0 C450,300 -100,600 200,1000 L500,1000 L500,0 Z" fill="#F6ECE2" />
        </svg>
      </div>

      <Container isMaxWidth className="relative z-10 max-w-[1300px] px-5 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 items-center">
          
          {/* Left Column: Content */}
          <div className="ci-animate-up pt-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF2EB] px-3.5 py-1.5 text-[13px] font-bold tracking-wide text-[#326D38]">
              <Leaf className="h-4 w-4 fill-current" /> Our Promise
            </div>

            {/* Heading */}
            <h2
              className="mt-6 text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold leading-[1.05] tracking-tight text-[#1E1916]"
              style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
            >
              Proud to Support<br />
              <span className="text-[#F26B21]">a Clean India</span>{" "}
              <Leaf className="inline-block h-[clamp(2rem,4vw,3.5rem)] w-[clamp(2rem,4vw,3.5rem)] text-[#539E4C] fill-current -rotate-12" />
            </h2>

            {/* Subheading */}
            <p className="mt-6 max-w-lg text-[clamp(1rem,1.5vw,1.15rem)] leading-relaxed text-[#5E5E5E]">
              At Wash &amp; Wow, cleanliness is more than a service—
              it&apos;s our responsibility towards our homes,
              communities and our country.
            </p>

            {/* 2x2 Grid */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
              {/* Grid Item 1 */}
              <div>
                <Leaf className="mb-3 h-8 w-8 text-[#539E4C]" strokeWidth={1.5} />
                <h4 className="mb-1.5 text-[1.1rem] font-bold text-[#1A1A1A]">Eco-friendly Practices</h4>
                <p className="text-[14px] leading-relaxed text-[#6A6A6A] max-w-[240px]">
                  We use eco-safe products and responsible cleaning methods.
                </p>
              </div>
              {/* Grid Item 2 */}
              <div>
                <Trash2 className="mb-3 h-8 w-8 text-[#539E4C]" strokeWidth={1.5} />
                <h4 className="mb-1.5 text-[1.1rem] font-bold text-[#1A1A1A]">Responsible Disposal</h4>
                <p className="text-[14px] leading-relaxed text-[#6A6A6A] max-w-[240px]">
                  We ensure proper waste segregation and safe disposal.
                </p>
              </div>
              {/* Grid Item 3 */}
              <div>
                <Droplet className="mb-3 h-8 w-8 text-[#539E4C]" strokeWidth={1.5} />
                <h4 className="mb-1.5 text-[1.1rem] font-bold text-[#1A1A1A]">Save Water Initiative</h4>
                <p className="text-[14px] leading-relaxed text-[#6A6A6A] max-w-[240px]">
                  We follow smart water usage practices to conserve more.
                </p>
              </div>
              {/* Grid Item 4 */}
              <div>
                <Users className="mb-3 h-8 w-8 text-[#539E4C]" strokeWidth={1.5} />
                <h4 className="mb-1.5 text-[1.1rem] font-bold text-[#1A1A1A]">Stronger Communities</h4>
                <p className="text-[14px] leading-relaxed text-[#6A6A6A] max-w-[240px]">
                  We create cleaner, healthier spaces for everyone.
                </p>
              </div>
            </div>

            {/* Quote Block */}
            <div className="mt-12 flex items-center gap-5 rounded-2xl bg-[#FFF6EF] p-5 pr-8 max-w-md shadow-[0_4px_20px_rgba(242,107,33,0.05)] border border-[#FFE8D6]">
              <div className="relative h-[80px] w-[80px] shrink-0 bg-white rounded-full overflow-hidden border-2 border-[#FFE8D6]">
                <Image
                  src="/images/clean-india/gandhi_sketch.png"
                  alt="Mahatma Gandhi"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-[1.1rem] font-bold leading-snug text-[#1A1A1A]">
                  <span className="text-3xl leading-none text-[#F26B21] mr-1 font-serif">“</span>
                  Cleanliness is next to Godliness.”
                </p>
                <p className="mt-1.5 text-[14px] font-medium text-[#7A7A7A]">
                  — Mahatma Gandhi
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="ci-animate-image relative h-full w-full min-h-[500px] lg:min-h-[700px] flex items-center justify-center pt-10 lg:pt-0">
            <div className="relative w-full max-w-[550px] aspect-[4/5] lg:aspect-auto lg:h-[90%] rounded-[2rem] shadow-2xl">
              
              <Image
                src="/images/clean-india/clean_india_workers.png"
                alt="Workers cleaning in a park"
                fill
                className="rounded-[2rem] object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />

              {/* Floating Logo */}
              <div className="absolute -left-6 -top-12 sm:-left-12 sm:-top-16 lg:-left-20 lg:-top-10 h-36 w-36 sm:h-48 sm:w-48 rounded-full bg-white shadow-2xl p-2 flex items-center justify-center border-[8px] border-white z-20">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src="/images/clean-india/clean_india_logo.png"
                    alt="Clean India Logo"
                    fill
                    className="object-contain scale-[1.15]"
                  />
                </div>
              </div>

              {/* Floating Badge Bottom Right */}
              <div className="absolute -bottom-6 -right-2 sm:-right-8 lg:-right-12 flex items-center gap-4 rounded-full bg-white pl-3 pr-6 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-gray-100 z-20">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#EAF2EB]">
                  <Leaf className="h-6 w-6 text-[#539E4C] fill-current" />
                </div>
                <div className="whitespace-nowrap">
                  <p className="text-[14px] font-medium text-[#5B5B5B]">Small actions today,</p>
                  <p className="text-[15px] font-bold text-[#539E4C]">cleaner tomorrow.</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Banner Row */}
        <div className="ci-animate-up mt-20 md:mt-28">
          <div className="flex flex-wrap items-stretch justify-between gap-6 rounded-[2rem] bg-white/80 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] backdrop-blur-xl border border-white/50 xl:flex-nowrap">
            
            {/* Bottom Item 1 */}
            <div className="flex flex-1 min-w-[220px] items-start gap-4 p-4 hover:bg-gray-50/50 transition-colors rounded-2xl">
              <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-[#FFF6EF]">
                <Leaf className="h-6 w-6 text-[#F26B21]" strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-[15px] font-bold text-[#1A1A1A]">Eco Conscious</h4>
                <p className="mt-1 text-[13.5px] leading-relaxed text-[#6A6A6A]">We choose products that are safe for you and the planet.</p>
              </div>
            </div>

            {/* Bottom Item 2 */}
            <div className="flex flex-1 min-w-[220px] items-start gap-4 p-4 hover:bg-gray-50/50 transition-colors rounded-2xl">
              <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-[#FFF6EF]">
                <Recycle className="h-6 w-6 text-[#F26B21]" strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-[15px] font-bold text-[#1A1A1A]">Reduce. Reuse. Recycle.</h4>
                <p className="mt-1 text-[13.5px] leading-relaxed text-[#6A6A6A]">We minimize waste and encourage recycling at every step.</p>
              </div>
            </div>

            {/* Bottom Item 3 */}
            <div className="flex flex-1 min-w-[220px] items-start gap-4 p-4 hover:bg-gray-50/50 transition-colors rounded-2xl">
              <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-[#FFF6EF]">
                <HeartHandshake className="h-6 w-6 text-[#F26B21]" strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-[15px] font-bold text-[#1A1A1A]">Clean Spaces, Better Lives</h4>
                <p className="mt-1 text-[13.5px] leading-relaxed text-[#6A6A6A]">A cleaner environment leads to healthier homes and happier communities.</p>
              </div>
            </div>

            {/* Bottom Item 4 */}
            <div className="flex flex-1 min-w-[220px] items-start gap-4 p-4 hover:bg-gray-50/50 transition-colors rounded-2xl">
              <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-[#FFF6EF]">
                <MapPin className="h-6 w-6 text-[#F26B21]" strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-[15px] font-bold text-[#1A1A1A]">For a Better India</h4>
                <p className="mt-1 text-[13.5px] leading-relaxed text-[#6A6A6A]">Together, we can build a cleaner, greener and better tomorrow.</p>
              </div>
            </div>

          </div>
        </div>

      </Container>
    </section>
  );
}
