// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { ArrowLeft, Loader2, Wallet as WalletIcon } from "lucide-react";
// import { toast } from "sonner";

// import BookingShell from "@/app/components/booking/BookingShell";
// import { PageSkeleton } from "@/app/components/booking/BookingSkeleton";
// import { useRequireAuth } from "@/app/hooks/useBookingAuth";
// import { useRazorpay, type RazorpaySuccess } from "@/app/hooks/useRazorpay";
// import { newIdempotencyKey, rupee, walletBalanceOf } from "@/app/lib/booking";
// import { useAppSelector } from "@/redux/hooks";
// import {
//   useConfirmVoucherPurchaseMutation,
//   useGetWalletQuery,
//   useGetWalletVouchersQuery,
//   usePurchaseVoucherMutation,
//   type WalletTransaction,
// } from "@/redux/api/orderApi";

// const card = "rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4 sm:p-5";
// const num = (v: unknown) => {
//   const n = Number(v);
//   return Number.isFinite(n) ? n : 0;
// };
// const str = (v: unknown) => (typeof v === "string" && v.trim() ? v : undefined);

// export default function WalletPage() {
//   const { allowed } = useRequireAuth();
//   const user = useAppSelector((s) => s.auth.user);
//   const { openCheckout } = useRazorpay();

//   const { data: walletRes, isLoading: walletLoading, isError: walletError, refetch } =
//     useGetWalletQuery(undefined, { skip: !allowed });
//   const { data: vouchersRes, isLoading: vouchersLoading } =
//     useGetWalletVouchersQuery(undefined, { skip: !allowed });
//   const [purchase] = usePurchaseVoucherMutation();
//   const [confirmPurchase] = useConfirmVoucherPurchaseMutation();
//   const [busyId, setBusyId] = useState<string | null>(null);

//   const w = walletRes?.data;
//   const balance = walletBalanceOf(w);
//   const inner = (w?.wallet && typeof w.wallet === "object" ? w.wallet : w) ?? {};
//   const history: WalletTransaction[] = inner.transactions ?? inner.history ?? [];
//   const rawV = vouchersRes?.data as unknown;
//   const vouchers: Record<string, unknown>[] = Array.isArray(rawV)
//     ? rawV
//     : Array.isArray((rawV as { vouchers?: unknown })?.vouchers)
//       ? ((rawV as { vouchers: Record<string, unknown>[] }).vouchers)
//       : [];

//   async function buy(id: string) {
//     if (busyId) return;
//     setBusyId(id);
//     const done = () => setBusyId(null);
//     try {
//       // 1. start the purchase → Razorpay checkout details
//       const res = await purchase({ voucherId: id, idempotencyKey: newIdempotencyKey() }).unwrap();
//       const d = (res.data ?? {}) as Record<string, unknown>;
//       const c = (d.checkout && typeof d.checkout === "object" ? d.checkout : d) as Record<string, unknown>;
//       const purchaseId = str(d.purchaseId) ?? str(c.purchaseId);
//       const amount = num(c.amountSubunits ?? c.amount);
//       if (!purchaseId || !str(c.key) || !str(c.orderId) || !str(c.currency) || amount <= 0) {
//         toast.error("Voucher checkout details were incomplete. Please try again.");
//         return done();
//       }
//       // 2. pay → 3. confirm (same flow as the app)
//       await openCheckout({
//         key: c.key as string,
//         razorpayOrderId: c.orderId as string,
//         amount,
//         currency: c.currency as string,
//         description: "Clean7 wallet voucher",
//         prefill: { name: user?.name, email: user?.email, contact: user?.phone },
//         onSuccess: async (r: RazorpaySuccess) => {
//           try {
//             await confirmPurchase({
//               purchaseId,
//               razorpayOrderId: r.razorpay_order_id,
//               razorpayPaymentId: r.razorpay_payment_id,
//               razorpaySignature: r.razorpay_signature,
//             }).unwrap();
//             toast.success("Voucher added to your wallet.");
//           } catch {
//             toast.error("Payment received but we couldn't confirm it yet. Please don't pay again - check back shortly.", { duration: 10000 });
//             void refetch();
//           } finally {
//             done();
//           }
//         },
//         onFailure: (m) => { toast.error(m); done(); },
//         onDismiss: () => { toast("Payment cancelled."); done(); },
//       });
//     } catch {
//       done(); // base query already toasted the reason
//     }
//   }

