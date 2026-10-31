// "use client";

// import { useEffect, useRef, useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import { ListOrdered, LogOut, User, Wallet } from "lucide-react";
// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { logout } from "@/redux/slices/authSlice";
// import { useGetProfileQuery } from "@/redux/api/profileApi";
// import { useLogoutMutation } from "@/redux/api/authApi";
// import { apiSlice } from "@/redux/api/apiSlice";
// import styles from "./Navbar.module.css"

// export default function ProfileMenu() {
//   const { user, isAuthenticated } = useAppSelector((s) => s.auth);
//   // Live profile data: refetches automatically after "Edit profile" saves
//   const { data: profileRes } = useGetProfileQuery(undefined, {
//     skip: !isAuthenticated,
//   });
//   const profile = profileRes?.data;
//   const displayName =
//     (typeof profile?.fullName === "string" && profile.fullName.trim()) ||
//     user?.name ||
//     "";
//   const dispatch = useAppDispatch();
//   const [logoutApi] = useLogoutMutation();
//   const router = useRouter();
//   const [open, setOpen] = useState(false);
//   const ref = useRef<HTMLDivElement>(null);

//   const label = displayName || user?.email || "Account";
//   const initial = label.trim().charAt(0).toUpperCase();

//   // Close on outside click / Escape
//   useEffect(() => {
//     if (!open) return;
//     const onClick = (e: MouseEvent) => {
//       if (ref.current && !ref.current.contains(e.target as Node)) {
//         setOpen(false);
//       }
//     };
//     const onKey = (e: KeyboardEvent) => {
//       if (e.key === "Escape") setOpen(false);
//     };
//     document.addEventListener("mousedown", onClick);
//     document.addEventListener("keydown", onKey);
//     return () => {
//       document.removeEventListener("mousedown", onClick);
//       document.removeEventListener("keydown", onKey);
//     };
//   }, [open]);

//   async function handleLogout() {
//     setOpen(false);
//     try {
//       await logoutApi().unwrap(); // POST /auth/logout
//     } catch {
//       // the local session is cleared regardless of the server response
//     }
//     dispatch(logout());
//     dispatch(apiSlice.util.resetApiState());
//     toast.success("Logged out");
//     router.replace("/");
//   }

//   return (
//     <div ref={ref} className="relative">
//       <button
//         type="button"
//         onClick={() => setOpen((o) => !o)}
//         aria-label="Profile menu"
//         aria-expanded={open}
//         aria-haspopup="menu"
//         // className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--gold)] bg-[var(--gold)] text-[16px] font-semibold text-white transition-colors hover:bg-[var(--gold-bright)]"
//         className={styles.navCta}
//       >
//         {initial}
//       </button>

//       {open && (
//         <div
//           role="menu"
//           className="absolute right-0 top-full z-[110] mt-2 w-64 rounded-2xl border border-[var(--line)] bg-[var(--card)] p-2 shadow-lg"
//         >
//           <div className="border-b border-[var(--line)] px-3 py-3">
//             <p className="truncate text-[15px] font-semibold text-[var(--ink)]">
//               {displayName || "My account"}
//             </p>
//             {user?.email && (
//               <p className="truncate text-[13px] text-[var(--ink-soft)]">
//                 {user.email}
//               </p>
//             )}
//           </div>
//           <Link
//             href="/profile"
//             role="menuitem"
//             onClick={() => setOpen(false)}
//             className="mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-[15px] font-medium text-[var(--ink)] transition-colors hover:bg-[var(--ink)]/5"
//           >
//             <User size={18} />
//             My profile
//           </Link>
//           <Link
//             href="/my-orders"
//             role="menuitem"
//             onClick={() => setOpen(false)}
//             className="mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-[15px] font-medium text-[var(--ink)] transition-colors hover:bg-[var(--ink)]/5"
//           >
//             <ListOrdered size={18} />
//             My Orders
//           </Link>
//           <Link
//             href="/wallet"
//             role="menuitem"
//             onClick={() => setOpen(false)}
//             className="mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-[15px] font-medium text-[var(--ink)] transition-colors hover:bg-[var(--ink)]/5"
//           >
//             <Wallet size={18} />
//             Wallet &amp; Vouchers
//           </Link>
//           <button
//             type="button"
//             role="menuitem"
//             onClick={handleLogout}
//             className="mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-[15px] font-medium text-red-400 transition-colors hover:bg-red-400/5"
//           >
//             <LogOut size={18} />
//             Logout
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ChevronDown, Download, ListOrdered, LogOut, User, Wallet } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/slices/authSlice";
import { useGetProfileQuery } from "@/redux/api/profileApi";
import { useLogoutMutation } from "@/redux/api/authApi";
import { useGetWalletQuery } from "@/redux/api/orderApi";
import { apiSlice } from "@/redux/api/apiSlice";
import { rupee, walletBalanceOf } from "@/app/lib/booking";
import styles from "./Navbar.module.css";

const row =
  "group flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left text-[15px] font-medium text-[var(--ink)] transition-colors hover:bg-[var(--gold)]/10";
const iconBox =
  "flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-[var(--gold)]/15 text-[var(--gold-bright)]";

