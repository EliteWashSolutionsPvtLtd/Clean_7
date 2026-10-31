"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import {
  Bug,
  Brush,
  CalendarClock,
  CheckCircle2,
  CircleCheck,
  CircleX,
  Clock3,
  FileText,
  Filter,
  History,
  IndianRupee,
  MapPin,
  RefreshCw,
  Shirt,
  SlidersHorizontal,
  Star,
  UserCheck,
  Wrench,
  X,
  Zap,
  ClipboardList,
  CarFront,
  type LucideIcon,
} from "lucide-react";

import BookingShell from "@/app/components/booking/BookingShell";
import { PageSkeleton } from "@/app/components/booking/BookingSkeleton";
import { useRequireAuth } from "@/app/hooks/useBookingAuth";
import { usePlaceOrder } from "@/app/hooks/usePlaceOrder";
import { useGetMyOrdersQuery, type Order, type OrderStatus as ApiStatus } from "@/redux/api/orderApi";

/* ---------- Same grouping / filter / sort model as the mobile Orders tab ---------- */

type Group = "Assigned" | "In Progress" | "Completed" | "Cancelled";
type ServiceType = "laundry" | "cleaning" | "car-wash" | "pest-control";
type SortOption = "newest" | "oldest" | "price-high" | "price-low";
type Tone = "green" | "amber" | "red" | "blue" | "purple";

const TONE: Record<Tone, string> = {
  green: "bg-green-500/15 text-green-600",
  amber: "bg-amber-500/15 text-amber-600",
  red: "bg-red-500/15 text-red-500",
  blue: "bg-blue-500/15 text-blue-500",
  purple: "bg-purple-500/15 text-purple-500",
};
const DOT: Record<Tone, string> = {
  green: "bg-green-500",
  amber: "bg-amber-500",
  red: "bg-red-500",
  blue: "bg-blue-500",
  purple: "bg-purple-500",
};

const SERVICE_LABELS: Record<ServiceType, string> = {
  laundry: "Laundry",
  cleaning: "Home Cleaning",
  "car-wash": "Car Wash",
  "pest-control": "Pest Control",
};
const SERVICE_ICONS: Record<ServiceType, LucideIcon> = {
  laundry: Shirt,
  cleaning: Brush,
  "car-wash": CarFront,
  "pest-control": Bug,
};
const SERVICE_TYPE_MAP: Record<string, ServiceType> = {
  cleaning: "cleaning",
  home_cleaning: "cleaning",
  laundry: "laundry",
  "car-wash": "car-wash",
  "vehicle-wash": "car-wash",
  door_to_door_car_wash: "car-wash",
  "pest-control": "pest-control",
  pest_control: "pest-control",
};
const ALL_SERVICE_TYPES = Object.keys(SERVICE_LABELS) as ServiceType[];

const GROUP_CFG: Record<Group, { tone: Tone; Icon: LucideIcon; label: string }> = {
  Assigned: { tone: "amber", Icon: UserCheck, label: "Assigned" },
  "In Progress": { tone: "blue", Icon: Wrench, label: "In Progress" },
  Completed: { tone: "green", Icon: CircleCheck, label: "Completed" },
  Cancelled: { tone: "red", Icon: CircleX, label: "Cancelled" },
};
const ALL_GROUPS = Object.keys(GROUP_CFG) as Group[];

