

// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import styles from "./Navbar.module.css";
// import ThemeToggle from "../ui/ThemeToggle";
// import ProfileMenu from "./Profilemenu";
// import NavCartButton from "../cart/NavCartButton";
// import MobileAccountMenu from "./MobileAccountMenu";
// import { Download } from "lucide-react";
// import { useAppSelector } from "@/redux/hooks";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const pathname = usePathname();
//   const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
//   const hydrated = useAppSelector((s) => s.auth.hydrated);

//   // Handle scroll event for sticky navbar
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Prevent scrolling when mobile menu is open
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = "hidden";
//       document.documentElement.style.overflow = "hidden";

//       return () => {
//         document.body.style.overflow = "";
//         document.documentElement.style.overflow = "";
//       };
//     }
//   }, [isOpen]);

//   // Helper to check if a link is active
//   const isActive = (path: string) => pathname?.startsWith(path);

//   return (
//     <div
//       className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 border-b ${isScrolled ? "bg-ground/70 backdrop-blur-lg border-line shadow-sm" : "border-transparent bg-transparent"}`}
//     >
//       <nav className={`${styles.nav} ${isScrolled ? styles.navScrolled : ""}`}>
//         <div className={styles.navLeft}>
//           <Link href="/" className={styles.logoLink}>
//             <Image
//               src="/images/logo/logo.png"
//               alt="Clean7 Logo"
//               width={60}
//               height={60}
//               className={styles.logoImage}
//               priority
//             />
//             <div className={styles.brandContainer}>
//               <span className={styles.wordmark}>
//                 Clean<span className={styles.goldGradientText}>7</span>
//               </span>
//               <span className={styles.subtitle}>
//                 Premium care, delivered with elegance
//               </span>
//             </div>
//           </Link>
//         </div>

//         <ul className={styles.navLinks}>
//           <li>
//             <Link href="/" className={pathname === "/" ? styles.active : ""}>
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link
//               href="/services"
//               className={isActive("/services") ? styles.active : ""}
//             >
//               Services
//             </Link>
//           </li>
//           <li>
//             <Link
//               href="/pricing"
//               className={isActive("/pricing") ? styles.active : ""}
//               prefetch={true}
//             >
//               Pricing
//             </Link>
//           </li>
//           <li>
//             <Link
//               href="/about"
//               className={isActive("/about") ? styles.active : ""}
//             >
//               About
//             </Link>
//           </li>
//           <li>
//             <Link
//               href="/careers"
//               className={isActive("/careers") ? styles.active : ""}
//             >
//               Careers
//             </Link>
//           </li>
//           <li>
//             <Link
//               href="/blog"
//               className={isActive("/blog") ? styles.active : ""}
//             >
//               Blog
//             </Link>
//           </li>
//           <li>
//             <Link
//               href="/stores"
//               className={isActive("/stores") ? styles.active : ""}
//             >
//               Stores
//             </Link>
//           </li>
//           <li>
//             <Link
//               href="/franchise"
//               className={isActive("/franchise") ? styles.active : ""}
//             >
//               Franchise
//             </Link>
//           </li>
//         </ul>

//         <div
//           className={styles.navRight}
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: "10px",
//             zIndex: 60,
//             position: "relative",
//           }}
//         >
//           <ThemeToggle />
//           <NavCartButton />
//           {!hydrated ? (
//             <span className={styles.navSkeleton} aria-hidden="true" />
//           ) : isAuthenticated ? (
//             <ProfileMenu />
//           ) : (
//             <Link href="/login" className={styles.navCta}>
//               Login
//             </Link>
//           )}
//           <Link
//             href="/#download-app"
//             className={`${styles.navCta} ${styles.navCtaDownload}`}
//           >
//             <Download size={16} aria-hidden="true" style={{ display: "inline-block", verticalAlign: "-3px", marginRight: 8 }} />
//             Download App
//           </Link>
//           <button
//             className={styles.navToggle}
//             onClick={() => setIsOpen(true)}
//             aria-label="Open menu"
//           >
//             <svg
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="1.8"
//               strokeLinecap="round"
//             >
//               <line x1="4" y1="7" x2="20" y2="7" />
//               <line x1="4" y1="12" x2="20" y2="12" />
//               <line x1="4" y1="17" x2="20" y2="17" />
//             </svg>
//           </button>
//         </div>

