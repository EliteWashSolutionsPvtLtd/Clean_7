"use client";

import { useState, useEffect } from "react";
import { ScrollTrigger } from "@/app/lib/animations";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/sections/Footer";
import Container from "@/app/components/layout/Container";
import { PageHeroAnimation } from "@/app/components/animations/PageAnimations";
import { Check, ChevronDown, Truck, Clock } from "lucide-react";

type Tab = "laundry" | "carwash" | "househelp";

const laundryCards = [
  {
    title: "Wash & Fold",
    price: "₹99",
    unit: "Per Kg",
    popular: false,
    features: [
      "Wash & Dry",
      "Folded & Packed",
      "Quality Detergents",
      "Quick Turnaround",
    ],
  },
  {
    title: "Wash & Iron",
    price: "₹49",
    unit: "Per Pc",
    popular: false,
    features: ["Wash & Iron", "Hang or Fold", "Steam Finish", "Quality Care"],
  },
  {
    title: "Premium Care",
    price: "₹149",
    unit: "Per Kg",
    popular: true,
    features: [
      "Wash, Dry & Iron",
      "Steam Finish",
      "Fabric Protection",
      "Premium Detergents",
      "Priority Processing",
    ],
  },
  {
    title: "Dry Cleaning",
    price: "₹199",
    unit: "Per Pc",
    popular: false,
    features: [
      "Professional Dry Clean",
      "Stain Removal",
      "Fabric Protection",
      "Hanger Packing",
      "Premium Care",
    ],
  },
  {
    title: "Bedding & Linen",
    price: "₹119",
    unit: "Per Kg",
    popular: false,
    features: [
      "Deep Cleaning",
      "Anti-Bacterial Wash",
      "Soft & Fresh Finish",
      "Perfectly Folded",
    ],
  },
];

const carWashCards = [
  {
    title: "Basic Wash",
    price: "₹299",
    unit: "Exterior Only",
    popular: false,
    features: [
      "Exterior Wash",
      "Shampoo Wash",
      "Tyre & Rim Cleaning",
      "Air Blower Dry",
    ],
  },
  {
    title: "Standard Wash",
    price: "₹599",
    unit: "Exterior + Interior",
    popular: false,
    features: [
      "Exterior Wash",
      "Interior Vacuuming",
      "Dashboard Cleaning",
      "Tyre Shine",
      "Glass Cleaning",
    ],
  },
  {
    title: "Premium Wash",
    price: "₹999",
    unit: "Complete Care",
    popular: true,
    features: [
      "Exterior Wash",
      "Interior Vacuuming",
      "Deep Cleaning",
      "Wax Polish",
      "Tyre Shine",
      "Glass & Dashboard Cleaning",
    ],
  },
  {
    title: "Ultimate Detailing",
    price: "₹1,499",
    unit: "Inside Out Perfection",
    popular: false,
    features: [
      "Exterior Foam Wash",
      "Interior Deep Cleaning",
      "Steam Cleaning",
      "Wax Polish",
      "Tyre & Rim Detailing",
      "Premium Finish",
    ],
  },
];

