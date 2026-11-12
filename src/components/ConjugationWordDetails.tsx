import {
  type ConjugationWord,
  type PersonForms,
} from "../data/conjugations";
import { C } from "../styles/theme";

export function formatConjugationMeaning(word: ConjugationWord): string {
  const english = word.englishMeaning ?? "English meaning not yet available";
  return `${english} (${word.bengaliMeaning})`;
}

function FormsTable({
  title,
  forms,
  partial = false,
}: {
  title: string;
  forms: PersonForms[];
  partial?: boolean;
}) {
  return (
    <section
      style={{
        background: "#fff",
        border: `1px solid ${C.line}`,
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "13px 16px",
          background: C.paperDeep,
          borderBottom: `1px solid ${C.line}`,
          fontWeight: 800,
          color: C.cobalt,
        }}
      >
        {title}
      </div>
      {partial && (
        <p style={{ margin: "12px 16px 0", color: C.inkSoft, fontSize: 12.5 }}>
          The source includes only the Ben forms for this word.
        </p>
      )}
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            minWidth: 680,
            borderCollapse: "collapse",
            fontSize: 13,
            textAlign: "left",
          }}
        >
          <thead>
            <tr>
              {["Person", "Positive", "Negative", "Question", "Negative question"].map(
                (heading) => (
                  <th
                    key={heading}
                    scope="col"
                    style={{
                      padding: "10px 12px",
                      color: C.inkSoft,
                      borderBottom: `1px solid ${C.line}`,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {heading}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {forms.map((row) => (
              <tr key={row.person}>
                <th
                  scope="row"
                  style={{
                    padding: "10px 12px",
                    borderBottom: `1px solid ${C.line}`,
                    color: C.cobalt,
                    whiteSpace: "nowrap",
                  }}
                >
                  {row.person}
                </th>
                {[row.positive, row.negative, row.question, row.negativeQuestion].map(
                  (form, index) => (
                    <td
                      key={`${row.person}-${index}`}
                      style={{
                        padding: "10px 12px",
                        borderBottom: `1px solid ${C.line}`,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {form}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function ConjugationWordDetails({ word }: { word: ConjugationWord }) {
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div>
        <div
          className="lale-display"
          style={{ color: C.cobalt, fontSize: 22, fontWeight: 600 }}
        >
          {word.lemma}
        </div>
        <div style={{ color: C.inkSoft, fontSize: 14 }}>
          {formatConjugationMeaning(word)} ·{" "}
          <span style={{ textTransform: "capitalize" }}>{word.partOfSpeech}</span>
        </div>
      </div>

      {word.tenses.map((tense) => (
        <FormsTable key={tense.id} title={tense.label} forms={tense.persons} />
      ))}
      {word.nominalForms.length > 0 && (
        <FormsTable
          title="Nominal forms"
          forms={word.nominalForms}
          partial={word.nominalForms.length < 6}
        />
      )}
      {word.tenses.length === 0 && word.nominalForms.length === 0 && (
        <p style={{ color: C.inkSoft }}>No forms are available for this word yet.</p>
      )}
    </section>
  );
}
