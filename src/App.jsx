// ============================================================
// App.jsx — Root component. Renders the map (via Leaflet),
// search bar, restaurant panel, and dish modal.
// ============================================================
import { useEffect, useRef, useState } from "react";
import RestaurantPanel from "./components/RestaurantPanel.jsx";
import DishModal from "./components/DishModal.jsx";
import SearchBar from "./components/SearchBar.jsx";
import { useMapState } from "./hooks/useMapState.js";
import restaurants from "./data/restaurants.js";

// --- Leaflet map rendered directly (no react-leaflet needed) ---
function LeafletMap({ restaurants, selectedRestaurant, onPinClick, mapCenter, mapZoom }) {
  const mapRef = useRef(null);
  const leafletMapRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (leafletMapRef.current) return;

    const L = window.L;
    const map = L.map(mapRef.current, {
      center: [mapCenter.lat, mapCenter.lng],
      zoom: mapZoom,
      zoomControl: false,
    });

    // Dark map tiles (CartoDB dark matter — no API key needed)
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OSM</a> © <a href="https://carto.com/">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 19,
    }).addTo(map);

    // Zoom control bottom-right
    L.control.zoom({ position: "bottomright" }).addTo(map);

    leafletMapRef.current = map;

    // Add markers
    restaurants.forEach((r) => {
      const el = document.createElement("div");
      el.className = "custom-pin";
      el.innerHTML = `
        <div class="pin-bubble" data-id="${r.id}">
          <span class="pin-emoji">${r.coverEmoji}</span>
        </div>
      `;
      el.style.cssText = "cursor:pointer;position:relative;";
      el.addEventListener("click", () => onPinClick(r));

      const marker = L.marker([r.lat, r.lng], {
        icon: L.divIcon({
          className: "",
          html: el,
          iconAnchor: [22, 44],
        }),
      }).addTo(map);

      markersRef.current.push({ id: r.id, marker, el });
    });
  }, []);

  // Pan to selected restaurant
  useEffect(() => {
    if (!leafletMapRef.current || !selectedRestaurant) return;
    leafletMapRef.current.panTo([selectedRestaurant.lat, selectedRestaurant.lng], {
      animate: true,
      duration: 0.5,
    });

    // Update pin styles
    markersRef.current.forEach(({ id, el }) => {
      const bubble = el.querySelector(".pin-bubble");
      if (!bubble) return;
      if (id === selectedRestaurant.id) {
        bubble.classList.add("pin-selected");
      } else {
        bubble.classList.remove("pin-selected");
      }
    });
  }, [selectedRestaurant]);

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
}

export default function App() {
  const {
    selectedRestaurant,
    selectedDish,
    mapCenter,
    mapZoom,
    openRestaurant,
    closeRestaurant,
    openDish,
    closeDish,
  } = useMapState();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative", overflow: "hidden" }}>
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

      {/* Attribution overlay to hide default leaflet attribution slightly */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 24,
          background: "linear-gradient(transparent, rgba(0,0,0,0.3))",
          pointerEvents: "none",
          zIndex: 10,
        }}
      />

      {/* Restaurant side/bottom panel */}
      <RestaurantPanel
        restaurant={selectedRestaurant}
        onClose={closeRestaurant}
        onDishClick={openDish}
        isMobile={isMobile}
      />

      {/* Dish detail modal */}
      <DishModal
        dish={selectedDish}
        restaurant={selectedRestaurant}
        onClose={closeDish}
      />
    </div>
  );
}