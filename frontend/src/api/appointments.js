import { http } from "./http";

export const appointmentsApi = {
  list: async () => (await http.get("/appointments")).data,
  create: async (payload) => (await http.post("/appointments", payload)).data,
};
