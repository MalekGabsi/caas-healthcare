import { http } from "./http";

export const patientsApi = {
  list: async () => (await http.get("/patients")).data,
  create: async (payload) => (await http.post("/patients", payload)).data,
  remove: async (id) => (await http.delete(`/patients/${id}`)).data,
};
