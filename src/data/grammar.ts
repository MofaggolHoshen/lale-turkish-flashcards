export type GrammarLevelId = "A" | "B" | "C";

export interface GrammarExample {
  tr: string;
  en: string;
}

export interface GrammarSection {
  title: string;
  description: string;
  examples: GrammarExample[];
  tips?: string[];
}

export interface GrammarLesson {
  id: string;
  title: string;
  summary: string;
  sections: GrammarSection[];
  practice: string[];
}

export interface GrammarLevel {
  id: GrammarLevelId;
  label: string;
  title: string;
  subtitle: string;
  lessons: GrammarLesson[];
}

export const grammarLevels: GrammarLevel[] = [
  {
    id: "A",
    label: "A",
    title: "A1 – Beginner",
    subtitle: "Foundations for basic everyday Turkish.",
    lessons: [
      {
        id: "a1-unit-1",
        title: "Unit 1 – Demonstratives, plurals, and yes/no questions",
        summary:
          "Learn how to point to things, ask who/what, explain places, and form simple questions.",
        sections: [
          {
            title: "1) Demonstrative words: Bu, Şu, O",
            description:
              "These words help you point to something or someone. Bu is close to me, Şu is closer to you, and O is farther away.",
            examples: [
              { tr: "Bu masa.", en: "This is a table." },
              { tr: "Bu kalem.", en: "This is a pen." },
              { tr: "Şu masa.", en: "That is a table." },
              { tr: "O pencere.", en: "That is a window." },
              { tr: "Bu kim?", en: "Who is this?" },
              { tr: "Bu öğretmen.", en: "This is a teacher." },
              { tr: "Bu ne?", en: "What is this?" },
              { tr: "Bu kalem.", en: "This is a pen." },
            ],
            tips: [
              "Use Kim? for who and Ne? for what.",
              "The answer to these questions is usually a noun.",
            ],
          },
          {
            title: "2) Location words: Burası, Şurası, Orası",
            description:
              "These words point to places and are used just like 'this place' and 'that place' in English.",
            examples: [
              { tr: "Burası neresi?", en: "Where is this place?" },
              { tr: "Burası sınıf.", en: "This is a classroom." },
              { tr: "Şurası neresi?", en: "Where is that place?" },
              { tr: "Şurası bahçe.", en: "That is a garden." },
              { tr: "Orası neresi?", en: "Where is that place?" },
              { tr: "Orası sokak.", en: "That is a street." },
            ],
            tips: [
              "Neresi? means 'where is it?' or 'which place is it?'",
              "Burası = this place, Şurası = that place near you, Orası = that place farther away.",
            ],
          },
          {
            title: "3) Plural suffix: -lar / -ler",
            description:
              "Turkish uses vowel harmony to choose the plural suffix. If the last vowel is a, ı, o, u, use -lar. If it is e, i, ö, ü, use -ler.",
            examples: [
              { tr: "Kitap → Kitaplar", en: "Book → books" },
              { tr: "Masa → Masalar", en: "Table → tables" },
              { tr: "Öğrenci → Öğrenciler", en: "Student → students" },
              { tr: "Kedi → Kediler", en: "Cat → cats" },
              { tr: "Bunlar çok güzel.", en: "These are very nice." },
              { tr: "Onlar kitap.", en: "Those are books." },
            ],
            tips: [
              "Numbers and quantity words usually do not take the plural suffix.",
              "Correct: Üç çocuk. / İki kalem.",
            ],
          },
          {
            title: "4) Question suffix: mı / mi / mu / mü",
            description:
              "This suffix turns a statement into a yes/no question. It follows the last vowel of the word, not the last letter.",
            examples: [
              { tr: "Masa → Bu masa mı?", en: "Is this a table?" },
              { tr: "Ev → Burası ev mi?", en: "Is this a house?" },
              { tr: "Doktor → Bu doktor mu?", en: "Is this a doctor?" },
              { tr: "Gözlük → O gözlük mü?", en: "Is that glasses?" },
              { tr: "Bu masa mı?", en: "Is this a table?" },
              { tr: "O öğretmen mi?", en: "Is that a teacher?" },
            ],
            tips: ["a / ı → mı", "e / i → mi", "o / u → mu", "ö / ü → mü"],
          },
        ],
        practice: [
          "Bu ne?",
          "O kim?",
          "Burası neresi?",
          "Bu masa mı?",
          "O öğrenci mi?",
          "Bunlar defter mi?",
        ],
      },
    ],
  },
  {
    id: "B",
    label: "B",
    title: "B1 – Intermediate",
    subtitle: "Sentence patterns, time, and everyday structure.",
    lessons: [
      {
        id: "b1-coming-soon",
        title: "Coming soon",
        summary: "More intermediate lessons will be added here next.",
        sections: [
          {
            title: "This level is being prepared",
            description:
              "We will build deeper sentence patterns, time expressions, negation, and common conversational structure here.",
            examples: [{ tr: "Yakında eklenecek.", en: "Coming soon." }],
          },
        ],
        practice: ["B level exercises will appear here."],
      },
    ],
  },
  {
    id: "C",
    label: "C",
    title: "C1 – Advanced",
    subtitle: "Flow, nuance, and more natural Turkish patterns.",
    lessons: [
      {
        id: "c1-coming-soon",
        title: "Coming soon",
        summary: "Advanced patterns will be added later for fluency building.",
        sections: [
          {
            title: "Advanced section is planned",
            description:
              "This level will focus on more natural phrasing, complex sentence flow, and confidence-rich speaking patterns.",
            examples: [
              {
                tr: "Bu bölüm hazırlanıyor.",
                en: "This section is being prepared.",
              },
            ],
          },
        ],
        practice: ["C level exercises will appear here."],
      },
    ],
  },
];
