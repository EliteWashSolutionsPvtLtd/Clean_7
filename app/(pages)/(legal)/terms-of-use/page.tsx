import Container from "@/app/components/layout/Container";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/sections/Footer";
import { SatoshiFont, WixMadeForDisplayFont } from "@/app/fonts";
import { Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { canonicalPath } from "@/app/lib/site-config";

const LAST_UPDATED = "March 22, 2026";
const CONTACT_EMAIL = "support@clean7.in";
const CONTACT_PHONE = "7078497263";
const CONTACT_ADDRESS = "123, Mullapur Road, Thana Bhawan, Shamli, Uttar Pradesh, 247777";
const JURISDICTION_CITY = "New Delhi";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms governing access to Clean7 website and mobile app in India.",
  keywords: [
    "Laundry app terms of use India",
    "website usage policy laundry service",
    "mobile app usage terms India",
    "laundry platform legal terms",
    "Clean7 terms of use",
    "clean7 app terms",
  ],
  alternates: { canonical: canonicalPath("/terms-of-use") },
  openGraph: {
    url: canonicalPath("/terms-of-use"),
    description:
      "Terms governing access to Clean7 website and mobile app in India.",
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
    <section
      id={id}
      className="scroll-mt-28 border-t border-[#E8DFD6] pt-8 first:border-0 first:pt-0"
    >
      <h2
        className="mb-4 text-xl font-semibold text-[#33302E] sm:text-2xl"
        style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
      >
        <span className="font-bold tabular-nums text-orange">{number}</span>
        <span className="ml-2">{title}</span>
      </h2>
      <div className="space-y-4 text-[18px] leading-relaxed text-[#5E5450]">
        {children}
      </div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="ml-1 space-y-2 border-l-2 border-[#E8DFD6] pl-4">
      {items.map((item) => (
        <li key={item} className="relative">
          <span className="absolute -left-[21px] top-2 h-1.5 w-1.5 rounded-full bg-orange" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = href ? (
    <a
      href={href}
      className="text-[#33302E] underline decoration-[#DDD2C8] underline-offset-2 transition-colors hover:text-orange hover:decoration-orange"
    >
      {value}
    </a>
  ) : (
    <span className="text-[#33302E]">{value}</span>
  );
  return (
    <div className="flex items-center gap-3 rounded-xl border border-[#E8DFD6] bg-white p-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FBF6F2] text-orange">
        {icon}
      </span>
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="my-2 text-xs font-medium uppercase leading-normal tracking-wide text-[#91776C]">
          {label}
        </p>
        <p className="text-[18px] leading-snug">{content}</p>
      </div>
    </div>
  );
}

export default function page() {
  return (
    <div style={{ fontFamily: SatoshiFont.style.fontFamily }}>
      <Navbar />


        <Container
          isMaxWidth={true}
          className="mt-[70px] flex min-h-[calc(70svh-70px)] items-center justify-center px-[20px] pb-6 pt-10 md:pb-8 md:pt-14"
        >
          <div className="max-w-7xl text-center">
            <h1
              className="text-3xl font-semibold text-[#33302E] sm:text-4xl"
              style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
            >
              Terms of Use
            </h1>

            <p className="mt-2 text-[18px] font-medium text-[#91776C]">
              Last updated: {LAST_UPDATED}
            </p>

            <p className="mt-4 text-[18px] leading-relaxed text-dark-blue">
              Use our services with confidence — built on fairness, clarity, and
              mutual respect.
            </p>
          </div>
        </Container>



        <Container isMaxWidth={true} className="px-[20px] pb-16 md:pb-24">
          <div className="mx-auto max-w-5xl">
            <div className="">
              <p className="text-[18px] leading-relaxed text-[#5E5450]">
                Welcome to{" "}
                <strong className="font-semibold text-[#33302E]">
                  Wash &amp; Wow
                </strong>{" "}
                (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). These
                Terms of Use (&quot;Terms&quot;) govern your access to and use
                of:
              </p>
              <ul className="mt-4 space-y-2 text-[18px] text-[#5E5450]">
                <li className="flex gap-2">
                  <span className="font-semibold text-orange">•</span>
                  <span>
                    Our website:{" "}
                    <a
                      href="https://clean7.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[#33302E] underline decoration-[#DDD2C8] underline-offset-2 transition-colors hover:text-orange hover:decoration-orange"
                    >
                      clean7.in
                    </a>
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-orange">•</span>
                  <span>Our mobile application (&quot;App&quot;)</span>
                </li>
              </ul>
              <p className="mt-4 text-[18px] leading-relaxed text-[#5E5450]">
                By accessing or using our platform, you agree to comply with
                these Terms.
              </p>
            </div>

            <div className="mt-10 space-y-10">
              <PolicySection
                id="acceptance"
                number="1."
                title="Acceptance of Terms"
              >
                <p>By using our website or App, you confirm that you:</p>
                <BulletList
                  items={[
                    "Have read and understood these Terms",
                    "Agree to be legally bound by them",
                  ]}
                />
                <p>If you do not agree, please do not use our platform.</p>
              </PolicySection>

              <PolicySection id="use" number="2." title="Use of Platform">
                <p>
                  You agree to use the platform only for lawful purposes and in
                  accordance with these Terms.
                </p>
                <p>You may:</p>
                <BulletList
                  items={[
                    "Browse the website",
                    "Create an account",
                    "Book services through the App",
                  ]}
                />
              </PolicySection>

              <PolicySection
                id="account"
                number="3."
                title="Account Responsibility"
              >
                <p>If you create an account:</p>
                <BulletList
                  items={[
                    "You are responsible for maintaining its confidentiality",
                    "You must ensure all information is accurate",
                    "You are responsible for all activities under your account",
                  ]}
                />
                <p>
                  We are not liable for unauthorized access caused by your
                  negligence.
                </p>
              </PolicySection>

              <PolicySection
                id="acceptable-use"
                number="4."
                title="Acceptable Use"
              >
                <p>
                  You agree{" "}
                  <strong className="font-semibold text-[#33302E]">not</strong>{" "}
                  to:
                </p>
                <BulletList
                  items={[
                    "Use the platform for illegal or fraudulent activities",
                    "Attempt to gain unauthorized access to systems",
                    "Interfere with platform performance or security",
                    "Upload or transmit harmful code (viruses, malware, etc.)",
                  ]}
                />
              </PolicySection>

              <PolicySection
                id="availability"
                number="5."
                title="Platform Availability"
              >
                <p>
                  We aim to keep our platform available at all times. However,
                  we do not guarantee uninterrupted access.
                </p>
                <p>We may:</p>
                <BulletList
                  items={[
                    "Suspend or restrict access for maintenance",
                    "Update or modify features without notice",
                  ]}
                />
              </PolicySection>

              <PolicySection
                id="ip"
                number="6."
                title="Intellectual Property Rights"
              >
                <p>All content on the platform, including:</p>
                <BulletList items={["Logos", "Designs", "Text and graphics"]} />
                <p>
                  are owned by Wash &amp; Wow and protected by applicable laws.
                </p>
                <p>You may not:</p>
                <BulletList items={["Copy", "Modify", "Distribute", "Reuse"]} />
                <p>any content without prior written permission.</p>
              </PolicySection>

              <PolicySection
                id="third-party"
                number="7."
                title="Third-Party Links"
              >
                <p>
                  Our platform may contain links to third-party websites or
                  services.
                </p>
                <p>We are not responsible for:</p>
                <BulletList
                  items={[
                    "Their content",
                    "Their privacy practices",
                    "Their terms",
                  ]}
                />
                <p>Use them at your own risk.</p>
              </PolicySection>

              <PolicySection
                id="liability"
                number="8."
                title="Limitation of Liability"
              >
                <p>
                  To the maximum extent permitted by law, Wash &amp; Wow shall
                  not be liable for:
                </p>
                <BulletList
                  items={[
                    "Any indirect or consequential damages",
                    "Loss of data or business interruption",
                    "Issues arising from platform unavailability",
                  ]}
                />
              </PolicySection>

              <PolicySection
                id="termination"
                number="9."
                title="Suspension or Termination"
              >
                <p>We reserve the right to:</p>
                <BulletList
                  items={["Suspend or terminate access", "Restrict usage"]}
                />
                <p>if you violate these Terms.</p>
              </PolicySection>

              <PolicySection id="privacy" number="10." title="Privacy">
                <p>
                  Your use of the platform is also governed by our{" "}
                  <Link
                    href="/privacy-policy"
                    className="font-semibold text-[#33302E] underline decoration-[#DDD2C8] underline-offset-2 transition-colors hover:text-orange hover:decoration-orange"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </PolicySection>

              <PolicySection id="changes" number="11." title="Changes to Terms">
                <p>We may update these Terms at any time.</p>
                <p>
                  Continued use of the platform means you accept the updated
                  Terms.
                </p>
              </PolicySection>

              <PolicySection id="law" number="12." title="Governing Law">
                <p>
                  These Terms shall be governed by the laws of{" "}
                  <strong className="font-semibold text-[#33302E]">
                    India
                  </strong>
                  . Any disputes shall fall under the jurisdiction of the courts
                  at{" "}
                  <strong className="font-semibold text-[#33302E]">
                    {JURISDICTION_CITY}
                  </strong>
                  .
                </p>
              </PolicySection>

              <PolicySection id="contact" number="13." title="Contact Us">
                <div className="grid gap-3 sm:grid-cols-1">
                  <ContactRow
                    icon={<Mail className="h-5 w-5" aria-hidden />}
                    label="Email"
                    value={CONTACT_EMAIL}
                    href={`mailto:${CONTACT_EMAIL}`}
                  />
                  <ContactRow
                    icon={<Phone className="h-5 w-5" aria-hidden />}
                    label="Phone"
                    value={CONTACT_PHONE}
                    href={`tel:${CONTACT_PHONE}`}
                  />
                  <ContactRow
                    icon={<MapPin className="h-5 w-5" aria-hidden />}
                    label="Address"
                    value={CONTACT_ADDRESS}
                  />
                </div>
              </PolicySection>

              <PolicySection
                id="acknowledgement"
                number="14."
                title="Acknowledgement"
              >
                <p>
                  By continuing to use our platform, you acknowledge that you
                  have read and agreed to these Terms of Use.
                </p>
              </PolicySection>
            </div>
          </div>
        </Container>


      <Footer />
    </div>
  );
}
