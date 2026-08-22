import { C } from "../styles/theme";

export function EmptyNote({ text }) {
  return (
    <div
      style={{
        background: "#fff",
        border: `1px dashed ${C.line}`,
        borderRadius: 12,
        padding: 24,
        textAlign: "center",
        color: C.inkSoft,
        fontSize: 14,
      }}
    >
      {text}
    </div>
  );
}
