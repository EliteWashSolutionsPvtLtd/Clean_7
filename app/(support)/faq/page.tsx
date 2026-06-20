import Container from "@/app/components/layout/Container";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/sections/Footer";
import { SatoshiFont, WixMadeForDisplayFont } from "@/app/fonts";
import { Mail, Phone } from "lucide-react";
import type { Metadata } from "next";
import {
  PageHeroAnimation,
  PageSectionsAnimation,
} from "@/app/components/animations/PageAnimations";
import { canonicalPath } from "@/app/lib/site-config";

const CONTACT_EMAIL = "support@washandwow.in";
const CONTACT_PHONE = "7078497263";
const LAUNDRY_DELIVERY = "24–48 hours";
const DRY_CLEANING_DELIVERY = "2–3 days";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Wash and Wow FAQs: laundry and dry cleaning, pickup and delivery, pricing, subscriptions, and the washandwow app.",
  alternates: { canonical: canonicalPath("/faq") },
  openGraph: {
    url: canonicalPath("/faq"),
    description:
      "Answers about Wash and Wow laundry, dry cleaning, pickup & delivery, pricing, and the app.",
  },
};

function FaqCategory({
  emoji,
  title,
  children,
}: {
  emoji: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="scroll-mt-28 border-t border-[#E8DFD6] pt-10 first:border-0 first:pt-0">
      <h2
        className="mb-6 flex flex-wrap items-center gap-2 text-xl font-semibold text-[#33302E] sm:text-2xl"
        style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
      >
        <span aria-hidden className="select-none">
          {emoji}
        </span>
        {title}
      </h2>
      <div className="space-y-8">{children}</div>
    </section>
  );
}

