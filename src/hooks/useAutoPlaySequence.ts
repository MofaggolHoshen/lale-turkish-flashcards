import { useState, useEffect, useRef } from "react";
import { speakSequence } from "../services/speech";

interface UseAutoPlaySequenceReturn {
  isPlaying: boolean;
  play: () => void;
  stop: () => void;
}

/**
 * Custom hook for managing auto-play pronunciation sequences (English → Turkish).
 * Repeats the sequence indefinitely until stop() is called.
 */
export function useAutoPlaySequence(
  enText: string,
  trText: string,
): UseAutoPlaySequenceReturn {
  const [isPlaying, setIsPlaying] = useState(false);
  const playingRef = useRef(false);
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
    if (playingRef.current) return;

    playingRef.current = true;
    setIsPlaying(true);

    const playSequence = async () => {
      if (!playingRef.current) return;

      try {
        // Play the sequence (English → pause → Turkish)
        await speakSequence(enText, trText);

        // If still playing, schedule next sequence (repeat)
        if (playingRef.current) {
          sequenceIntervalRef.current = setTimeout(playSequence, 500);
        }
      } catch (error) {
        console.error("Error in autoplay sequence:", error);
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
  };
}
