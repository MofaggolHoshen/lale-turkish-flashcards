import { useState } from "react";
import { BookOpenText, X } from "lucide-react";
import { C, btnStyle, inputStyle } from "../styles/theme";
import { EmptyNote } from "./EmptyNote";
import { WordRow } from "./common/WordRow";
import { ActionButton } from "./common/ActionButton";
import { WordConjugationModal } from "./WordConjugationModal";

export function LibraryView({ words, updateWords }) {
  const [q, setQ] = useState("");
  const [conjugationLemma, setConjugationLemma] = useState<string | null>(null);
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
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <ActionButton
                      onClick={() => setConjugationLemma(w.tr)}
                      variant="secondary"
                      style={{
                        fontSize: 12,
                        padding: "6px 10px",
                        fontWeight: 800,
                      }}
                    >
                      <BookOpenText size={14} />
                      Conjugation
                    </ActionButton>
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
                }
              />
            ))}
        </div>
      )}
      <WordConjugationModal
        lemma={conjugationLemma}
        onClose={() => setConjugationLemma(null)}
      />
    </div>
  );
}
