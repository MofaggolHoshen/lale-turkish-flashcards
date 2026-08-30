import { describe, it, expect, beforeEach, vi } from "vitest";
import { createRemoteRepository } from "./index";
import type { Word, Meta } from "../../types";

// Mock the fetch function
vi.stubGlobal("fetch", vi.fn());

describe("RemoteWordRepository", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const repo = createRemoteRepository();

  describe("getAll", () => {
    it("fetches words from API", async () => {
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

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockWords,
      } as Response);

      const words = await repo.words.getAll();
      expect(words).toEqual(mockWords);
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining("/words"));
    });

    it("throws error on failed fetch", async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        statusText: "Not Found",
      } as Response);

      await expect(repo.words.getAll()).rejects.toThrow(
        "Failed to fetch words",
      );
    });
  });

  describe("save", () => {
    it("sends PUT request with words", async () => {
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

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
      } as Response);

      await repo.words.save(mockWords);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/words/bulk"),
        expect.objectContaining({
          method: "PUT",
          body: JSON.stringify({ words: mockWords }),
        }),
      );
    });

    it("throws error on failed save", async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        statusText: "Server Error",
      } as Response);

      await expect(repo.words.save([])).rejects.toThrow("Failed to save words");
    });
  });

  describe("create", () => {
    it("sends POST request to create word", async () => {
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

      const createdWord: Word = { ...wordData, id: "1" };

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => createdWord,
      } as Response);

      const result = await repo.words.create(wordData);

      expect(result).toEqual(createdWord);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/words"),
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify(wordData),
        }),
      );
    });

    it("throws error on failed create", async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        statusText: "Bad Request",
      } as Response);

      await expect(
        repo.words.create({
          tr: "test",
          en: "test",
          notes: "",
          emoji: "",
          level: 0,
          nextReview: 0,
          correct: 0,
          wrong: 0,
          createdAt: 0,
        }),
      ).rejects.toThrow("Failed to create word");
    });
  });

  describe("update", () => {
    it("sends PATCH request to update word", async () => {
      const updates = { level: 2 };
      const updatedWord: Word = {
        id: "1",
        tr: "merhaba",
        en: "hello",
        notes: "",
        emoji: "👋",
        level: 2,
        nextReview: Date.now(),
        correct: 0,
        wrong: 0,
        createdAt: Date.now(),
      };

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => updatedWord,
      } as Response);

      const result = await repo.words.update("1", updates);

      expect(result).toEqual(updatedWord);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/words/1"),
        expect.objectContaining({
          method: "PATCH",
          body: JSON.stringify(updates),
        }),
      );
    });

    it("throws error on failed update", async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        statusText: "Not Found",
      } as Response);

      await expect(repo.words.update("1", { level: 2 })).rejects.toThrow(
        "Failed to update word",
      );
    });
  });

  describe("delete", () => {
    it("sends DELETE request to delete word", async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
      } as Response);

      await repo.words.delete("1");

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/words/1"),
        expect.objectContaining({
          method: "DELETE",
        }),
      );
    });

    it("throws error on failed delete", async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        statusText: "Not Found",
      } as Response);

      await expect(repo.words.delete("1")).rejects.toThrow(
        "Failed to delete word",
      );
    });
  });
});

describe("RemoteMetaRepository", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const repo = createRemoteRepository();

  describe("get", () => {
    it("fetches meta from API", async () => {
      const mockMeta: Meta = { streak: 5, lastDay: "2024-01-01", best: 10 };

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockMeta,
      } as Response);

      const meta = await repo.meta.get();
      expect(meta).toEqual(mockMeta);
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining("/meta"));
    });

    it("throws error on failed fetch", async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        statusText: "Server Error",
      } as Response);

      await expect(repo.meta.get()).rejects.toThrow("Failed to fetch meta");
    });
  });

  describe("update", () => {
    it("sends PATCH request to update meta", async () => {
      const updates = { streak: 7 };
      const updatedMeta: Meta = { streak: 7, lastDay: "2024-01-01", best: 10 };

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => updatedMeta,
      } as Response);

      const result = await repo.meta.update(updates);

      expect(result).toEqual(updatedMeta);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/meta"),
        expect.objectContaining({
          method: "PATCH",
          body: JSON.stringify(updates),
        }),
      );
    });

    it("throws error on failed update", async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        statusText: "Server Error",
      } as Response);

      await expect(repo.meta.update({ streak: 7 })).rejects.toThrow(
        "Failed to update meta",
      );
    });
  });
});

describe("RemoteGrammarRepository", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const repo = createRemoteRepository();

  describe("getCompleted", () => {
    it("fetches completed lessons from API", async () => {
      const mockCompleted = { "lesson-1": true, "lesson-2": true };

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockCompleted,
      } as Response);

      const completed = await repo.grammar.getCompleted();
      expect(completed).toEqual(mockCompleted);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/grammar/completed"),
      );
    });

    it("throws error on failed fetch", async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        statusText: "Server Error",
      } as Response);

      await expect(repo.grammar.getCompleted()).rejects.toThrow(
        "Failed to fetch grammar completion",
      );
    });
  });

  describe("markLessonComplete", () => {
    it("sends POST request to mark lesson complete", async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
      } as Response);

      await repo.grammar.markLessonComplete("lesson-1");

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/grammar/lessons/lesson-1/complete"),
        expect.objectContaining({
          method: "POST",
        }),
      );
    });

    it("throws error on failed mark complete", async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        statusText: "Not Found",
      } as Response);

      await expect(repo.grammar.markLessonComplete("lesson-1")).rejects.toThrow(
        "Failed to mark lesson complete",
      );
    });
  });

  describe("markLessonIncomplete", () => {
    it("sends DELETE request to mark lesson incomplete", async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
      } as Response);

      await repo.grammar.markLessonIncomplete("lesson-1");

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/grammar/lessons/lesson-1/complete"),
        expect.objectContaining({
          method: "DELETE",
        }),
      );
    });

    it("throws error on failed mark incomplete", async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        statusText: "Not Found",
      } as Response);

      await expect(
        repo.grammar.markLessonIncomplete("lesson-1"),
      ).rejects.toThrow("Failed to mark lesson incomplete");
    });
  });
});