const STATUS_GROUP: Record<ApiStatus, Group> = {
  PENDING: "Assigned",
  CONFIRMED: "Assigned",
  RECEIVED_AT_BRANCH: "In Progress",
  PROCESSING: "In Progress",
  READY_FOR_DELIVERY: "In Progress",
  OUT_FOR_DELIVERY: "In Progress",
  DELIVERED: "Completed",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
  PICKUP_FAILED: "Cancelled",
  DELIVERY_FAILED: "Cancelled",
};
const DETAILED: Record<ApiStatus, { label: string; tone: Tone }> = {
  PENDING: { label: "Awaiting Order Confirmation", tone: "amber" },
  CONFIRMED: { label: "Professional Assigned", tone: "blue" },
  RECEIVED_AT_BRANCH: { label: "Arrived at Facility", tone: "blue" },
  PROCESSING: { label: "Work in Progress", tone: "purple" },
  READY_FOR_DELIVERY: { label: "Ready to Return", tone: "blue" },
  OUT_FOR_DELIVERY: { label: "On the Way to You", tone: "blue" },
  DELIVERED: { label: "Returned Successfully", tone: "green" },
  IN_PROGRESS: { label: "Professional at Work", tone: "blue" },
  COMPLETED: { label: "Job Done", tone: "green" },
  CANCELLED: { label: "Booking Cancelled", tone: "red" },
  PICKUP_FAILED: { label: "Couldn't Pick Up", tone: "red" },
  DELIVERY_FAILED: { label: "Couldn't Deliver", tone: "red" },
};
const SORT_OPTIONS: { key: SortOption; label: string }[] = [
  { key: "newest", label: "Newest First" },
  { key: "oldest", label: "Oldest First" },
  { key: "price-high", label: "Price: High → Low" },
  { key: "price-low", label: "Price: Low → High" },
];
const SLOT_LABELS: Record<string, string> = {
  MORNING: "Morning (8 AM – 12 PM)",
  AFTERNOON: "Afternoon (12 PM – 4 PM)",
  EVENING: "Evening (4 PM – 8 PM)",
};

const validDate = (s?: string | null) => {
  if (!s) return null;
  const d = new Date(s);
  return isNaN(d.getTime()) || d.getTime() === 0 ? null : d;
};
const fmtDate = (d: Date) =>
  d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
const fmtDateTime = (d: Date) =>
  `${fmtDate(d)}, ${d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}`;

interface Row {
  id: string;
  orderNumber: string;
  serviceType: ServiceType;
  group: Group;
  detailed: { label: string; tone: Tone };
  paymentStatus: string;
  items: { name: string; qty: number; price: string }[];
  fallbackName: string;
  placedAt: string;
  address: string;
  price: string;
  priceNum: number;
  dateSort: number;
  isScheduled: boolean;
  scheduledDisplay: string;
  hasReview: boolean;
}

function toRow(o: Order): Row {
  const total = parseFloat(o.grandTotalAmount ?? "0") || 0;
  const created = validDate(o.createdAt);
  const sched = validDate(o.scheduledDate);

  const slotText = o.scheduledSlot
    ? `${o.scheduledSlot.label} (${o.scheduledSlot.startTime} – ${o.scheduledSlot.endTime})`
    : o.scheduledSlotCode
      ? SLOT_LABELS[o.scheduledSlotCode] || String(o.scheduledSlotCode).replace(/_/g, " ")
      : "";
  const dateText = sched ? fmtDate(sched) : "";

  const line1 = o.serviceAddressSnapshot?.line1 || "";
  return {
    id: o.id,
    orderNumber: o.orderNumber,
    serviceType: SERVICE_TYPE_MAP[String(o.serviceCategoryCode || "").toLowerCase()] || "laundry",
    group: STATUS_GROUP[o.status] || "Assigned",
    detailed: DETAILED[o.status] || { label: "Unknown", tone: "amber" },
    paymentStatus: o.paymentStatus || "PENDING",
    items: (o.items || []).map((i) => ({
      name: i.itemName,
      qty: parseInt(i.quantity) || 1,
      price: `₹${(parseFloat(i.lineTotal) || 0).toFixed(0)}`,
    })),
    fallbackName: o.serviceCategoryName || o.serviceName || "Service",
    placedAt: created ? fmtDateTime(created) : "",
    address: line1.length > 20 ? `${line1.substring(0, 20)}...` : line1,
    price: `₹${total.toFixed(0)}`,
    priceNum: total,
    dateSort: (sched ?? created)?.getTime() ?? 0,
    isScheduled: (o.bookingType || "SCHEDULED") !== "ASAP",
    scheduledDisplay: dateText ? (slotText ? `${dateText}, ${slotText}` : dateText) : slotText,
    hasReview: !!o.review,
  };
}

