export interface Word {
  id: string;
  tr: string;
  en: string;
  notes: string;
  emoji: string;
  level: number;
  nextReview: number;
  correct: number;
  wrong: number;
  createdAt: number;
}

export interface Meta {
  streak: number;
  lastDay: string | null;
  best: number;
}

export type Tab =
  | "home"
  | "vocab"
  | "review"
  | "add"
  | "library"
  | "grammar"
  | "story";
export type ReviewMode = "due" | "mastered" | "all";
export type Category =
  | "greetings"
  | "daily_expressions"
  | "pronouns"
  | "questions"
  | "numbers"
  | "days"
  | "time"
  | "family"
  | "body"
  | "colors"
  | "food"
  | "vegetables"
  | "household"
  | "places"
  | "nature"
  | "animals"
  | "verbs"
  | "adjectives"
  | "unit_1"
  | "unit_2"
  | "unit_3"
  | "unit_4";

export type TranslationDirection = "tr-en" | "en-tr";
export type Dictionary = Record<string, string>;
