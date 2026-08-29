import { useState } from "react";
import { BookOpen, ChevronLeft, RotateCcw, Check, X } from "lucide-react";
import { C, btnStyle } from "../styles/theme";
import { SpeakButton } from "./SpeakButton";
import { TulipGlyph } from "./TulipGlyph";
import { FlashcardShell } from "./FlashcardShell";
import { uid, shuffle } from "../utils/flashcards";
import { CATEGORY_META, CATEGORY_ORDER, CATEGORIES, EMOJI } from "../data/vocabulary";
import { DAY_MS, INTERVAL_DAYS } from "../utils/flashcards";

export function VocabularyView({ words, updateWords, registerPractice }) {
  const [view, setView] = useState("grid");
  const [category, setCategory] = useState(null);
  const [justAdded, setJustAdded] = useState(() => new Set());

  const inGarden = (tr) => justAdded.has(tr) || words.some((w) => w.tr === tr);
  const addToGarden = (tr, en) => {
    if (inGarden(tr)) return;
    setJustAdded((prev) => new Set(prev).add(tr));
    updateWords([
      {
        id: uid(),
        tr,
        en,
        notes: "",
        emoji: EMOJI[tr] || "",
        level: 0,
        nextReview: Date.now(),
        correct: 0,
        wrong: 0,
        createdAt: Date.now(),
      },
      ...words,
    ]);
  };

  if (view === "practice" && category) {
    return (
      <CategoryPractice
        category={category}
        words={words}
        updateWords={updateWords}
        registerPractice={registerPractice}
        onExit={() => setView("list")}
      />
    );
  }

  if (view === "list" && category) {
    const items = CATEGORIES[category];
    const meta = CATEGORY_META[category];
    return (
      <div>
        <button
          onClick={() => {
            setView("grid");
            setCategory(null);
          }}
          className="lale-btn"
          style={{
            ...btnStyle("transparent", C.inkSoft, false),
            padding: "4px 0",
            marginBottom: 6,
          }}
        >
          <ChevronLeft size={15} style={{ verticalAlign: -2 }} /> Categories
        </button>
        <div
          style={{
            color: C.turquoise,
            fontSize: 12.5,
            fontWeight: 700,
            marginBottom: 10,
          }}
        >
          🌷 {words.length} word{words.length === 1 ? "" : "s"} currently in
          your garden
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            marginBottom: 16,
          }}
        >
          <div
            className="lale-display"
            style={{ fontSize: 21, fontWeight: 600 }}
          >
            {meta.label} ({items.length})
          </div>
          <button
            className="lale-btn"
            onClick={() => setView("practice")}
            style={btnStyle(C.turquoise, "#04292A", false)}
          >
            <BookOpen size={16} style={{ marginRight: 6, verticalAlign: -3 }} />
            Practice this category
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {items.map(([tr, en]) => (
            <div
              key={tr}
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
              {EMOJI[tr] && <span style={{ fontSize: 22 }}>{EMOJI[tr]}</span>}
              <div
                style={{
                  flex: 1,
                  minWidth: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  flexWrap: "wrap",
                }}
              >
                <span style={{ fontWeight: 700, fontSize: 14.5 }}>{tr}</span>
                <SpeakButton text={tr} size={14} />
                <span style={{ color: C.inkSoft, fontWeight: 500 }}>
                  → {en}
                </span>
              </div>
              <button
                className="lale-btn"
                onClick={() => addToGarden(tr, en)}
                disabled={inGarden(tr)}
                style={{
                  ...btnStyle(
                    inGarden(tr) ? "#DCEFEC" : C.paperDeep,
                    inGarden(tr) ? C.turquoise : C.cobalt,
                    false,
                  ),
                  fontSize: 12,
                  padding: "6px 10px",
                  cursor: inGarden(tr) ? "default" : "pointer",
                  fontWeight: 800,
                }}
              >
                {inGarden(tr) ? "✓ In garden" : "+ Add to garden"}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        className="lale-display"
        style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}
      >
        Vocabulary
      </div>
      <div style={{ color: C.inkSoft, fontSize: 13.5, marginBottom: 6 }}>
        Browse words by category, then practice them as flashcards.
      </div>
      <div
        style={{
          color: C.turquoise,
          fontSize: 12.5,
          fontWeight: 700,
          marginBottom: 18,
        }}
      >
        🌷 {words.length} word{words.length === 1 ? "" : "s"} currently in your
        garden
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
          gap: 12,
        }}
      >
        {CATEGORY_ORDER.map((cat) => {
          const meta = CATEGORY_META[cat];
          const Icon = meta.icon;
          return (
            <button
              key={cat}
              className="lale-btn"
              onClick={() => {
                setCategory(cat);
                setView("list");
              }}
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
                <div style={{ fontWeight: 700, fontSize: 14.5 }}>
                  {meta.label}
                </div>
                <div style={{ fontSize: 12, color: C.inkSoft }}>
                  {CATEGORIES[cat].length} words
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CategoryPractice({
  category,
  words,
  updateWords,
  registerPractice,
  onExit,
}) {
  const meta = CATEGORY_META[category];
  const [deck] = useState<[string, string][]>(() => shuffle(CATEGORIES[category]));
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [score, setScore] = useState({ known: 0, unknown: 0 });
  const [finished, setFinished] = useState(false);

  const [currentTurkish, currentEnglish] = deck[currentCardIndex];

  const grade = (knew) => {
    const [wTr, wEn] = [currentTurkish, currentEnglish];
    const existing = words.find((w) => w.tr === wTr);
    let next;
    if (existing) {
      const level = knew
        ? Math.min(5, existing.level + 1)
        : Math.max(0, existing.level - 1);
      const days = INTERVAL_DAYS[level];
      next = words.map((w) =>
        w.id === existing.id
          ? {
              ...w,
              level,
              nextReview: Date.now() + days * DAY_MS,
              correct: w.correct + (knew ? 1 : 0),
              wrong: w.wrong + (knew ? 0 : 1),
            }
          : w,
      );
    } else {
      const level = knew ? 1 : 0;
      const days = INTERVAL_DAYS[level];
      const newWord = {
        id: uid(),
        tr: wTr,
        en: wEn,
        notes: "",
        emoji: EMOJI[wTr] || "",
        level,
        nextReview: Date.now() + days * DAY_MS,
        correct: knew ? 1 : 0,
        wrong: knew ? 0 : 1,
        createdAt: Date.now(),
      };
      next = [newWord, ...words];
    }
    updateWords(next);
    registerPractice();
    setScore((s) => ({
      known: s.known + (knew ? 1 : 0),
      unknown: s.unknown + (knew ? 0 : 1),
    }));
    setFlipped(false);
    if (currentCardIndex + 1 < deck.length) setCurrentCardIndex(currentCardIndex + 1);
    else setFinished(true);
  };

  const restart = () => {
    setCurrentCardIndex(0);
    setFlipped(false);
    setScore({ known: 0, unknown: 0 });
    setFinished(false);
  };

  const next = () => {
    setFlipped(false);
    if (currentCardIndex + 1 < deck.length) setCurrentCardIndex(currentCardIndex + 1);
    else setFinished(true);
  };

  const goBack = () => {
    if (currentCardIndex === 0) return;
    setFlipped(false);
    setCurrentCardIndex(currentCardIndex - 1);
  };

  if (finished) {
    return (
      <div style={{ maxWidth: 420, margin: "0 auto", textAlign: "center" }}>
        <TulipGlyph level={score.known >= score.unknown ? 5 : 3} size={56} />
        <div
          className="lale-display"
          style={{ fontSize: 24, fontWeight: 600, marginTop: 10 }}
        >
          {meta.label} — done
        </div>
        <div style={{ color: C.inkSoft, marginTop: 6, fontSize: 14.5 }}>
          {score.known} knew it · {score.unknown} didn't know it
        </div>
        <div style={{ color: C.inkSoft, marginTop: 2, fontSize: 12.5 }}>
          Saved to your garden — check the Garden or Review tab.
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 22 }}>
          <button
            className="lale-btn"
            onClick={restart}
            style={{ ...btnStyle(C.paperDeep, C.cobalt, false), flex: 1 }}
          >
            <RotateCcw
              size={15}
              style={{ marginRight: 6, verticalAlign: -3 }}
            />
            Practice again
          </button>
          <button
            className="lale-btn"
            onClick={onExit}
            style={{ ...btnStyle(C.turquoise, "#04292A", false), flex: 1 }}
          >
            Back to list
          </button>
        </div>
      </div>
    );
  }

  const [tr, en] = [currentTurkish, currentEnglish];

  return (
    <div style={{ maxWidth: 460, margin: "0 auto", textAlign: "center" }}>
      <button
        onClick={onExit}
        className="lale-btn"
        style={{
          ...btnStyle("transparent", C.inkSoft, false),
          padding: "4px 0",
          marginBottom: 10,
        }}
      >
        <ChevronLeft size={15} style={{ verticalAlign: -2 }} /> {meta.label}
      </button>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 14,
          marginBottom: 10,
        }}
      >
        <button
          onClick={goBack}
          disabled={currentCardIndex === 0}
          className="lale-btn"
          style={{
            ...btnStyle("transparent", C.inkSoft, currentCardIndex === 0),
            padding: "2px 4px",
            fontWeight: 600,
            fontSize: 13,
          }}
        >
          ← Previous
        </button>
        <span style={{ fontSize: 12.5, color: C.inkSoft }}>
          {currentCardIndex + 1} of {deck.length}
        </span>
        <button
          onClick={next}
          className="lale-btn"
          style={{
            ...btnStyle("transparent", C.inkSoft, false),
            padding: "2px 4px",
            fontWeight: 600,
            fontSize: 13,
          }}
        >
          Next →
        </button>
      </div>

      <FlashcardShell
        frontText={en}
        backText={tr}
        frontLang="en-US"
        backLang="tr-TR"
        emoji={EMOJI[tr]}
        flipped={flipped}
        onToggle={() => setFlipped((f) => !f)}
        onSwipeLeft={next}
        onSwipeRight={goBack}
        hintText="Tap to reveal Turkish"
      />

      {flipped ? (
        <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
          <button
            className="lale-btn"
            onClick={() => grade(false)}
            style={{ ...btnStyle("#F6E4DF", C.coral, false), flex: 1 }}
          >
            <X size={16} style={{ marginRight: 6, verticalAlign: -3 }} /> Didn't
            know it
          </button>
          <button
            className="lale-btn"
            onClick={() => grade(true)}
            style={{ ...btnStyle(C.turquoise, "#04292A", false), flex: 1 }}
          >
            <Check size={16} style={{ marginRight: 6, verticalAlign: -3 }} />
            Knew it
          </button>
        </div>
      ) : (
        <div style={{ marginTop: 20, fontSize: 12.5, color: C.inkSoft }}>
          Be honest — it's just for you.
        </div>
      )}
    </div>
  );
}