//         {/* Mobile Full-Screen Menu Overlay */}
//         <div
//           className={`${styles.navMobilePanel} ${isOpen ? styles.open : ""}`}
//         >
//           <div
//             className={styles.mobileHeader}
//             style={{ justifyContent: "space-between", alignItems: "center" }}
//           >
//             <Link
//               href="/"
//               onClick={() => setIsOpen(false)}
//               className={styles.logoLink}
//               aria-label="Clean7 home"
//             >
//               <Image
//                 src="/images/logo/logo.png"
//                 alt="Clean7 Logo"
//                 width={60}
//                 height={60}
//                 className={styles.logoImage}
//               />
//               <span className={styles.wordmark}>
//                 Clean<span className={styles.goldGradientText}>7</span>
//               </span>
//             </Link>
//             <button
//               className={styles.closeButton}
//               onClick={() => setIsOpen(false)}
//               aria-label="Close menu"
//             >
//               <svg
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="1.8"
//                 strokeLinecap="round"
//               >
//                 <line x1="18" y1="6" x2="6" y2="18" />
//                 <line x1="6" y1="6" x2="18" y2="18" />
//               </svg>
//             </button>
//           </div>
//           <MobileAccountMenu onNavigate={() => setIsOpen(false)} />
//           <div className={styles.mobileLinks}>
//             <Link
//               href="/"
//               className={pathname === "/" ? styles.active : ""}
//               onClick={() => setIsOpen(false)}
//             >
//               Home
//             </Link>
//             <Link
//               href="/services"
//               className={isActive("/services") ? styles.active : ""}
//               onClick={() => setIsOpen(false)}
//             >
//               Services
//             </Link>
//             <Link
//               href="/pricing"
//               className={isActive("/pricing") ? styles.active : ""}
//               onClick={() => setIsOpen(false)}
//               prefetch={true}
//             >
//               Pricing
//             </Link>
//             <Link
//               href="/about"
//               className={isActive("/about") ? styles.active : ""}
//               onClick={() => setIsOpen(false)}
//             >
//               About
//             </Link>
//             <Link
//               href="/careers"
//               className={isActive("/careers") ? styles.active : ""}
//               onClick={() => setIsOpen(false)}
//             >
//               Careers
//             </Link>
//             <Link
//               href="/blog"
//               className={isActive("/blog") ? styles.active : ""}
//               onClick={() => setIsOpen(false)}
//             >
//               Blog
//             </Link>
//             <Link
//               href="/stores"
//               className={isActive("/stores") ? styles.active : ""}
//               onClick={() => setIsOpen(false)}
//             >
//               Stores
//             </Link>
//             <Link
//               href="/franchise"
//               className={isActive("/franchise") ? styles.active : ""}
//               onClick={() => setIsOpen(false)}
//             >
//               Franchise
//             </Link>
//           </div>
//           <div className={styles.mobileFooter}>
//             {/* Legal Links Section */}
//             <div className={styles.legalSection}>
//               <span className={styles.legalTitle}>Legal</span>
//               <Link
//                 href="/privacy-policy"
//                 className={isActive("/privacy-policy") ? styles.active : ""}
//                 onClick={() => setIsOpen(false)}
//               >
//                 Privacy Policy
//               </Link>
//               <Link
//                 href="/terms-and-conditions"
//                 className={
//                   isActive("/terms-and-conditions") ? styles.active : ""
//                 }
//                 onClick={() => setIsOpen(false)}
//               >
//                 Terms of Services
//               </Link>
//               <Link
//                 href="/terms-of-use"
//                 className={isActive("/terms-of-use") ? styles.active : ""}
//                 onClick={() => setIsOpen(false)}
//               >
//                 Terms of Use
//               </Link>
//             </div>
//             <Link
//               href="/#download-app"
//               className={styles.navCta}
//               onClick={() => setIsOpen(false)}
//             >
//               <Download size={16} aria-hidden="true" style={{ display: "inline-block", verticalAlign: "-3px", marginRight: 8 }} />
//               Download App
//             </Link>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// }


// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import styles from "./Navbar.module.css";
// import ThemeToggle from "../ui/ThemeToggle";
// import ProfileMenu from "./Profilemenu";
// import { useAppSelector } from "@/redux/hooks";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const pathname = usePathname();
//   const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
//   const hydrated = useAppSelector((s) => s.auth.hydrated);

//   // Handle scroll event for sticky navbar
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Prevent scrolling when mobile menu is open
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = "hidden";
//       document.documentElement.style.overflow = "hidden";

