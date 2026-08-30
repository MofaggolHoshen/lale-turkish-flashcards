import { ChevronLeft } from "lucide-react";

import { C, btnStyle } from "../../styles/theme";

type FlashcardNavProps = {
  currentIndex: number;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
  onBack?: () => void;
  backLabel?: string;
  showBack?: boolean;
};

export function FlashcardNav({
  currentIndex,
  total,
  onPrevious,
  onNext,
  onBack,
  backLabel = "Back",
  showBack = true,
}: FlashcardNavProps) {
  return (
    <div style={{ maxWidth: 460, margin: "0 auto", textAlign: "center" }}>
      {showBack && onBack && (
        <button
          type="button"
          onClick={onBack}
          className="lale-btn"
          style={{
            ...btnStyle("transparent", C.inkSoft, false),
            padding: "4px 0",
            marginBottom: 10,
          }}
        >
          <ChevronLeft size={15} style={{ verticalAlign: -2 }} /> {backLabel}
        </button>
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
          type="button"
          onClick={onPrevious}
          disabled={currentIndex === 0}
          className="lale-btn"
          style={{
            ...btnStyle("transparent", C.inkSoft, currentIndex === 0),
            padding: "2px 4px",
            fontWeight: 600,
            fontSize: 13,
          }}
        >
          ← Previous
        </button>
        <span style={{ fontSize: 12.5, color: C.inkSoft }}>
          {currentIndex + 1} of {total}
        </span>
        <button
          type="button"
          onClick={onNext}
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
    </div>
  );
}
