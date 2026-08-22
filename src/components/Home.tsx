import { Plus, Check, RotateCcw, LayoutGrid, Sparkles, Flame, Library } from "lucide-react";
import { C, btnStyle } from "../styles/theme";
import { TulipGlyph } from "./TulipGlyph";
import { StatChip } from "./StatChip";
import { EmptyNote } from "./EmptyNote";

export function Home({
  words,
  due,
  mastered,
  meta,
  goReview,
  goReviewMastered,
  goReviewAll,
  goAdd,
}) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: `linear-gradient(120deg, ${C.cobalt}, ${C.cobaltDeep})`,
          borderRadius: 14,
          padding: "26px 30px",
          color: "#fff",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div>
          <div
            className="lale-display"
            style={{ fontSize: 34, fontWeight: 600 }}
          >
            {due.length === 0
              ? "Nothing due — well tended."
              : `${due.length} word${due.length === 1 ? "" : "s"} ready to review`}
          </div>
          <div style={{ color: "#B9D3D0", marginTop: 6, fontSize: 14.5 }}>
            {words.length} planted in total · {mastered} in full bloom
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            className="lale-btn"
            onClick={goReview}
            disabled={due.length === 0}
            style={btnStyle(C.turquoise, "#04292A", due.length === 0)}
          >
            <Check size={16} style={{ marginRight: 6, verticalAlign: -3 }} />
            Review now
          </button>
          <button
            className="lale-btn"
            onClick={goAdd}
            style={btnStyle("#fff", C.cobalt, false)}
          >
            <Plus size={16} style={{ marginRight: 6, verticalAlign: -3 }} />
            Plant a word
          </button>
        </div>
      </div>

      <div
        style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}
      >
        <button
          className="lale-btn"
          onClick={goReviewMastered}
          disabled={mastered === 0}
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 13,
            fontWeight: 700,
            padding: "9px 14px",
            borderRadius: 9,
            background: "#fff",
            border: `1.5px solid ${mastered === 0 ? C.line : C.cobalt}`,
            color: mastered === 0 ? C.inkSoft : C.cobalt,
            cursor: mastered === 0 ? "not-allowed" : "pointer",
          }}
        >
          <RotateCcw size={14} style={{ marginRight: 6 }} />
          Revisit mastered ({mastered})
        </button>
        <button
          className="lale-btn"
          onClick={goReviewAll}
          disabled={words.length === 0}
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 13,
            fontWeight: 700,
            padding: "9px 14px",
            borderRadius: 9,
            background: "#fff",
            border: `1.5px solid ${words.length === 0 ? C.line : C.cobalt}`,
            color: words.length === 0 ? C.inkSoft : C.cobalt,
            cursor: words.length === 0 ? "not-allowed" : "pointer",
          }}
        >
          <LayoutGrid size={14} style={{ marginRight: 6 }} />
          Practice all words ({words.length})
        </button>
      </div>
      <div style={{ fontSize: 11.5, color: C.inkSoft, marginTop: 6 }}>
        These are on-demand — anytime you like, regardless of the schedule
        above.
      </div>

      <div
        style={{ display: "flex", gap: 18, marginTop: 18, flexWrap: "wrap" }}
      >
        <StatChip
          icon={<Flame size={16} color={C.coral} />}
          label="Day streak"
          value={meta.streak}
        />
        <StatChip
          icon={<Sparkles size={16} color={C.gold} />}
          label="Best streak"
          value={meta.best}
        />
        <StatChip
          icon={<Library size={16} color={C.cobalt} />}
          label="Words planted"
          value={words.length}
        />
      </div>

      <div style={{ marginTop: 26 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 10,
          }}
        >
          <LayoutGrid size={16} color={C.inkSoft} />
          <span
            className="lale-display"
            style={{ fontSize: 17, fontWeight: 600 }}
          >
            Your garden
          </span>
        </div>
        {words.length === 0 ? (
          <EmptyNote text="Plant your first word and it'll bloom here as you review it." />
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(58px, 1fr))",
              gap: 10,
              background: "#fff",
              border: `1px solid ${C.line}`,
              borderRadius: 12,
              padding: 16,
            }}
          >
            {words
              .slice()
              .sort((a, b) => b.level - a.level)
              .map((w) => (
                <div
                  key={w.id}
                  title={`${w.tr} — level ${w.level}/5`}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <TulipGlyph level={w.level} size={40} />
                  <span
                    style={{
                      fontSize: 10.5,
                      color: C.inkSoft,
                      maxWidth: 56,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {w.tr}
                  </span>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
