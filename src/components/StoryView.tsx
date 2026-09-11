import { useState } from "react";
import { BookOpen, Play, Square } from "lucide-react";
import { stories } from "../data/story";
import { C } from "../styles/theme";
import { speak } from "../services/speech";
import { PageHeader } from "./common/PageHeader";

export function StoryView() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const story = stories[selectedIndex];

  if (!story) return null;

  const playTurkish = () => {
    setIsPlaying(true);
    speak(story.turkish);
    window.setTimeout(() => setIsPlaying(false), Math.max(1000, story.turkish.length * 70));
  };

  const stopPlaying = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  return (
    <div>
      <PageHeader
        title="Story"
        subtitle="Read the Turkish story first, then check the translation."
        action={
          <button
            className="lale-btn"
            onClick={isPlaying ? stopPlaying : playTurkish}
            aria-label={isPlaying ? "Stop Turkish story" : "Play Turkish story"}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              border: "none",
              borderRadius: 8,
              padding: "9px 13px",
              cursor: "pointer",
              background: C.turquoise,
              color: "#04292A",
              fontWeight: 700,
            }}
          >
            {isPlaying ? <Square size={15} /> : <Play size={15} />}
            {isPlaying ? "Stop" : "Play Turkish"}
          </button>
        }
      />

      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 14 }}>
        {stories.map((item, index) => (
          <button
            key={item.title}
            className="lale-btn"
            onClick={() => {
              stopPlaying();
              setSelectedIndex(index);
            }}
            style={{
              flexShrink: 0,
              border: `1px solid ${index === selectedIndex ? C.cobalt : C.line}`,
              borderRadius: 8,
              padding: "8px 11px",
              cursor: "pointer",
              background: index === selectedIndex ? C.cobalt : "#fff",
              color: index === selectedIndex ? "#fff" : C.ink,
              fontWeight: 600,
              fontSize: 13,
            }}
          >
            {item.title}
          </button>
        ))}
      </div>

      <article
        style={{
          background: "#fff",
          border: `1px solid ${C.line}`,
          borderRadius: 10,
          padding: "22px clamp(18px, 4vw, 34px)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, color: C.cobalt, marginBottom: 12 }}>
          <BookOpen size={18} />
          <h2 className="lale-display" style={{ margin: 0, fontSize: 24 }}>{story.title}</h2>
        </div>
        <p style={{ fontSize: 17, lineHeight: 1.8, margin: "0 0 22px", whiteSpace: "pre-line" }}>
          {story.turkish}
        </p>
        <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: 18 }}>
          <div style={{ color: C.inkSoft, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>
            English translation
          </div>
          <p style={{ color: C.inkSoft, lineHeight: 1.7, margin: 0 }}>{story.english}</p>
        </div>
        <div style={{ marginTop: 20, color: C.inkSoft, fontSize: 13, lineHeight: 1.6 }}>
          <strong style={{ color: C.ink }}>Vocabulary:</strong> {story.words}
        </div>
      </article>
    </div>
  );
}