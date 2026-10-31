// // "use client";

// // import { useEffect, useRef, useState } from "react";
// // import Link from "next/link";
// // import { useRouter } from "next/navigation";
// // import { toast } from "sonner";
// // import {
// //   CalendarDays,
// //   ChevronRight,
// //   CircleHelp,
// //   FileText,
// //   Info,
// //   KeyRound,
// //   LifeBuoy,
// //   LogOut,
// //   Mail,
// //   MapPin,
// //   Phone,
// //   ScrollText,
// //   Share2,
// //   ShieldCheck,
// //   Store,
// //   type LucideIcon,
// // } from "lucide-react";

// // import Navbar from "@/app/components/layout/Navbar";
// // import Footer from "@/app/components/sections/Footer";
// // import Container from "@/app/components/layout/Container";
// // import { SatoshiFont, WixMadeForDisplayFont } from "@/app/fonts";
// // import { SITE_NAME } from "@/app/lib/site-config";
// // import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// // import { logout } from "@/redux/slices/authSlice";

// // import ProfileSkeleton from "./ProfileSkeleton";
// // import ThemeSelector from "./ThemeSelector";
// // import ManageAddressModal from "./ManageAddressModal";
// // import ChangePasswordModal from "./ChangePasswordModal";
// // import DeleteAccountModal from "./DeleteAccountModal";

// // /* ---------- helpers ---------- */

// // const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

// // function formatMemberSince(value: string) {
// //   if (!value) return "";
// //   const d = new Date(value);
// //   if (Number.isNaN(d.getTime())) return "";
// //   return d.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
// // }

// // /* ---------- small building blocks ---------- */

// // const cardClass =
// //   "overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--card)]";
// // const rowClass =
// //   "flex w-full items-center gap-4 px-5 py-4 text-left hover:bg-[var(--ink)]/5";
// // const iconWrapClass =
// //   "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--gold)]/12 text-[var(--gold-bright)]";

// // function CardTitle({ children }: { children: React.ReactNode }) {
// //   return (
// //     <h2
// //       className="px-5 pb-2 pt-6 text-[20px] font-semibold tracking-tight text-[var(--ink)]"
// //       style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
// //     >
// //       {children}
// //     </h2>
// //   );
// // }

// // function LinkRow({
// //   href,
// //   label,
// //   Icon,
// // }: {
// //   href: string;
// //   label: string;
// //   Icon: LucideIcon;
// // }) {
// //   return (
// //     <Link href={href} className={rowClass}>
// //       <span className={iconWrapClass}>
// //         <Icon size={19} />
// //       </span>
// //       <span className="flex-1 text-[16px] font-medium text-[var(--ink)]">
// //         {label}
// //       </span>
// //       <ChevronRight size={18} className="text-[var(--ink-soft)]" />
// //     </Link>
// //   );
// // }

// // function ButtonRow({
// //   onClick,
// //   label,
// //   Icon,
// //   chevron = false,
// // }: {
// //   onClick: () => void;
// //   label: string;
// //   Icon: LucideIcon;
// //   chevron?: boolean;
// // }) {
// //   return (
// //     <button type="button" onClick={onClick} className={rowClass}>
// //       <span className={iconWrapClass}>
// //         <Icon size={19} />
// //       </span>
// //       <span className="flex-1 text-[16px] font-medium text-[var(--ink)]">
// //         {label}
// //       </span>
// //       {chevron && <ChevronRight size={18} className="text-[var(--ink-soft)]" />}
// //     </button>
// //   );
// // }

// // function Divider() {
// //   return <div className="mx-5 border-t border-[var(--line)]" />;
// // }

// // /* ---------- page ---------- */

// // export default function ProfileView() {
// //   const router = useRouter();
// //   const dispatch = useAppDispatch();
// //   const { user, isAuthenticated, hydrated } = useAppSelector((s) => s.auth);
// //   const loggingOut = useRef(false);
// //   const [addressOpen, setAddressOpen] = useState(false);
// //   const [passwordOpen, setPasswordOpen] = useState(false);
// //   const [deleteOpen, setDeleteOpen] = useState(false);

// //   // Not logged in → go to login (only after localStorage has been checked)
// //   useEffect(() => {
// //     if (hydrated && !isAuthenticated && !loggingOut.current) {
// //       router.replace("/login");
// //     }
// //   }, [hydrated, isAuthenticated, router]);

// //   useEffect(() => {
// //     window.scrollTo({ top: 0, behavior: "instant" });
// //   }, []);

