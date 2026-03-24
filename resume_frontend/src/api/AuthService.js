import axios from "axios";
import { API_AUTH_URL } from "./apiConfig";

const login = async (username, password) => {
  console.log("AuthService: Attempting login for", username);
  const response = await axios.post(
    API_AUTH_URL + "signin",
    { username, password },
    { timeout: 15000 }
  );
  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  console.log("AuthService: Login response received", response.status);
  return response.data;
};

const signup = async (username, email, password) => {
  return axios.post(API_AUTH_URL + "signup", {
    username,
    email,
    password,
  });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  login,
  signup,
  logout,
  getCurrentUser,
};

export default AuthService;
