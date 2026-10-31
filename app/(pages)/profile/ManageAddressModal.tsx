// "use client";

// import { useEffect, useRef, useState } from "react";
// import { toast } from "sonner";
// import { LocateFixed, MapPin, Plus } from "lucide-react";

// import Modal, { secondaryBtnClass } from "@/app/components/ui/modals/Modal";
// import {
//   inputClass,
//   labelClass,
//   primaryBtnClass,
// } from "@/app/components/auth/styles";
// import {
//   useAddAddressMutation,
//   useDeleteAddressMutation,
//   useGetAddressesQuery,
//   useUpdateAddressMutation,
//   type Address,
// } from "@/redux/api/profileApi";
// import { reverseGeocode } from "@/app/lib/geocode";
// import LocationPicker from "./LocationPicker"

// /* ---------- helpers ---------- */

// type RawAddress = Address & { _id?: string; addressId?: string };

// // Backend response shape isn't confirmed — accept the common variants
// function toAddressList(res: unknown): Address[] {
//   const r = (res ?? {}) as Record<string, unknown>;
//   const d = r.data as unknown;
//   const dObj = (d ?? {}) as Record<string, unknown>;

//   const arr = Array.isArray(d)
//     ? d
//     : Array.isArray(dObj.addresses)
//       ? dObj.addresses
//       : Array.isArray(dObj.items)
//         ? dObj.items
//         : Array.isArray(r.addresses)
//           ? r.addresses
//           : Array.isArray(res)
//             ? res
//             : [];

//   return (arr as RawAddress[]).map((a) => ({
//     ...a,
//     id: a.id ?? a._id ?? a.addressId,
//   }));
// }

// const formatLines = (a: Address) => [
//   [a.line1, a.line2].filter(Boolean).join(", "),
//   [a.city, [a.state, a.postalCode].filter(Boolean).join(" ")]
//     .filter(Boolean)
//     .join(", "),
//   a.country,
// ];

// const LABEL_SUGGESTIONS = ["Home", "Work", "Other"];

// interface FormState {
//   label: string;
//   line1: string;
//   line2: string;
//   city: string;
//   state: string;
//   postalCode: string;
//   country: string;
//   isDefault: boolean;
//   latitude: number | null;
//   longitude: number | null;
// }

// const emptyForm = (isDefault: boolean): FormState => ({
//   label: "",
//   line1: "",
//   line2: "",
//   city: "",
//   state: "",
//   postalCode: "",
//   country: "India",
//   isDefault,
//   latitude: null,
//   longitude: null,
// });

// const round6 = (n: number) => Math.round(n * 1e6) / 1e6;

// /* ---------- loading skeleton (static, no pulse) ---------- */

// function ListSkeleton() {
//   return (
//     <div aria-busy="true" aria-label="Loading addresses" className="space-y-3">
//       {[0, 1].map((i) => (
//         <div
//           key={i}
//           className="flex gap-4 rounded-2xl border border-[var(--line)] p-4"
//         >
//           <div className="h-10 w-10 shrink-0 rounded-full bg-[var(--ink)]/10" />
//           <div className="w-full space-y-2.5">
//             <div className="h-4 w-24 rounded-lg bg-[var(--ink)]/10" />
//             <div className="h-3.5 w-full rounded-lg bg-[var(--ink)]/10" />
//             <div className="h-3.5 w-2/3 rounded-lg bg-[var(--ink)]/10" />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// /* ---------- modal ---------- */

// export default function ManageAddressModal({
//   onClose,
// }: {
//   onClose: () => void;
// }) {
//   const [view, setView] = useState<"list" | "form">("list");
//   const [form, setForm] = useState<FormState>(emptyForm(false));
//   const [pendingId, setPendingId] = useState<string | null>(null);
//   const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
//   const [locating, setLocating] = useState(false); // waiting for GPS
//   const [resolving, setResolving] = useState(false); // fetching address for pin
//   const abortRef = useRef<AbortController | null>(null);

//   const { data, isLoading, isError, refetch } = useGetAddressesQuery();
//   const [addAddress, { isLoading: saving }] = useAddAddressMutation();
//   const [updateAddress] = useUpdateAddressMutation();
//   const [deleteAddress] = useDeleteAddressMutation();

