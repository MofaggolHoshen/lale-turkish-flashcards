import type { ReactNode } from "react";
import { C } from "../styles/theme";

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string | null;
  children: ReactNode;
}) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 12.5,
          color: C.inkSoft,
          marginBottom: 5,
          fontWeight: 600,
        }}
      >
        <span>{label}</span>
        {hint && (
          <span
            style={{ color: C.turquoise, fontWeight: 500, fontStyle: "italic" }}
          >
            {hint}
          </span>
        )}
      </label>
      {children}
    </div>
  );
}
