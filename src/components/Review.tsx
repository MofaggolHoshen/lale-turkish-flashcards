import React, { useState, useEffect } from "react";
import { Volume2, Check, X } from "lucide-react";
import { C, btnStyle } from "../styles/theme";
import { EmptyNote } from "./EmptyNote";
import { FlashcardShell } from "./FlashcardShell";
import { DAY_MS, INTERVAL_DAYS, shuffle } from "../utils/flashcards";
import type { Word } from "../types";
import { FlashcardNav } from "./common/FlashcardNav";
import { useAutoPlayCycle } from "../hooks/useAutoPlayCycle";

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
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const current = queue[currentCardIndex];

  // Convert queue to [english, turkish] pairs for cycle hook
  const wordPairs: Array<[string, string]> = queue.map((word) => [word.en, word.tr]);

  // Use cycle hook to play all words in the queue
  const { isPlaying, play, stop, currentIndex } = useAutoPlayCycle(wordPairs);

  // Sync card display with playback index
  useEffect(() => {
    if (isPlaying) {
      setCurrentCardIndex(currentIndex);
    }
  }, [currentIndex, isPlaying]);

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
    if (currentCardIndex + 1 < queue.length) setCurrentCardIndex(currentCardIndex + 1);
    else onDone();
  };

  const skip = () => {
    setFlipped(false);
    if (currentCardIndex + 1 < queue.length) setCurrentCardIndex(currentCardIndex + 1);
    else onDone();
  };

  const goBack = () => {
    if (currentCardIndex === 0) return;
    setFlipped(false);
    setCurrentCardIndex(currentCardIndex - 1);
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
      {/* Play All button - top center */}
      <div style={{ marginBottom: 12 }}>
        <button
          className="lale-btn"
          onClick={() => (isPlaying ? stop() : play())}
          title={isPlaying ? "Stop auto-play all cards" : "Auto-play all cards"}
          style={{
            border: `1px solid ${C.line}`,
            background: isPlaying ? C.turquoise : "#fff",
            cursor: "pointer",
            padding: "6px 12px",
            color: isPlaying ? "#fff" : C.cobalt,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 13,
            whiteSpace: "nowrap",
          }}
        >
          <Volume2 size={16} />
          {isPlaying ? "Playing..." : "Play All"}
        </button>
      </div>

      {/* Navigation - Previous/Next */}
      <div style={{ marginBottom: 12 }}>
        <FlashcardNav
          currentIndex={currentCardIndex}
          total={queue.length}
          onPrevious={goBack}
          onNext={skip}
          showBack={false}
        />
      </div>

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

      <FlashcardShell
        frontText={current.en}
        backText={current.tr}
        frontLang="en-US"
        backLang="tr-TR"
        emoji={current.emoji}
        flipped={flipped}
        onToggle={() => setFlipped((f) => !f)}
        onSwipeLeft={skip}
        onSwipeRight={goBack}
        hintText={flipped ? current.notes : "Tap to reveal Turkish"}
        tulipLevel={current.level}
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
          Be honest — it only helps your schedule.
        </div>
      )}
    </div>
  );
}
