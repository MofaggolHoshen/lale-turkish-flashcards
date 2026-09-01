import { useState, useEffect, useRef } from "react";
import { speakSequence } from "../services/speech";

interface UseAutoPlayCycleReturn {
  isPlaying: boolean;
  play: () => void;
  stop: () => void;
  currentIndex: number;
}

/**
 * Custom hook for cycling through multiple word pairs.
 * Plays each word pair sequentially, then repeats from the beginning.
 */
export function useAutoPlayCycle(
  wordPairs: Array<[string, string]>, // Array of [english, turkish] pairs
): UseAutoPlayCycleReturn {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const playingRef = useRef(false);
  const currentIndexRef = useRef(0); // Track index for closure
  const sequenceIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const stop = () => {
    playingRef.current = false;
    setIsPlaying(false);
    if (sequenceIntervalRef.current) {
      clearTimeout(sequenceIntervalRef.current);
      sequenceIntervalRef.current = null;
    }
    // Cancel any ongoing speech
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  const play = async () => {
    if (playingRef.current || wordPairs.length === 0) return;

    playingRef.current = true;
    setIsPlaying(true);
    currentIndexRef.current = 0;
    setCurrentIndex(0);

    const playSequence = async () => {
      if (!playingRef.current || wordPairs.length === 0) return;

      try {
        const [enText, trText] = wordPairs[currentIndexRef.current];

        // Play the sequence (English → pause → Turkish)
        await speakSequence(enText, trText);

        // If still playing, move to next word
        if (playingRef.current) {
          currentIndexRef.current =
            (currentIndexRef.current + 1) % wordPairs.length;
          setCurrentIndex(currentIndexRef.current);

          // Schedule next word with a small delay
          sequenceIntervalRef.current = setTimeout(playSequence, 500);
        }
      } catch (error) {
        console.error("Error in autoplay cycle:", error);
        stop();
      }
    };

    playSequence();
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stop();
    };
  }, []);

  return {
    isPlaying,
    play,
    stop,
    currentIndex,
  };
}
