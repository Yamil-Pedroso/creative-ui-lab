import { api } from "@/lib/api";

export const startSession = async (meditationId: string) => {
  try {
    const response = await api.post("/sessions", { meditationId });
    return response.data;
  } catch (error) {
    throw new Error("Failed to start session");
  }
};

export const finishSession = async (sessionId: string) => {
  try {
    const response = await api.patch(`/sessions/${sessionId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to finish session");
  }
};

export const getUserSessions = async () => {
  try {
    const response = await api.get("/sessions");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch sessions");
  }
};