// //   function handleLogout() {
// //     loggingOut.current = true;
// //     dispatch(logout());
// //     toast.success("Logged out");
// //     router.replace("/");
// //   }

// //   async function handleShare() {
// //     const url = window.location.origin;
// //     const data = {
// //       title: SITE_NAME,
// //       text: `${SITE_NAME} — laundry, dry cleaning and home care, picked up and delivered.`,
// //       url,
// //     };
// //     if (navigator.share) {
// //       try {
// //         await navigator.share(data);
// //       } catch {
// //         // user closed the share sheet
// //       }
// //       return;
// //     }
// //     try {
// //       await navigator.clipboard.writeText(url);
// //       toast.success("Link copied");
// //     } catch {
// //       toast.error("Couldn't copy the link. Please try again.");
// //     }
// //   }

// //   const ready = hydrated && isAuthenticated && !!user;

// //   const name = str(user?.name) || "My account";
// //   const email = str(user?.email);
// //   const phone = str(user?.phone) || str(user?.phoneNumber);
// //   const photo =
// //     str(user?.profileImage) ||
// //     str(user?.avatar) ||
// //     str(user?.photo) ||
// //     str(user?.image);
// //   const memberSince = formatMemberSince(
// //     str(user?.createdAt) || str(user?.memberSince),
// //   );
// //   const initial = name.charAt(0).toUpperCase();

// //   return (
// //     <div
// //       className="min-h-screen bg-[var(--ground)] text-[var(--ink)]"
// //       style={{ fontFamily: SatoshiFont.style.fontFamily }}
// //     >
// //       <Navbar />

// //       <main className="pb-16 pt-32">
// //         <Container isMaxWidth className="px-[clamp(20px,5vw,56px)]">
// //           <div className="mx-auto w-full max-w-[720px]">
// //             {!ready ? (
// //               <ProfileSkeleton />
// //             ) : (
// //               <div className="space-y-6">
// //                 {/* Card 1 — profile */}
// //                 <section
// //                   className={`${cardClass} flex items-center gap-5 p-6 sm:gap-7 sm:p-8`}
// //                 >
// //                   <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full border border-[var(--gold)] bg-[var(--gold)]/12 sm:h-28 sm:w-28">
// //                     {photo ? (
// //                       // eslint-disable-next-line @next/next/no-img-element
// //                       <img
// //                         src={photo}
// //                         alt={`${name} profile photo`}
// //                         className="h-full w-full object-cover"
// //                       />
// //                     ) : (
// //                       <div
// //                         className="flex h-full w-full items-center justify-center text-[32px] font-semibold text-[var(--gold-bright)] sm:text-[44px]"
// //                         style={{
// //                           fontFamily: WixMadeForDisplayFont.style.fontFamily,
// //                         }}
// //                       >
// //                         {initial}
// //                       </div>
// //                     )}
// //                   </div>

// //                   <div className="min-w-0 flex-1">
// //                     <h1
// //                       className="truncate text-[24px] font-semibold tracking-tight sm:text-[30px]"
// //                       style={{
// //                         fontFamily: WixMadeForDisplayFont.style.fontFamily,
// //                       }}
// //                     >
// //                       {name}
// //                     </h1>
// //                     <ul className="mt-3 space-y-2 text-[15px] text-[var(--ink-soft)]">
// //                       <li className="flex items-center gap-2.5">
// //                         <Mail size={16} className="shrink-0 text-[var(--gold)]" />
// //                         <span className="truncate">{email || "Not added"}</span>
// //                       </li>
// //                       <li className="flex items-center gap-2.5">
// //                         <Phone size={16} className="shrink-0 text-[var(--gold)]" />
// //                         <span className="truncate">{phone || "Not added"}</span>
// //                       </li>
// //                       <li className="flex items-center gap-2.5">
// //                         <CalendarDays
// //                           size={16}
// //                           className="shrink-0 text-[var(--gold)]"
// //                         />
// //                         <span className="truncate">
// //                           Member since {memberSince || "—"}
// //                         </span>
// //                       </li>
// //                     </ul>
// //                   </div>
// //                 </section>

