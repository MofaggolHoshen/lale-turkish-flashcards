import { describe, expect, it } from "vitest";

import {
  GRAMMAR_QUESTION_BANK_SIZE,
  buildQuestionDeck,
  grammarLevels,
} from "./grammar";

describe("grammar question deck", () => {
  it("creates a 100-question bank for every lesson", () => {
    for (const level of grammarLevels) {
      for (const lesson of level.lessons) {
        const deck = buildQuestionDeck(lesson.quiz, GRAMMAR_QUESTION_BANK_SIZE);
        expect(deck).toHaveLength(GRAMMAR_QUESTION_BANK_SIZE);
        expect(deck[0]).toEqual(lesson.quiz[0]);
      }
    }
  });
});
