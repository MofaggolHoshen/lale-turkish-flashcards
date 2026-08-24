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
