// "use client";

// import { useCallback, useState } from "react";
// import Link from "next/link";
// import { MapPinOff } from "lucide-react";

// import Modal from "@/app/components/ui/modals/Modal";
// import { primaryBtnClass } from "@/app/components/auth/styles";
// import { useGetAddressesQuery, type Address } from "@/redux/api/profileApi";
// import {
//   readServiceability,
//   useLazyCheckServiceabilityQuery,
// } from "@/redux/api/catalogApi";

// type Block =
//   | { kind: "no-address" }
//   | { kind: "no-location"; address: Address }
//   | { kind: "not-serviceable"; address: Address };

// const addrText = (a: Address) =>
//   [a.line1, a.city, a.postalCode].filter(Boolean).join(", ");

// /**
//  * "Continue to booking" guard. Checks the user's (default) address with
//  * GET /branches/serviceability BEFORE going to checkout:
//  *   serviceable        → runs onOk (go to checkout)
//  *   not serviceable    → stays on the page and shows a modal
//  *   no address / no map location → same modal with the matching message
//  * If the check itself fails (network etc.) we let the user through - checkout
//  * checks again, same as the mobile app (it only blocks on an explicit "no").
//  */
// export function useServiceabilityGate() {
//   const { data: addrRes } = useGetAddressesQuery();
//   const [checkArea] = useLazyCheckServiceabilityQuery();
//   const [checking, setChecking] = useState(false);
//   const [block, setBlock] = useState<Block | null>(null);

//   const run = useCallback(
//     async (onOk: () => void) => {
//       if (checking) return;
//       const list = Array.isArray(addrRes?.data) ? addrRes.data : [];
//       const address = list.find((a) => a.isDefault) ?? list[0];

//       if (!address) return setBlock({ kind: "no-address" });
//       if (
//         typeof address.latitude !== "number" ||
//         typeof address.longitude !== "number"
//       ) {
//         return setBlock({ kind: "no-location", address });
//       }

//       setChecking(true);
//       try {
//         const res = await checkArea(
//           { latitude: address.latitude, longitude: address.longitude },
//           true, // use cached result for the same coordinates
//         );
//         if (res.data && !readServiceability(res.data).serviceable) {
//           setBlock({ kind: "not-serviceable", address });
//           return;
//         }
//       } catch {
//         /* let checkout re-check */
//       } finally {
//         setChecking(false);
//       }
//       onOk();
//     },
//     [addrRes, checkArea, checking],
//   );

//   const close = () => setBlock(null);

//   const gateModal = (
//     <Modal
//       open={!!block}
//       onClose={close}
//       title={
//         block?.kind === "no-address"
//           ? "Add your address"
//           : block?.kind === "no-location"
//             ? "Location missing"
//             : "Location not serviceable"
//       }
//       size="sm"
//     >
//       <div className="text-center">
//         <MapPinOff size={44} className="mx-auto text-[var(--gold)]" />
//         <p className="mt-4 text-[15px] leading-[1.6] text-[var(--ink-soft)]">
//           {block?.kind === "no-address" &&
//             "Please add a service address so we can check if we serve your area."}
//           {block?.kind === "no-location" &&
//             `Your address (${addrText(block.address)}) has no map location. Please edit it and pin the location.`}
//           {block?.kind === "not-serviceable" && (
//             <>
//               Sorry, we don&apos;t serve{" "}
//               <b className="text-[var(--ink)]">{addrText(block.address)}</b>{" "}
//               yet. You can change your address and try again.
//             </>
//           )}
//         </p>
//         <Link
//           href="/profile"
//           onClick={close}
//           className={`${primaryBtnClass} mt-6 block text-center`}
//         >
//           {block?.kind === "no-address" ? "Add address" : "Change address"}
//         </Link>
//         <button
//           type="button"
//           onClick={close}
//           className="mt-3 text-[14px] font-medium text-[var(--ink-soft)] hover:text-[var(--ink)]"
//         >
//           Close
//         </button>
//       </div>
//     </Modal>
//   );

//   return { run, checking, gateModal };
// }


"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { MapPinOff } from "lucide-react";

import Modal from "@/app/components/ui/modals/Modal";
import { primaryBtnClass } from "@/app/components/auth/styles";
import { useGetAddressesQuery, type Address } from "@/redux/api/profileApi";
import {
  readServiceability,
  useLazyCheckServiceabilityQuery,
} from "@/redux/api/catalogApi";
import { setCartBranch } from "@/app/lib/cart";

type Block =
  | { kind: "no-address" }
  | { kind: "no-location"; address: Address }
  | { kind: "not-serviceable"; address: Address }
  // browser-location mode (public Pricing page)
  | { kind: "geo-unavailable" }
  | { kind: "geo-not-serviceable" };

/** Current device location (rejects if denied / unsupported / timed out). */
const getBrowserPosition = () =>
  new Promise<GeolocationPosition>((resolve, reject) => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      reject(new Error("unsupported"));
      return;
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      timeout: 10000,
    });
  });

