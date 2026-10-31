"use client";

import { useEffect, useRef, useState } from "react";
import type { Map as LeafletMap, Marker } from "leaflet";

// Used until a location is chosen (middle of India)
const DEFAULT_CENTER: [number, number] = [22.5, 79];
const DEFAULT_ZOOM = 5;
const PIN_ZOOM = 16;

const PIN_SVG =
  '<svg width="32" height="42" viewBox="0 0 32 42" xmlns="http://www.w3.org/2000/svg">' +
  '<path d="M16 0C7.2 0 0 7.1 0 15.9 0 27.5 16 42 16 42s16-14.5 16-26.1C32 7.1 24.8 0 16 0z" fill="#B8893E"/>' +
  '<circle cx="16" cy="16" r="6" fill="#fff"/></svg>';

export interface LatLng {
  lat: number;
  lng: number;
}

/**
 * OpenStreetMap picker (Leaflet, no API key).
 * Tap the map or drag the pin to choose a spot → onPick(lat, lng).
 * Passing a new `value` (e.g. from "Use my current location") moves the pin.
 * Page scroll-wheel zoom is off so it doesn't fight the modal's scrolling;
 * use the +/- buttons or pinch.
 */
export default function LocationPicker({
  value,
  onPick,
}: {
  value: LatLng | null;
  onPick: (lat: number, lng: number) => void;
}) {
  const elRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markerRef = useRef<Marker | null>(null);
  const leafletRef = useRef<typeof import("leaflet") | null>(null);
  const onPickRef = useRef(onPick);
  const valueRef = useRef(value);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    onPickRef.current = onPick;
    valueRef.current = value;
  });

  // Create the map once
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const L = await import("leaflet");
      if (cancelled || !elRef.current) return;
      leafletRef.current = L;

      const start = valueRef.current;
      const map = L.map(elRef.current, {
        scrollWheelZoom: false,
        zoomAnimation: false,
        fadeAnimation: false,
        markerZoomAnimation: false,
      }).setView(
        start ? [start.lat, start.lng] : DEFAULT_CENTER,
        start ? PIN_ZOOM : DEFAULT_ZOOM,
      );

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors',
      }).addTo(map);

      map.on("click", (e) => {
        onPickRef.current(e.latlng.lat, e.latlng.lng);
      });

      mapRef.current = map;
      setReady(true);
      requestAnimationFrame(() => map.invalidateSize());
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
  }, []);

  // Keep the pin in sync with `value`
  useEffect(() => {
    const map = mapRef.current;
    const L = leafletRef.current;
    if (!ready || !map || !L) return;

    if (!value) {
      markerRef.current?.remove();
      markerRef.current = null;
      return;
    }

    const latlng: [number, number] = [value.lat, value.lng];

    if (!markerRef.current) {
      const marker = L.marker(latlng, {
        draggable: true,
        icon: L.divIcon({
          className: "",
          html: PIN_SVG,
          iconSize: [32, 42],
          iconAnchor: [16, 42],
        }),
      }).addTo(map);
      marker.on("dragend", () => {
        const p = marker.getLatLng();
        onPickRef.current(p.lat, p.lng);
      });
      markerRef.current = marker;
    } else {
      markerRef.current.setLatLng(latlng);
    }

    // Only move the view if the pin is off-screen or the map is zoomed far out
    if (!map.getBounds().contains(latlng) || map.getZoom() < 14) {
      map.setView(latlng, PIN_ZOOM, { animate: false });
    }
  }, [value, ready]);

  return (
    <div className="relative isolate h-[220px] overflow-hidden rounded-2xl border border-[var(--line)]">
      <div ref={elRef} className="h-full w-full" />
      {!ready && (
        // static skeleton while the map loads
        <div
          aria-busy="true"
          aria-label="Loading map"
          className="absolute inset-0 z-[1000] bg-[var(--ink)]/10"
        />
      )}
    </div>
  );
}