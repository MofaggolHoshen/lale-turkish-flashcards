import type { Meta, Word } from "../types";

const WORDS_KEY = "lale_words";
const META_KEY = "lale_meta";

function write<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("save failed", error);
  }
}

export async function persistWords(words: Word[]): Promise<void> {
  write(WORDS_KEY, words);
}

export async function persistMeta(meta: Meta): Promise<void> {
  write(META_KEY, meta);
}