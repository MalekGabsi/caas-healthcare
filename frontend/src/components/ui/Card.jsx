import React from "react";

export default function Card({ title, subtitle, children, right }) {
  return (
    <div className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/70">
      {(title || subtitle || right) && (
        <div className="px-5 py-4 border-b border-slate-100 flex items-start justify-between gap-4">
          <div>
            {title && <div className="text-sm font-semibold text-slate-900">{title}</div>}
            {subtitle && <div className="text-xs text-slate-500 mt-1">{subtitle}</div>}
          </div>
          {right && <div className="shrink-0">{right}</div>}
        </div>
      )}
      {children && <div className="p-5">{children}</div>}
    </div>
  );
}
