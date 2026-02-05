import { http } from "./http";

export const patientsApi = {
  list: async () => (await http.get("/api/patients")).data,
  create: async (payload) => (await http.post("/api/patients", payload)).data,
  remove: async (id) => (await http.delete(`/api/patients/${id}`)).data,
};
