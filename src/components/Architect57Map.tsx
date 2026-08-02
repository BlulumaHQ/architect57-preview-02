import { useEffect, useRef, useState } from "react";
import { useLang } from "@/contexts/LangContext";

/** Single source of truth for the Architect 57 office location. */
export const ARCHITECT57_OFFICE = {
  lat: 49.1944073,
  lng: -123.1043397,
};

export const ARCHITECT57_MAP_ID = "efb271489743135f6c47b819";

export const ARCHITECT57_ADDRESS = {
  company: "Architect 57 Inc.",
  line1: "203-2680 Shell Road",
  line2: "Richmond, BC V6X 4C9",
  country: "Canada",
};

export const ARCHITECT57_DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=49.1944073,-123.1043397";

type LoadState = "loading" | "ready" | "error";

declare global {
  interface Window {
    google?: any;
    __architect57MapsLoader?: Promise<void>;
  }
}

/** Loads the Google Maps JS API bootstrap exactly once per page. */
const loadMapsApi = (apiKey: string): Promise<void> => {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Google Maps requires a browser environment"));
  }
  if (window.__architect57MapsLoader) return window.__architect57MapsLoader;

  window.__architect57MapsLoader = new Promise<void>((resolve, reject) => {
    if (window.google?.maps?.importLibrary) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
      apiKey
    )}&v=weekly&loading=async&libraries=maps,marker`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Google Maps script failed to load"));
    document.head.appendChild(script);
  }).catch((error) => {
    window.__architect57MapsLoader = undefined;
    throw error;
  });

  return window.__architect57MapsLoader;
};

interface Architect57MapProps {
  className?: string;
  /** Accessible label for the map region. */
  title?: string;
  zoom?: number;
}

const Architect57Map = ({
  className,
  title = "Architect 57 Inc. — 203-2680 Shell Road, Richmond, BC",
  zoom = 16,
}: Architect57MapProps) => {
  const { lang } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const [state, setState] = useState<LoadState>("loading");

  const zh = lang === "zh";
  const directionsLabel = zh ? "路線導航" : "Get Directions";
  const loadingLabel = zh ? "地圖載入中……" : "Loading map…";
  const errorLabel = zh ? "地圖目前暫時無法載入。" : "Map is temporarily unavailable.";

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;

    if (!apiKey) {
      if (import.meta.env.DEV) {
        console.error(
          "[Architect57Map] VITE_GOOGLE_MAPS_API_KEY is not configured; rendering fallback panel."
        );
      }
      setState("error");
      return;
    }

    let cancelled = false;

    const init = async () => {
      await loadMapsApi(apiKey);
      if (cancelled || !containerRef.current || mapRef.current) return;

      const { Map } = await window.google.maps.importLibrary("maps");
      const { AdvancedMarkerElement, PinElement } = await window.google.maps.importLibrary(
        "marker"
      );
      if (cancelled || !containerRef.current || mapRef.current) return;

      const map = new Map(containerRef.current, {
        mapId: ARCHITECT57_MAP_ID,
        center: ARCHITECT57_OFFICE,
        zoom,
        gestureHandling: "cooperative",
        clickableIcons: false,
        streetViewControl: false,
        mapTypeControl: false,
        zoomControl: true,
        rotateControl: false,
        scaleControl: false,
        keyboardShortcuts: true,
        fullscreenControl: window.matchMedia("(min-width: 768px)").matches,
      });
      mapRef.current = map;

      const pin = new PinElement({
        background: "#714C90",
        borderColor: "#56386F",
        glyphColor: "#FFFFFF",
        scale: 1.1,
      });

      const marker = new AdvancedMarkerElement({
        map,
        position: ARCHITECT57_OFFICE,
        title: ARCHITECT57_ADDRESS.company,
        content: pin.element,
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `<div style="font-family:inherit;color:#18181b;line-height:1.55;font-size:13px">
            <strong style="display:block;margin-bottom:4px">${ARCHITECT57_ADDRESS.company}</strong>
            <span style="display:block">${ARCHITECT57_ADDRESS.line1}</span>
            <span style="display:block">${ARCHITECT57_ADDRESS.line2}</span>
            <span style="display:block">${ARCHITECT57_ADDRESS.country}</span>
            <a href="${ARCHITECT57_DIRECTIONS_URL}" target="_blank" rel="noopener noreferrer"
               style="display:inline-block;margin-top:6px;color:#714C90;font-weight:600">${directionsLabel}</a>
          </div>`,
      });

      marker.addListener("click", () => infoWindow.open({ map, anchor: marker }));

      setState("ready");
    };

    init().catch(() => {
      if (!cancelled) setState("error");
    });

    return () => {
      cancelled = true;
    };
    // Language only affects the info-window label; the map is never rebuilt.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoom]);

  if (state === "error") {
    // Keyless Google Maps embed so the office location is always visible,
    // even when VITE_GOOGLE_MAPS_API_KEY is not available in this environment.
    return (
      <div className={className} style={{ position: "relative", width: "100%", height: "100%" }}>
        <iframe
          title={title}
          src={`https://www.google.com/maps?q=${ARCHITECT57_OFFICE.lat},${ARCHITECT57_OFFICE.lng}&z=${zoom}&output=embed`}
          width="100%"
          height="100%"
          style={{ border: 0, display: "block", filter: "grayscale(0.35) contrast(1.05)" }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        <a
          href={ARCHITECT57_DIRECTIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: "absolute",
            left: 12,
            bottom: 12,
            padding: "6px 10px",
            borderRadius: 2,
            backgroundColor: "hsl(var(--surface-dark))",
            color: "#fff",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.04em",
          }}
        >
          {directionsLabel}
        </a>
      </div>
    );
  }


  return (
    <div className={className} style={{ position: "relative", width: "100%", height: "100%" }}>
      <div
        ref={containerRef}
        role="application"
        aria-label={title}
        style={{ width: "100%", height: "100%", backgroundColor: "hsl(var(--surface-dark))" }}
      />
      {state === "loading" && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            color: "hsl(var(--muted-foreground))",
            fontSize: "13px",
            letterSpacing: "0.04em",
          }}
        >
          {loadingLabel}
        </div>
      )}
    </div>
  );
};

export default Architect57Map;
