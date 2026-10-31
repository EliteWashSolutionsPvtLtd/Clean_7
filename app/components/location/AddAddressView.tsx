"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { LocateFixed } from "lucide-react";

import { secondaryBtnClass } from "@/app/components/ui/modals/Modal";
import {
  inputClass,
  labelClass,
  primaryBtnClass,
} from "@/app/components/auth/styles";
import LocationPicker from "@/app/(pages)/profile/LocationPicker";
import { reverseGeocode } from "@/app/lib/geocode";
import type { NewLocalAddress } from "@/redux/slices/locationSlice";

const LABEL_SUGGESTIONS = ["Home", "Work", "Other"];
const round6 = (n: number) => Math.round(n * 1e6) / 1e6;

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

/** "Add New Address" step of the Select Location modal. */
export default function AddAddressView({
  isFirstAddress,
  onCancel,
  onSave,
}: {
  isFirstAddress: boolean;
  onCancel: () => void;
  onSave: (body: NewLocalAddress) => Promise<void>;
}) {
  const [form, setForm] = useState<FormState>({
    label: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    isDefault: isFirstAddress,
    latitude: null,
    longitude: null,
  });
  const [locating, setLocating] = useState(false);
  const [resolving, setResolving] = useState(false);
  const [saving, setSaving] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => () => abortRef.current?.abort(), []);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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

    setSaving(true);
    try {
      await onSave({
        label,
        line1,
        ...(form.line2.trim() ? { line2: form.line2.trim() } : {}),
        city,
        state,
        postalCode,
        country,
        isDefault: form.isDefault,
        ...(form.latitude !== null && form.longitude !== null
          ? { latitude: form.latitude, longitude: form.longitude }
          : {}),
      });
    } catch {
      // error toast is shown globally in apiSlice
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        <label htmlFor="loc-addr-label" className={labelClass}>Label</label>
        <input
          id="loc-addr-label"
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
        <label htmlFor="loc-addr-line1" className={labelClass}>Address line 1</label>
        <input
          id="loc-addr-line1"
          value={form.line1}
          onChange={(e) => set("line1", e.target.value)}
          placeholder="House no., street"
          autoComplete="address-line1"
          required
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="loc-addr-line2" className={labelClass}>
          Address line 2{" "}
          <span className="font-normal text-[var(--ink-soft)]">(optional)</span>
        </label>
        <input
          id="loc-addr-line2"
          value={form.line2}
          onChange={(e) => set("line2", e.target.value)}
          placeholder="Landmark, area"
          autoComplete="address-line2"
          className={inputClass}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="loc-addr-city" className={labelClass}>City</label>
          <input
            id="loc-addr-city"
            value={form.city}
            onChange={(e) => set("city", e.target.value)}
            autoComplete="address-level2"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="loc-addr-state" className={labelClass}>State</label>
          <input
            id="loc-addr-state"
            value={form.state}
            onChange={(e) => set("state", e.target.value)}
            autoComplete="address-level1"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="loc-addr-postal" className={labelClass}>PIN code</label>
          <input
            id="loc-addr-postal"
            value={form.postalCode}
            onChange={(e) =>
              set("postalCode", e.target.value.replace(/[^\dA-Za-z -]/g, "").slice(0, 10))
            }
            inputMode="numeric"
            autoComplete="postal-code"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="loc-addr-country" className={labelClass}>Country</label>
          <input
            id="loc-addr-country"
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
        <button type="button" onClick={onCancel} disabled={saving} className={secondaryBtnClass}>
          Cancel
        </button>
        <button type="submit" disabled={saving || resolving} className={primaryBtnClass}>
          {saving ? "Saving..." : "Save address"}
        </button>
      </div>
    </form>
  );
}
