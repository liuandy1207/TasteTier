// src/hooks/useMapState.js
import { useState, useEffect, useCallback } from "react";

function getParams() {
  const p = new URLSearchParams(window.location.search);
  return {
    restaurantId: p.get("restaurant"),
    dishId: p.get("dish"),
  };
}

function setParams({ restaurantId, dishId }) {
  const p = new URLSearchParams();
  if (restaurantId) p.set("restaurant", restaurantId);
  if (dishId) p.set("dish", dishId);
  const newUrl = p.toString()
    ? `${window.location.pathname}?${p.toString()}`
    : window.location.pathname;
  window.history.pushState({}, "", newUrl);
}

export function useMapState(restaurants) {
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(
    () => getParams().restaurantId
  );
  const [selectedDishId, setSelectedDishId] = useState(
    () => getParams().dishId
  );
  const [mapCenter, setMapCenter] = useState({ lat: 43.6532, lng: -79.3832 });
  const [mapZoom, setMapZoom] = useState(13);

  // Derive objects from IDs
  const selectedRestaurant = restaurants?.find(r => r.id === selectedRestaurantId) ?? null;
  const selectedDish = selectedRestaurant
    ? Object.values(selectedRestaurant.tierList)
        .flat()
        .find(d => d.id === selectedDishId) ?? null
    : null;

  // Handle browser back/forward
  useEffect(() => {
    const onPop = () => {
      const { restaurantId, dishId } = getParams();
      setSelectedRestaurantId(restaurantId);
      setSelectedDishId(dishId);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // Pan map when restaurant selected
  useEffect(() => {
    if (selectedRestaurant) {
      setMapCenter({ lat: selectedRestaurant.lat, lng: selectedRestaurant.lng });
    }
  }, [selectedRestaurant]);

  const openRestaurant = useCallback((restaurant) => {
    setSelectedRestaurantId(restaurant.id);
    setSelectedDishId(null);
    setParams({ restaurantId: restaurant.id });
  }, []);

  const closeRestaurant = useCallback(() => {
    setSelectedRestaurantId(null);
    setSelectedDishId(null);
    setParams({});
  }, []);

  const openDish = useCallback((dish) => {
    setSelectedDishId(dish.id);
    setParams({ restaurantId: selectedRestaurantId, dishId: dish.id });
  }, [selectedRestaurantId]);

  const closeDish = useCallback(() => {
    setSelectedDishId(null);
    setParams({ restaurantId: selectedRestaurantId });
  }, [selectedRestaurantId]);

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