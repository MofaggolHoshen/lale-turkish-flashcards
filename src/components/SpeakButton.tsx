import { Volume2 } from "lucide-react";
import { C } from "../styles/theme";
import { speak } from "../services/speech";

export function SpeakButton({ text, lang = "tr-TR", size = 15 }) {
  return (
    <button
      className="lale-btn"
      onClick={(event) => {
        event.stopPropagation();
        speak(text, lang);
      }}
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
