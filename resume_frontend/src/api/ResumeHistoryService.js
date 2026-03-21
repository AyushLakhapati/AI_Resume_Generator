import { axiosInstance } from "./ResumeService";

const getResumeHistory = async () => {
  const response = await axiosInstance.get("/api/v1/resume/history");
  return response.data;
};

const getResumeById = async (id) => {
  const response = await axiosInstance.get(`/api/v1/resume/history/${id}`);
  return response.data;
};

const deleteResume = async (id) => {
  const response = await axiosInstance.delete(`/api/v1/resume/history/${id}`);
  return response.data;
};

const ResumeHistoryService = {
  getResumeHistory,
  getResumeById,
  deleteResume,
};

export default ResumeHistoryService;
