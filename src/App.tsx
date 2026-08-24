import React, { useState, useEffect, useCallback } from "react";
import { C } from "./styles/theme";
import { loadWords, persistWords, loadMeta, persistMeta } from "./services/storage";
import { DAY_MS } from "./utils/flashcards";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { AddWord } from "./components/AddWord";
import { Review } from "./components/Review";
import { LibraryView } from "./components/LibraryView";
import { VocabularyView } from "./components/VocabularyView";
import type { Meta, ReviewMode, Tab, Word } from "./types";

const todayStr = () => new Date().toDateString();

export default function App() {
  const [words, setWords] = useState<Word[]>([]);
  const [meta, setMeta] = useState<Meta>({ streak: 0, lastDay: null, best: 0 });
  const [tab, setTab] = useState<Tab>("home");
  const [loading, setLoading] = useState(true);
  const [reviewMode, setReviewMode] = useState<ReviewMode>("due");

  useEffect(() => {
    (async () => {
      const [w, m] = await Promise.all([loadWords(), loadMeta()]);
      setWords(w);
      setMeta(m);
      setLoading(false);
    })();
  }, []);

  const updateWords = useCallback((next: Word[]) => {
    setWords(next);
    persistWords(next);
  }, []);

  const updateMeta = useCallback((next: Meta) => {
    setMeta(next);
    persistMeta(next);
  }, []);

  const registerPractice = useCallback(() => {
    setMeta((prev) => {
      const base = prev || { streak: 0, lastDay: null, best: 0 };
      if (base.lastDay === todayStr()) return base;
      const yesterday = new Date(Date.now() - DAY_MS).toDateString();
      const streak = base.lastDay === yesterday ? base.streak + 1 : 1;
      const next = {
        streak,
        lastDay: todayStr(),
        best: Math.max(base.best, streak),
      };
      persistMeta(next);
      return next;
    });
  }, []);

  if (loading) {
    return (
      <div
        style={{
          minHeight: 480,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: C.paper,
          fontFamily: "Inter, sans-serif",
          color: C.inkSoft,
        }}
      >
        Loading your garden…
      </div>
    );
  }

  const now = Date.now();
  const due = words.filter((w) => w.nextReview <= now);
  const masteredWords = words.filter((w) => w.level >= 5);
  const mastered = masteredWords.length;
  const queueWords =
    reviewMode === "mastered"
      ? masteredWords
      : reviewMode === "all"
        ? words
        : due;
  const goReview = (mode: ReviewMode) => {
    setReviewMode(mode);
    setTab("review");
  };

  return (
    <div
      style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        background: C.paper,
        minHeight: 560,
        color: C.ink,
        borderRadius: 16,
        overflow: "hidden",
        border: `1px solid ${C.line}`,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,500;0,600;1,500&family=Inter:wght@400;500;600;700&display=swap');
        .lale-display { font-family: 'Spectral', serif; }
        .lale-btn { transition: transform .12s ease, box-shadow .12s ease; }
        .lale-btn:active { transform: scale(0.97); }
        .lale-card { transition: transform .35s cubic-bezier(.2,.8,.2,1); transform-style: preserve-3d; }
        .lale-nav-scroll { -webkit-overflow-scrolling: touch; scrollbar-width: none; }
        .lale-nav-scroll::-webkit-scrollbar { display: none; }
        @media (max-width: 480px) {
          .lale-content { padding: 16px 14px 24px !important; }
        }
      `}</style>

      <Header tab={tab} setTab={setTab} dueCount={due.length} />

      <div className="lale-content" style={{ padding: "24px 28px 32px" }}>
        {tab === "home" && (
          <Home
            words={words}
            due={due}
            mastered={mastered}
            meta={meta}
            goReview={() => goReview("due")}
            goReviewMastered={() => goReview("mastered")}
            goReviewAll={() => goReview("all")}
            goAdd={() => setTab("add")}
          />
        )}
        {tab === "vocab" && (
          <VocabularyView
            words={words}
            updateWords={updateWords}
            registerPractice={registerPractice}
          />
        )}
        {tab === "review" && (
          <Review
            words={words}
            queueWords={queueWords}
            reviewMode={reviewMode}
            updateWords={updateWords}
            registerPractice={registerPractice}
            onDone={() => setTab("home")}
          />
        )}
        {tab === "add" && (
          <AddWord
            words={words}
            updateWords={updateWords}
            onAdded={() => setTab("home")}
          />
        )}
        {tab === "library" && (
          <LibraryView words={words} updateWords={updateWords} />
        )}
      </div>
    </div>
  );
}


