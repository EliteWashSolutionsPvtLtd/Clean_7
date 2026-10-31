// "use client";

// import Navbar from "@/app/components/layout/Navbar";
// import Footer from "@/app/components/sections/Footer";
// import Container from "@/app/components/layout/Container";
// import { SatoshiFont } from "@/app/fonts";

// /** Common frame for every booking page: navbar, "Our Services" band, footer. */
// export default function BookingShell({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div
//       className="min-h-screen bg-[var(--ground)] text-[var(--ink)]"
//       style={{ fontFamily: SatoshiFont.style.fontFamily }}
//     >
//       <Navbar />
//       <main className="pt-[100px] pb-[80px] md:pt-[140px]">
//         <Container isMaxWidth className="px-[clamp(20px,5vw,56px)]">
//           <header className="mx-auto mb-[36px] max-w-[700px] text-center md:mb-[52px]">
//             <h1
//               className="mb-[16px] text-[38px] leading-[1.1] text-[var(--ink)] md:text-[52px]"
//               style={{ fontFamily: "var(--font-fraunces)" }}
//             >
//               Our Services
//             </h1>
//             <div className="mx-auto mb-[20px] h-[2px] w-[40px] bg-[var(--gold)]" />
//             <p className="text-[17px] leading-[1.7] text-[var(--ink-soft)] md:text-[19px]">
//               At Clean7, we take care of the details so you can focus on what
//               matters.
//             </p>
//           </header>

//           <div className="mx-auto max-w-[1040px]">{children}</div>
//         </Container>
//       </main>
//       <Footer />
//     </div>
//   );
// }



"use client";

import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/sections/Footer";
import Container from "@/app/components/layout/Container";
import { usePathname } from "next/navigation";
import { SatoshiFont } from "@/app/fonts";

const DEFAULT_TITLE = "Our Services";
const DEFAULT_DESC =
  "At Clean7, we take care of the details so you can focus on what matters.";

/** Title + description for each page, matched by URL (a page can override both with props). */
const PAGES: { prefix: string; title: string; desc: string }[] = [
  {
    prefix: "/services/book/checkout",
    title: "Checkout",
    desc: "Confirm your address, pick a time and choose how you'd like to pay.",
  },
  {
    prefix: "/cart",
    title: "Your Cart",
    desc: "Review your selected services, change quantities and continue when you're ready.",
  },
  {
    prefix: "/my-orders",
    title: "My Orders",
    desc: "Track your bookings and see everything you've ordered with Clean7.",
  },
  {
    prefix: "/wallet",
    title: "Wallet & Vouchers",
    desc: "Add money, buy vouchers and see your wallet activity in one place.",
  },
  {
    prefix: "/order-success",
    title: "Order Confirmed",
    desc: "Thank you! Your booking is placed and we'll take it from here.",
  },
];

/** Common frame for every booking page: navbar, "Our Services" band, footer. */
export default function BookingShell({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  /** Overrides the page name taken from the URL (e.g. the category name). */
  title?: string;
  /** Overrides the description taken from the URL. */
  description?: string;
}) {
  const pathname = usePathname() ?? "";
  const page = PAGES.find((p) => pathname.startsWith(p.prefix));
  const pageTitle = title ?? page?.title ?? DEFAULT_TITLE;
  const pageDesc = description ?? page?.desc ?? DEFAULT_DESC;

  return (
    <div
      className="min-h-screen bg-[var(--ground)] text-[var(--ink)]"
      style={{ fontFamily: SatoshiFont.style.fontFamily }}
    >
      <Navbar />
      <main className="pt-[100px] pb-[80px] md:pt-[140px]">
        <Container isMaxWidth className="px-[clamp(20px,5vw,56px)]">
          <header className="mx-auto mb-[36px] max-w-[700px] text-center md:mb-[52px]">
            <h1
              className="mb-[16px] text-[38px] leading-[1.1] text-[var(--ink)] md:text-[52px]"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              {pageTitle}
            </h1>
            <div className="mx-auto mb-[20px] h-[2px] w-[40px] bg-[var(--gold)]" />
            <p className="text-[17px] leading-[1.7] text-[var(--ink-soft)] md:text-[19px]">
              {pageDesc}
            </p>
          </header>

          <div className="mx-auto max-w-[1040px]">{children}</div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}