//   // Default address first
//   const addresses = toAddressList(data).sort(
//     (a, b) => Number(!!b.isDefault) - Number(!!a.isDefault),
//   );

//   useEffect(() => () => abortRef.current?.abort(), []);

//   const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
//     setForm((f) => ({ ...f, [key]: value }));

//   function openForm() {
//     // First address is made default automatically
//     setForm(emptyForm(addresses.length === 0));
//     setView("form");
//   }

//   // Drop the pin at lat/lng and fill the address fields from it
//   async function applyLocation(lat: number, lng: number) {
//     const latitude = round6(lat);
//     const longitude = round6(lng);
//     setForm((f) => ({ ...f, latitude, longitude }));

//     abortRef.current?.abort();
//     const ctrl = new AbortController();
//     abortRef.current = ctrl;
//     setResolving(true);
//     try {
//       const r = await reverseGeocode(latitude, longitude, ctrl.signal);
//       if (ctrl.signal.aborted) return;
//       if (r) {
//         setForm((f) => ({
//           ...f,
//           line1: r.line1,
//           line2: r.line2,
//           city: r.city,
//           state: r.state,
//           postalCode: r.postalCode,
//           country: r.country || f.country,
//         }));
//       } else {
//         toast.error("Couldn't read an address for this spot. Please fill it in.");
//       }
//     } catch {
//       if (ctrl.signal.aborted) return;
//       toast.error("Couldn't fetch the address for this spot. Please fill it in.");
//     } finally {
//       if (abortRef.current === ctrl) setResolving(false);
//     }
//   }

//   function handleUseCurrentLocation() {
//     if (typeof navigator === "undefined" || !("geolocation" in navigator)) {
//       toast.error("Your browser doesn't support location. Pick a spot on the map.");
//       return;
//     }
//     setLocating(true);
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         setLocating(false);
//         void applyLocation(pos.coords.latitude, pos.coords.longitude);
//       },
//       (err) => {
//         setLocating(false);
//         toast.error(
//           err.code === err.PERMISSION_DENIED
//             ? "Location access is blocked. Allow it in your browser settings, or pick a spot on the map."
//             : "Couldn't get your location. Pick a spot on the map instead.",
//         );
//       },
//       { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
//     );
//   }

//   async function handleMakeDefault(addr: Address) {
//     if (!addr.id) return;
//     setPendingId(addr.id);
//     try {
//       await updateAddress({
//         addressId: addr.id,
//         body: { isDefault: true },
//       }).unwrap();
//       toast.success("Default address updated");
//     } catch {
//       // error toast is shown globally in apiSlice
//     } finally {
//       setPendingId(null);
//     }
//   }

//   async function handleDelete(addr: Address) {
//     if (!addr.id) return;
//     setPendingId(addr.id);
//     try {
//       await deleteAddress(addr.id).unwrap();
//       toast.success("Address deleted");
//       setConfirmDeleteId(null);
//     } catch {
//       // error toast is shown globally in apiSlice
//     } finally {
//       setPendingId(null);
//     }
//   }

//   async function handleSave(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();

//     const label = form.label.trim();
//     const line1 = form.line1.trim();
//     const city = form.city.trim();
//     const state = form.state.trim();
//     const postalCode = form.postalCode.trim();
//     const country = form.country.trim();

//     if (!label || !line1 || !city || !state || !postalCode || !country) {
//       toast.error("Please fill in all required fields");
//       return;
//     }
//     if (country.toLowerCase() === "india" && !/^[1-9]\d{5}$/.test(postalCode)) {
//       toast.error("Enter a valid 6-digit PIN code");
//       return;
//     }

//     try {
//       await addAddress({
//         label,
//         line1,
//         ...(form.line2.trim() ? { line2: form.line2.trim() } : {}),
//         city,
//         state,
//         postalCode,
//         country,
//         isDefault: form.isDefault,
//         ...(form.latitude !== null && form.longitude !== null
//           ? { latitude: form.latitude, longitude: form.longitude }
//           : {}),
//       }).unwrap();
//       toast.success("Address added");
//       setView("list");
//     } catch {
//       // error toast is shown globally in apiSlice
//     }
//   }

