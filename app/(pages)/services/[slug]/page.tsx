"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/sections/Footer";
import Container from "@/app/components/layout/Container";
import { SatoshiFont } from "@/app/fonts";
import { useGetServiceBySlugQuery } from "@/redux/api/catalogApi";
import { useServiceCategories } from "@/app/hooks/useServiceCategories";

const rupee = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export default function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  // GET /catalog/services/{slug}
  const { data, isLoading, isError } = useGetServiceBySlugQuery({ slug });
  const service = isError ? undefined : data?.data;

  // Fallback: the slug may be a category (built-in data) instead of a service
  const { categories } = useServiceCategories();
  const category = categories.find((c) => c.slug === slug);

  const title = service?.name ?? category?.cardTitle;
  const description =
    service?.longDescription ||
    service?.shortDescription ||
    category?.description ||
    "";
  const items = service?.items ?? [];
  const addOns = service?.addOns ?? [];
  const bullets = !service ? (category?.subServices ?? []) : [];

  return (
    <div
      className="bg-[var(--ground)] min-h-screen text-[var(--ink)]"
      style={{ fontFamily: SatoshiFont.style.fontFamily }}
    >
      <Navbar />
      <main className="pt-[110px] md:pt-[150px] pb-[80px]">
        <Container isMaxWidth className="px-[clamp(20px,5vw,56px)]">
          <div className="mx-auto max-w-[820px]">
            <Link
              href="/services"
              className="mb-8 inline-flex items-center gap-1.5 text-[14px] font-medium text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
            >
              <ArrowLeft size={16} />
              All services
            </Link>

            {isLoading && !category ? (
              <p className="py-20 text-center text-[var(--ink-soft)]">
                Loading service…
              </p>
            ) : !title ? (
              <div className="py-20 text-center">
                <h1
                  className="text-[32px] md:text-[40px]"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  Service not found
                </h1>
                <p className="mt-3 text-[var(--ink-soft)]">
                  We couldn&apos;t find this service. Please browse our
                  services.
                </p>
              </div>
            ) : (
              <>
                <h1
                  className="text-[36px] md:text-[52px] leading-[1.1]"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  {title}
                </h1>
                <div className="my-6 h-[2px] w-[40px] bg-[var(--gold)]" />
                {description && (
                  <p className="text-[17px] md:text-[19px] leading-[1.7] text-[var(--ink-soft)]">
                    {description}
                  </p>
                )}

                {bullets.length > 0 && (
                  <ul className="mt-8 space-y-3">
                    {bullets.map((b) => (
                      <li
                        key={b.title}
                        className="flex items-start gap-3 text-[16px] text-[var(--ink-soft)]"
                      >
                        <Check
                          size={18}
                          className="mt-0.5 shrink-0 text-[var(--gold)]"
                        />
                        {b.slug ? (
                          <Link
                            href={`/services/${b.slug}`}
                            className="hover:text-[var(--gold-bright)] hover:underline underline-offset-4"
                          >
                            {b.title}
                          </Link>
                        ) : (
                          b.title
                        )}
                      </li>
                    ))}
                  </ul>
                )}

                {items.length > 0 && (
                  <section className="mt-10">
                    <h2
                      className="mb-4 text-[22px]"
                      style={{ fontFamily: "var(--font-fraunces)" }}
                    >
                      Itemized pricing
                    </h2>
                    <ul className="divide-y divide-[var(--line)] rounded-2xl border border-[var(--line)] bg-[var(--card)]">
                      {items.map((it) => (
                        <li
                          key={it.id ?? it.name}
                          className="flex items-center justify-between gap-4 px-5 py-4 text-[15px]"
                        >
                          <span>{it.name}</span>
                          <span className="font-semibold text-[var(--ink)]">
                            {rupee(it.price)}
                            {it.unitLabel ? (
                              <span className="font-normal text-[var(--ink-soft)]">
                                {" "}
                                / {it.unitLabel}
                              </span>
                            ) : null}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {addOns.length > 0 && (
                  <section className="mt-10">
                    <h2
                      className="mb-4 text-[22px]"
                      style={{ fontFamily: "var(--font-fraunces)" }}
                    >
                      Add-ons
                    </h2>
                    <ul className="divide-y divide-[var(--line)] rounded-2xl border border-[var(--line)] bg-[var(--card)]">
                      {addOns.map((it) => (
                        <li
                          key={it.id ?? it.name}
                          className="flex items-center justify-between gap-4 px-5 py-4 text-[15px]"
                        >
                          <span>{it.name}</span>
                          <span className="font-semibold text-[var(--ink)]">
                            {rupee(it.price)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                <Link
                  href="/pricing"
                  className="mt-10 inline-block rounded-full bg-[var(--gold)] px-8 py-3.5 text-[16px] font-semibold text-[#fff] shadow-lg shadow-[var(--gold)]/30 transition-colors hover:bg-[var(--gold-bright)]"
                >
                  Check pricing
                </Link>
              </>
            )}
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
