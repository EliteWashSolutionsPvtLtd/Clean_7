"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  profileApi,
  useAddAddressMutation,
  useGetAddressesQuery,
  type Address,
} from "@/redux/api/profileApi";
import {
  useLazyCheckServiceabilityQuery,
  type Serviceability,
} from "@/redux/api/catalogApi";
import {
  addLocalAddress,
  hydrateLocation,
  markLocationInit,
  setDetected,
  setSelectedId,
  setServiceability,
  type LocalAddress,
  type NewLocalAddress,
} from "@/redux/slices/locationSlice";
import { loadLocalAddresses } from "@/lib//locationStorage";
import { reverseGeocode } from "@/app/lib/geocode";
import { isSameLocationOrAddress } from "@/app/lib/addressUtils";

/* ---------- types ---------- */

export interface LocationItem {
  id: string | null;
  tag: string;
  address: string;
  isDefault: boolean;
  latitude: number | null;
  longitude: number | null;
}

type PermissionStateLite = "granted" | "prompt" | "denied" | "unknown";

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

const addressText = (a: {
  line1: string;
  city: string;
  postalCode: string;
}) => `${a.line1}, ${a.city} ${a.postalCode}`.trim();

const fromApi = (a: Address): LocationItem => ({
  id: a.id ?? null,
  tag: a.label,
  address: addressText(a),
  isDefault: !!a.isDefault,
  latitude: typeof a.latitude === "number" ? a.latitude : null,
  longitude: typeof a.longitude === "number" ? a.longitude : null,
});

const fromLocal = (a: LocalAddress): LocationItem => ({
  id: a.id,
  tag: a.label,
  address: addressText(a),
  isDefault: a.isDefault,
  latitude: a.latitude ?? null,
  longitude: a.longitude ?? null,
});

function getPosition() {
  return new Promise<GeolocationPosition>((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 60000,
    }),
  );
}

async function getPermissionState(): Promise<PermissionStateLite> {
  try {
    const status = await navigator.permissions?.query({
      name: "geolocation" as PermissionName,
    });
    return status ? status.state : "unknown";
  } catch {
    return "unknown";
  }
}

// /branches/serviceability → { isServiceable, nearbyBranches: [{ id, name }] }
function readServiceabilityResponse(data: Serviceability | undefined) {
  const d = (data ?? {}) as Serviceability & {
    nearbyBranches?: { id?: string; name?: string }[];
  };
  const nearest = Array.isArray(d.nearbyBranches)
    ? d.nearbyBranches[0]
    : undefined;
  const branchId = d.branchId ?? d.branch?.id ?? nearest?.id;
  const flag = d.isServiceable ?? d.serviceable;
  return {
    isServiceable: typeof flag === "boolean" ? flag : !!branchId,
    branchId,
    branchName:
      typeof d.branch?.name === "string" ? d.branch.name : nearest?.name,
    message: typeof d.message === "string" ? d.message : undefined,
  };
}

/* ---------- hook ---------- */

/**
 * Home-page location logic (port of the Clean7 app's home header):
 *  - detects the browser location, reverse-geocodes it, matches it against
 *    saved addresses (or shows it as "Current"),
 *  - auto-saves the first detected address as "Home",
 *  - checks serviceability for the selected location,
 *  - drives the Select Location modal + the "Location Access Needed" dialog.
 */
