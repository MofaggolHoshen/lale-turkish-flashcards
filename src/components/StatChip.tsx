import { C } from "../styles/theme";

export function StatChip({ icon, label, value }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: "#fff",
        border: `1px solid ${C.line}`,
        borderRadius: 10,
        padding: "10px 16px",
      }}
    >
      <div>{icon}</div>
      <div>
        <div style={{ fontSize: 18, fontWeight: 700, lineHeight: 1 }}>
          {value}
        </div>
        <div style={{ fontSize: 11.5, color: C.inkSoft }}>{label}</div>
      </div>
    </div>
  );
}
