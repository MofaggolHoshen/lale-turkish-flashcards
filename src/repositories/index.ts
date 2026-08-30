import type { Repository } from "./types";
import { createLocalRepository } from "./local";
import { createRemoteRepository } from "./remote";

export type {
  Repository,
  WordRepository,
  MetaRepository,
  GrammarRepository,
} from "./types";

// Use remote API if VITE_USE_API is set to "true"
const USE_REMOTE_API = import.meta.env.VITE_USE_API === "true";

let repositoryInstance: Repository | null = null;

/**
 * Get the singleton repository instance.
 * Uses remote API if VITE_USE_API=true, otherwise uses localStorage.
 */
export function getRepository(): Repository {
  if (!repositoryInstance) {
    repositoryInstance = USE_REMOTE_API
      ? createRemoteRepository()
      : createLocalRepository();
  }
  return repositoryInstance;
}

/**
 * Set a custom repository instance (useful for testing).
 */
export function setRepository(repo: Repository): void {
  repositoryInstance = repo;
}

/**
 * Reset repository to null (useful for testing and switching implementations).
 */
export function resetRepository(): void {
  repositoryInstance = null;
}