// //                 {/* Card 2 — account settings */}
// //                 <section className={cardClass}>
// //                   <CardTitle>Account settings</CardTitle>
// //                   <div className="pb-2">
// //                     <ButtonRow
// //                       onClick={() => setAddressOpen(true)}
// //                       label="Manage address"
// //                       Icon={MapPin}
// //                       chevron
// //                     />
// //                     <Divider />
// //                     <ButtonRow
// //                       onClick={() => setPasswordOpen(true)}
// //                       label="Change password"
// //                       Icon={KeyRound}
// //                       chevron
// //                     />
// //                     <Divider />
// //                     <ButtonRow
// //                       onClick={() => setDeleteOpen(true)}
// //                       label="Account privacy"
// //                       Icon={ShieldCheck}
// //                       chevron
// //                     />
// //                     <Divider />
// //                     <ButtonRow
// //                       onClick={handleLogout}
// //                       label="Logout"
// //                       Icon={LogOut}
// //                     />
// //                   </div>
// //                 </section>

// //                 {/* Card 3 — preferences & support */}
// //                 <section className={cardClass}>
// //                   <CardTitle>Preferences &amp; support</CardTitle>
// //                   <div className="pb-2">
// //                     <ThemeSelector />
// //                     <Divider />
// //                     <LinkRow
// //                       href="/contact"
// //                       label="Help & support"
// //                       Icon={LifeBuoy}
// //                     />
// //                     <Divider />
// //                     <LinkRow href="/faq" label="FAQs" Icon={CircleHelp} />
// //                     <Divider />
// //                     <LinkRow
// //                       href="/franchise"
// //                       label="Franchise opportunities"
// //                       Icon={Store}
// //                     />
// //                     <Divider />
// //                     <LinkRow href="/about" label="About us" Icon={Info} />
// //                     <Divider />
// //                     <ButtonRow
// //                       onClick={handleShare}
// //                       label="Share website link or app"
// //                       Icon={Share2}
// //                     />
// //                     <Divider />
// //                     <LinkRow
// //                       href="/privacy-policy"
// //                       label="Privacy policy"
// //                       Icon={FileText}
// //                     />
// //                     <Divider />
// //                     <LinkRow
// //                       href="/terms-and-conditions"
// //                       label="Terms & conditions"
// //                       Icon={ScrollText}
// //                     />
// //                   </div>
// //                 </section>
// //               </div>
// //             )}
// //           </div>
// //         </Container>
// //       </main>

// //       <Footer />

// //       {addressOpen && (
// //         <ManageAddressModal onClose={() => setAddressOpen(false)} />
// //       )}
// //       {passwordOpen && (
// //         <ChangePasswordModal onClose={() => setPasswordOpen(false)} />
// //       )}
// //       {deleteOpen && (
// //         <DeleteAccountModal onClose={() => setDeleteOpen(false)} />
// //       )}
// //     </div>
// //   );
// // }


// "use client";

// import { useEffect, useRef, useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import {
//   CalendarDays,
//   ChevronRight,
//   CircleHelp,
//   FileText,
//   Info,
//   KeyRound,
//   LifeBuoy,
//   LogOut,
//   Mail,
//   MapPin,
//   Phone,
//   ScrollText,
//   Share2,
//   ShieldCheck,
//   Store,
//   UserRound,
//   type LucideIcon,
// } from "lucide-react";

// import Navbar from "@/app/components/layout/Navbar";
// import Footer from "@/app/components/sections/Footer";
// import Container from "@/app/components/layout/Container";
// import { SatoshiFont, WixMadeForDisplayFont } from "@/app/fonts";
// import { SITE_NAME } from "@/app/lib/site-config";
// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { logout, setCredentials } from "@/redux/slices/authSlice";
// import { apiSlice } from "@/redux/api/apiSlice";
// import {
//   useGetCurrentUserQuery,
//   useLogoutMutation,
// } from "@/redux/api/authApi";
// import { useGetProfileQuery } from "@/redux/api/profileApi";

// import ProfileSkeleton from "./ProfileSkeleton";
// import ThemeSelector from "./ThemeSelector";
// import ManageAddressModal from "./ManageAddressModal";
// import ChangePasswordModal from "./ChangePasswordModal";
// import DeleteAccountModal from "./DeleteAccountModal";
// import EditProfileModal from "./EditProfileModal";
// import AddPhoneModal from "./AddPhoneModal";

// /* ---------- helpers ---------- */

// const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

// function formatMemberSince(value: string) {
//   if (!value) return "";
//   const d = new Date(value);
//   if (Number.isNaN(d.getTime())) return "";
//   return d.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
// }

// /* ---------- small building blocks ---------- */

