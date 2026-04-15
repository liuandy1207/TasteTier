// ============================================================
// useMapState.js — Central state management hook.
// All panel open/close logic and selected item state lives here.
// ============================================================
import { useState, useCallback } from "react";

export function useMapState() {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedDish, setSelectedDish] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 43.6532, lng: -79.3832 });
  const [mapZoom, setMapZoom] = useState(13);

  const openRestaurant = useCallback((restaurant) => {
    setSelectedRestaurant(restaurant);
    setSelectedDish(null);
    setMapCenter({ lat: restaurant.lat, lng: restaurant.lng });
  }, []);

  const closeRestaurant = useCallback(() => {
    setSelectedRestaurant(null);
    setSelectedDish(null);
  }, []);

  const openDish = useCallback((dish) => {
    setSelectedDish(dish);
  }, []);

  const closeDish = useCallback(() => {
    setSelectedDish(null);
  }, []);

  return {
    selectedRestaurant,
    selectedDish,
    mapCenter,
    mapZoom,
    openRestaurant,
    closeRestaurant,
    openDish,
    closeDish,
    setMapZoom,
  };
}