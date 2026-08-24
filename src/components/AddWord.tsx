import React, { useState } from "react";
import { Plus, Volume2 } from "lucide-react";
import { C, btnStyle, inputStyle } from "../styles/theme";
import { Field } from "./Field";
import { speak } from "../services/speech";
import { translateWord as lookupTranslation } from "../services/translation";
import { uid } from "../utils/flashcards";
import { EMOJI, EN_TR, TR_EN } from "../data/vocabulary";

export function AddWord({ words, updateWords, onAdded }) {
  const [tr, setTr] = useState("");
  const [en, setEn] = useState("");
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [emojiManual, setEmojiManual] = useState(false);
  const [trManual, setTrManual] = useState(false);
  const [enManual, setEnManual] = useState(false);
  const [fetchingSide, setFetchingSide] = useState(null);
  const [err, setErr] = useState("");
  const timerRef = React.useRef(null);

  const scheduleLookup = (value, sourceIsT) => {
    clearTimeout(timerRef.current);
    if (!value.trim() || value.trim().length < 2) return;
    if (sourceIsT && enManual) return;
    if (!sourceIsT && trManual) return;
    timerRef.current = setTimeout(async () => {
      setErr("");
      setFetchingSide(sourceIsT ? "en" : "tr");
      const result = await lookupTranslation(
        value.trim(),
        sourceIsT ? "tr-en" : "en-tr",
        { trToEn: TR_EN, enToTr: EN_TR },
      );
      setFetchingSide(null);
      if (result) {
        if (sourceIsT) setEn(result);
        else setTr(result);
      } else {
        setErr(
          "No automatic match for that word yet — type the meaning in yourself.",
        );
      }
    }, 600);
  };

  const handleTrChange = (v) => {
    setTr(v);
    setTrManual(true);
    scheduleLookup(v, true);
    if (!emojiManual) {
      const hit = EMOJI[v.trim().toLocaleLowerCase("tr-TR")];
      if (hit) setEmoji(hit);
    }
  };

  const handleEnChange = (v) => {
    setEn(v);
    setEnManual(true);
    scheduleLookup(v, false);
  };

  const handleSave = () => {
    if (!tr.trim() || !en.trim()) {
      setErr("Both the Turkish word and its meaning are needed.");
      return;
    }
    const w = {
      id: uid(),
      tr: tr.trim(),
      en: en.trim(),
      notes: notes.trim(),
      emoji: emoji.trim(),
      level: 0,
      nextReview: Date.now(),
      correct: 0,
      wrong: 0,
      createdAt: Date.now(),
    };
    updateWords([w, ...words]);
    setTr("");
    setEn("");
    setNotes("");
    setEmoji("");
    setEmojiManual(false);
    setTrManual(false);
    setEnManual(false);
    onAdded();
  };

  return (
    <div style={{ maxWidth: 480 }}>
      <div
        className="lale-display"
        style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}
      >
        Plant a new word
      </div>
      <div style={{ color: C.inkSoft, fontSize: 13.5, marginBottom: 18 }}>
        Type into either field — the other fills in automatically.
      </div>

      <Field
        label="Turkish word"
        hint={fetchingSide === "tr" ? "translating…" : null}
      >
        <div style={{ display: "flex", gap: 8 }}>
          <input
            value={tr}
            onChange={(e) => handleTrChange(e.target.value)}
            placeholder="e.g. merhaba"
            style={inputStyle}
          />
          {tr.trim() && (
            <button
              className="lale-btn"
              onClick={() => speak(tr.trim())}
              title="Hear pronunciation"
              style={{
                ...btnStyle(C.paperDeep, C.cobalt, false),
                padding: "0 12px",
              }}
            >
              <Volume2 size={16} />
            </button>
          )}
        </div>
      </Field>

      <div
        style={{ display: "flex", justifyContent: "center", margin: "2px 0" }}
      >
        <span style={{ fontSize: 11, color: C.inkSoft, letterSpacing: 1 }}>
          ⇅
        </span>
      </div>

      <Field
        label="Meaning (English)"
        hint={fetchingSide === "en" ? "translating…" : null}
      >
        <input
          value={en}
          onChange={(e) => handleEnChange(e.target.value)}
          placeholder="e.g. hello"
          style={inputStyle}
        />
      </Field>

      <Field label="Picture (emoji, optional)">
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            value={emoji}
            onChange={(e) => {
              setEmoji(e.target.value);
              setEmojiManual(true);
            }}
            placeholder="🙂 paste or type an emoji"
            style={{ ...inputStyle, width: 160 }}
          />
          {emoji && <span style={{ fontSize: 26 }}>{emoji}</span>}
        </div>
      </Field>

      <Field label="Notes (optional)">
        <input
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="example sentence, gender, root, etc."
          style={inputStyle}
        />
      </Field>

      {err && (
        <div style={{ color: C.coral, fontSize: 13, marginBottom: 10 }}>
          {err}
        </div>
      )}

      <button
        className="lale-btn"
        onClick={handleSave}
        style={{
          ...btnStyle(C.turquoise, "#04292A", false),
          width: "100%",
          marginTop: 6,
        }}
      >
        <Plus size={16} style={{ marginRight: 6, verticalAlign: -3 }} />
        Add to garden
      </button>
    </div>
  );
}
