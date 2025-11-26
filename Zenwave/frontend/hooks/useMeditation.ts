/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useCallback } from "react";
import {
  getAllMeditations,
  getMeditationById,
  createMeditation,
  updateMeditation,
  deleteMeditation,
} from "@/services/meditationService";

import {
  Meditation,
  CreateMeditationDTO,
  UpdateMeditationDTO,
} from "@/types/meditations";

export function useMeditation() {
  const [meditations, setMeditations] = useState<Meditation[]>([]);
  const [meditation, setMeditation] = useState<Meditation | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ---------------------------
  // Get all meditations
  // ---------------------------
  const fetchMeditations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await getAllMeditations();

      const list: Meditation[] = Array.isArray(res)
        ? res
        : Array.isArray(res.meditations)
        ? res.meditations
        : [];

      setMeditations(list);
      return list;
    } catch (err: any) {
      setError(err.message || "Error loading meditations");
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // ---------------------------
  // Get meditation by ID
  // ---------------------------
  const fetchMeditation = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const data: Meditation = await getMeditationById(id);
      setMeditation(data);

      return data;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // ---------------------------
  // Create meditation
  // ---------------------------
  const create = useCallback(async (form: CreateMeditationDTO) => {
    try {
      setLoading(true);
      setError(null);

      const newMeditation: Meditation = await createMeditation(form);
      setMeditations((prev) => [...prev, newMeditation]);

      return newMeditation;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // ---------------------------
  // Update meditation
  // ---------------------------
  const update = useCallback(
    async (id: string, form: UpdateMeditationDTO) => {
      try {
        setLoading(true);
        setError(null);

        const updated: Meditation = await updateMeditation(id, form);

        setMeditations((prev) => prev.map((m) => (m._id === id ? updated : m)));

        if (meditation?._id === id) setMeditation(updated);

        return updated;
      } catch (err: any) {
        setError(err.message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [meditation]
  );

  // ---------------------------
  // Delete meditation
  // ---------------------------
  const remove = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      await deleteMeditation(id);
      setMeditations((prev) => prev.filter((m) => m._id !== id));

      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    meditations,
    meditation,
    loading,
    error,
    fetchMeditations,
    fetchMeditation,
    create,
    update,
    remove,
  };
}
