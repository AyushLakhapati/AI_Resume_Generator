import axios from "axios";
import { API_BASE_URL } from "./apiConfig";

export const baseURLL = API_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: baseURLL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      config.headers["Authorization"] = "Bearer " + user.token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const generateResume = async (description, title) => {
  const response = await axiosInstance.post("/api/v1/resume/generate", {
    userDescription: description,
    title: title,
  });

  return response.data;
};
