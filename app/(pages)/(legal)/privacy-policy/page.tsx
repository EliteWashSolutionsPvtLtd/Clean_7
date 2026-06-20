import Container from "@/app/components/layout/Container";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/sections/Footer";
import { SatoshiFont, WixMadeForDisplayFont } from "@/app/fonts";
import type { Metadata } from "next";
import { canonicalPath } from "@/app/lib/site-config";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { Shield, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Wash&Wow.",
  alternates: { canonical: canonicalPath("/privacy-policy") },
  openGraph: {
    url: canonicalPath("/privacy-policy"),
    description: "Privacy Policy for Wash&Wow.",
  },
};

async function getPrivacyPolicyText() {
  const filePath = path.join(process.cwd(), "privacy-policy.txt");
  return readFile(filePath, "utf8");
}

type PolicyBlock =
  | { type: "paragraph"; text: string }
  | { type: "subheading"; text: string }
  | { type: "list"; items: string[] };

type PolicySection = {
  id: string;
  number: string;
  title: string;
  blocks: PolicyBlock[];
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function isLikelySubheading(line: string) {
  if (!line) return false;
  if (/^\d+\./.test(line)) return false;
  if (line.length > 70) return false;
  return /^[A-Z][A-Za-z0-9,&\-\/\s]+$/.test(line);
}

function parsePolicy(text: string) {
  const lines = text.split(/\r?\n/).map((line) => line.trim());
  const nonEmpty = lines.filter(Boolean);
  const documentTitle = nonEmpty[0] ?? "Privacy Policy";

  const sections: PolicySection[] = [];
  let sectionCounter = 0;
  let currentSection: PolicySection = {
    id: "overview",
    number: "0",
    title: "Overview",
    blocks: [],
  };

  let paragraphBuffer: string[] = [];
  let listBuffer: string[] = [];

  const flushParagraph = () => {
    if (!paragraphBuffer.length) return;
    currentSection.blocks.push({
      type: "paragraph",
      text: paragraphBuffer.join(" ").replace(/\s+/g, " ").trim(),
    });
    paragraphBuffer = [];
  };

  const flushList = () => {
    if (!listBuffer.length) return;
    currentSection.blocks.push({ type: "list", items: [...listBuffer] });
    listBuffer = [];
  };

  const pushCurrentSection = () => {
    flushParagraph();
    flushList();
    if (currentSection.blocks.length) sections.push(currentSection);
  };

  for (const line of lines.slice(2)) {
    if (!line || /^_+$/.test(line)) {
      flushParagraph();
      flushList();
      continue;
    }

    const sectionMatch = line.match(/^(\d+)\.\s*(.+)$/);
    if (sectionMatch) {
      pushCurrentSection();
      sectionCounter += 1;
      const sectionTitle = sectionMatch[2].trim();
      currentSection = {
        id: slugify(sectionTitle || `section-${sectionCounter}`),
        number: sectionMatch[1],
        title: sectionTitle,
        blocks: [],
      };
      continue;
    }

    const bulletMatch = line.match(/^•\s*(.+)$/);
    if (bulletMatch) {
      flushParagraph();
      listBuffer.push(bulletMatch[1].trim());
      continue;
    }

    if (isLikelySubheading(line)) {
      flushParagraph();
      flushList();
      currentSection.blocks.push({ type: "subheading", text: line });
      continue;
    }

    if (listBuffer.length) flushList();
    paragraphBuffer.push(line);
  }

  pushCurrentSection();

  return { documentTitle, sections };
}

export default async function PrivacyPolicyPage() {
  const policyText = await getPrivacyPolicyText();
  const { documentTitle, sections } = parsePolicy(policyText);

  return (
    <div style={{ fontFamily: SatoshiFont.style.fontFamily }}>
      <Navbar />


        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-[#FFFBF6] via-[#FDF9F5] to-white" />
          <Container
            isMaxWidth={true}
            className="relative mt-[70px] flex min-h-[calc(40svh-70px)] items-center justify-center px-[20px] pb-8 pt-12 md:pb-12 md:pt-16"
          >
            <div className="max-w-3xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#E8DFD6] bg-white/80 px-4 py-2 text-sm text-[#7B6F69]">
                <Shield className="h-4 w-4" />
                Official legal policy
              </div>
              <h1
                className="text-3xl font-bold text-[#33302E] sm:text-4xl md:text-5xl"
                style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
              >
                {documentTitle}
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-relaxed text-[#5E5450] sm:text-[17px]">
                Clear categories, clean structure, and readable sections for all
                privacy terms.
              </p>
            </div>
          </Container>
        </div>



        <Container isMaxWidth={true} className="px-[20px] pb-16 md:pb-24">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 flex flex-wrap gap-2">
              {sections
                .filter((section) => section.number !== "0")
                .map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="rounded-full border border-[#E2D7CD] bg-white px-3 py-1.5 text-xs font-medium text-[#6A5E58] transition hover:border-orange hover:text-orange sm:text-sm"
                  >
                    {section.number}. {section.title}
                  </a>
                ))}
            </div>

            <div className="grid gap-6">
              {sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-28 rounded-[24px] border border-[#E8DFD6]/50 bg-linear-to-br from-[#FEFEFE] to-[#F8F5F2] p-6 shadow-[6px_6px_16px_rgba(209,199,189,0.45),-6px_-6px_16px_rgba(255,255,255,0.9)] sm:rounded-[28px] sm:p-8"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-orange to-[#FF7700] text-white shadow-[0_6px_14px_rgba(255,119,0,0.28)]">
                      <Sparkles className="h-4 w-4" />
                    </span>
                    <h2
                      className="text-xl font-semibold text-[#33302E] sm:text-2xl"
                      style={{
                        fontFamily: WixMadeForDisplayFont.style.fontFamily,
                      }}
                    >
                      {section.number === "0"
                        ? section.title
                        : `${section.number}. ${section.title}`}
                    </h2>
                  </div>

                  <div className="space-y-4 text-[15px] leading-relaxed text-[#5E5450] sm:text-[16px]">
                    {section.blocks.map((block, index) => {
                      if (block.type === "subheading") {
                        return (
                          <h3
                            key={`${section.id}-sub-${index}`}
                            className="pt-2 text-[16px] font-semibold text-[#3F3936] sm:text-[17px]"
                          >
                            {block.text}
                          </h3>
                        );
                      }

                      if (block.type === "list") {
                        return (
                          <ul
                            key={`${section.id}-list-${index}`}
                            className="grid gap-2"
                          >
                            {block.items.map((item) => (
                              <li
                                key={`${section.id}-${item}`}
                                className="flex items-start gap-2 rounded-xl bg-white/85 px-4 py-3 shadow-[2px_2px_8px_rgba(209,199,189,0.3),-2px_-2px_8px_rgba(255,255,255,0.9)]"
                              >
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        );
                      }

                      return (
                        <p key={`${section.id}-p-${index}`}>{block.text}</p>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </Container>


      <Footer />
    </div>
  );
}
