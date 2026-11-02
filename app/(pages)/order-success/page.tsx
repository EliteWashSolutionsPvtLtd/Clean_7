"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  CalendarDays,
  Check,
  Copy,
  House,
  MapPin,
  Receipt,
  ShieldCheck,
  Sparkles,
  Wallet,
  XCircle,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

import BookingShell from "@/app/components/booking/BookingShell";
import { useRequireAuth } from "@/app/hooks/useBookingAuth";
import { rupee } from "@/app/lib/booking";
import { orderApi, type Order } from "@/redux/api/orderApi";
import { useAppDispatch } from "@/redux/hooks";

/** Same labels as the mobile app's order-success screen. */
const SLOT_LABELS: Record<string, string> = {
  MORNING: "Morning (08:00 - 12:00)",
  AFTERNOON: "Afternoon (12:00 - 16:00)",
  EVENING: "Evening (16:00 - 20:00)",
};

const clean = (s?: string | null) => (s ?? "").replace(/\s+/g, " ").trim();

const formatDate = (d?: string | null) => {
  if (!d) return "";
  const date = new Date(d);
  if (isNaN(date.getTime()) || date.getTime() === 0) return "";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const dashed = "border-t border-dashed border-[var(--line)]";
const iconBox = "mr-4 flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px]";

function Row({
  icon,
  tint,
  label,
  children,
  right,
}: {
  icon: React.ReactNode;
  tint: string;
  label: string;
  children?: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-center py-3">
      <div className={`${iconBox} ${tint}`}>{icon}</div>
      <div className="min-w-0 flex-1 pr-4">
        <p className="mb-1 text-[13px] text-[var(--ink-soft)]">{label}</p>
        {children}
      </div>
      {right}
    </div>
  );
}

function Success() {
  const sp = useSearchParams();
  const orderId = sp.get("orderId") ?? "";
  const fallbackNumber = sp.get("orderNumber") ?? "";
  const { allowed: loggedIn } = useRequireAuth();
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Only open for an order placed in this tab (typing the URL does nothing).
  const [fromCheckout, setFromCheckout] = useState<boolean | null>(null);
  const [ids, setIds] = useState<string[]>([]);
  useEffect(() => {
    let ok = false;
    let list: string[] = [];
    try {
      ok = !!orderId && sessionStorage.getItem("clean7_order_success") === orderId;
      const raw = sessionStorage.getItem("clean7_order_success_ids");
      const parsed: unknown = raw ? JSON.parse(raw) : [];
      if (Array.isArray(parsed)) list = parsed.filter((x): x is string => typeof x === "string");
    } catch {
      /* storage blocked */
    }
    // every order of this checkout; always include the one in the URL
    setIds(list.includes(orderId) ? list : orderId ? [orderId, ...list] : list);
    setFromCheckout(ok);
    if (!ok) router.replace("/my-orders");
  }, [orderId, router]);
  const allowed = loggedIn && fromCheckout === true;

  /* ----- load EVERY order of the checkout (the total is the sum of all of them) ----- */
  const [orders, setOrders] = useState<Order[]>([]);
  const [settled, setSettled] = useState(false);
  const alive = useRef(true);
  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);

  const load = useCallback(async () => {
    const results = await Promise.all(
      ids.map(async (id) => {
        const sub = dispatch(orderApi.endpoints.getOrderById.initiate(id, { forceRefetch: true }));
        try {
          return (await sub).data?.data;
        } finally {
          sub.unsubscribe();
        }
      }),
    );
    if (!alive.current) return;
    const got = results.filter((o): o is Order => !!o);
    if (got.length) setOrders(got);
    // stop polling once every order's payment is no longer in flight
    if (
      got.length === ids.length &&
      got.every((o) =>
        ["PAID", "FAILED", "COD_PENDING_COLLECTION", "COD_COLLECTED"].includes(String(o.paymentStatus)),
      )
    ) {
      setSettled(true);
    }
  }, [dispatch, ids]);

  useEffect(() => {
    if (!allowed || ids.length === 0) return;
    void load();
    if (settled) return;
    const t = setInterval(() => {
      if (document.visibilityState === "visible") void load();
    }, 5000);
    return () => clearInterval(t);
  }, [allowed, ids, load, settled]);

  const first = orders[0];
  const multi = ids.length > 1;
  const total = useMemo(
    () => orders.reduce((sum, o) => sum + (Number(o.grandTotalAmount) || 0), 0),
    [orders],
  );

  if (!allowed) return null;

  /* ----- state (same wording as the app) ----- */
  const method = first?.paymentMethod;
  const isCOD = method === "COD";
  const isWallet = method === "WALLET";
  const anyFailed = orders.some((o) => o.paymentStatus === "FAILED");
  const isPaid = !isCOD && orders.length > 0 && orders.every((o) => o.paymentStatus === "PAID");
  const isRazorpayPending = method === "RAZORPAY" && !isPaid && !anyFailed;

  const title = anyFailed
    ? "Payment failed"
    : isRazorpayPending
      ? "Order Placed!"
      : isPaid
        ? "Payment Confirmed!"
        : isCOD || isWallet
          ? "Order Confirmed!"
          : "Order Placed!";
  const subtitle = anyFailed
    ? "Your payment did not go through. You can retry from My Orders."
    : isRazorpayPending
      ? "Payment processing. Track your order below."
      : "Thank you! Your order has been placed successfully.";

  const displayNumber = first?.orderNumber || fallbackNumber || "Pending";
  const addr = first?.serviceAddressSnapshot;
  const addressText = addr
    ? `${addr.label ? `${addr.label} - ` : ""}${addr.line1}, ${addr.city} ${addr.postalCode}`
    : "Address not available";
  const slot = first?.scheduledSlotCode
    ? SLOT_LABELS[first.scheduledSlotCode] || first.scheduledSlotCode
    : first?.scheduledSlot?.label;

  async function copy() {
    const text = multi && orders.length ? orders.map((o) => o.orderNumber).join(", ") : displayNumber;
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied");
    } catch {
      /* clipboard blocked */
    }
  }

  const trackHref = multi ? "/my-orders" : `/my-orders/${orderId}`;

  return (
    <div className="mx-auto w-full max-w-[560px]">
      {/* Top success section */}
      <div className="mb-8 mt-2 flex flex-col items-center text-center">
        <div
          className={`mb-5 flex h-[100px] w-[100px] items-center justify-center rounded-full ${
            anyFailed ? "bg-red-50 dark:bg-red-950/40" : "bg-[#E8F5E9] dark:bg-[#1B3A1B]"
          }`}
        >
          <div
            className={`flex h-[60px] w-[60px] items-center justify-center rounded-full ${
              anyFailed ? "bg-red-100 dark:bg-red-900/40" : "bg-[#C8E6C9] dark:bg-[#2E5A2E]"
            }`}
          >
            {anyFailed ? (
              <XCircle size={40} className="text-red-500" />
            ) : (
              <Check size={40} strokeWidth={3} className="text-[#4CAF50]" />
            )}
          </div>
        </div>
        <h2 className="mb-2 text-[26px] font-extrabold text-[var(--ink)]">{title}</h2>
        <p className="mb-4 max-w-[340px] text-[15px] leading-[22px] text-[var(--ink-soft)]">{subtitle}</p>
        <div className="flex items-center gap-2 rounded-full border border-[#DCFCE7] bg-[#F0FDF4] px-4 py-2 text-[13px] font-semibold text-[#4CAF50] dark:border-[#2E5A2E] dark:bg-[#1B3A1B]">
          <ShieldCheck size={16} />
          Your payment is secure with us
        </div>
      </div>

      {/* Order details card */}
      <div className="mb-6 rounded-3xl bg-[var(--card)] p-6 shadow-[0_12px_24px_rgba(0,0,0,0.04)]">
        <div className="mb-6 flex flex-col items-start gap-3">
          <h3 className="text-[18px] font-bold text-[var(--ink)]">Order Details</h3>
          <button
            type="button"
            onClick={copy}
            className="flex items-center gap-3 rounded-xl bg-[#F0FDF4] px-3 py-2 text-left dark:bg-[#1B3A1B]"
          >
            <span>
              <span className="mb-0.5 block text-[10px] font-semibold text-[#4CAF50]">
                {multi ? "Order IDs" : "Order ID"}
              </span>
              <span className="block text-[13px] font-bold text-[var(--ink)]">
                {multi ? `${ids.length} service orders` : `#${displayNumber}`}
              </span>
            </span>
            <Copy size={18} className="text-[#4CAF50]" />
          </button>
        </div>

        {multi && orders.length > 0 ? (
          orders.map((o) => (
            <div key={o.id}>
              <Row
                icon={<Sparkles size={24} className="text-[#4CAF50]" />}
                tint="bg-[#EDF7ED] dark:bg-[#1B3A1B]"
                label={clean(o.serviceName) || "Service"}
                right={
                  <span className="text-[18px] font-bold text-[var(--ink)]">
                    {rupee(Number(o.grandTotalAmount) || 0)}
                  </span>
                }
              >
                <p className="text-[15px] font-bold leading-5 text-[var(--ink)]">#{o.orderNumber}</p>
              </Row>
              {Number(o.codChargeAmount) > 0 && (
                <p className="-mt-1 mb-2 text-right text-[12px] text-[var(--ink-soft)]">
                  COD charge: {rupee(Number(o.codChargeAmount))}
                </p>
              )}
              <div className={dashed} />
            </div>
          ))
        ) : (
          <>
            <Row
              icon={<Sparkles size={24} className="text-[#4CAF50]" />}
              tint="bg-[#EDF7ED] dark:bg-[#1B3A1B]"
              label="Service Name"
              right={
                <span className="text-[18px] font-bold text-[var(--ink)]">
                  {first ? rupee(Number(first.grandTotalAmount) || 0) : ""}
                </span>
              }
            >
              <p className="text-[15px] font-bold leading-5 text-[var(--ink)]">
                {clean(first?.serviceName) || "Premium Service"}
              </p>
            </Row>
            <div className={dashed} />
          </>
        )}

        {/* Payment method */}
        <Row
          icon={<Wallet size={24} className="text-[#9C27B0]" />}
          tint="bg-[#F3E5F5] dark:bg-[#2A1A3A]"
          label="Payment Method"
          right={
            isPaid && !isWallet ? (
              <span className="font-bold italic text-[#3366CC] dark:text-[#6699FF]">Razorpay</span>
            ) : null
          }
        >
          <p className="text-[15px] font-bold leading-5 text-[var(--ink)]">
            {isWallet ? "Clean7 Wallet" : isPaid ? "Razorpay" : isCOD ? "Cash on Delivery" : "Pending"}
          </p>
        </Row>
        <div className={dashed} />

        {/* Date & time */}
        <Row
          icon={<CalendarDays size={24} className="text-[#2196F3]" />}
          tint="bg-[#E3F2FD] dark:bg-[#1A2A3A]"
          label="Date & Time"
        >
          <p className="text-[15px] font-bold leading-5 text-[var(--ink)]">
            {first?.bookingType === "ASAP" ? (
              <span className="inline-flex items-center gap-1 text-[var(--gold)]">
                <Zap size={14} /> Express (Within ~2 hours)
              </span>
            ) : first ? (
              `${formatDate(first.scheduledDate)} • ${slot || first.scheduledSlotCode || "TBD"}`
            ) : (
              "—"
            )}
          </p>
        </Row>
        <div className={dashed} />

        {/* Location */}
        <Row
          icon={<MapPin size={24} className="text-[var(--gold)]" />}
          tint="bg-[#FBF7EE] dark:bg-[rgba(201,162,75,0.15)]"
          label="Location"
        >
          <p className="text-[15px] font-bold leading-5 text-[var(--ink)]">{addressText}</p>
        </Row>
        <div className={dashed} />

        {/* Total amount: the sum of every order in this checkout */}
        <Row
          icon={<Receipt size={24} className="text-[#F44336]" />}
          tint="bg-[#FFEBEE] dark:bg-[#3A1A1A]"
          label="Total Payable Amount"
          right={
            <span className="text-[24px] font-extrabold text-[var(--gold)]">
              {orders.length ? rupee(total) : ""}
            </span>
          }
        />
      </div>

      {/* Bottom banner */}
      <div className="mb-6 flex items-center rounded-[20px] bg-[#E8F5E9] p-5 dark:bg-[#1B3A1B]">
        <div className="mr-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#4CAF50]">
          <ShieldCheck size={22} className="text-white" />
        </div>
        <div>
          <p className="mb-1 text-[15px] font-bold text-[var(--ink)]">We&apos;ve got you covered!</p>
          <p className="text-[12px] leading-[18px] text-[var(--ink-soft)]">
            You will receive an order update shortly on your registered number.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <Link
          href={trackHref}
          className="flex items-center justify-center gap-2 rounded-full bg-[var(--gold)] py-[18px] text-[16px] font-bold text-white shadow-[0_8px_16px_rgba(184,137,62,0.35)] hover:bg-[var(--gold-bright)]"
        >
          <MapPin size={20} />
          Track your Order
          <ArrowRight size={20} />
        </Link>
        <Link
          href="/"
          className="flex items-center justify-center gap-2 rounded-full border-[1.5px] border-[var(--line)] bg-[var(--card)] py-4 text-[16px] font-bold text-[var(--ink)] hover:bg-[var(--ink)]/5"
        >
          <House size={20} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <BookingShell>
      <Suspense fallback={null}>
        <Success />
      </Suspense>
    </BookingShell>
  );
}