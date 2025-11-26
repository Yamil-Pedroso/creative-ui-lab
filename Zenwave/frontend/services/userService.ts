import { api } from "@/lib/api";

export const registerUser = async (form: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await api.post("/auth/register", form);
    return response.data;
  } catch (error) {
    throw new Error("Registration failed");
  }
};

export const loginUser = async (form: { email: string; password: string }) => {
  try {
    const response = await api.post("/auth/login", form);
    return response.data;
  } catch (error) {
    throw new Error("Login failed");
  }
};

export const fetchUserProfile = async () => {
  try {
    const response = await api.get("/auth/profile");
    return response.data;
  } catch (error) {
    throw new Error("Fetching profile failed");
  }
};

export const updateUserProfile = async (form: {
  name?: string;
  email?: string;
}) => {
  try {
    const response = await api.put("/auth/profile", form);
    return response.data;
  } catch (error) {
    throw new Error("Updating profile failed");
  }
};

export const logoutUser = async () => {
  try {
    const response = await api.post("/auth/logout");
    return response.data;
  } catch (error) {
    throw new Error("Logout failed");
  }
};
