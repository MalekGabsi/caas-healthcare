import React, { useEffect, useMemo, useState } from "react";
import Card from "../components/ui/Card";
import Table from "../components/ui/Table";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Modal from "../components/ui/Modal";
import PageHeader from "../components/ui/PageHeader";
import { patientsApi } from "../api/patients";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({ firstName: "", lastName: "", birthDate: "", phone: "" });

  async function load() {
    const data = await patientsApi.list();
    setPatients(data || []);
  }

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return patients;
    return patients.filter((p) => `${p.firstName} ${p.lastName}`.toLowerCase().includes(s));
  }, [patients, q]);

  async function onCreate() {
    if (!form.firstName.trim() || !form.lastName.trim()) return;
    await patientsApi.create({
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      birthDate: form.birthDate || undefined,
      phone: form.phone || undefined,
    });
    setForm({ firstName: "", lastName: "", birthDate: "", phone: "" });
    setOpen(false);
    await load();
  }

  async function onDelete(id) {
    await patientsApi.remove(id);
    await load();
  }

  const columns = [
    { key: "name", header: "Name", render: (r) => `${r.firstName} ${r.lastName}` },
    { key: "birthDate", header: "Birth date", render: (r) => (r.birthDate ? String(r.birthDate).slice(0, 10) : "—") },
    { key: "phone", header: "Phone", render: (r) => r.phone || "—" },
    {
      key: "actions",
      header: "",
      render: (r) => (
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={() => onDelete(r._id)}>Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Patients"
        subtitle="Create, search and manage patient records."
        actions={<Button onClick={() => setOpen(true)}>+ Add patient</Button>}
      />

      <Card
        title="Patients list"
        subtitle="Search by full name"
        right={
          <div className="w-72">
            <Input placeholder="Search patients…" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
        }
      >
        <Table columns={columns} rows={filtered.map((p) => ({ ...p, id: p._id }))} keyField="id" />
      </Card>

      <Modal
        open={open}
        title="Add patient"
        description="Fill the basic patient information. You can edit later."
        onClose={() => setOpen(false)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={onCreate}>Create patient</Button>
          </>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="First name"
            value={form.firstName}
            onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
          />
          <Input
            label="Last name"
            value={form.lastName}
            onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
          />
          <Input
            label="Birth date"
            type="date"
            value={form.birthDate}
            onChange={(e) => setForm((f) => ({ ...f, birthDate: e.target.value }))}
          />
          <Input
            label="Phone"
            placeholder="06..."
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          />
        </div>

        <div className="mt-5 rounded-2xl bg-emerald-50 ring-1 ring-emerald-100 p-4 text-sm text-emerald-800">
          Tip: keep phone number format consistent for easier search.
        </div>
      </Modal>
    </div>
  );
}
