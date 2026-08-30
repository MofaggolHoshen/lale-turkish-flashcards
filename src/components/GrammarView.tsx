import { useEffect, useMemo, useState } from "react";
import { BookOpen, Sparkles } from "lucide-react";

import { GrammarLessonContent } from "./grammar/GrammarLessonContent";
import { GrammarLessonSidebar } from "./grammar/GrammarLessonSidebar";
import { GrammarLevelSelector } from "./grammar/GrammarLevelSelector";
import { GrammarQuizGame } from "./grammar/GrammarQuizGame";
import { grammarLevels, type GrammarQuizQuestion } from "../data/grammar";
import { C } from "../styles/theme";
import { getRepository } from "../repositories";

const ROUND_QUESTION_SIZE = 10;

const getQuestionKey = (lessonId: string, prompt: string) => `${lessonId}-${prompt}`;

export function GrammarView() {
  const [selectedLevel, setSelectedLevel] = useState("A");
  const [selectedLesson, setSelectedLesson] = useState("a1-unit-1");
  const [roundQuestions, setRoundQuestions] = useState<GrammarQuizQuestion[]>([]);
  const [questionIndex, setQuestionIndex] = useState<Record<string, number>>({});
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>({});

  // Load completed lessons from repository on mount
  useEffect(() => {
    (async () => {
      const repo = getRepository();
      const completed = await repo.grammar.getCompleted();
      setCompletedLessons(completed);
    })();
  }, []);

  // Save completed lessons to repository when they change
  useEffect(() => {
    const syncToRepository = async (lessonId: string, isComplete: boolean) => {
      const repo = getRepository();
      if (isComplete) {
        await repo.grammar.markLessonComplete(lessonId);
      } else {
        await repo.grammar.markLessonIncomplete(lessonId);
      }
    };

    Object.entries(completedLessons).forEach(([lessonId, isComplete]) => {
      if (isComplete) {
        syncToRepository(lessonId, true);
      }
    });
  }, [completedLessons]);

  const level = useMemo(
    () => grammarLevels.find((item) => item.id === selectedLevel) ?? grammarLevels[0],
    [selectedLevel],
  );

  const lesson = useMemo(
    () => level.lessons.find((item) => item.id === selectedLesson) ?? level.lessons[0],
    [level, selectedLesson],
  );

  const shuffleRoundQuestions = (sourceQuestions: GrammarQuizQuestion[]) => {
    const copy = [...sourceQuestions];

    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy.slice(0, Math.min(ROUND_QUESTION_SIZE, copy.length));
  };

  useEffect(() => {
    const nextRound = shuffleRoundQuestions(lesson.quiz);
    setRoundQuestions(nextRound);
    setQuestionIndex((prev) => ({ ...prev, [lesson.id]: 0 }));
    setAnswers((prev) => {
      const next = { ...prev };
      nextRound.forEach((question) => {
        delete next[getQuestionKey(lesson.id, question.prompt)];
      });
      return next;
    });
    setRevealed((prev) => {
      const next = { ...prev };
      nextRound.forEach((question) => {
        delete next[getQuestionKey(lesson.id, question.prompt)];
      });
      return next;
    });
  }, [lesson.id]);

  const currentQuestionIndex = questionIndex[lesson.id] ?? 0;
  const currentQuestion = roundQuestions[currentQuestionIndex] ?? roundQuestions[0];
  const currentKey = currentQuestion ? getQuestionKey(lesson.id, currentQuestion.prompt) : `${lesson.id}-empty`;
  const selectedAnswer = answers[currentKey];
  const isRevealed = revealed[currentKey] ?? false;

  const totalCorrect = roundQuestions.reduce((count, question) => {
    const answer = answers[getQuestionKey(lesson.id, question.prompt)];
    return count + (answer && answer === question.answer ? 1 : 0);
  }, 0);

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentKey]: value }));
    setRevealed((prev) => ({ ...prev, [currentKey]: true }));
  };

  const goToQuestion = (direction: "prev" | "next") => {
    const nextIndex =
      direction === "prev"
        ? Math.max(0, currentQuestionIndex - 1)
        : Math.min(roundQuestions.length - 1, currentQuestionIndex + 1);

    setQuestionIndex((prev) => ({ ...prev, [lesson.id]: nextIndex }));
  };

  const shuffleRound = () => {
    const nextRound = shuffleRoundQuestions(lesson.quiz);
    setRoundQuestions(nextRound);
    setQuestionIndex((prev) => ({ ...prev, [lesson.id]: 0 }));
    setAnswers({});
    setRevealed({});
  };

  const markLessonComplete = () => {
    setCompletedLessons((prev) => ({
      ...prev,
      [lesson.id]: true,
    }));
  };

  const selectLevel = (levelId: string) => {
    const nextLevel = grammarLevels.find((item) => item.id === levelId) ?? grammarLevels[0];
    setSelectedLevel(nextLevel.id);
    setSelectedLesson(nextLevel.lessons[0].id);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div>
          <div
            className="lale-display"
            style={{ fontSize: 24, fontWeight: 600, color: C.ink }}
          >
            Grammar path
          </div>
          <div style={{ fontSize: 13, color: C.inkSoft }}>
            Learn the building blocks of everyday Turkish.
          </div>
        </div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "#fff",
            border: `1px solid ${C.line}`,
            borderRadius: 999,
            padding: "6px 10px",
            color: C.cobalt,
            fontWeight: 700,
            fontSize: 12,
          }}
        >
          <Sparkles size={14} />
          Beginner friendly
        </div>
      </div>

      <GrammarLevelSelector
        levels={grammarLevels}
        selectedLevel={selectedLevel}
        onSelectLevel={selectLevel}
      />

      <div
        style={{
          background: "#fff",
          border: `1px solid ${C.line}`,
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            background: `linear-gradient(120deg, ${C.cobalt}, ${C.cobaltDeep})`,
            color: "#fff",
            padding: "18px 20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <BookOpen size={18} />
            <span style={{ fontWeight: 700, fontSize: 15 }}>{level.title}</span>
          </div>
        </div>

        <div style={{ padding: 18 }}>
          <GrammarLessonSidebar
            lessons={level.lessons}
            selectedLesson={lesson.id}
            onSelectLesson={setSelectedLesson}
          />

          <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: 18 }}>
            <GrammarLessonContent
              lesson={lesson}
              completedLessons={completedLessons}
              onMarkLessonComplete={markLessonComplete}
            />

            <GrammarQuizGame
              currentQuestion={currentQuestion}
              currentQuestionIndex={currentQuestionIndex}
              totalQuestionCount={roundQuestions.length || ROUND_QUESTION_SIZE}
              selectedAnswer={selectedAnswer}
              isRevealed={isRevealed}
              totalCorrect={totalCorrect}
              onAnswer={handleAnswer}
              onPrev={() => goToQuestion("prev")}
              onNext={() => goToQuestion("next")}
              onShuffle={shuffleRound}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
