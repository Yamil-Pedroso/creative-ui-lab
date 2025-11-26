/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from "react";
import {
  startSession,
  finishSession,
  getUserSessions,
} from "@/services/sessionService";

export function useSession() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // -------------------------------
  // GET user sessions
  // -------------------------------
  const fetchSessions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getUserSessions();
      setSessions(data);

      return data;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // -------------------------------
  // START session
  // -------------------------------
  const startMeditationSession = useCallback(async (meditationId: string) => {
    try {
      setLoading(true);
      setError(null);

      const newSession = await startSession(meditationId);

      // Insert session locally
      setSessions((prev) => [newSession, ...prev]);

      return newSession;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // -------------------------------
  // FINISH session
  // -------------------------------
  const finishMeditationSession = useCallback(async (sessionId: string) => {
    try {
      setLoading(true);
      setError(null);

      const updated = await finishSession(sessionId);

      // Replace updated session in local state
      setSessions((prev) =>
        prev.map((s) => (s._id === sessionId ? updated.session : s))
      );

      return updated;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    sessions,
    loading,
    error,
    fetchSessions,
    startMeditationSession,
    finishMeditationSession,
  };
}
