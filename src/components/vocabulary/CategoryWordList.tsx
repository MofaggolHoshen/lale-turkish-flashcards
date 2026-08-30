import { SpeakButton } from "../SpeakButton";
import { C } from "../../styles/theme";
import { ActionButton } from "../common/ActionButton";

type CategoryWordListProps = {
  items: Array<[string, string]>;
  emojiMap: Record<string, string>;
  inGarden: (tr: string) => boolean;
  onAddToGarden: (tr: string, en: string) => void;
};

export function CategoryWordList({
  items,
  emojiMap,
  inGarden,
  onAddToGarden,
}: CategoryWordListProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {items.map(([tr, en]) => (
        <div
          key={tr}
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
          {emojiMap[tr] && <span style={{ fontSize: 22 }}>{emojiMap[tr]}</span>}
          <div
            style={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              alignItems: "center",
              gap: 4,
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontWeight: 700, fontSize: 14.5 }}>{tr}</span>
            <SpeakButton text={tr} size={14} />
            <span style={{ color: C.inkSoft, fontWeight: 500 }}>→ {en}</span>
          </div>
          <ActionButton
            onClick={() => onAddToGarden(tr, en)}
            variant={inGarden(tr) ? "primary" : "ghost"}
            disabled={inGarden(tr)}
            style={{
              fontSize: 12,
              padding: "6px 10px",
              fontWeight: 800,
              background: inGarden(tr) ? "#DCEFEC" : C.paperDeep,
              color: inGarden(tr) ? C.turquoise : C.cobalt,
              border: inGarden(tr) ? "1px solid #DCEFEC" : `1px solid ${C.line}`,
            }}
          >
            {inGarden(tr) ? "✓ In garden" : "+ Add to garden"}
          </ActionButton>
        </div>
      ))}
    </div>
  );
}
