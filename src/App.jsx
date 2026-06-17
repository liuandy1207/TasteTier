// ============================================================
// App.jsx — Root component. Renders the map (via Leaflet),
// search bar, restaurant panel, and dish modal.
// ============================================================
import { useEffect, useRef, useState } from "react";
import { renderToString } from "react-dom/server";
import HeartExclamationPin from "./components/HeartExclamationPin.jsx";
import RestaurantPanel from "./components/RestaurantPanel.jsx";
import DishModal from "./components/DishModal.jsx";
import SearchBar from "./components/SearchBar.jsx";
import { useMapState } from "./hooks/useMapState.js";
import { useRestaurants } from "./hooks/useRestaurants.js";

// --- Leaflet map rendered directly (no react-leaflet needed) ---
function LeafletMap({
  restaurants,
  selectedRestaurant,
  onPinClick,
  mapCenter,
  mapZoom,
}) {
  const mapRef = useRef(null);
  const leafletMapRef = useRef(null);
  const markersRef = useRef([]);
  // ✅ Ref so zoom listener always reads the latest selected restaurant
  const selectedRestaurantRef = useRef(selectedRestaurant);

  // Keep ref in sync on every render
  useEffect(() => {
    selectedRestaurantRef.current = selectedRestaurant;
  }, [selectedRestaurant]);

  function scaleForZoom(zoom) {
    const t = Math.max(0, Math.min(1, (zoom - 11) / (15 - 11)));
    return 0.4 + t * 0.6; // 0.4 at zoom 11 and below, 1.0 at zoom 15+
  }

  function applyMarkerSizes(zoom) {
    const L = window.L;
    const zoomScale = scaleForZoom(zoom);

    markersRef.current.forEach(({ id, marker, el }) => {
      const isSelected = selectedRestaurantRef.current?.id === id; // ✅ reads ref, not closure
      const scale = zoomScale * (isSelected ? 1.4 : 1);
      const heartW = 40 * scale;
      const heartH = 36 * scale;
      const gapH   =  4 * scale;
      const dotR   =  5 * scale;
      const totalH = heartH + gapH + dotR * 2;

      el.innerHTML = renderToString(
        <HeartExclamationPin
          emoji={restaurants.find((r) => r.id === id)?.cover_emoji ?? "📍"}
          selected={isSelected}
          scale={scale}  // ✅ SVG dimensions now match iconSize/iconAnchor exactly
        />
      );

      marker.setIcon(
        L.divIcon({
          className: "",
          html: el,
          iconSize:   [heartW, totalH],
          iconAnchor: [heartW / 2, totalH],
          popupAnchor:[0, -totalH],
        })
      );
    });
  }

  // ── Init map once ──────────────────────────────────────────
  useEffect(() => {
    if (leafletMapRef.current) return;
    const L = window.L;

    const map = L.map(mapRef.current, {
      center: [mapCenter.lat, mapCenter.lng],
      zoom: mapZoom,
      zoomControl: false,
      fadeAnimation: true,
      zoomAnimation: true,
      markerZoomAnimation: true,
    });

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OSM</a> © <a href="https://carto.com/">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 19,
        keepBuffer: 4,
      }
    ).addTo(map);

    L.control.zoom({ position: "bottomright" }).addTo(map);
    leafletMapRef.current = map;

    const initialScale = scaleForZoom(mapZoom);
    restaurants.forEach((r) => {
      const scale = initialScale;
      const heartW = 40 * scale;
      const heartH = 36 * scale;
      const gapH   =  4 * scale;
      const dotR   =  5 * scale;
      const totalH = heartH + gapH + dotR * 2;

      const el = document.createElement("div");
      el.style.cssText = "cursor:pointer;";
      el.innerHTML = renderToString(
        <HeartExclamationPin emoji={r.cover_emoji} selected={false} scale={initialScale} />
      );
      el.addEventListener("click", () => onPinClick(r));

      const marker = L.marker([r.lat, r.lng], {
        icon: L.divIcon({
          className: "",
          html: el,
          iconSize:   [heartW, totalH],
          iconAnchor: [heartW / 2, totalH],
          popupAnchor:[0, -totalH],
        }),
      }).addTo(map);

      markersRef.current.push({ id: r.id, marker, el });
    });

    // ✅ zoom listener calls applyMarkerSizes which reads the ref
    map.on("zoom", () => applyMarkerSizes(map.getZoom()));

    // ── Current location dot ───────────────────────────────────
    if (navigator.geolocation) {
      let locationMarker = null;
      let accuracyCircle = null;

      // Inject the pulse keyframe animation once
      if (!document.getElementById("location-pulse-style")) {
        const style = document.createElement("style");
        style.id = "location-pulse-style";
        style.textContent = `
          @keyframes location-pulse {
            0%   { transform: scale(0.5); opacity: 1; }
            100% { transform: scale(2.5); opacity: 0; }
          }
        `;
        document.head.appendChild(style);
      }

      const updateLocation = (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        const latlng = [latitude, longitude];

        const locationEl = document.createElement("div");
        locationEl.innerHTML = `
          <div style="
            width: 18px; height: 18px;
            background: #4285F4;
            border: 3px solid #fff;
            border-radius: 50%;
            box-shadow: 0 2px 6px rgba(0,0,0,0.35);
            position: relative;
          ">
            <div style="
              position: absolute;
              inset: -8px;
              border-radius: 50%;
              background: rgba(66,133,244,0.2);
              animation: location-pulse 2s ease-out infinite;
            "></div>
          </div>
        `;

        const icon = L.divIcon({
          className: "",
          html: locationEl,
          iconSize: [18, 18],
          iconAnchor: [9, 9],
        });

        if (locationMarker) {
          locationMarker.setLatLng(latlng);
          accuracyCircle.setLatLng(latlng).setRadius(accuracy);
        } else {
          // Accuracy ring (the translucent blue halo)
          accuracyCircle = L.circle(latlng, {
            radius: accuracy,
            color: "#4285F4",
            fillColor: "#4285F4",
            fillOpacity: 0.08,
            weight: 1,
            opacity: 0.3,
          }).addTo(map);

          locationMarker = L.marker(latlng, { icon, zIndexOffset: 1000 }).addTo(map);
        }
      };

      navigator.geolocation.watchPosition(updateLocation, null, {
        enableHighAccuracy: true,
        maximumAge: 10000,
      });
    }
    // ── End current location dot ───────────────────────────────
  }, []);

  // ── Re-style pins when selection changes ──────────────────
  useEffect(() => {
    if (!leafletMapRef.current) return;
    applyMarkerSizes(leafletMapRef.current.getZoom());
  }, [selectedRestaurant]);

  return (
    <div ref={mapRef} style={{ width: "100%", height: "100%", zIndex: 0 }} />
  );
}

