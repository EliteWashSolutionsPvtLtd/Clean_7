import React from "react";
import Container from "@/app/components/layout/Container";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/sections/Footer";
import { SatoshiFont, WixMadeForDisplayFont } from "@/app/fonts";

export const metadata = {
  title: "Privacy Policy | Clean7",
  description:
    "Read Clean7's Privacy Policy to understand how we collect, use, and protect your personal information.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://clean7.in/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Clean7",
    description: "Learn how Clean7 protects your data and privacy.",
    url: "https://clean7.in/privacy-policy",
    type: "website",
  },
};

const LAST_UPDATED = "July 16, 2026";

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

export default function PrivacyPolicyPage() {
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
            Privacy Policy
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
                This Privacy Policy describes how Clean7 collects, uses, and
                protects the personal information of users of our platform.
              </p>
              <p>
                By using Clean7 and its features, you consent to the collection
                and use of your data as outlined here.
              </p>
            </PolicySection>

            <PolicySection
              id="info-collect"
              number="2."
              title="Information We Collect"
            >
              <p>We may collect:</p>
              <BulletList
                items={[
                  <span key="1">
                    <strong>Account information:</strong> Name, email address,
                    phone number, and pickup/delivery address.
                  </span>,
                  <span key="2">
                    <strong>Payment details:</strong> Processed securely through
                    our payment gateways.
                  </span>,
                  <span key="3">
                    <strong>Usage data:</strong> Services booked, transaction
                    history, and interactions with the app.
                  </span>,
                  <span key="4">
                    <strong>Technical data:</strong> IP address, browser type,
                    device information.
                  </span>,
                ]}
              />
            </PolicySection>

            <PolicySection
              id="how-use"
              number="3."
              title="How We Use Your Information"
            >
              <p>We use your information to:</p>
              <BulletList
                items={[
                  "Provide, maintain, and improve our laundry, car wash, and house help services.",
                  "Process transactions and send related information, including confirmations and receipts.",
                  "Send you technical notices, updates, security alerts, and support messages.",
                  "Respond to your comments, questions, and customer service requests.",
                  "Communicate with you about products, services, offers, and events offered by Clean7.",
                ]}
              />
            </PolicySection>

            <PolicySection
              id="info-sharing"
              number="4."
              title="Information Sharing"
            >
              <p>
                We do not share your personal information with third parties
                except in the following circumstances:
              </p>
              <BulletList
                items={[
                  "With vendors, consultants, and other service providers who need access to such information to carry out work on our behalf (e.g., payment processors, delivery partners).",
                  "In response to a request for information if we believe disclosure is in accordance with, or required by, any applicable law or legal process.",
                  "If we believe your actions are inconsistent with our user agreements or policies, or to protect the rights, property, and safety of Clean7 or others.",
                ]}
              />
            </PolicySection>

            <PolicySection id="data-security" number="5." title="Data Security">
              <p>
                Clean7 takes reasonable measures to help protect information
                about you from loss, theft, misuse and unauthorized access,
                disclosure, alteration and destruction. However, no security
                system is impenetrable, and we cannot guarantee the security of
                our systems 100%.
              </p>
            </PolicySection>

            <PolicySection id="your-choices" number="6." title="Your Choices">
              <BulletList
                items={[
                  <span key="1">
                    <strong>Account Information:</strong> You may update,
                    correct, or delete information about yourself at any time by
                    logging into your online account or emailing us.
                  </span>,
                  <span key="2">
                    <strong>Promotional Communications:</strong> You may opt out
                    of receiving promotional emails from Clean7 by following the
                    instructions in those emails. If you opt out, we may still
                    send you non-promotional emails, such as those about your
                    account or our ongoing business relations.
                  </span>,
                ]}
              />
            </PolicySection>

            <PolicySection id="cookies" number="7." title="Cookies & Tracking">
              <p>
                We use cookies and similar tracking technologies to collect
                information about your browsing activities and to distinguish
                you from other users of our website. This helps us provide you
                with a good experience and allows us to improve our services.
                You can usually choose to set your browser to remove or reject
                browser cookies.
              </p>
            </PolicySection>

            <PolicySection
              id="third-party"
              number="8."
              title="Third-Party Services"
            >
              <p>
                Our services may contain links to third-party websites or
                services. We are not responsible for the privacy practices or
                the content of these third-party sites. We encourage you to read
                the privacy policies of any third-party sites you visit.
              </p>
            </PolicySection>

            <PolicySection id="children" number="9." title="Children's Privacy">
              <p>
                Our services are not directed to children under 18. We do not
                knowingly collect personal information from children under 18.
                If you become aware that a child has provided us with personal
                information, please contact us.
              </p>
            </PolicySection>

            <PolicySection
              id="changes"
              number="10."
              title="Changes to This Policy"
            >
              <p>
                We may change this Privacy Policy from time to time. If we make
                changes, we will notify you by revising the date at the top of
                the policy and, in some cases, we may provide you with
                additional notice (such as adding a statement to our homepage or
                sending you a notification).
              </p>
            </PolicySection>

            <PolicySection id="contact" number="11." title="Contact Us">
              <p>
                If you have any questions about this Privacy Policy, please
                contact us at: <strong>support@clean7.in</strong>
              </p>
            </PolicySection>
          </div>
        </div>
      </Container>

      <Footer />
    </div>
  );
}
