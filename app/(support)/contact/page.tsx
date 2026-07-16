import React from "react";
import Container from "@/app/components/layout/Container";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/sections/Footer";
import { SatoshiFont, WixMadeForDisplayFont } from "@/app/fonts";
import { Metadata } from "next";
import { canonicalPath } from "@/app/lib/site-config";
import ContactForm from "./ContactForm";

const SUPPORT_EMAIL = "support@clean7.in";
const SUPPORT_PHONE = "7078497263";
const BUSINESS_EMAIL = "support@clean7.in";
const BUSINESS_ADDRESS =
  "NH 58 Rohta Bypass Flyover Service Road Khadoli, Meerut";
const SUPPORT_HOURS = "9:00 AM – 8:00 PM, All Days";

const GOOGLE_MAPS_EMBED_URL =
  "https://maps.google.com/maps?q=28.992972,77.645833+(Clean7)&z=15&output=embed";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Clean7 for customer support, order help, partnerships, and general questions.",
  alternates: { canonical: canonicalPath("/contact") },
  openGraph: {
    url: canonicalPath("/contact"),
    description:
      "Reach Clean7 for customer support, order help, partnerships, and general questions.",
  },
};

function PolicySection({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 pt-8 first:pt-0">
      <h2
        className="mb-4 text-[20px] font-semibold text-[var(--ink)] sm:text-[24px] flex items-baseline"
        style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
      >
        <span className="font-bold tabular-nums text-[var(--ink)]">
          {number}
        </span>
        <span className="ml-2">{title}</span>
      </h2>
      <div className="space-y-4 text-[16px] md:text-[17px] leading-relaxed text-[var(--ink-soft)]">
        {children}
      </div>
    </section>
  );
}

function BulletList({ items }: { items: (string | React.ReactNode)[] }) {
  return (
    <ul className="ml-2 space-y-2 pl-4 list-disc marker:text-[var(--ink-soft)]">
      {items.map((item, i) => (
        <li key={i} className="pl-1">
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function ContactPage() {
  return (
    <div
      className="bg-[var(--ground)] min-h-screen text-[var(--ink)]"
      style={{ fontFamily: SatoshiFont.style.fontFamily }}
    >
      <Navbar />

      <Container
        isMaxWidth={true}
        className="mt-[70px] flex min-h-[30svh] items-center justify-start px-[clamp(20px,5vw,56px)] pb-6 pt-10 md:pb-8 md:pt-14"
      >
        <div className="w-full text-left max-w-4xl mx-auto">
          <h1
            className="text-[36px] font-semibold text-[var(--ink)] sm:text-[48px] md:text-[56px] tracking-tight"
            style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
          >
            Contact Us
          </h1>

          <p className="mt-6 text-[16px] md:text-[17px] font-medium text-[var(--ink-soft)] max-w-2xl">
            We&apos;re here to help! Whether you have a question, need support,
            or just want to say hello — the Clean7 team is always ready to
            assist you.
          </p>
        </div>
      </Container>

      <Container
        isMaxWidth={true}
        className="px-[clamp(20px,5vw,56px)] pb-16 md:pb-24"
      >
        <div className="mx-auto max-w-4xl">
          <div className="space-y-12">
            <PolicySection
              id="customer-support"
              number="1."
              title="Customer Support"
            >
              <p>Have questions about your order, pickup, or delivery?</p>
              <BulletList
                items={[
                  <React.Fragment key="email">
                    <strong>Email:</strong>{" "}
                    <a
                      href={`mailto:${SUPPORT_EMAIL}`}
                      className="text-[var(--gold)] hover:underline"
                    >
                      {SUPPORT_EMAIL}
                    </a>
                  </React.Fragment>,
                  <React.Fragment key="phone">
                    <strong>Phone:</strong>{" "}
                    <a
                      href={`tel:${SUPPORT_PHONE}`}
                      className="text-[var(--gold)] hover:underline"
                    >
                      {SUPPORT_PHONE}
                    </a>
                  </React.Fragment>,
                  <React.Fragment key="hours">
                    <strong>Support hours:</strong> {SUPPORT_HOURS}
                  </React.Fragment>,
                ]}
              />
            </PolicySection>

            <PolicySection id="message" number="2." title="Send us a Message">
              <p className="mb-4">
                You can also reach out to us by filling out the form below. We
                usually respond within 24 hours.
              </p>
              <div className="mt-6 max-w-xl">
                <ContactForm />
              </div>
            </PolicySection>

            <PolicySection
              id="order-support"
              number="3."
              title="Order & App Support"
            >
              <p>
                For faster assistance with your order, please include your
                registered phone number and Order ID (if applicable).
              </p>
              <p>
                Since all services are managed through our mobile application,
                we recommend:
              </p>
              <BulletList
                items={[
                  "Checking order status directly in the app",
                  "Using in-app support (if available)",
                ]}
              />
            </PolicySection>

            <PolicySection
              id="business"
              number="4."
              title="Business & Partnerships"
            >
              <p>Interested in partnering with Clean7?</p>
              <p>
                <strong>Email:</strong>{" "}
                <a
                  href={`mailto:${BUSINESS_EMAIL}?subject=Partnership Inquiry`}
                  className="text-[var(--gold)] hover:underline"
                >
                  {BUSINESS_EMAIL}
                </a>
                <br />
                <strong>Subject:</strong> Partnership Inquiry
              </p>
            </PolicySection>

            <PolicySection id="location" number="5." title="Our Location & Map">
              <p>
                <strong>Clean7</strong>
              </p>
              <p>{BUSINESS_ADDRESS}</p>
              <div className="mt-6 overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--card)] shadow-sm">
                <iframe
                  title="Clean7 location on Google Maps"
                  src={GOOGLE_MAPS_EMBED_URL}
                  className="aspect-[16/10] min-h-[260px] w-full border-0 sm:min-h-[340px] md:min-h-[400px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </PolicySection>
          </div>
        </div>
      </Container>

      <Footer />
    </div>
  );
}
