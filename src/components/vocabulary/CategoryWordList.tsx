import { Volume2 } from "lucide-react";
import { SpeakButton } from "../SpeakButton";
import { C } from "../../styles/theme";
import { ActionButton } from "../common/ActionButton";
import { useAutoPlayCycle } from "../../hooks/useAutoPlayCycle";

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
  // Convert items to [english, turkish] format for the cycle hook
  const wordPairs: Array<[string, string]> = items.map(([tr, en]) => [en, tr]);

  // Use cycle hook to play all words continuously
  const { isPlaying, play, stop, currentIndex } = useAutoPlayCycle(wordPairs);

  const handleAutoPlayToggle = () => {
    if (isPlaying) {
      stop();
    } else {
      play();
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {/* Category-level play/stop button */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 8,
        }}
      >
        <button
          className="lale-btn"
          onClick={handleAutoPlayToggle}
          title={isPlaying ? "Stop auto-play all words" : "Auto-play all words"}
          style={{
            border: `1px solid ${C.line}`,
            background: isPlaying ? C.turquoise : "#fff",
            cursor: "pointer",
            padding: "6px 12px",
            color: isPlaying ? "#fff" : C.cobalt,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 13,
          }}
        >
          <Volume2 size={16} />
          {isPlaying ? "Playing..." : "Play All"}
        </button>
        {isPlaying && (
          <div
            style={{
              fontSize: 12,
              color: C.inkSoft,
              fontWeight: 500,
            }}
          >
            Word {currentIndex + 1} of {items.length}
          </div>
        )}
      </div>

      {items.map(([tr, en], index) => {
        const isCurrentWord = index === currentIndex;

        return (
          <div
            key={tr}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              background: isCurrentWord && isPlaying ? "#F0FFFE" : "#fff",
              border: `1px solid ${isCurrentWord && isPlaying ? C.turquoise : C.line}`,
              borderRadius: 10,
              padding: "10px 14px",
              transition: "all 0.2s ease",
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
        );
      })}
    </div>
  );
}
