import React from "react";
import { NavLink } from "react-router-dom";

const NavItem = ({ to, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `block rounded-lg px-3 py-2 text-sm font-medium transition ${
        isActive
          ? "bg-slate-900 text-white"
          : "text-slate-700 hover:bg-slate-100"
      }`
    }
  >
    {label}
  </NavLink>
);

export default function Sidebar() {
  return (
<aside className="hidden md:flex md:w-64 md:flex-col border-r bg-white sticky top-0 h-screen">
<div className="p-5 border-b">
        <div className="text-lg font-semibold">Health Dashboard</div>
        <div className="text-xs text-slate-500">Patients & Appointments</div>
      </div>

      <nav className="p-4 space-y-2">
        <NavItem to="/dashboard" label="Dashboard" />
        <NavItem to="/patients" label="Patients" />
        <NavItem to="/appointments" label="Appointments" />
      </nav>

      <div className="mt-auto p-4 border-t text-xs text-slate-500">
        MERN Microservices UI
      </div>
    </aside>
  );
}
