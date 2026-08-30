import type { GrammarLevel } from "../../data/grammar";
import { C } from "../../styles/theme";

type GrammarLevelSelectorProps = {
  levels: GrammarLevel[];
  selectedLevel: string;
  onSelectLevel: (levelId: string) => void;
};

export function GrammarLevelSelector({
  levels,
  selectedLevel,
  onSelectLevel,
}: GrammarLevelSelectorProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: 12,
      }}
    >
      {levels.map((item) => {
        const active = item.id === selectedLevel;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelectLevel(item.id)}
            style={{
              textAlign: "left",
              border: active ? `2px solid ${C.cobalt}` : `1px solid ${C.line}`,
              background: active ? "#EAF5F4" : "#fff",
              borderRadius: 12,
              padding: "16px 14px",
              cursor: "pointer",
              color: C.ink,
              boxShadow: active ? "0 8px 18px rgba(15, 76, 92, 0.08)" : "none",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 30,
                height: 30,
                borderRadius: 8,
                background: active ? C.cobalt : C.paperDeep,
                color: "#fff",
                fontWeight: 800,
                fontSize: 13,
                marginBottom: 10,
              }}
            >
              {item.label}
            </div>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
              {item.title}
            </div>
            <div style={{ fontSize: 12.5, color: C.inkSoft }}>{item.subtitle}</div>
            <div
              style={{
                marginTop: 10,
                color: C.cobalt,
                fontWeight: 700,
                fontSize: 12,
              }}
            >
              {item.lessons.length} lesson{item.lessons.length === 1 ? "" : "s"}
            </div>
          </button>
        );
      })}
    </div>
  );
}
