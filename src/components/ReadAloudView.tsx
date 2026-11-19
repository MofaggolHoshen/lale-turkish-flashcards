import { useEffect, useRef, useState } from "react";
import { Pause, Play, Repeat, RotateCcw } from "lucide-react";
import { C } from "../styles/theme";
import {
  cancelSpeech,
  isSpeechSupported,
  speakWithProgress,
} from "../services/speech";
import { PageHeader } from "./common/PageHeader";
import { ReadingSpeedButton } from "./ReadingSpeedButton";

type ReadingLanguage = "tr-TR" | "en-US";
type SelectedPassage = { text: string; start: number };

const languages: { code: ReadingLanguage; label: string }[] = [
  { code: "tr-TR", label: "Turkish" },
  { code: "en-US", label: "English" },
];

export function ReadAloudView() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState<ReadingLanguage>("tr-TR");
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeWordIndex, setActiveWordIndex] = useState(-1);
  const [selectedPassage, setSelectedPassage] =
    useState<SelectedPassage | null>(null);
  const textDisplayRef = useRef<HTMLElement>(null);
  const playingRef = useRef(false);
  const runIdRef = useRef(0);
  const supported = isSpeechSupported();
  const words = Array.from(text.matchAll(/\S+/g), (match) => ({
    start: match.index ?? 0,
    end: (match.index ?? 0) + match[0].length,
  }));

  useEffect(
    () => () => {
      playingRef.current = false;
      runIdRef.current += 1;
      cancelSpeech();
    },
    [],
  );

  useEffect(() => {
    const updateSelection = () => {
      const container = textDisplayRef.current;
      const selection = window.getSelection();
      if (
        !container ||
        !selection ||
        selection.isCollapsed ||
        selection.rangeCount === 0
      ) {
        setSelectedPassage(null);
        return;
      }

      const range = selection.getRangeAt(0);
      if (
        !container.contains(range.startContainer) ||
        !container.contains(range.endContainer)
      ) {
        setSelectedPassage(null);
        return;
      }

      const selectedText = selection.toString();
      const trimmedText = selectedText.trim();
      if (!trimmedText) {
        setSelectedPassage(null);
        return;
      }

      const prefixRange = range.cloneRange();
      prefixRange.selectNodeContents(container);
      prefixRange.setEnd(range.startContainer, range.startOffset);
      const start =
        prefixRange.toString().length +
        (selectedText.length - selectedText.trimStart().length);

      setSelectedPassage((current) =>
        current?.text === trimmedText && current.start === start
          ? current
          : { text: trimmedText, start },
      );
    };

    document.addEventListener("selectionchange", updateSelection);
    return () => document.removeEventListener("selectionchange", updateSelection);
  }, []);

  const stop = () => {
    playingRef.current = false;
    runIdRef.current += 1;
    cancelSpeech();
    setActiveWordIndex(-1);
    setIsPlaying(false);
  };

  const play = () => {
    if (isPlaying) {
      stop();
      return;
    }

    void readFromWord(0);
  };

  const repeatPassage = async (passage: string, startCharacter: number) => {
    if (!supported || !passage.trim()) return;

    playingRef.current = true;
    const runId = ++runIdRef.current;
    setIsPlaying(true);

    try {
      while (playingRef.current && runIdRef.current === runId) {
        const completed = await speakWithProgress(
          passage,
          language,
          (charIndex) => {
            if (runIdRef.current !== runId) return;
            const wordIndex = words.findIndex(
              (word) => startCharacter + charIndex < word.end,
            );
            setActiveWordIndex(wordIndex);
          },
        );
        if (!completed || !playingRef.current || runIdRef.current !== runId) {
          break;
        }

        setActiveWordIndex(-1);
        await new Promise((resolve) => window.setTimeout(resolve, 700));
      }
    } finally {
      if (runIdRef.current === runId) {
        playingRef.current = false;
        setIsPlaying(false);
        setActiveWordIndex(-1);
      }
    }
  };

  const readFromWord = (startWordIndex: number) => {
    const startCharacter = words[startWordIndex]?.start ?? 0;
    void repeatPassage(text.slice(startCharacter), startCharacter);
  };

  let wordIndex = 0;

  return (
    <div>
      <PageHeader
        title="Read aloud"
        subtitle="Paste or type text, then select Read to loop or click any word to start from there."
        action={
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <ReadingSpeedButton />
            <button
              type="button"
              className="lale-btn"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() =>
                selectedPassage &&
                void repeatPassage(selectedPassage.text, selectedPassage.start)
              }
              disabled={
                !supported ||
                !selectedPassage ||
                isPlaying ||
                !selectedPassage.text
              }
              aria-label="Repeat selected text"
              title={
                selectedPassage
                  ? `Repeat: ${selectedPassage.text}`
                  : "Select a word or sentence in the text below"
              }
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                border: `1px solid ${C.line}`,
                borderRadius: 8,
                padding: "9px 13px",
                cursor:
                  supported && selectedPassage && !isPlaying
                    ? "pointer"
                    : "not-allowed",
                background: "#fff",
                color: C.cobalt,
                fontWeight: 700,
                opacity: supported && selectedPassage && !isPlaying ? 1 : 0.55,
              }}
            >
              <Repeat size={15} />
              Repeat selection
            </button>
            <button
              type="button"
              className="lale-btn"
              onClick={play}
              disabled={!supported || !text.trim()}
              aria-label={isPlaying ? "Stop reading" : "Read text aloud"}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                border: "none",
                borderRadius: 8,
                padding: "9px 13px",
                cursor: supported && text.trim() ? "pointer" : "not-allowed",
                background: isPlaying ? C.cobalt : C.turquoise,
                color: isPlaying ? "#fff" : "#04292A",
                fontWeight: 700,
                opacity: supported && text.trim() ? 1 : 0.55,
              }}
            >
              {isPlaying ? <Pause size={15} /> : <Play size={15} />}
              {isPlaying ? "Stop" : "Read"}
            </button>
          </div>
        }
      />

      <label
        htmlFor="read-aloud-language"
        style={{ display: "block", color: C.inkSoft, fontSize: 13, marginBottom: 6 }}
      >
        Reading language
      </label>
      <select
        id="read-aloud-language"
        value={language}
        onChange={(event) => setLanguage(event.target.value as ReadingLanguage)}
        disabled={isPlaying}
        style={{
          border: `1px solid ${C.line}`,
          borderRadius: 8,
          padding: "9px 12px",
          color: C.ink,
          background: "#fff",
          font: "inherit",
          marginBottom: 14,
        }}
      >
        {languages.map((option) => (
          <option key={option.code} value={option.code}>
            {option.label}
          </option>
        ))}
      </select>

      <label
        htmlFor="read-aloud-text"
        style={{ display: "block", color: C.inkSoft, fontSize: 13, marginBottom: 6 }}
      >
        Your text
      </label>
      <textarea
        id="read-aloud-text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        disabled={isPlaying}
        placeholder="Paste or type the text you want to hear..."
        rows={6}
        style={{
          display: "block",
          boxSizing: "border-box",
          width: "100%",
          resize: "vertical",
          border: `1px solid ${C.line}`,
          borderRadius: 10,
          padding: 14,
          color: C.ink,
          background: "#fff",
          font: "inherit",
          lineHeight: 1.7,
          marginBottom: 18,
        }}
      />

      <section
        ref={textDisplayRef}
        aria-label="Text being read"
        aria-live="off"
        style={{
          minHeight: 100,
          background: "#fff",
          border: `1px solid ${C.line}`,
          borderRadius: 10,
          padding: "18px clamp(16px, 3vw, 26px)",
          fontSize: 18,
          lineHeight: 2,
          whiteSpace: "pre-wrap",
          overflowWrap: "anywhere",
        }}
      >
        {text ? (
          Array.from(text.matchAll(/\S+|\s+/g), (match) => {
            if (/^\s+$/.test(match[0])) return match[0];
            const currentWordIndex = wordIndex++;
            return (
              <button
                key={`${match.index}-${currentWordIndex}`}
                type="button"
                onClick={() => void readFromWord(currentWordIndex)}
                aria-label={`Read from ${match[0]}`}
                title="Read from this word"
                style={{
                  appearance: "none",
                  border: "none",
                  padding: "0 1px",
                  color: "inherit",
                  font: "inherit",
                  lineHeight: "inherit",
                  userSelect: "text",
                  borderRadius: 4,
                  cursor: "pointer",
                  background:
                    activeWordIndex === currentWordIndex
                      ? "#F3CE78"
                      : "transparent",
                  boxShadow:
                    activeWordIndex === currentWordIndex
                      ? "0 0 0 2px #F3CE78"
                      : "none",
                  transition: "background .12s ease",
                }}
              >
                {match[0]}
              </button>
            );
          })
        ) : (
          <span style={{ color: C.inkSoft }}>
            Your text will appear here as you type.
          </span>
        )}
      </section>

      {!supported && (
        <p role="status" style={{ color: C.coral, marginTop: 12 }}>
          Read aloud is not supported by this browser.
        </p>
      )}
      {supported && isPlaying && (
        <p role="status" style={{ color: C.inkSoft, marginTop: 12 }}>
          Reading repeatedly. Select Stop when you are finished.
        </p>
      )}
      {supported && !isPlaying && (
        <p style={{ color: C.inkSoft, fontSize: 13, marginTop: 12 }}>
          <RotateCcw
            size={14}
            style={{ verticalAlign: "text-bottom", marginRight: 5 }}
          />
          The text repeats until you stop playback.
        </p>
      )}
    </div>
  );
}
