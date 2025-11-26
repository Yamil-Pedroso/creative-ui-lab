/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  loginUser,
  registerUser,
  fetchUserProfile,
} from "@/services/userService";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  hydrated: boolean; // 👈 necesario para saber cuando Zustand está listo

  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;

  loadProfile: () => Promise<void>;
  setHydrated: (value: boolean) => void; // 👈 marcaremos cuando hidrata
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      loading: false,
      error: null,
      hydrated: false, // 👈 estado inicial

      setHydrated: (value: boolean) => set({ hydrated: value }),

      login: async (email, password) => {
        try {
          set({ loading: true, error: null });

          const data = await loginUser({ email, password });

          set({
            token: data.token,
            user: data.user,
            loading: false,
          });

          return true;
        } catch (err: any) {
          set({ error: err.message, loading: false });
          return false;
        }
      },

      register: async (name, email, password) => {
        try {
          set({ loading: true, error: null });
          await registerUser({ name, email, password });
          set({ loading: false });
          return true;
        } catch (err: any) {
          set({ error: err.message, loading: false });
          return false;
        }
      },

      loadProfile: async () => {
        const token = get().token;
        if (!token) return;

        try {
          const user = await fetchUserProfile();
          set({ user });
        } catch (err: any) {
          console.error("Failed to load profile", err);
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          loading: false,
          error: null,
        });
      },
    }),
    {
      name: "zen-auth",
      onRehydrateStorage: () => (state) => {
        // 👇 Cuando Zustand termina de cargar desde localStorage:
        if (state) {
          state.setHydrated(true);
        }
      },
    }
  )
);
