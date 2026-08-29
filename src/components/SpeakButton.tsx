import { Volume2 } from "lucide-react";
import { C } from "../styles/theme";
import { speak } from "../services/speech";

export function SpeakButton({ text, lang = "tr-TR", size = 15 }) {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    speak(text, lang);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.stopPropagation();
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.stopPropagation();
  };

  return (
    <button
      className="lale-btn"
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      title="Pronounce"
      style={{
        border: "none",
        background: "transparent",
        cursor: "pointer",
        padding: 4,
        color: C.cobalt,
        display: "inline-flex",
        alignItems: "center",
      }}
    >
      <Volume2 size={size} />
    </button>
  );
}
