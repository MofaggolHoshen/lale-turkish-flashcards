import type { ReactNode } from "react";

import { SpeakButton } from "../SpeakButton";
import { TulipGlyph } from "../TulipGlyph";
import { C } from "../../styles/theme";

type WordRowProps = {
  word: {
    id: string;
    tr: string;
    en: string;
    notes?: string;
    emoji?: string;
    level: number;
    correct: number;
    wrong: number;
  };
  actions?: ReactNode;
  showStats?: boolean;
};

export function WordRow({ word, actions, showStats = true }: WordRowProps) {
  return (
    <div
      key={word.id}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        background: "#fff",
        border: `1px solid ${C.line}`,
        borderRadius: 10,
        padding: "10px 14px",
      }}
    >
      <TulipGlyph level={word.level} size={34} />
      {word.emoji && <span style={{ fontSize: 22 }}>{word.emoji}</span>}

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontWeight: 700,
            fontSize: 14.5,
            display: "flex",
            alignItems: "center",
            gap: 4,
            flexWrap: "wrap",
          }}
        >
          <span>{word.tr}</span>
          <SpeakButton text={word.tr} size={14} />
          <span style={{ color: C.inkSoft, fontWeight: 500 }}>→ {word.en}</span>
        </div>
        {word.notes && <div style={{ fontSize: 12, color: C.inkSoft }}>{word.notes}</div>}
      </div>

      {showStats && (
        <div style={{ fontSize: 11.5, color: C.inkSoft, whiteSpace: "nowrap" }}>
          {word.correct}✓ / {word.wrong}✗
        </div>
      )}

      {actions}
    </div>
  );
}
