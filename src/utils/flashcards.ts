export const INTERVAL_DAYS = [0, 1, 3, 7, 14, 30];
export const DAY_MS = 24 * 60 * 60 * 1000;

export const uid = () =>
  Math.random().toString(36).slice(2, 10) + Date.now().toString(36);

export function shuffle<T>(items: T[]): T[] {
  const shuffled = items.slice();
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ];
  }
  return shuffled;
}
