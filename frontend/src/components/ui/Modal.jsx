import React, { useEffect } from "react";
import Button from "./Button";

export default function Modal({ open, title, children, onClose, footer, description }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in"
        onClick={onClose}
      />

      {/* dialog */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-xl rounded-3xl bg-white shadow-2xl ring-1 ring-slate-200 animate-pop overflow-hidden">
          {/* header */}
          <div className="px-6 py-5 bg-gradient-to-b from-white to-slate-50 border-b border-slate-100">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-base font-semibold text-slate-900">{title}</div>
                {description && (
                  <div className="text-sm text-slate-500 mt-1">{description}</div>
                )}
              </div>
              <Button variant="ghost" onClick={onClose} aria-label="Close">
                ✕
              </Button>
            </div>
          </div>

          {/* body */}
          <div className="p-6">{children}</div>

          {/* footer */}
          <div className="px-6 py-5 bg-slate-50/60 border-t border-slate-100 flex items-center justify-end gap-2">
            {footer}
          </div>
        </div>
      </div>
    </div>
  );
}
