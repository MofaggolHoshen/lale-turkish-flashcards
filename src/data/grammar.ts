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
            title: "1) Locative case: -DA / -DE / -TA / -TE",
            description:
              "The locative ending tells where someone or something is. Choose -da/-de by vowel harmony, and -ta/-te after voiceless consonants such as ç, f, h, k, p, s, ş, and t.",
            examples: [
              { tr: "Evdeyim.", en: "I am at home." },
              { tr: "Okulda ders var.", en: "There is a lesson at school." },
              { tr: "Bilgisayar masada.", en: "The computer is on the table." },
              {
                tr: "Sınıfta öğrenci yok.",
                en: "There is no student in the classroom.",
              },
              {
                tr: "Masa üzerinde kalem var.",
                en: "There is a pen on the table.",
              },
              { tr: "Taksim İstanbul'da.", en: "Taksim is in Istanbul." },
            ],
            tips: [
              "Use Nerede? for a place and Kimde? for the person who has something.",
              "Examples: okulda, evde, sınıfta, markette, masada.",
              "If the last vowel is a/ı/o/u, use -da/-ta; if it is e/i/ö/ü, use -de/-te.",
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
              { tr: "Cebimde para var.", en: "I have money in my pocket." },
              { tr: "Benim telefonum yok.", en: "I do not have a phone." },
            ],
            tips: [
              "Use var mı? and yok to ask and answer in the negative.",
              "With a person, Kimde? asks who has something: Kalem kimde?",
              "Yok is used for absence, while değil is used for a negative identity or description.",
            ],
          },
          {
            title: "3) Hayır, değil, and yok",
            description:
              "Hayır is a direct 'no'; değil means 'not' or 'is not'; yok means 'there is no' or 'there are none'. These three are closely related but used in different situations.",
            examples: [
              { tr: "Öğrenci misin?", en: "Are you a student?" },
              { tr: "Hayır, öğrenci değilim.", en: "No, I am not a student." },
              { tr: "Bu kalem kırmızı değil.", en: "This pen is not red." },
              { tr: "Evde ekmek yok.", en: "There is no bread at home." },
              {
                tr: "Sizde kırmızı kalem var mı?",
                en: "Do you have a red pen?",
              },
              { tr: "Hayır, kalem yok.", en: "No, there is no pen." },
            ],
            tips: [
              "Hayır is for direct negative answers.",
              "Değil is used for describing someone or something as not being a certain thing.",
              "Yok is used for absence or non-existence.",
            ],
          },
          {
            title: "4) Question patterns with location and possession",
            description:
              "The locative case and possession patterns often appear in questions. Use mı / mi / mu / mü for yes/no questions, and use apostrophes in names and place nouns before a vowel-starting suffix: İstanbul'da, Cenk'te.",
            examples: [
              {
                tr: "Bilgisayar masada mı?",
                en: "Is the computer on the table?",
              },
              { tr: "Evde misin?", en: "Are you at home?" },
              { tr: "İstanbul'da mısın?", en: "Are you in Istanbul?" },
              { tr: "Kırmızı kalem var mı?", en: "Do you have a red pen?" },
              {
                tr: "Hayır, masada değil.",
                en: "No, it is not on the table.",
              },
              {
                tr: "Cenk'te mi?",
                en: "Is it at Cenk's place?",
              },
            ],
            tips: [
              "Use vowel harmony to choose the question suffix: a/ı/o/u → mı / mu, e/i/ö/ü → mi / mü.",
              "Apostrophes appear before suffixes beginning with a vowel after a final consonant: Cenk'te, İstanbul'da.",
              "Negatives can be answered with either Hayır + değil or Hayır + yok, depending on whether you mean 'not X' or 'there is none'.",
            ],
          },
          {
            title: "5) Numbers and quantity questions",
            description:
              "Use numbers for quantities, ages, prices, dates, and phone numbers. Ask Kaç? or Kaç tane? to ask how many or how much.",
            examples: [
              {
                tr: "Bir, iki, üç, dört, beş.",
                en: "One, two, three, four, five.",
              },
              { tr: "On beş öğrenci var.", en: "There are fifteen students." },
              { tr: "Kaç kitap var?", en: "How many books are there?" },
              {
                tr: "Kaç tane ekmek var?",
                en: "How many loaves of bread are there?",
              },
              { tr: "Kaç lira?", en: "How much money?" },
              {
                tr: "Yirmi dört yaşındayım.",
                en: "I am twenty-four years old.",
              },
            ],
            tips: [
              "After a number, the noun usually stays singular: üç çocuk, iki kalem.",
              "Common numbers: on, yirmi, otuz, kırk, elli, altmış, yetmiş, seksen, doksan, yüz.",
            ],
          },
          {
            title: "6) Kaçıncı? and ordinal numbers",
            description:
              "Kaçıncı? asks which in order. Ordinals like birinci, ikinci, and üçüncü are used for floors, positions, and rankings.",
            examples: [
              { tr: "Bu kaçıncı katta?", en: "Which floor is this on?" },
              {
                tr: "Evim ikinci katta.",
                en: "My home is on the second floor.",
              },
              { tr: "Ben üçüncü sıradayım.", en: "I am in third place." },
              { tr: "Sen kaçıncı sınıftasın?", en: "What grade are you in?" },
              { tr: "Bu dördüncü kitap.", en: "This is the fourth book." },
              {
                tr: "O sekizinci sokakta.",
                en: "He/She is on the eighth street.",
              },
            ],
            tips: [
              "Kaçıncı? = which one / what position?",
              "Common ordinals: birinci, ikinci, üçüncü, dördüncü, beşinci, altıncı, yedinci, sekizinci.",
            ],
          },
          {
            title: "7) Nominal sentences",
            description:
              "Turkish nominal sentences often omit the verb 'to be' in the present tense. Use personal endings to match the subject, and add değil for negative statements.",
            examples: [
              { tr: "Ben öğrenciyim.", en: "I am a student." },
              { tr: "Sen öğretmensin.", en: "You are a teacher." },
              { tr: "O doktor.", en: "He/She is a doctor." },
              { tr: "Biz yorgunuz.", en: "We are tired." },
              { tr: "Siz öğretmen misiniz?", en: "Are you a teacher?" },
              { tr: "Ben doktor değilim.", en: "I am not a doctor." },
            ],
            tips: [
              "Present-tense personal endings: -im, -sin, no ending, -iz, -siniz.",
              "A sentence like O evde is common in beginner Turkish: 'He/She is at home.'",
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
          "Bu kahve ne kadar?",
          "Nerede oturuyorsun?",
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
          {
            prompt: "Which phrase means 'No, I am not a student'?",
            options: [
              "Hayır, öğrenci değilim.",
              "Evet, öğrenci değilim.",
              "Hayır, öğrenci var.",
              "Öğrenci değilim mi?",
            ],
            answer: "Hayır, öğrenci değilim.",
            explanation:
              "Hayır answers the question negatively, and değilim means 'I am not'.",
          },
          {
            prompt: "What does Kaçıncı? mean?",
            options: [
              "Where is it?",
              "How much?",
              "Which one / what position?",
              "Who is there?",
            ],
            answer: "Which one / what position?",
            explanation:
              "Kaçıncı? asks which one in order, such as first, second, or third.",
          },
          {
            prompt: "Which sentence means 'There is no bread at home'?",
            options: [
              "Evde ekmek yok.",
              "Evde ekmek var.",
              "Ekmek evde mi?",
              "Hayır, ekmek var.",
            ],
            answer: "Evde ekmek yok.",
            explanation:
              "Yok means the thing is absent or there is none, so it fits a negative statement about existence.",
          },
        ],
      },
      {
        id: "a1-unit-3",
        title: "Unit 3 – Daily actions, direction, and wants",
        summary:
          "Talk about actions happening now with the present continuous, use the dative and ablative cases for movement, and express what you want to do.",
        sections: [
          {
            title: "1) Present continuous: -(I)yor",
            description:
              "Use the present continuous for actions happening now, near-future plans, and sometimes regular actions. The form changes with the verb's final vowel; negative forms use -ma/-me, which changes before -yor.",
            examples: [
              { tr: "Kitap okuyorum.", en: "I am reading a book." },
              { tr: "Müzik dinliyorum.", en: "I am listening to music." },
              { tr: "Biz yemek yiyoruz.", en: "We are eating." },
              { tr: "O okula gidiyor.", en: "He/she is going to school." },
              { tr: "Ben kitap okumuyorum.", en: "I am not reading a book." },
              { tr: "Sen geliyor musun?", en: "Are you coming?" },
              { tr: "Eve gelmiyor musun?", en: "Aren't you coming home?" },
              { tr: "Bekliyorum.", en: "I am waiting." },
              { tr: "Oynuyorum.", en: "I am playing." },
              { tr: "Yiyor ve diyor.", en: "He/she eats and says." },
              { tr: "Gidiyor, ediyor, tadıyor.", en: "He/she goes, does, tastes." },
            ],
            tips: [
              "With many consonant-final verbs, the last vowel selects -ıyor, -iyor, -uyor, or -üyor: kalıyor, giriyor, koşuyor, görüyor.",
              "After a final -ı, -i, -u, or -ü, add -yor directly: okuyor, uyuyor.",
              "Final -a/-e often changes before -yor: ara → arıyor, bekle → bekliyor.",
              "For negatives, add -ma/-me before -yor: okumuyor, sevmiyor.",
              "Common irregular forms include ye → yiyor, de → diyor, git → gidiyor, and et → ediyor.",
              "In questions, keep the question particle separate: geliyor musun?, gelmiyor mu?",
            ],
          },
          {
            title: "2) Dative case: -(y)a / -(y)e",
            description:
              "The dative case marks a destination, direction, or recipient. Choose -a after a back vowel and -e after a front vowel; add y between two vowels. Many Turkish words ending in p, ç, t, or k soften before a vowel-starting suffix.",
            examples: [
              { tr: "Okula gidiyorum.", en: "I am going to school." },
              { tr: "Eve gidiyoruz.", en: "We are going home." },
              { tr: "Otobüse biniyorum.", en: "I am getting on the bus." },
              { tr: "Sinemaya gidiyoruz.", en: "We are going to the cinema." },
              { tr: "Kitap → kitaba", en: "Book → to the book (p → b)." },
              { tr: "Ağaç → ağaca", en: "Tree → to the tree (ç → c)." },
              { tr: "O → ona", en: "He/she/it → to him/her/it." },
              { tr: "Ankara'ya gidiyorum.", en: "I am going to Ankara." },
            ],
            tips: [
              "Back vowels a, ı, o, u take -a; front vowels e, i, ö, ü take -e.",
              "Add -y- after a vowel: sinema → sinemaya.",
              "The common softening changes are p → b, ç → c, t → d, and k → ğ; there are exceptions.",
              "Use an apostrophe before suffixes added to proper names: Ankara'ya.",
            ],
          },
          {
            title: "3) Ablative case: -dan / -den / -tan / -ten",
            description:
              "The ablative case expresses movement away from a place, a source, or 'from'. Vowel harmony selects a or e, and the suffix begins with t after the voiceless consonants f, s, t, k, ç, ş, h, and p.",
            examples: [
              { tr: "Okuldan geliyorum.", en: "I am coming from school." },
              { tr: "Evden çıkıyorum.", en: "I am leaving the house." },
              { tr: "Bankadan geliyorum.", en: "I am coming from the bank." },
              { tr: "Marketten geliyorum.", en: "I am coming from the market." },
              { tr: "İşten çıkıyorum.", en: "I am leaving work." },
              { tr: "Otobüsten iniyorum.", en: "I am getting off the bus." },
              { tr: "Ali'den öğreniyorum.", en: "I am learning from Ali." },
              { tr: "Almanya'dan geliyorum.", en: "I am coming from Germany." },
            ],
            tips: [
              "Back vowels a, ı, o, u take -dan/-tan; front vowels e, i, ö, ü take -den/-ten.",
              "After f, s, t, k, ç, ş, h, or p, use t: işten, marketten.",
              "Use an apostrophe before suffixes added to proper names: Ali'den, Almanya'dan.",
            ],
          },
          {
            title: "4) Expressing wants: -mak / -mek istemek",
            description:
              "To say that someone wants to do something, use the verb's infinitive in -mak or -mek followed by istemek conjugated for the person. The infinitive vowel follows vowel harmony.",
            examples: [
              { tr: "Türkçe öğrenmek istiyorum.", en: "I want to learn Turkish." },
              { tr: "Seninle konuşmak istiyorum.", en: "I want to talk with you." },
              { tr: "Derya parka gitmek istemiyor.", en: "Derya does not want to go to the park." },
              { tr: "Biz yarın piknik yapmak istiyoruz.", en: "We want to have a picnic tomorrow." },
              {
                tr: "İstanbul'da nerede oturmak istiyorsunuz?",
                en: "Where do you want to live in Istanbul?",
              },
              { tr: "Gitmek istiyor musun?", en: "Do you want to go?" },
            ],
            tips: [
              "Use -mak after a back vowel and -mek after a front vowel: yapmak, gitmek.",
              "Conjugate istemek for the person: istiyorum, istiyorsun, istiyor, istiyoruz, istiyorsunuz, istiyorlar.",
              "For a negative, conjugate istememek: istemiyorum means 'I do not want'.",
              "In a yes/no question, the question suffix follows the conjugated verb: istiyor musun?",
            ],
          },
        ],
        practice: [
          "Ben kitap okumuyorum, müzik dinliyorum.",
          "Eve gelmiyor musun?",
          "Yemek yiyoruz.",
          "Okula gidiyorum.",
          "Kitap → kitaba; ağaç → ağaca.",
          "Marketten geliyorum.",
          "Almanya'dan geliyorum.",
          "Türkçe öğrenmek istiyorum.",
          "Derya parka gitmek istemiyor.",
          "Biz yarın piknik yapmak istiyoruz.",
          "Gitmek istiyor musun?",
        ],
        quiz: [
          {
            prompt: "Which sentence means 'I am listening to music'?",
            options: [
              "Müzik dinliyorum.",
              "Müzik dinlemiyorum.",
              "Müzik dinliyor musun?",
              "Müzik dinlemek istiyorum.",
            ],
            answer: "Müzik dinliyorum.",
            explanation:
              "Dinliyorum is the first-person singular present continuous form of dinlemek.",
          },
          {
            prompt: "Which is the correct negative form of okumak in the present continuous?",
            options: ["Okumuyor", "Okunmuyor", "Okumiyor", "Okumayor"],
            answer: "Okumuyor",
            explanation:
              "The negative marker -ma becomes -m- before -yor, giving oku-ma-yor → okumuyor.",
          },
          {
            prompt: "How do you ask 'Are you coming?'",
            options: [
              "Geliyor musun?",
              "Geliyorsun mu?",
              "Geliyor muyum?",
              "Gelmiyor musun?",
            ],
            answer: "Geliyor musun?",
            explanation:
              "Place the separate question particle after geliyor, then add the personal ending: musun.",
          },
          {
            prompt: "Which sentence means 'I am going to school'?",
            options: [
              "Okuldan gidiyorum.",
              "Okula gidiyorum.",
              "Okulda gidiyorum.",
              "Okulu gidiyorum.",
            ],
            answer: "Okula gidiyorum.",
            explanation:
              "The dative ending -a marks the destination: okul + -a → okula.",
          },
          {
            prompt: "Which form correctly means 'to the book'?",
            options: ["Kitapa", "Kitaba", "Kitapte", "Kitabı"],
            answer: "Kitaba",
            explanation:
              "Kitap takes the dative ending -a, and its final p softens to b.",
          },
          {
            prompt: "Which suffix is correct for 'from the market'?",
            options: ["Marketden", "Marketten", "Marketdan", "Markete"],
            answer: "Marketten",
            explanation:
              "The last vowel is e, so use -den; final t is voiceless, so use -ten.",
          },
          {
            prompt: "What does 'Almanya'dan geliyorum.' mean?",
            options: [
              "I am going to Germany.",
              "I am coming from Germany.",
              "I am in Germany.",
              "I want to go to Germany.",
            ],
            answer: "I am coming from Germany.",
            explanation:
              "The ablative suffix -dan means 'from'; the apostrophe separates it from the place name.",
          },
          {
            prompt: "How do you say 'I want to learn Turkish'?",
            options: [
              "Türkçe öğrenmek istiyorum.",
              "Türkçe öğreniyorum istemek.",
              "Türkçe öğrenmek istemiyorum.",
              "Türkçe öğrenmeye istiyorum.",
            ],
            answer: "Türkçe öğrenmek istiyorum.",
            explanation:
              "Use the infinitive öğrenmek followed by istiyorum ('I want').",
          },
          {
            prompt: "Which sentence means 'Derya does not want to go to the park'?",
            options: [
              "Derya parka gitmek istiyor.",
              "Derya parka gitmek istemiyor.",
              "Derya parktan gitmek istemiyor.",
              "Derya parkta gitmek istiyor.",
            ],
            answer: "Derya parka gitmek istemiyor.",
            explanation:
              "İstemiyor is the negative third-person form of istemek; parka marks the destination.",
          },
          {
            prompt: "Which sentence asks 'Do you want to go?' (informal singular)",
            options: [
              "Gitmek istiyor musun?",
              "Gitmek istiyorsun mu?",
              "Gitmek istemiyor musun?",
              "Gitmek istiyor musunuz?",
            ],
            answer: "Gitmek istiyor musun?",
            explanation:
              "In a yes/no question, the question suffix follows istiyor and takes the personal ending: musun.",
          },
        ],
      },
      {
        id: "a1-unit-4",
        title: "Unit 4 – My family, friends, and world",
        summary:
          "Talk about family and belongings with possessive suffixes, describe countries, nationalities, and languages, and use kendi and hep.",
        sections: [
          {
            title: "1) Possessive suffixes",
            description:
              "Possessive suffixes show who something belongs to. Their vowels follow vowel harmony, and third-person possession uses a linking s after vowel-final nouns. When a case suffix follows third-person possession, add n between the suffixes.",
            examples: [
              { tr: "Benim babam.", en: "My father." },
              { tr: "Senin evin.", en: "Your house." },
              { tr: "Onun annesi.", en: "His/her mother." },
              { tr: "Bizim okulumuz.", en: "Our school." },
              { tr: "Sizin ülkeniz.", en: "Your country." },
              { tr: "Onların arkadaşları.", en: "Their friends." },
              { tr: "Onun evine gidiyorum.", en: "I am going to his/her house." },
              { tr: "Onun kitabında resimler var.", en: "There are pictures in his/her book." },
              { tr: "Benim şehrim kalabalık.", en: "My city is crowded." },
            ],
            tips: [
              "Common endings are -(I)m (my), -(I)n (your, singular), -(s)I (his/her), -(I)mIz (our), -(I)nIz (your, plural/formal), and -lArI (their).",
              "The exact vowel in a suffix follows the last vowel of the noun: evim, kolum, köyüm.",
              "Some two-syllable words with a narrow second-syllable vowel drop it before a vowel-initial suffix: şehir → şehrim, burun → burnu.",
              "Add n before a case suffix after third-person possession: evi → evine, kitabı → kitabında.",
            ],
          },
          {
            title: "2) Countries, nationalities, and languages",
            description:
              "Country names, nationality words, and language names are learned as related forms. Language names commonly use -CA, whose consonant and vowel harmonize with the word.",
            examples: [
              { tr: "Türkiye — Türk / Türkiyeli — Türkçe", en: "Türkiye — Turkish person — Turkish language." },
              { tr: "Almanya — Alman / Almanyalı — Almanca", en: "Germany — German person — German language." },
              { tr: "Japonya — Japon / Japonyalı — Japonca", en: "Japan — Japanese person — Japanese language." },
              { tr: "Mısır — Arap / Mısırlı — Arapça", en: "Egypt — Arab/Egyptian — Arabic." },
              { tr: "Fransa — Fransız / Fransalı — Fransızca", en: "France — French person — French language." },
              { tr: "Çin — Çinli — Çince", en: "China — Chinese person — Chinese language." },
              { tr: "Ben Kazakistanlıyım. Kazakça biliyorum.", en: "I am from Kazakhstan. I know Kazakh." },
            ],
            tips: [
              "Some nationalities have more than one common form: Türk/Türkiyeli, Alman/Almanyalı.",
              "The language suffix is -ca/-ce/-ça/-çe. It becomes ç after f, s, t, k, ç, ş, h, or p: İngilizce, Türkçe, Arapça.",
              "Country, nationality, and language forms are not always predictable from one another; learn common forms together.",
            ],
          },
          {
            title: "3) Kendi: self and emphasis",
            description:
              "Kendi takes a possessive suffix to refer back to the subject or to emphasize who performs an action. It can also take a case suffix: kendime, kendine, kendisine.",
            examples: [
              { tr: "Ben kendim ütü yapıyorum.", en: "I do the ironing myself." },
              { tr: "Ödevini kendin yap.", en: "Do your homework yourself." },
              { tr: "Biz kendimize yemek yapıyoruz.", en: "We are cooking for ourselves." },
              { tr: "Kendiniz bir yazı yazın.", en: "Write a text yourselves." },
              { tr: "Ben kendime kazak örüyorum.", en: "I am knitting myself a sweater." },
              { tr: "Ayşe kendisine kitap alıyor.", en: "Ayşe is buying a book for herself." },
            ],
            tips: [
              "Match kendi to the person: kendim, kendin, kendisi, kendimiz, kendiniz, kendileri.",
              "Use a case ending when the meaning requires one: kendime (to/for myself), kendine (to/for yourself), kendisine (to/for him/herself).",
            ],
          },
          {
            title: "4) Hep: all of us, all of you, all of them",
            description:
              "Hep combines with possessive endings to refer to an entire group. Hepsi means 'all of them' and can also follow a noun in the genitive.",
            examples: [
              { tr: "Hepimiz öğrenciyiz.", en: "We are all students." },
              { tr: "Hepiniz çok çalışkansınız.", en: "You are all very hardworking." },
              { tr: "Bu meyvelerin hepsi taze.", en: "All of these fruits are fresh." },
              { tr: "Hepimize kitap hediye ediyor.", en: "He/she is giving a book to all of us." },
              { tr: "Hepimiz iyi anlaşıyoruz.", en: "We all get along well." },
            ],
            tips: [
              "Hepimiz = all of us; hepiniz = all of you; hepsi = all of them.",
              "These forms can take case endings: hepimize (to all of us), hepsine (to all of them), hepsinden (from all of them).",
            ],
          },
        ],
        practice: [
          "Benim ailem İstanbul'da yaşıyor.",
          "Onun evi okula yakın mı?",
          "Ben Kazakistanlıyım. Kazakça biliyorum.",
          "Ben kendim ütü yapıyorum.",
          "Biz kendimize yemek yapıyoruz.",
          "Hepimiz öğrenciyiz.",
          "Bu meyvelerin hepsi taze.",
        ],
        quiz: [
          {
            prompt: "Which phrase means 'our school'?",
            options: ["Okulum", "Okulun", "Okulumuz", "Okulunuz"],
            answer: "Okulumuz",
            explanation:
              "The first-person plural possessive ending -(I)mIz makes okul → okulumuz.",
          },
          {
            prompt: "Which is the correct form for 'his/her house'?",
            options: ["Evim", "Evin", "Evi", "Evimiz"],
            answer: "Evi",
            explanation:
              "The third-person singular possessive ending is -(s)I: ev + i → evi.",
          },
          {
            prompt: "Which phrase means 'in his/her book'?",
            options: ["Kitabında", "Kitabına", "Kitabından", "Kitabımda"],
            answer: "Kitabında",
            explanation:
              "After third-person possession kitabı, add n before the locative ending: kitabı + n + da.",
          },
          {
            prompt: "What is the Turkish word for the German language?",
            options: ["Almanca", "Almança", "Almanyaca", "Almancağ"],
            answer: "Almanca",
            explanation:
              "The language form is Almanca; country and language names are not always formed by a single predictable suffix.",
          },
          {
            prompt: "Which phrase means 'I do it myself'?",
            options: [
              "Ben kendim yapıyorum.",
              "Ben kendin yapıyorum.",
              "Ben kendimiz yapıyorum.",
              "Ben hepsi yapıyorum.",
            ],
            answer: "Ben kendim yapıyorum.",
            explanation:
              "Kendim agrees with ben and emphasizes that I do the action myself.",
          },
          {
            prompt: "Which phrase means 'We are all students'?",
            options: [
              "Hepimiz öğrenciyiz.",
              "Hepiniz öğrenciyiz.",
              "Hepsi öğrenciyiz.",
              "Hepimiz öğrenci misiniz?",
            ],
            answer: "Hepimiz öğrenciyiz.",
            explanation:
              "Hepimiz means 'all of us'; öğrenciyiz agrees with the first-person plural subject.",
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
