"use client";

import { useState } from "react";
import {
  Building2,
  ChevronRight,
  Dumbbell,
  HeartHandshake,
  House,
  LocateFixed,
  MapPin,
  MapPinOff,
  Plus,
  Users,
  type LucideIcon,
} from "lucide-react";

import Modal, { secondaryBtnClass } from "@/app/components/ui/modals/Modal";
import AddAddressView from "./AddAddressView";
import type { LocationItem } from "@/app/hooks/useLocationSelector";
import type { NewLocalAddress } from "@/redux/slices/locationSlice";

const TAG_ICONS: Record<string, LucideIcon> = {
  Home: House,
  Work: Building2,
  Gym: Dumbbell,
  Parents: Users,
  Friend: HeartHandshake,
  Current: LocateFixed,
  Other: MapPin,
};

/* static skeleton rows while saved addresses load (no pulse — minimal motion) */
function ListSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading addresses" className="space-y-2">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex items-center gap-4 rounded-2xl border border-[var(--line)] p-4">
          <div className="h-10 w-10 shrink-0 rounded-full bg-[var(--ink)]/10" />
          <div className="w-full space-y-2">
            <div className="h-4 w-20 rounded-lg bg-[var(--ink)]/10" />
            <div className="h-3.5 w-3/4 rounded-lg bg-[var(--ink)]/10" />
          </div>
        </div>
      ))}
    </div>
  );
}

interface Props {
  locations: LocationItem[];
  currentId: string | null;
  isDetecting: boolean;
  savedLoading: boolean;
  savedCount: number;
  onUseCurrent: () => void;
  onSelect: (id: string | null) => void;
  onSave: (body: NewLocalAddress) => Promise<void>;
  onClose: () => void;
}

/** "Select Location" modal — same sections as the app's bottom sheet. */
export default function LocationModal({
  locations,
  currentId,
  isDetecting,
  savedLoading,
  savedCount,
  onUseCurrent,
  onSelect,
  onSave,
  onClose,
}: Props) {
  const [view, setView] = useState<"list" | "add">("list");

  return (
    <Modal
      open
      onClose={onClose}
      title={view === "add" ? "Add New Address" : "Select Location"}
      size="md"
    >
      {view === "add" ? (
        <AddAddressView
          isFirstAddress={savedCount === 0}
          onCancel={() => setView("list")}
          onSave={async (body) => {
            await onSave(body);
            onClose();
          }}
        />
      ) : (
        <div className="space-y-3">
          {/* Use Current Location */}
          <button
            type="button"
            onClick={onUseCurrent}
            disabled={isDetecting}
            className="flex w-full items-center gap-4 rounded-2xl border border-[var(--line)] p-4 text-left hover:border-[var(--gold)] disabled:cursor-not-allowed disabled:opacity-70"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--gold)]/12 text-[var(--gold)]">
              <MapPin size={22} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[16px] font-semibold">
                {isDetecting ? "Detecting Location..." : "Use Current Location"}
              </span>
              {isDetecting ? (
                <span aria-hidden="true" className="mt-1.5 block h-3 w-32 rounded bg-[var(--ink)]/10" />
              ) : (
                <span className="block text-[14px] text-[var(--ink-soft)]">
                  Detect your current address
                </span>
              )}
            </span>
            <ChevronRight size={22} className="shrink-0 text-[var(--ink-soft)]" />
          </button>

          {/* Add New Address */}
          <button
            type="button"
            onClick={() => setView("add")}
            className="flex w-full items-center gap-4 rounded-2xl border border-[var(--line)] p-4 text-left hover:border-[var(--gold)]"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--gold)]/12 text-[var(--gold)]">
              <Plus size={22} />
            </span>
            <span className="flex-1 text-[16px] font-semibold">Add New Address</span>
            <ChevronRight size={22} className="shrink-0 text-[var(--ink-soft)]" />
          </button>

          {/* Saved Addresses */}
          <h3 className="pt-3 text-[13px] font-semibold uppercase tracking-wide text-[var(--ink-soft)]">
            Saved Addresses
          </h3>

          {savedLoading ? (
            <ListSkeleton />
          ) : locations.length === 0 ? (
            <div className="flex flex-col items-center gap-1 rounded-2xl border border-dashed border-[var(--line)] p-6 text-center">
              <MapPinOff size={32} className="text-[var(--ink-soft)]" />
              <p className="text-[15px] font-semibold">No saved addresses</p>
              <p className="text-[14px] text-[var(--ink-soft)]">Add an address to get started</p>
            </div>
          ) : (
            <ul className="space-y-2">
              {locations.map((loc) => {
                const selected = currentId === loc.id;
                const Icon = TAG_ICONS[loc.tag] ?? MapPin;
                return (
                  <li key={loc.id}>
                    <button
                      type="button"
                      onClick={() => onSelect(loc.id)}
                      aria-current={selected ? "true" : undefined}
                      className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left ${
                        selected
                          ? "border-[var(--gold)] bg-[var(--gold)] text-white"
                          : "border-[var(--line)] hover:border-[var(--gold)]"
                      }`}
                    >
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                          selected
                            ? "bg-white/25 text-white"
                            : loc.tag === "Home" || loc.tag === "Current"
                              ? "bg-[var(--gold)]/12 text-[var(--gold)]"
                              : "bg-[var(--ink)]/8 text-[var(--ink-soft)]"
                        }`}
                      >
                        <Icon size={22} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <span className="text-[16px] font-semibold">{loc.tag}</span>
                          {loc.isDefault && (
                            <span
                              className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                                selected
                                  ? "bg-white/25 text-white"
                                  : "bg-[var(--gold)]/15 text-[var(--gold-bright)]"
                              }`}
                            >
                              Default
                            </span>
                          )}
                        </span>
                        <span
                          className={`block truncate text-[14px] ${
                            selected ? "text-white/85" : "text-[var(--ink-soft)]"
                          }`}
                        >
                          {loc.address}
                        </span>
                      </span>
                      <ChevronRight
                        size={22}
                        className={`shrink-0 ${selected ? "text-white/70" : "text-[var(--ink-soft)]"}`}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          <button type="button" onClick={onClose} className={`${secondaryBtnClass} mt-2`}>
            Close
          </button>
        </div>
      )}
    </Modal>
  );
}
