import { CheckCircle2 } from "lucide-react";

import type { GrammarLesson } from "../../data/grammar";
import { C } from "../../styles/theme";

type GrammarLessonContentProps = {
  lesson: GrammarLesson;
  completedLessons: Record<string, boolean>;
  onMarkLessonComplete: () => void;
};

export function GrammarLessonContent({
  lesson,
  completedLessons,
  onMarkLessonComplete,
}: GrammarLessonContentProps) {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 12,
          flexWrap: "wrap",
        }}
      >
        <CheckCircle2 size={18} color={C.turquoise} />
        <span className="lale-display" style={{ fontSize: 20, fontWeight: 600 }}>
          {lesson.title}
        </span>
        <button
          type="button"
          onClick={onMarkLessonComplete}
          style={{
            marginLeft: "auto",
            border: "none",
            background: completedLessons[lesson.id] ? "#EAF7EF" : C.cobalt,
            color: completedLessons[lesson.id] ? "#1D7A4E" : "#fff",
            borderRadius: 999,
            padding: "8px 12px",
            fontWeight: 700,
            fontSize: 12,
            cursor: "pointer",
          }}
        >
          {completedLessons[lesson.id] ? "Completed" : "Mark lesson complete"}
        </button>
      </div>

      <div style={{ color: C.inkSoft, fontSize: 13.5, marginBottom: 18 }}>
        {lesson.summary}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {lesson.sections.map((section) => (
          <section
            key={section.title}
            style={{
              background: C.paperDeep,
              border: `1px solid ${C.line}`,
              borderRadius: 12,
              padding: 16,
            }}
          >
            <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 8 }}>{section.title}</div>
            <div
              style={{
                color: C.inkSoft,
                fontSize: 13.5,
                lineHeight: 1.6,
                marginBottom: 12,
              }}
            >
              {section.description}
            </div>

            <div style={{ display: "grid", gap: 8 }}>
              {section.examples.map((example) => (
                <div
                  key={`${section.title}-${example.tr}`}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 12,
                    background: "#fff",
                    border: `1px solid ${C.line}`,
                    borderRadius: 8,
                    padding: "9px 10px",
                    flexWrap: "wrap",
                  }}
                >
                  <span style={{ fontWeight: 700, color: C.cobalt }}>{example.tr}</span>
                  <span style={{ color: C.inkSoft }}>{example.en}</span>
                </div>
              ))}
            </div>

            {section.tips && (
              <div style={{ marginTop: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 12.5, marginBottom: 6 }}>Quick tip</div>
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: 18,
                    color: C.inkSoft,
                    fontSize: 12.8,
                    lineHeight: 1.8,
                  }}
                >
                  {section.tips.map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        ))}
      </div>

      <div
        style={{
          marginTop: 22,
          background: "#F7F5EF",
          border: `1px solid ${C.line}`,
          borderRadius: 12,
          padding: 14,
        }}
      >
        <div style={{ fontWeight: 800, fontSize: 13.5, marginBottom: 8 }}>Practice</div>
        <ul
          style={{
            margin: 0,
            paddingLeft: 18,
            color: C.inkSoft,
            fontSize: 13,
            lineHeight: 1.9,
          }}
        >
          {lesson.practice.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
