import { useSyncExternalStore } from "react";
import { Gauge } from "lucide-react";
import { C } from "../styles/theme";
import {
  cycleSpeechRate,
  getSpeechRate,
  subscribeSpeechRate,
} from "../services/speech";

export function ReadingSpeedButton() {
  const rate = useSyncExternalStore(
    subscribeSpeechRate,
    getSpeechRate,
    getSpeechRate,
  );

  return (
    <button
      type="button"
      className="lale-btn"
      onClick={cycleSpeechRate}
      aria-label={`Reading speed ${rate} times. Change reading speed`}
      title="Change reading speed"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        border: `1px solid ${C.line}`,
        borderRadius: 8,
        padding: "9px 13px",
        cursor: "pointer",
        background: "#fff",
        color: C.cobalt,
        fontWeight: 700,
      }}
    >
      <Gauge size={15} />
      {rate}×
    </button>
  );
}