//       return () => {
//         document.body.style.overflow = "";
//         document.documentElement.style.overflow = "";
//       };
//     }
//   }, [isOpen]);

//   // Helper to check if a link is active
//   const isActive = (path: string) => pathname?.startsWith(path);

//   return (
//     <div
//       className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 border-b ${isScrolled ? "bg-ground/70 backdrop-blur-lg border-line shadow-sm" : "border-transparent bg-transparent"}`}
//     >
//       <nav className={`${styles.nav} ${isScrolled ? styles.navScrolled : ""}`}>
//         <div className={styles.navLeft}>
//           <Link href="/" className={styles.logoLink}>
//             <Image
//               src="/images/logo/logo.png"
//               alt="Clean7 Logo"
//               width={60}
//               height={60}
//               className={styles.logoImage}
//               priority
//             />
//             <div className={styles.brandContainer}>
//               <span className={styles.wordmark}>
//                 Clean<span className={styles.goldGradientText}>7</span>
//               </span>
//               <span className={styles.subtitle}>
//                 Premium care, delivered with elegance
//               </span>
//             </div>
//           </Link>
//         </div>

//         <ul className={styles.navLinks}>
//           <li>
//             <Link href="/" className={pathname === "/" ? styles.active : ""}>
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link
//               href="/services"
//               className={isActive("/services") ? styles.active : ""}
//             >
//               Services
//             </Link>
//           </li>
//           <li>
//             <Link
//               href="/pricing"
//               className={isActive("/pricing") ? styles.active : ""}
//               prefetch={true}
//             >
//               Pricing
//             </Link>
//           </li>
//           <li>
//             <Link
//               href="/about"
//               className={isActive("/about") ? styles.active : ""}
//             >
//               About
//             </Link>
//           </li>
//           <li>
//             <Link
//               href="/careers"
//               className={isActive("/careers") ? styles.active : ""}
//             >
//               Careers
//             </Link>
//           </li>
//           <li>
//             <Link
//               href="/blog"
//               className={isActive("/blog") ? styles.active : ""}
//             >
//               Blog
//             </Link>
//           </li>
//           <li>
//             <Link
//               href="/stores"
//               className={isActive("/stores") ? styles.active : ""}
//             >
//               Stores
//             </Link>
//           </li>
//           <li>
//             <Link
//               href="/franchise"
//               className={isActive("/franchise") ? styles.active : ""}
//             >
//               Franchise
//             </Link>
//           </li>
//         </ul>

//         <div
//           className={styles.navRight}
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: "10px",
//             zIndex: 60,
//             position: "relative",
//           }}
//         >
//           <ThemeToggle />
//           {!hydrated ? (
//             <span className={styles.navSkeleton} aria-hidden="true" />
//           ) : isAuthenticated ? (
//             <ProfileMenu />
//           ) : (
//             <Link href="/login" className={styles.navCta}>
//               Login
//             </Link>
//           )}
//           <Link href="/#download-app" className={styles.navCta}>
//             Download App
//           </Link>
//           <button
//             className={styles.navToggle}
//             onClick={() => setIsOpen(true)}
//             aria-label="Open menu"
//           >
//             <svg
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="1.8"
//               strokeLinecap="round"
//             >
//               <line x1="4" y1="7" x2="20" y2="7" />
//               <line x1="4" y1="12" x2="20" y2="12" />
//               <line x1="4" y1="17" x2="20" y2="17" />
//             </svg>
//           </button>
//         </div>

