import axios from "axios";

export const API = axios.create({
  baseURL: "https://demoapp-slog.onrender.com/api",
});
