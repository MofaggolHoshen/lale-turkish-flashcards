import { describe, expect, it, vi } from "vitest";

import {
  cycleSpeechRate,
  getSpeechRate,
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
