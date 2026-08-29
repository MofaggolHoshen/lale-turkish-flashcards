import { useMemo, useState } from "react";
import { BookOpen, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";
import { C } from "../styles/theme";
import { grammarLevels } from "../data/grammar";

export function GrammarView() {
  const [selectedLevel, setSelectedLevel] = useState("A");
  const [selectedLesson, setSelectedLesson] = useState("a1-unit-1");

  const level = useMemo(
    () => grammarLevels.find((item) => item.id === selectedLevel) ?? grammarLevels[0],
    [selectedLevel],
  );

  const lesson = useMemo(
    () => level.lessons.find((item) => item.id === selectedLesson) ?? level.lessons[0],
    [level, selectedLesson],
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div>
          <div
            className="lale-display"
            style={{ fontSize: 24, fontWeight: 600, color: C.ink }}
          >
            Grammar path
          </div>
          <div style={{ fontSize: 13, color: C.inkSoft }}>
            Learn the building blocks of everyday Turkish.
          </div>
        </div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "#fff",
            border: `1px solid ${C.line}`,
            borderRadius: 999,
            padding: "6px 10px",
            color: C.cobalt,
            fontWeight: 700,
            fontSize: 12,
          }}
        >
          <Sparkles size={14} />
          Beginner friendly
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 12,
        }}
      >
        {grammarLevels.map((item) => {
          const active = item.id === selectedLevel;
          return (
            <button
              key={item.id}
              onClick={() => {
                setSelectedLevel(item.id);
                setSelectedLesson(item.lessons[0].id);
              }}
              style={{
                textAlign: "left",
                border: active ? `2px solid ${C.cobalt}` : `1px solid ${C.line}`,
                background: active ? "#EAF5F4" : "#fff",
                borderRadius: 12,
                padding: "16px 14px",
                cursor: "pointer",
                color: C.ink,
                boxShadow: active ? "0 8px 18px rgba(15, 76, 92, 0.08)" : "none",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  background: active ? C.cobalt : C.paperDeep,
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: 13,
                  marginBottom: 10,
                }}
              >
                {item.label}
              </div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
                {item.title}
              </div>
              <div style={{ fontSize: 12.5, color: C.inkSoft }}>{item.subtitle}</div>
              <div
                style={{
                  marginTop: 10,
                  color: C.cobalt,
                  fontWeight: 700,
                  fontSize: 12,
                }}
              >
                {item.lessons.length} lesson{item.lessons.length === 1 ? "" : "s"}
              </div>
            </button>
          );
        })}
      </div>

      <div
        style={{
          background: "#fff",
          border: `1px solid ${C.line}`,
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            background: `linear-gradient(120deg, ${C.cobalt}, ${C.cobaltDeep})`,
            color: "#fff",
            padding: "18px 20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <BookOpen size={18} />
            <span style={{ fontWeight: 700, fontSize: 15 }}>{level.title}</span>
          </div>
        </div>

        <div style={{ padding: 18 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
            {level.lessons.map((item) => {
              const isSelected = item.id === lesson.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedLesson(item.id)}
                  style={{
                    border: isSelected ? `1.5px solid ${C.cobalt}` : `1px solid ${C.line}`,
                    background: isSelected ? "#F2FBFA" : "#fff",
                    borderRadius: 10,
                    padding: "12px 14px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    textAlign: "left",
                    width: "100%",
                    cursor: "pointer",
                    color: C.ink,
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{item.title}</div>
                    <div style={{ fontSize: 12.3, color: C.inkSoft, marginTop: 3 }}>
                      {item.summary}
                    </div>
                  </div>
                  <ChevronRight size={18} color={C.inkSoft} />
                </button>
              );
            })}
          </div>

          <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <CheckCircle2 size={18} color={C.turquoise} />
              <span className="lale-display" style={{ fontSize: 20, fontWeight: 600 }}>
                {lesson.title}
              </span>
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
                  <div style={{ color: C.inkSoft, fontSize: 13.5, lineHeight: 1.6, marginBottom: 12 }}>
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
                      <ul style={{ margin: 0, paddingLeft: 18, color: C.inkSoft, fontSize: 12.8, lineHeight: 1.8 }}>
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
              <ul style={{ margin: 0, paddingLeft: 18, color: C.inkSoft, fontSize: 13, lineHeight: 1.9 }}>
                {lesson.practice.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
