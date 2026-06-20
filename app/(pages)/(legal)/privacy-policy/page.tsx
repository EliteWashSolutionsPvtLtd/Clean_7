import AccordionPageLayout, { AccordionItem } from "@/app/components/layout/AccordionPageLayout";
import { Metadata } from "next";
import { canonicalPath } from "@/app/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Clean7.",
  alternates: { canonical: canonicalPath("/privacy-policy") },
  openGraph: {
    url: canonicalPath("/privacy-policy"),
    description: "Privacy Policy for Clean7.",
  },
};

const privacyItems: AccordionItem[] = [
  {
    title: "Information We Collect",
    content: (
      <>
        <p>
          We collect information you provide directly to us, such as your name, email address, phone number, and pickup/delivery address when you create an account, place an order, or contact customer support.
        </p>
        <p>
          We also automatically collect certain technical information when you use our app or website, including device information, IP address, and usage data.
        </p>
      </>
    ),
  },
  {
    title: "How We Use Information",
    content: (
      <>
        <p>We use the information we collect to:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Provide, maintain, and improve our laundry and dry cleaning services.</li>
          <li>Process transactions and send related information, including confirmations and receipts.</li>
          <li>Send you technical notices, updates, security alerts, and support messages.</li>
          <li>Respond to your comments, questions, and customer service requests.</li>
          <li>Communicate with you about products, services, offers, and events offered by Clean7.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Information Sharing",
    content: (
      <>
        <p>
          We do not share your personal information with third parties except in the following circumstances:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>With vendors, consultants, and other service providers who need access to such information to carry out work on our behalf (e.g., payment processors, delivery partners).</li>
          <li>In response to a request for information if we believe disclosure is in accordance with, or required by, any applicable law or legal process.</li>
          <li>If we believe your actions are inconsistent with our user agreements or policies, or to protect the rights, property, and safety of Clean7 or others.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Data Security",
    content: (
      <p>
        Clean7 takes reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction. However, no security system is impenetrable, and we cannot guarantee the security of our systems 100%.
      </p>
    ),
  },
  {
    title: "Your Choices",
    content: (
      <>
        <p>
          <strong>Account Information:</strong> You may update, correct, or delete information about yourself at any time by logging into your online account or emailing us at support@clean7.in.
        </p>
        <p>
          <strong>Promotional Communications:</strong> You may opt out of receiving promotional emails from Clean7 by following the instructions in those emails. If you opt out, we may still send you non-promotional emails, such as those about your account or our ongoing business relations.
        </p>
      </>
    ),
  },
  {
    title: "Cookies & Tracking",
    content: (
      <p>
        We use cookies and similar tracking technologies to collect information about your browsing activities and to distinguish you from other users of our website. This helps us provide you with a good experience and allows us to improve our services. You can usually choose to set your browser to remove or reject browser cookies.
      </p>
    ),
  },
  {
    title: "Third-Party Services",
    content: (
      <p>
        Our services may contain links to third-party websites or services. We are not responsible for the privacy practices or the content of these third-party sites. We encourage you to read the privacy policies of any third-party sites you visit.
      </p>
    ),
  },
  {
    title: "Children's Privacy",
    content: (
      <p>
        Our services are not directed to children under 18. We do not knowingly collect personal information from children under 18. If you become aware that a child has provided us with personal information, please contact us.
      </p>
    ),
  },
  {
    title: "Changes to This Policy",
    content: (
      <p>
        We may change this Privacy Policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy and, in some cases, we may provide you with additional notice (such as adding a statement to our homepage or sending you a notification).
      </p>
    ),
  },
  {
    title: "Contact Us",
    content: (
      <p>
        If you have any questions about this Privacy Policy, please contact us at: support@clean7.in
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <AccordionPageLayout
      title="Privacy Policy"
      intro={
        <>
          At Clean7, your privacy is important to us.<br />
          This policy explains how we collect, use, and protect your information.
        </>
      }
      lastUpdated="May 24, 2024"
      items={privacyItems}
      bottomBox={{
        title: "Your privacy. Our priority.",
        text: (
          <>
            We are committed to keeping your information safe and secure.<br />
            If you have any questions about this policy, feel free to contact us.
          </>
        ),
      }}
    />
  );
}
