import { ArrowRight, ChevronLeft } from "lucide-react";

import type { GrammarQuizQuestion } from "../../data/grammar";
import { C } from "../../styles/theme";

type GrammarQuizGameProps = {
  currentQuestion: GrammarQuizQuestion | undefined;
  currentQuestionIndex: number;
  totalQuestionCount: number;
  selectedAnswer?: string;
  isRevealed: boolean;
  totalCorrect: number;
  onAnswer: (value: string) => void;
  onPrev: () => void;
  onNext: () => void;
  onShuffle: () => void;
};

export function GrammarQuizGame({
  currentQuestion,
  currentQuestionIndex,
  totalQuestionCount,
  selectedAnswer,
  isRevealed,
  totalCorrect,
  onAnswer,
  onPrev,
  onNext,
  onShuffle,
}: GrammarQuizGameProps) {
  return (
    <div
      style={{
        marginTop: 22,
        background: "linear-gradient(180deg, #eef9f8 0%, #f9f9f5 100%)",
        border: `1px solid ${C.line}`,
        borderRadius: 16,
        padding: 16,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
          marginBottom: 14,
          flexWrap: "wrap",
        }}
      >
        <div style={{ fontWeight: 800, fontSize: 14 }}>Flashcard game</div>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={onShuffle}
            style={{
              border: `1px solid ${C.line}`,
              background: "#fff",
              color: C.ink,
              borderRadius: 999,
              padding: "7px 12px",
              fontWeight: 700,
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            Shuffle questions
          </button>
          <div style={{ color: C.inkSoft, fontSize: 12.5, fontWeight: 700 }}>
            {currentQuestion ? currentQuestionIndex + 1 : 0}/{totalQuestionCount || 100}
          </div>
        </div>
      </div>

      {currentQuestion ? (
        <div
          style={{
            background: "#fff",
            border: `1px solid ${C.line}`,
            borderRadius: 14,
            padding: 18,
            boxShadow: "0 10px 24px rgba(20, 42, 51, 0.04)",
          }}
        >
          <div style={{ fontSize: 12.5, color: C.inkSoft, fontWeight: 700, marginBottom: 8 }}>
            Question
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: C.cobalt, marginBottom: 16 }}>
            {currentQuestion.prompt}
          </div>

          <div style={{ display: "grid", gap: 10 }}>
            {currentQuestion.options.map((option) => {
              const isOptionSelected = selectedAnswer === option;
              const isCorrectOption = option === currentQuestion.answer;
              const showCorrect = isRevealed && isCorrectOption;
              const showWrong = isRevealed && isOptionSelected && !isCorrectOption;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => onAnswer(option)}
                  style={{
                    textAlign: "left",
                    borderRadius: 10,
                    border: showCorrect
                      ? "1px solid #41A66C"
                      : showWrong
                        ? "1px solid #D2492F"
                        : isOptionSelected
                          ? `1px solid ${C.cobalt}`
                          : `1px solid ${C.line}`,
                    background: showCorrect
                      ? "#EAF7EF"
                      : showWrong
                        ? "#FCEAE6"
                        : isOptionSelected
                          ? "#EAF5F4"
                          : "#fff",
                    color: C.ink,
                    padding: "12px 14px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {isRevealed && (
            <div
              style={{
                marginTop: 16,
                borderRadius: 10,
                background: selectedAnswer === currentQuestion.answer ? "#EAF7EF" : "#FCEAE6",
                border: `1px solid ${selectedAnswer === currentQuestion.answer ? "#41A66C" : "#D2492F"}`,
                color: selectedAnswer === currentQuestion.answer ? "#1D7A4E" : C.coral,
                padding: "12px 14px",
                fontSize: 13.5,
                lineHeight: 1.6,
              }}
            >
              <div style={{ fontWeight: 800, marginBottom: 4 }}>
                {selectedAnswer === currentQuestion.answer
                  ? "Correct!"
                  : `Not quite — the answer is: ${currentQuestion.answer}`}
              </div>
              <div>{currentQuestion.explanation}</div>
            </div>
          )}
        </div>
      ) : (
        <div
          style={{
            background: "#fff",
            border: `1px solid ${C.line}`,
            borderRadius: 14,
            padding: 18,
            textAlign: "center",
            color: C.inkSoft,
          }}
        >
          No cards in this round yet.
        </div>
      )}

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
        <div style={{ fontWeight: 700, color: C.inkSoft, fontSize: 13 }}>
          Score: {totalCorrect}/{totalQuestionCount || 100}
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={onPrev}
            disabled={currentQuestionIndex === 0 || !currentQuestion}
            style={{
              border: `1px solid ${C.line}`,
              background: "#fff",
              color: C.ink,
              padding: "9px 12px",
              borderRadius: 9,
              fontWeight: 700,
              cursor: currentQuestionIndex === 0 || !currentQuestion ? "not-allowed" : "pointer",
              opacity: currentQuestionIndex === 0 || !currentQuestion ? 0.5 : 1,
            }}
          >
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <ChevronLeft size={16} />
              Prev
            </span>
          </button>

          <button
            type="button"
            onClick={onNext}
            disabled={currentQuestionIndex >= (totalQuestionCount || 100) - 1 || !currentQuestion}
            style={{
              border: "none",
              background: C.cobalt,
              color: "#fff",
              padding: "9px 14px",
              borderRadius: 9,
              fontWeight: 700,
              cursor:
                currentQuestionIndex >= (totalQuestionCount || 100) - 1 || !currentQuestion
                  ? "not-allowed"
                  : "pointer",
              opacity:
                currentQuestionIndex >= (totalQuestionCount || 100) - 1 || !currentQuestion ? 0.5 : 1,
            }}
          >
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              Next <ArrowRight size={16} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
