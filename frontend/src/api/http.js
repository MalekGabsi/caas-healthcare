import axios from "axios";

// Prefer build-time env, but default to same-origin API via Ingress
const API_BASE = import.meta.env.VITE_API_BASE || "/api";

export const http = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});
