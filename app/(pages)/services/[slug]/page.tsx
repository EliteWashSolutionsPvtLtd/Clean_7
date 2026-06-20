import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/sections/Footer";
import Container from "@/app/components/layout/Container";
import { SatoshiFont, WixMadeForDisplayFont } from "@/app/fonts";
import {
  SERVICE_CATEGORIES,
  type ServiceCategorySlug,
  getCategoryBySlug,
} from "@/app/lib/service-categories";
import { canonicalPath } from "@/app/lib/site-config";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams(): { slug: ServiceCategorySlug }[] {
  return SERVICE_CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) return { title: "Services" };
  const path = `/services/${cat.slug}`;
  const metaBody = cat.descriptionSecondary
    ? `${cat.description} ${cat.descriptionSecondary}`
    : cat.description;
  const metaDesc =
    metaBody.length > 155 ? `${metaBody.slice(0, 152).trim()}…` : metaBody;
  return {
    title: cat.cardTitle,
    description: `${cat.heading} — ${metaDesc}`,
    alternates: { canonical: canonicalPath(path) },
    openGraph: {
      url: canonicalPath(path),
      description: cat.teaser,
    },
  };
}

export default async function ServiceCategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) notFound();

  return (
    <div
      className="overflow-x-hidden antialiased"
      style={{ fontFamily: SatoshiFont.style.fontFamily }}
    >
      <Navbar />
      <div className="pt-[60px]">
        <section className="border-b border-[#E8DFD6]/60 bg-gradient-to-b from-[#FFFBF6] to-white px-[20px] py-12 sm:py-16 md:py-20">
          <Container isMaxWidth={true} className="max-w-[800px]">
            <nav className="text-sm text-[#91776C]">
              <Link
                href="/services"
                className="transition-colors hover:text-[#FF7700]"
              >
                Services
              </Link>
              <span className="mx-2 text-[#C4B5A8]" aria-hidden>
                /
              </span>
              <span className="text-[#584E46]">{cat.cardTitle}</span>
            </nav>
            <p className="mt-6 text-4xl sm:text-5xl" aria-hidden>
              {cat.emoji}
            </p>
            <h1
              className="mt-4 text-[clamp(1.75rem,4.5vw,2.75rem)] font-semibold leading-tight text-[#33302E]"
              style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
            >
              {cat.heading}
            </h1>
            <p className="mt-5 text-[16px] leading-[1.65] text-[#423933] sm:text-[18px]">
              {cat.description}
            </p>
            {cat.descriptionSecondary ? (
              <p className="mt-4 text-[16px] leading-[1.65] text-[#423933] sm:text-[18px]">
                {cat.descriptionSecondary}
              </p>
            ) : null}
          </Container>
        </section>

        <section className="px-[20px] py-12 sm:py-16 md:py-20">
          <Container isMaxWidth={true} className="max-w-[800px]">
            <h2
              className="flex flex-wrap items-center gap-2.5"
              style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
            >
              {cat.servicesSectionEmoji ? (
                <span className="text-2xl sm:text-[1.75rem]" aria-hidden>
                  {cat.servicesSectionEmoji}
                </span>
              ) : null}
              <span
                className={
                  cat.servicesSectionTitle
                    ? "text-lg font-semibold text-[#33302E] sm:text-xl"
                    : "text-sm font-semibold uppercase tracking-[0.18em] text-[#FF9431]"
                }
              >
                {cat.servicesSectionTitle ?? "Sub services"}
              </span>
            </h2>
            <ul className="mt-8 flex flex-col gap-4 sm:gap-5">
              {cat.subServices.map((sub) => (
                <li
                  key={sub.title}
                  className="rounded-[20px] border border-[#E8DFD6]/60 bg-gradient-to-br from-white to-[#FDFBF9] p-5 shadow-[4px_6px_20px_rgba(209,199,189,0.18)] sm:p-6"
                >
                  <h3
                    className="flex flex-wrap items-center gap-2 text-lg font-semibold text-[#33302E] sm:text-xl"
                    style={{
                      fontFamily: WixMadeForDisplayFont.style.fontFamily,
                    }}
                  >
                    {sub.emoji ? (
                      <span className="text-2xl leading-none" aria-hidden>
                        {sub.emoji}
                      </span>
                    ) : null}
                    {sub.title}
                  </h3>
                  {sub.description ? (
                    <p className="mt-2 text-[16px] leading-[1.65] text-[#423933] sm:text-[18px]">
                      {sub.description}
                    </p>
                  ) : null}
                  {sub.bullets && sub.bullets.length > 0 ? (
                    <ul
                      className={
                        sub.description
                          ? "mt-4 space-y-2.5 border-t border-[#E8DFD6]/50 pt-4 pl-1 text-[16px] leading-[1.65] text-[#423933] sm:text-[18px]"
                          : "mt-3 space-y-2.5 pl-1 text-[16px] leading-[1.65] text-[#423933] sm:text-[18px]"
                      }
                    >
                      {sub.bullets.map((line) => (
                        <li
                          key={line}
                          className="ml-5 list-disc marker:text-[#FF9431]"
                        >
                          {line}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>

            {cat.process ? (
              <div className="mt-14">
                <h2
                  className="flex flex-wrap items-center gap-2.5"
                  style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
                >
                  {cat.process.emoji ? (
                    <span className="text-2xl sm:text-[1.75rem]" aria-hidden>
                      {cat.process.emoji}
                    </span>
                  ) : null}
                  <span className="text-lg font-semibold text-[#33302E] sm:text-xl">
                    {cat.process.heading}
                  </span>
                </h2>
                <ol className="mt-6 list-inside list-decimal space-y-2.5 text-[16px] leading-[1.65] text-[#423933] sm:text-[18px]">
                  {cat.process.steps.map((step) => (
                    <li key={step} className="marker:font-medium">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}

            <div className="mt-12 flex flex-wrap gap-4">
              <Link
                href="/services"
                className="text-sm font-semibold text-[#FF9431] underline-offset-4 transition-colors hover:text-[#FF7700] hover:underline"
              >
                ← All services
              </Link>
              <Link
                href="/"
                className="text-sm font-semibold text-[#91776C] underline-offset-4 transition-colors hover:text-[#584E46] hover:underline"
              >
                Home
              </Link>
            </div>
          </Container>
        </section>

        <Footer />
      </div>
    </div>
  );
}
