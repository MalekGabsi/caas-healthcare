import React from "react";

export default function Button({ children, variant = "primary", ...props }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold " +
    "transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed " +
    "focus:outline-none focus:ring-2 focus:ring-emerald-200";

  const styles = {
    primary:
      "text-white bg-gradient-to-b from-emerald-500 to-emerald-700 " +
      "shadow-sm hover:shadow-md hover:brightness-[1.02]",
    secondary:
      "bg-white text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50 hover:ring-slate-300",
    ghost:
      "bg-transparent text-slate-700 hover:bg-slate-100",
    danger:
      "text-white bg-gradient-to-b from-rose-500 to-rose-700 shadow-sm hover:shadow-md",
  };

  return (
    <button {...props} className={`${base} ${styles[variant]} ${props.className || ""}`}>
      {children}
    </button>
  );
}
