import { useEffect, useMemo, useState } from "react";
import { BookOpen, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";
import { C } from "../styles/theme";
import { grammarLevels } from "../data/grammar";

const STORAGE_KEY = "lale-grammar-progress-v1";

type LessonProgress = {
  completed: boolean;
  score: number;
  total: number;
};

export function GrammarView() {
  const [selectedLevel, setSelectedLevel] = useState("A");
  const [selectedLesson, setSelectedLesson] = useState("a1-unit-1");
  const [progress, setProgress] = useState<Record<string, LessonProgress>>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const level = useMemo(
    () => grammarLevels.find((item) => item.id === selectedLevel) ?? grammarLevels[0],
    [selectedLevel],
  );

  const lesson = useMemo(
    () => level.lessons.find((item) => item.id === selectedLesson) ?? level.lessons[0],
    [level, selectedLesson],
  );

  const lessonProgress = progress[lesson.id] ?? { completed: false, score: 0, total: lesson.quiz.length };

  const correctCount = lesson.quiz.reduce((count, question, index) => {
    const answer = answers[`${lesson.id}-${index}`];
    return count + (answer && answer === question.answer ? 1 : 0);
  }, 0);

  const handleAnswer = (questionIndex: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [`${lesson.id}-${questionIndex}`]: value }));
    setSubmitted((prev) => ({ ...prev, [`${lesson.id}-${questionIndex}`]: false }));
  };

  const handleSubmitQuiz = () => {
    const nextScore = lesson.quiz.reduce((count, question, index) => {
      const answer = answers[`${lesson.id}-${index}`];
      return count + (answer && answer === question.answer ? 1 : 0);
    }, 0);

    setProgress((prev) => ({
      ...prev,
      [lesson.id]: {
        completed: nextScore === lesson.quiz.length,
        score: nextScore,
        total: lesson.quiz.length,
      },
    }));

    setSubmitted((prev) => ({
      ...prev,
      [lesson.id]: true,
    }));
  };

  const progressPercent = Math.round(
    ((lessonProgress.completed ? lessonProgress.total : Math.min(correctCount, lessonProgress.total)) /
      Math.max(1, lessonProgress.total)) *
      100,
  );

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

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 12,
        }}
      >
        {grammarLevels.map((item) => {
          const active = item.id === selectedLevel;
          return (
            <button
              key={item.id}
              onClick={() => {
                setSelectedLevel(item.id);
                setSelectedLesson(item.lessons[0].id);
              }}
              style={{
                textAlign: "left",
                border: active ? `2px solid ${C.cobalt}` : `1px solid ${C.line}`,
                background: active ? "#EAF5F4" : "#fff",
                borderRadius: 12,
                padding: "16px 14px",
                cursor: "pointer",
                color: C.ink,
                boxShadow: active ? "0 8px 18px rgba(15, 76, 92, 0.08)" : "none",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  background: active ? C.cobalt : C.paperDeep,
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: 13,
                  marginBottom: 10,
                }}
              >
                {item.label}
              </div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
                {item.title}
              </div>
              <div style={{ fontSize: 12.5, color: C.inkSoft }}>{item.subtitle}</div>
              <div
                style={{
                  marginTop: 10,
                  color: C.cobalt,
                  fontWeight: 700,
                  fontSize: 12,
                }}
              >
                {item.lessons.length} lesson{item.lessons.length === 1 ? "" : "s"}
              </div>
            </button>
          );
        })}
      </div>

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
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
            {level.lessons.map((item) => {
              const isSelected = item.id === lesson.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedLesson(item.id)}
                  style={{
                    border: isSelected ? `1.5px solid ${C.cobalt}` : `1px solid ${C.line}`,
                    background: isSelected ? "#F2FBFA" : "#fff",
                    borderRadius: 10,
                    padding: "12px 14px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    textAlign: "left",
                    width: "100%",
                    cursor: "pointer",
                    color: C.ink,
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{item.title}</div>
                    <div style={{ fontSize: 12.3, color: C.inkSoft, marginTop: 3 }}>
                      {item.summary}
                    </div>
                  </div>
                  <ChevronRight size={18} color={C.inkSoft} />
                </button>
              );
            })}
          </div>

          <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <CheckCircle2 size={18} color={C.turquoise} />
              <span className="lale-display" style={{ fontSize: 20, fontWeight: 600 }}>
                {lesson.title}
              </span>
            </div>

            <div style={{ color: C.inkSoft, fontSize: 13.5, marginBottom: 18 }}>
              {lesson.summary}
            </div>

            <div
              style={{
                display: "flex",
                gap: 12,
                marginBottom: 18,
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  background: C.paperDeep,
                  border: `1px solid ${C.line}`,
                  borderRadius: 10,
                  padding: "10px 12px",
                  minWidth: 150,
                }}
              >
                <div style={{ fontSize: 11.5, color: C.inkSoft, textTransform: "uppercase", letterSpacing: 0.5 }}>
                  Progress
                </div>
                <div style={{ fontWeight: 800, fontSize: 18, color: C.cobalt }}>{progressPercent}%</div>
              </div>
              <div
                style={{
                  background: lessonProgress.completed ? "#EAF7EF" : C.paperDeep,
                  border: `1px solid ${lessonProgress.completed ? "#82C89A" : C.line}`,
                  borderRadius: 10,
                  padding: "10px 12px",
                  minWidth: 160,
                }}
              >
                <div style={{ fontSize: 11.5, color: C.inkSoft, textTransform: "uppercase", letterSpacing: 0.5 }}>
                  Lesson status
                </div>
                <div style={{ fontWeight: 800, fontSize: 15, color: lessonProgress.completed ? "#1D7A4E" : C.ink }}>
                  {lessonProgress.completed ? "Completed" : "In progress"}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {lesson.sections.map((section) => (
                <section
                  key={section.title}
                  style={{
                    background: C.paperDeep,
                    border: `1px solid ${C.line}`,
                    borderRadius: 12,
                    padding: 16,
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 8 }}>{section.title}</div>
                  <div style={{ color: C.inkSoft, fontSize: 13.5, lineHeight: 1.6, marginBottom: 12 }}>
                    {section.description}
                  </div>

                  <div style={{ display: "grid", gap: 8 }}>
                    {section.examples.map((example) => (
                      <div
                        key={`${section.title}-${example.tr}`}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: 12,
                          background: "#fff",
                          border: `1px solid ${C.line}`,
                          borderRadius: 8,
                          padding: "9px 10px",
                          flexWrap: "wrap",
                        }}
                      >
                        <span style={{ fontWeight: 700, color: C.cobalt }}>{example.tr}</span>
                        <span style={{ color: C.inkSoft }}>{example.en}</span>
                      </div>
                    ))}
                  </div>

                  {section.tips && (
                    <div style={{ marginTop: 12 }}>
                      <div style={{ fontWeight: 700, fontSize: 12.5, marginBottom: 6 }}>Quick tip</div>
                      <ul style={{ margin: 0, paddingLeft: 18, color: C.inkSoft, fontSize: 12.8, lineHeight: 1.8 }}>
                        {section.tips.map((tip) => (
                          <li key={tip}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </section>
              ))}
            </div>

            <div
              style={{
                marginTop: 22,
                background: "#F7F5EF",
                border: `1px solid ${C.line}`,
                borderRadius: 12,
                padding: 14,
              }}
            >
              <div style={{ fontWeight: 800, fontSize: 13.5, marginBottom: 8 }}>Practice</div>
              <ul style={{ margin: 0, paddingLeft: 18, color: C.inkSoft, fontSize: 13, lineHeight: 1.9 }}>
                {lesson.practice.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div
              style={{
                marginTop: 22,
                background: "#F3FAF9",
                border: `1px solid ${C.line}`,
                borderRadius: 12,
                padding: 16,
              }}
            >
              <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 12 }}>Quick quiz</div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {lesson.quiz.map((question, index) => {
                  const selected = answers[`${lesson.id}-${index}`];
                  const isCorrect = selected === question.answer;
                  const showResult = submitted[lesson.id] || selected;

                  return (
                    <div
                      key={`${lesson.id}-${question.prompt}`}
                      style={{
                        background: "#fff",
                        border: `1px solid ${C.line}`,
                        borderRadius: 10,
                        padding: 12,
                      }}
                    >
                      <div style={{ fontWeight: 700, marginBottom: 8 }}>{index + 1}. {question.prompt}</div>
                      <div style={{ display: "grid", gap: 8 }}>
                        {question.options.map((option) => {
                          const active = selected === option;
                          const isAnswer = question.answer === option;
                          const reveal = showResult && isAnswer;
                          const wrong = showResult && active && !isAnswer;

                          return (
                            <button
                              key={option}
                              onClick={() => handleAnswer(index, option)}
                              style={{
                                textAlign: "left",
                                borderRadius: 8,
                                border: reveal
                                  ? "1px solid #48A66B"
                                  : wrong
                                    ? "1px solid #D2492F"
                                    : active
                                      ? `1px solid ${C.cobalt}`
                                      : `1px solid ${C.line}`,
                                background: reveal
                                  ? "#EAF7EF"
                                  : wrong
                                    ? "#FCEAE6"
                                    : active
                                      ? "#EAF5F4"
                                      : "#fff",
                                padding: "8px 10px",
                                color: C.ink,
                                fontWeight: 600,
                                cursor: "pointer",
                              }}
                            >
                              {option}
                            </button>
                          );
                        })}
                      </div>

                      {showResult && (
                        <div
                          style={{
                            marginTop: 8,
                            fontSize: 12.5,
                            color: isCorrect ? "#1D7A4E" : C.inkSoft,
                            fontWeight: 600,
                          }}
                        >
                          {isCorrect ? "Correct." : `Correct answer: ${question.answer}.`} {question.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 10,
                  marginTop: 16,
                  flexWrap: "wrap",
                }}
              >
                <div style={{ color: C.inkSoft, fontSize: 12.5, fontWeight: 600 }}>
                  Score: {correctCount}/{lesson.quiz.length}
                </div>
                <button
                  onClick={handleSubmitQuiz}
                  style={{
                    border: "none",
                    background: C.cobalt,
                    color: "#fff",
                    padding: "9px 14px",
                    borderRadius: 9,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {lessonProgress.completed ? "Retake quiz" : "Check answers"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