const laundryItemized = [
  {
    category: "1) Wash and Fold",
    desc: "Everyday laundry items washed, dried, and neatly folded.",
    items: [
      { name: "Shirt", price: "₹15" },
      { name: "T-Shirt", price: "₹15" },
      { name: "Jeans", price: "₹20" },
      { name: "Trouser", price: "₹20" },
      { name: "Chinos", price: "₹20" },
      { name: "Shorts", price: "₹15" },
      { name: "Trackpants", price: "₹20" },
      { name: "Kurta", price: "₹20" },
      { name: "Kurti", price: "₹20" },
      { name: "Leggings", price: "₹15" },
      { name: "Night Suit", price: "₹30" },
      { name: "Hoodie", price: "₹30" },
      { name: "Sweatshirt", price: "₹30" },
      { name: "School Uniform", price: "₹30" },
      { name: "Dupatta", price: "₹10" },
      { name: "Bedsheet", price: "₹40" },
      { name: "Pillow Cover", price: "₹10" },
      { name: "Hand Towel", price: "₹10" },
      { name: "Bath Towel", price: "₹20" },
      { name: "Napkin Cloth", price: "₹5" },
      { name: "Apron", price: "₹15" },
    ],
  },
  {
    category: "2) Wash and Iron",
    desc: "Clothes professionally washed and ironed for ready-to-wear finish.",
    items: [
      { name: "Shirt", price: "₹30" },
      { name: "T-Shirt", price: "₹30" },
      { name: "Jeans", price: "₹40" },
      { name: "Trouser", price: "₹40" },
      { name: "Formal Pant", price: "₹40" },
      { name: "Chinos", price: "₹40" },
      { name: "Kurta", price: "₹40" },
      { name: "Kurti", price: "₹40" },
      { name: "Saree", price: "₹100" },
      { name: "Dupatta", price: "₹20" },
      { name: "School Uniform", price: "₹50" },
      { name: "Blouse", price: "₹30" },
      { name: "Hoodie", price: "₹50" },
      { name: "Sweatshirt", price: "₹50" },
      { name: "Coat Pant", price: "₹150" },
      { name: "Bedsheet", price: "₹80" },
      { name: "Table Cloth", price: "₹40" },
    ],
  },
  {
    category: "3) Dry Cleaning",
    desc: "Premium cleaning for delicate, expensive, or occasion wear garments.",
    items: [
      { name: "Blazer", price: "₹250" },
      { name: "Suit (2 Piece)", price: "₹350" },
      { name: "Suit (3 Piece)", price: "₹450" },
      { name: "Sherwani", price: "₹800" },
      { name: "Lehenga", price: "₹800" },
      { name: "Saree", price: "₹250" },
      { name: "Silk Saree", price: "₹350" },
      { name: "Designer Saree", price: "₹450" },
      { name: "Wedding Dress", price: "₹1,200" },
      { name: "Party Gown", price: "₹600" },
      { name: "Evening Gown", price: "₹500" },
      { name: "Jacket", price: "₹300" },
      { name: "Coat", price: "₹350" },
      { name: "Woolen Coat", price: "₹400" },
      { name: "Sweater", price: "₹200" },
      { name: "Silk Dress", price: "₹300" },
      { name: "Velvet Dress", price: "₹350" },
      { name: "Tie", price: "₹50" },
      { name: "Scarf", price: "₹100" },
      { name: "Shawl", price: "₹150" },
      { name: "Wool Blanket", price: "₹350" },
      { name: "Heavy Curtain", price: "₹250" },
      { name: "Carpet", price: "₹400" },
      { name: "Rug", price: "₹300" },
    ],
  },
  {
    category: "4) Blanket Cleaning",
    desc: "Deep cleaning for heavy bedding and winter wear items.",
    items: [
      { name: "Single Blanket", price: "₹250" },
      { name: "Double Blanket", price: "₹350" },
      { name: "Comforter", price: "₹350" },
      { name: "Quilt", price: "₹350" },
      { name: "Rajai", price: "₹400" },
      { name: "Dohar", price: "₹200" },
      { name: "AC Blanket", price: "₹200" },
      { name: "Heavy Winter Blanket", price: "₹450" },
      { name: "Wool Blanket", price: "₹350" },
      { name: "Mattress Protector", price: "₹250" },
      { name: "Sleeping Bag", price: "₹300" },
    ],
  },
  {
    category: "5) Shoe Cleaning",
    desc: "Deep cleaning and care for all types of footwear.",
    items: [
      { name: "Sneakers", price: "₹250" },
      { name: "Sports Shoes", price: "₹250" },
      { name: "Running Shoes", price: "₹250" },
      { name: "Football Shoes", price: "₹300" },
      { name: "Formal Shoes", price: "₹350" },
      { name: "Leather Shoes", price: "₹400" },
      { name: "Boots", price: "₹450" },
      { name: "High Ankle Boots", price: "₹500" },
      { name: "Heels", price: "₹250" },
      { name: "Sandals", price: "₹200" },
      { name: "Slippers", price: "₹150" },
      { name: "Canvas Shoes", price: "₹250" },
      { name: "Loafers", price: "₹300" },
      { name: "Suede Shoes", price: "₹450" },
    ],
  },
  {
    category: "6) Curtain Cleaning",
    desc: "Professional curtain cleaning for home and office spaces.",
    items: [
      { name: "Window Curtain", price: "₹150" },
      { name: "Door Curtain", price: "₹200" },
      { name: "Heavy Curtain", price: "₹250" },
    ],
  },
];

