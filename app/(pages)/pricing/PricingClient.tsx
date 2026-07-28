"use client";

import { useState, useEffect, useMemo } from "react";
import { ScrollTrigger } from "@/app/lib/animations";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/sections/Footer";
import Container from "@/app/components/layout/Container";
import { PageHeroAnimation } from "@/app/components/animations/PageAnimations";
import { Check, ChevronDown, Truck, Clock } from "lucide-react";

export interface PricingItem {
  id?: string;
  name: string;
  price: number;
}

export interface ServiceCategory {
  id: string;
  code: string;
  slug: string;
  name: string;
  description: string | null;
  sortOrder?: number;
}

export interface BackendService {
  id: string;
  code: string;
  slug: string;
  name: string;
  shortDescription: string | null;
  isEnabled: boolean;
  category: ServiceCategory;
  items: PricingItem[];
  addOns?: PricingItem[];
}

interface PricingAccordionProps {
  category: string;
  desc?: string;
  items?: PricingItem[];
  addons?: PricingItem[];
}

const PricingAccordion = ({
  category,
  desc,
  items,
  addons,
}: PricingAccordionProps) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 550);
    return () => clearTimeout(timer);
  }, [isOpen]);

  return (
    <div className="border border-[var(--line)] bg-[var(--card)] rounded-xl overflow-hidden mb-4 transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left bg-transparent transition-colors hover:bg-[var(--gold)]/5"
      >
        <div>
          <h3
            className="text-[18px] md:text-[20px] font-medium text-[var(--ink)]"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            {category}
          </h3>
          {desc && (
            <p className="text-[14px] text-[var(--ink-soft)] mt-1">{desc}</p>
          )}
        </div>
        <div
          className="text-[var(--gold)] ml-4 shrink-0 transition-transform duration-300"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <ChevronDown size={20} />
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="p-5 pt-0 border-t border-[var(--line)]">
          {items && items.length > 0 && (
            <div className="mt-4">
              <h4 className="text-[12px] font-bold tracking-[0.1em] text-[var(--gold)] uppercase mb-3">
                Items
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                {items.map((item: PricingItem, idx: number) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center py-2 border-b border-[var(--line)] border-dashed last:border-0"
                  >
                    <span className="text-[15px] text-[var(--ink)]">
                      {item.name}
                    </span>
                    <span className="text-[15px] font-semibold text-[var(--ink)]">
                      ₹{item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {addons && addons.length > 0 && (
            <div className="mt-6">
              <h4 className="text-[12px] font-bold tracking-[0.1em] text-[var(--gold)] uppercase mb-3">
                Add-Ons
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                {addons.map((addon: PricingItem, idx: number) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center py-2 border-b border-[var(--line)] border-dashed last:border-0"
                  >
                    <span className="text-[15px] text-[var(--ink)]">
                      {addon.name}
                    </span>
                    <span className="text-[15px] font-semibold text-[var(--ink)]">
                      ₹{addon.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function PricingClient({
  services,
}: {
  services: BackendService[];
}) {
  // Extract categories dynamically, filtering out disabled services
  const categories = useMemo(() => {
    const map = new Map<string, ServiceCategory>();
    services.forEach((s) => {
      if (s.isEnabled && s.category) {
        map.set(s.category.code, s.category);
      }
    });
    return Array.from(map.values()).sort(
      (a, b) => (a.sortOrder || 0) - (b.sortOrder || 0),
    );
  }, [services]);

  const [activeTab, setActiveTab] = useState<string>(categories[0]?.code || "");

  useEffect(() => {
    if (categories.length > 0 && !activeTab) {
      setActiveTab(categories[0].code);
    }
  }, [categories, activeTab]);

  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
    return () => clearTimeout(timer);
  }, [activeTab]);

  // Derived active services for the current tab
  const activeServices = useMemo(() => {
    return services
      .filter((s) => s.isEnabled && s.category?.code === activeTab)
      .sort((a, b) => {
        return 0; // Use original array order or sort logic if needed
      });
  }, [services, activeTab]);

  return (
    <div className="bg-[var(--ground)] min-h-screen">
      <Navbar />

      <main className="pt-[140px] pb-[100px]">
        <PageHeroAnimation variant="centered">
          <Container isMaxWidth className="px-[clamp(20px,5vw,56px)]">
            {/* Header */}
            <div className="text-center max-w-[700px] mx-auto mb-[60px]">
              <h1
                className="page-hero-title text-[48px] md:text-[64px] text-[var(--ink)] leading-none mb-[20px]"
                style={{ fontFamily: "var(--font-fraunces)" }}
              >
                Pricing
              </h1>
              <p className="page-hero-meta text-[16px] md:text-[18px] text-[var(--ink-soft)]">
                Premium care. Transparent pricing.{" "}
                <br className="hidden md:block" />
                Choose what suits you best.
              </p>
            </div>

            {/* Tab Switcher */}
            {categories.length > 0 && (
              <div className="page-hero-subtitle flex justify-center mb-[60px] md:mb-[80px] w-full">
                <div className="bg-[var(--card)] border border-[var(--line)] rounded-full p-[4px] md:p-[6px] flex shadow-sm w-full sm:w-auto justify-between sm:justify-start overflow-x-auto hide-scrollbar">
                  {categories.map((cat) => (
                    <button
                      key={cat.code}
                      onClick={() => setActiveTab(cat.code)}
                      className={`flex-1 sm:flex-none px-[12px] sm:px-[24px] md:px-[32px] py-[10px] md:py-[12px] rounded-full text-[13px] md:text-[15px] font-medium cursor-pointer transition-all duration-300 whitespace-nowrap text-center ${
                        activeTab === cat.code
                          ? "bg-[var(--gold)]/10 text-[var(--gold-bright)]"
                          : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
                      }`}
                    >
                      <span>{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Dynamic Content Section */}
            {categories.length > 0 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <ScrollReveal delay={0}>
                  <div className="mb-[60px]">
                    <h2
                      className="text-[28px] md:text-[36px] text-[var(--ink)] mb-[16px]"
                      style={{ fontFamily: "var(--font-fraunces)" }}
                    >
                      {categories.find((c) => c.code === activeTab)?.name}{" "}
                      Pricing
                    </h2>
                    <p className="text-[15px] text-[var(--ink-soft)]">
                      {categories.find((c) => c.code === activeTab)
                        ?.description ||
                        "Professional care for your specific needs."}
                    </p>
                  </div>
                </ScrollReveal>

                {/* Cards Grid derived from services */}
                <div className="flex overflow-x-auto pt-8 md:pt-0 pb-8 snap-x snap-mandatory hide-scrollbar gap-5 mb-[80px] md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:pb-0 md:snap-none md:gap-6">
                  {activeServices.map((service, idx) => {
                    const minPrice =
                      service.items?.length > 0
                        ? Math.min(...service.items.map((i) => i.price))
                        : 0;

                    // Use item names as features, max 5
                    const features = (service.items || [])
                      .slice(0, 5)
                      .map((i) => i.name);

                    return (
                      <ScrollReveal
                        delay={idx * 150}
                        key={service.id || idx}
                        className="h-full w-full sm:w-auto shrink-0 snap-center"
                      >
                        <div
                          className={`min-w-[280px] md:min-w-0 h-full rounded-2xl border bg-[var(--card)] flex flex-col transition-all duration-300 hover:-translate-y-2 relative border-[var(--line)]`}
                        >
                          <div className="p-[32px] text-center flex-1 flex flex-col">
                            <h3 className="text-[18px] font-medium text-[var(--gold)] mb-[16px]">
                              {service.name}
                            </h3>
                            <p className="text-[13px] text-[var(--ink-soft)] uppercase tracking-wider mb-[12px]">
                              Starting From
                            </p>
                            <div className="text-[42px] font-light text-[var(--ink)] mb-[32px] leading-none">
                              ₹{minPrice}
                            </div>

                            <ul className="flex-1 text-left flex flex-col gap-[12px] mb-[32px]">
                              {features.map((feature, fIdx) => (
                                <li
                                  key={fIdx}
                                  className="flex items-start gap-[12px] text-[14px] text-[var(--ink-soft)]"
                                >
                                  <Check className="w-[16px] h-[16px] shrink-0 text-[var(--gold)] mt-[2px]" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                              {features.length === 0 &&
                                service.shortDescription && (
                                  <li className="flex items-start gap-[12px] text-[14px] text-[var(--ink-soft)]">
                                    <Check className="w-[16px] h-[16px] shrink-0 text-[var(--gold)] mt-[2px]" />
                                    <span>{service.shortDescription}</span>
                                  </li>
                                )}
                            </ul>

                            <button className="w-full py-[12px] rounded-lg text-[15px] font-medium transition-colors bg-transparent border border-[var(--line)] text-[var(--ink)] hover:border-[var(--gold)] hover:text-[var(--gold)]">
                              Book Now
                            </button>
                          </div>
                        </div>
                      </ScrollReveal>
                    );
                  })}
                </div>

                {/* Detailed Itemized Prices */}
                <div className="max-w-[900px] mx-auto">
                  <h3
                    className="text-[22px] font-medium text-[var(--ink)] mb-[24px] text-center"
                    style={{ fontFamily: "var(--font-fraunces)" }}
                  >
                    Itemized Pricing
                  </h3>
                  {activeServices.map((service, idx) => (
                    <ScrollReveal delay={idx * 100} key={service.id || idx}>
                      <PricingAccordion
                        category={service.name}
                        desc={service.shortDescription || undefined}
                        items={service.items}
                        addons={service.addOns}
                      />
                    </ScrollReveal>
                  ))}
                </div>

                {/* Delivery Note */}
                <ScrollReveal delay={0}>
                  <div className="mt-[80px] bg-[var(--card)] border border-[var(--line)] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-center gap-8 text-[14px] text-[var(--ink-soft)]">
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 text-[var(--gold)]" />
                      <span>Convenient at-home and doorstep services</span>
                    </div>
                    <div className="w-[1px] h-6 bg-[var(--line)] hidden md:block"></div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-[var(--gold)]" />
                      <span>Quality & timely care</span>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            )}

            {categories.length === 0 && (
              <div className="text-center py-20 text-[var(--ink-soft)]">
                Loading pricing information...
              </div>
            )}
          </Container>
        </PageHeroAnimation>
      </main>

      <Footer />
    </div>
  );
}
