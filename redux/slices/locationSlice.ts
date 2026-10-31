import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import { isSameLocationOrAddress } from "@/app/lib/addressUtils";

/** Address saved on this device (guests only — logged-in users use the API). */
export interface LocalAddress {
  id: string;
  label: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  latitude?: number;
  longitude?: number;
  isDefault: boolean;
  createdAt: string;
}

export type NewLocalAddress = Omit<LocalAddress, "id" | "createdAt">;

/** Location detected from the browser's GPS — shown as "Current". */
export interface DetectedLocation {
  address: string;
  latitude: number;
  longitude: number;
}

export interface LocationServiceability {
  status: "idle" | "checking" | "done" | "error";
  isServiceable: boolean | null;
  branchId?: string;
  branchName?: string;
  message?: string;
}

interface LocationState {
  localAddresses: LocalAddress[];
  detected: DetectedLocation | null;
  /** "current" = detected location, otherwise an address id */
  selectedId: string | null;
  /** localStorage has been read */
  hydrated: boolean;
  /** first-load auto detection already ran (don't repeat on every page visit) */
  initDone: boolean;
  serviceability: LocationServiceability;
}

const initialState: LocationState = {
  localAddresses: [],
  detected: null,
  selectedId: null,
  hydrated: false,
  initDone: false,
  serviceability: { status: "idle", isServiceable: null },
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    hydrateLocation: (state, action: PayloadAction<LocalAddress[]>) => {
      // drop historical duplicates
      const list: LocalAddress[] = [];
      for (const a of action.payload) {
        if (!list.some((x) => isSameLocationOrAddress(x, a))) list.push(a);
      }
      state.localAddresses = list;
      state.hydrated = true;
    },
    addLocalAddress: {
      reducer: (state, action: PayloadAction<LocalAddress>) => {
        const incoming = action.payload;
        const existing = state.localAddresses.find((a) =>
          isSameLocationOrAddress(a, incoming),
        );
        if (existing) {
          if (incoming.isDefault && !existing.isDefault) {
            state.localAddresses.forEach((a) => {
              a.isDefault = a.id === existing.id;
            });
          }
          return;
        }
        const isDefault = incoming.isDefault || state.localAddresses.length === 0;
        if (isDefault) state.localAddresses.forEach((a) => (a.isDefault = false));
        state.localAddresses.push({ ...incoming, isDefault });
      },
      prepare: (address: NewLocalAddress) => ({
        payload: {
          ...address,
          id: `local_${nanoid(8)}`,
          createdAt: new Date().toISOString(),
        } as LocalAddress,
      }),
    },
    setDetected: (state, action: PayloadAction<DetectedLocation | null>) => {
      state.detected = action.payload;
    },
    setSelectedId: (state, action: PayloadAction<string | null>) => {
      state.selectedId = action.payload;
    },
    setServiceability: (state, action: PayloadAction<LocationServiceability>) => {
      state.serviceability = action.payload;
    },
    markLocationInit: (state) => {
      state.initDone = true;
    },
  },
});

export const {
  hydrateLocation,
  addLocalAddress,
  setDetected,
  setSelectedId,
  setServiceability,
  markLocationInit,
} = locationSlice.actions;
export default locationSlice.reducer;