// const cardClass =
//   "overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--card)]";
// const rowClass =
//   "flex w-full items-center gap-4 px-5 py-4 text-left hover:bg-[var(--ink)]/5";
// const iconWrapClass =
//   "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--gold)]/12 text-[var(--gold-bright)]";

// function CardTitle({ children }: { children: React.ReactNode }) {
//   return (
//     <h2
//       className="px-5 pb-2 pt-6 text-[20px] font-semibold tracking-tight text-[var(--ink)]"
//       style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
//     >
//       {children}
//     </h2>
//   );
// }

// function LinkRow({
//   href,
//   label,
//   Icon,
// }: {
//   href: string;
//   label: string;
//   Icon: LucideIcon;
// }) {
//   return (
//     <Link href={href} className={rowClass}>
//       <span className={iconWrapClass}>
//         <Icon size={19} />
//       </span>
//       <span className="flex-1 text-[16px] font-medium text-[var(--ink)]">
//         {label}
//       </span>
//       <ChevronRight size={18} className="text-[var(--ink-soft)]" />
//     </Link>
//   );
// }

// function ButtonRow({
//   onClick,
//   label,
//   Icon,
//   chevron = false,
// }: {
//   onClick: () => void;
//   label: string;
//   Icon: LucideIcon;
//   chevron?: boolean;
// }) {
//   return (
//     <button type="button" onClick={onClick} className={rowClass}>
//       <span className={iconWrapClass}>
//         <Icon size={19} />
//       </span>
//       <span className="flex-1 text-[16px] font-medium text-[var(--ink)]">
//         {label}
//       </span>
//       {chevron && <ChevronRight size={18} className="text-[var(--ink-soft)]" />}
//     </button>
//   );
// }

// function Divider() {
//   return <div className="mx-5 border-t border-[var(--line)]" />;
// }

// /* ---------- page ---------- */

// export default function ProfileView() {
//   const router = useRouter();
//   const dispatch = useAppDispatch();
//   const { user, token, isAuthenticated, hydrated } = useAppSelector(
//     (s) => s.auth,
//   );
//   const loggingOut = useRef(false);
//   const [addressOpen, setAddressOpen] = useState(false);
//   const [passwordOpen, setPasswordOpen] = useState(false);
//   const [deleteOpen, setDeleteOpen] = useState(false);
//   const [editOpen, setEditOpen] = useState(false);
//   const [phoneOpen, setPhoneOpen] = useState(false);

//   // Fresh account + profile data from the API (GET /auth/me, /profiles/me)
//   const active = hydrated && isAuthenticated;
//   const [logoutApi] = useLogoutMutation();
//   const { data: meRes } = useGetCurrentUserQuery(undefined, { skip: !active });
//   const { data: profileRes } = useGetProfileQuery(undefined, { skip: !active });
//   const profile = profileRes?.data;

//   // Keep the saved session user in sync with /auth/me
//   useEffect(() => {
//     if (!meRes || !token) return;
//     const d = (meRes.data ?? meRes) as Record<string, unknown>;
//     const fresh = (d.user ?? meRes.user ?? d) as Record<string, unknown>;
//     if (fresh && typeof fresh === "object") {
//       dispatch(setCredentials({ token, user: { ...user, ...fresh } }));
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [meRes]);

//   // Not logged in → go to login (only after localStorage has been checked)
//   useEffect(() => {
//     if (hydrated && !isAuthenticated && !loggingOut.current) {
//       router.replace("/login");
//     }
//   }, [hydrated, isAuthenticated, router]);

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "instant" });
//   }, []);

//   async function handleLogout() {
//     loggingOut.current = true;
//     try {
//       await logoutApi().unwrap();
//     } catch {
//       // the local session is cleared regardless of the server response
//     }
//     dispatch(logout());
//     dispatch(apiSlice.util.resetApiState());
//     toast.success("Logged out");
//     router.replace("/");
//   }

//   async function handleShare() {
//     const url = window.location.origin;
//     const data = {
//       title: SITE_NAME,
//       text: `${SITE_NAME} — laundry, dry cleaning and home care, picked up and delivered.`,
//       url,
//     };
//     if (navigator.share) {
//       try {
//         await navigator.share(data);
//       } catch {
//         // user closed the share sheet
//       }
//       return;
//     }
//     try {
//       await navigator.clipboard.writeText(url);
//       toast.success("Link copied");
//     } catch {
//       toast.error("Couldn't copy the link. Please try again.");
//     }
//   }

//   const ready = hydrated && isAuthenticated && !!user;