export default function ProfileMenu() {
  const { user, isAuthenticated } = useAppSelector((s) => s.auth);
  const { data: profileRes } = useGetProfileQuery(undefined, {
    skip: !isAuthenticated,
  });
  const { data: walletRes } = useGetWalletQuery(undefined, {
    skip: !isAuthenticated,
  });
  const profile = profileRes?.data;
  const displayName =
    (typeof profile?.fullName === "string" && profile.fullName.trim()) ||
    user?.name ||
    "";
  const balance = walletBalanceOf(walletRes?.data);
  const dispatch = useAppDispatch();
  const [logoutApi] = useLogoutMutation();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState(false); // < 640px → bottom sheet
  const ref = useRef<HTMLDivElement>(null);

  const label = displayName || user?.email || "Account";
  const initial = label.trim().charAt(0).toUpperCase();
  const firstName = (displayName || "").trim().split(/\s+/)[0] || "Account";

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setPhone(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (phone) return; // the sheet has its own backdrop
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, phone]);

  async function handleLogout() {
    setOpen(false);
    try {
      await logoutApi().unwrap(); // POST /auth/logout
    } catch {
      /* clear the local session anyway */
    }
    dispatch(logout());
    dispatch(apiSlice.util.resetApiState());
    toast.success("Logged out");
    router.replace("/");
  }

  const close = () => setOpen(false);

  const menu = (
    <div
      role="menu"
      className={`${styles.menuPop} ${
        phone
          ? "fixed inset-x-0 bottom-0 z-[310] rounded-t-3xl border-t border-[var(--line)] bg-[var(--card)] px-4 pt-3 pb-[calc(1rem+env(safe-area-inset-bottom,0px))] shadow-2xl"
          : "absolute right-0 top-full z-[110] mt-2 w-[292px] rounded-2xl border border-[var(--line)] bg-[var(--card)] p-2 shadow-xl"
      }`}
    >
      {phone && (
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-[var(--line)]" aria-hidden="true" />
      )}

      <div className="flex items-center gap-3 px-2.5 pb-3 pt-2">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--gold)] text-[18px] font-bold text-white">
          {initial}
        </span>
        <div className="min-w-0">
          <p className="truncate text-[15px] font-semibold text-[var(--ink)]">
            {displayName || "My account"}
          </p>
          {user?.email && (
            <p className="break-all text-[12.5px] leading-snug text-[var(--ink-soft)]">
              {user.email}
            </p>
          )}
        </div>
      </div>

      <div className="mx-1 mb-2 flex items-center justify-between gap-3 rounded-xl bg-[var(--gold)]/12 px-3 py-2.5">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--gold-bright)]">
            Wallet
          </p>
          <p
            className="text-[22px] font-semibold leading-tight text-[var(--gold-bright)]"
            style={{ fontFamily: "var(--font-fraunces), serif" }}
          >
            {balance === null ? "—" : rupee(balance)}
          </p>
        </div>
        <Link
          href="/wallet"
          onClick={close}
          className="whitespace-nowrap rounded-full border border-[var(--gold)] px-3 py-1.5 text-[12.5px] font-bold text-[var(--gold-bright)] transition-colors hover:bg-[var(--gold)] hover:text-white"
        >
          Add money
        </Link>
      </div>

      <Link href="/profile" role="menuitem" onClick={close} className={row}>
        <span className={iconBox}><User size={16} /></span>
        My profile
      </Link>
      <Link href="/my-orders" role="menuitem" onClick={close} className={row}>
        <span className={iconBox}><ListOrdered size={16} /></span>
        My orders
      </Link>
      <Link href="/wallet" role="menuitem" onClick={close} className={row}>
        <span className={iconBox}><Wallet size={16} /></span>
        Wallet &amp; vouchers
      </Link>
      <Link href="/#download-app" role="menuitem" onClick={close} className={row}>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] border border-[var(--line)] text-[var(--ink-soft)]">
          <Download size={16} />
        </span>
        Get the app
      </Link>

      <div className="mx-1 my-1.5 h-px bg-[var(--line)]" />

      <button
        type="button"
        role="menuitem"
        onClick={handleLogout}
        className="group flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left text-[15px] font-medium text-red-500 transition-colors hover:bg-red-500/10"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-red-500/10">
          <LogOut size={16} />
        </span>
        Log out
      </button>
    </div>
  );

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Profile menu"
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-2 rounded-full border border-[var(--gold)] p-[3px] text-[13px] font-semibold text-[var(--ink)] transition-colors hover:bg-[var(--gold)]/10 min-[1025px]:pr-3"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--gold)] text-[14px] font-bold text-white">
          {initial}
        </span>
        <span className="hidden min-[1025px]:inline">{firstName}</span>
        <ChevronDown
          size={14}
          aria-hidden="true"
          className={`hidden text-[var(--ink-soft)] transition-transform min-[1025px]:inline ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && !phone && menu}
      {open &&
        phone &&
        createPortal(
          <>
            <div
              className="fixed inset-0 z-[300] bg-black/45"
              onClick={close}
              aria-hidden="true"
            />
            {menu}
          </>,
          document.body,
        )}
    </div>
  );
}