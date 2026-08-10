import { useEffect, useRef, useState } from "react";
import { useLang } from "@/contexts/LangContext";

/** Single source of truth for the Architect 57 office location. */
export const ARCHITECT57_OFFICE = {
  lat: 49.1943600,
  lng: -123.1023500,
};

export const ARCHITECT57_MAP_ID = "efb271489743135f6c47b819";

export const ARCHITECT57_ADDRESS = {
  company: "Architect 57 Inc.",
  line1: "203-2680 Shell Road",
  line2: "Richmond, BC V6X 4C9",
  country: "Canada",
};

export const ARCHITECT57_DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=49.1943600,-123.1023500";

type LoadState = "loading" | "ready" | "fallback";

/** Emergency fallback embed — standard Google marker, exact verified coordinates. */
export const ARCHITECT57_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(
  `${ARCHITECT57_OFFICE.lat},${ARCHITECT57_OFFICE.lng}`
)}&z=16&output=embed`;

declare global {
  interface Window {
    google?: any;
    __architect57MapsLoader?: Promise<void>;
    gm_authFailure?: () => void;
    __architect57MapsCallback?: () => void;
  }
}

/**
 * Loads the Google Maps JS API bootstrap exactly once per page using the
 * official callback parameter, so it resolves only when the API is ready.
 */
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

    const existing = document.getElementById(
      "architect57-google-maps"
    ) as HTMLScriptElement | null;

    window.__architect57MapsCallback = () => {
      if (window.google?.maps?.importLibrary) resolve();
      else reject(new Error("Google Maps loaded without importLibrary support"));
    };

    if (existing) {
      existing.addEventListener("error", () =>
        reject(new Error("Google Maps script failed to load"))
      );
      return;
    }

    const script = document.createElement("script");
    script.id = "architect57-google-maps";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
      apiKey
    )}&v=weekly&loading=async&libraries=maps,marker&callback=__architect57MapsCallback`;
    script.async = true;
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
  const markerRef = useRef<any>(null);
  const infoWindowRef = useRef<any>(null);
  const clickListenerRef = useRef<any>(null);
  const [state, setState] = useState<LoadState>("loading");

  const zh = lang === "zh";
  const directionsLabel = zh ? "路線導航" : "Get Directions";
  const loadingLabel = zh ? "地圖載入中……" : "Loading map…";

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;

    if (import.meta.env.DEV) {
      console.info("[Architect57Map] Browser API key configured:", Boolean(apiKey));
      console.info("[Architect57Map] Current hostname:", window.location.hostname);
      console.info("[Architect57Map] Using Map ID:", ARCHITECT57_MAP_ID);
      console.info(
        "[Architect57Map] Using office coordinates:",
        ARCHITECT57_OFFICE.lat,
        ARCHITECT57_OFFICE.lng
      );
    }

    if (!apiKey) {
      console.error(
        "[Architect57Map] VITE_GOOGLE_MAPS_API_KEY is not configured; the Google Maps JavaScript API will not be loaded."
      );
      setState("fallback");
      return;
    }

    let cancelled = false;

    const previousAuthFailure = window.gm_authFailure;
    window.gm_authFailure = () => {
      console.error(
        "[Architect57Map] Google Maps authentication failed. Check VITE_GOOGLE_MAPS_API_KEY, HTTP referrer restrictions, billing, and Maps JavaScript API status."
      );
      setState("fallback");
    };

    const init = async () => {
      await loadMapsApi(apiKey);
      if (cancelled || !containerRef.current || mapRef.current) return;

      const { Map } = await window.google.maps.importLibrary("maps");
      const markerLib = await window.google.maps.importLibrary("marker");
      const { AdvancedMarkerElement, PinElement } = markerLib ?? {};

      if (!AdvancedMarkerElement || !PinElement) {
        const missing = [
          !AdvancedMarkerElement && "AdvancedMarkerElement",
          !PinElement && "PinElement",
        ]
          .filter(Boolean)
          .join(", ");
        throw new Error(`Google Maps marker library unavailable: missing ${missing}`);
      }

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
      markerRef.current = marker;

      const infoWindow = new window.google.maps.InfoWindow();
      infoWindowRef.current = infoWindow;

      clickListenerRef.current = marker.addListener("click", () =>
        infoWindow.open({ map, anchor: marker })
      );

      setState("ready");
    };

    init().catch((error) => {
      if (cancelled) return;
      console.error("[Architect57Map] Google Maps initialization failed:", error);
      setState("fallback");
    });

    return () => {
      cancelled = true;
      if (clickListenerRef.current?.remove) clickListenerRef.current.remove();
      clickListenerRef.current = null;
      if (infoWindowRef.current?.close) infoWindowRef.current.close();
      infoWindowRef.current = null;
      if (markerRef.current) markerRef.current.map = null;
      markerRef.current = null;
      mapRef.current = null;
      window.gm_authFailure = previousAuthFailure;
    };
    // The map is built once; language only affects info-window content.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoom]);

  // Keep the info-window content in sync with the active language.
  useEffect(() => {
    if (!infoWindowRef.current) return;
    infoWindowRef.current.setContent(
      `<div style="font-family:inherit;color:#18181b;line-height:1.55;font-size:13px">
        <strong style="display:block;margin-bottom:4px">${ARCHITECT57_ADDRESS.company}</strong>
        <span style="display:block">${ARCHITECT57_ADDRESS.line1}</span>
        <span style="display:block">${ARCHITECT57_ADDRESS.line2}</span>
        <span style="display:block">${ARCHITECT57_ADDRESS.country}</span>
        <a href="${ARCHITECT57_DIRECTIONS_URL}" target="_blank" rel="noopener noreferrer"
           style="display:inline-block;margin-top:6px;color:#714C90;font-weight:600">${directionsLabel}</a>
      </div>`
    );
  }, [directionsLabel, state]);

  if (state === "fallback") {
    return (
      <div
        className={className}
        style={{ position: "relative", width: "100%", height: "100%" }}
        role="region"
        aria-label={title}
      >
        <iframe
          title={title}
          src={ARCHITECT57_EMBED_URL}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          style={{
            width: "100%",
            height: "100%",
            border: 0,
            display: "block",
            filter: "grayscale(0.35) contrast(1.05)",
          }}
        />
        <a
          href={ARCHITECT57_DIRECTIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: "absolute",
            left: "12px",
            bottom: "40px",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "#ffffff",
            backgroundColor: "rgba(24,24,27,0.86)",
            padding: "8px 14px",
            borderRadius: "2px",
            textDecoration: "none",
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