//   return (
//     <Modal
//       open
//       onClose={onClose}
//       title={view === "form" ? "Add new address" : "Manage address"}
//       size="md"
//     >
//       {view === "list" ? (
//         <div className="space-y-5">
//           <button
//             type="button"
//             onClick={openForm}
//             className="flex w-full items-center justify-center gap-2 rounded-full border border-[var(--gold)] px-6 py-3.5 text-[16px] font-semibold text-[var(--gold-bright)] hover:bg-[var(--gold)] hover:text-white"
//           >
//             <Plus size={18} />
//             Add new address
//           </button>

//           {isLoading ? (
//             <ListSkeleton />
//           ) : isError ? (
//             <div className="rounded-2xl border border-[var(--line)] p-5 text-center">
//               <p className="text-[15px] text-[var(--ink-soft)]">
//                 We couldn&apos;t load your addresses.
//               </p>
//               <button
//                 type="button"
//                 onClick={() => refetch()}
//                 className="mt-3 text-[15px] font-semibold text-[var(--gold)] underline-offset-4 hover:underline"
//               >
//                 Try again
//               </button>
//             </div>
//           ) : addresses.length === 0 ? (
//             <p className="rounded-2xl border border-dashed border-[var(--line)] p-6 text-center text-[15px] text-[var(--ink-soft)]">
//               No saved addresses yet. Add one to use it for pickups and
//               deliveries.
//             </p>
//           ) : (
//             <ul className="space-y-3">
//               {addresses.map((addr, i) => {
//                 const [l1, l2, l3] = formatLines(addr);
//                 const busy = pendingId === addr.id;
//                 return (
//                   <li
//                     key={addr.id ?? i}
//                     className={`flex gap-4 rounded-2xl border p-4 ${
//                       addr.isDefault
//                         ? "border-[var(--gold)] bg-[var(--gold)]/8"
//                         : "border-[var(--line)]"
//                     }`}
//                   >
//                     <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--gold)]/12 text-[var(--gold-bright)]">
//                       <MapPin size={19} />
//                     </span>
//                     <div className="min-w-0 flex-1">
//                       <div className="flex flex-wrap items-center gap-2">
//                         <p className="text-[16px] font-semibold">
//                           {addr.label}
//                         </p>
//                         {addr.isDefault && (
//                           <span className="rounded-full bg-[var(--gold)] px-2.5 py-0.5 text-[12px] font-semibold text-white">
//                             Default
//                           </span>
//                         )}
//                       </div>
//                       <p className="mt-1 text-[14px] leading-relaxed text-[var(--ink-soft)]">
//                         {l1}
//                         <br />
//                         {l2}
//                         <br />
//                         {l3}
//                       </p>
//                       {confirmDeleteId === addr.id ? (
//                         <div className="mt-3 rounded-xl bg-red-600/10 p-3">
//                           <p className="text-[14px] font-medium text-[var(--ink)]">
//                             Delete this address?
//                           </p>
//                           <div className="mt-2 flex gap-4">
//                             <button
//                               type="button"
//                               onClick={() => handleDelete(addr)}
//                               disabled={pendingId !== null}
//                               className="text-[14px] font-semibold text-red-600 underline-offset-4 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
//                             >
//                               {busy ? "Deleting…" : "Yes, delete"}
//                             </button>
//                             <button
//                               type="button"
//                               onClick={() => setConfirmDeleteId(null)}
//                               disabled={busy}
//                               className="text-[14px] font-semibold text-[var(--ink-soft)] underline-offset-4 hover:underline"
//                             >
//                               Cancel
//                             </button>
//                           </div>
//                         </div>
//                       ) : (
//                         <div className="mt-2 flex gap-4">
//                           {!addr.isDefault && (
//                             <button
//                               type="button"
//                               onClick={() => handleMakeDefault(addr)}
//                               disabled={pendingId !== null}
//                               className="text-[14px] font-semibold text-[var(--gold)] underline-offset-4 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
//                             >
//                               {busy ? "Updating…" : "Make default"}
//                             </button>
//                           )}
//                           <button
//                             type="button"
//                             onClick={() => setConfirmDeleteId(addr.id ?? null)}
//                             disabled={pendingId !== null}
//                             className="text-[14px] font-semibold text-red-600 underline-offset-4 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   </li>
//                 );
//               })}
//             </ul>
//           )}
//         </div>
//       ) : (
//         <form onSubmit={handleSave} className="space-y-4">
//           <div className="space-y-3">
//             <button
//               type="button"
//               onClick={handleUseCurrentLocation}
//               disabled={locating || saving}
//               className="flex w-full items-center justify-center gap-2 rounded-full border border-[var(--gold)] px-6 py-3 text-[15px] font-semibold text-[var(--gold-bright)] hover:bg-[var(--gold)] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               <LocateFixed size={18} />
//               {locating ? "Getting your location..." : "Use my current location"}
//             </button>