//         {/* Mobile Full-Screen Menu Overlay */}
//         <div
//           className={`${styles.navMobilePanel} ${isOpen ? styles.open : ""}`}
//         >
//           <div className={styles.mobileHeader}>
//             <button
//               className={styles.closeButton}
//               onClick={() => setIsOpen(false)}
//               aria-label="Close menu"
//             >
//               <svg
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="1.8"
//                 strokeLinecap="round"
//               >
//                 <line x1="18" y1="6" x2="6" y2="18" />
//                 <line x1="6" y1="6" x2="18" y2="18" />
//               </svg>
//             </button>
//           </div>
//           <div className={styles.mobileLinks}>
//             <Link
//               href="/"
//               className={pathname === "/" ? styles.active : ""}
//               onClick={() => setIsOpen(false)}
//             >
//               Home
//             </Link>
//             <Link
//               href="/services"
//               className={isActive("/services") ? styles.active : ""}
//               onClick={() => setIsOpen(false)}
//             >
//               Services
//             </Link>
//             <Link
//               href="/pricing"
//               className={isActive("/pricing") ? styles.active : ""}
//               onClick={() => setIsOpen(false)}
//               prefetch={true}
//             >
//               Pricing
//             </Link>
//             <Link
//               href="/about"
//               className={isActive("/about") ? styles.active : ""}
//               onClick={() => setIsOpen(false)}
//             >
//               About
//             </Link>
//             <Link
//               href="/careers"
//               className={isActive("/careers") ? styles.active : ""}
//               onClick={() => setIsOpen(false)}
//             >
//               Careers
//             </Link>
//             <Link
//               href="/blog"
//               className={isActive("/blog") ? styles.active : ""}
//               onClick={() => setIsOpen(false)}
//             >
//               Blog
//             </Link>
//             <Link
//               href="/stores"
//               className={isActive("/stores") ? styles.active : ""}
//               onClick={() => setIsOpen(false)}
//             >
//               Stores
//             </Link>
//             <Link
//               href="/franchise"
//               className={isActive("/franchise") ? styles.active : ""}
//               onClick={() => setIsOpen(false)}
//             >
//               Franchise
//             </Link>
//           </div>
//           <div className={styles.mobileFooter}>
//             {/* Legal Links Section */}
//             <div className={styles.legalSection}>
//               <span className={styles.legalTitle}>Legal</span>
//               <Link
//                 href="/privacy-policy"
//                 className={isActive("/privacy-policy") ? styles.active : ""}
//                 onClick={() => setIsOpen(false)}
//               >
//                 Privacy Policy
//               </Link>
//               <Link
//                 href="/terms-and-conditions"
//                 className={
//                   isActive("/terms-and-conditions") ? styles.active : ""
//                 }
//                 onClick={() => setIsOpen(false)}
//               >
//                 Terms of Services
//               </Link>
//               <Link
//                 href="/terms-of-use"
//                 className={isActive("/terms-of-use") ? styles.active : ""}
//                 onClick={() => setIsOpen(false)}
//               >
//                 Terms of Use
//               </Link>
//             </div>
//             <Link
//               href="/#download-app"
//               className={styles.navCta}
//               onClick={() => setIsOpen(false)}
//             >
//               Download App
//             </Link>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// }


"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";
import ThemeToggle from "../ui/ThemeToggle";
import ProfileMenu from "./Profilemenu";
import NavCartButton from "../cart/NavCartButton";
import MobileAccountMenu from "./MobileAccountMenu";
import { Download, ChevronDown, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useAppSelector } from "@/redux/hooks";

const MORE_LINKS = [
  { href: "/blog", label: "Blog" },
  { href: "/stores", label: "Stores" },
  { href: "/careers", label: "Careers" },
];

/** "More" dropdown: the less-used links, so the bar stays short. */
function MoreMenu({ pathname, showApp }: { pathname: string | null; showApp: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const active = MORE_LINKS.some((l) => pathname?.startsWith(l.href));

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <li ref={ref} className={styles.moreWrap}>
      <button
        type="button"
        className={`${styles.moreBtn} ${active ? styles.active : ""}`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        More
        <ChevronDown size={13} aria-hidden="true" className={open ? styles.flip : ""} />
      </button>
      {open && (
        <div role="menu" className={`${styles.morePanel} ${styles.menuPop}`}>
          {MORE_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              role="menuitem"
              onClick={() => setOpen(false)}
              className={pathname?.startsWith(l.href) ? styles.moreActive : ""}
            >
              {l.label}
            </Link>
          ))}
          {showApp && (
            <Link href="/#download-app" role="menuitem" onClick={() => setOpen(false)}>
              Get the app
            </Link>
          )}
        </div>
      )}
    </li>
  );
}

