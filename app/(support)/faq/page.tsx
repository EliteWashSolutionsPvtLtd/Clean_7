import AccordionPageLayout, {
  AccordionItem,
} from "@/app/components/layout/AccordionPageLayout";
import { Metadata } from "next";
import { canonicalPath } from "@/app/lib/site-config";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Clean7 FAQs: laundry and dry cleaning, pickup and delivery, pricing, and the clean7 app.",
  alternates: { canonical: canonicalPath("/faq") },
  openGraph: {
    url: canonicalPath("/faq"),
    description:
      "Answers about Clean7 laundry, dry cleaning, pickup & delivery, pricing, and the app.",
  },
};

const faqItems: AccordionItem[] = [
  {
    title: "What is Clean7?",
    content: (
      <p>
        Clean7 is a smart home-service platform offering premium laundry, dry
        cleaning, doorstep car wash, and trusted house help services. We make
        everyday care simple with easy booking, live tracking, and doorstep
        service.
      </p>
    ),
  },
  {
    title: "Which services does Clean7 provide?",
    content: (
      <>
        <p>Clean7 currently offers:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Laundry & Wash/Fold</li>
          <li>Dry Cleaning</li>
          <li>Steam Iron / Press</li>
          <li>Doorstep Car Wash</li>
          <li>House Help Services</li>
          <li>Shoe Cleaning</li>
          <li>Curtain & Carpet Cleaning</li>
        </ul>
      </>
    ),
  },
  {
    title: "How does Clean7 work?",
    content: (
      <>
        <p>Using Clean7 is simple:</p>
        <ol className="list-decimal pl-5 mt-2 space-y-1">
          <li>Book service via app or website</li>
          <li>Select pickup time / schedule</li>
          <li>Our team reaches your location</li>
          <li>Service gets completed professionally</li>
          <li>Order delivered or completed successfully</li>
        </ol>
      </>
    ),
  },
  {
    title: "Does Clean7 offer free pickup and delivery?",
    content: (
      <p>
        Yes, Clean7 offers doorstep pickup and delivery for laundry and dry
        cleaning services in selected service areas.
      </p>
    ),
  },
  {
    title: "How long does laundry service take?",
    content: (
      <p>
        Regular laundry usually takes 24–48 hours. Express service may be
        available depending on location.
      </p>
    ),
  },
  {
    title: "What is included in dry cleaning?",
    content: (
      <>
        <p>Our dry cleaning includes:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Fabric inspection</li>
          <li>Stain treatment</li>
          <li>Deep cleaning</li>
          <li>Steam finishing</li>
          <li>Quality check</li>
          <li>Packaging</li>
        </ul>
      </>
    ),
  },
  {
    title: "Can Clean7 remove tough stains?",
    content: (
      <p>
        Yes. Our stain-treatment process handles many difficult stains such as
        oil, coffee, ink, mud, and food spills. However, stain removal depends
        on fabric type and stain age.
      </p>
    ),
  },
  {
    title: "Is Clean7 safe for premium or delicate clothes?",
    content: (
      <p>
        Yes. Delicate fabrics like wool, silk, linen, suits, lehengas, blazers,
        and designer garments are handled with special care.
      </p>
    ),
  },
  {
    title: "What is doorstep car wash?",
    content: (
      <p>
        Doorstep car wash means our trained team comes to your location with
        equipment and cleans your vehicle without requiring you to visit a
        service center.
      </p>
    ),
  },
  {
    title: "Which car wash services are available?",
    content: (
      <>
        <p>Clean7 offers:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Exterior Wash</li>
          <li>Interior Cleaning</li>
          <li>Foam Wash</li>
          <li>Dashboard Cleaning</li>
          <li>Tyre Polishing</li>
          <li>Premium Detailing</li>
        </ul>
      </>
    ),
  },
  {
    title: "Do I need to provide water or electricity for car wash?",
    content: (
      <p>
        Depending on package and location, some services may require
        water/electricity access. Waterless cleaning options may also be
        available.
      </p>
    ),
  },
  {
    title: "What is included in Clean7 House Help service?",
    content: (
      <>
        <p>House Help may include:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Dusting</li>
          <li>Floor Cleaning</li>
          <li>Kitchen Cleaning</li>
          <li>Bathroom Cleaning</li>
          <li>Utensils</li>
          <li>General Household Assistance</li>
        </ul>
      </>
    ),
  },
  {
    title: "Are house helpers verified?",
    content: (
      <p>
        Yes. Clean7 prioritizes verification and background screening for
        service professionals.
      </p>
    ),
  },
  {
    title: "Can I schedule recurring services?",
    content: (
      <p>
        Yes. You can book daily, weekly, or monthly recurring services for
        selected categories.
      </p>
    ),
  },
  {
    title: "Do you offer same-day service?",
    content: (
      <p>Same-day service depends on service availability and location.</p>
    ),
  },
  {
    title: "Can I track my order?",
    content: (
      <p>
        Yes. Clean7 provides live order tracking through the app or service
        dashboard.
      </p>
    ),
  },
  {
    title: "Which cities does Clean7 serve?",
    content: (
      <p>
        Clean7 is expanding across India. Check your PIN code or service
        location on our website/app for availability.
      </p>
    ),
  },
  {
    title: "How do payments work?",
    content: (
      <>
        <p>We support:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>UPI</li>
          <li>Credit/Debit Cards</li>
          <li>Net Banking</li>
          <li>Wallets</li>
          <li>Cash (where available)</li>
        </ul>
      </>
    ),
  },
  {
    title: "Is online booking available?",
    content: (
      <p>
        Yes. You can book anytime using the Clean7 website or mobile
        application.
      </p>
    ),
  },
  {
    title: "Does Clean7 offer franchise opportunities?",
    content: (
      <p>
        Yes. Clean7 offers franchise opportunities for entrepreneurs interested
        in laundry, car wash, and home-service businesses.
      </p>
    ),
  },
  {
    title: "Why choose a Clean7 franchise?",
    content: (
      <>
        <p>Clean7 franchise partners benefit from:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Strong brand support</li>
          <li>Technology platform</li>
          <li>Training assistance</li>
          <li>Operational guidance</li>
          <li>Scalable business model</li>
        </ul>
      </>
    ),
  },
  {
    title: "How much investment is needed for a franchise?",
    content: (
      <p>
        Investment depends on city, store size, and services selected. Contact
        Clean7 for detailed franchise plans.
      </p>
    ),
  },
  {
    title: "Is Clean7 eco-friendly?",
    content: (
      <p>
        Yes. Clean7 promotes responsible cleaning practices and eco-conscious
        products wherever possible.
      </p>
    ),
  },
  {
    title: "What makes Clean7 different?",
    content: (
      <>
        <p>Clean7 combines:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Convenience</li>
          <li>Technology</li>
          <li>Doorstep service</li>
          <li>Premium care</li>
          <li>Multi-service platform</li>
        </ul>
        <p className="mt-2">all under one trusted brand.</p>
      </>
    ),
  },
];

export default function FaqPage() {
  return (
    <AccordionPageLayout
      title="Frequently Asked Questions"
      intro={
        <>
          Quick answers about booking, delivery, pricing, and support.
          <br />
          Everything you need to know about Clean7.
        </>
      }
      items={faqItems}
      bottomBox={{
        title: "Still have questions?",
        text: (
          <>
            We&apos;re here to help. Reach out to our customer support team
            <br />
            via the app or email us at support@clean7.in
          </>
        ),
      }}
    />
  );
}
