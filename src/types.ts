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

export type Tab = "home" | "vocab" | "review" | "add" | "library";
export type ReviewMode = "due" | "mastered" | "all";
export type Category =
  | "greetings"
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
  | "nature"
  | "animals"
  | "verbs"
  | "adjectives";

export type TranslationDirection = "tr-en" | "en-tr";
export type Dictionary = Record<string, string>;
