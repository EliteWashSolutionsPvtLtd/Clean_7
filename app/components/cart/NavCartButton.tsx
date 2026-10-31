"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/app/lib/cart";
import { useAppSelector } from "@/redux/hooks";

/**
 * Round cart button for the navbar (same look as the theme toggle).
 * Shows how many items are in the saved cart; opens /cart.
 */
export default function NavCartButton() {
  const { count } = useCart();
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);

  // only for logged-in users
  if (!isAuthenticated) return null;

  return (
    <Link
      href="/cart"
      aria-label={count > 0 ? `Cart, ${count} item${count > 1 ? "s" : ""}` : "Cart"}
      className={`relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--gold)] transition-colors duration-200 ${count > 0 ? "bg-[var(--gold)] text-white hover:brightness-110" : "bg-transparent text-[var(--gold-bright)] hover:bg-[var(--gold)] hover:text-[var(--card)]"}`}
    >
      <ShoppingCart size={18} />
      {count > 0 && (
        <span
          className="absolute -right-1.5 -top-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[var(--ink)] px-1 text-[11px] font-bold leading-none text-[var(--ground)] ring-2 ring-[var(--ground)]"
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}