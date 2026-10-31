"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";

import BookingShell from "@/app/components/booking/BookingShell";
import { PageSkeleton } from "@/app/components/booking/BookingSkeleton";
import {
  clearCart,
  groupTotal,
  removeGroup,
  setLineQty,
  useCart,
} from "@/app/lib/cart";
import {
  CHECKOUT_PATH,
  MIN_ORDER_TOTAL,
  gstOn,
  rupee,
} from "@/app/lib/booking";
import { useTaxRate } from "@/app/hooks/useTaxRate";
import { loginUrl } from "@/lib/authRedirect";
import { useAppSelector } from "@/redux/hooks";

const card =
  "rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4 sm:p-5";

// true only after hydration → avoids a flash of "cart is empty"
const useMounted = () =>
  useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

export default function CartPage() {
  const router = useRouter();
  const mounted = useMounted();
  const { groups, count, total, isEmpty } = useCart();
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  const hydrated = useAppSelector((s) => s.auth.hydrated);

  const { rate: gstRate } = useTaxRate(!isAuthenticated);
  const gstAmount = gstOn(total, gstRate);
  const remaining = Math.max(0, MIN_ORDER_TOTAL - total);
  const canCheckout = total >= MIN_ORDER_TOTAL;

  function proceed() {
    if (!canCheckout || !hydrated) return;
    router.push(isAuthenticated ? CHECKOUT_PATH : loginUrl(CHECKOUT_PATH));
  }

  return (
    <BookingShell>
      <Link
        href="/services"
        className="mb-8 inline-flex items-center gap-1.5 text-[14px] font-medium text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
      >
        <ArrowLeft size={16} />
        Add more services
      </Link>

      {!mounted ? (
        <PageSkeleton variant="options" />
      ) : isEmpty ? (
        <div className="py-16 text-center">
          <ShoppingCart size={48} className="mx-auto text-[var(--gold)]" />
          <h2
            className="mt-4 text-[28px]"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            Your cart is empty
          </h2>
          <p className="mt-2 text-[var(--ink-soft)]">
            Add services from Dry Cleaning, House Help, Car Wash and more.
          </p>
          <Link
            href="/services"
            className="mt-5 inline-block rounded-full bg-[var(--gold)] px-8 py-3 text-[15px] font-semibold text-white hover:bg-[var(--gold-bright)]"
          >
            Browse services
          </Link>
        </div>
      ) : (
        <div className="mx-auto max-w-[760px] space-y-5">
          <div className="flex items-end justify-between gap-3">
            {/* <h2
              className="text-[32px] md:text-[40px]"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Your cart
              <span className="ml-3 text-[16px] text-[var(--ink-soft)]">
                ({count} {count === 1 ? "item" : "items"})
              </span>
            </h2> */}
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Remove everything from your cart?")) {
                  clearCart();
                }
              }}
              className="shrink-0 pb-2 text-[13px] font-medium text-[var(--ink-soft)] underline hover:text-[var(--ink)]"
            >
              Clear cart
            </button>
          </div>

          {groups.map((g) => (
            <section key={g.key} className={card}>
              <div className="mb-3 flex items-start justify-between gap-3 border-b border-[var(--line)] pb-3">
                <div className="min-w-0">
                  <h3 className="text-[17px] font-semibold text-[var(--ink)]">
                    {g.serviceName}
                  </h3>
                  {g.categoryName && (
                    <p className="text-[13px] text-[var(--ink-soft)]">
                      {g.categoryName}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => removeGroup(g.key)}
                  aria-label={`Remove ${g.serviceName}`}
                  className="flex shrink-0 items-center gap-1 text-[13px] text-[var(--ink-soft)] hover:text-red-500"
                >
                  <Trash2 size={15} /> Remove
                </button>
              </div>

              <ul className="space-y-3">
                {g.lines.map((l) => {
                  const isAddOn = l.kind === "addOn";
                  return (
                    <li
                      key={`${l.kind}-${l.id}`}
                      className="flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <p className="line-clamp-2 text-[15px] font-medium text-[var(--ink)]">
                          {l.name}
                          {isAddOn && (
                            <span className="ml-2 rounded-full bg-[var(--gold)]/10 px-2 py-0.5 text-[11px] font-semibold text-[var(--gold-bright)]">
                              Add-on
                            </span>
                          )}
                        </p>
                        {l.serviceName && l.serviceName !== g.serviceName && (
                          <p className="text-[12px] text-[var(--ink-soft)]">
                            {l.serviceName}
                          </p>
                        )}
                        <p className="text-[13px] text-[var(--ink-soft)]">
                          {rupee(l.price)}
                          {l.qty > 1 && ` × ${l.qty}`}
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-3">
                        {isAddOn ? (
                          <button
                            type="button"
                            onClick={() => setLineQty(g.key, l, 0)}
                            aria-label={`Remove ${l.name}`}
                            className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--ink-soft)] hover:bg-[var(--ink)]/5"
                          >
                            <X size={16} />
                          </button>
                        ) : (
                          <div className="flex items-center rounded-full border border-[var(--gold)] bg-[var(--gold)] text-white">
                            <button
                              type="button"
                              onClick={() => setLineQty(g.key, l, l.qty - 1)}
                              aria-label={`Remove one ${l.name}`}
                              className="flex h-8 w-8 items-center justify-center rounded-full"
                            >
                              <Minus size={15} />
                            </button>
                            <span className="min-w-[1.4rem] text-center text-[14px] font-semibold">
                              {l.qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => setLineQty(g.key, l, l.qty + 1)}
                              aria-label={`Add one more ${l.name}`}
                              className="flex h-8 w-8 items-center justify-center rounded-full"
                            >
                              <Plus size={15} />
                            </button>
                          </div>
                        )}
                        <span className="w-[72px] text-right text-[15px] font-semibold text-[var(--ink)]">
                          {rupee(l.price * l.qty)}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <p className="mt-3 flex justify-between border-t border-[var(--line)] pt-3 text-[14px]">
                <span className="text-[var(--ink-soft)]">Subtotal</span>
                <span className="font-semibold">{rupee(groupTotal(g))}</span>
              </p>
            </section>
          ))}

          {/* Summary */}
          <div className="sticky bottom-0 z-10 rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4 shadow-lg md:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="text-[17px] font-semibold text-[var(--ink)]">
                  {rupee(total)}
                  <span className="ml-2 text-[13px] font-normal text-[var(--ink-soft)]">
                    + {gstRate}% GST ({rupee(gstAmount)}) at checkout
                  </span>
                </p>
                <p className="mt-0.5 text-[13px] text-[var(--ink-soft)]">
                  {canCheckout
                    ? isAuthenticated
                      ? "You’re all set to checkout."
                      : "Log in to checkout. Your cart stays saved."
                    : `Add ${rupee(remaining)} more to checkout (minimum ${rupee(MIN_ORDER_TOTAL)}).`}
                </p>
              </div>
              <button
                type="button"
                onClick={proceed}
                disabled={!canCheckout || !hydrated}
                className="w-full shrink-0 whitespace-nowrap rounded-full bg-[var(--gold)] px-8 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[var(--gold-bright)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[var(--gold)] sm:w-auto"
              >
                {isAuthenticated ? "Proceed to checkout" : "Log in & checkout"}
              </button>
            </div>
          </div>
        </div>
      )}
    </BookingShell>
  );
}
