const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { createProxyMiddleware } = require("http-proxy-middleware");

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || "*", credentials: false }));

app.get("/health", (req, res) => res.json({ ok: true, service: "api-gateway" }));

const patientTarget = process.env.PATIENT_SERVICE_URL || "http://localhost:4001";
const appointmentTarget = process.env.APPOINTMENT_SERVICE_URL || "http://localhost:4002";

app.use(
    "/patients",
    createProxyMiddleware({
      target: patientTarget,
      changeOrigin: true,
      pathRewrite: (path) => `/patients${path}`,
      logLevel: "silent",
    })
  );
  
  app.use(
    "/appointments",
    createProxyMiddleware({
      target: appointmentTarget,
      changeOrigin: true,
      pathRewrite: (path) => `/appointments${path}`,
      logLevel: "silent",
    })
  );
  

const PORT = Number(process.env.PORT || 4000);
app.listen(PORT, () => console.log(`✅ api-gateway on http://localhost:${PORT}`));
