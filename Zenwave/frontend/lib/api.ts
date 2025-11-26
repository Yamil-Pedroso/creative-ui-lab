import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";

export const api = axios.create({
  baseURL: "http://localhost:3010/api",
});

// Attach the token before every request
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token; // ← token REAL del store

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
