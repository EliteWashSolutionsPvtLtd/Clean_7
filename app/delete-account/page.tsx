import {
  PageHeroAnimation,
  PageSectionsAnimation,
} from "@/app/components/animations/PageAnimations";
import Container from "@/app/components/layout/Container";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/sections/Footer";
import { SatoshiFont, WixMadeForDisplayFont } from "@/app/fonts";
import { canonicalPath } from "@/app/lib/site-config";
import type { Metadata } from "next";
import {
  AlertTriangle,
  Smartphone,
  Trash2,
  Shield,
  HelpCircle,
} from "lucide-react";

const SUPPORT_EMAIL = "support@clean7.in";
const SUPPORT_MAILTO = `mailto:${SUPPORT_EMAIL}`;

export const metadata: Metadata = {
  title: "Delete Your Account",
  description:
    "How to delete your Clean7 account and personal data from the mobile app.",
  alternates: { canonical: canonicalPath("/delete-account") },
};

export default function DeleteAccountPage() {
  return (
    <div style={{ fontFamily: SatoshiFont.style.fontFamily }}>
      <Navbar />

      <PageHeroAnimation variant="centeredSequential">
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-[#FFFBF6] via-[#FDF9F5] to-white" />
          <Container
            isMaxWidth={true}
            className="relative mt-[70px] flex min-h-[calc(36svh-70px)] items-center justify-center px-[20px] pb-8 pt-12 md:pb-12 md:pt-16"
          >
            <div className="max-w-3xl text-center">
              <div className="page-hero-subtitle gsap-animate mb-4 inline-flex items-center gap-2 rounded-full border border-[#E8DFD6] bg-white/80 px-4 py-2 text-sm text-[#7B6F69] opacity-0">
                <Trash2 className="h-4 w-4" aria-hidden />
                Account &amp; data
              </div>
              <h1
                className="page-hero-title gsap-animate text-3xl font-bold tracking-tight text-[#33302E] opacity-0 sm:text-4xl md:text-[2.75rem] md:leading-tight"
                style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
              >
                Delete Your Clean7 Account
              </h1>
              <p className="page-hero-meta gsap-animate mx-auto mt-4 max-w-2xl text-[16px] leading-relaxed text-[#5E5450] opacity-0 sm:text-[17px]">
                At Clean7, we value your privacy and give users full control
                over their personal data.
              </p>
            </div>
          </Container>
        </div>
      </PageHeroAnimation>

      <PageSectionsAnimation sequentialSections>
        <Container isMaxWidth={true} className="px-[20px] pb-16 md:pb-24">
          <div className="mx-auto max-w-3xl space-y-6">
            {/* How to Delete Your Account */}
            <section
              id="steps"
              className="page-section gsap-animate scroll-mt-28 rounded-[24px] border border-[#E8DFD6]/50 bg-linear-to-br from-[#FEFEFE] to-[#F8F5F2] p-6 opacity-0 shadow-[6px_6px_16px_rgba(209,199,189,0.45),-6px_-6px_16px_rgba(255,255,255,0.9)] sm:rounded-[28px] sm:p-8"
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-orange to-[#FF7700] text-white shadow-[0_6px_14px_rgba(255,119,0,0.28)]">
                  <Smartphone className="h-[18px] w-[18px]" aria-hidden />
                </span>
                <h2
                  className="text-xl font-semibold text-[#33302E] sm:text-2xl"
                  style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
                >
                  How to Delete Your Account
                </h2>
              </div>
              <p className="mb-6 text-[15px] leading-relaxed text-[#5E5450] sm:text-[16px]">
                You can permanently delete your account directly from the app by
                following these steps:
              </p>
              <ol className="grid gap-3 mb-6">
                <li className="flex gap-3 rounded-xl border border-[#E8DFD6]/60 bg-white/90 px-4 py-3.5 text-[15px] leading-relaxed text-[#5E5450] shadow-[2px_2px_8px_rgba(209,199,189,0.22)]">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#FFF5EE] text-sm font-semibold text-[#C45C2A]">
                    1
                  </span>
                  <span className="pt-0.5">Open the Clean7 app</span>
                </li>
                <li className="flex gap-3 rounded-xl border border-[#E8DFD6]/60 bg-white/90 px-4 py-3.5 text-[15px] leading-relaxed text-[#5E5450] shadow-[2px_2px_8px_rgba(209,199,189,0.22)]">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#FFF5EE] text-sm font-semibold text-[#C45C2A]">
                    2
                  </span>
                  <span className="pt-0.5">
                    Navigate to:{" "}
                    <strong className="font-semibold text-[#3F3936]">
                      Profile &gt; Other Information &gt; Account Privacy &gt;
                      Request to Delete Account
                    </strong>
                  </span>
                </li>
                <li className="flex gap-3 rounded-xl border border-[#E8DFD6]/60 bg-white/90 px-4 py-3.5 text-[15px] leading-relaxed text-[#5E5450] shadow-[2px_2px_8px_rgba(209,199,189,0.22)]">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#FFF5EE] text-sm font-semibold text-[#C45C2A]">
                    3
                  </span>
                  <span className="pt-0.5">Confirm the deletion request</span>
                </li>
              </ol>
              <p className="text-[15px] leading-relaxed text-[#5E5450] sm:text-[16px]">
                For security purposes, you may be asked to verify your identity
                before deletion is completed.
              </p>
            </section>

            {/* What Happens When You Delete Your Account */}
            <section
              id="what-happens"
              className="page-section gsap-animate scroll-mt-28 rounded-[24px] border border-[#E8DFD6]/50 bg-linear-to-br from-[#FEFEFE] to-[#F8F5F2] p-6 opacity-0 shadow-[6px_6px_16px_rgba(209,199,189,0.45),-6px_-6px_16px_rgba(255,255,255,0.9)] sm:rounded-[28px] sm:p-8"
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-orange to-[#FF7700] text-white shadow-[0_6px_14px_rgba(255,119,0,0.28)]">
                  <AlertTriangle className="h-[18px] w-[18px]" aria-hidden />
                </span>
                <h2
                  className="text-xl font-semibold text-[#33302E] sm:text-2xl"
                  style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
                >
                  What Happens When You Delete Your Account
                </h2>
              </div>
              <p className="mb-4 text-[15px] leading-relaxed text-[#5E5450] sm:text-[16px]">
                Once your account deletion is confirmed:
              </p>
              <ul className="mb-6 grid gap-2">
                <li className="flex items-start gap-2 rounded-xl bg-white/85 px-4 py-3 text-[15px] text-[#5E5450] shadow-[2px_2px_8px_rgba(209,199,189,0.3),-2px_-2px_8px_rgba(255,255,255,0.9)]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
                  <span>Your account will be permanently removed</span>
                </li>
                <li className="flex items-start gap-2 rounded-xl bg-white/85 px-4 py-3 text-[15px] text-[#5E5450] shadow-[2px_2px_8px_rgba(209,199,189,0.3),-2px_-2px_8px_rgba(255,255,255,0.9)]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
                  <span>Your personal profile information will be deleted</span>
                </li>
                <li className="flex items-start gap-2 rounded-xl bg-white/85 px-4 py-3 text-[15px] text-[#5E5450] shadow-[2px_2px_8px_rgba(209,199,189,0.3),-2px_-2px_8px_rgba(255,255,255,0.9)]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
                  <span>Saved addresses and preferences will be removed</span>
                </li>
                <li className="flex items-start gap-2 rounded-xl bg-white/85 px-4 py-3 text-[15px] text-[#5E5450] shadow-[2px_2px_8px_rgba(209,199,189,0.3),-2px_-2px_8px_rgba(255,255,255,0.9)]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
                  <span>
                    Your access to previous bookings and account history inside
                    the app will no longer be available
                  </span>
                </li>
                <li className="flex items-start gap-2 rounded-xl bg-white/85 px-4 py-3 text-[15px] text-[#5E5450] shadow-[2px_2px_8px_rgba(209,199,189,0.3),-2px_-2px_8px_rgba(255,255,255,0.9)]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
                  <span>Active sessions will be signed out automatically</span>
                </li>
              </ul>
              <div className="space-y-4 rounded-2xl border border-amber-200/80 bg-amber-50/60 p-4 sm:p-5">
                <p className="text-[15px] leading-relaxed text-[#5E5450] sm:text-[16px]">
                  <strong className="font-semibold text-[#3F3936]">
                    This action cannot be undone.
                  </strong>
                </p>
              </div>
            </section>

            {/* Data Retention */}
            <section
              id="data-retention"
              className="page-section gsap-animate scroll-mt-28 rounded-[24px] border border-[#E8DFD6]/50 bg-linear-to-br from-[#FEFEFE] to-[#F8F5F2] p-6 opacity-0 shadow-[6px_6px_16px_rgba(209,199,189,0.45),-6px_-6px_16px_rgba(255,255,255,0.9)] sm:rounded-[28px] sm:p-8"
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-orange to-[#FF7700] text-white shadow-[0_6px_14px_rgba(255,119,0,0.28)]">
                  <Shield className="h-[18px] w-[18px]" aria-hidden />
                </span>
                <h2
                  className="text-xl font-semibold text-[#33302E] sm:text-2xl"
                  style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
                >
                  Data Retention
                </h2>
              </div>
              <p className="mb-4 text-[15px] leading-relaxed text-[#5E5450] sm:text-[16px]">
                Certain information may be retained for a limited period where
                required for:
              </p>
              <ul className="mb-6 grid gap-2">
                <li className="flex items-start gap-2 rounded-xl bg-white/85 px-4 py-3 text-[15px] text-[#5E5450] shadow-[2px_2px_8px_rgba(209,199,189,0.3),-2px_-2px_8px_rgba(255,255,255,0.9)]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
                  <span>Legal compliance</span>
                </li>
                <li className="flex items-start gap-2 rounded-xl bg-white/85 px-4 py-3 text-[15px] text-[#5E5450] shadow-[2px_2px_8px_rgba(209,199,189,0.3),-2px_-2px_8px_rgba(255,255,255,0.9)]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
                  <span>Fraud prevention</span>
                </li>
                <li className="flex items-start gap-2 rounded-xl bg-white/85 px-4 py-3 text-[15px] text-[#5E5450] shadow-[2px_2px_8px_rgba(209,199,189,0.3),-2px_-2px_8px_rgba(255,255,255,0.9)]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
                  <span>Tax and financial recordkeeping</span>
                </li>
                <li className="flex items-start gap-2 rounded-xl bg-white/85 px-4 py-3 text-[15px] text-[#5E5450] shadow-[2px_2px_8px_rgba(209,199,189,0.3),-2px_-2px_8px_rgba(255,255,255,0.9)]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
                  <span>Dispute resolution</span>
                </li>
              </ul>
              <p className="text-[15px] leading-relaxed text-[#5E5450] sm:text-[16px]">
                Any retained data is securely protected and only stored for the
                duration required under applicable laws.
              </p>
            </section>

            {/* Need Help? */}
            <section
              id="support"
              className="page-section gsap-animate scroll-mt-28 rounded-[24px] border border-[#E8DFD6]/50 bg-linear-to-br from-[#FEFEFE] to-[#F8F5F2] p-6 opacity-0 shadow-[6px_6px_16px_rgba(209,199,189,0.45),-6px_-6px_16px_rgba(255,255,255,0.9)] sm:rounded-[28px] sm:p-8"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-orange to-[#FF7700] text-white shadow-[0_6px_14px_rgba(255,119,0,0.28)]">
                  <HelpCircle className="h-[18px] w-[18px]" aria-hidden />
                </span>
                <h2
                  className="text-xl font-semibold text-[#33302E] sm:text-2xl"
                  style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
                >
                  Need Help?
                </h2>
              </div>
              <p className="text-[15px] leading-relaxed text-[#5E5450] sm:text-[16px]">
                If you are unable to access the app or require assistance
                regarding account deletion, please contact us at:{" "}
                <a
                  href={SUPPORT_MAILTO}
                  className="font-semibold text-[#C45C2A] underline decoration-orange/40 underline-offset-2 transition hover:text-orange"
                >
                  {SUPPORT_EMAIL}
                </a>
              </p>
            </section>
          </div>
        </Container>
      </PageSectionsAnimation>

      <Footer />
    </div>
  );
}
