export function speak(text: string, lang = "tr-TR"): void {
  try {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  } catch (error) {
    console.error("speech failed", error);
  }
}

/**
 * Plays English text followed by Turkish text with a pause in between.
 * Returns a Promise that resolves when the sequence is complete.
 */
export async function speakSequence(
  enText: string,
  trText: string,
): Promise<void> {
  return new Promise((resolve) => {
    try {
      if (!("speechSynthesis" in window)) {
        resolve();
        return;
      }

      window.speechSynthesis.cancel();

      // Speak English
      const enUtterance = new SpeechSynthesisUtterance(enText);
      enUtterance.lang = "en-US";
      enUtterance.rate = 0.9;

      // Speak Turkish after English + pause
      enUtterance.onend = () => {
        setTimeout(() => {
          const trUtterance = new SpeechSynthesisUtterance(trText);
          trUtterance.lang = "tr-TR";
          trUtterance.rate = 0.9;
          trUtterance.onend = () => resolve();
          window.speechSynthesis.speak(trUtterance);
        }, 500); // 500ms pause between English and Turkish
      };

      window.speechSynthesis.speak(enUtterance);
    } catch (error) {
      console.error("speech sequence failed", error);
      resolve();
    }
  });
}
