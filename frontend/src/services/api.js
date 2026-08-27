import axios from "axios";

const api = axios.create({
  baseURL: "https://deepvision-ai-backend.onrender.com",
  timeout: 120000,
});

export default api;