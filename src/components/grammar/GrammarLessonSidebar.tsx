import { ChevronRight } from "lucide-react";

import type { GrammarLesson } from "../../data/grammar";
import { C } from "../../styles/theme";

type GrammarLessonSidebarProps = {
  lessons: GrammarLesson[];
  selectedLesson: string;
  onSelectLesson: (lessonId: string) => void;
};

export function GrammarLessonSidebar({
  lessons,
  selectedLesson,
  onSelectLesson,
}: GrammarLessonSidebarProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
      {lessons.map((item) => {
        const isSelected = item.id === selectedLesson;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelectLesson(item.id)}
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
  );
}
