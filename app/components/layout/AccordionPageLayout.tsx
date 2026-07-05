"use client";

import React, { useState } from "react";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/sections/Footer";
import Container from "@/app/components/layout/Container";
import { SatoshiFont, WixMadeForDisplayFont } from "@/app/fonts";
import {
  PageHeroAnimation,
  PageSectionsAnimation,
} from "@/app/components/animations/PageAnimations";
import { ChevronDown } from "lucide-react";

export type AccordionItem = {
  title: string;
  content: React.ReactNode;
};

export type AccordionPageLayoutProps = {
  title: string;
  intro: React.ReactNode;
  lastUpdated?: string;
  items: AccordionItem[];
  bottomBox: {
    title: string;
    text: React.ReactNode;
  };
};

export default function AccordionPageLayout({
  title,
  intro,
  lastUpdated,
  items,
  bottomBox,
}: AccordionPageLayoutProps) {
  return (
    <div
      className="bg-[var(--ground)] min-h-screen text-[var(--ink)]"
      style={{ fontFamily: SatoshiFont.style.fontFamily }}
    >
      <Navbar />

      <PageHeroAnimation variant="split">
        <Container
          isMaxWidth={true}
          className="mt-[70px] px-[clamp(20px,5vw,56px)] pt-16 pb-12 md:pt-24 md:pb-16"
        >
          <div className="max-w-[700px] page-hero-left gsap-animate opacity-0">
            <h1
              className="text-4xl md:text-5xl font-normal mb-6 text-[var(--ink)] tracking-tight"
              style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
            >
              {title}
            </h1>
            <div className="w-[40px] h-[1px] bg-[var(--gold)] mb-8"></div>

            <div className="text-[16px] md:text-[17px] text-[var(--ink-soft)] leading-relaxed mb-4">
              {intro}
            </div>

            {lastUpdated && (
              <p className="text-[14px] md:text-[15px] mt-6">
                <span className="text-[var(--gold)]">Last updated:</span>{" "}
                <span className="text-[var(--ink-soft)]">{lastUpdated}</span>
              </p>
            )}
          </div>
        </Container>
      </PageHeroAnimation>

      <PageSectionsAnimation>
        <Container
          isMaxWidth={true}
          className="px-[clamp(20px,5vw,56px)] pb-16 md:pb-24"
        >
          <div className="max-w-[1000px] page-section gsap-animate opacity-0">
            {/* Accordion Wrapper */}
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--card)] overflow-hidden">
              {items.map((item, index) => (
                <AccordionRow key={index} index={index + 1} item={item} />
              ))}
            </div>

            {/* Bottom Box */}
            <div className="mt-8 rounded-2xl border border-[var(--line)] bg-[var(--card)] p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-12">
              <h3
                className="text-2xl md:text-3xl font-normal text-[var(--ink)] tracking-tight"
                style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
              >
                {bottomBox.title}
              </h3>
              <div className="text-[15px] md:text-[16px] text-[var(--ink-soft)] leading-relaxed md:max-w-[450px]">
                {bottomBox.text}
              </div>
            </div>
          </div>
        </Container>
      </PageSectionsAnimation>

      <Footer />
    </div>
  );
}

function AccordionRow({ index, item }: { index: number; item: AccordionItem }) {
  const [isOpen, setIsOpen] = useState(false);
  const formattedIndex = index.toString().padStart(2, "0");

  return (
    <div className="border-b border-[var(--line)] last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 md:py-6 px-6 md:px-8 text-left transition-colors hover:bg-black/5 dark:hover:bg-white/5"
      >
        <div className="flex items-center gap-6 md:gap-8">
          <span className="text-[var(--gold)] font-medium text-[16px] md:text-[17px]">
            {formattedIndex}
          </span>
          <span className="text-[var(--ink)] text-[16px] md:text-[17px]">
            {item.title}
          </span>
        </div>
        <ChevronDown
          className={`text-[var(--gold)] shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          size={20}
        />
      </button>
      <div
        className="grid transition-all duration-300 ease-in-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="px-6 md:px-8 pb-8 pt-2 pl-[56px] md:pl-[66px] text-[15px] md:text-[16px] text-[var(--ink-soft)] leading-relaxed space-y-4">
            {item.content}
          </div>
        </div>
      </div>
    </div>
  );
}
