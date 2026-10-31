/**
 * Detects whether two addresses are the same physical place.
 * Same logic as the Clean7 app: coordinates within 250 m, or matching
 * normalised text (PIN + city + line1 / city + line1).
 */
export interface AddressLike {
  line1?: string | null;
  line2?: string | null;
  city?: string | null;
  state?: string | null;
  postalCode?: string | null;
  latitude?: number | null;
  
  longitude?: number | null;
}

const toNum = (v: unknown) => (typeof v === "number" ? v : Number(v));

export function isSameLocationOrAddress(a: AddressLike, b: AddressLike): boolean {
  // 1. Coordinates proximity (<= 250 m)
  const latA = toNum(a.latitude);
  const lonA = toNum(a.longitude);
  const latB = toNum(b.latitude);
  const lonB = toNum(b.longitude);

  if (
    !isNaN(latA) && !isNaN(lonA) && !isNaN(latB) && !isNaN(lonB) &&
    latA !== 0 && lonA !== 0 && latB !== 0 && lonB !== 0
  ) {
    const R = 6371e3;
    const φ1 = (latA * Math.PI) / 180;
    const φ2 = (latB * Math.PI) / 180;
    const Δφ = ((latB - latA) * Math.PI) / 180;
    const Δλ = ((lonB - lonA) * Math.PI) / 180;
    const h =
      Math.sin(Δφ / 2) ** 2 +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
    const distance = R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
    if (distance <= 250) return true;
  }

  // 2. Normalised text fields
  const clean = (s?: string | null) =>
    (s || "").toLowerCase().replace(/[^a-z0-9]/g, "").trim();

  const l1A = clean(a.line1);
  const l1B = clean(b.line1);
  const cityA = clean(a.city);
  const cityB = clean(b.city);
  const postA = clean(a.postalCode);
  const postB = clean(b.postalCode);
  const line1Match =
    !!l1A && !!l1B && (l1A === l1B || l1A.includes(l1B) || l1B.includes(l1A));

  if (postA && postB && postA !== "000000" && postA === postB) {
    if (cityA && cityB && cityA === cityB) {
      if (!l1A || !l1B || line1Match) return true;
    }
  }

  if (cityA && cityB && cityA === cityB && line1Match) return true;

  return false;
}
