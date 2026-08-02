/**
 * Minimal ambient declarations for the Google Maps JavaScript API surface
 * used by this project. Vendored locally so no external @types package is needed.
 */
declare namespace google.maps {
  class Point {
    constructor(x: number, y: number);
    x: number;
    y: number;
  }

  interface LatLngLiteral {
    lat: number;
    lng: number;
  }

  interface MapTypeStyle {
    featureType?: string;
    elementType?: string;
    stylers: Array<Record<string, string | number | boolean>>;
  }

  interface MapOptions {
    center?: LatLngLiteral;
    zoom?: number;
    styles?: MapTypeStyle[];
    backgroundColor?: string;
    disableDefaultUI?: boolean;
    zoomControl?: boolean;
    gestureHandling?: string;
    clickableIcons?: boolean;
  }

  class Map {
    constructor(element: HTMLElement, options?: MapOptions);
  }

  interface Icon {
    path?: string;
    fillColor?: string;
    fillOpacity?: number;
    strokeColor?: string;
    strokeOpacity?: number;
    strokeWeight?: number;
    scale?: number;
    anchor?: Point;
  }

  interface MarkerOptions {
    position: LatLngLiteral;
    map?: Map;
    title?: string;
    icon?: Icon;
  }

  class Marker {
    constructor(options: MarkerOptions);
    addListener(event: string, handler: () => void): void;
  }

  interface InfoWindowOptions {
    content?: string;
  }

  class InfoWindow {
    constructor(options?: InfoWindowOptions);
    open(options: { map: Map; anchor: Marker }): void;
  }
}

interface Window {
  google?: typeof google;
}
