const express = require("express");
const Patient = require("../models/Patient");

const router = express.Router();

function isValidDate(s) {
  if (!s) return false;
  const d = new Date(s);
  return !Number.isNaN(d.getTime());
}

// GET /patients
router.get("/", async (req, res, next) => {
  try {
    const items = await Patient.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (e) {
    next(e);
  }
});

// GET /patients/:id
router.get("/:id", async (req, res, next) => {
  try {
    const p = await Patient.findById(req.params.id);
    if (!p) return res.status(404).json({ error: "Patient not found" });
    res.json(p);
  } catch (e) {
    next(e);
  }
});

// POST /patients
router.post("/", async (req, res, next) => {
  try {
    const { firstName, lastName, birthDate, phone } = req.body || {};

    if (!firstName?.trim() || !lastName?.trim()) {
      return res.status(400).json({ error: "firstName and lastName are required" });
    }

    const patient = await Patient.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      birthDate: birthDate && isValidDate(birthDate) ? new Date(birthDate) : undefined,
      phone: phone ? String(phone).trim() : undefined,
    });

    res.status(201).json(patient);
  } catch (e) {
    next(e);
  }
});

// PUT /patients/:id (optionnel mais utile)
router.put("/:id", async (req, res, next) => {
  try {
    const { firstName, lastName, birthDate, phone } = req.body || {};

    const update = {};
    if (firstName !== undefined) update.firstName = String(firstName).trim();
    if (lastName !== undefined) update.lastName = String(lastName).trim();
    if (birthDate !== undefined) update.birthDate = isValidDate(birthDate) ? new Date(birthDate) : undefined;
    if (phone !== undefined) update.phone = phone ? String(phone).trim() : undefined;

    const updated = await Patient.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!updated) return res.status(404).json({ error: "Patient not found" });
    res.json(updated);
  } catch (e) {
    next(e);
  }
});

// DELETE /patients/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const removed = await Patient.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ error: "Patient not found" });
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
