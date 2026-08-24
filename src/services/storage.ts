import type { Meta, Word } from "../types";

const WORDS_KEY = "lale_words";
const META_KEY = "lale_meta";

const DEFAULT_META: Meta = { streak: 0, lastDay: null, best: 0 };

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("save failed", error);
  }
}

export async function loadWords(): Promise<Word[]> {
  return read(WORDS_KEY, []);
}

export async function persistWords(words: Word[]): Promise<void> {
  write(WORDS_KEY, words);
}

export async function loadMeta(): Promise<Meta> {
  return read(META_KEY, DEFAULT_META);
}

export async function persistMeta(meta: Meta): Promise<void> {
  write(META_KEY, meta);
}
