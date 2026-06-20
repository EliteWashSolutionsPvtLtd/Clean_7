import AccordionPageLayout, { AccordionItem } from "@/app/components/layout/AccordionPageLayout";
import { Metadata } from "next";
import { canonicalPath } from "@/app/lib/site-config";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms governing use of Clean7 website, app, and laundry services.",
  alternates: { canonical: canonicalPath("/terms-and-conditions") },
  openGraph: {
    url: canonicalPath("/terms-and-conditions"),
    description: "Terms governing use of Clean7 website, app, and laundry services.",
  },
};

const termsItems: AccordionItem[] = [
  {
    title: "Eligibility",
    content: (
      <p>
        You must be at least <strong>18 years old</strong> to use our services. By using our App or Website, you confirm that you meet this requirement.
      </p>
    ),
  },
  {
    title: "Nature of Services",
    content: (
      <>
        <p><strong>Clean7</strong> provides:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Doorstep pickup and delivery</li>
          <li>Laundry, dry cleaning, and ironing services</li>
        </ul>
        <p className="mt-2">All services are subject to availability and operational constraints.</p>
      </>
    ),
  },
  {
    title: "Account & Booking",
    content: (
      <>
        <p>To use our App, you may be required to create an account and provide accurate and complete information. You are responsible for maintaining the confidentiality of your account.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Orders must be placed through the App.</li>
          <li>Pickup and delivery slots are subject to availability.</li>
          <li>You must ensure availability at the scheduled time. Failure to be available may result in delays or cancellation.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Pricing & Payments",
    content: (
      <ul className="list-disc pl-5 mt-2 space-y-1">
        <li>Prices are displayed in the App.</li>
        <li>Final pricing may vary based on garment inspection.</li>
        <li>Payments are processed via secure third-party gateways.</li>
        <li>We reserve the right to update pricing at any time.</li>
      </ul>
    ),
  },
  {
    title: "Modifications & Cancellation",
    content: (
      <ul className="list-disc pl-5 mt-2 space-y-1">
        <li>Orders can be modified or cancelled before pickup.</li>
        <li>Once processing has started, cancellation may not be allowed.</li>
        <li>Refunds (if applicable) will be processed as per our Refund Policy.</li>
      </ul>
    ),
  },
  {
    title: "Service Limitations & Responsibilities",
    content: (
      <>
        <p>While we strive for quality, we do not guarantee removal of all stains, no color fading or shrinkage, or compatibility with all fabric types. Certain garments may be rejected if deemed unsuitable for processing.</p>
        <p className="mt-2">You agree to:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Provide accurate pickup details.</li>
          <li>Check garments before handing over.</li>
          <li>Avoid including valuables (cash, jewelry, etc.). We are not responsible for items left in pockets.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Damage or Loss Policy",
    content: (
      <>
        <p>In case of damage or loss:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Claims must be reported within 48 hours of delivery.</li>
          <li>Compensation (if applicable) will be limited to a reasonable amount based on garment value.</li>
        </ul>
        <p className="mt-2">Final decisions rest with Clean7 after inspection.</p>
      </>
    ),
  },
  {
    title: "Prohibited Activities & Termination",
    content: (
      <>
        <p>You agree not to use the App for fraudulent purposes, interfere with system security, or provide false information. Violation may result in account suspension.</p>
        <p className="mt-2">We reserve the right to suspend or terminate your account and refuse service at our discretion.</p>
      </>
    ),
  },
  {
    title: "Limitation of Liability",
    content: (
      <>
        <p>To the maximum extent permitted by law, Clean7 shall not be liable for:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Indirect or incidental damages.</li>
          <li>Loss of profits or data.</li>
          <li>Damages beyond the value of the service provided.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Governing Law & Changes",
    content: (
      <>
        <p>These Terms shall be governed by the laws of India. Any disputes shall be subject to the jurisdiction of the courts at New Delhi.</p>
        <p className="mt-2">We may update these Terms at any time. Continued use of the App constitutes acceptance of the updated Terms.</p>
      </>
    ),
  },
];

export default function TermsAndConditionsPage() {
  return (
    <AccordionPageLayout
      title="Terms & Conditions"
      intro={
        <>
          Welcome to Clean7. These terms govern your use of our website, app, and services.<br />
          By accessing or using our services, you agree to be bound by these Terms.
        </>
      }
      lastUpdated="May 24, 2024"
      items={termsItems}
      bottomBox={{
        title: "Fair and transparent.",
        text: (
          <>
            A few clear guidelines to keep everything fair and hassle-free.<br />
            If you have questions, please reach out to our support team.
          </>
        ),
      }}
    />
  );
}
