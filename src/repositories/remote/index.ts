import type { Word, Meta } from "../../types";
import type {
  WordRepository,
  MetaRepository,
  GrammarRepository,
  Repository,
} from "../types";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

class RemoteWordRepository implements WordRepository {
  async getAll(): Promise<Word[]> {
    const res = await fetch(`${API_BASE}/words`);
    if (!res.ok) throw new Error(`Failed to fetch words: ${res.statusText}`);
    return res.json();
  }

  async save(words: Word[]): Promise<void> {
    const res = await fetch(`${API_BASE}/words/bulk`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ words }),
    });
    if (!res.ok) throw new Error(`Failed to save words: ${res.statusText}`);
  }

  async create(word: Omit<Word, "id">): Promise<Word> {
    const res = await fetch(`${API_BASE}/words`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(word),
    });
    if (!res.ok) throw new Error(`Failed to create word: ${res.statusText}`);
    return res.json();
  }

  async update(id: string, updates: Partial<Word>): Promise<Word> {
    const res = await fetch(`${API_BASE}/words/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error(`Failed to update word: ${res.statusText}`);
    return res.json();
  }

  async delete(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/words/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error(`Failed to delete word: ${res.statusText}`);
  }
}

class RemoteMetaRepository implements MetaRepository {
  async get(): Promise<Meta> {
    const res = await fetch(`${API_BASE}/meta`);
    if (!res.ok) throw new Error(`Failed to fetch meta: ${res.statusText}`);
    return res.json();
  }

  async update(updates: Partial<Meta>): Promise<Meta> {
    const res = await fetch(`${API_BASE}/meta`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error(`Failed to update meta: ${res.statusText}`);
    return res.json();
  }
}

class RemoteGrammarRepository implements GrammarRepository {
  async getCompleted(): Promise<Record<string, boolean>> {
    const res = await fetch(`${API_BASE}/grammar/completed`);
    if (!res.ok)
      throw new Error(`Failed to fetch grammar completion: ${res.statusText}`);
    return res.json();
  }

  async markLessonComplete(lessonId: string): Promise<void> {
    const res = await fetch(
      `${API_BASE}/grammar/lessons/${lessonId}/complete`,
      {
        method: "POST",
      },
    );
    if (!res.ok)
      throw new Error(`Failed to mark lesson complete: ${res.statusText}`);
  }

  async markLessonIncomplete(lessonId: string): Promise<void> {
    const res = await fetch(
      `${API_BASE}/grammar/lessons/${lessonId}/complete`,
      {
        method: "DELETE",
      },
    );
    if (!res.ok)
      throw new Error(`Failed to mark lesson incomplete: ${res.statusText}`);
  }
}

export function createRemoteRepository(): Repository {
  return {
    words: new RemoteWordRepository(),
    meta: new RemoteMetaRepository(),
    grammar: new RemoteGrammarRepository(),
  };
}
