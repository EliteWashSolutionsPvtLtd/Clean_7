import { Metadata } from "next";
import { CareersClient } from "./careers-client";
import Image from "next/image";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/sections/Footer";

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            <div>
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
            <div className="relative h-[400px] lg:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl border border-[var(--line)]">
              <Image
                src="/images/careers-team.png"
                alt="Team at Clean7"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Why work with us? */}
          <div className="mb-24 text-center">
            <h2 className="text-3xl font-bold mb-4 font-serif">
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
                  title: "Meaningful Impact",
                  desc: "Your work directly improves the lives of thousands of customers.",
                  icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
                },
                {
                  title: "Fair & Competitive",
                  desc: "We offer fair compensation and acknowledge your contributions.",
                  icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                },
                {
                  title: "Balance Matters",
                  desc: "We respect your time and believe in a healthy work-life balance.",
                  icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
                },
              ].map((card, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center p-6 border border-[var(--line)] rounded-2xl bg-[var(--card)] hover:border-[var(--gold)] transition-colors text-center"
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
          </div>

          <CareersClient />
        </div>
      </main>
      <Footer />
    </div>
  );
}
