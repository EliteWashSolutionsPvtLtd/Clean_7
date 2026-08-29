"use client";

import { useState, useEffect, useMemo } from "react";
import { ScrollTrigger } from "@/app/lib/animations";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/sections/Footer";
import Container from "@/app/components/layout/Container";
import { PageHeroAnimation } from "@/app/components/animations/PageAnimations";
import { Check, ChevronDown, Truck, Clock, Plus, Minus, X } from "lucide-react";

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
  services?: BackendService[];
}

export interface BackendService {
  id: string;
  code: string;
  slug: string;
  name: string;
  shortDescription: string | null;
  items: PricingItem[];
  addOns?: PricingItem[];
}

interface PricingAccordionProps {
  category: string;
  desc?: string;
  items?: PricingItem[];
  addons?: PricingItem[];
  cart: Record<string, { item: PricingItem; quantity: number }>;
  onAddToCart: (item: PricingItem) => void;
  onRemoveFromCart: (item: PricingItem) => void;
}

const PricingAccordion = ({
  category,
  desc,
  items,
  addons,
  cart,
  onAddToCart,
  onRemoveFromCart,
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
                {items.map((item: PricingItem, idx: number) => {
                  const cartItem = cart[item.name];
                  return (
                    <div
                      key={idx}
                      className="flex justify-between items-center py-2 border-b border-[var(--line)] border-dashed last:border-0"
                    >
                      <span className="text-[15px] text-[var(--ink)]">
                        {item.name}
                      </span>
                      <div className="flex items-center gap-4">
                        <span className="text-[15px] font-semibold text-[var(--ink)]">
                          ₹{item.price}
                        </span>
                        {cartItem ? (
                          <div className="flex items-center gap-2 border border-[var(--line)] rounded-md p-1 bg-[var(--ground)]">
                            <button onClick={() => onRemoveFromCart(item)} className="w-5 h-5 flex items-center justify-center text-[var(--ink)] hover:text-[var(--gold)] transition-colors">
                              <Minus size={14} />
                            </button>
                            <span className="text-[12px] w-3 text-center font-medium">{cartItem.quantity}</span>
                            <button onClick={() => onAddToCart(item)} className="w-5 h-5 flex items-center justify-center text-[var(--ink)] hover:text-[var(--gold)] transition-colors">
                              <Plus size={14} />
                            </button>
                          </div>
                        ) : (
                          <button onClick={() => onAddToCart(item)} className="text-[12px] font-medium px-3 py-1 rounded-md bg-[var(--gold)]/10 text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[#ffffff] transition-colors">
                            Add
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {addons && addons.length > 0 && (
            <div className="mt-6">
              <h4 className="text-[12px] font-bold tracking-[0.1em] text-[var(--gold)] uppercase mb-3">
                Add-Ons
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                {addons.map((addon: PricingItem, idx: number) => {
                  const cartItem = cart[addon.name];
                  return (
                    <div
                      key={idx}
                      className="flex justify-between items-center py-2 border-b border-[var(--line)] border-dashed last:border-0"
                    >
                      <span className="text-[15px] text-[var(--ink)]">
                        {addon.name}
                      </span>
                      <div className="flex items-center gap-4">
                        <span className="text-[15px] font-semibold text-[var(--ink)]">
                          ₹{addon.price}
                        </span>
                        {cartItem ? (
                          <div className="flex items-center gap-2 border border-[var(--line)] rounded-md p-1 bg-[var(--ground)]">
                            <button onClick={() => onRemoveFromCart(addon)} className="w-5 h-5 flex items-center justify-center text-[var(--ink)] hover:text-[var(--gold)] transition-colors">
                              <Minus size={14} />
                            </button>
                            <span className="text-[12px] w-3 text-center font-medium">{cartItem.quantity}</span>
                            <button onClick={() => onAddToCart(addon)} className="w-5 h-5 flex items-center justify-center text-[var(--ink)] hover:text-[var(--gold)] transition-colors">
                              <Plus size={14} />
                            </button>
                          </div>
                        ) : (
                          <button onClick={() => onAddToCart(addon)} className="text-[12px] font-medium px-3 py-1 rounded-md bg-[var(--gold)]/10 text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[#ffffff] transition-colors">
                            Add
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function PricingClient({
  initialCategories,
}: {
  initialCategories: ServiceCategory[];
}) {
  const categories = useMemo(() => {
    return (initialCategories || []).sort(
      (a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)
    );
  }, [initialCategories]);

  const [activeTab, setActiveTab] = useState<string>(categories[0]?.code || "");
  const [cart, setCart] = useState<Record<string, { item: PricingItem; quantity: number }>>({});
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (item: PricingItem) => {
    setCart((prev) => {
      const existing = prev[item.name];
      return {
        ...prev,
        [item.name]: { item, quantity: existing ? existing.quantity + 1 : 1 },
      };
    });
  };

  const handleRemoveFromCart = (item: PricingItem) => {
    setCart((prev) => {
      const existing = prev[item.name];
      if (!existing) return prev;

      const next = { ...prev };
      if (existing.quantity > 1) {
        next[item.name] = { item, quantity: existing.quantity - 1 };
      } else {
        delete next[item.name];
      }
      return next;
    });
  };

  const cartItemsList = Object.values(cart);
  const totalItems = cartItemsList.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalPrice = cartItemsList.reduce((acc, curr) => acc + curr.quantity * curr.item.price, 0);

  useEffect(() => {
    if (categories.length > 0 && !activeTab) {
      setActiveTab(categories[0].code);
    }
  }, [categories, activeTab]);

  useEffect(() => {
    setCart({});
    setIsCartOpen(false);
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
    return () => clearTimeout(timer);
  }, [activeTab]);

  // Notify WhatsApp button of cart state
  useEffect(() => {
    const event = new CustomEvent("cartStateChange", {
      detail: { hasItems: totalItems > 0, isExpanded: isCartOpen },
    });
    window.dispatchEvent(event);

    return () => {
      const resetEvent = new CustomEvent("cartStateChange", {
        detail: { hasItems: false, isExpanded: false },
      });
      window.dispatchEvent(resetEvent);
    };
  }, [totalItems, isCartOpen]);

  // Derived active services for the current tab
  const activeServices = useMemo(() => {
    const cat = categories.find((c) => c.code === activeTab);
    return cat?.services || [];
  }, [categories, activeTab]);

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
                      className={`flex-1 sm:flex-none px-[12px] sm:px-[24px] md:px-[32px] py-[10px] md:py-[12px] rounded-full text-[13px] md:text-[15px] font-medium cursor-pointer transition-all duration-300 whitespace-nowrap text-center ${activeTab === cat.code
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

                            <ul className="flex-1 text-left flex flex-col gap-[12px]">
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
                        cart={cart}
                        onAddToCart={handleAddToCart}
                        onRemoveFromCart={handleRemoveFromCart}
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

      {/* Cart Bottom Modal */}
      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 pointer-events-none flex justify-center animate-in slide-in-from-bottom-10 duration-300">
          <div className="bg-[var(--card)] border border-[var(--line)] shadow-[0_10px_40px_rgba(0,0,0,0.1)] rounded-2xl p-4 sm:p-5 w-full max-w-[600px] pointer-events-auto flex flex-col transition-all duration-300 relative overflow-hidden">

            {/* Expanded Cart View */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${isCartOpen ? "max-h-[500px] opacity-100 mb-5" : "max-h-0 opacity-0 mb-0"
                }`}
            >
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-[var(--line)]">
                <h3
                  className="text-[18px] font-medium text-[var(--ink)]"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  Your Selected Items
                </h3>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors p-1 rounded-full hover:bg-[var(--ground)]"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="overflow-y-auto overscroll-contain max-h-[250px] pr-2 custom-scrollbar flex flex-col gap-3" data-lenis-prevent="true">
                {cartItemsList.map((c) => (
                  <div
                    key={c.item.name}
                    className="flex justify-between items-center p-3 rounded-xl border border-[var(--line)] bg-[var(--ground)]"
                  >
                    <div>
                      <div className="text-[14px] font-medium text-[var(--ink)] mb-1">
                        {c.item.name}
                      </div>
                      <div className="text-[13px] text-[var(--ink-soft)]">
                        ₹{c.item.price} x {c.quantity}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-[15px] font-semibold text-[var(--ink)]">
                        ₹{c.item.price * c.quantity}
                      </div>
                      <div className="flex items-center gap-2 border border-[var(--line)] rounded-lg p-1 bg-[var(--card)] shadow-sm">
                        <button
                          onClick={() => handleRemoveFromCart(c.item)}
                          className="w-6 h-6 flex items-center justify-center text-[var(--ink)] hover:text-[var(--gold)] transition-colors rounded hover:bg-[var(--ground)]"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-[13px] w-4 text-center font-medium">
                          {c.quantity}
                        </span>
                        <button
                          onClick={() => handleAddToCart(c.item)}
                          className="w-6 h-6 flex items-center justify-center text-[var(--ink)] hover:text-[var(--gold)] transition-colors rounded hover:bg-[var(--ground)]"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Bar Summary */}
            <div className="flex items-center justify-between mt-auto">
              <div className="flex flex-col">
                <span className="text-[12px] text-[var(--ink-soft)] uppercase tracking-[0.05em] font-medium mb-0.5">
                  {totalItems} Item{totalItems > 1 ? "s" : ""}
                </span>
                <span className="text-[22px] font-semibold text-[var(--ink)] leading-none">
                  ₹{totalPrice}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className="px-4 py-2.5 rounded-xl text-[14px] font-medium transition-colors bg-[var(--ground)] border border-[var(--line)] text-[var(--ink)] hover:border-[var(--gold)] flex items-center gap-2"
                >
                  {isCartOpen ? "Hide Items" : "Show Items"}
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${isCartOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>
                <button className="px-6 py-2.5 rounded-xl text-[14px] font-semibold transition-all bg-[var(--gold)] text-[#ffffff] hover:bg-[var(--gold-bright)] hover:shadow-[0_4px_12px_rgba(201,160,80,0.3)] hover:-translate-y-0.5 active:translate-y-0">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