export function useLocationSelector() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  const authHydrated = useAppSelector((s) => s.auth.hydrated);
  const {
    localAddresses,
    detected,
    selectedId,
    hydrated,
    initDone,
    serviceability,
  } = useAppSelector((s) => s.location);

  const { data: addrRes, isLoading: addressesLoading } = useGetAddressesQuery(
    undefined,
    { skip: !isAuthenticated },
  );
  const [addAddressApi] = useAddAddressMutation();
  const [checkArea] = useLazyCheckServiceabilityQuery();

  const [isModalOpen, setModalOpen] = useState(false);
  const [isPermissionDialogOpen, setPermissionDialogOpen] = useState(false);
  const [permissionBlocked, setPermissionBlocked] = useState(false);
  const [isDetecting, setDetecting] = useState(false);

  const detectingRef = useRef(false);
  const hasAutoCreated = useRef(false);
  const lastCheckedKey = useRef<string | null>(null);
  const lastDetectAt = useRef(0);

  const apiAddresses = useMemo(() => toAddressList(addrRes), [addrRes]);

  /* ----- derived list (same shape as the app) ----- */

  const locations = useMemo<LocationItem[]>(() => {
    const saved = isAuthenticated
      ? apiAddresses.map(fromApi)
      : localAddresses.map(fromLocal);
    if (!detected) return saved;
    return [
      {
        id: "current",
        tag: "Current",
        address: detected.address,
        isDefault: false,
        latitude: detected.latitude,
        longitude: detected.longitude,
      },
      ...saved,
    ];
  }, [isAuthenticated, apiAddresses, localAddresses, detected]);

  const savedCount = locations.filter((l) => l.id !== "current").length;

  const currentLocation = useMemo<LocationItem>(() => {
    if (selectedId) {
      const selected = locations.find((l) => l.id === selectedId);
      if (selected) return selected;
    }
    const def = locations.find((l) => l.isDefault);
    if (def) return def;
    if (locations.length > 0) return locations[0];
    return {
      id: null,
      tag: "Location",
      address: "Add an address",
      isDefault: false,
      latitude: null,
      longitude: null,
    };
  }, [locations, selectedId]);

  // Latest values for async callbacks
  const latest = useRef({ isAuthenticated, localAddresses, savedCount, selectedId });
  useEffect(() => {
    latest.current = { isAuthenticated, localAddresses, savedCount, selectedId };
  });

  /* ----- serviceability ----- */

  const syncServiceability = useCallback(
    async (lat: number | null | undefined, lng: number | null | undefined) => {
      if (typeof lat !== "number" || typeof lng !== "number") return;
      const key = `${lat.toFixed(6)}:${lng.toFixed(6)}`;
      if (lastCheckedKey.current === key) return;
      lastCheckedKey.current = key;

      dispatch(setServiceability({ status: "checking", isServiceable: null }));
      try {
        const res = await checkArea(
          { latitude: lat, longitude: lng },
          true,
        ).unwrap();
        dispatch(
          setServiceability({
            status: "done",
            ...readServiceabilityResponse(res?.data),
          }),
        );
      } catch {
        lastCheckedKey.current = null; // allow a retry
        dispatch(setServiceability({ status: "error", isServiceable: null }));
      }
    },
    [checkArea, dispatch],
  );

  /* ----- detection ----- */

  const detect = useCallback(
    async (userInitiated = false) => {
      if (detectingRef.current) return;
      if (typeof navigator === "undefined" || !navigator.geolocation) {
        if (userInitiated) {
          toast.error("Your browser doesn't support location. Select an address instead.");
        }
        return;
      }

      detectingRef.current = true;
      setDetecting(true);
      lastDetectAt.current = Date.now();

      try {
        let position: GeolocationPosition;
        try {
          position = await getPosition();
        } catch (err) {
          if ((err as GeolocationPositionError)?.code === 1) {
            setPermissionDialogOpen(true); // PERMISSION_DENIED
          } else if (userInitiated) {
            toast.error("Couldn't get your location. Try again or select an address.");
          }
          return;
        }
        setPermissionDialogOpen(false);
        setPermissionBlocked(false);

        const { latitude, longitude } = position.coords;
        const geo = await reverseGeocode(latitude, longitude).catch(() => null);
        if (!geo) {
          if (userInitiated) toast.error("Couldn't read an address for your location.");
          return;
        }

        const city = geo.city;
        const state = geo.state;
        const addressString =
          [city, state].filter(Boolean).join(", ") ||
          geo.line1 ||
          "Current Location";
        const line1 = geo.line1 || geo.line2 || city || "Current Location";
        const area = geo.line2 || city;

        const data: NewLocalAddress = {
          label: "Home",
          line1,
          line2: area && area !== line1 ? area : undefined,
          city,
          state: state || city,
          postalCode: geo.postalCode || "000000",
          country: geo.country || "India",
          latitude,
          longitude,
          isDefault: true,
        };

        // Existing saved addresses
        let existing: Pick<Address, "line1" | "city" | "postalCode" | "latitude" | "longitude" | "id">[] =
          latest.current.localAddresses;
        let listOk = true;
        if (latest.current.isAuthenticated) {
          const sub = dispatch(profileApi.endpoints.getAddresses.initiate(undefined));
          try {
            existing = toAddressList(await sub.unwrap());
          } catch {
            listOk = false;
            existing = [];
          } finally {
            sub.unsubscribe();
          }
        }

        const match = existing.find((a) => isSameLocationOrAddress(a, data));
        if (match?.id) {
          dispatch(setSelectedId(match.id));
          dispatch(setDetected(null));
          await syncServiceability(match.latitude ?? latitude, match.longitude ?? longitude);
          return;
        }

        dispatch(setDetected({ address: addressString, latitude, longitude }));
        dispatch(setSelectedId("current"));
        await syncServiceability(latitude, longitude);

        // First ever address → save it as "Home" automatically
        if (listOk && existing.length === 0 && !hasAutoCreated.current && city) {
          hasAutoCreated.current = true;
          if (latest.current.isAuthenticated) {
            try {
              const created = await addAddressApi(data).unwrap();
              const id = created?.data?.id;
              if (id) {
                dispatch(setSelectedId(id));
                dispatch(setDetected(null));
              }
            } catch {
              /* error toast is shown globally in apiSlice */
            }
          } else {
            const action = addLocalAddress(data);
            dispatch(action);
            dispatch(setSelectedId(action.payload.id));
            dispatch(setDetected(null));
          }
        }
      } finally {
        detectingRef.current = false;
        setDetecting(false);
      }
    },
    [addAddressApi, dispatch, syncServiceability],
  );

  /* ----- lifecycle ----- */

  // 1) read guest addresses from localStorage
  useEffect(() => {
    if (!hydrated) dispatch(hydrateLocation(loadLocalAddresses()));
  }, [hydrated, dispatch]);

  // 2) first load: detect once per visit (not on every page navigation)
  useEffect(() => {
    if (!hydrated || !authHydrated || addressesLoading || initDone) return;
    dispatch(markLocationInit());

    void (async () => {
      const permission = await getPermissionState();
      const hasSaved = latest.current.savedCount > 0;
      if (permission === "granted") {
        void detect(false);
      } else if (permission === "denied") {
        if (!hasSaved) setPermissionDialogOpen(true);
      } else if (!hasSaved) {
        void detect(false); // "prompt" — asks the browser only when we have nothing to show
      }
    })();
  }, [hydrated, authHydrated, addressesLoading, initDone, dispatch, detect]);

  // 3) coming back to the tab → refresh a detected location (like the app resuming)
  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState !== "visible") return;
      if (Date.now() - lastDetectAt.current < 60_000) return;
      const sel = latest.current.selectedId;
      if (sel !== null && sel !== "current") return; // user picked an address manually
      void getPermissionState().then((p) => {
        if (p === "granted") void detect(false);
      });
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [detect]);

  // 4) whenever the selected location changes → check serviceability
  useEffect(() => {
    void syncServiceability(currentLocation.latitude, currentLocation.longitude);
  }, [currentLocation.id, currentLocation.latitude, currentLocation.longitude, syncServiceability]);

  /* ----- actions ----- */

  const handleSelectLocation = useCallback(
    (id: string | null) => {
      dispatch(setSelectedId(id));
      setModalOpen(false);
    },
    [dispatch],
  );

  const handleManualLocation = useCallback(() => {
    setPermissionDialogOpen(false);
    setModalOpen(true);
  }, []);

  const handleEnablePermission = useCallback(async () => {
    const permission = await getPermissionState();
    if (permission === "denied") {
      // Browsers can't re-prompt once blocked — the user must allow it manually
      setPermissionBlocked(true);
      return;
    }
    void detect(true);
  }, [detect]);

  /** Saves a new address (API for logged-in users, this device for guests) and selects it. */
  const saveAddress = useCallback(
    async (body: NewLocalAddress) => {
      if (latest.current.isAuthenticated) {
        const created = await addAddressApi(body).unwrap();
        const id = created?.data?.id;
        if (id) {
          dispatch(setSelectedId(id));
          dispatch(setDetected(null));
        }
        return;
      }
      const dup = latest.current.localAddresses.find((a) =>
        isSameLocationOrAddress(a, body),
      );
      if (dup) {
        dispatch(setSelectedId(dup.id));
        toast("This address is already saved");
        return;
      }
      const action = addLocalAddress(body);
      dispatch(action);
      dispatch(setSelectedId(action.payload.id));
      dispatch(setDetected(null));
    },
    [addAddressApi, dispatch],
  );

  return {
    // state
    locations,
    currentLocation,
    serviceability,
    isAuthenticated,
    isReady: hydrated && authHydrated,
    isDetecting,
    savedAddressesLoading: isAuthenticated && addressesLoading,
    savedCount,
    isModalOpen,
    isPermissionDialogOpen,
    permissionBlocked,
    // actions
    openModal: () => setModalOpen(true),
    closeModal: () => setModalOpen(false),
    closePermissionDialog: () => setPermissionDialogOpen(false),
    detect,
    handleSelectLocation,
    handleManualLocation,
    handleEnablePermission,
    saveAddress,
  };
}
