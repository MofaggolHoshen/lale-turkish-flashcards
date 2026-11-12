import { useEffect, useRef } from "react";
import { X } from "lucide-react";

import { findConjugationWord } from "../data/conjugations";
import { C } from "../styles/theme";
import { ConjugationWordDetails } from "./ConjugationWordDetails";

type WordConjugationModalProps = {
  lemma: string | null;
  onClose: () => void;
};

export function WordConjugationModal({
  lemma,
  onClose,
}: WordConjugationModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const word = lemma ? findConjugationWord(lemma) : undefined;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (lemma && dialog && !dialog.open) dialog.showModal();
  }, [lemma]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="word-conjugation-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          dialogRef.current?.close();
        }
      }}
      style={{
        width: "min(920px, calc(100vw - 32px))",
        maxHeight: "min(85vh, 900px)",
        padding: 18,
        border: `1px solid ${C.line}`,
        borderRadius: 14,
        background: C.paper,
        color: C.ink,
        boxSizing: "border-box",
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 14,
        }}
      >
        <h2
          id="word-conjugation-title"
          className="lale-display"
          style={{ margin: 0, color: C.cobalt, fontSize: 22, fontWeight: 600 }}
        >
          Conjugation
        </h2>
        <button
          type="button"
          aria-label="Close conjugation details"
          onClick={() => dialogRef.current?.close()}
          style={{
            display: "inline-flex",
            padding: 7,
            border: `1px solid ${C.line}`,
            borderRadius: 8,
            background: "#fff",
            color: C.inkSoft,
            cursor: "pointer",
          }}
        >
          <X size={18} />
        </button>
      </header>
      <div style={{ overflowY: "auto", maxHeight: "calc(85vh - 100px)" }}>
        {word ? (
          <ConjugationWordDetails word={word} />
        ) : (
          <div style={{ color: C.inkSoft, padding: "8px 0" }}>
            <strong style={{ color: C.cobalt }}>{lemma}</strong>
            <p style={{ margin: "8px 0 0" }}>
              No conjugation or word-form data is available for this word yet.
            </p>
          </div>
        )}
      </div>
    </dialog>
  );
}
