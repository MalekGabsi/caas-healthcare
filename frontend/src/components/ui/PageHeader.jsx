import React from "react";
import Button from "./Button";

export default function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="rounded-3xl bg-white shadow-sm ring-1 ring-slate-200/70 overflow-hidden">
      <div className="px-6 py-5 bg-gradient-to-r from-emerald-50 via-white to-indigo-50">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h1>
            {subtitle && <p className="text-sm text-slate-600 mt-1">{subtitle}</p>}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      </div>
      <div className="h-px bg-slate-100" />
    </div>
  );
}
