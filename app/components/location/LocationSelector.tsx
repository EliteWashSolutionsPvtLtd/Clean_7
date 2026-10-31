"use client";

import { ChevronDown, MapPin, MapPinOff } from "lucide-react";

import Modal, { secondaryBtnClass } from "@/app/components/ui/modals/Modal";
import { primaryBtnClass } from "@/app/components/auth/styles";
import { useLocationSelector } from "@/app/hooks/useLocationSelector";
import LocationModal from "./LocationModal";

/**
 * Location chip for the top of the home page (web version of the app's
 * header location). Tap → "Select Location" modal.
 */
export default function LocationSelector({ className = "" }: { className?: string }) {
  const loc = useLocationSelector();
  const showSkeleton = !loc.isReady || loc.isDetecting;

  return (
    <div className={className}>
      <button
        type="button"
        onClick={loc.openModal}
        aria-haspopup="dialog"
        aria-label={`Location: ${loc.currentLocation.tag}, ${loc.currentLocation.address}. Change location`}
        className="inline-flex max-w-full items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--card)] px-4 py-2.5 text-left text-[15px] hover:border-[var(--gold)] sm:max-w-[440px]"
      >
        <MapPin size={18} className="shrink-0 text-[var(--gold)]" />
        <span className="flex min-w-0 items-center gap-1.5">
          <span className="shrink-0 font-semibold text-[var(--gold-bright)]">
            {loc.currentLocation.tag}
          </span>
          <span className="shrink-0 text-[var(--ink-soft)]">—</span>
          {showSkeleton ? (
            <span
              role="status"
              aria-label="Detecting location"
              className="block h-3.5 w-28 rounded bg-[var(--ink)]/10"
            />
          ) : (
            <span className="truncate text-[var(--ink)]">{loc.currentLocation.address}</span>
          )}
        </span>
        <ChevronDown size={20} className="shrink-0 text-[var(--gold)]" />
      </button>

      {loc.isModalOpen && (
        <LocationModal
          locations={loc.locations}
          currentId={loc.currentLocation.id}
          isDetecting={loc.isDetecting}
          savedLoading={loc.savedAddressesLoading}
          savedCount={loc.savedCount}
          onUseCurrent={() => void loc.detect(true)}
          onSelect={loc.handleSelectLocation}
          onSave={loc.saveAddress}
          onClose={loc.closeModal}
        />
      )}

      <Modal
        open={loc.isPermissionDialogOpen}
        onClose={loc.closePermissionDialog}
        title="Location Access Needed"
        size="sm"
      >
        <div className="space-y-5 text-center">
          <MapPinOff size={48} className="mx-auto text-[var(--gold)]" />
          <p className="text-[15px] leading-relaxed text-[var(--ink-soft)]">
            Clean7 uses your location to detect your pickup and delivery address.
            You can allow access in your browser, or select your location manually.
          </p>
          {loc.permissionBlocked && (
            <p
              role="alert"
              className="rounded-xl bg-[var(--gold)]/10 px-4 py-3 text-left text-[14px] text-[var(--ink)]"
            >
              Location is blocked for this site. Click the lock icon next to the
              web address, set Location to Allow, then press Enable again.
            </p>
          )}
          <div className="space-y-3">
            <button type="button" onClick={() => void loc.handleEnablePermission()} className={primaryBtnClass}>
              Enable
            </button>
            <button type="button" onClick={loc.handleManualLocation} className={secondaryBtnClass}>
              Select location manually
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
