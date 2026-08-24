import React, { useState } from "react";
import { Check, X, ChevronLeft } from "lucide-react";
import { C, btnStyle } from "../styles/theme";
import { SpeakButton } from "./SpeakButton";
import { TulipGlyph } from "./TulipGlyph";
import { EmptyNote } from "./EmptyNote";
import { DAY_MS, INTERVAL_DAYS, shuffle } from "../utils/flashcards";
import type { Word } from "../types";

export function Review({
  words,
  queueWords,
  reviewMode,
  updateWords,
  registerPractice,
  onDone,
}: {
  words: Word[];
  queueWords: Word[];
  reviewMode: "due" | "mastered" | "all";
  updateWords: (next: Word[]) => void;
  registerPractice: () => void;
  onDone: () => void;
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
            <Check size={16} style={{ marginRight: 6, verticalAlign: -3 }} />
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
