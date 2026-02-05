import { http } from "./http";

export const appointmentsApi = {
  list: async () => (await http.get("/api/appointments")).data,
  create: async (payload) => (await http.post("/api/appointments", payload)).data,
};
