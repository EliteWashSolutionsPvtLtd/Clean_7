import { WixMadeForDisplayFont } from "@/app/fonts";
import { APP_STORE_URL, GOOGLE_PLAY_URL } from "@/app/lib/store-links";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import AppleIcon from "../icons/AppleIcon";
import GooglePlayIcon from "../icons/GooglePlayIcon";
import Link from "next/link";
import { FooterAnimation } from "../animations/PageAnimations";
import { FooterParticles } from "./FooterParticles";

const FOOTER_PHONE_DISPLAY = "7078497263";
const FOOTER_PHONE_TEL = "tel:+7078497263";
const FOOTER_EMAIL = "support@washandwow.in";
const FOOTER_EMAIL_MAILTO = `mailto:${FOOTER_EMAIL}`;
const FOOTER_ADDRESS = "123, Mullapur Road, Thana Bhawan, Shamli, Uttar Pradesh, 247777";
const FOOTER_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(FOOTER_ADDRESS)}`;

function ContactItem({
  icon,
  text,
  href,
}: {
  icon: React.ReactNode;
  text: string;
  href: string;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group flex items-start gap-[10px] text-brown-footer-contact-icon transition-colors duration-300 hover:text-orange"
    >
      <span className="transition-transform duration-300 group-hover:scale-110">
        {icon}
      </span>
      <span className="text-[16px] text-brown-footer-contact-text transition-colors duration-300 group-hover:text-[#584E46]">
        {text}
      </span>
    </a>
  );
}

function AppleDownloadButton() {
  return (
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex w-fit items-center justify-center gap-[10px] rounded-[10px] bg-brown-footer-download-apple-bg px-[15px] py-[8px] text-white shadow-lg transition-all duration-300 hover:scale-[1.05] hover:shadow-xl active:scale-[0.98]"
    >
      <AppleIcon className="w-[40px] transition-transform duration-300 group-hover:scale-110" />

      <div className="whitespace-nowrap">
        <p className="text-xs">Download on the</p>
        <p className="font-bold">App Store</p>
      </div>
    </a>
  );
}

function GoogleDownloadButton() {
  return (
    <a
      href={GOOGLE_PLAY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex w-fit items-center justify-center gap-[10px] rounded-[10px] bg-brown-footer-download-google-bg px-[15px] py-[8px] text-white shadow-lg transition-all duration-300 hover:scale-[1.05] hover:shadow-xl active:scale-[0.98]"
    >
      <GooglePlayIcon className="w-[40px] transition-transform duration-300 group-hover:scale-110" />

      <div className="whitespace-nowrap">
        <p className="text-[#746159] text-xs">Get it on</p>
        <p className="font-bold text-[#91776C]">Google Play</p>
      </div>
    </a>
  );
}

const footerLinkClass =
  "text-brown-footer-contact-text text-[16px] cursor-pointer hover:text-orange hover:translate-x-1 transition-all duration-300";

const footerMutedLineClass =
  "text-brown-footer-contact-text text-[16px] transition-colors duration-300";

function CompanyColumn() {
  return (
    <div>
      <h2 className="text-[#91776C] font-bold text-[18px]">Company</h2>
      <div className="mt-[10px] flex flex-col gap-[5px]">
        <Link href="/about" className={footerLinkClass}>
          About Us
        </Link>
        <p className={footerMutedLineClass}>Our Team</p>
      </div>
    </div>
  );
}

function LegalColumn() {
  return (
    <div>
      <h2 className="text-[#91776C] font-bold text-[18px]">Legal</h2>
      <div className="mt-[10px] flex flex-col gap-[5px]">
        <Link href="/privacy-policy" className={footerLinkClass}>
          Privacy Policy
        </Link>
        <Link href="/terms-and-conditions" className={footerLinkClass}>
          Terms and Conditions
        </Link>
        <Link href="/terms-of-use" className={footerLinkClass}>
          Terms of Use
        </Link>
        <Link href="/delete-account" className={footerLinkClass}>
          Delete account
        </Link>
      </div>
    </div>
  );
}

function ServicesColumn() {
  return (
    <div>
      <h2 className="text-[#91776C] font-bold text-[18px]">Services</h2>
      <div className="mt-[10px] flex flex-col gap-[5px]">
        <Link href="/pricing" className={footerLinkClass}>
          Pricing
        </Link>
        <p className={footerMutedLineClass}>Laundry</p>
        <p className={footerMutedLineClass}>Dry Cleaning</p>
        <p className={footerMutedLineClass}>Subscriptions</p>
      </div>
    </div>
  );
}

function HelpColumn() {
  return (
    <div>
      <h2 className="text-[#91776C] font-bold text-[18px]">Help</h2>
      <div className="mt-[10px] flex flex-col gap-[5px]">
        <Link href="/faq" className={footerLinkClass}>
          FAQs
        </Link>
        <Link href="/contact" className={footerLinkClass}>
          Contact
        </Link>
      </div>
    </div>
  );
}

function FooterBrandIntro() {
  return (
    <div>
      <Image
        src="/logo.png"
        alt=""
        width={112}
        height={112}
        className="mb-3 h-24 w-24 object-contain sm:h-28 sm:w-28"
      />
      <h1
        className={`text-xl font-bold cursor-pointer hover:scale-[1.05] transition-transform duration-300`}
        style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
      >
        <span className="text-brown hover:text-dark-brown transition-colors duration-300">
          Wash
        </span>
        <span className="text-brown hover:text-dark-brown transition-colors duration-300">
          {" "}
          &
        </span>{" "}
        <span className="text-orange hover:text-[#FF7700] transition-colors duration-300">
          Wow
        </span>
      </h1>
      <p className="text-[#5E5450] text-[16px]">
        Wash, dry, fold - freshness delivered
      </p>
    </div>
  );
}

export default function Footer() {
  return (
    <FooterAnimation>
      {/* Background Div */}
      <div className="footer-main gsap-animate relative overflow-hidden bg-[#FBF6F2] py-[80px] mt-[80px] sm:py-[60px] md:py-[80px] px-[20px] opacity-0 border-t border-[#DDD2C8]">
        <FooterParticles variant="main" />
        <div className="relative z-1">
          {/* Container Div - Desktop Layout (900px+) */}
          <div className="hidden min-[900px]:flex w-full max-w-[1200px] mx-auto items-start justify-between gap-[20px]">
            {/* Left Content */}
            <div className="text-left max-w-[300px]">
              <FooterBrandIntro />

              {/* Contact Items */}
              <div className="mt-[30px] flex flex-col gap-[10px] items-start">
                <ContactItem
                  icon={<Phone />}
                  text={FOOTER_PHONE_DISPLAY}
                  href={FOOTER_PHONE_TEL}
                />
                <ContactItem
                  icon={<Mail />}
                  text={FOOTER_EMAIL}
                  href={FOOTER_EMAIL_MAILTO}
                />
                <ContactItem
                  icon={<MapPin />}
                  text={FOOTER_ADDRESS}
                  href={FOOTER_MAPS_URL}
                />
              </div>
            </div>

            {/* Right Content */}
            <div className="flex flex-wrap gap-[40px] lg:gap-[60px] text-left">
              <CompanyColumn />

              <ServicesColumn />

              <HelpColumn />

              <LegalColumn />

              <div>
                <h2 className="text-[#91776C] font-bold text-[18px]">
                  Get Our App
                </h2>

                <div className="flex flex-col gap-[10px] mt-[10px] items-start">
                  <GoogleDownloadButton />
                  <AppleDownloadButton />
                </div>
              </div>
            </div>
          </div>

          {/* Container Div - Mobile/Tablet Layout (below 900px) */}
          <div className="min-[900px]:hidden w-full max-w-[1200px] mx-auto flex flex-col gap-[56px] sm:gap-[48px]">
            {/* Row 1: Branding + Contact + Links */}
            <div className="flex flex-col sm:flex-row items-start justify-between gap-[28px] sm:gap-[20px]">
              {/* Logo and Description */}
              <div className="text-left">
                <FooterBrandIntro />
              </div>

              {/* Contact Items */}
              <div className="flex flex-col gap-[8px] items-start sm:items-end">
                <ContactItem
                  icon={<Phone />}
                  text={FOOTER_PHONE_DISPLAY}
                  href={FOOTER_PHONE_TEL}
                />
                <ContactItem
                  icon={<Mail />}
                  text={FOOTER_EMAIL}
                  href={FOOTER_EMAIL_MAILTO}
                />
                <ContactItem
                  icon={<MapPin />}
                  text={FOOTER_ADDRESS}
                  href={FOOTER_MAPS_URL}
                />
              </div>
            </div>

            {/* Row 2: Company, Services, Help, Legal */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-[12px] gap-y-[28px] sm:gap-[20px] text-left">
              <CompanyColumn />

              <ServicesColumn />

              <HelpColumn />

              <LegalColumn />
            </div>

            {/* Row 3: Download Buttons */}
            <div className="flex flex-col items-start gap-4 sm:gap-[10px]">
              <h2 className="text-[#91776C] font-bold text-[18px]">
                Get Our App
              </h2>
              <div className="flex flex-row gap-3 sm:gap-[10px]">
                <GoogleDownloadButton />
                <AppleDownloadButton />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright  */}
      <div className="footer-copyright gsap-animate relative overflow-hidden bg-[#F3EDE8] border-t border-[#DDD2C8] text-[#5E5450] px-[20px] opacity-0">
        <FooterParticles variant="copyright" />
        <div className="relative z-1 w-full max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 sm:gap-[10px] py-[20px] sm:py-[30px] text-center sm:text-left text-[16px]">
          <div className="flex flex-col gap-1 items-center sm:items-start">
            <p>© 2026 Wash and Wow. All Rights Reserved</p>
            <p className="text-[14px] opacity-80">
              CIN: U96010UW2026PTC252117 | GST No: 09AAECW4521F1ZE
            </p>
          </div>
          <p>
            <Link
              href="/privacy-policy"
              className="hover:text-orange hover:underline transition-all duration-300"
            >
              Privacy Policy
            </Link>{" "}
            |{" "}
            <Link
              href="/terms-and-conditions"
              className="hover:text-orange hover:underline transition-all duration-300"
            >
              Terms and Conditions
            </Link>{" "}
            |{" "}
            <Link
              href="/terms-of-use"
              className="hover:text-orange hover:underline transition-all duration-300"
            >
              Terms of Use
            </Link>
          </p>
        </div>
      </div>
    </FooterAnimation>
  );
}
