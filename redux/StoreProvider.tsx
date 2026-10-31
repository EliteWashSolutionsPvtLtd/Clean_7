// "use client";

// import { useEffect } from "react";
// import { Provider } from "react-redux";
// import { Toaster } from "sonner";
// import { store } from "./store";
// import AuthExpiryWatcher from "./AuthExpiryWatcher";
// import { hydrateAuth } from "./slices/authSlice";
// import { loadAuth } from "@/lib/authStorage";

// export default function StoreProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   // Restore the session from localStorage on first client render
//   useEffect(() => {
//     const saved = loadAuth();
//     store.dispatch(hydrateAuth(saved ?? { token: null, user: null }));
//   }, []);

//   return (
//     <Provider store={store}>
//       <AuthExpiryWatcher />
//       {children}
//       <Toaster position="top-right" richColors />
//     </Provider>
//   );
// }

"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import { store } from "./store";
import AuthExpiryWatcher from "./AuthExpiryWatcher";
import { hydrateAuth } from "./slices/authSlice";
import { loadAuth } from "@/lib/authStorage";
import CartOwnerSync from "./CartOwnerSync";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Restore the session from localStorage on first client render
  useEffect(() => {
    const saved = loadAuth();
    store.dispatch(hydrateAuth(saved ?? { token: null, user: null }));
  }, []);

  return (
    <Provider store={store}>
      <AuthExpiryWatcher />
      <CartOwnerSync />
      {children}
      <Toaster position="top-right" richColors />
    </Provider>
  );
}