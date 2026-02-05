const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const appointmentsRouter = require("./routes/appointments");

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || "*", credentials: false }));
app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true, service: "appointment-service" }));

app.use("/appointments", appointmentsRouter);

app.use((req, res) => res.status(404).json({ error: "Not found" }));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = Number(process.env.PORT || 4002);

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ appointment-service connected to MongoDB");
  app.listen(PORT, () => console.log(`✅ appointment-service on http://localhost:${PORT}`));
})();