//   return (
//     <BookingShell>
//       <Link href="/profile" className="mb-8 inline-flex items-center gap-1.5 text-[14px] font-medium text-[var(--ink-soft)] hover:text-[var(--ink)]">
//         <ArrowLeft size={16} /> Back
//       </Link>

//       {!allowed ? (
//         <PageSkeleton variant="options" />
//       ) : (
//         <div className="mx-auto max-w-2xl space-y-5">
//           <section className={`${card} flex items-center gap-4`}>
//             <span className="grid h-12 w-12 place-items-center rounded-full bg-[var(--gold)]/15 text-[var(--gold)]">
//               <WalletIcon size={22} />
//             </span>
//             <div>
//               <p className="text-[13px] text-[var(--ink-soft)]">Wallet balance</p>
//               <p className="text-[28px] font-semibold" style={{ fontFamily: "var(--font-fraunces)" }}>
//                 {walletLoading ? "…" : balance === null ? "—" : rupee(balance)}
//               </p>
//               {walletError && (
//                 <button onClick={() => void refetch()} className="text-[13px] underline">
//                   Couldn&apos;t load balance - retry
//                 </button>
//               )}
//             </div>
//           </section>

//           <section className={card}>
//             <h2 className="mb-3 text-[17px] font-semibold">Buy a voucher</h2>
//             {vouchersLoading ? (
//               <p className="text-[13px] text-[var(--ink-soft)]">Loading vouchers…</p>
//             ) : vouchers.length === 0 ? (
//               <p className="text-[13px] text-[var(--ink-soft)]">No vouchers available right now.</p>
//             ) : (
//               <ul className="space-y-2">
//                 {vouchers.map((v) => {
//                   const id = String(v.id);
//                   const price = num(v.price ?? v.priceAmount);
//                   const face = num(v.faceValue ?? v.amount);
//                   return (
//                     <li key={id} className="flex items-center justify-between gap-3 rounded-xl border border-[var(--line)] px-4 py-3">
//                       <span className="min-w-0">
//                         <b className="block text-[15px]">{str(v.name) ?? str(v.title) ?? "Voucher"}</b>
//                         <span className="block text-[13px] text-[var(--ink-soft)]">
//                           {face > 0 && `Get ${rupee(face)} wallet credit`}
//                           {face > 0 && price > 0 && " · "}
//                           {price > 0 && `Pay ${rupee(price)}`}
//                           {num(v.validityDays) > 0 && ` · valid ${num(v.validityDays)} days`}
//                         </span>
//                         {str(v.description) && (
//                           <span className="block text-[12px] text-[var(--ink-soft)]">{str(v.description)}</span>
//                         )}
//                       </span>
//                       <button
//                         type="button"
//                         disabled={!!busyId}
//                         onClick={() => void buy(id)}
//                         className="flex shrink-0 items-center gap-1.5 rounded-full bg-[var(--gold)] px-5 py-2 text-[14px] font-semibold text-white hover:bg-[var(--gold-bright)] disabled:opacity-50"
//                       >
//                         {busyId === id && <Loader2 size={14} className="animate-spin" />}
//                         Buy
//                       </button>
//                     </li>
//                   );
//                 })}
//               </ul>
//             )}
//           </section>

//           <section className={card}>
//             <h2 className="mb-3 text-[17px] font-semibold">Transactions</h2>
//             {history.length === 0 ? (
//               <p className="text-[13px] text-[var(--ink-soft)]">No transactions yet.</p>
//             ) : (
//               <ul className="divide-y divide-[var(--line)]">
//                 {history.map((t) => {
//                   const debit = /debit|spend|used|payment/i.test(t.type ?? "");
//                   return (
//                     <li key={t.id} className="flex items-center justify-between gap-3 py-3 text-[14px]">
//                       <span className="min-w-0">
//                         <span className="block truncate">{t.description || t.type || "Transaction"}</span>
//                         {t.createdAt && (
//                           <span className="block text-[12px] text-[var(--ink-soft)]">
//                             {new Date(t.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
//                           </span>
//                         )}
//                       </span>
//                       <b className={debit ? "text-red-400" : "text-green-500"}>
//                         {debit ? "-" : "+"}{rupee(Math.abs(num(t.amount)))}
//                       </b>
//                     </li>
//                   );
//                 })}
//               </ul>
//             )}
//           </section>
//         </div>
//       )}
//     </BookingShell>
//   );
// }