//   const name = str(profile?.fullName) || str(user?.name) || "My account";
//   const email = str(user?.email);
//   const phone =
//     str(profile?.phoneNumber) || str(user?.phone) || str(user?.phoneNumber);
//   const photo =
//     str(profile?.avatarUrl) ||
//     str(user?.profileImage) ||
//     str(user?.avatar) ||
//     str(user?.photo) ||
//     str(user?.image);
//   const memberSince = formatMemberSince(
//     str(user?.createdAt) || str(user?.memberSince),
//   );
//   const initial = name.charAt(0).toUpperCase();

//   return (
//     <div
//       className="min-h-screen bg-[var(--ground)] text-[var(--ink)]"
//       style={{ fontFamily: SatoshiFont.style.fontFamily }}
//     >
//       <Navbar />

//       <main className="pb-16 pt-32">
//         <Container isMaxWidth className="px-[clamp(20px,5vw,56px)]">
//           <div className="mx-auto w-full max-w-[720px]">
//             {!ready ? (
//               <ProfileSkeleton />
//             ) : (
//               <div className="space-y-6">
//                 {/* Card 1 — profile */}
//                 <section
//                   className={`${cardClass} flex items-center gap-5 p-6 sm:gap-7 sm:p-8`}
//                 >
//                   <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full border border-[var(--gold)] bg-[var(--gold)]/12 sm:h-28 sm:w-28">
//                     {photo ? (
//                       // eslint-disable-next-line @next/next/no-img-element
//                       <img
//                         src={photo}
//                         alt={`${name} profile photo`}
//                         className="h-full w-full object-cover"
//                       />
//                     ) : (
//                       <div
//                         className="flex h-full w-full items-center justify-center text-[32px] font-semibold text-[var(--gold-bright)] sm:text-[44px]"
//                         style={{
//                           fontFamily: WixMadeForDisplayFont.style.fontFamily,
//                         }}
//                       >
//                         {initial}
//                       </div>
//                     )}
//                   </div>

//                   <div className="min-w-0 flex-1">
//                     <h1
//                       className="truncate text-[24px] font-semibold tracking-tight sm:text-[30px]"
//                       style={{
//                         fontFamily: WixMadeForDisplayFont.style.fontFamily,
//                       }}
//                     >
//                       {name}
//                     </h1>
//                     <ul className="mt-3 space-y-2 text-[15px] text-[var(--ink-soft)]">
//                       <li className="flex items-center gap-2.5">
//                         <Mail size={16} className="shrink-0 text-[var(--gold)]" />
//                         <span className="truncate">{email || "Not added"}</span>
//                       </li>
//                       <li className="flex items-center gap-2.5">
//                         <Phone size={16} className="shrink-0 text-[var(--gold)]" />
//                         <span className="truncate">{phone || "Not added"}</span>
//                         {!phone && (
//                           <button
//                             type="button"
//                             onClick={() => setPhoneOpen(true)}
//                             className="shrink-0 text-[14px] font-semibold text-[var(--gold)] underline-offset-4 hover:underline"
//                           >
//                             Add
//                           </button>
//                         )}
//                       </li>
//                       <li className="flex items-center gap-2.5">
//                         <CalendarDays
//                           size={16}
//                           className="shrink-0 text-[var(--gold)]"
//                         />
//                         <span className="truncate">
//                           Member since {memberSince || "—"}
//                         </span>
//                       </li>
//                     </ul>
//                   </div>
//                 </section>

//                 {/* Card 2 — account settings */}
//                 <section className={cardClass}>
//                   <CardTitle>Account settings</CardTitle>
//                   <div className="pb-2">
//                     <ButtonRow
//                       onClick={() => setEditOpen(true)}
//                       label="Edit profile"
//                       Icon={UserRound}
//                       chevron
//                     />
//                     <Divider />
//                     <ButtonRow
//                       onClick={() => setAddressOpen(true)}
//                       label="Manage address"
//                       Icon={MapPin}
//                       chevron
//                     />
//                     <Divider />
//                     <ButtonRow
//                       onClick={() => setPasswordOpen(true)}
//                       label="Change password"
//                       Icon={KeyRound}
//                       chevron
//                     />
//                     <Divider />
//                     <ButtonRow
//                       onClick={() => setDeleteOpen(true)}
//                       label="Account privacy"
//                       Icon={ShieldCheck}
//                       chevron
//                     />
//                     <Divider />
//                     <ButtonRow
//                       onClick={handleLogout}
//                       label="Logout"
//                       Icon={LogOut}
//                     />
//                   </div>
//                 </section>

