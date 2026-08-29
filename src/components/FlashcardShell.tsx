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
  const [dragX, setDragX] = useState(0);
  const startX = useRef<number | null>(null);

  const resetDrag = () => {
    startX.current = null;
    setDragX(0);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    startX.current = e.clientX;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (startX.current === null) return;
    setDragX(e.clientX - startX.current);
  };

  const handlePointerUp = () => {
    if (dragX > 90 && onSwipeRight) onSwipeRight();
    else if (dragX < -90 && onSwipeLeft) onSwipeLeft();
    resetDrag();
  };

  const isSwipeMove = Math.abs(dragX) > 10;

  return (
    <div
      className="lale-card"
      onClick={() => {
        if (!isSwipeMove) onToggle();
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
        transform: `translateX(${dragX}px) rotate(${dragX / 20}deg)`,
        transition: startX.current === null ? "transform .25s ease" : "none",
      }}
    >
      {tulipLevel !== undefined && <TulipGlyph level={tulipLevel} size={40} />}
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
      {hintText && !flipped && (
        <div style={{ fontSize: 12.5, color: C.inkSoft }}>{hintText}</div>
      )}
      {flipped && !onSwipeRight && !onSwipeLeft && (
        <div style={{ fontSize: 12.5, color: C.inkSoft }}>
          Swipe left or right to answer
        </div>
      )}
    </div>
  );
}