export default function MyOrdersPage() {
  const router = useRouter();
  const { allowed } = useRequireAuth();
  const { data, isLoading } = useGetMyOrdersQuery(undefined, { skip: !allowed });

  // finish a paid-but-unconfirmed payment if one is pending
  const { recover } = usePlaceOrder({
    onConfirmed: (id) => router.push(`/my-orders/${id}`),
  });
  useEffect(() => {
    if (allowed) void recover();
  }, [allowed, recover]);

  const [tab, setTab] = useState<"active" | "past">("active");
  const [filterOpen, setFilterOpen] = useState(false);
  const [services, setServices] = useState<ServiceType[]>([]);
  const [statuses, setStatuses] = useState<Group[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  // like the app, unpaid / failed online-payment attempts aren't listed as orders
  const rows = useMemo(
    () =>
      (data?.data ?? [])
        .map(toRow)
        .filter((r) => r.paymentStatus !== "PENDING" && r.paymentStatus !== "FAILED"),
    [data],
  );
  const activeRows = useMemo(
    () => rows.filter((r) => r.group === "Assigned" || r.group === "In Progress"),
    [rows],
  );
  const pastRows = useMemo(
    () => rows.filter((r) => r.group === "Completed" || r.group === "Cancelled"),
    [rows],
  );

  // lock page scroll while the sheet is open
  useEffect(() => {
    if (!filterOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setFilterOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [filterOpen]);

  const filterCount = services.length + statuses.length + (sortBy !== "newest" ? 1 : 0);

  const visible = useMemo(() => {
    let r = [...(tab === "active" ? activeRows : pastRows)];
    if (services.length) r = r.filter((x) => services.includes(x.serviceType));
    if (statuses.length) r = r.filter((x) => statuses.includes(x.group));
    r.sort((a, b) =>
      sortBy === "newest" ? b.dateSort - a.dateSort
      : sortBy === "oldest" ? a.dateSort - b.dateSort
      : sortBy === "price-high" ? b.priceNum - a.priceNum
      : a.priceNum - b.priceNum,
    );
    return r;
  }, [tab, activeRows, pastRows, services, statuses, sortBy]);

  const toggle = <T,>(set: (fn: (p: T[]) => T[]) => void, v: T) =>
    set((p) => (p.includes(v) ? p.filter((x) => x !== v) : [...p, v]));
  const clearFilters = () => {
    setServices([]);
    setStatuses([]);
    setSortBy("newest");
  };

  return (
    <BookingShell>
      <div className="mx-auto max-w-[760px]">
        {/* Header */}
        <div className="mb-5 flex items-start justify-between gap-4">
          {/* <div>
            <h2 className="text-[32px] md:text-[40px]" style={{ fontFamily: "var(--font-fraunces)" }}>
              My Orders
            </h2>
            <p className="text-[14px] text-[var(--ink-soft)]">Track &amp; manage all your bookings</p>
          </div> */}
          <button
            type="button"
            onClick={() => setFilterOpen(true)}
            aria-label="Filter and sort"
            className="relative mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[var(--line)] bg-[var(--card)] hover:border-[var(--gold)]/50"
          >
            <SlidersHorizontal size={20} />
            {filterCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[var(--gold)] text-[10px] font-extrabold text-white">
                {filterCount}
              </span>
            )}
          </button>
        </div>

        {/* Tabs */}
        <div role="tablist" className="mb-5 grid grid-cols-2 gap-1 rounded-2xl border border-[var(--line)] bg-[var(--card)] p-1">
          {(
            [
              { key: "active", label: "Active", Icon: Zap, count: activeRows.length },
              { key: "past", label: "History", Icon: History, count: 0 },
            ] as const
          ).map(({ key, label, Icon, count }) => {
            const on = tab === key;
            return (
              <button
                key={key}
                role="tab"
                aria-selected={on}
                type="button"
                onClick={() => setTab(key)}
                className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-[14px] font-semibold transition-colors ${
                  on ? "bg-[var(--gold)] text-white" : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
                }`}
              >
                <Icon size={16} />
                {label}
                {count > 0 && (
                  <span
                    className={`rounded-full px-1.5 text-[11px] font-bold leading-[18px] ${
                      on ? "bg-white text-[var(--gold)]" : "bg-[var(--ink-soft)] text-white"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Applied filters */}
        {filterCount > 0 && (
          <div className="mb-5 rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4">
            <p className="mb-3 flex items-center gap-1.5 text-[14px] font-bold text-[var(--ink-soft)]">
              <Filter size={16} /> Applied Filters
            </p>
            <div className="flex flex-wrap gap-2">
              {services.map((s) => {
                const Icon = SERVICE_ICONS[s];
                return (
                  <Pill key={s} onClick={() => toggle(setServices, s)} cls="bg-[var(--gold)]/10 text-[var(--gold)]">
                    <Icon size={13} /> {SERVICE_LABELS[s]}
                  </Pill>
                );
              })}
              {statuses.map((s) => {
                const { Icon, tone, label } = { ...GROUP_CFG[s] };
                return (
                  <Pill key={s} onClick={() => toggle(setStatuses, s)} cls={TONE[tone]}>
                    <Icon size={13} /> {label}
                  </Pill>
                );
              })}
              {sortBy !== "newest" && (
                <Pill onClick={() => setSortBy("newest")} cls="bg-[var(--ink)]/5 text-[var(--gold)]">
                  {SORT_OPTIONS.find((o) => o.key === sortBy)?.label}
                </Pill>
              )}
            </div>
          </div>
        )}

        {/* List */}
        {!allowed || isLoading ? (
          <PageSkeleton variant="options" />
        ) : visible.length === 0 ? (
          <div className="flex flex-col items-center px-4 py-14 text-center">
            <span className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-[var(--ink)]/5 text-[var(--ink-soft)]">
              {tab === "active" ? <ClipboardList size={44} /> : <History size={44} />}
            </span>
            <h3 className="mb-1 text-[20px] font-bold">
              {filterCount > 0 ? "No Matching Orders" : tab === "active" ? "No Active Orders" : "No Past Orders Yet"}
            </h3>
            <p className="mb-5 max-w-[340px] text-[14px] text-[var(--ink-soft)]">
              {filterCount > 0
                ? "Try adjusting your filters to see more orders."
                : tab === "active"
                  ? "Place your first order and enjoy fresh, clean clothes delivered to your door!"
                  : "Your completed and cancelled orders will appear here."}
            </p>
            {filterCount > 0 ? (
              <button onClick={clearFilters} className="rounded-full bg-[var(--gold)] px-7 py-3 font-semibold text-white hover:bg-[var(--gold-bright)]">
                Clear Filters
              </button>
            ) : (
              <Link href="/services" className="rounded-full bg-[var(--gold)] px-7 py-3 font-semibold text-white hover:bg-[var(--gold-bright)]">
                Explore Services
              </Link>
            )}
          </div>
        ) : (
          <ul className="space-y-3">
            {visible.map((o) => (
              <OrderCard key={o.id} o={o} past={tab === "past"} />
            ))}
          </ul>
        )}
      </div>

      {/* Filter & sort sheet */}
      {filterOpen && typeof document !== "undefined" && createPortal(
        <div
          className="fixed inset-0 z-[300] flex items-end justify-center bg-black/50 sm:items-center"
          onClick={() => setFilterOpen(false)}
        >
          <div
            role="dialog"
            aria-label="Filter and sort"
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[85dvh] w-full max-w-[520px] flex-col rounded-t-3xl border border-[var(--line)] bg-[var(--card)] sm:rounded-3xl"
          >
            <div className="flex items-center justify-between px-5 pb-2 pt-5">
              <h3 className="text-[20px] font-bold">Filter &amp; Sort</h3>
              <div className="flex items-center gap-4">
                {filterCount > 0 && (
                  <button onClick={clearFilters} className="text-[14px] font-semibold text-[var(--gold)]">
                    Clear All
                  </button>
                )}
                <button onClick={() => setFilterOpen(false)} aria-label="Close" className="text-[var(--ink-soft)] hover:text-[var(--ink)]">
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="overflow-y-auto px-5 pb-4">
              <SectionTitle>Service Type</SectionTitle>
              <div className="flex flex-wrap gap-2">
                {ALL_SERVICE_TYPES.map((s) => {
                  const on = services.includes(s);
                  const Icon = SERVICE_ICONS[s];
                  return (
                    <Chip key={s} on={on} onClick={() => toggle(setServices, s)} onCls="border-[var(--gold)] bg-[var(--gold)]/10 text-[var(--gold)]">
                      <Icon size={16} /> {SERVICE_LABELS[s]} {on && <CheckCircle2 size={14} />}
                    </Chip>
                  );
                })}
              </div>

              <SectionTitle>Order Status</SectionTitle>
              <div className="flex flex-wrap gap-2">
                {ALL_GROUPS.map((s) => {
                  const on = statuses.includes(s);
                  const { Icon, tone, label } = GROUP_CFG[s];
                  return (
                    <Chip key={s} on={on} onClick={() => toggle(setStatuses, s)} onCls={`border-current ${TONE[tone]}`}>
                      <Icon size={16} /> {label} {on && <CheckCircle2 size={14} />}
                    </Chip>
                  );
                })}
              </div>

              <SectionTitle>Sort By</SectionTitle>
              <div className="space-y-2">
                {SORT_OPTIONS.map((opt) => {
                  const on = sortBy === opt.key;
                  return (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setSortBy(opt.key)}
                      className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-[14px] ${
                        on ? "border-[var(--gold)] bg-[var(--gold)]/10 font-semibold text-[var(--gold)]" : "border-[var(--line)] text-[var(--ink-soft)]"
                      }`}
                    >
                      {opt.label}
                      <span className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${on ? "border-[var(--gold)]" : "border-[var(--line)]"}`}>
                        {on && <span className="h-2.5 w-2.5 rounded-full bg-[var(--gold)]" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-[var(--line)] p-4">
              <button
                onClick={() => setFilterOpen(false)}
                className="w-full rounded-full bg-[var(--gold)] py-3.5 font-semibold text-white hover:bg-[var(--gold-bright)]"
              >
                Show Results {filterCount > 0 && `(${visible.length})`}
              </button>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </BookingShell>
  );
}

/* ---------- pieces ---------- */

function OrderCard({ o, past }: { o: Row; past: boolean }) {
  const router = useRouter();
  const href = `/my-orders/${o.id}`;
  return (
    <li>
      <div
        role="link"
        tabIndex={0}
        onClick={() => router.push(href)}
        onKeyDown={(e) => e.key === "Enter" && router.push(href)}
        className="cursor-pointer rounded-[20px] border border-[var(--line)] bg-[var(--card)] p-4 transition-colors hover:border-[var(--gold)]/50"
      >
        <p className="mb-1.5 text-[12px] font-bold uppercase tracking-wide text-[var(--ink-soft)]">
          {SERVICE_LABELS[o.serviceType]}
        </p>
        <span className={`mb-3 inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[12px] font-bold ${TONE[o.detailed.tone]}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${DOT[o.detailed.tone]}`} />
          {o.detailed.label}
        </span>

        <div className="mb-3 space-y-2 rounded-2xl border border-[var(--line)] bg-[var(--ink)]/[0.03] p-3">
          {o.items.length > 0 ? (
            o.items.map((i, idx) => (
              <div key={`${i.name}-${idx}`} className="flex items-center justify-between gap-3 text-[14px]">
                <span className="flex min-w-0 items-center gap-1.5 font-semibold">
                  <CheckCircle2 size={15} className="shrink-0 text-[var(--gold)]" />
                  <span className="truncate">{i.name}</span>
                </span>
                <span className="flex shrink-0 gap-2.5">
                  <span className="text-[13px] font-semibold text-[var(--ink-soft)]">x{i.qty}</span>
                  <b className="text-[13.5px]">{i.price}</b>
                </span>
              </div>
            ))
          ) : (
            <p className="flex items-center gap-1.5 text-[14px] font-semibold">
              <CheckCircle2 size={15} className="text-[var(--gold)]" /> {o.fallbackName}
            </p>
          )}
        </div>

        <div className="mb-3 space-y-1.5 text-[13px] text-[var(--ink-soft)]">
          {o.placedAt && (
            <p className="flex items-center gap-1.5"><Clock3 size={15} /> Placed: {o.placedAt}</p>
          )}
          {o.address && (
            <p className="flex items-center gap-1.5"><MapPin size={15} /> {o.address}</p>
          )}
          <p className="flex items-center gap-1.5 text-[14px] font-bold text-[var(--ink)]">
            <IndianRupee size={15} className="text-[var(--ink-soft)]" /> Total: {o.price}
          </p>
        </div>

        {o.isScheduled && (
          <div className="mb-3.5 space-y-1 rounded-[10px] border border-[var(--line)] bg-[var(--ink)]/[0.03] p-2.5 text-[12.5px] text-[var(--ink-soft)]">
            <p className="flex items-center gap-1.5">
              <CalendarClock size={15} className="text-[var(--gold)]" /> Booking Type:{" "}
              <b className="text-[var(--ink)]">Scheduled Order</b>
            </p>
            {o.scheduledDisplay && (
              <p className="pl-[21px]">Scheduled At: <b className="text-[var(--ink)]">{o.scheduledDisplay}</b></p>
            )}
          </div>
        )}

        <div className="flex gap-3">
          {past && o.group === "Completed" && (
            <Link
              href="/services"
              onClick={(e) => e.stopPropagation()}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[var(--gold)] py-3 text-[14px] font-semibold text-white hover:bg-[var(--gold-bright)]"
            >
              <RefreshCw size={16} /> Rebook
            </Link>
          )}
          <Link
            href={href}
            onClick={(e) => e.stopPropagation()}
            className={`flex flex-1 items-center justify-center gap-2 border border-[var(--line)] bg-[var(--ink)]/[0.04] py-3 text-[14px] font-semibold hover:border-[var(--gold)]/50 ${past ? "rounded-xl" : "rounded-full"}`}
          >
            <FileText size={16} /> {past ? "View Details" : "Order Details"}
          </Link>
        </div>

        {o.group === "Completed" && !o.hasReview && (
          <Link
            href={href}
            onClick={(e) => e.stopPropagation()}
            className="mt-3 flex items-center justify-center gap-2 rounded-full bg-[var(--gold)] py-3 text-[14px] font-semibold text-white hover:bg-[var(--gold-bright)]"
          >
            <Star size={16} /> Leave a Review
          </Link>
        )}
      </div>
    </li>
  );
}

function Pill({ children, cls, onClick }: { children: React.ReactNode; cls: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[12px] font-bold ${cls}`}>
      {children} <X size={14} />
    </button>
  );
}

function Chip({ children, on, onCls, onClick }: { children: React.ReactNode; on: boolean; onCls: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-[13px] ${
        on ? `${onCls} font-bold` : "border-[var(--line)] text-[var(--ink-soft)]"
      }`}
    >
      {children}
    </button>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <p className="mb-2.5 mt-5 text-[15px] font-bold">{children}</p>;
}