const carWashItemized = [
  {
    category: "1) Exterior Wash",
    desc: "Exterior body cleaning and washing for your vehicle.",
    items: [
      { name: "Hatchback", price: "₹299" },
      { name: "Sedan", price: "₹399" },
      { name: "SUV", price: "₹499" },
    ],
    addons: [
      { name: "Tire Polish", price: "₹50" },
      { name: "Wax Coating", price: "₹200" },
      { name: "Glass Cleaning", price: "₹100" },
    ],
  },
  {
    category: "2) Interior Cleaning",
    desc: "Interior vacuuming and dashboard cleaning for your vehicle.",
    items: [
      { name: "Hatchback", price: "₹599" },
      { name: "Sedan", price: "₹699" },
      { name: "SUV", price: "₹899" },
    ],
    addons: [
      { name: "Dashboard Polish", price: "₹100" },
      { name: "Seat Shampooing", price: "₹400" },
      { name: "Odor Removal", price: "₹200" },
    ],
  },
];

const houseHelpCards = [
  {
    title: "Bathroom Cleaning",
    price: "₹499",
    unit: "Starting From",
    popular: false,
    features: [
      "Deep Stain Removal",
      "Floor Scrubbing",
      "Fixture Polishing",
      "Anti-Bacterial Finish",
    ],
  },
  {
    title: "Kitchen Cleaning",
    price: "₹1,199",
    unit: "Starting From",
    popular: false,
    features: [
      "Cabinet Cleaning",
      "Stove & Sink Deep Clean",
      "Chimney & Exhaust",
      "Grease Removal",
    ],
  },
  {
    title: "Full Home Cleaning",
    price: "₹2,499",
    unit: "Starting From",
    popular: true,
    features: [
      "All Rooms Cleaning",
      "Bathroom Deep Clean",
      "Kitchen Deep Clean",
      "Dusting & Mopping",
      "Professional Equipment",
    ],
  },
];

