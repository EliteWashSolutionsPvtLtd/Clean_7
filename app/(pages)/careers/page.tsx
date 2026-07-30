import { Metadata } from "next";
import { CareersClient } from "./careers-client";
import Image from "next/image";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/sections/Footer";
import {
  PageHeroAnimation,
  PageSectionsAnimation,
} from "@/app/components/animations/PageAnimations";

export const metadata: Metadata = {
  title: "Careers | Clean7",
  description: "Join the Team at Clean7",
};

export default function CareersPage() {
  return (
    <div className="bg-[var(--background)] text-[var(--foreground)] overflow-clip font-sans">
      <Navbar />
      <main className="pt-32 md:pt-40 pb-24">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          {/* Hero Section */}
          <PageHeroAnimation variant="split">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
              <div className="page-hero-left">
                <h3 className="text-[var(--gold)] font-bold tracking-widest text-sm uppercase mb-4">
                  Careers at Clean7
                </h3>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
                  Build the future
                  <br />
                  of{" "}
                  <span className="text-[var(--gold)] italic font-serif">
                    care
                  </span>{" "}
                  with us.
                </h1>
                <p className="text-lg text-[var(--ink-soft)] mb-8 max-w-md">
                  We're more than a laundry and home care brand. We're a team of
                  problem solvers, innovators and doers who are passionate about
                  making everyday life easier for thousands of people.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#open-positions"
                    className="inline-flex items-center justify-center rounded-full bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-black px-6 py-3 font-semibold transition-colors"
                  >
                    View Open Positions
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                  <button className="inline-flex items-center justify-center rounded-full border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-black px-6 py-3 font-semibold transition-colors">
                    <svg
                      className="mr-2 w-5 h-5 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Life at Clean7
                  </button>
                </div>
              </div>
              <div className="page-hero-right relative h-[400px] lg:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl border border-[var(--line)]">
                <Image
                  src="/images/careers-team.png"
                  alt="Team at Clean7"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </PageHeroAnimation>

          {/* Why work with us? */}
          <PageSectionsAnimation
            sequentialSections={true}
            className="mb-24 text-center"
          >
            <h2 className="page-section text-3xl font-bold mb-4 font-serif">
              Why work with us?
            </h2>
            <p className="text-[var(--ink-soft)] mb-12 max-w-2xl mx-auto">
              We create an environment where you can grow, contribute and make a
              real impact.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                {
                  title: "People First",
                  desc: "We value respect, trust and collaboration in everything we do.",
                  icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
                },
                {
                  title: "Growth Mindset",
                  desc: "Learn, upskill and grow with continuous opportunities.",
                  icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
                },
                {
                  title: "Diversity",
                  desc: "A workplace where everyone belongs and thrives together.",
                  icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
                },
                {
                  title: "Impact",
                  desc: "Your work matters to our customers and our communities.",
                  icon: "M13 10V3L4 14h7v7l9-11h-7z",
                },
                {
                  title: "Flexibility",
                  desc: "We embrace a flexible and modern approach to work.",
                  icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                },
              ].map((card, idx) => (
                <div
                  key={idx}
                  className="page-card flex flex-col items-center p-6 border border-[var(--line)] rounded-2xl bg-[var(--card)] hover:-translate-y-1 hover:border-[var(--gold)] transition-transform duration-300 text-center"
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[var(--line)] text-[var(--gold)] mb-4">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d={card.icon}
                      />
                    </svg>
                  </div>
                  <h4 className="font-semibold mb-2 text-sm">{card.title}</h4>
                  <p className="text-xs text-[var(--ink-soft)]">{card.desc}</p>
                </div>
              ))}
            </div>
          </PageSectionsAnimation>

          <CareersClient />
        </div>
      </main>
      <Footer />
    </div>
  );
}