"use client";

import { useState } from "react";
import BackLink from "@/app/components/ui/BackLink";
import { ArrowLeft, Loader2, Wallet as WalletIcon } from "lucide-react";
import { toast } from "sonner";

import BookingShell from "@/app/components/booking/BookingShell";
import { PageSkeleton } from "@/app/components/booking/BookingSkeleton";
import { useRequireAuth } from "@/app/hooks/useBookingAuth";
import { useRazorpay, type RazorpaySuccess } from "@/app/hooks/useRazorpay";
import { newIdempotencyKey, rupee, walletBalanceOf } from "@/app/lib/booking";
import { useAppSelector } from "@/redux/hooks";
import {
  useConfirmVoucherPurchaseMutation,
  useGetWalletQuery,
  useGetWalletVouchersQuery,
  usePurchaseVoucherMutation,
  type WalletTransaction,
} from "@/redux/api/orderApi";

const card = "rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4 sm:p-5";
const num = (v: unknown) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};
const str = (v: unknown) => (typeof v === "string" && v.trim() ? v : undefined);

export default function WalletPage() {
  const { allowed } = useRequireAuth();
  const user = useAppSelector((s) => s.auth.user);
  const { openCheckout } = useRazorpay();

  const { data: walletRes, isLoading: walletLoading, isError: walletError, refetch } =
    useGetWalletQuery(undefined, { skip: !allowed });
  const { data: vouchersRes, isLoading: vouchersLoading } =
    useGetWalletVouchersQuery(undefined, { skip: !allowed });
  const [purchase] = usePurchaseVoucherMutation();
  const [confirmPurchase] = useConfirmVoucherPurchaseMutation();
  const [busyId, setBusyId] = useState<string | null>(null);

  const w = walletRes?.data;
  const balance = walletBalanceOf(w);
  const inner = (w?.wallet && typeof w.wallet === "object" ? w.wallet : w) ?? {};
  const history: WalletTransaction[] = inner.transactions ?? inner.history ?? [];
  const rawV = vouchersRes?.data as unknown;
  const vouchers: Record<string, unknown>[] = Array.isArray(rawV)
    ? rawV
    : Array.isArray((rawV as { vouchers?: unknown })?.vouchers)
      ? ((rawV as { vouchers: Record<string, unknown>[] }).vouchers)
      : [];

  async function buy(id: string) {
    if (busyId) return;
    setBusyId(id);
    const done = () => setBusyId(null);
    try {
      // 1. start the purchase → Razorpay checkout details
      const res = await purchase({ voucherId: id, idempotencyKey: newIdempotencyKey() }).unwrap();
      const d = (res.data ?? {}) as Record<string, unknown>;
      const c = (d.checkout && typeof d.checkout === "object" ? d.checkout : d) as Record<string, unknown>;
      const purchaseId = str(d.purchaseId) ?? str(c.purchaseId);
      const amount = num(c.amountSubunits ?? c.amount);
      if (!purchaseId || !str(c.key) || !str(c.orderId) || !str(c.currency) || amount <= 0) {
        toast.error("Voucher checkout details were incomplete. Please try again.");
        return done();
      }
      // 2. pay → 3. confirm (same flow as the app)
      await openCheckout({
        key: c.key as string,
        razorpayOrderId: c.orderId as string,
        amount,
        currency: c.currency as string,
        description: "Clean7 wallet voucher",
        prefill: { name: user?.name, email: user?.email, contact: user?.phone },
        onSuccess: async (r: RazorpaySuccess) => {
          try {
            await confirmPurchase({
              purchaseId,
              razorpayOrderId: r.razorpay_order_id,
              razorpayPaymentId: r.razorpay_payment_id,
              razorpaySignature: r.razorpay_signature,
            }).unwrap();
            toast.success("Voucher added to your wallet.");
          } catch {
            toast.error("Payment received but we couldn't confirm it yet. Please don't pay again - check back shortly.", { duration: 10000 });
            void refetch();
          } finally {
            done();
          }
        },
        onFailure: (m) => { toast.error(m); done(); },
        onDismiss: () => { toast("Payment cancelled."); done(); },
      });
    } catch {
      done(); // base query already toasted the reason
    }
  }

  return (
    <BookingShell>
      <BackLink fallback="/profile" className="mb-8 inline-flex items-center gap-1.5 text-[14px] font-medium text-[var(--ink-soft)] hover:text-[var(--ink)]">
        <ArrowLeft size={16} /> Back
      </BackLink>

      {!allowed ? (
        <PageSkeleton variant="options" />
      ) : (
        <div className="mx-auto max-w-2xl space-y-5">
          <section className={`${card} flex items-center gap-4`}>
            <span className="grid h-12 w-12 place-items-center rounded-full bg-[var(--gold)]/15 text-[var(--gold)]">
              <WalletIcon size={22} />
            </span>
            <div>
              <p className="text-[13px] text-[var(--ink-soft)]">Wallet balance</p>
              <p className="text-[28px] font-semibold" style={{ fontFamily: "var(--font-fraunces)" }}>
                {walletLoading ? "…" : balance === null ? "—" : rupee(balance)}
              </p>
              {walletError && (
                <button onClick={() => void refetch()} className="text-[13px] underline">
                  Couldn&apos;t load balance - retry
                </button>
              )}
            </div>
          </section>

          <section className={card}>
            <h2 className="mb-3 text-[17px] font-semibold">Buy a voucher</h2>
            {vouchersLoading ? (
              <p className="text-[13px] text-[var(--ink-soft)]">Loading vouchers…</p>
            ) : vouchers.length === 0 ? (
              <p className="text-[13px] text-[var(--ink-soft)]">No vouchers available right now.</p>
            ) : (
              <ul className="space-y-2">
                {vouchers.map((v) => {
                  const id = String(v.id);
                  const price = num(v.price ?? v.priceAmount);
                  const face = num(v.faceValue ?? v.amount);
                  return (
                    <li key={id} className="flex items-center justify-between gap-3 rounded-xl border border-[var(--line)] px-4 py-3">
                      <span className="min-w-0">
                        <b className="block text-[15px]">{str(v.name) ?? str(v.title) ?? "Voucher"}</b>
                        <span className="block text-[13px] text-[var(--ink-soft)]">
                          {face > 0 && `Get ${rupee(face)} wallet credit`}
                          {face > 0 && price > 0 && " · "}
                          {price > 0 && `Pay ${rupee(price)}`}
                          {num(v.validityDays) > 0 && ` · valid ${num(v.validityDays)} days`}
                        </span>
                        {str(v.description) && (
                          <span className="block text-[12px] text-[var(--ink-soft)]">{str(v.description)}</span>
                        )}
                      </span>
                      <button
                        type="button"
                        disabled={!!busyId}
                        onClick={() => void buy(id)}
                        className="flex shrink-0 items-center gap-1.5 rounded-full bg-[var(--gold)] px-5 py-2 text-[14px] font-semibold text-white hover:bg-[var(--gold-bright)] disabled:opacity-50"
                      >
                        {busyId === id && <Loader2 size={14} className="animate-spin" />}
                        Buy
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>

          <section className={card}>
            <h2 className="mb-3 text-[17px] font-semibold">Transactions</h2>
            {history.length === 0 ? (
              <p className="text-[13px] text-[var(--ink-soft)]">No transactions yet.</p>
            ) : (
              <ul className="divide-y divide-[var(--line)]">
                {history.map((t) => {
                  const debit = /debit|spend|used|payment/i.test(t.type ?? "");
                  return (
                    <li key={t.id} className="flex items-center justify-between gap-3 py-3 text-[14px]">
                      <span className="min-w-0">
                        <span className="block truncate">{t.description || t.type || "Transaction"}</span>
                        {t.createdAt && (
                          <span className="block text-[12px] text-[var(--ink-soft)]">
                            {new Date(t.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                          </span>
                        )}
                      </span>
                      <b className={debit ? "text-red-400" : "text-green-500"}>
                        {debit ? "-" : "+"}{rupee(Math.abs(num(t.amount)))}
                      </b>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </div>
      )}
    </BookingShell>
  );
}