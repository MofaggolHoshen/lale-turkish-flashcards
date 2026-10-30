import { describe, expect, it } from "vitest";

import { CATEGORIES, TR_EN } from "./vocabulary";

describe("Common Verbs vocabulary", () => {
  it("includes essential everyday verbs", () => {
    expect(CATEGORIES.verbs).toEqual(
      expect.arrayContaining([
        ["olmak", "to be"],
        ["gülmek", "to laugh"],
        ["sormak", "to ask"],
        ["demek", "to say"],
        ["kullanmak", "to use"],
        ["bulmak", "to find"],
        ["oturmak", "to sit / to live"],
      ]),
    );
  });
});

describe("Textbook unit vocabulary", () => {
  it("includes the end-of-unit words for Units 1 through 4", () => {
    expect(CATEGORIES.unit_1).toEqual(
      expect.arrayContaining([
        ["anneler günü", "Mother's Day"],
        ["zürafa", "giraffe"],
      ]),
    );
    expect(CATEGORIES.unit_2).toEqual(
      expect.arrayContaining([
        ["doğum tarihi", "date of birth"],
        ["tezgâhtar", "shop assistant"],
      ]),
    );
    expect(CATEGORIES.unit_3).toEqual(
      expect.arrayContaining([
        ["açık büfe", "buffet"],
        ["para çekmek", "to withdraw money"],
      ]),
    );
    expect(CATEGORIES.unit_4).toEqual(
      expect.arrayContaining([
        ["anneanne", "maternal grandmother"],
        ["yabancı dil", "foreign language"],
      ]),
    );
    expect(TR_EN.yemek).toBe("to eat");
  });
});
