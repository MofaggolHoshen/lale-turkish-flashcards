import React, { useState } from "react";
import {
  Plus, Check, X, Sparkles, Flame, ChevronLeft, Library, LayoutGrid, RotateCcw, BookOpen, Volume2,
} from "lucide-react";
import { C, btnStyle, inputStyle } from "../styles/theme";
import { SpeakButton, TulipGlyph, StatChip, EmptyNote, Field } from "./common";
import { speak } from "../services/speech";
import { translateWord as lookupTranslation } from "../services/translation";
import { DAY_MS, INTERVAL_DAYS, uid, shuffle } from "../utils/flashcards";
import { CATEGORY_META, CATEGORY_ORDER, CATEGORIES, EMOJI, EN_TR, TR_EN } from "../data/vocabulary";
import type { Category, Meta, ReviewMode, Tab, Word } from "../types";

export function Header({ tab, setTab, dueCount }) {
  const items = [
    { id: "home", label: "Garden" },
    { id: "vocab", label: "Vocabulary" },
    { id: "review", label: `Review${dueCount ? ` (${dueCount})` : ""}` },
    { id: "add", label: "Add word" },
    { id: "library", label: "Library" },
  ];
  return (
    <div style={{ background: C.cobalt, padding: "14px 16px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 10,
          flexWrap: "wrap",
        }}
      >
        <TulipGlyph level={3} size={28} />
        <span
          className="lale-display"
          style={{
            color: "#fff",
            fontSize: 19,
            fontWeight: 600,
            letterSpacing: 0.2,
          }}
        >
          Lâle
        </span>
        <span style={{ color: "#B9D3D0", fontSize: 12.5 }}>
          Turkish word garden
        </span>
      </div>
      <div
        className="lale-nav-scroll"
        style={{
          display: "flex",
          gap: 4,
          background: C.cobaltDeep,
          borderRadius: 10,
          padding: 4,
          overflowX: "auto",
        }}
      >
        {items.map((it) => (
          <button
            key={it.id}
            className="lale-btn"
            onClick={() => setTab(it.id)}
            style={{
              border: "none",
              cursor: "pointer",
              padding: "7px 12px",
              borderRadius: 7,
              fontSize: 13,
              fontWeight: 600,
              whiteSpace: "nowrap",
              flexShrink: 0,
              background: tab === it.id ? C.turquoise : "transparent",
              color: tab === it.id ? "#04292A" : "#D7E7E5",
            }}
          >
            {it.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Home({
  words,
  due,
  mastered,
  meta,
  goReview,
  goReviewMastered,
  goReviewAll,
  goAdd,
}) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: `linear-gradient(120deg, ${C.cobalt}, ${C.cobaltDeep})`,
          borderRadius: 14,
          padding: "26px 30px",
          color: "#fff",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div>
          <div
            className="lale-display"
            style={{ fontSize: 34, fontWeight: 600 }}
          >
            {due.length === 0
              ? "Nothing due — well tended."
              : `${due.length} word${due.length === 1 ? "" : "s"} ready to review`}
          </div>
          <div style={{ color: "#B9D3D0", marginTop: 6, fontSize: 14.5 }}>
            {words.length} planted in total · {mastered} in full bloom
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            className="lale-btn"
            onClick={goReview}
            disabled={due.length === 0}
            style={btnStyle(C.turquoise, "#04292A", due.length === 0)}
          >
            <Check size={16} style={{ marginRight: 6, verticalAlign: -3 }} />
            Review now
          </button>
          <button
            className="lale-btn"
            onClick={goAdd}
            style={btnStyle("#fff", C.cobalt, false)}
          >
            <Plus size={16} style={{ marginRight: 6, verticalAlign: -3 }} />
            Plant a word
          </button>
        </div>
      </div>

      <div
        style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}
      >
        <button
          className="lale-btn"
          onClick={goReviewMastered}
          disabled={mastered === 0}
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 13,
            fontWeight: 700,
            padding: "9px 14px",
            borderRadius: 9,
            background: "#fff",
            border: `1.5px solid ${mastered === 0 ? C.line : C.cobalt}`,
            color: mastered === 0 ? C.inkSoft : C.cobalt,
            cursor: mastered === 0 ? "not-allowed" : "pointer",
          }}
        >
          <RotateCcw size={14} style={{ marginRight: 6 }} />
          Revisit mastered ({mastered})
        </button>
        <button
          className="lale-btn"
          onClick={goReviewAll}
          disabled={words.length === 0}
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 13,
            fontWeight: 700,
            padding: "9px 14px",
            borderRadius: 9,
            background: "#fff",
            border: `1.5px solid ${words.length === 0 ? C.line : C.cobalt}`,
            color: words.length === 0 ? C.inkSoft : C.cobalt,
            cursor: words.length === 0 ? "not-allowed" : "pointer",
          }}
        >
          <LayoutGrid size={14} style={{ marginRight: 6 }} />
          Practice all words ({words.length})
        </button>
      </div>
      <div style={{ fontSize: 11.5, color: C.inkSoft, marginTop: 6 }}>
        These are on-demand — anytime you like, regardless of the schedule
        above.
      </div>

      <div
        style={{ display: "flex", gap: 18, marginTop: 18, flexWrap: "wrap" }}
      >
        <StatChip
          icon={<Flame size={16} color={C.coral} />}
          label="Day streak"
          value={meta.streak}
        />
        <StatChip
          icon={<Sparkles size={16} color={C.gold} />}
          label="Best streak"
          value={meta.best}
        />
        <StatChip
          icon={<Library size={16} color={C.cobalt} />}
          label="Words planted"
          value={words.length}
        />
      </div>

      <div style={{ marginTop: 26 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 10,
          }}
        >
          <LayoutGrid size={16} color={C.inkSoft} />
          <span
            className="lale-display"
            style={{ fontSize: 17, fontWeight: 600 }}
          >
            Your garden
          </span>
        </div>
        {words.length === 0 ? (
          <EmptyNote text="Plant your first word and it'll bloom here as you review it." />
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
              .map((w) => (
                <div
                  key={w.id}
                  title={`${w.tr} — level ${w.level}/5`}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <TulipGlyph level={w.level} size={40} />
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
                    {w.tr}
                  </span>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function AddWord({ words, updateWords, onAdded }) {
  const [tr, setTr] = useState("");
  const [en, setEn] = useState("");
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [emojiManual, setEmojiManual] = useState(false);
  const [trManual, setTrManual] = useState(false);
  const [enManual, setEnManual] = useState(false);
  const [fetchingSide, setFetchingSide] = useState(null); // 'tr' | 'en' | null — which field is being auto-filled
  const [err, setErr] = useState("");
  const timerRef = React.useRef(null);

  // Auto-lookup: typing a Turkish word fills the English meaning, and vice versa,
  // as long as the other field hasn't been typed into by hand.
  const scheduleLookup = (value, sourceIsT) => {
    clearTimeout(timerRef.current);
    if (!value.trim() || value.trim().length < 2) return;
    if (sourceIsT && enManual) return;
    if (!sourceIsT && trManual) return;
    timerRef.current = setTimeout(async () => {
      setErr("");
      setFetchingSide(sourceIsT ? "en" : "tr");
      const result = await lookupTranslation(
        value.trim(),
        sourceIsT ? "tr-en" : "en-tr",
        { trToEn: TR_EN, enToTr: EN_TR },
      );
      setFetchingSide(null);
      if (result) {
        if (sourceIsT) setEn(result);
        else setTr(result);
      } else {
        setErr(
          "No automatic match for that word yet — type the meaning in yourself.",
        );
      }
    }, 600);
  };

  const handleTrChange = (v) => {
    setTr(v);
    setTrManual(true);
    scheduleLookup(v, true);
    if (!emojiManual) {
      const hit = EMOJI[v.trim().toLocaleLowerCase("tr-TR")];
      if (hit) setEmoji(hit);
    }
  };

  const handleEnChange = (v) => {
    setEn(v);
    setEnManual(true);
    scheduleLookup(v, false);
  };

  const handleSave = () => {
    if (!tr.trim() || !en.trim()) {
      setErr("Both the Turkish word and its meaning are needed.");
      return;
    }
    const w = {
      id: uid(),
      tr: tr.trim(),
      en: en.trim(),
      notes: notes.trim(),
      emoji: emoji.trim(),
      level: 0,
      nextReview: Date.now(),
      correct: 0,
      wrong: 0,
      createdAt: Date.now(),
    };
    updateWords([w, ...words]);
    setTr("");
    setEn("");
    setNotes("");
    setEmoji("");
    setEmojiManual(false);
    setTrManual(false);
    setEnManual(false);
    onAdded();
  };

  return (
    <div style={{ maxWidth: 480 }}>
      <div
        className="lale-display"
        style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}
      >
        Plant a new word
      </div>
      <div style={{ color: C.inkSoft, fontSize: 13.5, marginBottom: 18 }}>
        Type into either field — the other fills in automatically.
      </div>

      <Field
        label="Turkish word"
        hint={fetchingSide === "tr" ? "translating…" : null}
      >
        <div style={{ display: "flex", gap: 8 }}>
          <input
            value={tr}
            onChange={(e) => handleTrChange(e.target.value)}
            placeholder="e.g. merhaba"
            style={inputStyle}
          />
          {tr.trim() && (
            <button
              className="lale-btn"
              onClick={() => speak(tr.trim())}
              title="Hear pronunciation"
              style={{
                ...btnStyle(C.paperDeep, C.cobalt, false),
                padding: "0 12px",
              }}
            >
              <Volume2 size={16} />
            </button>
          )}
        </div>
      </Field>

      <div
        style={{ display: "flex", justifyContent: "center", margin: "2px 0" }}
      >
        <span style={{ fontSize: 11, color: C.inkSoft, letterSpacing: 1 }}>
          ⇅
        </span>
      </div>

      <Field
        label="Meaning (English)"
        hint={fetchingSide === "en" ? "translating…" : null}
      >
        <input
          value={en}
          onChange={(e) => handleEnChange(e.target.value)}
          placeholder="e.g. hello"
          style={inputStyle}
        />
      </Field>

      <Field label="Picture (emoji, optional)">
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            value={emoji}
            onChange={(e) => {
              setEmoji(e.target.value);
              setEmojiManual(true);
            }}
            placeholder="🙂 paste or type an emoji"
            style={{ ...inputStyle, width: 160 }}
          />
          {emoji && <span style={{ fontSize: 26 }}>{emoji}</span>}
        </div>
      </Field>

      <Field label="Notes (optional)">
        <input
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="example sentence, gender, root, etc."
          style={inputStyle}
        />
      </Field>

      {err && (
        <div style={{ color: C.coral, fontSize: 13, marginBottom: 10 }}>
          {err}
        </div>
      )}

      <button
        className="lale-btn"
        onClick={handleSave}
        style={{
          ...btnStyle(C.turquoise, "#04292A", false),
          width: "100%",
          marginTop: 6,
        }}
      >
        <Plus size={16} style={{ marginRight: 6, verticalAlign: -3 }} />
        Add to garden
      </button>
    </div>
  );
}

export function Review({
  words,
  queueWords,
  reviewMode,
  updateWords,
  registerPractice,
  onDone,
}) {
  const [queue] = useState<Word[]>(() => shuffle(queueWords));
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const current = queue[idx];

  const grade = (correct) => {
    const next = words.map((w) => {
      if (w.id !== current.id) return w;
      const level = correct
        ? Math.min(5, w.level + 1)
        : Math.max(0, w.level - 1);
      const days = INTERVAL_DAYS[level];
      return {
        ...w,
        level,
        nextReview: Date.now() + days * DAY_MS,
        correct: w.correct + (correct ? 1 : 0),
        wrong: w.wrong + (correct ? 0 : 1),
      };
    });
    updateWords(next);
    registerPractice();
    setFlipped(false);
    if (idx + 1 < queue.length) setIdx(idx + 1);
    else onDone();
  };

  // Pure navigation — no grading, no change to the word's schedule.
  const skip = () => {
    setFlipped(false);
    if (idx + 1 < queue.length) setIdx(idx + 1);
    else onDone();
  };

  const goBack = () => {
    if (idx === 0) return;
    setFlipped(false);
    setIdx(idx - 1);
  };

  if (!current) {
    const emptyText =
      reviewMode === "mastered"
        ? "No mastered words yet — get a few to level 5 first."
        : reviewMode === "all"
          ? "Nothing planted yet — add some words first."
          : "Nothing due right now. Come back later, or plant more words.";
    return <EmptyNote text={emptyText} />;
  }

  return (
    <div style={{ maxWidth: 460, margin: "0 auto", textAlign: "center" }}>
      <button
        onClick={onDone}
        className="lale-btn"
        style={{
          ...btnStyle("transparent", C.inkSoft, false),
          padding: "4px 0",
          marginBottom: 4,
        }}
      >
        <ChevronLeft size={15} style={{ verticalAlign: -2 }} /> Back
      </button>
      {reviewMode !== "due" && (
        <div
          style={{
            fontSize: 11.5,
            color: C.turquoise,
            fontWeight: 700,
            marginBottom: 6,
          }}
        >
          {reviewMode === "mastered"
            ? "🌷 Revisiting mastered words"
            : "🌷 Practicing all words"}
        </div>
      )}

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
          disabled={idx === 0}
          className="lale-btn"
          style={{
            ...btnStyle("transparent", C.inkSoft, idx === 0),
            padding: "2px 4px",
            fontWeight: 600,
            fontSize: 13,
          }}
        >
          ← Previous
        </button>
        <span style={{ fontSize: 12.5, color: C.inkSoft }}>
          {idx + 1} of {queue.length}
        </span>
        <button
          onClick={skip}
          className="lale-btn"
          style={{
            ...btnStyle("transparent", C.inkSoft, false),
            padding: "2px 4px",
            fontWeight: 600,
            fontSize: 13,
          }}
        >
          Skip →
        </button>
      </div>

      <div
        className="lale-card"
        onClick={() => setFlipped((f) => !f)}
        style={{
          cursor: "pointer",
          background: "#fff",
          border: `1px solid ${C.line}`,
          borderRadius: 16,
          padding: "48px 24px",
          minHeight: 180,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 14,
          boxShadow: "0 6px 20px rgba(19,42,51,0.06)",
        }}
      >
        <TulipGlyph level={current.level} size={40} />
        {!flipped && current.emoji && (
          <div style={{ fontSize: 40 }}>{current.emoji}</div>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            className="lale-display"
            style={{ fontSize: 28, fontWeight: 600 }}
          >
            {flipped ? current.en : current.tr}
          </div>
          <SpeakButton
            text={flipped ? current.en : current.tr}
            lang={flipped ? "en-US" : "tr-TR"}
            size={19}
          />
        </div>
        {flipped && current.notes && (
          <div style={{ fontSize: 13, color: C.inkSoft }}>{current.notes}</div>
        )}
        {!flipped && (
          <div style={{ fontSize: 12.5, color: C.inkSoft }}>
            Tap to reveal meaning
          </div>
        )}
      </div>

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
            <Check size={16} style={{ marginRight: 6, verticalAlign: -3 }} />{" "}
            Knew it
          </button>
        </div>
      ) : (
        <div style={{ marginTop: 20, fontSize: 12.5, color: C.inkSoft }}>
          Be honest — it only helps your schedule.
        </div>
      )}
    </div>
  );
}

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
                    {w.tr} <SpeakButton text={w.tr} size={14} />{" "}
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

// ---------- Vocabulary: browse categories, then practice with flashcards ----------
export function VocabularyView({ words, updateWords, registerPractice }) {
  const [view, setView] = useState("grid"); // grid | list | practice
  const [category, setCategory] = useState(null);
  const [justAdded, setJustAdded] = useState(() => new Set()); // instant feedback, independent of prop refresh timing

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
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [score, setScore] = useState({ known: 0, unknown: 0 });
  const [finished, setFinished] = useState(false);

  const current = deck[idx];

  // Grading a card here plants/updates the word in the user's own collection,
  // using the same mastery levels and schedule as the main Review tab — so
  // practicing a category is real, tracked progress, not a throwaway quiz.
  const grade = (knew) => {
    const [wTr, wEn] = current;
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
    if (idx + 1 < deck.length) setIdx(idx + 1);
    else setFinished(true);
  };

  const restart = () => {
    setIdx(0);
    setFlipped(false);
    setScore({ known: 0, unknown: 0 });
    setFinished(false);
  };

  // Just moves on — no grading, no change to the saved word list at all.
  const skip = () => {
    setFlipped(false);
    if (idx + 1 < deck.length) setIdx(idx + 1);
    else setFinished(true);
  };

  // Goes back to the previous card — also ungraded, just navigation.
  const goBack = () => {
    if (idx === 0) return;
    setFlipped(false);
    setIdx(idx - 1);
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

  const [tr, en] = current;

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
          disabled={idx === 0}
          className="lale-btn"
          style={{
            ...btnStyle("transparent", C.inkSoft, idx === 0),
            padding: "2px 4px",
            fontWeight: 600,
            fontSize: 13,
          }}
        >
          ← Previous
        </button>
        <span style={{ fontSize: 12.5, color: C.inkSoft }}>
          {idx + 1} of {deck.length}
        </span>
        <button
          onClick={skip}
          className="lale-btn"
          style={{
            ...btnStyle("transparent", C.inkSoft, false),
            padding: "2px 4px",
            fontWeight: 600,
            fontSize: 13,
          }}
        >
          Skip →
        </button>
      </div>

      <div
        className="lale-card"
        onClick={() => setFlipped((f) => !f)}
        style={{
          cursor: "pointer",
          background: "#fff",
          border: `1px solid ${C.line}`,
          borderRadius: 16,
          padding: "48px 24px",
          minHeight: 180,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 14,
          boxShadow: "0 6px 20px rgba(19,42,51,0.06)",
        }}
      >
        {!flipped && EMOJI[tr] && (
          <div style={{ fontSize: 40 }}>{EMOJI[tr]}</div>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            className="lale-display"
            style={{ fontSize: 28, fontWeight: 600 }}
          >
            {flipped ? en : tr}
          </div>
          <SpeakButton
            text={flipped ? en : tr}
            lang={flipped ? "en-US" : "tr-TR"}
            size={19}
          />
        </div>
        {!flipped && (
          <div style={{ fontSize: 12.5, color: C.inkSoft }}>
            Tap to reveal meaning
          </div>
        )}
      </div>

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
            <Check size={16} style={{ marginRight: 6, verticalAlign: -3 }} />{" "}
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
