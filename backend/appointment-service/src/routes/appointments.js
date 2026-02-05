const express = require("express");
const Appointment = require("../models/Appointment");

const router = express.Router();

function parseDateTime(dt) {
  const d = new Date(dt);
  return Number.isNaN(d.getTime()) ? null : d;
}

// GET /appointments?patientId=&date=YYYY-MM-DD
router.get("/", async (req, res, next) => {
  try {
    const { patientId, date } = req.query;
    const filter = {};

    if (patientId) filter.patientId = String(patientId);

    if (date) {
      const start = new Date(`${date}T00:00:00.000Z`);
      const end = new Date(`${date}T23:59:59.999Z`);
      filter.dateTime = { $gte: start, $lte: end };
    }

    const items = await Appointment.find(filter).sort({ dateTime: 1 });
    res.json(items);
  } catch (e) {
    next(e);
  }
});

// GET /appointments/stats/summary  (Dashboard KPI)
router.get("/stats/summary", async (req, res, next) => {
  try {
    const now = new Date();

    const startToday = new Date(now);
    startToday.setHours(0, 0, 0, 0);

    const endToday = new Date(now);
    endToday.setHours(23, 59, 59, 999);

    const startWeek = new Date(now);
    startWeek.setDate(startWeek.getDate() - 6);
    startWeek.setHours(0, 0, 0, 0);

    const [today, week, upcoming] = await Promise.all([
      Appointment.countDocuments({ dateTime: { $gte: startToday, $lte: endToday }, status: "scheduled" }),
      Appointment.countDocuments({ dateTime: { $gte: startWeek, $lte: endToday }, status: "scheduled" }),
      Appointment.countDocuments({ dateTime: { $gte: now }, status: "scheduled" }),
    ]);

    res.json({ today, week, upcoming });
  } catch (e) {
    next(e);
  }
});

// POST /appointments
router.post("/", async (req, res, next) => {
  try {
    const { patientId, dateTime, reason, status } = req.body || {};

    if (!patientId || !dateTime || !reason?.trim()) {
      return res.status(400).json({ error: "patientId, dateTime and reason are required" });
    }

    const dt = parseDateTime(dateTime);
    if (!dt) return res.status(400).json({ error: "Invalid dateTime" });

    // Rule: no past appointments
    if (dt.getTime() < Date.now()) {
      return res.status(400).json({ error: "Cannot create an appointment in the past" });
    }

    const created = await Appointment.create({
      patientId: String(patientId),
      dateTime: dt,
      reason: String(reason).trim(),
      status: status === "cancelled" ? "cancelled" : "scheduled",
    });

    res.status(201).json(created);
  } catch (e) {
    // duplicate slot
    if (e?.code === 11000) {
      return res.status(409).json({ error: "This patient already has an appointment at this time" });
    }
    next(e);
  }
});

// PATCH /appointments/:id/cancel
router.patch("/:id/cancel", async (req, res, next) => {
  try {
    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: "cancelled" },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Appointment not found" });
    res.json(updated);
  } catch (e) {
    next(e);
  }
});

// DELETE /appointments/:id (optionnel)
router.delete("/:id", async (req, res, next) => {
  try {
    const removed = await Appointment.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ error: "Appointment not found" });
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
