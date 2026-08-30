import { LayoutGrid } from "lucide-react";

import { C } from "../../styles/theme";
import { TulipGlyph } from "../TulipGlyph";

export function GardenGrid({ words }: { words: Array<{ id: string; tr: string; level: number }> }) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 10,
        }}
      >
        <LayoutGrid size={16} color={C.inkSoft} />
        <span className="lale-display" style={{ fontSize: 17, fontWeight: 600 }}>
          Your garden
        </span>
      </div>

      {words.length === 0 ? (
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
          Plant your first word and it&apos;ll bloom here as you review it.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(58px, 1fr))",
            gap: 10,
            background: "#fff",
            border: `1px solid ${C.line}`,
            borderRadius: 12,
            padding: 16,
          }}
        >
          {words
            .slice()
            .sort((a, b) => b.level - a.level)
            .map((word) => (
              <div
                key={word.id}
                title={`${word.tr} — level ${word.level}/5`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <TulipGlyph level={word.level} size={40} />
                <span
                  style={{
                    fontSize: 10.5,
                    color: C.inkSoft,
                    maxWidth: 56,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {word.tr}
                </span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
