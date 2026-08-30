import { describe, it, expect, beforeEach } from "vitest";
import { createLocalRepository } from "./index";
import type { Word, Meta } from "../../types";

describe("LocalWordRepository", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const repo = createLocalRepository();

  describe("getAll", () => {
    it("returns empty array when no words are stored", async () => {
      const words = await repo.words.getAll();
      expect(words).toEqual([]);
    });

    it("returns stored words", async () => {
      const mockWords: Word[] = [
        {
          id: "1",
          tr: "merhaba",
          en: "hello",
          notes: "",
          emoji: "👋",
          level: 0,
          nextReview: Date.now(),
          correct: 0,
          wrong: 0,
          createdAt: Date.now(),
        },
      ];
      localStorage.setItem("lale_words", JSON.stringify(mockWords));
      const words = await repo.words.getAll();
      expect(words).toEqual(mockWords);
    });
  });

  describe("save", () => {
    it("saves words to localStorage", async () => {
      const mockWords: Word[] = [
        {
          id: "1",
          tr: "merhaba",
          en: "hello",
          notes: "",
          emoji: "👋",
          level: 0,
          nextReview: Date.now(),
          correct: 0,
          wrong: 0,
          createdAt: Date.now(),
        },
      ];
      await repo.words.save(mockWords);
      const stored = localStorage.getItem("lale_words");
      expect(stored).toBeTruthy();
      expect(JSON.parse(stored!)).toEqual(mockWords);
    });

    it("overwrites existing words", async () => {
      const word1: Word[] = [
        {
          id: "1",
          tr: "merhaba",
          en: "hello",
          notes: "",
          emoji: "👋",
          level: 0,
          nextReview: Date.now(),
          correct: 0,
          wrong: 0,
          createdAt: Date.now(),
        },
      ];
      const word2: Word[] = [
        {
          id: "2",
          tr: "hoşça kalın",
          en: "goodbye",
          notes: "",
          emoji: "👋",
          level: 1,
          nextReview: Date.now(),
          correct: 1,
          wrong: 0,
          createdAt: Date.now(),
        },
      ];
      await repo.words.save(word1);
      await repo.words.save(word2);
      const stored = await repo.words.getAll();
      expect(stored).toEqual(word2);
    });
  });

  describe("create", () => {
    it("creates a new word with generated id", async () => {
      const wordData = {
        tr: "merhaba",
        en: "hello",
        notes: "",
        emoji: "👋",
        level: 0,
        nextReview: Date.now(),
        correct: 0,
        wrong: 0,
        createdAt: Date.now(),
      };
      const created = await repo.words.create(wordData);
      expect(created).toHaveProperty("id");
      expect(created.tr).toBe("merhaba");
      expect(created.en).toBe("hello");
    });

    it("prepends new word to existing words", async () => {
      const existing: Word[] = [
        {
          id: "1",
          tr: "merhaba",
          en: "hello",
          notes: "",
          emoji: "👋",
          level: 0,
          nextReview: Date.now(),
          correct: 0,
          wrong: 0,
          createdAt: Date.now(),
        },
      ];
      await repo.words.save(existing);

      const newWordData = {
        tr: "hoşça kalın",
        en: "goodbye",
        notes: "",
        emoji: "👋",
        level: 0,
        nextReview: Date.now(),
        correct: 0,
        wrong: 0,
        createdAt: Date.now(),
      };
      await repo.words.create(newWordData);
      const all = await repo.words.getAll();
      expect(all).toHaveLength(2);
      expect(all[0].tr).toBe("hoşça kalın");
      expect(all[1].tr).toBe("merhaba");
    });
  });

  describe("update", () => {
    it("updates an existing word", async () => {
      const word: Word = {
        id: "1",
        tr: "merhaba",
        en: "hello",
        notes: "",
        emoji: "👋",
        level: 0,
        nextReview: Date.now(),
        correct: 0,
        wrong: 0,
        createdAt: Date.now(),
      };
      await repo.words.save([word]);

      const updated = await repo.words.update("1", { level: 2 });
      expect(updated.level).toBe(2);

      const all = await repo.words.getAll();
      expect(all[0].level).toBe(2);
    });

    it("throws error when word not found", async () => {
      await expect(
        repo.words.update("nonexistent", { level: 1 }),
      ).rejects.toThrow();
    });
  });

  describe("delete", () => {
    it("deletes a word by id", async () => {
      const words: Word[] = [
        {
          id: "1",
          tr: "merhaba",
          en: "hello",
          notes: "",
          emoji: "👋",
          level: 0,
          nextReview: Date.now(),
          correct: 0,
          wrong: 0,
          createdAt: Date.now(),
        },
        {
          id: "2",
          tr: "hoşça kalın",
          en: "goodbye",
          notes: "",
          emoji: "👋",
          level: 0,
          nextReview: Date.now(),
          correct: 0,
          wrong: 0,
          createdAt: Date.now(),
        },
      ];
      await repo.words.save(words);

      await repo.words.delete("1");
      const all = await repo.words.getAll();
      expect(all).toHaveLength(1);
      expect(all[0].id).toBe("2");
    });
  });
});

