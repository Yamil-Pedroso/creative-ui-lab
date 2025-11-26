import { api } from "@/lib/api";

export const getAllMeditations = async () => {
  try {
    const response = await api.get("/meditations");
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch meditations");
  }
};

export const getMeditationById = async (id: string) => {
  try {
    const response = await api.get(`/meditations/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch meditation");
  }
};

export const createMeditation = async (form: {
  title: string;
  category: string;
  duration: number;
  level: string;
  description: string;
  audioUrl: string;
  videoUrl?: string;
  imageUrl: string;
}) => {
  try {
    const response = await api.post("/meditations", form);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create meditation");
  }
};

export const updateMeditation = async (
  id: string,
  form: {
    title?: string;
    category?: string;
    duration?: number;
    level?: string;
    description?: string;
    audioUrl?: string;
    videoUrl?: string;
    imageUrl?: string;
  }
) => {
  try {
    const response = await api.put(`/meditations/${id}`, form);
    return response.data;
  } catch (error) {
    throw new Error("Failed to update meditation");
  }
};

export const deleteMeditation = async (id: string) => {
  try {
    const response = await api.delete(`/meditations/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete meditation");
  }
};