/** Dark / light switch inside the phone menu (the bar's toggle is hidden there). */
function ThemeRow() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const dark = resolvedTheme === "dark";
  return (
    <button
      type="button"
      className={styles.themeRow}
      onClick={() => setTheme(dark ? "light" : "dark")}
    >
      {dark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
      {dark ? "Light mode" : "Dark mode"}
    </button>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  const hydrated = useAppSelector((s) => s.auth.hydrated);

  // Handle scroll event for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
      };
    }
  }, [isOpen]);

  // Helper to check if a link is active
  const isActive = (path: string) => pathname?.startsWith(path);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 border-b ${isScrolled ? "bg-ground/70 backdrop-blur-lg border-line shadow-sm" : "border-transparent bg-transparent"}`}
    >
      <nav className={`${styles.nav} ${isScrolled ? styles.navScrolled : ""}`}>
        <div className={styles.navLeft}>
          <Link href="/" className={styles.logoLink}>
            <Image
              src="/images/logo/logo.png"
              alt="Clean7 Logo"
              width={60}
              height={60}
              className={styles.logoImage}
              priority
            />
            <div className={styles.brandContainer}>
              <span className={styles.wordmark}>
                Clean<span className={styles.goldGradientText}>7</span>
              </span>
              <span className={styles.subtitle}>
                Premium care, delivered with elegance
              </span>
            </div>
          </Link>
        </div>

        <ul className={styles.navLinks}>
          <li>
            <Link href="/" className={pathname === "/" ? styles.active : ""}>
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/services"
              className={isActive("/services") ? styles.active : ""}
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              href="/pricing"
              className={isActive("/pricing") ? styles.active : ""}
              prefetch={true}
            >
              Pricing
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={isActive("/about") ? styles.active : ""}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/franchise"
              className={isActive("/franchise") ? styles.active : ""}
            >
              Franchise
            </Link>
          </li>
          <MoreMenu pathname={pathname} showApp={!isAuthenticated} />
        </ul>

        <div
          className={styles.navRight}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            zIndex: 60,
            position: "relative",
          }}
        >
          <span className={styles.themeSlot}>
            <ThemeToggle />
          </span>
          <NavCartButton />
          {!hydrated ? (
            <span className={styles.navSkeleton} aria-hidden="true" />
          ) : isAuthenticated ? (
            <ProfileMenu />
          ) : (
            <Link href="/login" className={styles.navCta}>
              Login
            </Link>
          )}
          <button
            className={styles.navToggle}
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>
        </div>

        {/* Mobile Full-Screen Menu Overlay */}
        <div
          className={`${styles.navMobilePanel} ${isOpen ? styles.open : ""}`}
        >
          <div
            className={styles.mobileHeader}
            style={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className={styles.logoLink}
              aria-label="Clean7 home"
            >
              <Image
                src="/images/logo/logo.png"
                alt="Clean7 Logo"
                width={60}
                height={60}
                className={styles.logoImage}
              />
              <span className={styles.wordmark}>
                Clean<span className={styles.goldGradientText}>7</span>
              </span>
            </Link>
            <button
              className={styles.closeButton}
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <MobileAccountMenu onNavigate={() => setIsOpen(false)} />
          <div className={styles.mobileLinks}>
            <Link
              href="/"
              className={pathname === "/" ? styles.active : ""}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/services"
              className={isActive("/services") ? styles.active : ""}
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/pricing"
              className={isActive("/pricing") ? styles.active : ""}
              onClick={() => setIsOpen(false)}
              prefetch={true}
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className={isActive("/about") ? styles.active : ""}
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/franchise"
              className={isActive("/franchise") ? styles.active : ""}
              onClick={() => setIsOpen(false)}
            >
              Franchise
            </Link>
            <span className={styles.mobileDivider} aria-hidden="true" />
            <Link
              href="/blog"
              className={isActive("/blog") ? styles.active : ""}
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/stores"
              className={isActive("/stores") ? styles.active : ""}
              onClick={() => setIsOpen(false)}
            >
              Stores
            </Link>
            <Link
              href="/careers"
              className={isActive("/careers") ? styles.active : ""}
              onClick={() => setIsOpen(false)}
            >
              Careers
            </Link>
            <ThemeRow />
          </div>
          <div className={styles.mobileFooter}>
            {/* Legal Links Section */}
            <div className={styles.legalSection}>
              <span className={styles.legalTitle}>Legal</span>
              <Link
                href="/privacy-policy"
                className={isActive("/privacy-policy") ? styles.active : ""}
                onClick={() => setIsOpen(false)}
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-and-conditions"
                className={
                  isActive("/terms-and-conditions") ? styles.active : ""
                }
                onClick={() => setIsOpen(false)}
              >
                Terms of Services
              </Link>
              <Link
                href="/terms-of-use"
                className={isActive("/terms-of-use") ? styles.active : ""}
                onClick={() => setIsOpen(false)}
              >
                Terms of Use
              </Link>
            </div>
            <Link
              href="/#download-app"
              className={styles.navCta}
              onClick={() => setIsOpen(false)}
            >
              <Download size={16} aria-hidden="true" style={{ display: "inline-block", verticalAlign: "-3px", marginRight: 8 }} />
              Download App
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}