//                 {/* Card 3 — preferences & support */}
//                 <section className={cardClass}>
//                   <CardTitle>Preferences &amp; support</CardTitle>
//                   <div className="pb-2">
//                     <ThemeSelector />
//                     <Divider />
//                     <LinkRow
//                       href="/contact"
//                       label="Help & support"
//                       Icon={LifeBuoy}
//                     />
//                     <Divider />
//                     <LinkRow href="/faq" label="FAQs" Icon={CircleHelp} />
//                     <Divider />
//                     <LinkRow
//                       href="/franchise"
//                       label="Franchise opportunities"
//                       Icon={Store}
//                     />
//                     <Divider />
//                     <LinkRow href="/about" label="About us" Icon={Info} />
//                     <Divider />
//                     <ButtonRow
//                       onClick={handleShare}
//                       label="Share website link or app"
//                       Icon={Share2}
//                     />
//                     <Divider />
//                     <LinkRow
//                       href="/privacy-policy"
//                       label="Privacy policy"
//                       Icon={FileText}
//                     />
//                     <Divider />
//                     <LinkRow
//                       href="/terms-and-conditions"
//                       label="Terms & conditions"
//                       Icon={ScrollText}
//                     />
//                   </div>
//                 </section>
//               </div>
//             )}
//           </div>
//         </Container>
//       </main>

//       <Footer />

//       {addressOpen && (
//         <ManageAddressModal onClose={() => setAddressOpen(false)} />
//       )}
//       {passwordOpen && (
//         <ChangePasswordModal onClose={() => setPasswordOpen(false)} />
//       )}
//       {editOpen && <EditProfileModal onClose={() => setEditOpen(false)} />}
//       {phoneOpen && <AddPhoneModal onClose={() => setPhoneOpen(false)} />}
//       {deleteOpen && (
//         <DeleteAccountModal onClose={() => setDeleteOpen(false)} />
//       )}
//     </div>
//   );
// }


"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Camera,
  CalendarDays,
  ChevronRight,
  CircleHelp,
  FileText,
  Info,
  KeyRound,
  LifeBuoy,
  LogOut,
  Mail,
  MapPin,
  Phone,
  ScrollText,
  Share2,
  ShieldCheck,
  Store,
  UserRound,
  type LucideIcon,
} from "lucide-react";

import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/sections/Footer";
import Container from "@/app/components/layout/Container";
import { SatoshiFont, WixMadeForDisplayFont } from "@/app/fonts";
import { SITE_NAME } from "@/app/lib/site-config";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, setCredentials } from "@/redux/slices/authSlice";
import { apiSlice } from "@/redux/api/apiSlice";
import {
  useGetCurrentUserQuery,
  useLogoutMutation,
} from "@/redux/api/authApi";
import { useGetProfileQuery } from "@/redux/api/profileApi";

import ProfileSkeleton from "./ProfileSkeleton";
import ThemeSelector from "./ThemeSelector";
import ManageAddressModal from "./ManageAddressModal";
import ChangePasswordModal from "./ChangePasswordModal";
import DeleteAccountModal from "./DeleteAccountModal";
import EditProfileModal from "./EditProfileModal";
import AddPhoneModal from "./AddPhoneModal";

/* ---------- helpers ---------- */

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

function formatMemberSince(value: string) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
}

/* ---------- small building blocks ---------- */

const cardClass =
  "overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--card)]";
const rowClass =
  "flex w-full items-center gap-4 px-5 py-4 text-left hover:bg-[var(--ink)]/5";
const iconWrapClass =
  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--gold)]/12 text-[var(--gold-bright)]";

function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="px-5 pb-2 pt-6 text-[20px] font-semibold tracking-tight text-[var(--ink)]"
      style={{ fontFamily: WixMadeForDisplayFont.style.fontFamily }}
    >
      {children}
    </h2>
  );
}

function LinkRow({
  href,
  label,
  Icon,
}: {
  href: string;
  label: string;
  Icon: LucideIcon;
}) {
  return (
    <Link href={href} className={rowClass}>
      <span className={iconWrapClass}>
        <Icon size={19} />
      </span>
      <span className="flex-1 text-[16px] font-medium text-[var(--ink)]">
        {label}
      </span>
      <ChevronRight size={18} className="text-[var(--ink-soft)]" />
    </Link>
  );
}

