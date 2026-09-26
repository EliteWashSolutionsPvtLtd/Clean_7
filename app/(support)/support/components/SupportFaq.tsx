"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle } from "lucide-react";
import { WixMadeForDisplayFont } from "@/app/fonts";

interface FaqItem {
  id: string;
  question: string;
  answer: React.ReactNode;
}

interface FaqCategory {
  title: string;
  description: string;
  items: FaqItem[];
}

const FAQ_DATA: FaqCategory[] = [
  {
    title: "Booking",
    description: "Questions about placing and managing your Clean7 service bookings.",
    items: [
      {
        id: "book-service",
        question: "How do I book a Clean7 service?",
        answer: (
          <p>
            Booking with Clean7 is simple and takes less than a minute. Open the Clean7 mobile app
            or website, browse our services (Laundry, Dry Cleaning, Home Cleaning, Car Wash, etc.),
            select your required service items or packages, pick your preferred date and time slot
            (Morning 8 AM – 12 PM, Afternoon 12 PM – 4 PM, or Evening 4 PM – 8 PM), provide your
            address details, review the transparent upfront pricing (including GST), and confirm your
            booking with online payment or Cash on Delivery.
          </p>
        ),
      },
      {
        id: "cancel-booking",
        question: "Can I cancel my booking?",
        answer: (
          <div>
            <p>
              Yes. You can cancel or reschedule a booking free of charge up to 4 hours before your
              scheduled time slot directly in the Clean7 app while your order is in &ldquo;Pending&rdquo; or
              &ldquo;Confirmed&rdquo; status.
            </p>
            <p className="mt-2">
              In accordance with our{" "}
              <Link href="/terms-of-use#pricing" className="text-[var(--gold)] font-medium underline">
                Terms of Use
              </Link>
              , cancellations made within 4 hours of the scheduled slot or after a rider has been
              dispatched may incur a nominal cancellation fee. If your order has already been picked
              up, please reach out to customer support.
            </p>
          </div>
        ),
      },
      {
        id: "change-booking",
        question: "Can I change my booking?",
        answer: (
          <p>
            Yes, you can adjust your scheduled date, time slot, or special pickup instructions prior to
            rider dispatch directly in the app. For orders that are already active, picked up, or in
            progress, please contact Clean7 support with your Order ID so our dispatch team can assist
            you with the modification.
          </p>
        ),
      },
    ],
  },
  {
    title: "Pickup & Delivery",
    description: "Doorstep pickup timings, SLAs, and live tracking.",
    items: [
      {
        id: "when-pickup",
        question: "When will my order be picked up?",
        answer: (
          <p>
            Your order will be picked up during the specific time slot you selected during booking:
            Morning (8:00 AM – 12:00 PM), Afternoon (12:00 PM – 4:00 PM), or Evening (4:00 PM – 8:00
            PM). A Clean7 rider will be assigned and will reach your doorstep within this window. You
            will receive real-time notifications on your phone when your rider is assigned and on the
            way.
          </p>
        ),
      },
      {
        id: "track-order",
        question: "How can I track my order?",
        answer: (
          <p>
            You can track your order live directly in the Clean7 mobile app. Simply open the app and
            tap the &ldquo;Orders&rdquo; tab. Selecting your order shows step-by-step progress from Order
            Confirmed, Rider Assigned, Pickup Completed, In-Facility Cleaning, Quality Inspection,
            Out for Delivery, to Final Delivery.
          </p>
        ),
      },
    ],
  },
  {
    title: "Laundry & Cleaning",
    description: "Fabric care, garment handling, dry cleaning, and specialty items.",
    items: [
      {
        id: "laundry-services",
        question: "What laundry services does Clean7 offer?",
        answer: (
          <div>
            <p>Clean7 offers a complete suite of laundry and garment care services:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li><strong>Wash & Fold:</strong> Daily wear washed with premium detergents and neatly folded.</li>
              <li><strong>Wash & Iron:</strong> Machine washed with professional steam iron finishing.</li>
              <li><strong>Steam Ironing:</strong> Crisp, wrinkle-free pressing on hangers or neatly packed.</li>
              <li><strong>Bulk & Household Laundry:</strong> Bedsheets, quilts, blankets, and towel sets.</li>
              <li><strong>Premium Garment Care:</strong> Hand-finished detailing for designer and delicate garments.</li>
            </ul>
          </div>
        ),
      },
      {
        id: "dry-cleaning",
        question: "Does Clean7 provide dry cleaning?",
        answer: (
          <p>
            Yes. Clean7 provides expert dry cleaning for suits, blazers, sarees, lehengas, coats,
            sherwanis, woolens, silks, and evening wear. Every garment undergoes individual fabric
            inspection, specialized stain treatment, gentle deep cleaning with fabric-safe solutions,
            and precision steam pressing before being packed in protective garment covers.
          </p>
        ),
      },
      {
        id: "shoes-blankets-curtains",
        question: "Can I get shoes, blankets, or curtains cleaned?",
        answer: (
          <p>
            Yes. We offer specialized cleaning categories for shoes (sneaker whitening, leather care,
            suede cleaning, and deep deodorizing), heavy winter blankets and quilts, and household
            curtains and drapes. You can select each item individually under their respective category
            in the app.
          </p>
        ),
      },
    ],
  },
  {
    title: "Home Services",
    description: "Residential deep cleaning and household help.",
    items: [
      {
        id: "home-services-types",
        question: "What home services can I book?",
        answer: (
          <div>
            <p>Clean7 offers comprehensive home and household services, including:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Full Home Deep Cleaning (all rooms, kitchen, and bathrooms)</li>
              <li>Kitchen Deep Cleaning (degreasing, chimney, cabinets, and tiles)</li>
              <li>Bathroom Deep Cleaning & Sanitization (limescale, grout, and fixtures)</li>
              <li>Sofa, Upholstery & Carpet Shampooing</li>
              <li>Floor Scrubbing & Polishing</li>
              <li>Household / House Help Assistance</li>
            </ul>
          </div>
        ),
      },
      {
        id: "how-home-services-work",
        question: "How do home services work?",
        answer: (
          <p>
            Select the required home cleaning package and preferred date and slot in the app.
            Clean7-verified professionals arrive at your doorstep equipped with industrial-grade
            equipment and safe cleaning chemicals. They carry out the scheduled cleaning checklists,
            conduct a walkthrough with you to verify satisfaction, and finalize the service.
          </p>
        ),
      },
    ],
  },
  {
    title: "Doorstep Car Wash",
    description: "Professional vehicle cleaning at your residence.",
    items: [
      {
        id: "car-wash-details",
        question: "Does Clean7 provide doorstep car washing?",
        answer: (
          <p>
            Yes. Clean7 provides professional doorstep car washing. Our trained technicians arrive at
            your residence or parking spot with all required cleaning gear. Services include exterior
            foam wash, pressure rinse, microfiber drying, interior vacuuming, dashboard conditioning,
            and tyre polishing — subject to service availability in your area.
          </p>
        ),
      },
    ],
  },
  {
    title: "Payments",
    description: "Accepted payment options, failed transactions, and invoices.",
    items: [
      {
        id: "payment-methods",
        question: "What payment methods does Clean7 support?",
        answer: (
          <p>
            Clean7 supports secure digital payments powered by Razorpay: UPI (Google Pay, PhonePe,
            Paytm, BHIM), Credit and Debit Cards (Visa, Mastercard, RuPay), Net Banking, and popular
            wallets. Cash on Delivery (COD) is also available for eligible services and locations.
          </p>
        ),
      },
      {
        id: "payment-failed",
        question: "What happens if my payment fails?",
        answer: (
          <p>
            If a payment fails during checkout, the order will remain unpaid and no charge will be
            captured. If money was debited from your bank account or UPI app without the order being
            created or marked paid, banking networks automatically reverse the amount within 3–5
            business days. If you need immediate assistance, please contact Clean7 support with your
            bank transaction reference number.
          </p>
        ),
      },
    ],
  },
  {
    title: "Refunds",
    description: "Refund processing timelines and eligibility.",
    items: [
      {
        id: "how-refunds-work",
        question: "How do refunds work?",
        answer: (
          <p>
            In accordance with our{" "}
            <Link href="/terms-of-use#pricing" className="text-[var(--gold)] font-medium underline">
              Cancellation & Refund Policy
            </Link>{" "}
            and{" "}
            <Link href="/terms-and-conditions" className="text-[var(--gold)] font-medium underline">
              Terms & Conditions
            </Link>
            , refunds for eligible cancelled orders or verified service quality issues are processed
            back to the original payment source via Razorpay within 5–7 business days, or provided as
            service credits upon customer confirmation.
          </p>
        ),
      },
    ],
  },
  {
    title: "Account",
    description: "Account management and data privacy.",
    items: [
      {
        id: "delete-account",
        question: "How do I delete my Clean7 account?",
        answer: (
          <div>
            <p>
              You can request permanent account deletion directly within the Clean7 mobile app:
            </p>
            <ol className="list-decimal pl-5 mt-2 space-y-1 text-sm">
              <li>Open the Clean7 app and tap <strong>Profile</strong>.</li>
              <li>Tap <strong>Other Information</strong> &rarr; <strong>Account Privacy</strong>.</li>
              <li>Tap <strong>Request to Delete Account</strong> and confirm your request.</li>
            </ol>
            <p className="mt-2">
              You can also read full details on our dedicated{" "}
              <Link href="/delete-account" className="text-[var(--gold)] font-medium underline">
                Account Deletion Page
              </Link>{" "}
              or email{" "}
              <a href="mailto:support@clean7.in?subject=Account%20Deletion%20Request" className="text-[var(--gold)] font-medium underline">
                support@clean7.in
              </a>{" "}
              with the subject &ldquo;Account Deletion Request&rdquo;.
            </p>
          </div>
        ),
      },
    ],
  },
];

