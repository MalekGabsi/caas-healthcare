import axios from "axios";

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://api-gateway:4000",
  timeout: 10000,
});
