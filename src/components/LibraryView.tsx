import { useState } from "react";
import { X } from "lucide-react";
import { C, btnStyle, inputStyle } from "../styles/theme";
import { SpeakButton } from "./SpeakButton";
import { TulipGlyph } from "./TulipGlyph";
import { EmptyNote } from "./EmptyNote";

export function LibraryView({ words, updateWords }) {
  const [q, setQ] = useState("");
  const filtered = words.filter(
    (w) =>
      w.tr.toLowerCase().includes(q.toLowerCase()) ||
      w.en.toLowerCase().includes(q.toLowerCase()),
  );

  const remove = (id) => updateWords(words.filter((w) => w.id !== id));

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 14,
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        <div className="lale-display" style={{ fontSize: 20, fontWeight: 600 }}>
          Library ({words.length})
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search…"
          style={{ ...inputStyle, width: 200 }}
        />
      </div>
      {filtered.length === 0 ? (
        <EmptyNote
          text={words.length === 0 ? "No words planted yet." : "No matches."}
        />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filtered
            .slice()
            .sort((a, b) => b.createdAt - a.createdAt)
            .map((w) => (
              <div
                key={w.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  background: "#fff",
                  border: `1px solid ${C.line}`,
                  borderRadius: 10,
                  padding: "10px 14px",
                }}
              >
                <TulipGlyph level={w.level} size={34} />
                {w.emoji && <span style={{ fontSize: 22 }}>{w.emoji}</span>}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 14.5,
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    {w.tr} <SpeakButton text={w.tr} size={14} />
                    <span style={{ color: C.inkSoft, fontWeight: 500 }}>
                      → {w.en}
                    </span>
                  </div>
                  {w.notes && (
                    <div style={{ fontSize: 12, color: C.inkSoft }}>
                      {w.notes}
                    </div>
                  )}
                </div>
                <div
                  style={{
                    fontSize: 11.5,
                    color: C.inkSoft,
                    whiteSpace: "nowrap",
                  }}
                >
                  {w.correct}✓ / {w.wrong}✗
                </div>
                <button
                  className="lale-btn"
                  onClick={() => remove(w.id)}
                  title="Remove"
                  style={{
                    ...btnStyle("transparent", C.coral, false),
                    padding: 6,
                  }}
                >
                  <X size={15} />
                </button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
