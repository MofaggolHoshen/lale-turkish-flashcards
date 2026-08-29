import { useRef, useState } from "react";
import { C } from "../styles/theme";
import { SpeakButton } from "./SpeakButton";
import { TulipGlyph } from "./TulipGlyph";

export function FlashcardShell({
  frontText,
  backText,
  frontLang,
  backLang,
  emoji,
  flipped,
  onToggle,
  onSwipeLeft,
  onSwipeRight,
  hintText,
  tulipLevel,
}: {
  frontText: string;
  backText: string;
  frontLang: "tr-TR" | "en-US";
  backLang: "tr-TR" | "en-US";
  emoji?: string;
  flipped: boolean;
  onToggle: () => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  hintText?: string;
  tulipLevel?: number;
}) {
  // Swipe gesture tracking
  const [swipeDistance, setSwipeDistance] = useState(0);
  const pointerStartX = useRef<number | null>(null);
  const SWIPE_THRESHOLD = 90; // pixels required to trigger swipe action
  const SWIPE_INTENT_THRESHOLD = 10; // pixels to distinguish from click

  const resetSwipe = () => {
    pointerStartX.current = null;
    setSwipeDistance(0);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    pointerStartX.current = e.clientX;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (pointerStartX.current === null) return;
    setSwipeDistance(e.clientX - pointerStartX.current);
  };

  const handlePointerUp = () => {
    // Swipe right (positive distance) goes to previous card
    if (swipeDistance > SWIPE_THRESHOLD && onSwipeRight) onSwipeRight();
    // Swipe left (negative distance) goes to next card
    else if (swipeDistance < -SWIPE_THRESHOLD && onSwipeLeft) onSwipeLeft();
    resetSwipe();
  };

  // Detect if user is intentionally swiping vs. clicking
  const isActiveSwipe = Math.abs(swipeDistance) > SWIPE_INTENT_THRESHOLD;

  return (
    <div
      className="lale-card"
      onClick={(e) => {
        // Ignore clicks on buttons and interactive elements
        const target = e.target as HTMLElement;
        if (target.tagName === "BUTTON" || target.closest("button")) {
          return;
        }
        // Only toggle flip if user clicked, not swiped
        if (!isActiveSwipe) onToggle();
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
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
        userSelect: "none",
        touchAction: "none", // Prevent default touch behaviors (scroll, zoom)
        willChange: "transform", // GPU acceleration hint
        // Apply drag animation: horizontal translation + slight rotation
        transform: `translateX(${swipeDistance}px) rotate(${swipeDistance / 20}deg)`,
        transition: pointerStartX.current === null ? "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)" : "none",
      }}
    >
      {/* Mastery indicator: Tulip glyph showing card level */}
      {tulipLevel !== undefined && <TulipGlyph level={tulipLevel} size={40} />}
      {/* Emoji shown only on the English front side */}
      {!flipped && emoji && <div style={{ fontSize: 40 }}>{emoji}</div>}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div className="lale-display" style={{ fontSize: 28, fontWeight: 600 }}>
          {flipped ? backText : frontText}
        </div>
        <SpeakButton
          text={flipped ? backText : frontText}
          lang={flipped ? backLang : frontLang}
          size={19}
        />
      </div>
      {/* Hint text on front side only */}
      {hintText && !flipped && (
        <div style={{ fontSize: 12.5, color: C.inkSoft }}>{hintText}</div>
      )}
      {/* Swipe hint when no grading buttons available */}
      {flipped && !onSwipeRight && !onSwipeLeft && (
        <div style={{ fontSize: 12.5, color: C.inkSoft }}>
          Swipe left or right to answer
        </div>
      )}
    </div>
  );
}
