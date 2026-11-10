import { CATEGORY_META, CATEGORY_ORDER, CATEGORIES } from "./vocabulary";
import { normalizeSearchText } from "./conjugations";

export interface VocabularySearchResult {
  tr: string;
  meanings: string[];
  categories: string[];
}

export function searchVocabulary(query: string): VocabularySearchResult[] {
  const normalizedQuery = normalizeSearchText(query.trim());
  if (!normalizedQuery) return [];

  const entries = new Map<
    string,
    { tr: string; meanings: string[]; categories: string[] }
  >();

  for (const category of CATEGORY_ORDER) {
    for (const [tr, en] of CATEGORIES[category]) {
      const key = normalizeSearchText(tr);
      const entry = entries.get(key) ?? {
        tr,
        meanings: [],
        categories: [],
      };

      if (
        !entry.meanings.some(
          (meaning) => normalizeSearchText(meaning) === normalizeSearchText(en),
        )
      ) {
        entry.meanings.push(en);
      }
      if (!entry.categories.includes(CATEGORY_META[category].label)) {
        entry.categories.push(CATEGORY_META[category].label);
      }
      entries.set(key, entry);
    }
  }

  return [...entries.values()].filter((entry) =>
    [entry.tr, ...entry.meanings].some((value) =>
      normalizeSearchText(value).includes(normalizedQuery),
    ),
  );
}
