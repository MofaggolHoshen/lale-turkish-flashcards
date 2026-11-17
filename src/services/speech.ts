const speechRates = [0.6, 0.75, 0.9, 1, 1.25] as const;
let speechRate: (typeof speechRates)[number] = 0.75;
const speechRateListeners = new Set<() => void>();

let activeUtterance: SpeechSynthesisUtterance | null = null;
let finishActiveUtterance: (() => void) | null = null;
let speechSession = 0;

export function getSpeechRate(): number {
  return speechRate;
}

export function subscribeSpeechRate(listener: () => void): () => void {
  speechRateListeners.add(listener);
  return () => speechRateListeners.delete(listener);
}

export function cycleSpeechRate(): number {
  const currentIndex = speechRates.indexOf(
    speechRate as (typeof speechRates)[number],
  );
  speechRate = speechRates[(currentIndex + 1) % speechRates.length];
  if (activeUtterance) activeUtterance.rate = speechRate;
  speechRateListeners.forEach((listener) => listener());
  return speechRate;
}

function getSpeechSynthesis(): SpeechSynthesis | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return null;
  }
  return window.speechSynthesis;
}

export function cancelSpeech(): void {
  const synthesis = getSpeechSynthesis();
  speechSession += 1;
  activeUtterance = null;
  const finish = finishActiveUtterance;
  finishActiveUtterance = null;
  synthesis?.cancel();
  finish?.();
}

function speakUtterance(
  synthesis: SpeechSynthesis,
  text: string,
  lang: string,
  session: number,
): Promise<void> {
  if (!text.trim() || session !== speechSession) return Promise.resolve();

  return new Promise((resolve) => {
    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = speechRate;
      activeUtterance = utterance;

      const finish = () => {
        if (activeUtterance === utterance) {
          activeUtterance = null;
          finishActiveUtterance = null;
        }
        resolve();
      };
      finishActiveUtterance = finish;
      utterance.onend = finish;
      utterance.onerror = (event) => {
        if (event.error !== "interrupted" && event.error !== "canceled") {
          console.error("speech failed", event.error);
        }
        finish();
      };

      synthesis.resume();
      synthesis.speak(utterance);
    } catch (error) {
      activeUtterance = null;
      finishActiveUtterance = null;
      console.error("speech failed", error);
      resolve();
    }
  });
}

export function speak(text: string, lang = "tr-TR"): void {
  const synthesis = getSpeechSynthesis();
  if (!synthesis || !text.trim()) return;

  if (
    activeUtterance ||
    synthesis.speaking ||
    synthesis.pending ||
    synthesis.paused
  ) {
    cancelSpeech();
  }
  void speakUtterance(synthesis, text, lang, speechSession);
}

/**
 * Plays English text followed by Turkish text with a pause in between.
 * Returns a Promise that resolves when the sequence is complete.
 */
export async function speakSequence(
  enText: string,
  trText: string,
): Promise<void> {
  const synthesis = getSpeechSynthesis();
  if (!synthesis) return;

  cancelSpeech();
  const session = speechSession;
  try {
    await speakUtterance(synthesis, enText, "en-US", session);
    await new Promise((resolve) => setTimeout(resolve, 500));
    await speakUtterance(synthesis, trText, "tr-TR", session);
  } catch (error) {
    console.error("speech sequence failed", error);
  }
}
