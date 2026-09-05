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
        title: "Unit 1 – Greetings, the alphabet, and demonstratives",
        summary:
          "Build the first Turkish grammar patterns: the alphabet, nationality, formal identification, bu-şu-o, kim/ne, plurals, yes/no questions, and place questions.",
        sections: [
          {
            title: "1) The Turkish alphabet",
            description:
              "Turkish has 29 letters: 8 vowels and 21 consonants. Vowels are grouped as back vowels (a, ı, o, u) and front vowels (e, i, ö, ü).",
            examples: [
              { tr: "A a, B b, C c, Ç ç", en: "A, B, C, Ç" },
              { tr: "I ı, İ i", en: "Two different Turkish vowels" },
              {
                tr: "Ö ö, Ş ş, Ü ü",
                en: "Letters that are special to Turkish",
              },
              { tr: "a, ı, o, u", en: "Back vowels" },
              { tr: "e, i, ö, ü", en: "Front vowels" },
            ],
            tips: [
              "I (ı) and İ (i) are different letters and have different sounds.",
              "Ğ is called yumuşak ge (soft g) and does not behave like an English g.",
            ],
          },
          {
            title: "2) Demonstrative words: Bu, Şu, O",
            description:
              "These words point to people and things. Bu is near the speaker, Şu points to something at a distance, and O points to something farther away.",
            examples: [
              { tr: "Bu masa.", en: "This is a table." },
              { tr: "Bu çanta.", en: "This is a bag." },
              { tr: "Bu kalem.", en: "This is a pen." },
              { tr: "Şu masa.", en: "That is a table." },
              { tr: "Şu bilgisayar.", en: "That is a computer." },
              { tr: "O pencere.", en: "That is a window." },
              { tr: "O masa.", en: "That is a table over there." },
              { tr: "Bu kim?", en: "Who is this?" },
              { tr: "Bu öğretmen.", en: "This is a teacher." },
              { tr: "O kim?", en: "Who is that?" },
              { tr: "O doktor.", en: "That is a doctor." },
              { tr: "Bu ne?", en: "What is this?" },
              { tr: "Bu kalem.", en: "This is a pen." },
              { tr: "Şu ne?", en: "What is that?" },
              { tr: "Şu köpek.", en: "That is a dog." },
              { tr: "Bu dolap.", en: "This is a cupboard." },
              { tr: "O öğrenci.", en: "That is a student." },
              { tr: "Şu defter.", en: "That is a notebook." },
            ],
            tips: [
              "Use Kim? for who and Ne? for what.",
              "The answer to these questions is usually a noun.",
            ],
          },
          {
            title: "3) Location words: Burası, Şurası, Orası",
            description:
              "These words point to places and are used just like 'this place' and 'that place' in English.",
            examples: [
              { tr: "Burası neresi?", en: "Where is this place?" },
              { tr: "Burası sınıf.", en: "This is a classroom." },
              { tr: "Burası ev.", en: "This is a house." },
              { tr: "Şurası neresi?", en: "Where is that place?" },
              { tr: "Şurası bahçe.", en: "That is a garden." },
              { tr: "Şurası okul.", en: "That is a school." },
              { tr: "Orası neresi?", en: "Where is that place?" },
              { tr: "Orası sokak.", en: "That is a street." },
              { tr: "Orası İstanbul.", en: "That is Istanbul." },
              { tr: "Burası hastane.", en: "This is a hospital." },
              { tr: "Şurası market.", en: "That is a market." },
              { tr: "Orası Ankara.", en: "That is Ankara." },
            ],
            tips: [
              "Neresi? means 'where is it?' or 'which place is it?'",
              "Burası = this place, Şurası = that place near you, Orası = that place farther away.",
            ],
          },
          {
            title: "4) Plural suffix: -lar / -ler",
            description:
              "Turkish uses vowel harmony to choose the plural suffix. If the last vowel is a, ı, o, u, use -lar. If it is e, i, ö, ü, use -ler.",
            examples: [
              { tr: "Kitap → Kitaplar", en: "Book → books" },
              { tr: "Masa → Masalar", en: "Table → tables" },
              { tr: "Kutu → Kutular", en: "Box → boxes" },
              { tr: "Öğrenci → Öğrenciler", en: "Student → students" },
              { tr: "Kedi → Kediler", en: "Cat → cats" },
              { tr: "Pencere → Pencereler", en: "Window → windows" },
              { tr: "Bunlar çok güzel.", en: "These are very nice." },
              { tr: "Bunlar köpek.", en: "These are dogs." },
              { tr: "Şunlar öğrenci.", en: "Those are students." },
              { tr: "Onlar kitap.", en: "Those are books." },
              { tr: "Saat → Saatler", en: "Clock → clocks" },
              { tr: "Rol → Roller", en: "Role → roles" },
            ],
            tips: [
              "Numbers and quantity words usually do not take the plural suffix.",
              "Correct: Üç çocuk. / İki kalem.",
              "Bunlar, Şunlar, and Onlar already show plurality. The noun after them usually stays singular: Bunlar köpek, Şunlar öğrenci, Onlar kitap.",
              "Bunlar means 'these' near the speaker, Şunlar means 'those' a little farther away, and Onlar means 'those/they' farther away or people.",
              "Foreign words that ends with a,o,u usually take -ler, e.g Rol → Roller, saat → saatler.",
            ],
          },
          {
            title: "5) Question suffix: mı / mi / mu / mü",
            description:
              "This suffix turns a statement into a yes/no question. It follows the last vowel of the word, not the last letter.",
            examples: [
              { tr: "Masa → Bu masa mı?", en: "Is this a table?" },
              { tr: "Ev → Burası ev mi?", en: "Is this a house?" },
              { tr: "Doktor → Bu doktor mu?", en: "Is this a doctor?" },
              { tr: "Gözlük → O gözlük mü?", en: "Is that glasses?" },
              { tr: "Bu masa mı?", en: "Is this a table?" },
              { tr: "Burası sınıf mı?", en: "Is this a classroom?" },
              { tr: "O öğretmen mi?", en: "Is that a teacher?" },
              { tr: "Şu kedi mi?", en: "Is that a cat?" },
              { tr: "Şu kutu mu?", en: "Is that a box?" },
              { tr: "Bu şoför mü?", en: "Is this a driver?" },
              { tr: "Evet, dolap.", en: "Yes, it is a cupboard." },
              { tr: "Hayır, dolap değil.", en: "No, it is not a cupboard." },
              { tr: "Evet, köpek.", en: "Yes, they are dogs." },
              {
                tr: "Hayır, köpek değil, kedi.",
                en: "No, they are not dogs; they are cats.",
              },
              { tr: "Evet, burası ev.", en: "Yes, this is a house." },
              {
                tr: "Hayır, burası ev değil, okul.",
                en: "No, this is not a house; it is a school.",
              },
            ],
            tips: ["a / ı → mı", "e / i → mi", "o / u → mu", "ö / ü → mü"],
          },
          {
            title: "6) Saying where you are from: -lı / -li / -lu / -lü",
            description:
              "Add -lı, -li, -lu, or -lü to a country or place name to describe nationality or origin. For 'I am from ...', use the matching personal ending: -lıyım, -liyim, -luyum, or -lüyüm.",
            examples: [
              { tr: "Nerelisin?", en: "Where are you from?" },
              {
                tr: "Ben Bangladeşliyim.",
                en: "I am Bangladeshi / from Bangladesh.",
              },
              { tr: "Ben Mısırlıyım.", en: "I am Egyptian / from Egypt." },
              { tr: "Ben Nijeryalıyım.", en: "I am Nigerian / from Nigeria." },
              { tr: "Ben Türkiyeliyim.", en: "I am Turkish / from Türkiye." },
            ],
            tips: [
              "Look at the last vowel: a/ı → -lı, e/i → -li, o/u → -lu, ö/ü → -lü.",
              "The personal ending makes the sentence 'I am from ...': Bangladeş-li-yim, Mısır-lı-yım.",
            ],
          },
          {
            title: "7) Formal identification: -dır / -dir / -dur / -dür",
            description:
              "The formal copula makes an identification more explicit or certain. Choose D or T by the final consonant, then choose the vowel by vowel harmony. In everyday speech, the ending is often omitted.",
            examples: [
              {
                tr: "Bu nedir? Bu dolaptır.",
                en: "What is this? This is a cupboard.",
              },
              {
                tr: "Bu kimdir? Bu öğretmendir.",
                en: "Who is this? This is a teacher.",
              },
              { tr: "Bu kitaptır.", en: "This is a book." },
              { tr: "Bu öğrencidir.", en: "This is a student." },
              { tr: "Bu otobüstür.", en: "This is a bus." },
            ],
            tips: [
              "After f, s, t, k, ç, ş, h, p (Fıstıkçı Şahap), use T: kitap → kitaptır.",
              "Use D after other final consonants: öğretmen → öğretmendir. Vowel harmony: a/ı, e/i, o/u, ö/ü.",
            ],
          },
        ],
        practice: [
          "Bu ne?",
          "O kim?",
          "Burası neresi?",
          "Bu masa mı?",
          "O öğrenci mi?",
          "Bunlar defter mi?",
          "Nerelisin? Ben Bangladeşliyim.",
          "Bu nedir? Bu kitaptır.",
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
          {
            prompt: "Which sentence means 'I am from Bangladesh'?",
            options: [
              "Ben Bangladeşliyim.",
              "Ben Bangladeşluyum.",
              "Ben Bangladeşlıyım.",
              "Ben Bangladeşlüyüm.",
            ],
            answer: "Ben Bangladeşliyim.",
            explanation: "The last vowel in Bangladeş is e, so use -liyim.",
          },
          {
            prompt: "Which formal form is correct for kitap?",
            options: ["kitapdır", "kitaptır", "kitabdır", "kitaptir"],
            answer: "kitaptır",
            explanation:
              "Kitap ends in p, one of the Fıstıkçı Şahap consonants, so use T; a gives -tır.",
          },
        ],
      },
      {
        id: "a1-unit-2",
        title: "Unit 2 – Location, numbers, and nominal sentences",
        summary:
          "Say where people and things are, use var and yok, ask about quantities and floors, and build positive, negative, and question sentences.",
        sections: [
          {
            title: "1) Locative case: -DA",
            description:
              "The locative ending tells where someone or something is. Choose -da/-de by vowel harmony, and -ta/-te after voiceless consonants such as ç, f, h, k, p, s, ş, and t.",
            examples: [
              {
                tr: "Öğrenciler sınıfta.",
                en: "The students are in the classroom.",
              },
              { tr: "Bilgisayar masada.", en: "The computer is on the table." },
              { tr: "Çanta Ahmet'te.", en: "The bag is with Ahmet." },
              { tr: "Taksim İstanbul'da.", en: "Taksim is in Istanbul." },
            ],
            tips: [
              "Use Nerede? for a place and Kimde? for the person who has something.",
              "Examples: okulda, evde, sınıfta, markette.",
            ],
          },
          {
            title: "2) Var and yok",
            description:
              "Var means there is/are or have; yok means there is/are not or do not have. Both commonly follow a location phrase.",
            examples: [
              {
                tr: "Evde bilgisayar var.",
                en: "There is a computer at home.",
              },
              {
                tr: "Ofiste sekreter yok.",
                en: "There is no secretary in the office.",
              },
              { tr: "Sınıfta kimler var?", en: "Who is in the classroom?" },
              {
                tr: "Masada kitap var mı?",
                en: "Is there a book on the table?",
              },
            ],
            tips: [
              "Use var mı? and yok for yes/no questions and negative answers.",
              "With a person, Kimde? asks who has something: Kalem kimde?",
            ],
          },
          {
            title: "3) Numbers and ordinals",
            description:
              "Use numbers for quantities, ages, prices, dates, and phone numbers. Add -(I)ncI to make an ordinal such as first, second, or eighth.",
            examples: [
              {
                tr: "Sınıfta on beş öğrenci var.",
                en: "There are fifteen students in the classroom.",
              },
              {
                tr: "Yirmi dört yaşındayım.",
                en: "I am twenty-four years old.",
              },
              { tr: "Bir çay bir lira.", en: "A tea is one lira." },
              {
                tr: "Evim birinci katta.",
                en: "My home is on the first floor.",
              },
              {
                tr: "Okul sekizinci sokakta.",
                en: "The school is on the eighth street.",
              },
            ],
            tips: [
              "After a number, the noun stays singular: üç çocuk, iki kalem.",
              "Common ordinal forms include birinci, ikinci, üçüncü, and sekizinci.",
            ],
          },
          {
            title: "4) Nominal sentences",
            description:
              "Turkish nominal sentences use personal endings in the present tense. The negative uses değil plus the personal ending, and the question particle follows the noun or adjective.",
            examples: [
              { tr: "Ben öğretmenim.", en: "I am a teacher." },
              { tr: "Sen öğrencisin.", en: "You are a student." },
              { tr: "O doktor.", en: "He/She is a doctor." },
              { tr: "Biz yorgunuz.", en: "We are tired." },
              { tr: "Siz öğretmen misiniz?", en: "Are you a teacher?" },
              { tr: "Ben doktor değilim.", en: "I am not a doctor." },
            ],
            tips: [
              "Present-tense personal endings: -im, -sin, no ending, -iz, -siniz.",
              "For third-person plural, use onlar öğretmen or onlar öğretmenler; the plural ending is optional when the subject is clear.",
            ],
          },
        ],
        practice: [
          "Sınıfta kimler var?",
          "Kitap masada mı?",
          "Evde bilgisayar var mı?",
          "Telefon numaran kaç?",
          "Evin kaçıncı katta?",
          "Ben öğrenci değilim.",
        ],
        quiz: [
          {
            prompt: "Which sentence means 'The computer is on the table'?",
            options: [
              "Bilgisayar masada.",
              "Bilgisayar masaya.",
              "Bilgisayar masadan.",
              "Bilgisayar masa.",
            ],
            answer: "Bilgisayar masada.",
            explanation: "The locative ending -da means 'in/on/at' a place.",
          },
          {
            prompt:
              "Which sentence says that there is no secretary in the office?",
            options: [
              "Ofiste sekreter var.",
              "Ofiste sekreter yok.",
              "Sekreter ofise.",
              "Sekreter ofisten.",
            ],
            answer: "Ofiste sekreter yok.",
            explanation: "Yok means there is not or there are not.",
          },
          {
            prompt: "Which sentence uses the ordinal 'first' correctly?",
            options: [
              "Evim bir katta.",
              "Evim birinci katta.",
              "Evim birler katta.",
              "Evim birde katta.",
            ],
            answer: "Evim birinci katta.",
            explanation: "Birinci means first and katta means on the floor.",
          },
          {
            prompt: "How do you say 'Are you a teacher?' in Turkish?",
            options: [
              "Siz öğretmensiniz?",
              "Siz öğretmen misiniz?",
              "Siz öğretmen değil misiniz.",
              "Siz öğretmenim mi?",
            ],
            answer: "Siz öğretmen misiniz?",
            explanation:
              "For a nominal yes/no question, add mı/mi/mu/mü after the noun and use the personal ending.",
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