export default function App() {
  const { restaurants, loading, error } = useRestaurants();

  const {
    selectedRestaurant,
    selectedDish,
    mapCenter,
    mapZoom,
    openRestaurant,
    closeRestaurant,
    openDish,
    closeDish,
  } = useMapState(restaurants);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  if (loading)
    return (
      <div
        style={{
          color: "#fff",
          padding: 40,
          background: "#0a0a14",
          width: "100vw",
          height: "100vh",
        }}
      >
        Loading...
      </div>
    );
  if (error)
    return <div style={{ color: "red", padding: 40 }}>Error: {error}</div>;

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Map */}
      <LeafletMap
        restaurants={restaurants}
        selectedRestaurant={selectedRestaurant}
        onPinClick={openRestaurant}
        mapCenter={mapCenter}
        mapZoom={mapZoom}
      />

      {/* Search bar */}
      <SearchBar restaurants={restaurants} onSelect={openRestaurant} />

      {/* Attribution overlay to hide default leaflet attribution slightly
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 24,
          background: "linear-gradient(transparent, rgba(253, 255, 247, 0.9))",
          pointerEvents: "none",
          zIndex: 10,
        }}
      /> */}

      {/* Backdrop — closes modal on map click, sits below panel */}
      {selectedDish && (
        <div
          onClick={closeDish}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 250,
          }}
        />
      )}

      {/* Dish detail modal */}
      <DishModal
        dish={selectedDish}
        restaurant={selectedRestaurant}
        onClose={closeDish}
      />

      {/* Restaurant side/bottom panel */}
      <RestaurantPanel
        restaurant={selectedRestaurant}
        onClose={closeRestaurant}
        onDishClick={openDish}
        isMobile={isMobile}
      />
    </div>
  );
}