import React from "react";

export default function Select({ label, children, ...props }) {
  return (
    <label className="block">
      {label && <div className="text-xs font-semibold text-slate-700 mb-1">{label}</div>}
      <select
        {...props}
        className={[
          "w-full rounded-xl bg-white px-3 py-2.5 text-sm text-slate-900",
          "ring-1 ring-slate-200",
          "focus:outline-none focus:ring-2 focus:ring-emerald-200",
        ].join(" ")}
      >
        {children}
      </select>
    </label>
  );
}