//             <LocationPicker
//               value={
//                 form.latitude !== null && form.longitude !== null
//                   ? { lat: form.latitude, lng: form.longitude }
//                   : null
//               }
//               onPick={(lat, lng) => void applyLocation(lat, lng)}
//             />

//             <p className="text-[13px] text-[var(--ink-soft)]" aria-live="polite">
//               {resolving
//                 ? "Fetching address for this spot..."
//                 : form.latitude !== null
//                   ? "Pin set. Drag it to adjust, and edit the details below if needed."
//                   : "Tap the map to drop a pin, or use your current location. The address fills in automatically."}
//             </p>
//           </div>

//           <div>
//             <label htmlFor="addr-label" className={labelClass}>
//               Label
//             </label>
//             <input
//               id="addr-label"
//               value={form.label}
//               onChange={(e) => set("label", e.target.value)}
//               placeholder="Home, Work…"
//               maxLength={30}
//               required
//               className={inputClass}
//             />
//             <div className="mt-2 flex gap-2">
//               {LABEL_SUGGESTIONS.map((s) => (
//                 <button
//                   key={s}
//                   type="button"
//                   onClick={() => set("label", s)}
//                   className={`rounded-full border px-3.5 py-1 text-[13px] font-medium ${
//                     form.label === s
//                       ? "border-[var(--gold)] bg-[var(--gold)] text-white"
//                       : "border-[var(--line)] text-[var(--ink-soft)] hover:text-[var(--ink)]"
//                   }`}
//                 >
//                   {s}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div>
//             <label htmlFor="addr-line1" className={labelClass}>
//               Address line 1
//             </label>
//             <input
//               id="addr-line1"
//               value={form.line1}
//               onChange={(e) => set("line1", e.target.value)}
//               placeholder="House no., street"
//               autoComplete="address-line1"
//               required
//               className={inputClass}
//             />
//           </div>

//           <div>
//             <label htmlFor="addr-line2" className={labelClass}>
//               Address line 2{" "}
//               <span className="font-normal text-[var(--ink-soft)]">
//                 (optional)
//               </span>
//             </label>
//             <input
//               id="addr-line2"
//               value={form.line2}
//               onChange={(e) => set("line2", e.target.value)}
//               placeholder="Landmark, area"
//               autoComplete="address-line2"
//               className={inputClass}
//             />
//           </div>

//           <div className="grid gap-4 sm:grid-cols-2">
//             <div>
//               <label htmlFor="addr-city" className={labelClass}>
//                 City
//               </label>
//               <input
//                 id="addr-city"
//                 value={form.city}
//                 onChange={(e) => set("city", e.target.value)}
//                 autoComplete="address-level2"
//                 required
//                 className={inputClass}
//               />
//             </div>
//             <div>
//               <label htmlFor="addr-state" className={labelClass}>
//                 State
//               </label>
//               <input
//                 id="addr-state"
//                 value={form.state}
//                 onChange={(e) => set("state", e.target.value)}
//                 autoComplete="address-level1"
//                 required
//                 className={inputClass}
//               />
//             </div>
//             <div>
//               <label htmlFor="addr-postal" className={labelClass}>
//                 PIN code
//               </label>
//               <input
//                 id="addr-postal"
//                 value={form.postalCode}
//                 onChange={(e) =>
//                   set(
//                     "postalCode",
//                     e.target.value.replace(/[^\dA-Za-z -]/g, "").slice(0, 10),
//                   )
//                 }
//                 inputMode="numeric"
//                 autoComplete="postal-code"
//                 required
//                 className={inputClass}
//               />
//             </div>
//             <div>
//               <label htmlFor="addr-country" className={labelClass}>
//                 Country
//               </label>
//               <input
//                 id="addr-country"
//                 value={form.country}
//                 onChange={(e) => set("country", e.target.value)}
//                 autoComplete="country-name"
//                 required
//                 className={inputClass}
//               />
//             </div>
//           </div>

