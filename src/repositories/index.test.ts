import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import {
  getRepository,
  setRepository,
  resetRepository,
  type Repository,
} from "./index";
import { createLocalRepository } from "./local";

describe("Repository Factory", () => {
  beforeEach(() => {
    resetRepository();
    vi.resetModules();
  });

  afterEach(() => {
    resetRepository();
  });

  describe("getRepository", () => {
    it("returns a singleton instance", () => {
      const repo1 = getRepository();
      const repo2 = getRepository();
      expect(repo1).toBe(repo2);
    });

    it("returns repository with all three sub-repositories", () => {
      const repo = getRepository();
      expect(repo).toHaveProperty("words");
      expect(repo).toHaveProperty("meta");
      expect(repo).toHaveProperty("grammar");
    });

    it("has callable methods on all repositories", () => {
      const repo = getRepository();
      expect(typeof repo.words.getAll).toBe("function");
      expect(typeof repo.words.save).toBe("function");
      expect(typeof repo.words.create).toBe("function");
      expect(typeof repo.words.update).toBe("function");
      expect(typeof repo.words.delete).toBe("function");
      expect(typeof repo.meta.get).toBe("function");
      expect(typeof repo.meta.update).toBe("function");
      expect(typeof repo.grammar.getCompleted).toBe("function");
      expect(typeof repo.grammar.markLessonComplete).toBe("function");
      expect(typeof repo.grammar.markLessonIncomplete).toBe("function");
    });
  });

  describe("setRepository", () => {
    it("allows setting a custom repository", () => {
      const customRepo = createLocalRepository();
      setRepository(customRepo);
      const repo = getRepository();
      expect(repo).toBe(customRepo);
    });

    it("subsequent calls to getRepository return the custom repository", () => {
      const customRepo = createLocalRepository();
      setRepository(customRepo);
      expect(getRepository()).toBe(customRepo);
      expect(getRepository()).toBe(customRepo);
    });
  });

  describe("resetRepository", () => {
    it("clears the singleton instance", () => {
      const repo1 = getRepository();
      resetRepository();
      const repo2 = getRepository();
      expect(repo1).not.toBe(repo2);
    });

    it("works after setting a custom repository", () => {
      const customRepo = createLocalRepository();
      setRepository(customRepo);
      resetRepository();
      const repo = getRepository();
      expect(repo).not.toBe(customRepo);
    });
  });

  describe("integration", () => {
    it("supports full workflow: set -> get -> reset -> get", () => {
      const customRepo = createLocalRepository();
      setRepository(customRepo);
      expect(getRepository()).toBe(customRepo);

      resetRepository();
      const newRepo = getRepository();
      expect(newRepo).not.toBe(customRepo);
      expect(getRepository()).toBe(newRepo);
    });
  });
});
