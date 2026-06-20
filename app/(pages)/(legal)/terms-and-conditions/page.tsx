import Container from "@/app/components/layout/Container";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/sections/Footer";
import { SatoshiFont, WixMadeForDisplayFont } from "@/app/fonts";
import { Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import { canonicalPath } from "@/app/lib/site-config";

const LAST_UPDATED = "March 22, 2026";
const CONTACT_EMAIL = "support@washandwow.in";
const CONTACT_PHONE = "7078497263";
const CONTACT_ADDRESS = "123, Mullapur Road, Thana Bhawan, Shamli, Uttar Pradesh, 247777";
/** Update if your policy specifies a different claims window */
const DAMAGE_CLAIM_WINDOW = "48 hours";
/** Courts for dispute resolution — update for your jurisdiction */
const JURISDICTION_CITY = "New Delhi";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Terms governing use of Wash and Wow website, app, and laundry services in India.",
  keywords: [
    "Laundry service terms India",
    "dry cleaning service conditions",
    "laundry app terms and conditions",
    "pickup delivery laundry terms",
    "Wash and Wow terms",
    "washandwow terms",
  ],
  alternates: { canonical: canonicalPath("/terms-and-conditions") },
  openGraph: {
    url: canonicalPath("/terms-and-conditions"),
    description:
      "Terms governing use of Wash and Wow website, app, and laundry services in India.",
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
          className="mt-[70px] px-[20px] pb-6 pt-10 md:pb-8 md:pt-14 min-h-[calc(70svh-70px)] flex items-center justify-center"
        >
          <div className="max-w-7xl text-center">
            <h1
              className="text-3xl font-semibold text-[#33302E] sm:text-4xl"
              style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
            >
              Terms and Conditions
            </h1>

            <p className="mt-2 text-[18px] font-medium text-[#91776C]">
              Last updated: {LAST_UPDATED}
            </p>

            <p className="mt-4 text-[18px] leading-relaxed text-dark-blue">
              A few clear guidelines to keep everything fair and hassle-free.
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
                (&quot;Company&quot;, &quot;we&quot;, &quot;our&quot;, or
                &quot;us&quot;). These Terms and Conditions (&quot;Terms&quot;)
                govern your use of:
              </p>
              <ul className="mt-4 space-y-2 text-[18px] text-[#5E5450]">
                <li className="flex gap-2">
                  <span className="font-semibold text-orange">•</span>
                  <span>
                    Our website:{" "}
                    <a
                      href="https://washandwow.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[#33302E] underline decoration-[#DDD2C8] underline-offset-2 transition-colors hover:text-orange hover:decoration-orange"
                    >
                      washandwow.in
                    </a>
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-orange">•</span>
                  <span>Our mobile application (&quot;App&quot;)</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-orange">•</span>
                  <span>Our laundry and dry-cleaning services</span>
                </li>
              </ul>
              <p className="mt-4 text-[18px] leading-relaxed text-[#5E5450]">
                By accessing or using our services, you agree to be bound by
                these Terms.
              </p>
            </div>

            <div className="mt-10 space-y-10">
              <PolicySection id="eligibility" number="1." title="Eligibility">
                <p>
                  You must be at least{" "}
                  <strong className="font-semibold text-[#33302E]">
                    18 years old
                  </strong>{" "}
                  to use our services. By using our App, you confirm that you
                  meet this requirement.
                </p>
              </PolicySection>

              <PolicySection
                id="services"
                number="2."
                title="Nature of Services"
              >
                <p>
                  <strong className="font-semibold text-[#33302E]">
                    Wash &amp; Wow
                  </strong>{" "}
                  provides:
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

              <PolicySection
                id="account"
                number="3."
                title="Account Registration"
              >
                <p>To use our App, you may be required to:</p>
                <BulletList
                  items={[
                    "Create an account",
                    "Provide accurate and complete information",
                  ]}
                />
                <p>
                  You are responsible for maintaining the confidentiality of
                  your account and activity under it.
                </p>
              </PolicySection>

              <PolicySection
                id="booking"
                number="4."
                title="Booking & Order Process"
              >
                <BulletList
                  items={[
                    "Orders must be placed through the App",
                    "Pickup and delivery slots are subject to availability",
                    "You must ensure availability at the scheduled time",
                  ]}
                />
                <p>
                  Failure to be available may result in delays or cancellation.
                </p>
              </PolicySection>

              <PolicySection
                id="pricing"
                number="5."
                title="Pricing & Payments"
              >
                <BulletList
                  items={[
                    "Prices are displayed in the App",
                    "Final pricing may vary based on garment inspection",
                    "Payments are processed via secure third-party gateways",
                  ]}
                />
                <p>We reserve the right to update pricing at any time.</p>
              </PolicySection>

              <PolicySection
                id="cancellation"
                number="6."
                title="Order Modifications & Cancellation"
              >
                <BulletList
                  items={[
                    "Orders can be modified or cancelled before pickup",
                    "Once processing has started, cancellation may not be allowed",
                    "Refunds (if applicable) will be processed as per our Refund Policy",
                  ]}
                />
              </PolicySection>

              <PolicySection
                id="limitations"
                number="7."
                title="Service Limitations"
              >
                <p>While we strive for quality, we do not guarantee:</p>
                <BulletList
                  items={[
                    "Removal of all stains",
                    "No color fading or shrinkage",
                    "Compatibility with all fabric types",
                  ]}
                />
                <p>
                  Certain garments may be rejected if deemed unsuitable for
                  processing.
                </p>
              </PolicySection>

              <PolicySection
                id="user"
                number="8."
                title="User Responsibilities"
              >
                <p>You agree to:</p>
                <BulletList
                  items={[
                    "Provide accurate pickup details",
                    "Check garments before handing over",
                    "Avoid including valuables (cash, jewelry, etc.)",
                  ]}
                />
                <p>We are not responsible for items left in pockets.</p>
              </PolicySection>

              <PolicySection
                id="damage"
                number="9."
                title="Damage or Loss Policy"
              >
                <p>In case of damage or loss:</p>
                <BulletList
                  items={[
                    `Claims must be reported within ${DAMAGE_CLAIM_WINDOW} of delivery`,
                    "Compensation (if applicable) will be limited to a reasonable amount based on garment value",
                  ]}
                />
                <p>
                  Final decisions rest with Wash &amp; Wow after inspection.
                </p>
              </PolicySection>

              <PolicySection id="delays" number="10." title="Delays">
                <p>We are not liable for delays caused by:</p>
                <BulletList
                  items={[
                    "Weather conditions",
                    "Traffic or logistical issues",
                    "Events beyond our control (force majeure)",
                  ]}
                />
              </PolicySection>

              <PolicySection
                id="third-party"
                number="11."
                title="Third-Party Services"
              >
                <p>We may use third-party partners for:</p>
                <BulletList
                  items={[
                    "Logistics",
                    "Payment processing",
                    "Technology infrastructure",
                  ]}
                />
                <p>
                  We are not responsible for failures caused by third-party
                  providers.
                </p>
              </PolicySection>

              <PolicySection id="ip" number="12." title="Intellectual Property">
                <p>
                  All content on the website and App (logo, design, text, etc.)
                  is owned by Wash &amp; Wow and protected by applicable laws.
                </p>
                <p>
                  You may not copy, reproduce, or distribute any content without
                  permission.
                </p>
              </PolicySection>

              <PolicySection
                id="prohibited"
                number="13."
                title="Prohibited Activities"
              >
                <p>You agree not to:</p>
                <BulletList
                  items={[
                    "Use the App for fraudulent purposes",
                    "Interfere with system security",
                    "Provide false information",
                  ]}
                />
                <p>Violation may result in account suspension.</p>
              </PolicySection>

              <PolicySection id="termination" number="14." title="Termination">
                <p>We reserve the right to:</p>
                <BulletList
                  items={[
                    "Suspend or terminate your account",
                    "Refuse service at our discretion",
                  ]}
                />
              </PolicySection>

              <PolicySection
                id="liability"
                number="15."
                title="Limitation of Liability"
              >
                <p>
                  To the maximum extent permitted by law, Wash &amp; Wow shall
                  not be liable for:
                </p>
                <BulletList
                  items={[
                    "Indirect or incidental damages",
                    "Loss of profits or data",
                    "Damages beyond the value of the service provided",
                  ]}
                />
              </PolicySection>

              <PolicySection
                id="indemnity"
                number="16."
                title="Indemnification"
              >
                <p>
                  You agree to indemnify and hold harmless Wash &amp; Wow from
                  any claims arising out of:
                </p>
                <BulletList
                  items={["Misuse of services", "Violation of these Terms"]}
                />
              </PolicySection>

              <PolicySection id="law" number="17." title="Governing Law">
                <p>
                  These Terms shall be governed by the laws of{" "}
                  <strong className="font-semibold text-[#33302E]">
                    India
                  </strong>
                  . Any disputes shall be subject to the jurisdiction of the
                  courts at{" "}
                  <strong className="font-semibold text-[#33302E]">
                    {JURISDICTION_CITY}
                  </strong>
                  .
                </p>
              </PolicySection>

              <PolicySection id="changes" number="18." title="Changes to Terms">
                <p>We may update these Terms at any time.</p>
                <p>
                  Continued use of the App constitutes acceptance of the updated
                  Terms.
                </p>
              </PolicySection>

              <PolicySection id="contact" number="19." title="Contact Us">
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

              <PolicySection id="acceptance" number="20." title="Acceptance">
                <p>
                  By using our services, you acknowledge that you have read,
                  understood, and agreed to these Terms and Conditions.
                </p>
              </PolicySection>
            </div>
          </div>
        </Container>


      <Footer />
    </div>
  );
}
