"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ChevronRight, IndianRupee, MapPin, Truck } from "lucide-react";

import { useAppSelector } from "@/redux/hooks";
import { useGetMyOrdersQuery, type Order } from "@/redux/api/orderApi";

/** Same wording the mobile app uses for the status chip on the home card. */
const CUSTOMER_STATUS_LABELS: Record<string, string> = {
  PENDING: "Order Placed",
  CONFIRMED: "Pickup assigned / confirmed",
  IN_PROGRESS: "Pickup completed",
  RECEIVED_AT_BRANCH: "Received at branch",
  PROCESSING: "Laundry in process",
  READY_FOR_DELIVERY: "Ready for delivery",
  OUT_FOR_DELIVERY: "Out for delivery",
  DELIVERED: "Delivered",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
  PICKUP_FAILED: "Pickup Failed",
  DELIVERY_FAILED: "Delivery Failed",
};
const FINISHED = ["COMPLETED", "CANCELLED", "PICKUP_FAILED", "DELIVERY_FAILED"];

const addressSummary = (o: Order) => {
  const a = o.serviceAddressSnapshot;
  return `${a?.line1 || ""}, ${a?.city || ""} ${a?.postalCode || ""}`.trim();
};

/**
 * Home-page "Active Orders" card - same condition as the app: only for a
 * logged-in user, showing their most recently placed order that isn't finished.
 */
export default function ActiveOrderCard() {
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  const hydrated = useAppSelector((s) => s.auth.hydrated);
  const show = hydrated && isAuthenticated;
  const { data } = useGetMyOrdersQuery(undefined, { skip: !show });

  const order = useMemo(() => {
    if (!show) return null;
    return (
      [...(data?.data ?? [])]
        .filter((o) => !FINISHED.includes(o.status))
        .sort(
          (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime(),
        )[0] || null
    );
  }, [data, show]);

  if (!order) return null;

  const title = order.items?.length
    ? order.items.map((i) => i.itemName).join(", ")
    : order.serviceName || "Active Order";
  const href = `/my-orders/${order.id}`;

  return (
    <section className="px-5 py-10 md:py-14">
      <div className="mx-auto max-w-[760px]">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[22px] font-semibold" style={{ fontFamily: "var(--font-fraunces)" }}>
            Active Orders
          </h2>
          <Link href="/my-orders" className="text-[14px] font-semibold text-[var(--gold)] hover:underline">
            View All &gt;
          </Link>
        </div>

        <Link
          href={href}
          className="block rounded-[20px] border border-[var(--line)] bg-[var(--card)] p-4 transition-colors hover:border-[var(--gold)]/50 sm:p-5"
        >
          <div className="mb-2.5 flex flex-wrap items-center gap-2">
            <span className="rounded-lg bg-[var(--gold)]/10 px-2.5 py-1 text-[11.5px] font-bold uppercase tracking-wide text-[var(--gold)]">
              {order.serviceCategoryName || "SERVICE"}
            </span>
            <span className="rounded-lg bg-blue-500/10 px-2.5 py-1 text-[12px] font-bold text-blue-500">
              {CUSTOMER_STATUS_LABELS[order.status] || order.status}
            </span>
          </div>

          <p className="mb-2 truncate text-[16px] font-bold">{title}</p>

          <div className="space-y-1.5 text-[13.5px] text-[var(--ink-soft)]">
            <p className="flex items-center gap-1.5">
              <MapPin size={14} className="shrink-0" />
              <span className="truncate">{addressSummary(order)}</span>
            </p>
            <p className="flex items-center gap-1.5 font-semibold text-[var(--ink)]">
              <IndianRupee size={14} className="shrink-0 text-[var(--ink-soft)]" />
              {(parseFloat(order.grandTotalAmount || "0") || 0).toFixed(0)}
            </p>
          </div>

          <span className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-[var(--gold)] py-3 text-[14px] font-bold text-white">
            <Truck size={16} /> Track Order <ChevronRight size={16} />
          </span>
        </Link>
      </div>
    </section>
  );
}