const addrText = (a: Address) =>
  [a.line1, a.city, a.postalCode].filter(Boolean).join(", ");

/**
 * "Continue to booking" guard. Checks the user's (default) address with
 * GET /branches/serviceability BEFORE going to checkout:
 *   serviceable        → runs onOk (go to checkout)
 *   not serviceable    → stays on the page and shows a modal
 *   no address / no map location → same modal with the matching message
 * If the check itself fails (network etc.) we let the user through - checkout
 * checks again, same as the mobile app (it only blocks on an explicit "no").
 *
 * With { useBrowserLocation: true } (Pricing page) it checks the device's current
 * location first; if location permission is off/unavailable it falls back to the
 * customer's saved (default) address, exactly like the service page.
 */
export function useServiceabilityGate(
  { useBrowserLocation = false }: { useBrowserLocation?: boolean } = {},
) {
  const { data: addrRes } = useGetAddressesQuery();
  const [checkArea] = useLazyCheckServiceabilityQuery();
  const [checking, setChecking] = useState(false);
  const [block, setBlock] = useState<Block | null>(null);

  const run = useCallback(
    async (onOk: () => void) => {
      if (checking) return;

      if (useBrowserLocation) {
        setChecking(true);
        let pos: GeolocationPosition | null = null;
        try {
          pos = await getBrowserPosition();
        } catch {
          // Permission denied / unavailable (common on desktop) → fall back
          // to the customer's saved delivery address below.
          pos = null;
        }
        if (pos) {
          let branch: string | undefined;
          try {
            const res = await checkArea(
              {
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
              },
              true,
            );
            if (res.data && !readServiceability(res.data).serviceable) {
              setBlock({ kind: "geo-not-serviceable" });
              return;
            }
            branch = readServiceability(res.data).branchId;
          } catch {
            /* let checkout re-check */
          } finally {
            setChecking(false);
          }
          setCartBranch(branch); // nearest branch → saved on the cart like the app
          onOk();
          return;
        }
        setChecking(false);
      }

      const list = Array.isArray(addrRes?.data) ? addrRes.data : [];
      const address = list.find((a) => a.isDefault) ?? list[0];

      if (!address) return setBlock({ kind: "no-address" });
      if (
        typeof address.latitude !== "number" ||
        typeof address.longitude !== "number"
      ) {
        return setBlock({ kind: "no-location", address });
      }

      setChecking(true);
      let branch: string | undefined;
      try {
        const res = await checkArea(
          { latitude: address.latitude, longitude: address.longitude },
          true, // use cached result for the same coordinates
        );
        if (res.data && !readServiceability(res.data).serviceable) {
          setBlock({ kind: "not-serviceable", address });
          return;
        }
        branch = readServiceability(res.data).branchId;
      } catch {
        /* let checkout re-check */
      } finally {
        setChecking(false);
      }
      setCartBranch(branch); // nearest branch → saved on the cart like the app
      onOk();
    },
    [addrRes, checkArea, checking, useBrowserLocation],
  );

  const close = () => setBlock(null);

  const gateModal = (
    <Modal
      open={!!block}
      onClose={close}
      title={
        block?.kind === "no-address"
          ? "Add your address"
          : block?.kind === "no-location"
            ? "Location missing"
            : block?.kind === "geo-unavailable"
              ? "Location needed"
              : "Location not serviceable"
      }
      size="sm"
    >
      <div className="text-center">
        <MapPinOff size={44} className="mx-auto text-[var(--gold)]" />
        <p className="mt-4 text-[15px] leading-[1.6] text-[var(--ink-soft)]">
          {block?.kind === "no-address" &&
            "Please add a service address so we can check if we serve your area."}
          {block?.kind === "no-location" &&
            `Your address (${addrText(block.address)}) has no map location. Please edit it and pin the location.`}
          {block?.kind === "geo-unavailable" &&
            "We couldn't get your current location. Please allow location access in your browser and try again."}
          {block?.kind === "geo-not-serviceable" &&
            "Sorry, we don't serve your current location yet."}
          {block?.kind === "not-serviceable" && (
            <>
              Sorry, we don&apos;t serve{" "}
              <b className="text-[var(--ink)]">{addrText(block.address)}</b>{" "}
              yet. You can change your address and try again.
            </>
          )}
        </p>
        {block?.kind === "geo-unavailable" ||
        block?.kind === "geo-not-serviceable" ? (
          <button
            type="button"
            onClick={close}
            className={`${primaryBtnClass} mt-6 block w-full text-center`}
          >
            Close
          </button>
        ) : (
          <>
            <Link
              href="/profile"
              onClick={close}
              className={`${primaryBtnClass} mt-6 block text-center`}
            >
              {block?.kind === "no-address" ? "Add address" : "Change address"}
            </Link>
            <button
              type="button"
              onClick={close}
              className="mt-3 text-[14px] font-medium text-[var(--ink-soft)] hover:text-[var(--ink)]"
            >
              Close
            </button>
          </>
        )}
      </div>
    </Modal>
  );

  return { run, checking, gateModal };
}