const houseHelpItemized = [
  {
    category: "1) Full Home Cleaning",
    desc: "Comprehensive cleaning for your entire home.",
    items: [
      { name: "1 BHK", price: "₹2,499" },
      { name: "2 BHK", price: "₹3,499" },
      { name: "3 BHK", price: "₹4,799" },
      { name: "4 BHK", price: "₹6,299" },
      { name: "Villa", price: "₹8,999 onwards" },
    ],
    addons: [
      { name: "Balcony Cleaning", price: "₹399" },
      { name: "Fridge Cleaning", price: "₹499" },
      { name: "Microwave Cleaning", price: "₹199" },
      { name: "Cabinet Cleaning", price: "₹699" },
      { name: "Deep Floor Scrubbing", price: "₹899" },
      { name: "Sofa Vacuuming", price: "₹499" },
    ],
  },
  {
    category: "2) Bathroom Cleaning",
    desc: "Deep cleaning and sanitization for bathrooms.",
    items: [
      { name: "1 Bathroom", price: "₹499" },
      { name: "2 Bathrooms", price: "₹899" },
      { name: "3 Bathrooms", price: "₹1,299" },
      { name: "4 Bathrooms", price: "₹1,699" },
    ],
    addons: [
      { name: "Hard Water Stain Removal", price: "₹249" },
      { name: "Anti-Bacterial Treatment", price: "₹199" },
      { name: "Exhaust Cleaning", price: "₹149" },
    ],
  },
  {
    category: "3) Kitchen Cleaning",
    desc: "Thorough cleaning for kitchen appliances and surfaces.",
    items: [
      { name: "Standard Kitchen", price: "₹1,199" },
      { name: "Deep Kitchen Cleaning", price: "₹1,999" },
    ],
    addons: [
      { name: "Chimney Cleaning", price: "₹499" },
      { name: "Cabinet Cleaning", price: "₹599" },
      { name: "Sink Deep Cleaning", price: "₹249" },
      { name: "Refrigerator Exterior Cleaning", price: "₹199" },
    ],
  },
  {
    category: "4) Sofa Cleaning",
    desc: "Professional sofa shampooing and stain removal.",
    items: [
      { name: "3 Seater Sofa", price: "₹699" },
      { name: "5 Seater Sofa", price: "₹999" },
      { name: "7 Seater Sofa", price: "₹1,399" },
      { name: "Recliner", price: "₹499 per seat" },
    ],
    addons: [
      { name: "Steam Sanitization", price: "₹299" },
      { name: "Stain Protection", price: "₹399" },
      { name: "Pet Hair Removal", price: "₹249" },
    ],
  },
  {
    category: "5) Mattress Cleaning",
    desc: "Deep vacuuming and sanitization for mattresses.",
    items: [
      { name: "Single Mattress", price: "₹499" },
      { name: "Double Mattress", price: "₹799" },
      { name: "King Size Mattress", price: "₹999" },
    ],
    addons: [
      { name: "Anti-Bacterial Treatment", price: "₹199" },
      { name: "Dust Mite Treatment", price: "₹299" },
    ],
  },
];

interface PricingItem {
  name: string;
  price: string;
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
                      {item.price}
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
                      {addon.price}
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

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState<Tab>("laundry");

  useEffect(() => {
    // Notify ScrollTrigger and smooth scroll of dynamic layout height change
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
    return () => clearTimeout(timer);
  }, [activeTab]);

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
            <div className="page-hero-subtitle flex justify-center mb-[60px] md:mb-[80px] w-full">
              <div className="bg-[var(--card)] border border-[var(--line)] rounded-full p-[4px] md:p-[6px] flex shadow-sm w-full sm:w-auto justify-between sm:justify-start">
                <button
                  onClick={() => setActiveTab("laundry")}
                  className={`flex-1 sm:flex-none px-[12px] sm:px-[24px] md:px-[32px] py-[10px] md:py-[12px] rounded-full text-[13px] md:text-[15px] font-medium cursor-pointer transition-all duration-300 whitespace-nowrap text-center ${
                    activeTab === "laundry"
                      ? "bg-[var(--gold)]/10 text-[var(--gold-bright)]"
                      : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
                  }`}
                >
                  <span className="sm:hidden">Laundry</span>
                  <span className="hidden sm:inline">Laundry Pricing</span>
                </button>
                <button
                  onClick={() => setActiveTab("carwash")}
                  className={`flex-1 sm:flex-none px-[12px] sm:px-[24px] md:px-[32px] py-[10px] md:py-[12px] rounded-full text-[13px] md:text-[15px] font-medium cursor-pointer transition-all duration-300 whitespace-nowrap text-center ${
                    activeTab === "carwash"
                      ? "bg-[var(--gold)]/10 text-[var(--gold-bright)]"
                      : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
                  }`}
                >
                  <span className="sm:hidden">Car Wash</span>
                  <span className="hidden sm:inline">Car Wash Pricing</span>
                </button>
                <button
                  onClick={() => setActiveTab("househelp")}
                  className={`flex-1 sm:flex-none px-[12px] sm:px-[24px] md:px-[32px] py-[10px] md:py-[12px] rounded-full text-[13px] md:text-[15px] font-medium cursor-pointer transition-all duration-300 whitespace-nowrap text-center ${
                    activeTab === "househelp"
                      ? "bg-[var(--gold)]/10 text-[var(--gold-bright)]"
                      : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
                  }`}
                >
                  <span className="sm:hidden">House Help</span>
                  <span className="hidden sm:inline">House Help Pricing</span>
                </button>
              </div>
            </div>

