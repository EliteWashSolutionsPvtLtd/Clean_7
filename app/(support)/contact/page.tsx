import AccordionPageLayout, {
  AccordionItem,
} from "@/app/components/layout/AccordionPageLayout";
import { Metadata } from "next";
import { canonicalPath } from "@/app/lib/site-config";
import ContactForm from "./ContactForm";

const SUPPORT_EMAIL = "support@clean7.in";
const SUPPORT_PHONE = "7078497263";
const BUSINESS_EMAIL = "support@clean7.in";
const BUSINESS_ADDRESS =
  "123, Mullapur Road, Thana Bhawan, Shamli, Uttar Pradesh, 247777";
const SUPPORT_HOURS = "9:00 AM – 8:00 PM, All Days";

const GOOGLE_MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.991297957006!2d77.2295097!3d28.6129123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2bc20625eb5%3A0x216347e08a5657de!2sIndia%20Gate!5e0!3m2!1sen!2sin!4v1708646400000!5m2!1sen!2sin";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Clean7 for customer support, order help, partnerships, and general questions.",
  alternates: { canonical: canonicalPath("/contact") },
  openGraph: {
    url: canonicalPath("/contact"),
    description:
      "Reach Clean7 for customer support, order help, partnerships, and general questions.",
  },
};

const contactItems: AccordionItem[] = [
  {
    title: "Customer Support",
    content: (
      <>
        <p>Have questions about your order, pickup, or delivery?</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>
            <strong>Email:</strong>{" "}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="text-[var(--gold)] hover:underline"
            >
              {SUPPORT_EMAIL}
            </a>
          </li>
          <li>
            <strong>Phone:</strong>{" "}
            <a
              href={`tel:${SUPPORT_PHONE}`}
              className="text-[var(--gold)] hover:underline"
            >
              {SUPPORT_PHONE}
            </a>
          </li>
          <li>
            <strong>Support hours:</strong> {SUPPORT_HOURS}
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "Our Location & Map",
    content: (
      <>
        <p>
          <strong>Clean7</strong>
        </p>
        <p className="mt-1">{BUSINESS_ADDRESS}</p>
        <div className="mt-4 overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--card)] shadow-sm">
          <iframe
            title="Clean7 location on Google Maps"
            src={GOOGLE_MAPS_EMBED_URL}
            className="aspect-[16/10] min-h-[260px] w-full border-0 sm:min-h-[340px] md:min-h-[400px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </>
    ),
  },
  {
    title: "Send us a Message",
    content: (
      <>
        <p className="mb-4">
          You can also reach out to us by filling out the form below. We usually
          respond within 24 hours.
        </p>
        <ContactForm />
      </>
    ),
  },
  {
    title: "Order & App Support",
    content: (
      <>
        <p>
          For faster assistance with your order, please include your registered
          phone number and Order ID (if applicable).
        </p>
        <p className="mt-2">
          Since all services are managed through our mobile application, we
          recommend:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Checking order status directly in the app</li>
          <li>Using in-app support (if available)</li>
        </ul>
      </>
    ),
  },
  {
    title: "Business & Partnerships",
    content: (
      <>
        <p>Interested in partnering with Clean7?</p>
        <p className="mt-2">
          <strong>Email:</strong>{" "}
          <a
            href={`mailto:${BUSINESS_EMAIL}?subject=Partnership Inquiry`}
            className="text-[var(--gold)] hover:underline"
          >
            {BUSINESS_EMAIL}
          </a>
          <br />
          <strong>Subject:</strong> Partnership Inquiry
        </p>
      </>
    ),
  },
];

export default function ContactPage() {
  return (
    <AccordionPageLayout
      title="Contact Us"
      intro={
        <>
          We&apos;re here to help! Whether you have a question, need support,
          <br />
          or just want to say hello — the Clean7 team is always ready to assist
          you.
        </>
      }
      items={contactItems}
      bottomBox={{
        title: "We're Here For You",
        text: (
          <>
            At Clean7, we believe in making laundry effortless and stress-free.
            <br />
            If something isn&apos;t right, we&apos;ll do our best to fix it —
            quickly and fairly.
          </>
        ),
      }}
    />
  );
}
