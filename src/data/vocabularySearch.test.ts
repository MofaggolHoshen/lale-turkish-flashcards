import { describe, expect, it } from "vitest";

import { searchVocabulary } from "./vocabularySearch";

describe("searchVocabulary", () => {
  it("finds matches in Turkish and English", () => {
    expect(searchVocabulary("şişe").map((entry) => entry.tr)).toContain("şişe");
    expect(searchVocabulary("bottle").map((entry) => entry.tr)).toContain("şişe");
  });

  it("normalizes Turkish letters", () => {
    expect(searchVocabulary("sise").map((entry) => entry.tr)).toContain("şişe");
  });

  it("returns repeated words once and includes their categories", () => {
    const matches = searchVocabulary("günaydın");

    expect(matches).toHaveLength(1);
    expect(matches[0].categories).toContain("Greetings & Basics");
    expect(matches[0].categories).toContain("Daily Expressions");
  });
});
