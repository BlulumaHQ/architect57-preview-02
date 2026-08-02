import { useEffect, useRef, useState } from "react";
import {
  DARK_MAP_STYLES,
  GOOGLE_MAPS_API_KEY,
  MAP_EMBED_SRC,
  OFFICE_ADDRESS,
  OFFICE_LOCATION,
  OFFICE_PHONE,
} from "@/config/mapConfig";

type LoadState = "idle" | "ready" | "error";

declare global {
  interface Window {
    __architect57MapsPromise?: Promise<void>;
    __architect57MapsReady?: () => void;
  }
}

const loadMapsApi = (): Promise<void> => {
  if (typeof window === "undefined") return Promise.reject(new Error("no window"));
  if (window.google?.maps) return Promise.resolve();
  if (window.__architect57MapsPromise) return window.__architect57MapsPromise;

  window.__architect57MapsPromise = new Promise<void>((resolve, reject) => {
    window.__architect57MapsReady = () => resolve();
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
      GOOGLE_MAPS_API_KEY
    )}&loading=async&callback=__architect57MapsReady`;
    script.async = true;
    script.onerror = () => reject(new Error("Failed to load Google Maps"));
    document.head.appendChild(script);
  });

  return window.__architect57MapsPromise;
};

const pinIcon = {
  // Brand red marker: solid dot with a thin outer ring.
  path: "M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24Zm0 6a6 6 0 1 1 0 12 6 6 0 0 1 0-12Z",
  fillColor: "#a11d2d",
  fillOpacity: 1,
  strokeColor: "#ffffff",
  strokeOpacity: 0.85,
  strokeWeight: 1,
  scale: 1.15,
  anchor: { x: 12, y: 12 } as google.maps.Point,
};

interface BrandMapProps {
  className?: string;
  title: string;
  /** Localized company label shown in the info window. */
  companyName?: string;
  zoom?: number;
}

const BrandMap = ({
  className,
  title,
  companyName = "Architect 57 Inc.",
  zoom = 15,
}: BrandMapProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<LoadState>("idle");

  useEffect(() => {
    if (!GOOGLE_MAPS_API_KEY) {
      setState("error");
      return;
    }

    let cancelled = false;

    loadMapsApi()
      .then(() => {
        if (cancelled || !containerRef.current) return;

        const map = new google.maps.Map(containerRef.current, {
          center: OFFICE_LOCATION,
          zoom,
          styles: DARK_MAP_STYLES,
          backgroundColor: "#18181b",
          disableDefaultUI: true,
          zoomControl: true,
          gestureHandling: "cooperative",
          clickableIcons: false,
        });

        const marker = new google.maps.Marker({
          position: OFFICE_LOCATION,
          map,
          title: companyName,
          icon: {
            ...pinIcon,
            anchor: new google.maps.Point(12, 12),
          },
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `<div style="font-family:inherit;color:#18181b;line-height:1.5">
            <strong style="display:block;margin-bottom:2px">${companyName}</strong>
            <span style="display:block">${OFFICE_ADDRESS}</span>
            <a href="tel:604-818-2088" style="color:#714c90">${OFFICE_PHONE}</a>
          </div>`,
        });

        marker.addListener("click", () => infoWindow.open({ map, anchor: marker }));

        setState("ready");
      })
      .catch(() => {
        if (!cancelled) setState("error");
      });

    return () => {
      cancelled = true;
    };
  }, [companyName, zoom]);

  if (state === "error") {
    return (
      <iframe
        src={MAP_EMBED_SRC}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
        className={className}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      role="application"
      aria-label={title}
      className={className}
      style={{ width: "100%", height: "100%", backgroundColor: "#18181b" }}
    />
  );
};

export default BrandMap;
