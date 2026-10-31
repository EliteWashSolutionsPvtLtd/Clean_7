// Reverse geocoding via OpenStreetMap Nominatim (free, no API key).
// Usage policy: max ~1 request/second, light use only. For production traffic
// swap this for your own geocoder / a paid provider (Google, Mapbox, MapTiler…).

export interface ReverseGeocodeResult {
  line1: string;
  line2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

type NominatimAddress = Record<string, string | undefined>;

export async function reverseGeocode(
  lat: number,
  lng: number,
  signal?: AbortSignal,
): Promise<ReverseGeocodeResult | null> {
  const url =
    "https://nominatim.openstreetmap.org/reverse" +
    `?format=jsonv2&addressdetails=1&zoom=18&accept-language=en&lat=${lat}&lon=${lng}`;

  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`Reverse geocode failed (${res.status})`);

  const json = (await res.json()) as {
    address?: NominatimAddress;
    display_name?: string;
  };
  const a = json.address;
  if (!a) return null;

  const road = a.road || a.pedestrian || a.footway || a.path || "";
  const line1 =
    [a.house_number, road].filter(Boolean).join(" ") ||
    (json.display_name ?? "").split(",")[0].trim();

  return {
    line1,
    line2: a.neighbourhood || a.suburb || a.quarter || a.city_district || "",
    city:
      a.city ||
      a.town ||
      a.village ||
      a.municipality ||
      a.county ||
      a.state_district ||
      "",
    state: a.state || "",
    postalCode: a.postcode || "",
    country: a.country || "",
  };
}