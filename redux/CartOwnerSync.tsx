"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { setCartOwner } from "@/app/lib/cart";
import type { RootState } from "./store";

/** Keeps the cart in sync with the logged-in user: each user has their own cart. */
export default function CartOwnerSync() {
  const { hydrated, isAuthenticated, user } = useSelector((s: RootState) => s.auth);
  const id = user?.id ?? user?.email ?? user?.phone ?? null;
  const owner = isAuthenticated && id ? String(id) : null;

  useEffect(() => {
    if (!hydrated) return; // wait until the saved session is restored
    setCartOwner(owner);
  }, [hydrated, owner]);

  return null;
}