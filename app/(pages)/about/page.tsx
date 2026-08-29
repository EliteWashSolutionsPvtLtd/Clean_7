"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/sections/Footer";
import { SatoshiFont } from "@/app/fonts";
import { ArrowRight, Clock, Heart, Car, BadgeCheck } from "lucide-react";
import Container from "@/app/components/layout/Container";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";
import { Fraunces } from "next/font/google";
import styles from "@/app/components/sections/Hero.module.css";

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
            <ScrollReveal delay={0} className="lg:w-[50%]">
              <p className="text-[var(--gold)] uppercase text-[22px] font-bold tracking-[0.02em] mb-6">
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
              <p className="text-[var(--ink-soft)] text-sm md:text-base mb-4 max-w-md leading-relaxed">
                Clean7 was built to make laundry and car care feel effortless,
                reliable, and thoughtfully handled. From pickup to delivery,
                every detail is designed to save time while delivering premium
                results.
              </p>
            </ScrollReveal>

            <ScrollReveal
              delay={300}
              className="lg:w-[40%] relative h-[400px] lg:h-[500px] lg:mt-0 w-full rounded-2xl md:rounded-3xl group flex items-center justify-center"
            >
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
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Stats Bar */}
      <section className="my-10">
        <Container
          isMaxWidth
          className="px-[clamp(20px,5vw,56px)] flex justify-center"
        >
          <ScrollReveal delay={150} className="w-full max-w-[600px]">
            <div className="bg-[var(--ground-soft)] rounded-[20px] md:rounded-3xl py-8 px-2 w-full max-w-[600px] md:px-12 md:py-10">
              <div
                className={styles.trustRow}
                style={{ marginTop: 0, opacity: 1, animation: "none" }}
              >
                <div className={styles.trustStat}>
                  <div className={styles.num}>24 hr</div>
                  <div className={styles.label}>Turnaround</div>
                </div>
                <div className={styles.trustDivider}></div>
                <div className={styles.trustStat}>
                  <div className={styles.num}>40k+</div>
                  <div className={styles.label}>Expected Garments monthly</div>
                </div>
                <div className={styles.trustDivider}></div>
                <div className={styles.trustStat}>
                  <div className={styles.num}>4.9</div>
                  <div className={styles.label}>Expected Rating</div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Who We Are */}
      <section className="py-20">
        <Container isMaxWidth className="px-[clamp(20px,5vw,56px)]">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <ScrollReveal delay={0} className="lg:w-1/2 w-full">
              <div className="relative h-[350px] md:h-[450px] w-full rounded-3xl overflow-hidden">
                <Image
                  src="/images/about/delivery-bike.png"
                  fill
                  className="object-cover"
                  alt="Clean7 Delivery Bike"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200} className="lg:w-1/2 lg:pl-10">
              <p className="text-[var(--gold)] uppercase text-[20px] font-bold tracking-[0.05em] mb-4">
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
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-gradient-to-b from-[var(--ground)] to-[var(--ground-soft)]">
        <Container isMaxWidth className="px-[clamp(20px,5vw,56px)]">
          <ScrollReveal delay={0}>
            <div className="text-center mb-16">
              <p className="text-[var(--gold)] uppercase text-[20px] font-bold tracking-[0.1em] mb-4">
                Why Choose Us
              </p>
              <h2
                className={`text-3xl md:text-5xl text-[var(--ink)] ${fraunces.className}`}
              >
                Care in every detail.
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <ScrollReveal delay={0} className="h-full">
              <div className="bg-[var(--ground-soft)] h-full shadow-md hover:shadow-lg border border-transparent rounded-[20px] md:rounded-3xl p-4 sm:p-6 md:p-8 flex flex-col items-center text-center transition-all hover:-translate-y-1 hover:border-[var(--gold)]/20">
                <div className="text-[var(--gold)] mb-4 md:mb-6 scale-75 md:scale-100">
                  <BadgeCheck size={36} strokeWidth={1.5} />
                </div>
                <h3 className="text-[var(--ink)] font-bold text-[16px] md:text-[15px] mb-2 md:mb-3">
                  Premium Quality
                </h3>
                <p className="text-[var(--ink-soft)] text-[15px] md:text-xs leading-relaxed">
                  Fabric-safe cleaning and careful handling for every order.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={150} className="h-full">
              <div className="bg-[var(--ground-soft)] h-full shadow-md hover:shadow-lg border border-transparent rounded-[20px] md:rounded-3xl p-4 sm:p-6 md:p-8 flex flex-col items-center text-center transition-all hover:-translate-y-1 hover:border-[var(--gold)]/20">
                <div className="text-[var(--gold)] mb-4 md:mb-6 scale-75 md:scale-100">
                  <Car size={36} strokeWidth={1.5} />
                </div>
                <h3 className="text-[var(--ink)] font-bold text-[16px] md:text-[15px] mb-2 md:mb-3">
                  Pickup & Delivery
                </h3>
                <p className="text-[var(--ink-soft)] text-[15px] md:text-xs leading-relaxed">
                  Doorstep convenience designed around your schedule.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={300} className="h-full">
              <div className="bg-[var(--ground-soft)] h-full shadow-md hover:shadow-lg border border-transparent rounded-[20px] md:rounded-3xl p-4 sm:p-6 md:p-8 flex flex-col items-center text-center transition-all hover:-translate-y-1 hover:border-[var(--gold)]/20">
                <div className="text-[var(--gold)] mb-4 md:mb-6 scale-75 md:scale-100">
                  <Clock size={36} strokeWidth={1.5} />
                </div>
                <h3 className="text-[var(--ink)] font-bold text-[16px] md:text-[15px] mb-2 md:mb-3">
                  Fast Turnaround
                </h3>
                <p className="text-[var(--ink-soft)] text-[15px] md:text-xs leading-relaxed">
                  Freshly cleaned and delivered back within 24 hours.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={450} className="h-full">
              <div className="bg-[var(--ground-soft)] h-full shadow-md hover:shadow-lg border border-transparent rounded-[20px] md:rounded-3xl p-4 sm:p-6 md:p-8 flex flex-col items-center text-center transition-all hover:-translate-y-1 hover:border-[var(--gold)]/20">
                <div className="text-[var(--gold)] mb-4 md:mb-6 scale-75 md:scale-100">
                  <Heart size={36} strokeWidth={1.5} />
                </div>
                <h3 className="text-[var(--ink)] font-bold text-[16px] md:text-[15px] mb-2 md:mb-3">
                  Thoughtful Service
                </h3>
                <p className="text-[var(--ink-soft)] text-[15px] md:text-xs leading-relaxed">
                  Attention to detail in every fold, finish, and delivery.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Focus / Mission / Vision Cards */}
      <section className="py-10">
        <Container isMaxWidth className="px-[clamp(20px,5vw,56px)]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Focus Card */}
            <ScrollReveal delay={0} className="h-full">
              <div className="bg-[var(--ground-soft)] rounded-[32px] p-8 md:p-10 flex flex-col h-full relative">
                <p className="text-[var(--gold)] uppercase text-[15px] font-bold tracking-[0.05em] mb-4">
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
                  <div>
                    <p className="text-[var(--ink)] text-[15px] font-bold mb-1">
                      Convenience First
                    </p>
                    <p className="text-[var(--ink-soft)] text-[15px] leading-relaxed">
                      Pickup, tracking, and delivery designed to fit seamlessly
                      into your routine.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 relative z-10">
                  <div>
                    <p className="text-[var(--ink)] text-[15px] font-bold mb-1">
                      Premium Experience
                    </p>
                    <p className="text-[var(--ink-soft)] text-[15px] leading-relaxed">
                      From cleaning quality to packaging, every detail is
                      crafted to feel premium.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 relative z-10 mt-6">
                  <div>
                    <p className="text-[var(--ink)] text-[15px] font-bold mb-1">
                      Trusted Care
                    </p>
                    <p className="text-[var(--ink-soft)] text-[15px] leading-relaxed">
                      Your garments and home are handled with utmost respect by
                      our trained professionals.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Mission Card */}
            <ScrollReveal delay={200} className="h-full">
              <div className="bg-[var(--ground-soft)] rounded-[32px] p-8 md:p-10 flex flex-col h-full relative">
                <p className="text-[var(--gold)] uppercase text-[15px] font-bold tracking-[0.05em] mb-4">
                  Our Mission
                </p>

                <div className="text-[var(--ink-soft)] text-[15px] leading-[1.8] relative z-10 space-y-6">
                  <p
                    className={`text-xl md:text-2xl text-[var(--ink)] leading-snug ${fraunces.className}`}
                  >
                    To simplify everyday care services through reliable, premium
                    experiences that give you back your time.
                  </p>
                  <p>
                    We believe that managing your laundry, home, or vehicle
                    shouldn&apos;t feel like a second job. Our mission is to
                    seamlessly integrate into your busy lifestyle, providing a
                    frictionless service you can confidently rely on week after
                    week.
                  </p>
                  <p>
                    Every garment we clean and every vehicle we detail is a
                    promise kept. We are committed to maintaining the highest
                    standards of care, ensuring you always step out looking and
                    feeling your best.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Vision Card */}
            <ScrollReveal delay={400} className="h-full">
              <div className="bg-[var(--ground-soft)] rounded-[32px] p-8 md:p-10 flex flex-col h-full relative">
                <p className="text-[var(--gold)] uppercase text-[15px] font-bold tracking-[0.05em] mb-4">
                  Our Vision Ahead
                </p>

                <div className="text-[var(--ink-soft)] text-[15px] leading-[1.8] relative z-10 space-y-6">
                  <p
                    className={`text-xl md:text-2xl text-[var(--ink)] leading-snug ${fraunces.className}`}
                  >
                    Setting the new standard for premium household care across
                    the nation.
                  </p>
                  <p>
                    We envision Clean7 as the go-to partner for modern living —
                    where thoughtful service meets cutting-edge convenience. Our
                    goal is to expand our reach while maintaining the meticulous
                    attention to detail that our foundational clients have come
                    to expect.
                  </p>
                  <p>
                    We are constantly innovating our processes and training to
                    ensure every interaction leaves you delighted. Join us on
                    this journey to elevate everyday chores into a premium,
                    worry-free experience.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 mb-10">
        <Container isMaxWidth className="px-[clamp(20px,5vw,56px)]">
          <ScrollReveal delay={150}>
            <div className="bg-gradient-to-r from-[var(--ground-soft)] to-[var(--ground)] rounded-[40px] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between relative overflow-hidden min-h-[300px] md:min-h-[250px]">
              <div className="relative z-10 mb-10 md:mb-0 text-center md:text-left">
                <h2
                  className={`text-4xl md:text-5xl text-[var(--ink)] mb-4 leading-tight ${fraunces.className}`}
                >
                  Services that{" "}
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
          </ScrollReveal>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
