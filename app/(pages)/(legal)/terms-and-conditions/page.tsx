import React from "react";
import Container from "@/app/components/layout/Container";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/sections/Footer";
import { SatoshiFont, WixMadeForDisplayFont } from "@/app/fonts";
import { Metadata } from "next";
import { canonicalPath } from "@/app/lib/site-config";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Terms governing use of Clean7 website, app, and laundry services.",
  alternates: { canonical: canonicalPath("/terms-and-conditions") },
  openGraph: {
    url: canonicalPath("/terms-and-conditions"),
    description:
      "Terms governing use of Clean7 website, app, and laundry services.",
  },
};

const LAST_UPDATED = "May 24, 2024";

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

export default function TermsAndConditionsPage() {
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
            Terms & Conditions
          </h1>

          <p className="mt-6 text-[16px] md:text-[17px] font-medium text-[var(--ink-soft)]">
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </Container>

      <Container
        isMaxWidth={true}
        className="px-[clamp(20px,5vw,56px)] pb-16 md:pb-24"
      >
        <div className="mx-auto max-w-4xl">
          <div className="space-y-12">
            <PolicySection id="intro" number="1." title="Introduction">
              <p>
                Welcome to Clean7. These terms govern your use of our website,
                app, and services.
              </p>
              <p>
                By accessing or using our services, you agree to be bound by
                these Terms.
              </p>
            </PolicySection>

            <PolicySection id="eligibility" number="2." title="Eligibility">
              <p>
                You must be at least <strong>18 years old</strong> to use our
                services. By using our App or Website, you confirm that you meet
                this requirement.
              </p>
            </PolicySection>

            <PolicySection id="services" number="3." title="Nature of Services">
              <p>
                <strong>Clean7</strong> provides:
              </p>
              <BulletList
                items={[
                  "Doorstep pickup and delivery",
                  "Laundry, dry cleaning, and ironing services",
                ]}
              />
              <p>
                All services are subject to availability and operational
                constraints.
              </p>
            </PolicySection>

            <PolicySection id="account" number="4." title="Account & Booking">
              <p>
                To use our App, you may be required to create an account and
                provide accurate and complete information. You are responsible
                for maintaining the confidentiality of your account.
              </p>
              <BulletList
                items={[
                  "Orders must be placed through the App.",
                  "Pickup and delivery slots are subject to availability.",
                  "You must ensure availability at the scheduled time. Failure to be available may result in delays or cancellation.",
                ]}
              />
            </PolicySection>

            <PolicySection id="pricing" number="5." title="Pricing & Payments">
              <BulletList
                items={[
                  "Prices are displayed in the App.",
                  "Final pricing may vary based on garment inspection.",
                  "Payments are processed via secure third-party gateways.",
                  "We reserve the right to update pricing at any time.",
                ]}
              />
            </PolicySection>

            <PolicySection
              id="modifications"
              number="6."
              title="Modifications & Cancellation"
            >
              <BulletList
                items={[
                  "Orders can be modified or cancelled before pickup.",
                  "Once processing has started, cancellation may not be allowed.",
                  "Refunds (if applicable) will be processed as per our Refund Policy.",
                ]}
              />
            </PolicySection>

            <PolicySection
              id="limitations"
              number="7."
              title="Service Limitations & Responsibilities"
            >
              <p>
                While we strive for quality, we do not guarantee removal of all
                stains, no color fading or shrinkage, or compatibility with all
                fabric types. Certain garments may be rejected if deemed
                unsuitable for processing.
              </p>
              <p>You agree to:</p>
              <BulletList
                items={[
                  "Provide accurate pickup details.",
                  "Check garments before handing over.",
                  "Avoid including valuables (cash, jewelry, etc.). We are not responsible for items left in pockets.",
                ]}
              />
            </PolicySection>

            <PolicySection
              id="damage"
              number="8."
              title="Damage or Loss Policy"
            >
              <p>In case of damage or loss:</p>
              <BulletList
                items={[
                  "Claims must be reported within 48 hours of delivery.",
                  "Compensation (if applicable) will be limited to a reasonable amount based on garment value.",
                ]}
              />
              <p>Final decisions rest with Clean7 after inspection.</p>
            </PolicySection>

            <PolicySection
              id="prohibited"
              number="9."
              title="Prohibited Activities & Termination"
            >
              <p>
                You agree not to use the App for fraudulent purposes, interfere
                with system security, or provide false information. Violation
                may result in account suspension.
              </p>
              <p>
                We reserve the right to suspend or terminate your account and
                refuse service at our discretion.
              </p>
            </PolicySection>

            <PolicySection
              id="liability"
              number="10."
              title="Limitation of Liability"
            >
              <p>
                To the maximum extent permitted by law, Clean7 shall not be
                liable for:
              </p>
              <BulletList
                items={[
                  "Indirect or incidental damages.",
                  "Loss of profits or data.",
                  "Damages beyond the value of the service provided.",
                ]}
              />
            </PolicySection>

            <PolicySection
              id="governing-law"
              number="11."
              title="Governing Law & Changes"
            >
              <p>
                These Terms shall be governed by the laws of India. Any disputes
                shall be subject to the jurisdiction of the courts at New Delhi.
              </p>
              <p>
                We may update these Terms at any time. Continued use of the App
                constitutes acceptance of the updated Terms.
              </p>
            </PolicySection>

            <PolicySection id="contact" number="12." title="Contact Us">
              <p>
                If you have any questions about these Terms & Conditions, please
                reach out to our support team at:{" "}
                <strong>support@clean7.in</strong>
              </p>
            </PolicySection>
          </div>
        </div>
      </Container>

      <Footer />
    </div>
  );
}
