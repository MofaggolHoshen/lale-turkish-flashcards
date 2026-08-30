import type { Word, Meta } from "../../types";
import type {
  WordRepository,
  MetaRepository,
  GrammarRepository,
  Repository,
} from "../types";
import { uid } from "../../utils/flashcards";

const WORDS_KEY = "lale_words";
const META_KEY = "lale_meta";
const GRAMMAR_KEY = "lale_grammar";

class LocalWordRepository implements WordRepository {
  async getAll(): Promise<Word[]> {
    try {
      const raw = localStorage.getItem(WORDS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (error) {
      console.error("Failed to load words from localStorage", error);
      return [];
    }
  }

  async save(words: Word[]): Promise<void> {
    try {
      localStorage.setItem(WORDS_KEY, JSON.stringify(words));
    } catch (error) {
      console.error("Failed to save words to localStorage", error);
    }
  }

  async create(word: Omit<Word, "id">): Promise<Word> {
    const newWord = { ...word, id: uid() } as Word;
    const all = await this.getAll();
    await this.save([newWord, ...all]);
    return newWord;
  }

  async update(id: string, updates: Partial<Word>): Promise<Word> {
    const all = await this.getAll();
    const word = all.find((w) => w.id === id);
    if (!word) throw new Error(`Word ${id} not found`);
    const updated = { ...word, ...updates };
    await this.save(all.map((w) => (w.id === id ? updated : w)));
    return updated;
  }

  async delete(id: string): Promise<void> {
    const all = await this.getAll();
    await this.save(all.filter((w) => w.id !== id));
  }
}

class LocalMetaRepository implements MetaRepository {
  async get(): Promise<Meta> {
    try {
      const raw = localStorage.getItem(META_KEY);
      return raw ? JSON.parse(raw) : { streak: 0, lastDay: null, best: 0 };
    } catch (error) {
      console.error("Failed to load meta from localStorage", error);
      return { streak: 0, lastDay: null, best: 0 };
    }
  }

  async update(updates: Partial<Meta>): Promise<Meta> {
    const current = await this.get();
    const updated = { ...current, ...updates };
    try {
      localStorage.setItem(META_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error("Failed to save meta to localStorage", error);
    }
    return updated;
  }
}

class LocalGrammarRepository implements GrammarRepository {
  async getCompleted(): Promise<Record<string, boolean>> {
    try {
      const raw = localStorage.getItem(GRAMMAR_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (error) {
      console.error(
        "Failed to load grammar completion from localStorage",
        error,
      );
      return {};
    }
  }

  async markLessonComplete(lessonId: string): Promise<void> {
    const completed = await this.getCompleted();
    completed[lessonId] = true;
    try {
      localStorage.setItem(GRAMMAR_KEY, JSON.stringify(completed));
    } catch (error) {
      console.error("Failed to save grammar completion to localStorage", error);
    }
  }

  async markLessonIncomplete(lessonId: string): Promise<void> {
    const completed = await this.getCompleted();
    delete completed[lessonId];
    try {
      localStorage.setItem(GRAMMAR_KEY, JSON.stringify(completed));
    } catch (error) {
      console.error("Failed to save grammar completion to localStorage", error);
    }
  }
}

export function createLocalRepository(): Repository {
  return {
    words: new LocalWordRepository(),
    meta: new LocalMetaRepository(),
    grammar: new LocalGrammarRepository(),
  };
}
