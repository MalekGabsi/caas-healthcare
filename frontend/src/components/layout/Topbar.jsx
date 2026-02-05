import React from "react";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
      <div className="px-6 py-3 flex items-center justify-between">
        <div className="text-sm text-slate-600">
          <span className="font-semibold text-slate-900">Mini Health App</span>
          <span className="mx-2 text-slate-300">/</span>
          <span>Dashboard</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-xs text-slate-500">
            Connected to API Gateway
          </div>
          <div className="h-9 w-9 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm">
            YB
          </div>
        </div>
      </div>
    </header>
  );
}
