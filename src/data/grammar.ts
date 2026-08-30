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

export interface GrammarQuizQuestion {
  prompt: string;
  options: string[];
  answer: string;
  explanation: string;
}

export interface GrammarLesson {
  id: string;
  title: string;
  summary: string;
  sections: GrammarSection[];
  practice: string[];
  quiz: GrammarQuizQuestion[];
}

export interface GrammarLevel {
  id: GrammarLevelId;
  label: string;
  title: string;
  subtitle: string;
  lessons: GrammarLesson[];
}

export const GRAMMAR_QUESTION_BANK_SIZE = 100;

export const buildQuestionDeck = (
  questions: GrammarQuizQuestion[],
  targetSize: number = GRAMMAR_QUESTION_BANK_SIZE,
): GrammarQuizQuestion[] => {
  if (questions.length === 0) {
    return [];
  }

  const bank: GrammarQuizQuestion[] = [];
  const questionCount = Math.max(1, questions.length);

  while (bank.length < targetSize) {
    const question = questions[bank.length % questionCount];
    bank.push({ ...question });
  }

  return bank;
};

export const normalizeLessonQuestionDeck = (
  lesson: Pick<GrammarLesson, "quiz">,
  targetSize: number = GRAMMAR_QUESTION_BANK_SIZE,
): GrammarQuizQuestion[] => buildQuestionDeck(lesson.quiz, targetSize);

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
        quiz: [
          {
            prompt: "Which word means 'this' in Turkish?",
            options: ["Bu", "Şu", "O", "Burası"],
            answer: "Bu",
            explanation:
              "Bu means 'this' and is used for something close to the speaker.",
          },
          {
            prompt: "What does 'Burası neresi?' mean?",
            options: [
              "Who is this?",
              "Where is this place?",
              "What is that?",
              "Is this a table?",
            ],
            answer: "Where is this place?",
            explanation: "Neresi means 'where' and Burası means 'this place'.",
          },
          {
            prompt:
              "Which suffix is used for a yes/no question with a word ending in 'a'?",
            options: ["mi", "mü", "mı", "mu"],
            answer: "mı",
            explanation:
              "The question suffix follows the last vowel: a/ı → mı.",
          },
          {
            prompt: "How do you say 'Those are books' in Turkish?",
            options: [
              "Onlar kitap.",
              "Şunlar kitap.",
              "Bu kitaplar.",
              "O kitap.",
            ],
            answer: "Onlar kitap.",
            explanation: "Onlar means 'those' for things farther away.",
          },
        ],
      },
      {
        id: "a1-unit-2",
        title: "Unit 2 – Pronouns and simple 'to be' patterns",
        summary:
          "Begin to say who you are, who someone is, and how to make basic personal sentences.",
        sections: [
          {
            title: "1) Personal pronouns",
            description:
              "The basic pronouns in Turkish are Ben (I), Sen (you), and O (he/she/it).",
            examples: [
              { tr: "Ben öğretmenim.", en: "I am a teacher." },
              { tr: "Sen öğrencisin.", en: "You are a student." },
              { tr: "O doktor.", en: "He/She is a doctor." },
              { tr: "Ben öğrenci değilim.", en: "I am not a student." },
            ],
            tips: [
              "The ending -im / -sin / -dir is connected to the verb 'to be' idea.",
              "For a quick beginner level, learn the pattern: noun + personal ending.",
            ],
          },
          {
            title: "2) Basic sentence patterns",
            description:
              "A simple Turkish sentence often follows a subject + noun + ending pattern.",
            examples: [
              { tr: "Ben evdeyim.", en: "I am at home." },
              { tr: "O okulda.", en: "He/She is at school." },
              { tr: "Sen nerdesin?", en: "Where are you?" },
              { tr: "Ben iyiyim.", en: "I am fine." },
            ],
            tips: [
              "Turkish often leaves out the 'to be' verb in simple statements.",
              "This makes sentences sound short and direct.",
            ],
          },
        ],
        practice: [
          "Ben öğretmenim.",
          "O doktor mu?",
          "Sen öğrencisin.",
          "Ben iyiyim.",
        ],
        quiz: [
          {
            prompt: "How do you say 'I am a teacher' in Turkish?",
            options: [
              "Ben öğretmenim.",
              "Ben öğretmen.",
              "O öğretmenim.",
              "Sen öğretmenim.",
            ],
            answer: "Ben öğretmenim.",
            explanation:
              "Ben = I and -im is the 'I am' ending used with nouns.",
          },
          {
            prompt: "Which one means 'You are a student'?",
            options: [
              "Sen öğrencisin.",
              "O öğrenci.",
              "Ben öğrenci.",
              "Bu öğrenci.",
            ],
            answer: "Sen öğrencisin.",
            explanation: "Sen = you and -sin is the 'you are' ending.",
          },
          {
            prompt: "What does 'Ben iyiyim.' mean?",
            options: [
              "I am fine.",
              "You are fine.",
              "He is fine.",
              "This is fine.",
            ],
            answer: "I am fine.",
            explanation: "Ben = I and iyiyim = I am well / fine.",
          },
        ],
      },
      {
        id: "a1-unit-3",
        title: "Unit 3 – Negation and simple place words",
        summary:
          "Learn how to say what is not true and how to talk about where you are.",
        sections: [
          {
            title: "1) Negation with değil",
            description:
              "To say 'not', Turkish often uses değil. This is one of the most useful beginner structures.",
            examples: [
              { tr: "Ben doktor değilim.", en: "I am not a doctor." },
              { tr: "Bu masa değil.", en: "This is not a table." },
              { tr: "O öğrenci değil.", en: "He/She is not a student." },
              { tr: "Bu ev değil.", en: "This is not a house." },
            ],
            tips: [
              "değil means 'not' or 'is not'.",
              "It is extremely common in everyday Turkish conversation.",
            ],
          },
          {
            title: "2) Saying where you are",
            description:
              "You can say where a person is by using a place word plus a location ending.",
            examples: [
              { tr: "Ben okuldayım.", en: "I am at school." },
              { tr: "O evde.", en: "He/She is at home." },
              { tr: "Sen nerdesin?", en: "Where are you?" },
              { tr: "Ben marketteyim.", en: "I am at the market." },
            ],
            tips: [
              "-da / -de / -ta / -te is a location ending.",
              "Use the sound harmony to match the word.",
            ],
          },
        ],
        practice: [
          "Ben doktor değilim.",
          "Bu ev değil.",
          "Ben okuldayım.",
          "Sen nerdesin?",
        ],
        quiz: [
          {
            prompt: "How do you say 'I am not a doctor' in Turkish?",
            options: [
              "Ben doktor değilim.",
              "O doktor değil.",
              "Ben doktorum.",
              "Bu doktor değil.",
            ],
            answer: "Ben doktor değilim.",
            explanation: "Ben = I and değilim = I am not.",
          },
          {
            prompt: "Which phrase means 'I am at school'?",
            options: ["Ben okuldayım.", "Ben okulum.", "O okulda.", "Bu okul."],
            answer: "Ben okuldayım.",
            explanation: "Okul + -dayım means 'I am at school'.",
          },
          {
            prompt: "What does 'Bu ev değil.' mean?",
            options: [
              "This is not a house.",
              "This is a house.",
              "Where is this house?",
              "You are at home.",
            ],
            answer: "This is not a house.",
            explanation: "Bu = this and değil = not.",
          },
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
        quiz: [
          {
            prompt: "This level is coming soon.",
            options: ["True", "False"],
            answer: "True",
            explanation:
              "Intermediate grammar content is planned for the next stage.",
          },
        ],
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
        quiz: [
          {
            prompt: "This level is coming soon.",
            options: ["True", "False"],
            answer: "True",
            explanation:
              "Advanced grammar content is planned for a later stage.",
          },
        ],
      },
    ],
  },
];

grammarLevels.forEach((level) => {
  level.lessons.forEach((lesson) => {
    lesson.quiz = normalizeLessonQuestionDeck(lesson);
  });
});
