import React, { useEffect, useMemo, useState } from "react";
import Card from "../components/ui/Card";
import Table from "../components/ui/Table";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import { patientsApi } from "../api/patients";
import { appointmentsApi } from "../api/appointments";
import { formatDateTime, isToday } from "../utils/date";

export default function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const [p, a] = await Promise.all([patientsApi.list(), appointmentsApi.list()]);
      setPatients(p || []);
      setAppointments(a || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const todayCount = useMemo(
    () => appointments.filter((x) => isToday(x.dateTime)).length,
    [appointments]
  );

  const upcoming = useMemo(() => {
    const now = Date.now();
    return [...appointments]
      .filter((a) => new Date(a.dateTime).getTime() >= now)
      .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime))
      .slice(0, 8);
  }, [appointments]);

  const patientMap = useMemo(() => {
    const m = new Map();
    for (const p of patients) m.set(p._id, p);
    return m;
  }, [patients]);

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
      render: (r) => <Badge tone={r.status === "cancelled" ? "danger" : "ok"}>{r.status || "scheduled"}</Badge>,
    },
  ];

  return (
        <div className="space-y-6">
          
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-slate-600 mt-1">
            Overview of patients and upcoming appointments.
          </p>
        </div>
        <Button onClick={load} variant="secondary">
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card title="Total Patients" subtitle="Registered in the system">
          <div className="text-3xl font-semibold">{loading ? "…" : patients.length}</div>
        </Card>

        <Card title="Appointments Today" subtitle="Scheduled for today">
          <div className="text-3xl font-semibold">{loading ? "…" : todayCount}</div>
        </Card>

        <Card title="Upcoming Appointments" subtitle="Next 8 appointments">
          <div className="text-3xl font-semibold">{loading ? "…" : upcoming.length}</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <Card
            title="Upcoming Appointments"
            subtitle="Sorted by date/time"
            right={<Badge>{appointments.length} total</Badge>}
          >
            <Table columns={columns} rows={upcoming.map((x) => ({ ...x, id: x._id }))} keyField="id" />
          </Card>
        </div>

        <div className="xl:col-span-1">
          <Card title="Recent Patients" subtitle="Last added patients">
            <div className="space-y-3">
              {[...patients].slice(-6).reverse().map((p) => (
                <div key={p._id} className="flex items-center justify-between rounded-xl border bg-white p-3">
                  <div>
                    <div className="text-sm font-medium">{p.firstName} {p.lastName}</div>
                    <div className="text-xs text-slate-500">{p.phone || "No phone"}</div>
                  </div>
                  <Badge>Patient</Badge>
                </div>
              ))}
              {patients.length === 0 && (
                <div className="text-sm text-slate-500">No patients yet.</div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
