/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from "react";
import {
  registerUser,
  loginUser,
  fetchUserProfile,
  updateUserProfile,
  logoutUser,
} from "@/services/userService";

export function useUser() {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // REGISTER
  const register = useCallback(
    async (form: { name: string; email: string; password: string }) => {
      try {
        setLoading(true);
        setError(null);

        const res = await registerUser(form);
        return res;
      } catch (err: any) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // LOGIN
  const login = useCallback(
    async (form: { email: string; password: string }) => {
      try {
        setLoading(true);
        setError(null);

        const res = await loginUser(form);

        // Save token in state + localStorage
        setToken(res.token);
        localStorage.setItem("token", res.token);

        setUser(res.user);

        return res;
      } catch (err: any) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // FETCH PROFILE
  const getProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetchUserProfile();
      setUser(res);
      return res;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // UPDATE PROFILE
  const updateProfile = useCallback(
    async (form: { name?: string; email?: string }) => {
      try {
        setLoading(true);
        setError(null);

        const res = await updateUserProfile(form);
        setUser(res);
        return res;
      } catch (err: any) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // LOGOUT
  const logout = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      await logoutUser();

      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    user,
    token,
    loading,
    error,
    register,
    login,
    getProfile,
    updateProfile,
    logout,
  };
}