function ButtonRow({
  onClick,
  label,
  Icon,
  chevron = false,
}: {
  onClick: () => void;
  label: string;
  Icon: LucideIcon;
  chevron?: boolean;
}) {
  return (
    <button type="button" onClick={onClick} className={rowClass}>
      <span className={iconWrapClass}>
        <Icon size={19} />
      </span>
      <span className="flex-1 text-[16px] font-medium text-[var(--ink)]">
        {label}
      </span>
      {chevron && <ChevronRight size={18} className="text-[var(--ink-soft)]" />}
    </button>
  );
}

function Divider() {
  return <div className="mx-5 border-t border-[var(--line)]" />;
}

/* ---------- page ---------- */

export default function ProfileView() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, token, isAuthenticated, hydrated } = useAppSelector(
    (s) => s.auth,
  );
  const loggingOut = useRef(false);
  const [addressOpen, setAddressOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [failedPhoto, setFailedPhoto] = useState(""); // photo URL that failed to load
  const [phoneOpen, setPhoneOpen] = useState(false);

  // Fresh account + profile data from the API (GET /auth/me, /profiles/me)
  const active = hydrated && isAuthenticated;
  const [logoutApi] = useLogoutMutation();
  const { data: meRes } = useGetCurrentUserQuery(undefined, { skip: !active });
  const { data: profileRes } = useGetProfileQuery(undefined, { skip: !active });
  const profile = profileRes?.data;

  // Keep the saved session user in sync with /auth/me
  useEffect(() => {
    if (!meRes || !token) return;
    const d = (meRes.data ?? meRes) as Record<string, unknown>;
    const fresh = (d.user ?? meRes.user ?? d) as Record<string, unknown>;
    if (fresh && typeof fresh === "object") {
      dispatch(setCredentials({ token, user: { ...user, ...fresh } }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meRes]);

  // Not logged in → go to login (only after localStorage has been checked)
  useEffect(() => {
    if (hydrated && !isAuthenticated && !loggingOut.current) {
      router.replace("/login");
    }
  }, [hydrated, isAuthenticated, router]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  async function handleLogout() {
    loggingOut.current = true;
    try {
      await logoutApi().unwrap();
    } catch {
      // the local session is cleared regardless of the server response
    }
    dispatch(logout());
    dispatch(apiSlice.util.resetApiState());
    toast.success("Logged out");
    router.replace("/");
  }

  async function handleShare() {
    const url = window.location.origin;
    const data = {
      title: SITE_NAME,
      text: `${SITE_NAME} — laundry, dry cleaning and home care, picked up and delivered.`,
      url,
    };
    if (navigator.share) {
      try {
        await navigator.share(data);
      } catch {
        // user closed the share sheet
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied");
    } catch {
      toast.error("Couldn't copy the link. Please try again.");
    }
  }

  const ready = hydrated && isAuthenticated && !!user;

  const name = str(profile?.fullName) || str(user?.name) || "My account";
  const email = str(user?.email);
  const phone =
    str(profile?.phoneNumber) || str(user?.phone) || str(user?.phoneNumber);
  const photo =
    str(profile?.avatarUrl) ||
    str(user?.profileImage) ||
    str(user?.avatar) ||
    str(user?.photo) ||
    str(user?.image);
  const memberSince = formatMemberSince(
    str(user?.createdAt) || str(user?.memberSince),
  );
  const initial = name.charAt(0).toUpperCase();

  return (
    <div
      className="min-h-screen bg-[var(--ground)] text-[var(--ink)]"
      style={{ fontFamily: SatoshiFont.style.fontFamily }}
    >
      <Navbar />

      <main className="pb-16 pt-32">
        <Container isMaxWidth className="px-[clamp(20px,5vw,56px)]">
          <div className="mx-auto w-full max-w-[720px]">
            {!ready ? (
              <ProfileSkeleton />
            ) : (
              <div className="space-y-6">
                {/* Card 1 — profile */}
                <section
                  className={`${cardClass} flex items-center gap-5 p-6 sm:gap-7 sm:p-8`}
                >
                  <div className="relative shrink-0">
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full border border-[var(--gold)] bg-[var(--gold)]/12 sm:h-28 sm:w-28">
                      {photo && photo !== failedPhoto ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={photo}
                          alt={`${name} profile photo`}
                          onError={() => setFailedPhoto(photo)}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div
                          className="flex h-full w-full items-center justify-center text-[32px] font-semibold text-[var(--gold-bright)] sm:text-[44px]"
                          style={{
                            fontFamily: WixMadeForDisplayFont.style.fontFamily,
                          }}
                        >
                          {initial}
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditOpen(true)}
                      aria-label="Change profile photo"
                      className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-[var(--card)] bg-[var(--gold)] text-[#fff] shadow-md transition-colors hover:bg-[var(--gold-bright)] sm:h-9 sm:w-9"
                    >
                      <Camera size={16} />
                    </button>
                  </div>

                  <div className="min-w-0 flex-1">
                    <h1
                      className="truncate text-[24px] font-semibold tracking-tight sm:text-[30px]"
                      style={{
                        fontFamily: WixMadeForDisplayFont.style.fontFamily,
                      }}
                    >
                      {name}
                    </h1>
                    <ul className="mt-3 space-y-2 text-[15px] text-[var(--ink-soft)]">
                      <li className="flex items-center gap-2.5">
                        <Mail size={16} className="shrink-0 text-[var(--gold)]" />
                        <span className="truncate">{email || "Not added"}</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <Phone size={16} className="shrink-0 text-[var(--gold)]" />
                        <span className="truncate">{phone || "Not added"}</span>
                        {!phone && (
                          <button
                            type="button"
                            onClick={() => setPhoneOpen(true)}
                            className="shrink-0 text-[14px] font-semibold text-[var(--gold)] underline-offset-4 hover:underline"
                          >
                            Add
                          </button>
                        )}
                      </li>
                      <li className="flex items-center gap-2.5">
                        <CalendarDays
                          size={16}
                          className="shrink-0 text-[var(--gold)]"
                        />
                        <span className="truncate">
                          Member since {memberSince || "—"}
                        </span>
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Card 2 — account settings */}
                <section className={cardClass}>
                  <CardTitle>Account settings</CardTitle>
                  <div className="pb-2">
                    <ButtonRow
                      onClick={() => setEditOpen(true)}
                      label="Edit profile"
                      Icon={UserRound}
                      chevron
                    />
                    <Divider />
                    <ButtonRow
                      onClick={() => setAddressOpen(true)}
                      label="Manage address"
                      Icon={MapPin}
                      chevron
                    />
                    <Divider />
                    <ButtonRow
                      onClick={() => setPasswordOpen(true)}
                      label="Change password"
                      Icon={KeyRound}
                      chevron
                    />
                    <Divider />
                    <ButtonRow
                      onClick={() => setDeleteOpen(true)}
                      label="Account privacy"
                      Icon={ShieldCheck}
                      chevron
                    />
                    <Divider />
                    <ButtonRow
                      onClick={handleLogout}
                      label="Logout"
                      Icon={LogOut}
                    />
                  </div>
                </section>

                {/* Card 3 — preferences & support */}
                <section className={cardClass}>
                  <CardTitle>Preferences &amp; support</CardTitle>
                  <div className="pb-2">
                    <ThemeSelector />
                    <Divider />
                    <LinkRow
                      href="/contact"
                      label="Help & support"
                      Icon={LifeBuoy}
                    />
                    <Divider />
                    <LinkRow href="/faq" label="FAQs" Icon={CircleHelp} />
                    <Divider />
                    <LinkRow
                      href="/franchise"
                      label="Franchise opportunities"
                      Icon={Store}
                    />
                    <Divider />
                    <LinkRow href="/about" label="About us" Icon={Info} />
                    <Divider />
                    <ButtonRow
                      onClick={handleShare}
                      label="Share website link or app"
                      Icon={Share2}
                    />
                    <Divider />
                    <LinkRow
                      href="/privacy-policy"
                      label="Privacy policy"
                      Icon={FileText}
                    />
                    <Divider />
                    <LinkRow
                      href="/terms-and-conditions"
                      label="Terms & conditions"
                      Icon={ScrollText}
                    />
                  </div>
                </section>
              </div>
            )}
          </div>
        </Container>
      </main>

      <Footer />

      {addressOpen && (
        <ManageAddressModal onClose={() => setAddressOpen(false)} />
      )}
      {passwordOpen && (
        <ChangePasswordModal onClose={() => setPasswordOpen(false)} />
      )}
      {editOpen && <EditProfileModal onClose={() => setEditOpen(false)} />}
      {phoneOpen && <AddPhoneModal onClose={() => setPhoneOpen(false)} />}
      {deleteOpen && (
        <DeleteAccountModal onClose={() => setDeleteOpen(false)} />
      )}
    </div>
  );
}