import React from "react";
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

export function TulipGlyph({ level = 0, size = 44 }) {
  const progress = level / 5;
  const petal =
    level === 0
      ? "#9FB0AC"
      : level < 3
        ? C.turquoise
        : level < 5
          ? C.coral
          : C.gold;
  const beads = new Array(5).fill(0).map((_, index) => index < level);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      style={{ overflow: "visible" }}
    >
      <circle
        cx="32"
        cy="32"
        r="29"
        fill="none"
        stroke={C.line}
        strokeWidth="1.5"
      />
      {beads.map((filled, index) => {
        const angle = -90 + index * 72;
        const radians = (angle * Math.PI) / 180;
        return (
          <circle
            key={index}
            cx={32 + 29 * Math.cos(radians)}
            cy={32 + 29 * Math.sin(radians)}
            r="3.4"
            fill={filled ? C.cobalt : "#fff"}
            stroke={C.line}
            strokeWidth="1"
          />
        );
      })}
      <path
        d="M32 46 C 32 38, 32 34, 32 30"
        stroke="#5C8A72"
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
      />
      <g transform={`translate(32,26) scale(${0.72 + progress * 0.34})`}>
        <path
          d="M0,10 C -9,4 -10,-9 -3,-14 C -1,-10 0,-6 0,-2 C 0,-6 1,-10 3,-14 C 10,-9 9,4 0,10 Z"
          fill={petal}
        />
        <path
          d="M0,10 C -5,3 -6,-6 -2,-11 C -1,-7 0,-3 0,1 Z"
          fill={petal}
          opacity="0.55"
        />
        <path
          d="M0,10 C 5,3 6,-6 2,-11 C 1,-7 0,-3 0,1 Z"
          fill={petal}
          opacity="0.35"
        />
      </g>
    </svg>
  );
}

export function StatChip({ icon, label, value }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: "#fff",
        border: `1px solid ${C.line}`,
        borderRadius: 10,
        padding: "10px 16px",
      }}
    >
      <div>{icon}</div>
      <div>
        <div style={{ fontSize: 18, fontWeight: 700, lineHeight: 1 }}>
          {value}
        </div>
        <div style={{ fontSize: 11.5, color: C.inkSoft }}>{label}</div>
      </div>
    </div>
  );
}

export function EmptyNote({ text }) {
  return (
    <div
      style={{
        background: "#fff",
        border: `1px dashed ${C.line}`,
        borderRadius: 12,
        padding: 24,
        textAlign: "center",
        color: C.inkSoft,
        fontSize: 14,
      }}
    >
      {text}
    </div>
  );
}

export function Field({ label, hint, children }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 12.5,
          color: C.inkSoft,
          marginBottom: 5,
          fontWeight: 600,
        }}
      >
        <span>{label}</span>
        {hint && (
          <span
            style={{ color: C.turquoise, fontWeight: 500, fontStyle: "italic" }}
          >
            {hint}
          </span>
        )}
      </label>
      {children}
    </div>
  );
}
