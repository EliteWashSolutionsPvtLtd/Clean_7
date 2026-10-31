"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Plus, ShoppingCart } from "lucide-react";
import { useCart } from "@/app/lib/cart";
import { CHECKOUT_PATH, MIN_ORDER_TOTAL } from "@/app/lib/booking";
import { loginUrl } from "@/lib/authRedirect";
import { useAppSelector } from "@/redux/hooks";

/** Pages where a floating cart would only get in the way. */
const HIDE_ON = [
  "/cart",
  "/services/book/checkout",
  "/order-success",
  "/login",
  "/signup",
];
/**
 * Pages that have their own sticky bottom bar. The cart bar sits under it, so
 * those bars read --cart-bar-offset and lift themselves above the cart bar.
 */
const OWN_BAR_ON = ["/services/book", "/pricing"];
const BAR_OFFSET = "88px";

const inr = (n: number) =>
  `₹${n.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;

/**
 * Cart summary shown on every page while the cart has at least one item:
 * item count + total, "Add more" and "Continue to booking".
 * The cart is saved in localStorage, so it is still here after the visitor
 * closes the site and comes back.
 */
export default function CartButton() {
  const pathname = usePathname() ?? "";
  const router = useRouter();
  const { count, total } = useCart();
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);

  const under = (p: string) => pathname === p || pathname.startsWith(`${p}/`);
  // only for logged-in users
  const visible = isAuthenticated && count >= 1 && !HIDE_ON.some(under);
  const liftOwnBar = visible && OWN_BAR_ON.some(under);

  // let the page's own sticky bar (if any) sit above the cart bar

  useEffect(() => {
    if (!liftOwnBar) return;

    const root = document.documentElement;
    // phones show a small round cart button, so other bottom bars need no lift there
    const mq = window.matchMedia("(min-width: 640px)");
    const apply = () => {
      if (mq.matches) root.style.setProperty("--cart-bar-offset", BAR_OFFSET);
      else root.style.removeProperty("--cart-bar-offset");
    };
    apply();
    mq.addEventListener("change", apply);

    return () => {
      mq.removeEventListener("change", apply);
      root.style.removeProperty("--cart-bar-offset");
    };
  }, [liftOwnBar]);

  if (!visible) return null;

  const items = `${count} item${count > 1 ? "s" : ""}`;

  function goBooking() {
    if (total < MIN_ORDER_TOTAL) {
      router.push("/cart"); // shows how much more is needed
      return;
    }
    router.push(isAuthenticated ? CHECKOUT_PATH : loginUrl(CHECKOUT_PATH));
  }

  return (
    <>
    {/* Phone: round cart button, same size and style as the share button, just above it */}
    <Link
      href="/cart"
      aria-label={`Open cart, ${items}`}
      className="fixed bottom-[76px] right-4 z-[9998] flex h-12 w-12 items-center justify-center rounded-full bg-[var(--gold)] text-white shadow-lg shadow-black/20 transition-all duration-300 hover:scale-105 active:scale-95 sm:hidden"
    >
      <ShoppingCart size={23} />
      <span className="absolute -right-1 -top-1 flex h-[20px] min-w-[20px] items-center justify-center rounded-full bg-[var(--ink)] px-1 text-[11px] font-bold leading-none text-[var(--ground)] ring-2 ring-[var(--ground)]">
        {count > 99 ? "99+" : count}
      </span>
    </Link>

    {/* Tablet / desktop: full bar */}
    <div className="fixed bottom-4 z-[9998] hidden sm:left-1/2 sm:block sm:w-[min(640px,calc(100vw-180px))] sm:-translate-x-1/2">
      <div className="flex items-center gap-2 rounded-2xl border border-[var(--line)] bg-[var(--card)] p-2.5 shadow-[0_10px_40px_rgba(0,0,0,0.15)] sm:gap-3 sm:p-3">
        <Link
          href="/cart"
          aria-label={`Open cart, ${items}`}
          className="flex min-w-0 flex-1 items-center gap-3 rounded-xl px-1.5 py-1 hover:bg-[var(--gold)]/5"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--gold)]/10 text-[var(--gold)]">
            <ShoppingCart size={20} />
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-[12px] uppercase tracking-[0.05em] text-[var(--ink-soft)]">
              {items}
            </span>
            <span className="block text-[17px] font-semibold text-[var(--ink)]">
              {inr(total)}
            </span>
          </span>
        </Link>

        <Link
          href="/services"
          className="flex shrink-0 items-center gap-1 rounded-full border border-[var(--gold)] px-3 py-2 text-[13px] font-semibold text-[var(--gold-bright)] transition-colors hover:bg-[var(--gold)]/10 sm:px-4"
        >
          <Plus size={15} />
          <span className="hidden min-[420px]:inline">Add more</span>
        </Link>
        <button
          type="button"
          onClick={goBooking}
          className="shrink-0 whitespace-nowrap rounded-full bg-[var(--gold)] px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-[var(--gold-bright)] sm:px-5"
        >
          <span className="sm:hidden">Continue</span>
          <span className="hidden sm:inline">Continue to booking</span>
        </button>
      </div>
    </div>
    </>
  );
}