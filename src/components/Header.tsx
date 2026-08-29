import { C } from "../styles/theme";
import { TulipGlyph } from "./TulipGlyph";

export function Header({ tab, setTab, dueCount }) {
  const items = [
    { id: "home", label: "Garden" },
    { id: "vocab", label: "Vocabulary" },
    { id: "grammar", label: "Grammar" },
    { id: "review", label: `Review${dueCount ? ` (${dueCount})` : ""}` },
    { id: "add", label: "Add word" },
    { id: "library", label: "Library" },
  ];

  return (
    <div style={{ background: C.cobalt, padding: "14px 16px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 10,
          flexWrap: "wrap",
        }}
      >
        <TulipGlyph level={3} size={28} />
        <span
          className="lale-display"
          style={{
            color: "#fff",
            fontSize: 19,
            fontWeight: 600,
            letterSpacing: 0.2,
          }}
        >
          Lâle
        </span>
        <span style={{ color: "#B9D3D0", fontSize: 12.5 }}>
          Turkish word garden
        </span>
      </div>
      <div
        className="lale-nav-scroll"
        style={{
          display: "flex",
          gap: 4,
          background: C.cobaltDeep,
          borderRadius: 10,
          padding: 4,
          overflowX: "auto",
        }}
      >
        {items.map((it) => (
          <button
            key={it.id}
            className="lale-btn"
            onClick={() => setTab(it.id)}
            style={{
              border: "none",
              cursor: "pointer",
              padding: "7px 12px",
              borderRadius: 7,
              fontSize: 13,
              fontWeight: 600,
              whiteSpace: "nowrap",
              flexShrink: 0,
              background: tab === it.id ? C.turquoise : "transparent",
              color: tab === it.id ? "#04292A" : "#D7E7E5",
            }}
          >
            {it.label}
          </button>
        ))}
      </div>
    </div>
  );
}
