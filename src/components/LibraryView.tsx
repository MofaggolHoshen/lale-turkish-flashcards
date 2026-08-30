import { useState } from "react";
import { X } from "lucide-react";
import { C, btnStyle, inputStyle } from "../styles/theme";
import { EmptyNote } from "./EmptyNote";
import { WordRow } from "./common/WordRow";

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
              <WordRow
                key={w.id}
                word={w}
                actions={
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
                }
              />
            ))}
        </div>
      )}
    </div>
  );
}
