const WORDS_KEY = "lale_words";
const META_KEY = "lale_meta";

const DEFAULT_META = { streak: 0, lastDay: null, best: 0 };

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("save failed", error);
  }
}

export async function loadWords() {
  return read(WORDS_KEY, []);
}

export async function persistWords(words) {
  write(WORDS_KEY, words);
}

export async function loadMeta() {
  return read(META_KEY, DEFAULT_META);
}

export async function persistMeta(meta) {
  write(META_KEY, meta);
}