export default function SupportFaq() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    "book-service": true, // First item open by default for helpful preview
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="py-12 md:py-16" aria-labelledby="faq-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/20 mb-3">
            <HelpCircle size={15} className="text-[var(--gold)]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--gold)]">
              Frequently Asked Questions
            </span>
          </div>
          <h2
            id="faq-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[var(--ink)] tracking-tight"
            style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
          >
            Support & Knowledge Base
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[var(--ink-soft)] max-w-xl mx-auto">
            Find immediate answers about bookings, service types, pickup windows, tracking, and policies.
          </p>
        </div>

        <div className="space-y-10">
          {FAQ_DATA.map((category) => (
            <div key={category.title} className="space-y-3">
              <div className="border-b border-[var(--line)] pb-2 mb-4">
                <h3
                  className="text-lg sm:text-xl font-semibold text-[var(--ink)] tracking-tight"
                  style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
                >
                  {category.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--ink-soft)]">
                  {category.description}
                </p>
              </div>

              <div className="rounded-2xl border border-[var(--line)] bg-[var(--card)] divide-y divide-[var(--line)] overflow-hidden">
                {category.items.map((item) => {
                  const isOpen = !!openItems[item.id];
                  return (
                    <div key={item.id} className="transition-colors">
                      <button
                        type="button"
                        onClick={() => toggleItem(item.id)}
                        className="w-full flex items-center justify-between py-4 sm:py-5 px-5 sm:px-6 text-left hover:bg-[var(--gold)]/5 transition-colors cursor-pointer"
                        aria-expanded={isOpen}
                        aria-controls={`faq-answer-${item.id}`}
                      >
                        <span className="text-[15px] sm:text-[16px] font-medium text-[var(--ink)] pr-4">
                          {item.question}
                        </span>
                        <ChevronDown
                          size={18}
                          className={`text-[var(--gold)] shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>

                      <div
                        id={`faq-answer-${item.id}`}
                        role="region"
                        aria-labelledby={`faq-question-${item.id}`}
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}
                      >
                        <div className="px-5 sm:px-6 pb-5 pt-1 text-sm sm:text-[15px] text-[var(--ink-soft)] leading-relaxed border-t border-[var(--line)]/40 bg-[var(--ground)]/20">
                          {item.answer}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
