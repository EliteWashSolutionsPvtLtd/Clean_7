import React from "react";
import Container from "@/app/components/layout/Container";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/sections/Footer";
import { SatoshiFont, WixMadeForDisplayFont } from "@/app/fonts";
import { canonicalPath } from "@/app/lib/site-config";

export const metadata = {
  title: "Privacy Policy | Clean7",
  description:
    "Read Clean7's Privacy Policy to understand how we collect, use, and protect your personal information.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: canonicalPath("/privacy-policy"),
  },
  openGraph: {
    title: "Privacy Policy | Clean7",
    description: "Learn how Clean7 protects your data and privacy.",
    url: canonicalPath("/privacy-policy"),
    type: "website",
  },
};

const LAST_UPDATED = "July 16, 2026";

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

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>

          <p className="mt-6 text-[16px] md:text-[17px] font-medium text-[var(--ink-soft)]">
            Effective Date: {LAST_UPDATED}
          </p>
        </div>
      </Container>

      <Container
        isMaxWidth={true}
        className="px-[clamp(20px,5vw,56px)] pb-16 md:pb-24"
      >
        <div className="mx-auto max-w-4xl">
          <div className="space-y-12">
            <PolicySection id="sec-0" title={``}>
              <h3 className="font-semibold text-[var(--ink)] mt-4">Privacy Policy – Introduction</h3>
              <p>Effective Date</p>
              <p>Effective Date: 17 July 2026</p>
              <p>Last Updated: 17 July 2026</p>
              <p>This Privacy Policy is effective from the date mentioned above and applies to all users of the Clean7 website, mobile applications, and related services. Clean7 may revise this Privacy Policy from time to time to reflect changes in its business practices, legal obligations, or technological developments. Any updated version will be published on our website and mobile application with the revised &quot;Last Updated&quot; date.</p>
              <p>At Clean7, we value your privacy and are committed to protecting the personal information you share with us. We believe that trust is built through transparency, so this Privacy Policy explains what information we collect, why we collect it, how we use it, and the measures we take to keep it secure.</p>
              <p>This Privacy Policy applies to the Clean7 website, mobile applications, and all digital platforms operated by Elite Wash Solution Private Limited (&quot;Clean7&quot;). It governs the collection, use, storage, and disclosure of information when you access or use our services, including laundry, dry cleaning, doorstep pickup and delivery, home cleaning, car wash, and any other services offered by Clean7.</p>
              <p>By accessing our website, using our mobile application, creating an account, or using any of our services, you acknowledge that you have read, understood, and agreed to the practices described in this Privacy Policy. If you do not agree with any part of this Privacy Policy, you should discontinue the use of our website, mobile application, and services.</p>
              <p>We are committed to handling your personal information responsibly and in accordance with applicable laws of India, while continuously improving our privacy and security practices to protect your data.</p>
              <h3 className="font-semibold text-[var(--ink)] mt-4">Important Notice</h3>
              <p>Clean7 may update or revise this Privacy Policy from time to time to reflect changes in our services, business practices, legal requirements, or technology. Any updates will become effective once they are published on our website or mobile application, unless otherwise required by applicable law. We encourage you to review this Privacy Policy periodically so that you remain informed about how we collect, use, and protect your information.</p>
              <p>By accessing or using the Clean7 website, mobile application, or any of our services, you acknowledge that you have read, understood, and accepted this Privacy Policy. If you do not agree with any provision of this Privacy Policy, you should refrain from accessing or using our website, mobile application, or services.</p>
              <p>Your continued use of Clean7 after any changes to this Privacy Policy are published will constitute your acceptance of the revised Privacy Policy.</p>
              <p>This Privacy Policy should be read together with the Clean7 Terms & Conditions and any other applicable policies published on our website or mobile application, all of which collectively govern your use of our services.</p>
            </PolicySection>
            <PolicySection id="sec-1" number="1." title={`Information We Collect`}>
              <p>To provide our services efficiently and enhance your experience, Clean7 collects certain information when you access our website, mobile application, or use our services. We collect only the information that is reasonably necessary to operate our platform, process bookings, deliver services, improve customer experience, and comply with applicable legal requirements.</p>
              <h3 className="font-semibold text-[var(--ink)] mt-4">Personal Information</h3>
              <p>When you create an account, request a service, contact our support team, or otherwise interact with Clean7, we may collect information such as:</p>
              <BulletList
                items={
[
                  <span key="0">Full name</span>,
                  <span key="1">Mobile number</span>,
                  <span key="2">Email address</span>,
                  <span key="3">Residential or service address</span>,
                  <span key="4">Pickup and delivery location</span>,
                  <span key="5">Billing information</span>,
                  <span key="6">Payment transaction details (processed through secure payment partners)</span>,
                  <span key="7">Profile information you voluntarily provide</span>,
                  <span key="8">Customer support communications</span>,
                  <span key="9">Feedback, ratings, and reviews</span>
]
}
              />
              <p>Providing certain information is voluntary; however, some details are necessary for us to process bookings and deliver our services. If you choose not to provide the required information, certain features or services may not be available.</p>
              <h3 className="font-semibold text-[var(--ink)] mt-4">Service-Related Information</h3>
              <p>When you place an order with Clean7, we may collect information related to your requested service, including:</p>
              <BulletList
                items={
[
                  <span key="0">Type of service booked (Laundry, Dry Cleaning, Home Cleaning, Car Wash, etc.)</span>,
                  <span key="1">Pickup and delivery preferences</span>,
                  <span key="2">Number or category of items for service</span>,
                  <span key="3">Special cleaning instructions</span>,
                  <span key="4">Preferred schedule and service timings</span>,
                  <span key="5">Order history and transaction records</span>
]
}
              />
              <p>This information enables us to manage bookings, coordinate with service partners, and maintain service quality.</p>
              <h3 className="font-semibold text-[var(--ink)] mt-4">Device and Technical Information</h3>
              <p>Whenever you access our website or mobile application, certain technical information may be collected automatically, including:</p>
              <BulletList
                items={
[
                  <span key="0">IP address</span>,
                  <span key="1">Browser type and version</span>,
                  <span key="2">Device type and operating system</span>,
                  <span key="3">Mobile device identifiers</span>,
                  <span key="4">Date and time of access</span>,
                  <span key="5">Pages viewed and features used</span>,
                  <span key="6">Referral website or application</span>,
                  <span key="7">Crash reports and diagnostic information</span>
]
}
              />
              <p>This information helps us improve website performance, troubleshoot technical issues, and enhance platform security.</p>
              <h3 className="font-semibold text-[var(--ink)] mt-4">Location Information</h3>
              <h3 className="font-semibold text-[var(--ink)] mt-4">With your permission, Clean7 may access your device&apos;s location to:</h3>
              <BulletList
                items={
[
                  <span key="0">Identify nearby service availability</span>,
                  <span key="1">Schedule pickups and deliveries accurately</span>,
                  <span key="2">Improve route planning</span>,
                  <span key="3">Display location-based services and offers</span>
]
}
              />
              <p>You may disable location access through your device settings. However, certain location-dependent features may not function correctly.</p>
              <h3 className="font-semibold text-[var(--ink)] mt-4">Cookies and Similar Technologies</h3>
              <p>Clean7 uses cookies and similar technologies to improve your browsing experience and remember your preferences. These technologies help us:</p>
              <BulletList
                items={
[
                  <span key="0">Keep you signed in during your session</span>,
                  <span key="1">Understand how visitors use our platform</span>,
                  <span key="2">Improve website functionality and performance</span>,
                  <span key="3">Personalize content and recommendations</span>,
                  <span key="4">Measure the effectiveness of promotional campaigns</span>,
                  <span key="5">Maintain platform security</span>
]
}
              />
              <p>Most web browsers allow you to manage or disable cookies. Please note that disabling cookies may affect the availability or functionality of certain features on our website.</p>
              <p>Some third-party service providers integrated into our platform, such as analytics or payment partners, may also use their own cookies or similar technologies. Their use of such technologies is governed by their respective privacy policies.</p>
              <h3 className="font-semibold text-[var(--ink)] mt-4">Payment Information</h3>
              <p>If you make payments through Clean7, payment processing is handled by trusted third-party payment providers. Depending on the payment method you choose, limited payment-related information may be collected to complete the transaction securely.</p>
              <p>Clean7 does not intentionally store complete credit card, debit card, UPI PIN, CVV, or internet banking credentials on its own servers.</p>
              <h3 className="font-semibold text-[var(--ink)] mt-4">Communications</h3>
              <p>If you contact us through email, phone, chat, social media, or customer support channels, we may retain the information you provide, including correspondence, queries, complaints, and attachments. This information helps us respond to your requests, resolve issues, improve our services, and maintain service records.</p>
              <h3 className="font-semibold text-[var(--ink)] mt-4">Marketing Preferences</h3>
              <p>With your consent or where permitted by applicable law, Clean7 may send you service updates, promotional offers, discounts, reminders, and other relevant communications through SMS, email, phone calls, WhatsApp, or push notifications. You may opt out of promotional communications at any time by following the unsubscribe instructions provided or by contacting our customer support.</p>
              <h3 className="font-semibold text-[var(--ink)] mt-4">Information You Choose to Share</h3>
              <p>You may voluntarily provide additional information by submitting reviews, ratings, testimonials, survey responses, referrals, or other content through our platform. Any information you choose to make publicly available may be visible to other users where applicable.</p>
              <p>We are committed to collecting information responsibly and only to the extent necessary for providing secure, reliable, and high-quality services through the Clean7 platform.</p>
            </PolicySection>
            <PolicySection id="sec-2" number="2." title={`How We Use Your Information`}>
              <p>Clean7 uses the information we collect to operate our platform efficiently, deliver high-quality services, improve customer experience, and comply with applicable legal obligations. We process your information only for legitimate business purposes and in accordance with this Privacy Policy.</p>
              <h3 className="font-semibold text-[var(--ink)] mt-4">Your information may be used for the following purposes:</h3>
              <h3 className="font-semibold text-[var(--ink)] mt-4">Service Delivery</h3>
              <h3 className="font-semibold text-[var(--ink)] mt-4">We use your information to:</h3>
              <BulletList
                items={
[
                  <span key="0">Create and manage your account.</span>,
                  <span key="1">Process and confirm service bookings.</span>,
                  <span key="2">Schedule pickups, deliveries, and on-site services.</span>,
                  <span key="3">Coordinate with our authorized service teams and franchise partners.</span>,
                  <span key="4">Process payments and generate invoices.</span>,
                  <span key="5">Provide order updates, delivery notifications, and service confirmations.</span>
]
}
              />
              <h3 className="font-semibold text-[var(--ink)] mt-4">Customer Support</h3>
              <h3 className="font-semibold text-[var(--ink)] mt-4">Your information helps us:</h3>
              <BulletList
                items={
[
                  <span key="0">Respond to your questions and requests.</span>,
                  <span key="1">Resolve complaints and service-related issues.</span>,
                  <span key="2">Verify your identity when required.</span>,
                  <span key="3">Maintain customer support records for quality assurance.</span>
]
}
              />
              <h3 className="font-semibold text-[var(--ink)] mt-4">Improving Our Services</h3>
              <p>We continuously evaluate how customers use our website and mobile application to improve functionality, reliability, and user experience. This may include analyzing:</p>
              <BulletList
                items={
[
                  <span key="0">Booking trends</span>,
                  <span key="1">Popular services</span>,
                  <span key="2">Customer preferences</span>,
                  <span key="3">Platform performance</span>,
                  <span key="4">Feature usage</span>,
                  <span key="5">Service quality metrics</span>
]
}
              />
              <p>Where possible, such analysis is conducted using aggregated or anonymized data.</p>
              <h3 className="font-semibold text-[var(--ink)] mt-4">Personalization</h3>
              <h3 className="font-semibold text-[var(--ink)] mt-4">We may use your information to personalize your experience by:</h3>
              <BulletList
                items={
[
                  <span key="0">Recommending relevant services.</span>,
                  <span key="1">Remembering your preferences.</span>,
                  <span key="2">Displaying location-specific service availability.</span>,
                  <span key="3">Providing customized offers and promotions based on your interactions with Clean7.</span>
]
}
              />
              <h3 className="font-semibold text-[var(--ink)] mt-4">Communication</h3>
              <p>We may contact you through phone calls, SMS, email, WhatsApp, or push notifications to:</p>
              <BulletList
                items={
[
                  <span key="0">Confirm bookings.</span>,
                  <span key="1">Provide service reminders.</span>,
                  <span key="2">Share order status and delivery updates.</span>,
                  <span key="3">Respond to customer support requests.</span>,
                  <span key="4">Notify you about important changes to our services or policies.</span>
]
}
              />
              <p>Where required by applicable law, promotional communications will be sent only with your consent, and you may opt out at any time.</p>
              <h3 className="font-semibold text-[var(--ink)] mt-4">Marketing and Promotional Activities</h3>
              <p>With your permission or where legally permitted, we may use your information to inform you about:</p>
              <BulletList
                items={
[
                  <span key="0">New services</span>,
                  <span key="1">Special offers</span>,
                  <span key="2">Discount campaigns</span>,
                  <span key="3">Loyalty or referral programs</span>,
                  <span key="4">Seasonal promotions</span>,
                  <span key="5">Customer rewards</span>
]
}
              />
              <p>You can unsubscribe from promotional communications at any time without affecting your ability to use our core services.</p>
              <h3 className="font-semibold text-[var(--ink)] mt-4">Security and Fraud Prevention</h3>
              <h3 className="font-semibold text-[var(--ink)] mt-4">Your information may be used to:</h3>
              <BulletList
                items={
[
                  <span key="0">Verify transactions.</span>,
                  <span key="1">Prevent fraudulent activities.</span>,
                  <span key="2">Detect unauthorized access.</span>,
                  <span key="3">Protect customer accounts.</span>,
                  <span key="4">Investigate suspicious behavior.</span>,
                  <span key="5">Maintain the security and integrity of our platform.</span>
]
}
              />
              <h3 className="font-semibold text-[var(--ink)] mt-4">Legal and Regulatory Compliance</h3>
              <h3 className="font-semibold text-[var(--ink)] mt-4">We may use or disclose information where necessary to:</h3>
              <BulletList
                items={
[
                  <span key="0">Comply with applicable laws and regulations.</span>,
                  <span key="1">Respond to lawful requests from government authorities.</span>,
                  <span key="2">Enforce our Terms & Conditions and other policies.</span>,
                  <span key="3">Protect the rights, property, safety, or security of Clean7, our customers, employees, franchise partners, or the public.</span>
]
}
              />
              <h3 className="font-semibold text-[var(--ink)] mt-4">Analytics and Platform Administration</h3>
              <p>Technical information such as device details, browser type, operating system, IP address, and usage statistics may be used to:</p>
              <BulletList
                items={
[
                  <span key="0">Monitor website and application performance.</span>,
                  <span key="1">Diagnose technical issues.</span>,
                  <span key="2">Improve system stability.</span>,
                  <span key="3">Maintain cybersecurity.</span>,
                  <span key="4">Generate statistical reports and business insights.</span>
]
}
              />
              <p>This information is generally analyzed in an aggregated manner and is not intended to personally identify individual users.</p>
              <h3 className="font-semibold text-[var(--ink)] mt-4">Surveys and Feedback</h3>
              <p>From time to time, Clean7 may invite you to participate in optional surveys, customer satisfaction programs, or feedback initiatives. Participation is entirely voluntary.</p>
              <h3 className="font-semibold text-[var(--ink)] mt-4">Information collected through these activities helps us:</h3>
              <BulletList
                items={
[
                  <span key="0">Understand customer expectations.</span>,
                  <span key="1">Improve service quality.</span>,
                  <span key="2">Develop new features.</span>,
                  <span key="3">Enhance overall customer satisfaction.</span>
]
}
              />
              <p>Any personal information provided through surveys will be handled in accordance with this Privacy Policy.</p>
              <p>Clean7 does not sell your personal information to third parties for their independent marketing purposes. We use your information responsibly and only for purposes that support the operation, improvement, security, and lawful administration of our services.</p>
            </PolicySection>
            <PolicySection id="sec-3" number="3." title={`Cookies and Similar Technologies`}>
              <p>Clean7 uses cookies and similar technologies to improve the functionality, security, and overall user experience of our website and mobile application.</p>
              <p>A cookie is a small text file that is stored on your device by your web browser when you visit a website. Cookies help the website recognize your browser, remember your preferences, and provide a more personalized and efficient browsing experience during future visits.</p>
              <p>We may use both temporary (session) cookies, which are deleted when you close your browser, and persistent cookies, which remain on your device until they expire or are manually removed.</p>
              <h3 className="font-semibold text-[var(--ink)] mt-4">Cookies used by Clean7 may help us to:</h3>
              <BulletList
                items={
[
                  <span key="0">Keep you signed in to your account.</span>,
                  <span key="1">Remember your preferences and settings.</span>,
                  <span key="2">Enable essential website features and functionality.</span>,
                  <span key="3">Improve website speed and performance.</span>,
                  <span key="4">Analyze visitor behavior and platform usage.</span>,
                  <span key="5">Measure the effectiveness of marketing campaigns.</span>,
                  <span key="6">Detect security threats and prevent fraudulent activities.</span>,
                  <span key="7">Enhance the overall customer experience.</span>
]
}
              />
              <p>Most cookies used by Clean7 do not directly identify you personally. However, where cookies are associated with your account or personal information, they will be handled in accordance with this Privacy Policy.</p>
              <p>You may choose to manage, restrict, or disable cookies through your browser settings at any time. Please note that disabling certain cookies may affect the availability or proper functioning of some features of the Clean7 website or mobile application.</p>
              <p>In addition to our own cookies, certain trusted third-party service providers, such as analytics, payment, mapping, or advertising partners, may place cookies or similar technologies on your device when you use our platform. The use of such technologies is governed by the respective privacy policies of those third parties.</p>
              <p>By continuing to use the Clean7 website or mobile application without changing your browser settings, you consent to our use of cookies and similar technologies as described in this Privacy Policy.</p>
            </PolicySection>
            <PolicySection id="sec-4" number="4." title={`Sharing and Disclosure of Personal Information`}>
              <p>Clean7 values your privacy and does not sell, rent, or trade your personal information to third parties for their independent marketing purposes. We share your information only when it is necessary to provide our services, comply with legal obligations, protect our legitimate interests, or with your consent.</p>
              <h3 className="font-semibold text-[var(--ink)] mt-4">Your personal information may be shared in the following circumstances:</h3>
              <h3 className="font-semibold text-[var(--ink)] mt-4">Service Partners and Franchise Operators</h3>
              <p>To fulfill your service requests, Clean7 may share relevant information with its authorized franchise partners, service providers, delivery personnel, and operational teams. Only the information necessary to complete your booking or provide customer support will be shared.</p>
              <h3 className="font-semibold text-[var(--ink)] mt-4">Business Support Providers</h3>
              <p>We may engage trusted third-party vendors to support our operations, including payment processing, cloud hosting, analytics, customer support, communication services, mapping, SMS delivery, and technology infrastructure. These service providers are permitted to access personal information only to the extent required to perform their services on our behalf and are contractually expected to protect your information.</p>
              <h3 className="font-semibold text-[var(--ink)] mt-4">Legal and Regulatory Requirements</h3>
              <p>We may disclose your personal information if required by applicable law, regulation, court order, government authority, or any lawful request. We may also disclose information where we reasonably believe such disclosure is necessary to:</p>
              <BulletList
                items={
[
                  <span key="0">Comply with legal obligations.</span>,
                  <span key="1">Protect the rights, safety, or property of Clean7, our customers, employees, franchise partners, or the public.</span>,
                  <span key="2">Investigate fraud, cybercrime, security incidents, or other unlawful activities.</span>,
                  <span key="3">Enforce our Terms & Conditions, Privacy Policy, or other applicable agreements.</span>,
                  <span key="4">Prevent misuse of our platform or services.</span>
]
}
              />
              <h3 className="font-semibold text-[var(--ink)] mt-4">Business Transfers</h3>
              <p>If Clean7 undergoes a merger, acquisition, investment, restructuring, sale of assets, or any similar corporate transaction, customer information may be transferred as part of that process. In such cases, the receiving entity will be expected to protect your personal information in a manner consistent with this Privacy Policy and applicable law.</p>
              <h3 className="font-semibold text-[var(--ink)] mt-4">With Your Consent</h3>
              <p>In situations where your explicit consent is required, we will seek your permission before sharing your personal information with any third party for purposes not already described in this Privacy Policy.</p>
              <h3 className="font-semibold text-[var(--ink)] mt-4">Aggregated and Anonymous Information</h3>
              <p>Clean7 may use or share aggregated, statistical, or anonymized information that does not identify any individual user. Such information may be used for research, business analysis, service improvement, operational planning, or reporting purposes.</p>
              <p>Clean7 shares personal information only to the extent reasonably necessary for providing secure, reliable, and efficient services, and we take appropriate measures to ensure that all recipients handle your information responsibly and in accordance with applicable privacy and data protection laws.</p>
            </PolicySection>
            <PolicySection id="sec-5" number="5." title={`Links to Third-Party Websites`}>
              <p>The Clean7 website or mobile application may contain links to third-party websites, applications, or online services for your convenience or to provide additional information. These third-party platforms operate independently and are not owned, managed, or controlled by Clean7.</p>
              <p>Once you leave the Clean7 platform or access a third-party website through one of our links, your interactions with that website will be governed by its own privacy policy, terms of use, and security practices. Clean7 is not responsible for the content, accuracy, availability, privacy practices, or data handling procedures of any third-party website or service.</p>
              <p>We encourage you to review the privacy policy and terms of any third-party website or application before providing personal information or using their services. Your use of such third-party platforms is entirely at your own discretion and risk.</p>
            </PolicySection>
            <PolicySection id="sec-6" number="6." title={`Security of Your Information`}>
              <p>Protecting your personal information is a priority for Clean7. We implement appropriate technical, administrative, and organizational security measures to safeguard the information you share with us against unauthorized access, loss, misuse, alteration, disclosure, or destruction.</p>
              <p>Our website and mobile application use secure communication protocols and industry-standard security practices to protect data transmitted between your device and our systems. Where applicable, sensitive information is transmitted using encrypted connections.</p>
              <p>Access to personal information is restricted to authorized employees, franchise partners, service providers, and contractors who require such access to perform their legitimate business responsibilities. These individuals are expected to maintain the confidentiality and security of your information.</p>
              <p>While we continuously monitor and enhance our security systems, no method of data transmission over the internet or electronic storage is completely secure. Therefore, although we strive to protect your personal information using commercially reasonable safeguards, we cannot guarantee absolute security. Users are encouraged to keep their account credentials confidential and notify Clean7 immediately if they suspect any unauthorized access to their account.</p>
              <p>Clean7 regularly reviews and updates its security practices to address evolving technologies, operational requirements, and cybersecurity risks, helping ensure the continued protection of customer information.</p>
            </PolicySection>
            <PolicySection id="sec-7" number="7." title={`Your Choices and Communication Preferences`}>
              <p>Clean7 respects your communication preferences and provides you with control over the promotional messages you receive from us.</p>
              <p>You may choose to opt out of receiving non-essential communications, including promotional emails, marketing messages, special offers, newsletters, and other advertising-related notifications, at any time. Opting out of promotional communications will not affect important service-related communications that are necessary for the operation of your account or the delivery of our services.</p>
              <h3 className="font-semibold text-[var(--ink)] mt-4">Essential communications may include:</h3>
              <BulletList
                items={
[
                  <span key="0">Booking confirmations</span>,
                  <span key="1">Pickup and delivery updates</span>,
                  <span key="2">Payment receipts and invoices</span>,
                  <span key="3">Security alerts</span>,
                  <span key="4">Account verification messages</span>,
                  <span key="5">Customer support responses</span>,
                  <span key="6">Notifications regarding changes to our services, policies, or legal terms</span>
]
}
              />
              <p>You can manage your communication preferences through your account settings (where available), by using the unsubscribe option provided in our communications, or by contacting our customer support team.</p>
              <p>If you wish to update, correct, or remove your contact information, or request that we stop sending promotional communications, you may submit a request through the contact details provided in this Privacy Policy. We will process such requests within a reasonable timeframe, subject to applicable legal and operational requirements.</p>
            </PolicySection>
            <PolicySection id="sec-8" number="8." title={`Advertising and Third-Party Marketing`}>
              <p>Clean7 may display advertisements, promotional content, or marketing campaigns on its website or mobile application. In some cases, we may work with trusted third-party advertising or analytics partners to deliver relevant content and measure the effectiveness of our marketing activities.</p>
              <p>These partners may use technologies such as cookies, pixels, or similar tools to collect limited technical information about your interactions with our platform, including device information, browser type, pages visited, and general usage patterns. This information is typically used to improve advertising relevance, measure campaign performance, and enhance user experience.</p>
              <p>Clean7 does not provide your personally identifiable information—such as your name, phone number, email address, or residential address—to third-party advertisers for their independent marketing purposes without your consent, except where required by applicable law.</p>
              <p>You may be able to manage your advertising preferences by adjusting your browser settings, device privacy controls, or the privacy settings available through third-party advertising platforms. Please note that disabling personalized advertising may result in advertisements that are less relevant to your interests but will not affect your ability to use Clean7&apos;s core services.</p>
              <p>Any data collected by third-party advertising providers is subject to their respective privacy policies, and Clean7 encourages users to review those policies before interacting with third-party advertisements or promotional content.</p>
              <h3 className="font-semibold text-[var(--ink)] mt-4">Data Retention</h3>
              <p>Clean7 retains your personal information only for as long as it is reasonably necessary to provide our services, fulfill contractual obligations, comply with applicable laws, resolve disputes, prevent fraud, enforce our legal rights, and maintain business records.</p>
              <p>The retention period may vary depending on the type of information and the purpose for which it was collected. Once your personal information is no longer required, we will securely delete, anonymize, or dispose of it in accordance with our internal data retention policies and applicable legal requirements.</p>
              <p>Certain information may be retained for a longer period where required by law, regulatory authorities, taxation requirements, accounting obligations, or for the establishment, exercise, or defense of legal claims.</p>
              <h3 className="font-semibold text-[var(--ink)] mt-4">Account Deletion</h3>
              <p>You may request the deletion of your Clean7 account and associated personal information at any time by contacting our customer support or by using the account deletion feature available within the Clean7 mobile application or website, where applicable.</p>
              <p>Upon receiving a valid request, we will take reasonable steps to delete or anonymize your personal information within a reasonable period, subject to applicable legal, regulatory, taxation, fraud prevention, and operational requirements.</p>
              <p>Please note that certain information may continue to be retained for legal compliance, dispute resolution, security purposes, audit requirements, or to protect the legitimate interests of Clean7, even after your account has been deleted.</p>
              <h3 className="font-semibold text-[var(--ink)] mt-4">Children&apos;s Privacy</h3>
              <p>Clean7&apos;s services are intended for individuals who are legally capable of entering into a binding agreement under applicable laws. Our website and mobile application are not directed towards children under the age of 18 years.</p>
              <p>We do not knowingly collect personal information from children. If we become aware that personal information has been collected from a child without appropriate parental or legal guardian consent, we will take reasonable steps to delete such information as soon as practicable.</p>
              <p>If you believe that a child has provided personal information to Clean7, please contact us immediately using the contact details provided in this Privacy Policy.</p>
              <h3 className="font-semibold text-[var(--ink)] mt-4">International Data Transfers</h3>
              <p>Clean7 may use trusted third-party technology providers, cloud infrastructure services, payment processors, analytics platforms, communication providers, and other service partners that may process or store information on servers located outside India.</p>
              <p>Where personal information is transferred across international borders, Clean7 will take reasonable steps to ensure that such information is protected through appropriate contractual, technical, and organizational safeguards, and that the transfer is carried out in accordance with applicable data protection laws.</p>
              <p>By using our services, you acknowledge that your information may be processed in jurisdictions outside your country of residence where necessary for providing our services.</p>
              <h3 className="font-semibold text-[var(--ink)] mt-4">Your Privacy Rights</h3>
              <h3 className="font-semibold text-[var(--ink)] mt-4">Subject to applicable law, you may have the right to:</h3>
              <BulletList
                items={
[
                  <span key="0">Access the personal information that Clean7 holds about you.</span>,
                  <span key="1">Request correction or updating of inaccurate or incomplete information.</span>,
                  <span key="2">Request deletion of your personal information, subject to applicable legal and operational requirements.</span>,
                  <span key="3">Withdraw your consent for the processing of personal information where processing is based on your consent.</span>,
                  <span key="4">Object to or restrict certain types of processing where permitted by law.</span>,
                  <span key="5">Request information regarding how your personal information is processed.</span>,
                  <span key="6">Submit complaints or grievances regarding the handling of your personal information.</span>
]
}
              />
              <p>To exercise any of these rights, you may contact Clean7 using the contact details provided in this Privacy Policy. We may request reasonable information to verify your identity before processing your request.</p>
              <h3 className="font-semibold text-[var(--ink)] mt-4">Third-Party Services</h3>
              <p>To provide and improve our services, Clean7 may integrate with trusted third-party service providers for functions such as payment processing, cloud hosting, location and mapping services, analytics, customer communication, authentication, notifications, and technical support.</p>
              <p>Depending on the features you use, these third-party providers may process limited information necessary to perform their services. Examples may include payment gateways, SMS and email service providers, cloud infrastructure providers, analytics platforms, map services, and customer support tools.</p>
              <p>Clean7 carefully selects its service providers and expects them to maintain appropriate security measures and process personal information only for authorized purposes in accordance with applicable laws and contractual obligations.</p>
              <p>The privacy practices of these third-party providers are governed by their own privacy policies, and Clean7 encourages users to review those policies where appropriate.</p>
            </PolicySection>
            <PolicySection id="sec-9" number="9." title={`Your Consent`}>
              <p>By accessing or using the Clean7 website, mobile application, or any of our services, you acknowledge that you have read, understood, and agreed to this Privacy Policy. You consent to the collection, use, storage, processing, and sharing of your information as described in this Privacy Policy and in accordance with applicable laws.</p>
              <p>Where your explicit consent is required for specific activities, such as enabling location access, receiving promotional communications, or allowing certain device permissions, Clean7 will seek your consent before processing such information. You may withdraw your consent at any time where permitted by law; however, doing so may affect the availability or functionality of certain services.</p>
              <p>Clean7 may update this Privacy Policy from time to time to reflect changes in our business practices, technology, legal requirements, or services. Any revised version will be published on our website and mobile application with the updated effective date. Your continued use of our platform after such changes become effective constitutes your acceptance of the revised Privacy Policy.</p>
              <p>By providing your contact details or creating an account with Clean7, you also agree to receive service-related communications through channels such as SMS, email, telephone calls, WhatsApp, push notifications, in-app messages, Rich Communication Services (RCS), or other electronic communication methods that may be introduced from time to time. These communications may include booking confirmations, pickup and delivery updates, payment receipts, account verification messages, customer support responses, security alerts, important policy updates, and, where permitted by law or with your consent, promotional offers and marketing communications.</p>
              <p>You may opt out of receiving promotional communications at any time by following the unsubscribe instructions provided or by contacting Clean7 customer support. However, you will continue to receive essential service-related communications necessary for the use of your account and our services.</p>
            </PolicySection>
            <PolicySection id="sec-10" number="10." title={`Grievance Redressal Officer`}>
              <p>Clean7 is committed to addressing customer concerns, privacy-related requests, and complaints in a fair, transparent, and timely manner.</p>
              <p>If you have any questions regarding this Privacy Policy, wish to exercise your privacy rights, or would like to report a concern relating to the collection, use, or processing of your personal information, you may contact our Grievance Redressal Officer using the details provided below.</p>
              <h3 className="font-semibold text-[var(--ink)] mt-4">Grievance Redressal Officer</h3>
              <h3 className="font-semibold text-[var(--ink)] mt-4">Name: [Anmol Tomar]</h3>
              <h3 className="font-semibold text-[var(--ink)] mt-4">Elite Wash Solution Private Limited</h3>
              <h3 className="font-semibold text-[var(--ink)] mt-4">Corporate Office:</h3>
              <h3 className="font-semibold text-[var(--ink)] mt-4">[NH 58 Rohta Bypass Flyover Service Road Khadoli, Meerut]</h3>
              <h3 className="font-semibold text-[var(--ink)] mt-4">Email: support@clean7.in</h3>
              <h3 className="font-semibold text-[var(--ink)] mt-4">Phone: +91-7078497263</h3>
              <p>Business Hours: Monday to Saturday, 10:00 AM to 6:00 PM (IST), excluding public holidays.</p>
              <p>Clean7 will make reasonable efforts to acknowledge and resolve complaints or privacy-related requests within the timelines prescribed under applicable laws. In certain cases, additional information may be requested to verify your identity before processing your request.</p>
            </PolicySection>
          </div>
        </div>
      </Container>

      <Footer />
    </div>
  );
}
