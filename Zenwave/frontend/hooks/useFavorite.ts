/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useFavorite.ts
"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getUserFavorites,
  addFavorite,
  removeFavorite,
} from "@/services/favoriteService";

export function useFavorite() {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // -------------------------------------------------
  // Load all favorites
  // -------------------------------------------------
  const refreshFavorites = useCallback(async () => {
    try {
      setLoading(true);
      const list = await getUserFavorites(); // always returns array
      setFavorites(list);
      return list;
    } catch (error) {
      console.error("Error loading favorites:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // -------------------------------------------------
  // Check if meditation is favorite
  // -------------------------------------------------
  const isFavorite = useCallback(
    (id: string) => favorites.some((m) => m._id === id),
    [favorites]
  );

  // -------------------------------------------------
  // Toggle (add/remove)
  // -------------------------------------------------
  const toggleFavorite = useCallback(
    async (id: string) => {
      const exists = favorites.some((m) => m._id === id);

      if (exists) {
        const updated = await removeFavorite(id);
        setFavorites(updated);
      } else {
        const updated = await addFavorite(id);
        setFavorites(updated);
      }
    },
    [favorites]
  );

  // -------------------------------------------------
  // Load on page mount
  // -------------------------------------------------
  useEffect(() => {
    refreshFavorites();
  }, [refreshFavorites]);

  return {
    favorites,
    loading,
    isFavorite,
    toggleFavorite,
    refreshFavorites,
  };
}
