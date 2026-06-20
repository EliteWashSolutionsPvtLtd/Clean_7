import AccordionPageLayout, { AccordionItem } from "@/app/components/layout/AccordionPageLayout";
import { Metadata } from "next";
import { canonicalPath } from "@/app/lib/site-config";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Clean7 FAQs: laundry and dry cleaning, pickup and delivery, pricing, and the clean7 app.",
  alternates: { canonical: canonicalPath("/faq") },
  openGraph: {
    url: canonicalPath("/faq"),
    description: "Answers about Clean7 laundry, dry cleaning, pickup & delivery, pricing, and the app.",
  },
};

const faqItems: AccordionItem[] = [
  {
    title: "What is Clean7?",
    content: (
      <p>
        Clean7 is a premium doorstep laundry and dry-cleaning service that allows you to schedule pickup and delivery seamlessly through our mobile application.
      </p>
    ),
  },
  {
    title: "How does Clean7 work?",
    content: (
      <>
        <p>Using our app, you can:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Schedule a pickup at your convenience.</li>
          <li>Hand over your clothes to our agent.</li>
          <li>We professionally clean and process them.</li>
          <li>Get them delivered back fresh to your doorstep.</li>
        </ul>
      </>
    ),
  },
  {
    title: "How long does delivery take?",
    content: (
      <ul className="list-disc pl-5 mt-2 space-y-1">
        <li><strong>Regular laundry:</strong> typically 24–48 hours</li>
        <li><strong>Dry cleaning:</strong> typically 2–3 days</li>
      </ul>
    ),
  },
  {
    title: "How is pricing calculated?",
    content: (
      <p>
        Prices are clearly shown in the app based on the service selected. Final pricing may vary slightly after a thorough inspection of the garments by our experts, and any changes will be communicated transparently.
      </p>
    ),
  },
  {
    title: "What services do you offer?",
    content: (
      <ul className="list-disc pl-5 mt-2 space-y-1">
        <li>Laundry (wash & fold)</li>
        <li>Premium dry cleaning</li>
        <li>Professional ironing</li>
      </ul>
    ),
  },
  {
    title: "What happens if my clothes are damaged?",
    content: (
      <p>
        In the rare event of damage or loss, you can raise a claim within 48 hours of delivery. Compensation will be provided as per our damage policy after a detailed review.
      </p>
    ),
  },
  {
    title: "Can I cancel or modify my order?",
    content: (
      <p>
        Yes, you can easily modify or cancel your order through the app before pickup. Once processing begins at our facility, changes may not be allowed to ensure timely delivery.
      </p>
    ),
  },
  {
    title: "How do I create an account?",
    content: (
      <p>
        Simply download the Clean7 app and sign up using your phone number or email address to get started immediately.
      </p>
    ),
  },
];

export default function FaqPage() {
  return (
    <AccordionPageLayout
      title="Frequently Asked Questions"
      intro={
        <>
          Quick answers about booking, delivery, pricing, and support.<br />
          Everything you need to know about Clean7.
        </>
      }
      items={faqItems}
      bottomBox={{
        title: "Still have questions?",
        text: (
          <>
            We&apos;re here to help. Reach out to our customer support team<br />
            via the app or email us at support@clean7.in
          </>
        ),
      }}
    />
  );
}
