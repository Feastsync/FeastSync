import axios from "axios";

const api = axios.create({
  baseURL: "https://feastsyn-booking-app.onrender.com",
  timeout: 80000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
