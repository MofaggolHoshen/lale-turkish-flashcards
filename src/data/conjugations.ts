import sourceWords from "./conjugations.json";

export const PERSONS = ["Ben", "Sen", "O", "Biz", "Siz", "Onlar"] as const;
export type Person = (typeof PERSONS)[number];
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

export const conjugationWords = sourceWords as ConjugationWord[];

export function findConjugationWord(lemma: string): ConjugationWord | undefined {
  const normalizedLemma = normalizeSearchText(lemma.trim());
  return conjugationWords.find(
    (word) => normalizeSearchText(word.lemma) === normalizedLemma,
  );
}
