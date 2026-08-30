import type { LucideIcon } from "lucide-react";

import { C } from "../../styles/theme";

type CategoryCardGridProps = {
  categories: Array<{
    key: string;
    label: string;
    count: number;
    icon: LucideIcon;
  }>;
  onSelect: (categoryKey: string) => void;
};

export function CategoryCardGrid({ categories, onSelect }: CategoryCardGridProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
        gap: 12,
      }}
    >
      {categories.map(({ key, label, count, icon: Icon }) => (
        <button
          key={key}
          type="button"
          className="lale-btn"
          onClick={() => onSelect(key)}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 10,
            textAlign: "left",
            background: "#fff",
            border: `1px solid ${C.line}`,
            borderRadius: 12,
            padding: "16px 16px",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 9,
              background: C.paperDeep,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon size={18} color={C.cobalt} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14.5 }}>{label}</div>
            <div style={{ fontSize: 12, color: C.inkSoft }}>{count} words</div>
          </div>
        </button>
      ))}
    </div>
  );
}
