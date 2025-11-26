import { api } from "@/lib/api";

export const getUserFavorites = async () => {
  const res = await api.get("/favorites");
  console.log("Fetched favorites:", res.data);
  return res.data.favorites.meditations || [];
};

export const addFavorite = async (id: string) => {
  const res = await api.post(`/favorites/${id}`);
  return res.data.favorites.meditations || [];
};

export const removeFavorite = async (id: string) => {
  const res = await api.delete(`/favorites/${id}`);
  return res.data.favorites.meditations || [];
};

/**
 * Check if a meditation is in favorites
 */
export const checkIsFavorite = async (meditationId: string) => {
  try {
    const res = await api.get(`/favorites/check/${meditationId}`);
    // Backend returns: { isFavorite: boolean }
    return res.data.isFavorite;
  } catch (error) {
    console.error("Failed to check favorite:", error);
    throw new Error("Failed to check favorite");
  }
};
