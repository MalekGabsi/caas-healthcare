import React from "react";

export default function Table({ columns, rows, keyField = "id" }) {
  return (
    <div className="overflow-x-auto rounded-2xl ring-1 ring-slate-200 bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50">
          <tr>
            {columns.map((c) => (
              <th
                key={c.key}
                className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500"
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((r) => (
            <tr key={r[keyField]} className="hover:bg-slate-50/70 transition">
              {columns.map((c) => (
                <td key={c.key} className="px-4 py-3 text-slate-700">
                  {c.render ? c.render(r) : r[c.key]}
                </td>
              ))}
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-4 py-10 text-center text-slate-500">
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
