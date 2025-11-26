import { api } from "@/lib/api";

export const createFeedback = async (form: {
  meditationId: string;
  rating: number;
  comment: string;
}) => {
  try {
    const response = await api.post("/feedbacks", form);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create feedback");
  }
};

export const getFeedbackForMeditation = async (meditationId: string) => {
  try {
    const response = await api.get(`/feedbacks/meditation/${meditationId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch feedback");
  }
};

export const deleteFeedback = async (feedbackId: string) => {
  try {
    const response = await api.delete(`/feedbacks/${feedbackId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete feedback");
  }
};
