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

export async function loadWords(): Promise<Word[]> {
  return read(WORDS_KEY, []);
}

export async function loadMeta(): Promise<Meta> {
  return read(META_KEY, DEFAULT_META);
}