describe("LocalMetaRepository", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const repo = createLocalRepository();

  describe("get", () => {
    it("returns default meta when nothing stored", async () => {
      const meta = await repo.meta.get();
      expect(meta).toEqual({ streak: 0, lastDay: null, best: 0 });
    });

    it("returns stored meta", async () => {
      const mockMeta: Meta = { streak: 5, lastDay: "2024-01-01", best: 10 };
      localStorage.setItem("lale_meta", JSON.stringify(mockMeta));
      const meta = await repo.meta.get();
      expect(meta).toEqual(mockMeta);
    });
  });

  describe("update", () => {
    it("updates meta data", async () => {
      const updated = await repo.meta.update({ streak: 7 });
      expect(updated.streak).toBe(7);

      const stored = await repo.meta.get();
      expect(stored.streak).toBe(7);
    });

    it("preserves existing fields when partially updating", async () => {
      await repo.meta.update({ streak: 5, lastDay: "2024-01-01", best: 10 });
      const updated = await repo.meta.update({ streak: 8 });

      expect(updated.lastDay).toBe("2024-01-01");
      expect(updated.best).toBe(10);
      expect(updated.streak).toBe(8);
    });
  });
});

describe("LocalGrammarRepository", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const repo = createLocalRepository();

  describe("getCompleted", () => {
    it("returns empty object when nothing stored", async () => {
      const completed = await repo.grammar.getCompleted();
      expect(completed).toEqual({});
    });

    it("returns stored completed lessons", async () => {
      const mockCompleted = { "lesson-1": true, "lesson-2": true };
      localStorage.setItem("lale_grammar", JSON.stringify(mockCompleted));
      const completed = await repo.grammar.getCompleted();
      expect(completed).toEqual(mockCompleted);
    });
  });

  describe("markLessonComplete", () => {
    it("marks a lesson as complete", async () => {
      await repo.grammar.markLessonComplete("lesson-1");
      const completed = await repo.grammar.getCompleted();
      expect(completed["lesson-1"]).toBe(true);
    });

    it("preserves other completed lessons", async () => {
      await repo.grammar.markLessonComplete("lesson-1");
      await repo.grammar.markLessonComplete("lesson-2");
      const completed = await repo.grammar.getCompleted();
      expect(completed["lesson-1"]).toBe(true);
      expect(completed["lesson-2"]).toBe(true);
    });
  });

  describe("markLessonIncomplete", () => {
    it("marks a lesson as incomplete", async () => {
      await repo.grammar.markLessonComplete("lesson-1");
      await repo.grammar.markLessonIncomplete("lesson-1");
      const completed = await repo.grammar.getCompleted();
      expect(completed["lesson-1"]).toBeUndefined();
    });

    it("preserves other completed lessons", async () => {
      await repo.grammar.markLessonComplete("lesson-1");
      await repo.grammar.markLessonComplete("lesson-2");
      await repo.grammar.markLessonIncomplete("lesson-1");
      const completed = await repo.grammar.getCompleted();
      expect(completed["lesson-1"]).toBeUndefined();
      expect(completed["lesson-2"]).toBe(true);
    });
  });
});
