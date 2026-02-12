import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

if (!API_BASE) {
  throw new Error("VITE_API_BASE is not defined at build time");
}

export const http = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});
