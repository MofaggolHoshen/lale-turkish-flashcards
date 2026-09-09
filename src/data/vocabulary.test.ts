import { describe, expect, it } from "vitest";

import { CATEGORIES } from "./vocabulary";

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
        ["oturmak", "to sit"],
      ]),
    );
  });
});
