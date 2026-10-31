"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LogIn } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/slices/authSlice";
import { useGetProfileQuery } from "@/redux/api/profileApi";
import { useLogoutMutation } from "@/redux/api/authApi";
import { apiSlice } from "@/redux/api/apiSlice";
import { useCart } from "@/app/lib/cart";
import { useGetWalletQuery } from "@/redux/api/orderApi";
import { rupee, walletBalanceOf } from "@/app/lib/booking";
import styles from "./Navbar.module.css";

/**
 * Account block of the mobile / tablet menu (the desktop navbar has the same
 * options in its profile dropdown):
 *   logged out → Login / Sign up
 *   logged in  → name + email, My profile, My Orders, Cart, Logout
 */
export default function MobileAccountMenu({
  onNavigate,
}: {
  onNavigate: () => void;
}) {
  const { user, isAuthenticated, hydrated } = useAppSelector((s) => s.auth);
  const { data: profileRes } = useGetProfileQuery(undefined, {
    skip: !isAuthenticated,
  });
  const dispatch = useAppDispatch();
  const [logoutApi] = useLogoutMutation();
  const router = useRouter();
  const { count } = useCart();
  const { data: walletRes } = useGetWalletQuery(undefined, { skip: !isAuthenticated });
  const balance = walletBalanceOf(walletRes?.data);

  if (!hydrated) return null;

  if (!isAuthenticated) {
    return (
      <div className="mb-8 flex gap-3">
        <Link
          href="/login"
          onClick={onNavigate}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[var(--gold)] px-5 py-3.5 text-[15px] font-semibold text-white"
        >
          <LogIn size={18} />
          Login
        </Link>
        <Link
          href="/signup"
          onClick={onNavigate}
          className="flex flex-1 items-center justify-center rounded-full border border-[var(--gold)] px-5 py-3.5 text-[15px] font-semibold text-[var(--gold-bright)]"
        >
          Sign up
        </Link>
      </div>
    );
  }

  const profile = profileRes?.data;
  const displayName =
    (typeof profile?.fullName === "string" && profile.fullName.trim()) ||
    user?.name ||
    "";
  const label = displayName || user?.email || "Account";
  const initial = label.trim().charAt(0).toUpperCase();

  async function handleLogout() {
    onNavigate();
    try {
      await logoutApi().unwrap(); // POST /auth/logout
    } catch {
      // the local session is cleared regardless of the server response
    }
    dispatch(logout());
    dispatch(apiSlice.util.resetApiState());
    toast.success("Logged out");
    router.replace("/");
  }

  return (
    <div className={styles.mobileAccount}>
      <div className={styles.mobileAccountHead}>
        <span className={styles.mobileAvatar}>{initial}</span>
        <div className={styles.mobileAccountWho}>
          <p>{displayName || "My account"}</p>
          {user?.email && <span>{user.email}</span>}
        </div>
      </div>

      <Link href="/profile" onClick={onNavigate}>
        My profile
      </Link>
      <Link href="/my-orders" onClick={onNavigate}>
        My Orders
      </Link>
      <Link href="/wallet" onClick={onNavigate}>
        Wallet &amp; vouchers
        {balance !== null && <span className={styles.mobileBadge}>{rupee(balance)}</span>}
      </Link>
      <Link href="/cart" onClick={onNavigate}>
        Cart
        {count > 0 && <span className={styles.mobileBadge}>{count}</span>}
      </Link>
      <button type="button" onClick={handleLogout} className={styles.mobileLogout}>
        Logout
      </button>
    </div>
  );
}