function FaqItem({
  n,
  question,
  children,
}: {
  n: number;
  question: string;
  children: React.ReactNode;
}) {
  return (
    <div className="page-faq-item gsap-animate border-l-2 border-[#E8DFD6] pl-4 opacity-0 sm:pl-5">
      <div className="flex gap-2 sm:gap-3">
        <span className="shrink-0 font-bold tabular-nums text-orange">
          {n}.
        </span>
        <div className="min-w-0 flex-1 space-y-3">
          <p className="text-[18px] font-semibold text-[#33302E]">{question}</p>
          <div className="text-[18px] leading-relaxed text-[#5E5450]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function StepList({ items }: { items: string[] }) {
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

export default function page() {
  return (
    <div style={{ fontFamily: SatoshiFont.style.fontFamily }}>
      <Navbar />

      <PageHeroAnimation variant="split">
        <Container
          isMaxWidth={true}
          className="mt-[70px] flex min-h-[calc(70svh-70px)] items-center justify-between gap-16 px-[20px] pb-6 pt-10 md:pb-8 md:pt-14"
        >
          <div className="page-hero-left gsap-animate opacity-0">
            <h1
              className="text-3xl font-semibold text-[#33302E] sm:text-4xl"
              style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
            >
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-[18px] leading-relaxed text-dark-blue">
              Quick answers about booking, delivery, pricing, garments, and
              support.
            </p>
          </div>

          <div className="page-hero-right gsap-animate hidden shrink-0 min-[950px]:block opacity-0">
            <img
              src="/images/contact/faq.png"
              alt="FAQ illustration"
              className="max-w-[400px] cursor-default transition-transform duration-500 ease-out will-change-transform hover:-translate-y-3 hover:scale-105 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100"
            />
          </div>
        </Container>
      </PageHeroAnimation>

      <PageSectionsAnimation>
        <Container isMaxWidth={true} className="px-[20px] pb-16 md:pb-24">
          <div className="mx-auto max-w-7xl space-y-10">
            <div className="page-section gsap-animate opacity-0">
              <FaqCategory emoji="🧺" title="General Questions">
                <FaqItem n={1} question="What is Wash & Wow?">
                  <p>
                    Wash &amp; Wow is a doorstep laundry and dry-cleaning
                    service that allows you to schedule pickup and delivery
                    through our mobile application.
                  </p>
                </FaqItem>
                <FaqItem n={2} question="How does Wash & Wow work?">
                  <p>Using our app, you can:</p>
                  <StepList
                    items={[
                      "Schedule a pickup",
                      "Hand over your clothes",
                      "We clean and process them",
                      "Get them delivered back to your doorstep",
                    ]}
                  />
                </FaqItem>
                <FaqItem
                  n={3}
                  question="Do I need to use the app to place an order?"
                >
                  <p>
                    Yes. All orders are managed through our mobile application
                    to ensure smooth tracking, updates, and service management.
                  </p>
                </FaqItem>
              </FaqCategory>
            </div>

            <div className="page-section gsap-animate opacity-0">
              <FaqCategory emoji="📦" title="Pickup & Delivery">
                <FaqItem n={4} question="How do I schedule a pickup?">
                  <p>
                    You can schedule a pickup directly from the app by selecting
                    your preferred date and time slot.
                  </p>
                </FaqItem>
                <FaqItem
                  n={5}
                  question="What if I am not available at the time of pickup?"
                >
                  <p>
                    If you are unavailable, your pickup may be delayed or
                    rescheduled. We recommend being available or assigning
                    someone to hand over the clothes.
                  </p>
                </FaqItem>
                <FaqItem n={6} question="How long does delivery take?">
                  <p>Delivery timelines depend on the type of service:</p>
                  <ul className="mt-2 space-y-2">
                    <li className="flex gap-2">
                      <span className="font-semibold text-orange">•</span>
                      <span>
                        <strong className="font-semibold text-[#33302E]">
                          Regular laundry:
                        </strong>{" "}
                        typically {LAUNDRY_DELIVERY}
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-semibold text-orange">•</span>
                      <span>
                        <strong className="font-semibold text-[#33302E]">
                          Dry cleaning:
                        </strong>{" "}
                        typically {DRY_CLEANING_DELIVERY}
                      </span>
                    </li>
                  </ul>
                </FaqItem>
              </FaqCategory>
            </div>

            <div className="page-section gsap-animate opacity-0">
              <FaqCategory emoji="💰" title="Pricing & Payments">
                <FaqItem n={7} question="How is pricing calculated?">
                  <p>
                    Prices are shown in the app based on the service selected.
                    Final pricing may vary after inspection of garments.
                  </p>
                </FaqItem>
                <FaqItem n={8} question="What payment methods do you accept?">
                  <p>
                    We support secure online payments through trusted payment
                    gateways. Available options may include UPI, debit/credit
                    cards, and wallets.
                  </p>
                </FaqItem>
                <FaqItem n={9} question="Are there any hidden charges?">
                  <p>
                    No. We aim for transparent pricing. Any changes due to
                    garment condition will be communicated before processing.
                  </p>
                </FaqItem>
              </FaqCategory>
            </div>

            <div className="page-section gsap-animate opacity-0">
              <FaqCategory emoji="👕" title="Services & Garments">
                <FaqItem n={10} question="What services do you offer?">
                  <p>We offer:</p>
                  <StepList
                    items={["Laundry (wash & fold)", "Dry cleaning", "Ironing"]}
                  />
                </FaqItem>
                <FaqItem n={11} question="Can all types of clothes be cleaned?">
                  <p>
                    Most garments can be processed, but some delicate or
                    restricted fabrics may not be accepted.
                  </p>
                </FaqItem>
                <FaqItem n={12} question="Do you guarantee stain removal?">
                  <p>
                    While we use professional cleaning methods, we cannot
                    guarantee removal of all stains.
                  </p>
                </FaqItem>
              </FaqCategory>
            </div>

            <div className="page-section gsap-animate opacity-0">
              <FaqCategory emoji="⚠️" title="Safety & Responsibility">
                <FaqItem
                  n={13}
                  question="What happens if my clothes are damaged or lost?"
                >
                  <p>
                    In rare cases of damage or loss, you can raise a claim
                    within the specified time. Compensation will be provided as
                    per our policy.
                  </p>
                </FaqItem>
                <FaqItem
                  n={14}
                  question="Should I check my clothes before pickup?"
                >
                  <p>Yes. Please ensure:</p>
                  <StepList
                    items={[
                      "No valuables are left in pockets",
                      "Special instructions are mentioned",
                    ]}
                  />
                </FaqItem>
              </FaqCategory>
            </div>

            <div className="page-section gsap-animate opacity-0">
              <FaqCategory emoji="📱" title="App & Account">
                <FaqItem n={15} question="How do I create an account?">
                  <p>
                    You can sign up through our app using your phone number or
                    email.
                  </p>
                </FaqItem>
                <FaqItem n={16} question="Can I cancel or modify my order?">
                  <p>
                    Yes, you can modify or cancel your order before pickup. Once
                    processing begins, changes may not be allowed.
                  </p>
                </FaqItem>
                <FaqItem n={17} question="How can I track my order?">
                  <p>
                    You can track your order status in real-time through the
                    app.
                  </p>
                </FaqItem>
              </FaqCategory>
            </div>

            <div className="page-section gsap-animate opacity-0">
              <FaqCategory emoji="📞" title="Support">
                <FaqItem n={18} question="How can I contact customer support?">
                  <p>You can reach us via:</p>
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="page-card flex items-center gap-3 rounded-xl border border-[#E8DFD6] bg-white px-4 py-3 transition-colors hover:border-orange/40"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FBF6F2] text-orange">
                        <Mail className="h-5 w-5" aria-hidden />
                      </span>
                      <span>
                        <span className="block text-xs font-medium uppercase tracking-wide text-[#91776C]">
                          Email
                        </span>
                        <span className="text-[18px] font-medium text-[#33302E] underline decoration-[#DDD2C8] underline-offset-2">
                          {CONTACT_EMAIL}
                        </span>
                      </span>
                    </a>
                    <a
                      href={`tel:${CONTACT_PHONE}`}
                      className="page-card flex items-center gap-3 rounded-xl border border-[#E8DFD6] bg-white px-4 py-3 transition-colors hover:border-orange/40"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FBF6F2] text-orange">
                        <Phone className="h-5 w-5" aria-hidden />
                      </span>
                      <span>
                        <span className="block text-xs font-medium uppercase tracking-wide text-[#91776C]">
                          Phone
                        </span>
                        <span className="text-[18px] font-medium text-[#33302E] underline decoration-[#DDD2C8] underline-offset-2">
                          {CONTACT_PHONE}
                        </span>
                      </span>
                    </a>
                  </div>
                </FaqItem>
                <FaqItem n={19} question="What if I have a complaint?">
                  <p>
                    You can contact our support team through the app or email.
                    We aim to resolve all issues as quickly as possible.
                  </p>
                </FaqItem>
              </FaqCategory>
            </div>
          </div>
        </Container>
      </PageSectionsAnimation>

      <Footer />
    </div>
  );
}