            {/* LAUNDRY PRICING SECTION */}
            {activeTab === "laundry" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <ScrollReveal delay={0}>
                  <div className="mb-[60px]">
                    <h2
                      className="text-[28px] md:text-[36px] text-[var(--ink)] mb-[16px]"
                      style={{ fontFamily: "var(--font-fraunces)" }}
                    >
                      Laundry Pricing
                    </h2>
                    <p className="text-[15px] text-[var(--ink-soft)]">
                      Professional care for your clothes and fabrics. <br />
                      Clean, fresh, and perfectly folded.
                    </p>
                  </div>
                </ScrollReveal>

                {/* Laundry Cards Grid */}
                <div className="flex overflow-x-auto pt-8 md:pt-0 pb-8 snap-x snap-mandatory hide-scrollbar gap-5 mb-[80px] md:grid md:grid-cols-3 lg:grid-cols-5 md:overflow-visible md:pb-0 md:snap-none md:gap-6">
                  {laundryCards.map((card, idx) => (
                    <ScrollReveal
                      delay={idx * 150}
                      key={idx}
                      className="h-full w-full sm:w-auto shrink-0 snap-center"
                    >
                      <div
                        className={`min-w-[280px] md:min-w-0 h-full rounded-2xl border bg-[var(--card)] flex flex-col transition-all duration-300 hover:-translate-y-2 relative ${
                          card.popular
                            ? "border-[var(--gold)] shadow-[0_0_20px_rgba(184,137,62,0.15)]"
                            : "border-[var(--line)]"
                        }`}
                      >
                        {card.popular && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--gold)] text-[var(--ground)] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full whitespace-nowrap">
                            Most Popular
                          </div>
                        )}
                        <div className="p-[32px] text-center flex-1 flex flex-col">
                          <h3 className="text-[18px] font-medium text-[var(--gold)] mb-[16px]">
                            {card.title}
                          </h3>
                          <p className="text-[13px] text-[var(--ink-soft)] uppercase tracking-wider mb-[12px]">
                            {card.unit}
                          </p>
                          <div className="text-[42px] font-light text-[var(--ink)] mb-[32px] leading-none">
                            {card.price}
                          </div>

                          <ul className="flex-1 text-left flex flex-col gap-[12px] mb-[32px]">
                            {card.features.map((feature, fIdx) => (
                              <li
                                key={fIdx}
                                className="flex items-start gap-[12px] text-[14px] text-[var(--ink-soft)]"
                              >
                                <Check className="w-[16px] h-[16px] shrink-0 text-[var(--gold)] mt-[2px]" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>

                          <button
                            className={`w-full py-[12px] rounded-lg text-[15px] font-medium transition-colors ${
                              card.popular
                                ? "bg-[var(--gold)] text-[var(--ground)] hover:bg-[var(--gold-bright)]"
                                : "bg-transparent border border-[var(--line)] text-[var(--ink)] hover:border-[var(--gold)] hover:text-[var(--gold)]"
                            }`}
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>

                {/* Detailed Itemized Prices */}
                <div className="max-w-[900px] mx-auto">
                  <h3
                    className="text-[22px] font-medium text-[var(--ink)] mb-[24px] text-center"
                    style={{ fontFamily: "var(--font-fraunces)" }}
                  >
                    Itemized Pricing
                  </h3>
                  {laundryItemized.map((section, idx) => (
                    <ScrollReveal delay={idx * 100} key={idx}>
                      <PricingAccordion {...section} />
                    </ScrollReveal>
                  ))}
                </div>

                {/* Delivery Note */}
                <ScrollReveal delay={0}>
                  <div className="mt-[80px] bg-[var(--card)] border border-[var(--line)] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-center gap-8 text-[14px] text-[var(--ink-soft)]">
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 text-[var(--gold)]" />
                      <span>
                        Free pickup & delivery on all orders above ₹299
                      </span>
                    </div>
                    <div className="w-[1px] h-6 bg-[var(--line)] hidden md:block"></div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-[var(--gold)]" />
                      <span>Express delivery available</span>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            )}

            {/* CAR WASH PRICING SECTION */}
            {activeTab === "carwash" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <ScrollReveal delay={0}>
                  <div className="mb-[60px]">
                    <h2
                      className="text-[28px] md:text-[36px] text-[var(--ink)] mb-[16px]"
                      style={{ fontFamily: "var(--font-fraunces)" }}
                    >
                      Car Wash Pricing
                    </h2>
                    <p className="text-[15px] text-[var(--ink-soft)]">
                      Expert care for your car, inside out. <br />
                      Choose the perfect wash for your ride.
                    </p>
                  </div>
                </ScrollReveal>

                {/* Car Wash Cards Grid */}
                <div className="flex overflow-x-auto pt-8 md:pt-0 pb-8 snap-x snap-mandatory hide-scrollbar gap-5 mb-[80px] md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:pb-0 md:snap-none md:gap-6">
                  {carWashCards.map((card, idx) => (
                    <ScrollReveal
                      delay={idx * 150}
                      key={idx}
                      className="h-full w-full sm:w-auto shrink-0 snap-center"
                    >
                      <div
                        className={`min-w-[280px] md:min-w-0 h-full rounded-2xl border bg-[var(--card)] flex flex-col transition-all duration-300 hover:-translate-y-2 relative ${
                          card.popular
                            ? "border-[var(--gold)] shadow-[0_0_20px_rgba(184,137,62,0.15)]"
                            : "border-[var(--line)]"
                        }`}
                      >
                        {card.popular && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--gold)] text-[var(--ground)] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full whitespace-nowrap">
                            Most Popular
                          </div>
                        )}
                        <div className="p-[32px] text-center flex-1 flex flex-col">
                          <h3 className="text-[18px] font-medium text-[var(--gold)] mb-[16px]">
                            {card.title}
                          </h3>
                          <p className="text-[13px] text-[var(--ink-soft)] uppercase tracking-wider mb-[12px]">
                            {card.unit}
                          </p>
                          <div className="text-[42px] font-light text-[var(--ink)] mb-[32px] leading-none">
                            {card.price}
                          </div>

                          <ul className="flex-1 text-left flex flex-col gap-[12px] mb-[32px]">
                            {card.features.map((feature, fIdx) => (
                              <li
                                key={fIdx}
                                className="flex items-start gap-[12px] text-[14px] text-[var(--ink-soft)]"
                              >
                                <Check className="w-[16px] h-[16px] shrink-0 text-[var(--gold)] mt-[2px]" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>

                          <button
                            className={`w-full py-[12px] rounded-lg text-[15px] font-medium transition-colors ${
                              card.popular
                                ? "bg-[var(--gold)] text-[var(--ground)] hover:bg-[var(--gold-bright)]"
                                : "bg-transparent border border-[var(--line)] text-[var(--ink)] hover:border-[var(--gold)] hover:text-[var(--gold)]"
                            }`}
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>

                {/* Detailed Itemized Prices */}
                <div className="max-w-[900px] mx-auto">
                  <h3
                    className="text-[22px] font-medium text-[var(--ink)] mb-[24px] text-center"
                    style={{ fontFamily: "var(--font-fraunces)" }}
                  >
                    Detailed Packages
                  </h3>
                  {carWashItemized.map((section, idx) => (
                    <ScrollReveal delay={idx * 100} key={idx}>
                      <PricingAccordion {...section} />
                    </ScrollReveal>
                  ))}
                </div>

                {/* Delivery Note */}
                <ScrollReveal delay={0}>
                  <div className="mt-[80px] bg-[var(--card)] border border-[var(--line)] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-center gap-8 text-[14px] text-[var(--ink-soft)]">
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 text-[var(--gold)]" />
                      <span>Doorstep service available</span>
                    </div>
                    <div className="w-[1px] h-6 bg-[var(--line)] hidden md:block"></div>
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-[var(--gold)]" />
                      <span>Safe products. Scratch-free care.</span>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            )}

            {/* HOUSE HELP PRICING SECTION */}
            {activeTab === "househelp" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <ScrollReveal delay={0}>
                  <div className="mb-[60px]">
                    <h2
                      className="text-[28px] md:text-[36px] text-[var(--ink)] mb-[16px]"
                      style={{ fontFamily: "var(--font-fraunces)" }}
                    >
                      House Help Pricing
                    </h2>
                    <p className="text-[15px] text-[var(--ink-soft)]">
                      Professional, verified cleaners for your home. <br />
                      Enjoy a spotless living space without the hassle.
                    </p>
                  </div>
                </ScrollReveal>

                {/* House Help Cards Grid */}
                <div className="flex overflow-x-auto pt-8 md:pt-0 pb-8 snap-x snap-mandatory hide-scrollbar gap-5 mb-[80px] md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:pb-0 md:snap-none md:gap-6">
                  {houseHelpCards.map((card, idx) => (
                    <ScrollReveal
                      delay={idx * 150}
                      key={idx}
                      className="h-full w-full sm:w-auto shrink-0 snap-center"
                    >
                      <div
                        className={`min-w-[280px] md:min-w-0 h-full rounded-2xl border bg-[var(--card)] flex flex-col transition-all duration-300 hover:-translate-y-2 relative ${
                          card.popular
                            ? "border-[var(--gold)] shadow-[0_0_20px_rgba(184,137,62,0.15)]"
                            : "border-[var(--line)]"
                        }`}
                      >
                        {card.popular && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--gold)] text-[var(--ground)] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full whitespace-nowrap">
                            Most Popular
                          </div>
                        )}
                        <div className="p-[32px] text-center flex-1 flex flex-col">
                          <h3 className="text-[18px] font-medium text-[var(--gold)] mb-[16px]">
                            {card.title}
                          </h3>
                          <p className="text-[13px] text-[var(--ink-soft)] uppercase tracking-wider mb-[12px]">
                            {card.unit}
                          </p>
                          <div className="text-[42px] font-light text-[var(--ink)] mb-[32px] leading-none">
                            {card.price}
                          </div>

                          <ul className="flex-1 text-left flex flex-col gap-[12px] mb-[32px]">
                            {card.features.map((feature, fIdx) => (
                              <li
                                key={fIdx}
                                className="flex items-start gap-[12px] text-[14px] text-[var(--ink-soft)]"
                              >
                                <Check className="w-[16px] h-[16px] shrink-0 text-[var(--gold)] mt-[2px]" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>

                          <button
                            className={`w-full py-[12px] rounded-lg text-[15px] font-medium transition-colors ${
                              card.popular
                                ? "bg-[var(--gold)] text-[var(--ground)] hover:bg-[var(--gold-bright)]"
                                : "bg-transparent border border-[var(--line)] text-[var(--ink)] hover:border-[var(--gold)] hover:text-[var(--gold)]"
                            }`}
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>

                {/* Detailed Itemized Prices */}
                <div className="max-w-[900px] mx-auto">
                  <h3
                    className="text-[22px] font-medium text-[var(--ink)] mb-[24px] text-center"
                    style={{ fontFamily: "var(--font-fraunces)" }}
                  >
                    Detailed Packages
                  </h3>
                  {houseHelpItemized.map((section, idx) => (
                    <ScrollReveal delay={idx * 100} key={idx}>
                      <PricingAccordion {...section} />
                    </ScrollReveal>
                  ))}
                </div>

                {/* Delivery Note */}
                <ScrollReveal delay={0}>
                  <div className="mt-[80px] bg-[var(--card)] border border-[var(--line)] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-center gap-8 text-[14px] text-[var(--ink-soft)]">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-[var(--gold)]" />
                      <span>Flexible scheduling available</span>
                    </div>
                    <div className="w-[1px] h-6 bg-[var(--line)] hidden md:block"></div>
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-[var(--gold)]" />
                      <span>Trusted, verified professionals.</span>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            )}
          </Container>
        </PageHeroAnimation>
      </main>

      <Footer />

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
