/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from "react";
import {
  createFeedback,
  getFeedbackForMeditation,
  deleteFeedback,
} from "@/services/feedbackService";

export function useFeedback() {
  const [feedbackList, setFeedbackList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // -------------------------------
  // Fetch feedback for meditation
  // -------------------------------
  const fetchFeedback = useCallback(async (meditationId: string) => {
    try {
      setLoading(true);
      setError(null);

      const data = await getFeedbackForMeditation(meditationId);
      setFeedbackList(data);

      return data;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // -------------------------------
  // Create feedback
  // -------------------------------
  const submitFeedback = useCallback(
    async (form: { meditationId: string; rating: number; comment: string }) => {
      try {
        setLoading(true);
        setError(null);

        const created = await createFeedback(form);

        // Insert into feedback list
        setFeedbackList((prev) => [...prev, created]);

        return created;
      } catch (err: any) {
        setError(err.message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // -------------------------------
  // Delete feedback
  // -------------------------------
  const removeFeedback = useCallback(async (feedbackId: string) => {
    try {
      setLoading(true);
      setError(null);

      await deleteFeedback(feedbackId);

      // Remove from list
      setFeedbackList((prev) => prev.filter((f) => f._id !== feedbackId));

      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    feedbackList,
    loading,
    error,
    fetchFeedback,
    submitFeedback,
    removeFeedback,
  };
}
