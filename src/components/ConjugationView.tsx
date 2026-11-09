import { useMemo, useState } from "react";
import type { KeyboardEvent } from "react";
import { Search, X } from "lucide-react";

import {
  conjugationWords,
  normalizeSearchText,
  type ConjugationWord,
  type PersonForms,
} from "../data/conjugations";
import { C } from "../styles/theme";

const MAX_SUGGESTIONS = 10;

function formatMeaning(word: ConjugationWord): string {
  const english = word.englishMeaning ?? "English meaning not yet available";
  return `${english} (${word.bengaliMeaning})`;
}

function FormsTable({
  title,
  forms,
  partial = false,
}: {
  title: string;
  forms: PersonForms[];
  partial?: boolean;
}) {
  return (
    <section
      style={{
        background: "#fff",
        border: `1px solid ${C.line}`,
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "13px 16px",
          background: C.paperDeep,
          borderBottom: `1px solid ${C.line}`,
          fontWeight: 800,
          color: C.cobalt,
        }}
      >
        {title}
      </div>
      {partial && (
        <p style={{ margin: "12px 16px 0", color: C.inkSoft, fontSize: 12.5 }}>
          The source includes only the Ben forms for this word.
        </p>
      )}
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            minWidth: 680,
            borderCollapse: "collapse",
            fontSize: 13,
            textAlign: "left",
          }}
        >
          <thead>
            <tr>
              {["Person", "Positive", "Negative", "Question", "Negative question"].map(
                (heading) => (
                  <th
                    key={heading}
                    scope="col"
                    style={{
                      padding: "10px 12px",
                      color: C.inkSoft,
                      borderBottom: `1px solid ${C.line}`,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {heading}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {forms.map((row) => (
              <tr key={row.person}>
                <th
                  scope="row"
                  style={{
                    padding: "10px 12px",
                    borderBottom: `1px solid ${C.line}`,
                    color: C.cobalt,
                    whiteSpace: "nowrap",
                  }}
                >
                  {row.person}
                </th>
                {[row.positive, row.negative, row.question, row.negativeQuestion].map(
                  (form, index) => (
                    <td
                      key={`${row.person}-${index}`}
                      style={{
                        padding: "10px 12px",
                        borderBottom: `1px solid ${C.line}`,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {form}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function ConjugationView() {
  const [query, setQuery] = useState("");
  const [selectedWord, setSelectedWord] = useState<ConjugationWord | null>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);

  const matches = useMemo(() => {
    const normalizedQuery = normalizeSearchText(query.trim());
    if (!normalizedQuery) return [];

    return conjugationWords
      .filter((word) =>
        normalizeSearchText(
          `${word.lemma} ${word.englishMeaning ?? ""} ${word.bengaliMeaning}`,
        ).includes(normalizedQuery),
      )
      .sort((left, right) => {
        const leftLemma = normalizeSearchText(left.lemma);
        const rightLemma = normalizeSearchText(right.lemma);
        const leftStartsWith = leftLemma.startsWith(normalizedQuery);
        const rightStartsWith = rightLemma.startsWith(normalizedQuery);

        if (leftStartsWith !== rightStartsWith) return leftStartsWith ? -1 : 1;
        if (leftStartsWith && rightStartsWith) {
          return leftLemma.length - rightLemma.length;
        }
        return left.lemma.localeCompare(right.lemma, "tr");
      })
      .slice(0, MAX_SUGGESTIONS);
  }, [query]);

  const chooseWord = (word: ConjugationWord) => {
    setSelectedWord(word);
    setQuery(word.lemma);
    setIsOpen(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown" && matches.length > 0) {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((index) => (index + 1) % matches.length);
    } else if (event.key === "ArrowUp" && matches.length > 0) {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((index) => (index <= 0 ? matches.length - 1 : index - 1));
    } else if (event.key === "Enter" && isOpen && matches[activeIndex]) {
      event.preventDefault();
      chooseWord(matches[activeIndex]);
    } else if (event.key === "Escape") {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  const showSuggestions = isOpen && query.trim().length > 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <header>
        <div className="lale-display" style={{ fontSize: 24, fontWeight: 600 }}>
          Conjugation
        </div>
        <div style={{ color: C.inkSoft, fontSize: 13 }}>
          Search a Turkish word to see its meaning and available forms.
        </div>
      </header>

      <div style={{ position: "relative" }}>
        <label
          htmlFor="conjugation-search"
          style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: 7 }}
        >
          Search words
        </label>
        <div style={{ position: "relative" }}>
          <Search
            size={18}
            aria-hidden="true"
            style={{
              position: "absolute",
              left: 13,
              top: "50%",
              transform: "translateY(-50%)",
              color: C.inkSoft,
            }}
          />
          <input
            id="conjugation-search"
            type="search"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={showSuggestions}
            aria-controls="conjugation-suggestions"
            aria-activedescendant={
              showSuggestions && activeIndex >= 0
                ? `conjugation-option-${activeIndex}`
                : undefined
            }
            autoComplete="off"
            placeholder="Type a Turkish word or meaning…"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setSelectedWord(null);
              setActiveIndex(-1);
              setIsOpen(true);
            }}
            onFocus={() => query.trim() && setIsOpen(true)}
            onKeyDown={handleKeyDown}
            style={{
              width: "100%",
              boxSizing: "border-box",
              border: `1px solid ${C.line}`,
              borderRadius: 10,
              padding: "12px 42px",
              fontSize: 15,
              outlineColor: C.turquoise,
            }}
          />
          {query && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => {
                setQuery("");
                setSelectedWord(null);
                setIsOpen(false);
                setActiveIndex(-1);
              }}
              style={{
                position: "absolute",
                right: 8,
                top: "50%",
                transform: "translateY(-50%)",
                border: 0,
                background: "transparent",
                color: C.inkSoft,
                cursor: "pointer",
                padding: 6,
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {showSuggestions && (
          <div
            style={{
              position: "absolute",
              zIndex: 2,
              top: "100%",
              left: 0,
              right: 0,
              background: "#fff",
              border: `1px solid ${C.line}`,
              borderRadius: 10,
              boxShadow: "0 8px 24px rgba(16, 40, 62, 0.12)",
              overflow: "hidden",
            }}
          >
            {matches.length > 0 ? (
              <ul
                id="conjugation-suggestions"
                role="listbox"
                aria-label="Matching Turkish words"
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 4,
                  maxHeight: "min(60vh, 320px)",
                  overflowY: "auto",
                  overscrollBehavior: "contain",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                {matches.map((word, index) => (
                  <li key={`${word.lemma}-${word.partOfSpeech}`}>
                    <button
                      type="button"
                      role="option"
                      id={`conjugation-option-${index}`}
                      aria-selected={activeIndex === index}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => chooseWord(word)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 12,
                        width: "100%",
                        border: 0,
                        borderRadius: 7,
                        padding: "10px 12px",
                        background: activeIndex === index ? C.paperDeep : "#fff",
                        textAlign: "left",
                        cursor: "pointer",
                      }}
                    >
                      <span>
                        <strong style={{ color: C.cobalt }}>{word.lemma}</strong>
                        <span style={{ display: "block", color: C.inkSoft, fontSize: 12.5 }}>
                          {formatMeaning(word)}
                        </span>
                      </span>
                      <span
                        style={{
                          color: C.inkSoft,
                          fontSize: 11,
                          textTransform: "capitalize",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {word.partOfSpeech}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div style={{ padding: 14, color: C.inkSoft, fontSize: 13 }}>
                No matching words.
              </div>
            )}
          </div>
        )}
      </div>

      {selectedWord ? (
        <section style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <div
              className="lale-display"
              style={{ color: C.cobalt, fontSize: 22, fontWeight: 600 }}
            >
              {selectedWord.lemma}
            </div>
            <div style={{ color: C.inkSoft, fontSize: 14 }}>
              {formatMeaning(selectedWord)} ·{" "}
              <span style={{ textTransform: "capitalize" }}>
                {selectedWord.partOfSpeech}
              </span>
            </div>
          </div>

          {selectedWord.tenses.map((tense) => (
            <FormsTable key={tense.id} title={tense.label} forms={tense.persons} />
          ))}
          {selectedWord.nominalForms.length > 0 && (
            <FormsTable
              title="Nominal forms"
              forms={selectedWord.nominalForms}
              partial={selectedWord.nominalForms.length < 6}
            />
          )}
          {selectedWord.tenses.length === 0 &&
            selectedWord.nominalForms.length === 0 && (
              <p style={{ color: C.inkSoft }}>
                No forms are available for this word yet.
              </p>
            )}
        </section>
      ) : (
        <div
          style={{
            background: "#fff",
            border: `1px solid ${C.line}`,
            borderRadius: 12,
            padding: 18,
            color: C.inkSoft,
            fontSize: 13,
          }}
        >
          Choose a suggestion to show all available forms below the search box.
        </div>
      )}
    </div>
  );
}
