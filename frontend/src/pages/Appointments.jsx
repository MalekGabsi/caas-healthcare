import React, { useEffect, useMemo, useState } from "react";
import Card from "../components/ui/Card";
import Table from "../components/ui/Table";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Modal from "../components/ui/Modal";
import Badge from "../components/ui/Badge";
import PageHeader from "../components/ui/PageHeader";
import { patientsApi } from "../api/patients";
import { appointmentsApi } from "../api/appointments";
import { formatDateTime } from "../utils/date";

export default function Appointments() {
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [open, setOpen] = useState(false);

  const [filterPatientId, setFilterPatientId] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const [form, setForm] = useState({ patientId: "", dateTime: "", reason: "" });

  async function load() {
    const [p, a] = await Promise.all([patientsApi.list(), appointmentsApi.list()]);
    setPatients(p || []);
    setAppointments(a || []);
  }

  useEffect(() => { load(); }, []);

  const patientMap = useMemo(() => {
    const m = new Map();
    for (const p of patients) m.set(p._id, p);
    return m;
  }, [patients]);

  const filtered = useMemo(() => {
    return appointments
      .filter((a) => (filterPatientId ? a.patientId === filterPatientId : true))
      .filter((a) => (filterDate ? String(a.dateTime).slice(0, 10) === filterDate : true))
      .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
  }, [appointments, filterPatientId, filterDate]);

  async function onCreate() {
    if (!form.patientId || !form.dateTime || !form.reason.trim()) return;

    await appointmentsApi.create({
      patientId: form.patientId,
      dateTime: form.dateTime,
      reason: form.reason.trim(),
      status: "scheduled",
    });

    setForm({ patientId: "", dateTime: "", reason: "" });
    setOpen(false);
    await load();
  }

  const columns = [
    { key: "dateTime", header: "Date", render: (r) => formatDateTime(r.dateTime) },
    {
      key: "patient",
      header: "Patient",
      render: (r) => {
        const p = patientMap.get(r.patientId);
        return p ? `${p.firstName} ${p.lastName}` : <span className="text-slate-500">Unknown</span>;
      },
    },
    { key: "reason", header: "Reason" },
    {
      key: "status",
      header: "Status",
      render: (r) => (
        <Badge tone={r.status === "cancelled" ? "danger" : "ok"}>
          {r.status || "scheduled"}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Appointments"
        subtitle="Schedule and manage patient appointments."
        actions={
          <>
            <Button variant="secondary" onClick={load}>Refresh</Button>
            <Button onClick={() => setOpen(true)}>+ Add appointment</Button>
          </>
        }
      />

      <Card
        title="Filters"
        subtitle="Filter by patient and date"
        right={<Badge>{filtered.length} shown</Badge>}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select label="Patient" value={filterPatientId} onChange={(e) => setFilterPatientId(e.target.value)}>
            <option value="">All patients</option>
            {patients.map((p) => (
              <option key={p._id} value={p._id}>
                {p.firstName} {p.lastName}
              </option>
            ))}
          </Select>

          <Input label="Date" type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} />

          <div className="flex items-end gap-2">
            <Button variant="secondary" onClick={() => { setFilterPatientId(""); setFilterDate(""); }}>
              Reset
            </Button>
            <Button variant="secondary" onClick={load}>
              Apply
            </Button>
          </div>
        </div>
      </Card>

      <Card title="Appointments list" subtitle="Sorted by date/time">
        <Table columns={columns} rows={filtered.map((a) => ({ ...a, id: a._id }))} keyField="id" />
      </Card>

      <Modal
        open={open}
        title="Add appointment"
        description="Choose a patient, pick date/time, and enter the reason."
        onClose={() => setOpen(false)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={onCreate}>Create appointment</Button>
          </>
        }
      >
        <div className="grid grid-cols-1 gap-4">
          <Select
            label="Patient"
            value={form.patientId}
            onChange={(e) => setForm((f) => ({ ...f, patientId: e.target.value }))}
          >
            <option value="">Select a patient</option>
            {patients.map((p) => (
              <option key={p._id} value={p._id}>
                {p.firstName} {p.lastName}
              </option>
            ))}
          </Select>

          <Input
            label="Date & time"
            type="datetime-local"
            value={form.dateTime}
            onChange={(e) => setForm((f) => ({ ...f, dateTime: e.target.value }))}
          />

          <Input
            label="Reason"
            placeholder="Ex: Consultation, follow-up..."
            value={form.reason}
            onChange={(e) => setForm((f) => ({ ...f, reason: e.target.value }))}
          />

          <div className="rounded-2xl bg-slate-50 ring-1 ring-slate-200 p-4 text-sm text-slate-600">
            <span className="font-semibold text-slate-900">Pro tip:</span> Keep appointment reasons short and consistent
            (e.g., “Consultation”, “Follow-up”, “Lab review”) for better reporting.
          </div>
        </div>
      </Modal>
    </div>
  );
}
