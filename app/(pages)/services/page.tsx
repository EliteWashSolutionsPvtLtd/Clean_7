// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import Navbar from "@/app/components/layout/Navbar";
// import Footer from "@/app/components/sections/Footer";
// import Container from "@/app/components/layout/Container";
// import DownloadAppModal from "@/app/components/ui/modals/DownloadAppModal";
// import { SatoshiFont } from "@/app/fonts";
// import { PageHeroAnimation } from "@/app/components/animations/PageAnimations";
// import {
//   SERVICE_CATEGORIES,
//   ServiceCategory,
//   getDynamicCategories,
// } from "@/app/lib/service-categories";

// const CheckCircleIcon = () => (
//   <svg
//     width="16"
//     height="16"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     className="text-[var(--gold)] shrink-0"
//   >
//     <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
//     <polyline points="22 4 12 14.01 9 11.01" />
//   </svg>
// );

// const categoryImageMap: Record<string, string> = {
//   laundry: "/images/services/laundry.png",
//   "home-cleaning": "/images/services/house-help.png",
//   "doorstep-car-wash": "/images/services/car-wash.png",
//   "door-to-door-car-wash": "/images/services/car-wash.png",
//   "pest-control": "/images/services/car-wash.png",
//   "beauty-and-wellness": "/images/services/laundry.png",
// };

// export default function ServicesPage() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [categories, setCategories] = useState<ServiceCategory[]>(SERVICE_CATEGORIES);

//   useEffect(() => {
//     getDynamicCategories()
//       .then((cats) => {
//         if (cats && cats.length > 0) setCategories(cats);
//       })
//       .catch(() => { });
//   }, []);

//   return (
//     <div
//       className="bg-[var(--ground)] min-h-screen text-[var(--ink)]"
//       style={{ fontFamily: SatoshiFont.style.fontFamily }}
//     >
//       <Navbar />

//       <PageHeroAnimation variant="split">
//         <main className="pt-[100px] md:pt-[140px] pb-[80px]">
//           <Container isMaxWidth className="px-[clamp(20px,5vw,56px)]">
//             {/* Header */}
//             <div className="text-center max-w-[700px] mx-auto mb-[60px] md:mb-[80px] gsap-animate opacity-0 page-hero-left">
//               <h1
//                 className="text-[42px] md:text-[56px] text-[var(--ink)] leading-[1.1] mb-[16px]"
//                 style={{ fontFamily: "var(--font-fraunces)" }}
//               >
//                 Our Services
//               </h1>
//               <div className="w-[40px] h-[2px] bg-[var(--gold)] mx-auto mb-[24px]"></div>
//               <p className="text-[20px] text-[var(--ink-soft)] leading-[1.7]">
//                 At Clean7, we take care of the details so you can focus on what
//                 matters.
//                 <br className="hidden sm:block" /> Premium care. Reliable
//                 service. Every time.
//               </p>
//             </div>

//             {/* Dynamic Services Grid */}
//             <div className="grid lg:grid-cols-2 gap-[30px] md:gap-[40px] mb-[60px] md:mb-[80px]">
//               {categories.map((cat, idx) => {
//                 const imageSrc = cat.webImageUrl || categoryImageMap[cat.slug] || "/images/services/laundry.png";
//                 const isRemote = imageSrc.startsWith("http");
//                 const features =
//                   cat.subServices && cat.subServices.length > 0
//                     ? cat.subServices.slice(0, 5).map((s) => s.title)
//                     : [
//                       "Professional Service",
//                       "Trained & Verified Experts",
//                       "Transparent Pricing",
//                       "Quality Guaranteed",
//                       "Doorstep Convenience",
//                     ];

