import { Plus, Check, RotateCcw, LayoutGrid, Sparkles, Flame, Library } from "lucide-react";
import { C } from "../styles/theme";
import { StatChip } from "./StatChip";
import { ActionButton } from "./common/ActionButton";
import { GardenGrid } from "./home/GardenGrid";

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
          <ActionButton onClick={goReview} variant="primary" disabled={due.length === 0}>
            <Check size={16} style={{ marginRight: 6, verticalAlign: -3 }} />
            Review now
          </ActionButton>
          <ActionButton onClick={goAdd} variant="secondary">
            <Plus size={16} style={{ marginRight: 6, verticalAlign: -3 }} />
            Plant a word
          </ActionButton>
        </div>
      </div>

      <div
        style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}
      >
        <ActionButton
          onClick={goReviewMastered}
          variant="secondary"
          disabled={mastered === 0}
          style={{
            border: `1.5px solid ${mastered === 0 ? C.line : C.cobalt}`,
            color: mastered === 0 ? C.inkSoft : C.cobalt,
          }}
        >
          <RotateCcw size={14} style={{ marginRight: 6 }} />
          Revisit mastered ({mastered})
        </ActionButton>
        <ActionButton
          onClick={goReviewAll}
          variant="secondary"
          disabled={words.length === 0}
          style={{
            border: `1.5px solid ${words.length === 0 ? C.line : C.cobalt}`,
            color: words.length === 0 ? C.inkSoft : C.cobalt,
          }}
        >
          <LayoutGrid size={14} style={{ marginRight: 6 }} />
          Practice all words ({words.length})
        </ActionButton>
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
        <GardenGrid words={words} />
      </div>
    </div>
  );
}
