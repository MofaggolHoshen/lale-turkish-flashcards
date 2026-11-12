import { BookOpenText, Search, X } from "lucide-react";

import { searchVocabulary } from "../../data/vocabularySearch";
import { C, inputStyle } from "../../styles/theme";
import { SpeakButton } from "../SpeakButton";
import { ActionButton } from "../common/ActionButton";

type DictionarySearchProps = {
  query: string;
  onQueryChange: (query: string) => void;
  inGarden: (tr: string) => boolean;
  onAddToGarden: (tr: string, en: string) => void;
  onShowConjugation: (tr: string) => void;
};

export function DictionarySearch({
  query,
  onQueryChange,
  inGarden,
  onAddToGarden,
  onShowConjugation,
}: DictionarySearchProps) {
  const results = searchVocabulary(query);

  return (
    <div style={{ marginBottom: 18 }}>
      <label
        htmlFor="vocabulary-dictionary-search"
        style={{
          display: "block",
          color: C.cobalt,
          fontWeight: 700,
          fontSize: 13,
          marginBottom: 6,
        }}
      >
        Search the dictionary
      </label>
      <div style={{ position: "relative" }}>
        <Search
          size={17}
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 12,
            top: "50%",
            transform: "translateY(-50%)",
            color: C.inkSoft,
          }}
        />
        <input
          id="vocabulary-dictionary-search"
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search Turkish or English words…"
          style={{
            ...inputStyle,
            paddingLeft: 38,
            paddingRight: query ? 40 : 12,
          }}
        />
        {query && (
          <button
            type="button"
            onClick={() => onQueryChange("")}
            aria-label="Clear dictionary search"
            style={{
              position: "absolute",
              right: 8,
              top: "50%",
              transform: "translateY(-50%)",
              border: 0,
              background: "transparent",
              color: C.inkSoft,
              cursor: "pointer",
              display: "inline-flex",
              padding: 6,
            }}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {query.trim() && (
        <div style={{ marginTop: 14 }}>
          <div
            aria-live="polite"
            style={{ color: C.inkSoft, fontSize: 12.5, marginBottom: 8 }}
          >
            {results.length} {results.length === 1 ? "match" : "matches"}
          </div>
          {results.length === 0 ? (
            <div
              style={{
                background: "#fff",
                border: `1px solid ${C.line}`,
                borderRadius: 10,
                padding: 16,
                color: C.inkSoft,
                fontSize: 13.5,
              }}
            >
              No matching words found.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {results.map((result) => {
                const added = inGarden(result.tr);
                return (
                  <div
                    key={result.tr}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      flexWrap: "wrap",
                      background: "#fff",
                      border: `1px solid ${C.line}`,
                      borderRadius: 10,
                      padding: "10px 14px",
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 180 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                          flexWrap: "wrap",
                          fontSize: 14.5,
                        }}
                      >
                        <strong>{result.tr}</strong>
                        <SpeakButton text={result.tr} size={14} />
                        <span style={{ color: C.inkSoft }}>
                          → {result.meanings.join(" · ")}
                        </span>
                      </div>
                      <div
                        style={{
                          color: C.inkSoft,
                          fontSize: 11.5,
                          marginTop: 3,
                        }}
                      >
                        {result.categories.join(", ")}
                      </div>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      <ActionButton
                        onClick={() => onShowConjugation(result.tr)}
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
                      <ActionButton
                        onClick={() => onAddToGarden(result.tr, result.meanings[0])}
                        variant={added ? "primary" : "ghost"}
                        disabled={added}
                        style={{
                          fontSize: 12,
                          padding: "6px 10px",
                          fontWeight: 800,
                          background: added ? "#DCEFEC" : C.paperDeep,
                          color: added ? C.turquoise : C.cobalt,
                          border: added ? "1px solid #DCEFEC" : `1px solid ${C.line}`,
                        }}
                      >
                        {added ? "✓ In garden" : "+ Add to garden"}
                      </ActionButton>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
