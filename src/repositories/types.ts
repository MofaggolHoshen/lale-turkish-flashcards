import type { Word, Meta } from "../types";

/** Repository interface for Word data operations */
export interface WordRepository {
  getAll(): Promise<Word[]>;
  create(word: Omit<Word, "id">): Promise<Word>;
  update(id: string, word: Partial<Word>): Promise<Word>;
  delete(id: string): Promise<void>;
  save(words: Word[]): Promise<void>; // Bulk save
}

/** Repository interface for Meta data (streak, stats) */
export interface MetaRepository {
  get(): Promise<Meta>;
  update(meta: Partial<Meta>): Promise<Meta>;
}

/** Repository interface for Grammar completion tracking */
export interface GrammarRepository {
  getCompleted(): Promise<Record<string, boolean>>;
  markLessonComplete(lessonId: string): Promise<void>;
  markLessonIncomplete(lessonId: string): Promise<void>;
}

/** Main repository facade that combines all repositories */
export interface Repository {
  words: WordRepository;
  meta: MetaRepository;
  grammar: GrammarRepository;
}