//                 return (
//                   <div
//                     key={cat.slug}
//                     className="rounded-2xl border border-[var(--line)] bg-[var(--card)] overflow-hidden flex flex-col hover:border-[var(--gold)]/30 transition-colors duration-500"
//                     style={{ animationDelay: `${(idx + 1) * 0.1}s` }}
//                   >
//                     <div className="relative w-full aspect-[16/9]">
//                       <Image
//                         src={imageSrc}
//                         alt={cat.cardTitle}
//                         fill
//                         unoptimized={isRemote}
//                         className="object-cover"
//                       />
//                     </div>
//                     <div className="p-[32px] md:p-[48px] flex-1 flex flex-col">
//                       <div className="flex items-center justify-between mb-[24px]">
//                         <h2
//                           className="text-[32px] md:text-[38px] text-[var(--ink)]"
//                           style={{ fontFamily: "var(--font-fraunces)" }}
//                         >
//                           {cat.cardTitle}
//                         </h2>
//                       </div>

//                       <p className="text-[20px] text-[var(--ink-soft)] leading-[1.7] mb-[32px]">
//                         {cat.description || cat.teaser}
//                       </p>

//                       <ul className="flex flex-col gap-[16px] flex-1 mb-[32px]">
//                         {features.map((feature, fIdx) => (
//                           <li
//                             key={fIdx}
//                             className="flex items-center gap-[12px] text-[15px] text-[var(--ink-soft)]"
//                           >
//                             <CheckCircleIcon />
//                             {feature}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Bottom CTA Box */}
//             <div
//               className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-[40px] md:p-[60px] flex flex-col md:flex-row items-start md:items-center justify-between gap-[30px] gsap-animate opacity-0 page-hero-left"
//               style={{ animationDelay: "0.3s" }}
//             >
//               <div className="max-w-[400px]">
//                 <h3
//                   className="text-[32px] md:text-[38px] text-[var(--ink)] leading-[1.1] mb-[16px]"
//                   style={{ fontFamily: "var(--font-fraunces)" }}
//                 >
//                   Ready for a cleaner, easier life?
//                 </h3>
//                 <p className="text-[15px] text-[var(--ink-soft)] leading-[1.6]">
//                   Schedule a pickup in seconds and leave the rest to us.
//                 </p>
//               </div>
//               <div className="flex flex-col items-center gap-[12px] shrink-0">
//                 <button
//                   onClick={() => setIsModalOpen(true)}
//                   className="px-[32px] py-[14px] rounded bg-gradient-to-r from-[#DAB875] to-[#B58B43] text-black font-semibold text-[15px] hover:brightness-110 transition-all shadow-lg shadow-[#DAB875]/20"
//                 >
//                   Book a Pickup
//                 </button>
//                 <span className="text-[13px] text-[var(--ink-soft)] font-medium">
//                   Fast. Simple. Reliable.
//                 </span>
//               </div>
//             </div>
//           </Container>
//         </main>
//       </PageHeroAnimation>

//       <Footer />
//       <DownloadAppModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//       />
//     </div>
//   );
// }

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/sections/Footer";
import Container from "@/app/components/layout/Container";
import DownloadAppModal from "@/app/components/ui/modals/DownloadAppModal";
import { SatoshiFont } from "@/app/fonts";
import { PageHeroAnimation } from "@/app/components/animations/PageAnimations";
import { useServiceCategories } from "@/app/hooks/useServiceCategories";
import { useGetServicesQuery } from "@/redux/api/catalogApi";
import { useBookNow } from "@/app/hooks/useBookingAuth";
import ServiceCategoryCard, { type CardService } from "./ServiceCategoryCard";

const categoryImageMap: Record<string, string> = {
  laundry: "/images/services/laundry.png",
  "home-cleaning": "/images/services/house-help.png",
  "doorstep-car-wash": "/images/services/car-wash.png",
  "door-to-door-car-wash": "/images/services/car-wash.png",
  "pest-control": "/images/services/car-wash.png",
  "beauty-and-wellness": "/images/services/laundry.png",
};

