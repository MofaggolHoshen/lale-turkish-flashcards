import { describe, expect, it } from "vitest";

import {
  conjugationWords,
  findConjugationWord,
  normalizeSearchText,
  PERSONS,
} from "./conjugations";

describe("conjugation data", () => {
  it("loads every verb tense with all six persons", () => {
    const verbs = conjugationWords.filter((word) => word.partOfSpeech === "verb");

    expect(verbs.length).toBeGreaterThanOrEqual(200);
    expect(verbs.every((word) => word.tenses.length >= 3)).toBe(true);
    expect(
      verbs.every((word) =>
        word.tenses.every((tense) => tense.persons.length === PERSONS.length),
      ),
    ).toBe(true);
  });

  it("keeps irregular conjugations from the source tables", () => {
    const gelmek = conjugationWords.find((word) => word.lemma === "gelmek");
    const gitmek = conjugationWords.find((word) => word.lemma === "gitmek");

    expect(gelmek?.englishMeaning).toBe("to come");
    expect(gelmek?.tenses.map((tense) => tense.label)).toEqual(
      expect.arrayContaining(["Present continuous", "Past", "Future"]),
    );
    expect(gitmek?.tenses[0].persons[0].positive).toBe("gidiyorum");
    expect(gitmek?.tenses[1].persons[0].positive).toBe("gittim");
    expect(gitmek?.tenses[2].persons[0].positive).toBe("gideceğim");
  });

  it("loads full adjective tables and only claims available noun forms", () => {
    const adjective = conjugationWords.find((word) => word.lemma === "mutlu");
    const noun = conjugationWords.find((word) => word.lemma === "öğretmen");

    expect(adjective?.partOfSpeech).toBe("adjective");
    expect(adjective?.nominalForms).toHaveLength(PERSONS.length);
    expect(noun?.partOfSpeech).toBe("noun");
    expect(noun?.nominalForms).toHaveLength(1);
    expect(noun?.nominalForms[0].person).toBe("Ben");
  });

  it("normalizes Turkish letters for forgiving search", () => {
    expect(normalizeSearchText("ŞİŞE")).toBe("sise");
    expect(normalizeSearchText("ışık")).toBe("isik");
  });

  it("finds a conjugation entry by normalized lemma", () => {
    expect(findConjugationWord("GELMEK")?.lemma).toBe("gelmek");
    expect(findConjugationWord("OGRETMEN")?.lemma).toBe("öğretmen");
    expect(findConjugationWord("not-in-the-conjugation-list")).toBeUndefined();
  });
});
