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

const LAST_UPDATED = "17 July 2026";

function PolicySection({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 pt-8 first:pt-0">
      <h2
        className="mb-4 text-[20px] font-semibold text-[var(--ink)] sm:text-[24px] flex items-baseline"
        style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
      >
        {number && (
          <span className="font-bold tabular-nums text-[var(--ink)]">
            {number}
          </span>
        )}
        <span className={number ? "ml-2" : ""}>{title}</span>
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
            <PolicySection id="sec-0" title={`Introduction`}>
              <p>Effective Date: 17 July 2026</p>
              <p>Last Updated: 17 July 2026</p>
            </PolicySection>
            <PolicySection id="sec-1" number="1." title={`Acceptance of Terms`}>
              <p>
                By accessing or using the Clean7 website, mobile application, or
                any of our services, you agree to be bound by these Terms &
                Conditions. If you do not agree with these Terms, please refrain
                from using our services.
              </p>
            </PolicySection>
            <PolicySection id="sec-2" number="2." title={`Definitions`}>
              <BulletList
                items={[
                  <span key="0">
                    Company means Elite Wash Solution Private Limited, operating
                    under the brand name &quot;Clean7&quot;.
                  </span>,
                  <span key="1">
                    Customer means any individual or entity using Clean7&apos;s
                    services.
                  </span>,
                  <span key="2">
                    Services include laundry, dry cleaning, ironing, doorstep
                    pickup and delivery, home cleaning, car wash, shoe care,
                    carpet cleaning, sofa cleaning, curtain cleaning, and any
                    other services offered by Clean7.
                  </span>,
                  <span key="3">
                    Order means any booking placed through the Clean7 website,
                    mobile application, call centre, WhatsApp, or franchise
                    outlet.
                  </span>,
                ]}
              />
            </PolicySection>
            <PolicySection id="sec-3" number="3." title={`Order Acceptance`}>
              <p>
                All orders are accepted subject to operational feasibility.
                Clean7 reserves the right to refuse or cancel any order where
                processing is not reasonably possible or where the garment or
                article presents an unacceptable risk.
              </p>
            </PolicySection>
            <PolicySection id="sec-4" number="4." title={`Pickup and Delivery`}>
              <p>
                Laundry orders are generally delivered within 48 hours from
                pickup.
              </p>
              <p>
                Dry Cleaning orders are generally delivered within 72 hours from
                pickup.
              </p>
              <p>
                Delivery timelines are estimates only and may vary due to
                operational requirements, weather conditions, traffic, public
                holidays, force majeure events, or circumstances beyond our
                reasonable control.
              </p>
              <p>
                Customers will be informed whenever significant delays are
                expected.
              </p>
            </PolicySection>
            <PolicySection id="sec-5" number="5." title={`Express Service`}>
              <p>
                Express or priority processing may be available at selected
                locations.
              </p>
              <p>
                Additional charges of up to 20% of the applicable service
                charges may apply depending upon the requested turnaround time.
              </p>
              <p>
                The applicable charges will always be communicated before order
                confirmation.
              </p>
            </PolicySection>
            <PolicySection
              id="sec-6"
              number="6."
              title={`Minimum Order for Free Pickup`}
            >
              <p>
                Free pickup and delivery may be available only when the minimum
                order value or minimum garment weight prescribed by Clean7 is
                met.
              </p>
              <p>
                The eligibility criteria may vary by city, franchise location,
                promotional campaign, or operational area.
              </p>
            </PolicySection>
            <PolicySection
              id="sec-7"
              number="7."
              title={`Inspection at Delivery`}
            >
              <p>
                Customers are requested to inspect all processed articles
                immediately upon delivery.
              </p>
              <p>
                Any complaint relating to loss, damage, incorrect processing, or
                service quality should be reported within 48 hours of delivery.
              </p>
              <p>
                Complaints received after this period may not be accepted unless
                otherwise required by applicable law.
              </p>
            </PolicySection>
            <PolicySection id="sec-8" number="8." title={`Proof of Ownership`}>
              <p>
                Customers should retain the original receipt, digital invoice,
                or booking confirmation until the order has been delivered.
              </p>
              <p>
                If satisfactory proof of ownership cannot be produced at the
                time of delivery, Clean7 reserves the right to verify the
                customer&apos;s identity before releasing the articles.
              </p>
            </PolicySection>
            <PolicySection id="sec-9" number="9." title={`Garment Care`}>
              <p>
                Clean7 follows industry-standard cleaning procedures appropriate
                for different fabrics.
              </p>
              <p>
                However, the Company cannot guarantee complete removal of every
                stain or odour.
              </p>
              <p>
                Certain stains including ink, paint, bleach, rust, oil,
                adhesive, dye transfer, old stains, permanent stains, and
                unidentified stains may remain despite professional treatment.
              </p>
            </PolicySection>
            <PolicySection id="sec-10" number="10." title={`Delicate Articles`}>
              <p>
                Customers should inform Clean7 before processing if garments
                contain:
              </p>
              <BulletList
                items={[
                  <span key="0">Sequins</span>,
                  <span key="1">Beads</span>,
                  <span key="2">Embroidery</span>,
                  <span key="3">Leather</span>,
                  <span key="4">Silk</span>,
                  <span key="5">Decorative accessories</span>,
                  <span key="6">Sensitive dyes</span>,
                  <span key="7">Previous alterations</span>,
                  <span key="8">Delicate fabrics</span>,
                  <span key="9">Special care instructions</span>,
                ]}
              />
              <p>
                Failure to disclose such information may affect the processing
                outcome.
              </p>
            </PolicySection>
            <PolicySection id="sec-11" number="11." title={`Wear & Tear`}>
              <p>Garments having:</p>
              <BulletList
                items={[
                  <span key="0">Existing stains</span>,
                  <span key="1">Fabric weakness</span>,
                  <span key="2">Colour instability</span>,
                  <span key="3">Previous repairs</span>,
                  <span key="4">Manufacturing defects</span>,
                  <span key="5">Age-related deterioration</span>,
                  <span key="6">Shrinkage tendencies</span>,
                ]}
              />
              <p>are accepted at the customer&apos;s risk.</p>
              <p>
                Clean7 shall not be responsible where additional deterioration
                results from the inherent condition of the garment rather than
                negligence in processing.
              </p>
            </PolicySection>
            <PolicySection id="sec-12" number="12." title={`Colour Variation`}>
              <p>Certain fabrics may naturally experience:</p>
              <BulletList
                items={[
                  <span key="0">Colour fading</span>,
                  <span key="1">Colour bleeding</span>,
                  <span key="2">Shrinkage</span>,
                  <span key="3">Texture variation</span>,
                  <span key="4">Print fading</span>,
                  <span key="5">Damage to embellishments</span>,
                ]}
              />
              <p>despite appropriate professional care.</p>
              <p>
                Such results are considered inherent fabric characteristics and
                shall not constitute negligence by Clean7.
              </p>
            </PolicySection>
            <PolicySection
              id="sec-13"
              number="13."
              title={`Personal Belongings`}
            >
              <p>
                Customers must remove cash, jewellery, watches, keys, cards,
                mobile phones, documents, USB drives, earphones, and all
                personal belongings before handing over garments.
              </p>
              <p>
                Clean7 shall not be liable for loss or damage to personal
                belongings left inside garments.
              </p>
            </PolicySection>
            <PolicySection
              id="sec-14"
              number="14."
              title={`Uncollected Orders`}
            >
              <p>
                Customers are requested to collect processed articles within 21
                days of notification or the scheduled delivery date.
              </p>
              <p>After this period, storage charges may apply.</p>
              <p>
                Clean7 reserves the right to deal with uncollected articles in
                accordance with applicable law after giving reasonable notice to
                the customer.
              </p>
            </PolicySection>
            <PolicySection id="sec-15" number="15." title={`Pricing`}>
              <p>Service charges depend upon:</p>
              <BulletList
                items={[
                  <span key="0">Garment type</span>,
                  <span key="1">Fabric</span>,
                  <span key="2">Size</span>,
                  <span key="3">Complexity</span>,
                  <span key="4">Stain condition</span>,
                  <span key="5">Special handling</span>,
                  <span key="6">Service location</span>,
                ]}
              />
              <p>
                Displayed prices are indicative and may vary by franchise, city,
                or promotional offers.
              </p>
            </PolicySection>
            <PolicySection
              id="sec-16"
              number="16."
              title={`Offers and Discounts`}
            >
              <p>
                Only one promotional offer, coupon, or discount may generally be
                applied to a single order unless expressly stated otherwise.
              </p>
              <p>
                Discounts cannot ordinarily be applied after invoice generation
                or completion of processing.
              </p>
            </PolicySection>
            <PolicySection id="sec-17" number="17." title={`Payment`}>
              <p>
                Payment shall be made using the payment methods accepted by
                Clean7.
              </p>
              <p>
                Invoices generated by Clean7 shall be treated as final unless an
                error is reported immediately.
              </p>
              <p>Applicable taxes shall be charged as per prevailing law.</p>
            </PolicySection>
            <PolicySection
              id="sec-18"
              number="18."
              title={`Limitation of Liability`}
            >
              <p>
                If any article is lost or damaged solely due to the negligence
                of Clean7 during processing, the Company&apos;s maximum
                liability shall be limited to the lower of:
              </p>
              <BulletList
                items={[
                  <span key="0">
                    Ten (10) times the processing charges paid for the affected
                    article; or
                  </span>,
                  <span key="1">₹3,000 per affected article.</span>,
                ]}
              />
              <p>
                Compensation may be provided as a refund, repair, replacement,
                or service credit at the discretion of Clean7, subject to
                applicable law.
              </p>
              <p>
                Clean7 shall not be liable for indirect, incidental,
                consequential, sentimental, or special damages.
              </p>
            </PolicySection>
            <PolicySection id="sec-19" number="19." title={`Force Majeure`}>
              <p>
                Clean7 shall not be responsible for delays, interruptions, or
                losses caused by events beyond its reasonable control,
                including:
              </p>
              <BulletList
                items={[
                  <span key="0">Fire</span>,
                  <span key="1">Flood</span>,
                  <span key="2">Earthquake</span>,
                  <span key="3">Riot</span>,
                  <span key="4">Strike</span>,
                  <span key="5">Pandemic</span>,
                  <span key="6">Government restrictions</span>,
                  <span key="7">Transportation disruptions</span>,
                  <span key="8">Cyber incidents</span>,
                  <span key="9">Power failures</span>,
                  <span key="10">Natural disasters</span>,
                ]}
              />
            </PolicySection>
            <PolicySection
              id="sec-20"
              number="20."
              title={`Images and Promotional Content`}
            >
              <p>
                Clean7 will not use photographs or videos of customers,
                garments, or personal belongings for advertising, marketing, or
                promotional purposes without obtaining the customer&apos;s prior
                consent.
              </p>
            </PolicySection>
            <PolicySection
              id="sec-21"
              number="21."
              title={`Digital Communication`}
            >
              <p>
                By placing an order, customers consent to receive
                service-related communications through SMS, Email, WhatsApp,
                telephone calls, push notifications, or other electronic
                communication channels.
              </p>
              <p>
                These communications may include order confirmations, invoices,
                OTP verification, pickup reminders, delivery updates,
                promotional offers (where permitted), and important policy
                notifications.
              </p>
            </PolicySection>
            <PolicySection
              id="sec-22"
              number="22."
              title={`Customer Responsibilities`}
            >
              <p>Customers agree to:</p>
              <BulletList
                items={[
                  <span key="0">Provide accurate contact details.</span>,
                  <span key="1">Remove valuables from garments.</span>,
                  <span key="2">
                    Inform Clean7 about delicate fabrics or special care
                    requirements.
                  </span>,
                  <span key="3">Make timely payment.</span>,
                  <span key="4">Cooperate during pickup and delivery.</span>,
                ]}
              />
            </PolicySection>
            <PolicySection
              id="sec-23"
              number="23."
              title={`Guaranteed Garment Protection Program`}
            >
              <p>
                As a customer benefit, Clean7 may offer a Guaranteed Garment
                Protection Program for eligible orders.
              </p>
              <p>Where applicable:</p>
              <BulletList
                items={[
                  <span key="0">
                    Customers may receive compensation for eligible loss or
                    damage occurring solely due to negligence during processing.
                  </span>,
                  <span key="1">
                    Compensation shall be subject to the limits specified under
                    these Terms & Conditions.
                  </span>,
                  <span key="2">
                    In case compensation is paid for a lost or damaged article,
                    ownership of the compensated article shall transfer to
                    Clean7 if the article is subsequently recovered.
                  </span>,
                  <span key="3">
                    Customers may be offered complimentary reprocessing if
                    service quality does not meet reasonable expectations.
                  </span>,
                  <span key="4">
                    The availability, eligibility, benefits, and conditions of
                    this program may vary by location, promotional campaign, or
                    payment method and may be revised by Clean7 from time to
                    time.
                  </span>,
                ]}
              />
            </PolicySection>
            <PolicySection
              id="sec-24"
              number="24."
              title={`Intellectual Property`}
            >
              <p>
                All trademarks, logos, software, graphics, photographs, content,
                branding, and other intellectual property displayed on the
                Clean7 platform are the exclusive property of Elite Wash
                Solution Private Limited and may not be copied, reproduced, or
                used without prior written permission.
              </p>
            </PolicySection>
            <PolicySection id="sec-25" number="25." title={`Amendments`}>
              <p>
                Clean7 reserves the right to amend these Terms & Conditions at
                any time.
              </p>
              <p>
                Updated Terms shall become effective upon publication on the
                Clean7 website or mobile application unless otherwise required
                by law.
              </p>
            </PolicySection>
            <PolicySection id="sec-26" number="26." title={`Governing Law`}>
              <p>
                These Terms & Conditions shall be governed by the laws of India.
              </p>
              <p>
                Subject to applicable consumer protection laws, all disputes
                arising from these Terms shall be subject to the exclusive
                jurisdiction of the competent courts located in Shamli, Uttar
                Pradesh, unless otherwise required by applicable law.
              </p>
            </PolicySection>
            <PolicySection id="sec-27" number="27." title={`Contact Us`}>
              <p>
                For any questions regarding these Terms & Conditions, please
                contact:
              </p>
              <h3 className="font-semibold text-[var(--ink)] mt-4">
                Elite Wash Solution Private Limited
              </h3>
              <p>Email: support@clean7.in</p>
              <p>Phone: +91-7078497263</p>
              <p>Website: www.clean7.in</p>
            </PolicySection>
          </div>
        </div>
      </Container>

      <Footer />
    </div>
  );
}
