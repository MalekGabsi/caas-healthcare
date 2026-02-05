import React from "react";
import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function AppShell({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 min-w-0">
          <Topbar />
          <main className="p-8 space-y-8 max-w-7xl mx-auto">{children}</main>
        </div>
      </div>
    </div>
  );
}
