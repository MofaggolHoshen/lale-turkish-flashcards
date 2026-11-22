import sourceWords from "./conjugations.json";

export const PERSONS = ["Ben", "Sen", "O", "Biz", "Siz", "Onlar"] as const;
export const POSSESSIVE_PERSONS = [
  "Benim",
  "Senin",
  "Onun",
  "Bizim",
  "Sizin",
  "Onların",
] as const;
export type Person =
  | (typeof PERSONS)[number]
  | (typeof POSSESSIVE_PERSONS)[number];
export type PartOfSpeech = "verb" | "noun" | "adjective";

export interface PersonForms {
  person: Person;
  positive: string;
  negative: string;
  question: string;
  negativeQuestion: string;
}

export interface TenseForms {
  id: string;
  label: string;
  persons: PersonForms[];
}

export interface ConjugationWord {
  lemma: string;
  englishMeaning: string | null;
  bengaliMeaning: string;
  partOfSpeech: PartOfSpeech;
  tenses: TenseForms[];
  nominalForms: PersonForms[];
}

export function normalizeSearchText(value: string): string {
  return value
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function lastVowel(value: string): "a" | "e" | "ı" | "i" | "o" | "u" | "ö" | "ü" | undefined {
  return [...value].reverse().find((character) =>
    "aeıioöuü".includes(character),
  ) as "a" | "e" | "ı" | "i" | "o" | "u" | "ö" | "ü" | undefined;
}

function fourWayVowel(value: string): "ı" | "i" | "u" | "ü" {
  switch (lastVowel(value)) {
    case "e":
    case "i":
      return "i";
    case "o":
    case "u":
      return "u";
    case "ö":
    case "ü":
      return "ü";
    default:
      return "ı";
  }
}

function pluralize(value: string): string {
  const vowel = lastVowel(value);
  return vowel === "a" || vowel === "ı" || vowel === "o" || vowel === "u"
    ? `${value}lar`
    : `${value}ler`;
}

function generatePossessiveForms(lemma: string): PersonForms[] {
  const vowel = fourWayVowel(lemma);
  const vowelFinal = "aeıioöuü".includes(lemma[lemma.length - 1] ?? "");

  const first = `${lemma}${vowelFinal ? "" : vowel}m`;
  const second = `${lemma}${vowelFinal ? "" : vowel}n`;
  const third = vowelFinal
    ? `${lemma}s${vowel}`
    : `${lemma}${vowel}`;
  const firstPlural = vowelFinal
    ? `${lemma}m${vowel}z`
    : `${lemma}${vowel}m${vowel}z`;
  const secondPlural = vowelFinal
    ? `${lemma}n${vowel}z`
    : `${lemma}${vowel}n${vowel}z`;
  const thirdPlural = `${pluralize(lemma)}${fourWayVowel(pluralize(lemma))}`;

  return [
    {
      person: "Benim",
      positive: `${first} var`,
      negative: `${first} yok`,
      question: `${first} var mı?`,
      negativeQuestion: `${first} yok mu?`,
    },
    {
      person: "Senin",
      positive: `${second} var`,
      negative: `${second} yok`,
      question: `${second} var mı?`,
      negativeQuestion: `${second} yok mu?`,
    },
    {
      person: "Onun",
      positive: `${third} var`,
      negative: `${third} yok`,
      question: `${third} var mı?`,
      negativeQuestion: `${third} yok mu?`,
    },
    {
      person: "Bizim",
      positive: `${firstPlural} var`,
      negative: `${firstPlural} yok`,
      question: `${firstPlural} var mı?`,
      negativeQuestion: `${firstPlural} yok mu?`,
    },
    {
      person: "Sizin",
      positive: `${secondPlural} var`,
      negative: `${secondPlural} yok`,
      question: `${secondPlural} var mı?`,
      negativeQuestion: `${secondPlural} yok mu?`,
    },
    {
      person: "Onların",
      positive: `${thirdPlural} var`,
      negative: `${thirdPlural} yok`,
      question: `${thirdPlural} var mı?`,
      negativeQuestion: `${thirdPlural} yok mu?`,
    },
  ];
}

export const conjugationWords = (sourceWords as ConjugationWord[]).map((word) => {
  if (word.partOfSpeech !== "noun") {
    return word;
  }

  return {
    ...word,
    nominalForms: generatePossessiveForms(word.lemma),
  };
});

export function findConjugationWord(lemma: string): ConjugationWord | undefined {
  const normalizedLemma = normalizeSearchText(lemma.trim());
  return conjugationWords.find(
    (word) => normalizeSearchText(word.lemma) === normalizedLemma,
  );
}
