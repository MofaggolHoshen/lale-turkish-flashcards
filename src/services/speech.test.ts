import { describe, expect, it, vi } from "vitest";

import {
  cancelSpeech,
  cycleSpeechRate,
  getSpeechRate,
  speakWithProgress,
  subscribeSpeechRate,
} from "./speech";

describe("speech rate", () => {
  it("starts slower, cycles through supported rates, and notifies subscribers", () => {
    expect(getSpeechRate()).toBe(0.75);
    const listener = vi.fn();
    const unsubscribe = subscribeSpeechRate(listener);

    expect([
      cycleSpeechRate(),
      cycleSpeechRate(),
      cycleSpeechRate(),
      cycleSpeechRate(),
      cycleSpeechRate(),
    ]).toEqual([0.9, 1, 1.25, 0.6, 0.75]);
    unsubscribe();

    expect(listener).toHaveBeenCalledTimes(5);
  });
});

describe("speech progress", () => {
  it("reports word boundaries and resolves when speech ends", async () => {
    class MockUtterance {
      lang = "";
      rate = 1;
      onboundary: ((event: SpeechSynthesisEvent) => void) | null = null;
      onend: (() => void) | null = null;
      onerror: ((event: SpeechSynthesisErrorEvent) => void) | null = null;
    }

    let activeUtterance: MockUtterance | undefined;
    const synthesis = {
      speaking: false,
      pending: false,
      paused: false,
      cancel: vi.fn(),
      resume: vi.fn(),
      speak: vi.fn((utterance: MockUtterance) => {
        activeUtterance = utterance;
      }),
    };

    const originalSpeechSynthesis = Object.getOwnPropertyDescriptor(
      window,
      "speechSynthesis",
    );
    vi.stubGlobal("SpeechSynthesisUtterance", MockUtterance);
    Object.defineProperty(window, "speechSynthesis", {
      configurable: true,
      value: synthesis,
    });

    const onBoundary = vi.fn();
    const result = speakWithProgress("Merhaba dünya", "tr-TR", onBoundary);
    activeUtterance?.onboundary?.({ charIndex: 8 } as SpeechSynthesisEvent);
    activeUtterance?.onend?.();

    expect(onBoundary).toHaveBeenCalledWith(8);
    await expect(result).resolves.toBe(true);

    cancelSpeech();
    if (originalSpeechSynthesis) {
      Object.defineProperty(window, "speechSynthesis", originalSpeechSynthesis);
    } else {
      Reflect.deleteProperty(window, "speechSynthesis");
    }
    vi.unstubAllGlobals();
  });
});
