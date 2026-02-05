const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const patientsRouter = require("./routes/patients");

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || "*", credentials: false }));
app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true, service: "patient-service" }));

app.use("/patients", patientsRouter);

app.use((req, res) => res.status(404).json({ error: "Not found" }));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = Number(process.env.PORT || 4001);

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ patient-service connected to MongoDB");
  app.listen(PORT, () => console.log(`✅ patient-service on http://localhost:${PORT}`));
})();
