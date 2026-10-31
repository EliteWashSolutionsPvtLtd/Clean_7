// // redux/store.ts
// "use client";
// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import { setupListeners } from "@reduxjs/toolkit/query";

// import authReducer from "./slices/authSlice";
// import { apiSlice } from "./api/apiSlice";
// import { saveAuth, clearAuth } from "@/lib/authStorage";

// const rootReducer = combineReducers({
//   auth: authReducer,
//   [apiSlice.reducerPath]: apiSlice.reducer,
// });

// export const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(apiSlice.middleware),
//   devTools: process.env.NODE_ENV !== "production",
// });

// setupListeners(store.dispatch);

// // Keep localStorage in sync with auth state (logout() clears it too)
// let prevAuth = store.getState().auth;
// store.subscribe(() => {
//   const cur = store.getState().auth;
//   if (cur === prevAuth) return;
//   prevAuth = cur;
//   if (!cur.hydrated) return;
//   if (cur.token) saveAuth(cur.token, cur.user);
//   else clearAuth();
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// redux/store.ts
"use client";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import authReducer from "./slices/authSlice";
import locationReducer from "./slices/locationSlice";
import { apiSlice } from "./api/apiSlice";
import { saveAuth, clearAuth } from "@/lib/authStorage";
import { saveLocalAddresses } from "@/lib/locationStorage";

const rootReducer = combineReducers({
  auth: authReducer,
  location: locationReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);

// Keep localStorage in sync with auth state (logout() clears it too)
let prevAuth = store.getState().auth;
store.subscribe(() => {
  const cur = store.getState().auth;
  if (cur === prevAuth) return;
  prevAuth = cur;
  if (!cur.hydrated) return;
  if (cur.token) saveAuth(cur.token, cur.user);
  else clearAuth();
});

// Keep guest addresses saved on this device
let prevLocalAddresses = store.getState().location.localAddresses;
store.subscribe(() => {
  const { localAddresses, hydrated } = store.getState().location;
  if (localAddresses === prevLocalAddresses) return;
  prevLocalAddresses = localAddresses;
  if (hydrated) saveLocalAddresses(localAddresses);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;