//           <label className="flex cursor-pointer items-center gap-3 text-[15px]">
//             <input
//               type="checkbox"
//               checked={form.isDefault}
//               onChange={(e) => set("isDefault", e.target.checked)}
//               className="h-4 w-4 accent-[var(--gold)]"
//             />
//             Set as default address
//           </label>

//           <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row">
//             <button
//               type="button"
//               onClick={() => setView("list")}
//               disabled={saving}
//               className={secondaryBtnClass}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={saving || resolving}
//               className={primaryBtnClass}
//             >
//               {saving ? "Saving..." : "Save address"}
//             </button>
//           </div>
//         </form>
//       )}
//     </Modal>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { LocateFixed, MapPin, Pencil, Plus } from "lucide-react";

import Modal, { secondaryBtnClass } from "@/app/components/ui/modals/Modal";
import {
  inputClass,
  labelClass,
  primaryBtnClass,
} from "@/app/components/auth/styles";
import {
  useAddAddressMutation,
  useDeleteAddressMutation,
  useGetAddressesQuery,
  useUpdateAddressMutation,
  type Address,
} from "@/redux/api/profileApi";
import { reverseGeocode } from "@/app/lib/geocode";
import LocationPicker from "./LocationPicker"

/* ---------- helpers ---------- */

type RawAddress = Address & { _id?: string; addressId?: string };

// Backend response shape isn't confirmed — accept the common variants
function toAddressList(res: unknown): Address[] {
  const r = (res ?? {}) as Record<string, unknown>;
  const d = r.data as unknown;
  const dObj = (d ?? {}) as Record<string, unknown>;

  const arr = Array.isArray(d)
    ? d
    : Array.isArray(dObj.addresses)
      ? dObj.addresses
      : Array.isArray(dObj.items)
        ? dObj.items
        : Array.isArray(r.addresses)
          ? r.addresses
          : Array.isArray(res)
            ? res
            : [];

  return (arr as RawAddress[]).map((a) => ({
    ...a,
    id: a.id ?? a._id ?? a.addressId,
  }));
}

const formatLines = (a: Address) => [
  [a.line1, a.line2].filter(Boolean).join(", "),
  [a.city, [a.state, a.postalCode].filter(Boolean).join(" ")]
    .filter(Boolean)
    .join(", "),
  a.country,
];

const LABEL_SUGGESTIONS = ["Home", "Work", "Other"];

interface FormState {
  label: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
  latitude: number | null;
  longitude: number | null;
}

const emptyForm = (isDefault: boolean): FormState => ({
  label: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "India",
  isDefault,
  latitude: null,
  longitude: null,
});

const round6 = (n: number) => Math.round(n * 1e6) / 1e6;

/* ---------- loading skeleton (static, no pulse) ---------- */

function ListSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading addresses" className="space-y-3">
      {[0, 1].map((i) => (
        <div
          key={i}
          className="flex gap-4 rounded-2xl border border-[var(--line)] p-4"
        >
          <div className="h-10 w-10 shrink-0 rounded-full bg-[var(--ink)]/10" />
          <div className="w-full space-y-2.5">
            <div className="h-4 w-24 rounded-lg bg-[var(--ink)]/10" />
            <div className="h-3.5 w-full rounded-lg bg-[var(--ink)]/10" />
            <div className="h-3.5 w-2/3 rounded-lg bg-[var(--ink)]/10" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- modal ---------- */

export default function ManageAddressModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const [view, setView] = useState<"list" | "form">("list");
  const [editingId, setEditingId] = useState<string | null>(null); // null = adding a new address
  const [form, setForm] = useState<FormState>(emptyForm(false));
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [locating, setLocating] = useState(false); // waiting for GPS
  const [resolving, setResolving] = useState(false); // fetching address for pin
  const abortRef = useRef<AbortController | null>(null);

  const { data, isLoading, isError, refetch } = useGetAddressesQuery();
  const [addAddress, { isLoading: saving }] = useAddAddressMutation();
  const [updateAddress, { isLoading: updating }] = useUpdateAddressMutation();
  const [deleteAddress] = useDeleteAddressMutation();

  // Default address first
  const addresses = toAddressList(data).sort(
    (a, b) => Number(!!b.isDefault) - Number(!!a.isDefault),
  );

  useEffect(() => () => abortRef.current?.abort(), []);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  function openForm() {
    // First address is made default automatically
    setEditingId(null);
    setForm(emptyForm(addresses.length === 0));
    setView("form");
  }

  // Edit an existing address: same form, pre-filled
  function openEdit(addr: Address) {
    if (!addr.id) return;
    setEditingId(addr.id);
    setForm({
      label: addr.label ?? "",
      line1: addr.line1 ?? "",
      line2: addr.line2 ?? "",
      city: addr.city ?? "",
      state: addr.state ?? "",
      postalCode: addr.postalCode ?? "",
      country: addr.country || "India",
      isDefault: !!addr.isDefault,
      latitude: typeof addr.latitude === "number" ? addr.latitude : null,
      longitude: typeof addr.longitude === "number" ? addr.longitude : null,
    });
    setView("form");
  }

  // Drop the pin at lat/lng and fill the address fields from it
  async function applyLocation(lat: number, lng: number) {
    const latitude = round6(lat);
    const longitude = round6(lng);
    setForm((f) => ({ ...f, latitude, longitude }));

    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    setResolving(true);
    try {
      const r = await reverseGeocode(latitude, longitude, ctrl.signal);
      if (ctrl.signal.aborted) return;
      if (r) {
        setForm((f) => ({
          ...f,
          line1: r.line1,
          line2: r.line2,
          city: r.city,
          state: r.state,
          postalCode: r.postalCode,
          country: r.country || f.country,
        }));
      } else {
        toast.error("Couldn't read an address for this spot. Please fill it in.");
      }
    } catch {
      if (ctrl.signal.aborted) return;
      toast.error("Couldn't fetch the address for this spot. Please fill it in.");
    } finally {
      if (abortRef.current === ctrl) setResolving(false);
    }
  }

  function handleUseCurrentLocation() {
    if (typeof navigator === "undefined" || !("geolocation" in navigator)) {
      toast.error("Your browser doesn't support location. Pick a spot on the map.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocating(false);
        void applyLocation(pos.coords.latitude, pos.coords.longitude);
      },
      (err) => {
        setLocating(false);
        toast.error(
          err.code === err.PERMISSION_DENIED
            ? "Location access is blocked. Allow it in your browser settings, or pick a spot on the map."
            : "Couldn't get your location. Pick a spot on the map instead.",
        );
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    );
  }

  async function handleMakeDefault(addr: Address) {
    if (!addr.id) return;
    setPendingId(addr.id);
    try {
      await updateAddress({
        addressId: addr.id,
        body: { isDefault: true },
      }).unwrap();
      toast.success("Default address updated");
    } catch {
      // error toast is shown globally in apiSlice
    } finally {
      setPendingId(null);
    }
  }

  async function handleDelete(addr: Address) {
    if (!addr.id) return;
    setPendingId(addr.id);
    try {
      await deleteAddress(addr.id).unwrap();
      toast.success("Address deleted");
      setConfirmDeleteId(null);
    } catch {
      // error toast is shown globally in apiSlice
    } finally {
      setPendingId(null);
    }
  }

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const label = form.label.trim();
    const line1 = form.line1.trim();
    const city = form.city.trim();
    const state = form.state.trim();
    const postalCode = form.postalCode.trim();
    const country = form.country.trim();

    if (!label || !line1 || !city || !state || !postalCode || !country) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (country.toLowerCase() === "india" && !/^[1-9]\d{5}$/.test(postalCode)) {
      toast.error("Enter a valid 6-digit PIN code");
      return;
    }

    const body = {
      label,
      line1,
      // on edit, an emptied line 2 is sent as "" so it gets cleared
      ...(form.line2.trim() ? { line2: form.line2.trim() } : editingId ? { line2: "" } : {}),
      city,
      state,
      postalCode,
      country,
      isDefault: form.isDefault,
      ...(form.latitude !== null && form.longitude !== null
        ? { latitude: form.latitude, longitude: form.longitude }
        : {}),
    };

    try {
      if (editingId) {
        await updateAddress({ addressId: editingId, body }).unwrap();
        toast.success("Address updated");
      } else {
        await addAddress(body).unwrap();
        toast.success("Address added");
      }
      setEditingId(null);
      setView("list");
    } catch {
      // error toast is shown globally in apiSlice
    }
  }

  return (
    <Modal
      open
      onClose={onClose}
      title={view === "form" ? (editingId ? "Edit address" : "Add new address") : "Manage address"}
      size="md"
    >
      {view === "list" ? (
        <div className="space-y-5">
          <button
            type="button"
            onClick={openForm}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-[var(--gold)] px-6 py-3.5 text-[16px] font-semibold text-[var(--gold-bright)] hover:bg-[var(--gold)] hover:text-white"
          >
            <Plus size={18} />
            Add new address
          </button>

          {isLoading ? (
            <ListSkeleton />
          ) : isError ? (
            <div className="rounded-2xl border border-[var(--line)] p-5 text-center">
              <p className="text-[15px] text-[var(--ink-soft)]">
                We couldn&apos;t load your addresses.
              </p>
              <button
                type="button"
                onClick={() => refetch()}
                className="mt-3 text-[15px] font-semibold text-[var(--gold)] underline-offset-4 hover:underline"
              >
                Try again
              </button>
            </div>
          ) : addresses.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-[var(--line)] p-6 text-center text-[15px] text-[var(--ink-soft)]">
              No saved addresses yet. Add one to use it for pickups and
              deliveries.
            </p>
          ) : (
            <ul className="space-y-3">
              {addresses.map((addr, i) => {
                const [l1, l2, l3] = formatLines(addr);
                const busy = pendingId === addr.id;
                return (
                  <li
                    key={addr.id ?? i}
                    className={`flex gap-4 rounded-2xl border p-4 ${
                      addr.isDefault
                        ? "border-[var(--gold)] bg-[var(--gold)]/8"
                        : "border-[var(--line)]"
                    }`}
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--gold)]/12 text-[var(--gold-bright)]">
                      <MapPin size={19} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-[16px] font-semibold">
                          {addr.label}
                        </p>
                        {addr.isDefault && (
                          <span className="rounded-full bg-[var(--gold)] px-2.5 py-0.5 text-[12px] font-semibold text-white">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-[14px] leading-relaxed text-[var(--ink-soft)]">
                        {l1}
                        <br />
                        {l2}
                        <br />
                        {l3}
                      </p>
                      {confirmDeleteId === addr.id ? (
                        <div className="mt-3 rounded-xl bg-red-600/10 p-3">
                          <p className="text-[14px] font-medium text-[var(--ink)]">
                            Delete this address?
                          </p>
                          <div className="mt-2 flex gap-4">
                            <button
                              type="button"
                              onClick={() => handleDelete(addr)}
                              disabled={pendingId !== null}
                              className="text-[14px] font-semibold text-red-600 underline-offset-4 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {busy ? "Deleting…" : "Yes, delete"}
                            </button>
                            <button
                              type="button"
                              onClick={() => setConfirmDeleteId(null)}
                              disabled={busy}
                              className="text-[14px] font-semibold text-[var(--ink-soft)] underline-offset-4 hover:underline"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-2 flex gap-4">
                          <button
                            type="button"
                            onClick={() => openEdit(addr)}
                            disabled={pendingId !== null}
                            className="inline-flex items-center gap-1 text-[14px] font-semibold text-[var(--ink)] underline-offset-4 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <Pencil size={13} />
                            Edit
                          </button>
                          {!addr.isDefault && (
                            <button
                              type="button"
                              onClick={() => handleMakeDefault(addr)}
                              disabled={pendingId !== null}
                              className="text-[14px] font-semibold text-[var(--gold)] underline-offset-4 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {busy ? "Updating…" : "Make default"}
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteId(addr.id ?? null)}
                            disabled={pendingId !== null}
                            className="text-[14px] font-semibold text-red-600 underline-offset-4 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-3">
            <button
              type="button"
              onClick={handleUseCurrentLocation}
              disabled={locating || saving}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-[var(--gold)] px-6 py-3 text-[15px] font-semibold text-[var(--gold-bright)] hover:bg-[var(--gold)] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              <LocateFixed size={18} />
              {locating ? "Getting your location..." : "Use my current location"}
            </button>

            <LocationPicker
              value={
                form.latitude !== null && form.longitude !== null
                  ? { lat: form.latitude, lng: form.longitude }
                  : null
              }
              onPick={(lat, lng) => void applyLocation(lat, lng)}
            />

            <p className="text-[13px] text-[var(--ink-soft)]" aria-live="polite">
              {resolving
                ? "Fetching address for this spot..."
                : form.latitude !== null
                  ? "Pin set. Drag it to adjust, and edit the details below if needed."
                  : "Tap the map to drop a pin, or use your current location. The address fills in automatically."}
            </p>
          </div>

          <div>
            <label htmlFor="addr-label" className={labelClass}>
              Label
            </label>
            <input
              id="addr-label"
              value={form.label}
              onChange={(e) => set("label", e.target.value)}
              placeholder="Home, Work…"
              maxLength={30}
              required
              className={inputClass}
            />
            <div className="mt-2 flex gap-2">
              {LABEL_SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => set("label", s)}
                  className={`rounded-full border px-3.5 py-1 text-[13px] font-medium ${
                    form.label === s
                      ? "border-[var(--gold)] bg-[var(--gold)] text-white"
                      : "border-[var(--line)] text-[var(--ink-soft)] hover:text-[var(--ink)]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="addr-line1" className={labelClass}>
              Address line 1
            </label>
            <input
              id="addr-line1"
              value={form.line1}
              onChange={(e) => set("line1", e.target.value)}
              placeholder="House no., street"
              autoComplete="address-line1"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="addr-line2" className={labelClass}>
              Address line 2{" "}
              <span className="font-normal text-[var(--ink-soft)]">
                (optional)
              </span>
            </label>
            <input
              id="addr-line2"
              value={form.line2}
              onChange={(e) => set("line2", e.target.value)}
              placeholder="Landmark, area"
              autoComplete="address-line2"
              className={inputClass}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="addr-city" className={labelClass}>
                City
              </label>
              <input
                id="addr-city"
                value={form.city}
                onChange={(e) => set("city", e.target.value)}
                autoComplete="address-level2"
                required
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="addr-state" className={labelClass}>
                State
              </label>
              <input
                id="addr-state"
                value={form.state}
                onChange={(e) => set("state", e.target.value)}
                autoComplete="address-level1"
                required
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="addr-postal" className={labelClass}>
                PIN code
              </label>
              <input
                id="addr-postal"
                value={form.postalCode}
                onChange={(e) =>
                  set(
                    "postalCode",
                    e.target.value.replace(/[^\dA-Za-z -]/g, "").slice(0, 10),
                  )
                }
                inputMode="numeric"
                autoComplete="postal-code"
                required
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="addr-country" className={labelClass}>
                Country
              </label>
              <input
                id="addr-country"
                value={form.country}
                onChange={(e) => set("country", e.target.value)}
                autoComplete="country-name"
                required
                className={inputClass}
              />
            </div>
          </div>

          <label className="flex cursor-pointer items-center gap-3 text-[15px]">
            <input
              type="checkbox"
              checked={form.isDefault}
              onChange={(e) => set("isDefault", e.target.checked)}
              className="h-4 w-4 accent-[var(--gold)]"
            />
            Set as default address
          </label>

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row">
            <button
              type="button"
              onClick={() => { setEditingId(null); setView("list"); }}
              disabled={saving || updating}
              className={secondaryBtnClass}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || updating || resolving}
              className={primaryBtnClass}
            >
              {saving || updating ? "Saving..." : editingId ? "Update address" : "Save address"}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}