import React from "react";
import Container from "@/app/components/layout/Container";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/sections/Footer";
import { SatoshiFont, WixMadeForDisplayFont } from "@/app/fonts";
import { Metadata } from "next";
import { canonicalPath } from "@/app/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Use | Laundry, Car Wash & House Help",
  description:
    "Terms governing access to Clean7 website and mobile app. Legal terms for our laundry, car wash, and house help services in India.",
  keywords: [
    "Clean7 terms of use",
    "Laundry service terms and conditions",
    "Car wash legal terms India",
    "House help platform terms",
    "cleaning services terms of service",
  ],
  alternates: { canonical: canonicalPath("/terms-of-use") },
  openGraph: {
    url: canonicalPath("/terms-of-use"),
    description: "Terms governing access to Clean7 services in India.",
  },
};

const LAST_UPDATED = "March 22, 2026";
const JURISDICTION_CITY = "New Delhi";

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

export default function TermsOfUsePage() {
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
            Terms of Use
          </h1>

          <p className="mt-6 text-[16px] md:text-[17px] font-medium text-[var(--ink-soft)]">
            Effective Date: {LAST_UPDATED}
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
                Welcome to Clean7 (&quot;we&quot;, &quot;our&quot;, or
                &quot;us&quot;). These Terms of Use (&quot;Terms&quot;) govern
                your access to and use of our platform, encompassing our
                website, mobile application, and the laundry, car wash, and
                house help services provided through them.
              </p>
              <p>
                By booking a service or using our platform, you agree to comply
                with and be bound by these Terms. If you do not agree with these
                Terms, please refrain from using our services.
              </p>
            </PolicySection>

            <PolicySection
              id="account"
              number="2."
              title="Account Registration and User Conduct"
            >
              <p>
                To access certain features of the platform, you must register
                for an account. You agree to provide accurate, current, and
                complete information during registration and to update such
                information to keep it accurate.
              </p>
              <BulletList
                items={[
                  "You are entirely responsible for maintaining the confidentiality of your account credentials.",
                  "You agree to notify us immediately of any unauthorized use of your account.",
                  "You must provide a safe, respectful, and hazard-free environment for our service professionals when they visit your premises.",
                ]}
              />
            </PolicySection>

            <PolicySection
              id="laundry"
              number="3."
              title="Service-Specific Terms: Laundry & Dry Cleaning"
            >
              <p>
                While we exercise the utmost care in cleaning your garments, we
                cannot assume responsibility for inherent weaknesses or defects
                in materials that may result in tears or the development of
                small holes during the cleaning process.
              </p>
              <BulletList
                items={[
                  <span key="1">
                    <strong>Valuables:</strong> Please check all garments for
                    money, jewelry, or other valuables prior to hand-off. We are
                    not responsible for any lost items left in pockets or
                    bundles.
                  </span>,
                  <span key="2">
                    <strong>Damage & Shrinkage:</strong> We are not liable for
                    color bleeding, shrinkage, or damage to garments that do not
                    possess proper care instructions, or for normal wear and
                    tear.
                  </span>,
                  <span key="3">
                    <strong>Lost Items:</strong> Any missing items must be
                    reported within 24 hours of delivery. Our maximum liability
                    for any lost or damaged item is limited to 5 times the cost
                    of cleaning that specific item, irrespective of its original
                    brand or value.
                  </span>,
                  <span key="4">
                    <strong>Unclaimed Items:</strong> Garments not claimed
                    within 30 days of the scheduled delivery date may be donated
                    to charity.
                  </span>,
                ]}
              />
            </PolicySection>

            <PolicySection
              id="car-wash"
              number="4."
              title="Service-Specific Terms: Car Wash"
            >
              <p>
                Our car wash professionals are trained to provide premium
                exterior and interior cleaning. However, the condition of a
                vehicle prior to our service significantly impacts the outcome.
              </p>
              <BulletList
                items={[
                  <span key="1">
                    <strong>Pre-existing Damage:</strong> We are not responsible
                    for pre-existing damage, loose parts, heavily oxidized
                    paint, or peeling clear coats that may become more visible
                    after washing.
                  </span>,
                  <span key="2">
                    <strong>Valuables:</strong> Customers must remove all
                    personal belongings, cash, and valuables from the vehicle
                    prior to the service. We are not liable for any lost or
                    missing items inside the vehicle.
                  </span>,
                  <span key="3">
                    <strong>Access:</strong> You must ensure our professionals
                    have adequate space, legal parking access, and a safe
                    environment to perform the car wash.
                  </span>,
                ]}
              />
            </PolicySection>

            <PolicySection
              id="house-help"
              number="5."
              title="Service-Specific Terms: House Help"
            >
              <p>
                We connect you with verified, background-checked professionals
                for house help and deep cleaning services.
              </p>
              <BulletList
                items={[
                  <span key="1">
                    <strong>Presence:</strong> An adult representative of the
                    household must be present to grant access, guide the
                    professionals, and secure the premises upon completion.
                  </span>,
                  <span key="2">
                    <strong>Liability for Breakage:</strong> While our
                    professionals take extreme care, accidents can happen. We
                    are not liable for the breakage of highly fragile items,
                    antiques, or electronics not securely mounted. Please secure
                    these items before the cleaning begins.
                  </span>,
                  <span key="3">
                    <strong>Scope of Work:</strong> Professionals will only
                    perform tasks strictly within the booked package. Handling
                    hazardous materials, human/animal waste, or heavy lifting
                    (over 15kg) is strictly prohibited.
                  </span>,
                  <span key="4">
                    <strong>Non-Solicitation:</strong> You agree not to directly
                    solicit or hire our service professionals outside of the
                    Clean7 platform. Doing so will result in an immediate ban
                    from the platform.
                  </span>,
                ]}
              />
            </PolicySection>

            <PolicySection
              id="pricing"
              number="6."
              title="Pricing, Payments, and Cancellations"
            >
              <BulletList
                items={[
                  <span key="1">
                    <strong>Pricing:</strong> All prices displayed on the
                    platform are subject to change without prior notice. The
                    final price is confirmed at checkout.
                  </span>,
                  <span key="2">
                    <strong>Payments:</strong> Payments must be made via our
                    secure payment gateways. For cash-on-delivery options, exact
                    change is appreciated.
                  </span>,
                  <span key="3">
                    <strong>Cancellations:</strong> You may cancel or reschedule
                    a booking free of charge up to 4 hours before the scheduled
                    slot. Cancellations made within 4 hours may incur a
                    cancellation fee.
                  </span>,
                ]}
              />
            </PolicySection>

            <PolicySection
              id="liability"
              number="7."
              title="Limitation of Liability"
            >
              <p>
                To the maximum extent permitted by applicable law, Clean7, its
                affiliates, and its partners shall not be liable for any
                indirect, incidental, special, consequential, or punitive
                damages, or any loss of profits or revenues, whether incurred
                directly or indirectly, or any loss of data, use, goodwill, or
                other intangible losses, resulting from your access to or use of
                our platform or services.
              </p>
            </PolicySection>

            <PolicySection
              id="modifications"
              number="8."
              title="Modifications to Terms"
            >
              <p>
                We reserve the right to modify these Terms at any time. We will
                provide notice of these changes by updating the &quot;Effective
                Date&quot; at the top of this page. Your continued use of the
                platform after any such changes constitutes your acceptance of
                the new Terms of Use.
              </p>
            </PolicySection>

            <PolicySection
              id="law"
              number="9."
              title="Governing Law and Dispute Resolution"
            >
              <p>
                These Terms shall be governed by and construed in accordance
                with the laws of India. Any disputes arising out of or in
                connection with these Terms shall be subject to the exclusive
                jurisdiction of the courts located in{" "}
                <strong className="font-semibold text-[var(--ink)]">
                  {JURISDICTION_CITY}
                </strong>
                .
              </p>
            </PolicySection>

            <PolicySection id="contact" number="10." title="Contact Us">
              <p>
                If you have any questions or concerns regarding these Terms of
                Use, please reach out to our legal and support team at:{" "}
                <strong>support@clean7.in</strong>.
              </p>
            </PolicySection>
          </div>
        </div>
      </Container>

      <Footer />
    </div>
  );
}
