import React from "react";
import Container from "@/app/components/layout/Container";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/sections/Footer";
import { SatoshiFont, WixMadeForDisplayFont } from "@/app/fonts";
import { canonicalPath } from "@/app/lib/site-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Delete Your Account",
  description: "How to delete your Clean7 account and personal data.",
  alternates: { canonical: canonicalPath("/delete-account") },
};

function PolicySection({
  id,
  title,
  children,
}: {
  id: string;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 pt-8 first:pt-0">
      {title && (
        <h2
          className="mb-4 text-[20px] font-semibold text-[var(--ink)] sm:text-[24px]"
          style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
        >
          {title}
        </h2>
      )}
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

export default function DeleteAccountPage() {
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
            Delete Your Clean7 Account
          </h1>
        </div>
      </Container>
      <Container
        isMaxWidth={true}
        className="px-[clamp(20px,5vw,56px)] pb-16 md:pb-24"
      >
        <div className="mx-auto max-w-4xl">
          <div className="space-y-12">
            <PolicySection id="intro">
              <p>
                At Clean7, we respect your privacy and believe you should have
                complete control over your personal information. You can
                permanently delete your account and associated personal data at
                any time.
              </p>
            </PolicySection>

            <PolicySection
              id="how-to-delete"
              title="How to Delete Your Account"
            >
              <p>
                You can permanently delete your account directly from the Clean7
                app by following these steps:
              </p>
              <h3 className="font-semibold text-[var(--ink)] mt-4">
                1. Open the Clean7 app
              </h3>
              <p>
                Launch the app and sign in to your account if you haven&apos;t
                already.
              </p>
              <h3 className="font-semibold text-[var(--ink)] mt-4">
                2. Navigate to
              </h3>
              <p>
                Profile &rarr; Other Information &rarr; Account Privacy &rarr;
                Request to Delete Account
              </p>
              <h3 className="font-semibold text-[var(--ink)] mt-4">
                3. Confirm the Request
              </h3>
              <p>
                Review the information displayed and confirm your account
                deletion request.
              </p>
            </PolicySection>

            <PolicySection id="security" title="Security Verification">
              <p>
                To protect your account, you may be asked to verify your
                identity before the deletion request is processed.
              </p>
            </PolicySection>

            <PolicySection
              id="what-happens"
              title="What Happens When You Delete Your Account"
            >
              <p>Once your account deletion request has been confirmed:</p>
              <BulletList
                items={[
                  <span key="1">
                    Your Clean7 account will be permanently deleted.
                  </span>,
                  <span key="2">
                    Your personal profile information will be removed.
                  </span>,
                  <span key="3">
                    Saved addresses and preferences will be deleted.
                  </span>,
                  <span key="4">
                    Previous bookings and account history will no longer be
                    accessible through the app.
                  </span>,
                  <span key="5">
                    All active sessions will be signed out automatically.
                  </span>,
                  <span key="6">
                    Any loyalty points, rewards, or promotional benefits
                    associated with your account may be forfeited.
                  </span>,
                ]}
              />
              <p className="mt-4 font-medium">
                <span className="font-semibold text-[var(--ink)]">
                  Please Note:{" "}
                </span>
                Account deletion is permanent and cannot be undone.
              </p>
            </PolicySection>

            <PolicySection id="data-retention" title="Data Retention">
              <p>
                Some information may be retained for a limited period where
                required by applicable laws or legitimate business obligations,
                including:
              </p>
              <BulletList
                items={[
                  <span key="1">Legal and regulatory compliance</span>,
                  <span key="2">
                    Fraud prevention and security investigations
                  </span>,
                  <span key="3">Tax and financial recordkeeping</span>,
                  <span key="4">
                    Dispute resolution and enforcement of our Terms of Service
                  </span>,
                ]}
              />
              <p className="mt-4">
                Any retained information is securely stored, protected, and
                deleted once the applicable retention period expires.
              </p>
            </PolicySection>

            <PolicySection id="need-assistance" title="Need Assistance?">
              <p>
                If you&apos;re unable to access your account or need help with
                the deletion process, our support team is here to help.
              </p>
              <p>
                Email:{" "}
                <a
                  href="mailto:support@clean7.in"
                  className="text-[var(--ink)] underline underline-offset-2 hover:text-[var(--ink-soft)] transition-colors"
                >
                  support@clean7.in
                </a>
              </p>
              <p>
                We aim to respond to all account deletion requests and support
                inquiries as quickly as possible.
              </p>
            </PolicySection>
          </div>
        </div>
      </Container>
      q
      <Footer />
    </div>
  );
}
