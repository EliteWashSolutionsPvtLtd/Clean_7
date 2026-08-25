"use client";

import { ScrollReveal } from "../ui/ScrollReveal";

const reviews = [
  {
    quote:
      "Super impressed with the quality and how everything was folded. My clothes have never smelled this good!",
    name: "Ananya P.",
    location: "Bengaluru, KA",
    avatar: "AP",
  },
  {
    quote:
      "Pickup was on time, clothes were perfectly pressed, and the whole experience felt so easy. Will definitely be back.",
    name: "Rohan S.",
    location: "Mumbai, MH",
    avatar: "RS",
  },
  {
    quote:
      "Finally found a laundry service that actually cares. Attention to detail is next level.",
    name: "Meera T.",
    location: "Pune, MH",
    avatar: "MT",
  },
  {
    quote:
      "Love the hand-finished touch. You can really tell the difference in how they handle clothes.",
    name: "Arjun N.",
    location: "Delhi, DL",
    avatar: "AN",
  },
  {
    quote:
      "So convenient and hassle-free. Scheduling pickup took 30 seconds and everything else was perfect.",
    name: "Ishita K.",
    location: "Hyderabad, TG",
    avatar: "IK",
  },
  {
    quote:
      "Great service, friendly team, and clothes returned looking brand new.",
    name: "Vikram D.",
    location: "Chennai, TN",
    avatar: "VD",
  },
];

import { useEffect, useState } from "react";

export default function Reviews() {
  const [realReviews, setRealReviews] = useState<any[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.clean7.in";
        const res = await fetch(`${apiUrl}/reviews?limit=6`);
        const json = await res.json();
        if (json.success && json.data) {
          setRealReviews(json.data);
        }
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      }
    };
    fetchReviews();
  }, []);

  const displayReviews = realReviews.length >= 6 
    ? realReviews.slice(0, 6).map(r => {
        const name = r.order?.customer?.fullName || "Verified Customer";
        const avatar = name.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase();
        return {
          quote: r.description || "Excellent service, highly recommended!",
          name: name,
          location: "India",
          avatar: avatar,
        };
      }) 
    : reviews;

  return (
    <section
      id="reviews"
      className="py-[100px] px-[24px] md:px-[48px] bg-[var(--ground)]"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center mb-[48px] md:mb-[80px]">
          <ScrollReveal delay={0}>
            <p className="text-[15px] sm:text-[20px] font-bold tracking-[0.15em] text-[var(--gold)] uppercase mb-[16px] md:mb-[24px]">
              WHAT OUR CUSTOMERS SAY
            </p>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <h2
              className="text-[36px] md:text-[48px] lg:text-[64px] text-[var(--ink)] mb-[16px] md:mb-[24px] leading-[1.05]"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Real experiences.
              <br />
              <span className="italic text-[var(--gold)] font-light">
                Real care.
              </span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <p className="text-[var(--ink-soft)] text-[17px] leading-[1.7] max-w-[500px] mx-auto">
              We&apos;re just getting started, and every piece of feedback
              <br className="hidden md:block" />
              helps us keep raising the bar.
            </p>
          </ScrollReveal>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
          {displayReviews.map((rev, idx) => (
            <ScrollReveal delay={idx * 150} key={idx} className="h-full">
              <div className="bg-[var(--ground-soft)] rounded-[24px] p-[32px] sm:p-[40px] shadow-sm border border-[var(--line)] flex flex-col justify-between h-full transition-transform hover:-translate-y-1 duration-300">
                <div>
                  <span
                    className="text-[64px] leading-[0.5] text-[var(--gold)] block mb-[20px] mt-[10px]"
                    style={{ fontFamily: "var(--font-fraunces)" }}
                  >
                    “
                  </span>
                  <p className="text-[15px] text-[var(--ink-soft)] leading-[1.6] mb-[32px]">
                    {rev.quote}
                  </p>
                </div>
                <div className="pt-[24px] border-t border-[var(--line)] flex items-center gap-[16px]">
                  {/* Avatar (using initials) */}
                  <div className="w-[48px] h-[48px] rounded-full bg-[var(--gold)]/10 flex items-center justify-center text-[var(--gold)] font-medium text-[16px]">
                    {rev.avatar}
                  </div>
                  <div>
                    <h4
                      className="text-[17px] text-[var(--ink)] font-medium mb-[2px]"
                      style={{ fontFamily: "var(--font-fraunces)" }}
                    >
                      {rev.name}
                    </h4>
                    <p className="text-[13px] text-[var(--ink-soft)]">
                      {rev.location}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Footer Thanks */}
        <ScrollReveal delay={0}>
          <div className="mt-[80px] flex flex-col sm:flex-row items-center justify-center gap-[12px] sm:gap-[16px] text-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--gold)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <p className="text-[15px] text-[var(--ink-soft)]">
              Thank you to our early customers.{" "}
              <span
                className="italic text-[var(--gold)]"
                style={{ fontFamily: "var(--font-fraunces)" }}
              >
                We&apos;re grateful to be part of your routine.
              </span>
            </p>
          </div>
          
          <div className="mt-8 flex justify-center">
            <a
              href="/reviews"
              className="px-8 py-3 rounded-full border border-[var(--gold)] text-[var(--gold)] font-medium hover:bg-[var(--gold)] hover:text-[var(--card)] transition-colors duration-300"
            >
              View All Reviews
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