export default function ServicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { categories } = useServiceCategories();
  const { bookNow, ready } = useBookNow();

  // GET /catalog/services — every service, grouped under its category
  const { data: servicesRes, isError: servicesError } = useGetServicesQuery();
  const servicesByCategory = useMemo(() => {
    const map: Record<string, CardService[]> = {};
    const list = servicesRes?.data;
    if (servicesError || !Array.isArray(list)) return map;
    [...list]
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
      .forEach((svc) => {
        const key = svc.category?.slug;
        if (!key) return;
        const prices = (svc.items ?? [])
          .map((i) => i.price)
          .filter((p) => typeof p === "number" && p >= 0);
        (map[key] ||= []).push({
          title: svc.name,
          slug: svc.slug,
          fromPrice: prices.length ? Math.min(...prices) : undefined,
          itemCount: svc.items?.length ?? 0,
        });
      });
    return map;
  }, [servicesRes, servicesError]);

  return (
    <div
      className="bg-[var(--ground)] min-h-screen text-[var(--ink)]"
      style={{ fontFamily: SatoshiFont.style.fontFamily }}
    >
      <Navbar />

      <PageHeroAnimation variant="split">
        <main className="pt-[100px] md:pt-[140px] pb-[80px]">
          <Container isMaxWidth className="px-[clamp(20px,5vw,56px)]">
            {/* Header */}
            <div className="text-center max-w-[700px] mx-auto mb-[60px] md:mb-[80px] gsap-animate opacity-0 page-hero-left">
              <h1
                className="text-[42px] md:text-[56px] text-[var(--ink)] leading-[1.1] mb-[16px]"
                style={{ fontFamily: "var(--font-fraunces)" }}
              >
                Our Services
              </h1>
              <div className="w-[40px] h-[2px] bg-[var(--gold)] mx-auto mb-[24px]"></div>
              <p className="text-[20px] text-[var(--ink-soft)] leading-[1.7]">
                At Clean7, we take care of the details so you can focus on what
                matters.
                <br className="hidden sm:block" /> Premium care. Reliable
                service. Every time.
              </p>
            </div>

            {/* Dynamic Services Grid — data from /catalog/categories + /catalog/services */}
            <div className="grid items-stretch gap-[28px] md:gap-[40px] lg:grid-cols-2 mb-[60px] md:mb-[80px]">
              {categories.map((cat, idx) => {
                const imageSrc =
                  cat.webImageUrl ||
                  categoryImageMap[cat.slug] ||
                  "/images/services/laundry.png";

                // Services from the API; falls back to the category's own list
                const apiServices = servicesByCategory[cat.slug];
                const services: CardService[] =
                  apiServices && apiServices.length > 0
                    ? apiServices
                    : (cat.subServices ?? []).map((s) => ({
                        title: s.title,
                        slug: s.slug,
                      }));

                return (
                  <ServiceCategoryCard
                    key={cat.slug}
                    index={idx}
                    title={cat.cardTitle}
                    description={cat.description || cat.teaser}
                    imageSrc={imageSrc}
                    services={services}
                    onBook={() => bookNow(cat.slug)}
                    bookDisabled={!ready}
                  />
                );
              })}
            </div>

            {/* Bottom CTA Box */}
            <div
              className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-[40px] md:p-[60px] flex flex-col md:flex-row items-start md:items-center justify-between gap-[30px] gsap-animate opacity-0 page-hero-left"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="max-w-[400px]">
                <h3
                  className="text-[32px] md:text-[38px] text-[var(--ink)] leading-[1.1] mb-[16px]"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  Ready for a cleaner, easier life?
                </h3>
                <p className="text-[15px] text-[var(--ink-soft)] leading-[1.6]">
                  Schedule a pickup in seconds and leave the rest to us.
                </p>
              </div>
              <div className="flex flex-col items-center gap-[12px] shrink-0">
                {/* <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-[32px] py-[14px] rounded bg-gradient-to-r from-[#DAB875] to-[#B58B43] text-black font-semibold text-[15px] hover:brightness-110 transition-all shadow-lg shadow-[#DAB875]/20"
                >
                  Book a Pickup
                </button> */}
                <button
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="px-[32px] py-[14px] rounded bg-gradient-to-r from-[#DAB875] to-[#B58B43] text-black font-semibold text-[15px] hover:brightness-110 transition-all shadow-lg shadow-[#DAB875]/20"
                >
                  Book a Pickup
                </button>
                <span className="text-[13px] text-[var(--ink-soft)] font-medium">
                  Fast. Simple. Reliable.
                </span>
              </div>
            </div>
          </Container>
        </main>
      </PageHeroAnimation>

      <Footer />
      <DownloadAppModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
