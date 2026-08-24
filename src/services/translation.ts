import type { Dictionary, TranslationDirection } from "../types";

interface TranslationResponse {
  responseData?: {
    translatedText?: string;
  };
}

export async function translateWord(
  text: string,
  direction: TranslationDirection,
  dictionaries: { trToEn: Dictionary; enToTr: Dictionary },
): Promise<string | null> {
  const query = text.trim();
  const dictionary =
    direction === "tr-en" ? dictionaries.trToEn : dictionaries.enToTr;
  const normalized =
    direction === "tr-en"
      ? query.toLocaleLowerCase("tr-TR")
      : query.toLowerCase();
  if (dictionary[normalized]) return dictionary[normalized];

  const langpair = direction === "tr-en" ? "tr|en" : "en|tr";
  try {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(query)}&langpair=${langpair}`,
    );
    if (!response.ok) return null;
    const data = (await response.json()) as TranslationResponse;
    const result = data?.responseData?.translatedText;
    if (result && !/^\s*$/.test(result) && !/MYMEMORY WARNING/i.test(result))
      return result;
  } catch {
    // Online translation is optional; the built-in dictionary remains available offline.
  }
  return null;
}
