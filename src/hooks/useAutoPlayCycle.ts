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
 * Includes Wake Lock API to keep screen on during playback and Media Session for lock screen controls.
 */
export function useAutoPlayCycle(
  wordPairs: Array<[string, string]>, // Array of [english, turkish] pairs
): UseAutoPlayCycleReturn {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const playingRef = useRef(false);
  const currentIndexRef = useRef(0); // Track index for closure
  const sequenceIntervalRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const wakeLockRef = useRef<any>(null); // WakeLockSentinel type
  const wasPlayingRef = useRef(false); // Track if was playing before background

  const releaseWakeLock = async () => {
    if (wakeLockRef.current) {
      try {
        await wakeLockRef.current.release();
        wakeLockRef.current = null;
      } catch (error) {
        console.error("Error releasing wake lock:", error);
      }
    }
  };

  const requestWakeLock = async () => {
    if (!("wakeLock" in navigator)) return; // Not supported on this browser
    try {
      wakeLockRef.current = await navigator.wakeLock.request("screen");
    } catch (error) {
      console.error("Wake Lock error:", error);
    }
  };

  const setupMediaSession = () => {
    if (!("mediaSession" in navigator)) return;

    navigator.mediaSession.metadata = new MediaMetadata({
      title: "Turkish Flashcards",
      artist: "Lale",
      artwork: [
        {
          src: "/tulip.png",
          sizes: "96x96",
          type: "image/png",
        },
      ],
    });

    navigator.mediaSession.setActionHandler("play", () => {
      if (!playingRef.current) play();
    });

    navigator.mediaSession.setActionHandler("pause", () => {
      if (playingRef.current) stop();
    });
  };

  const stop = () => {
    playingRef.current = false;
    wasPlayingRef.current = false;
    setIsPlaying(false);
    if (sequenceIntervalRef.current) {
      clearTimeout(sequenceIntervalRef.current);
      sequenceIntervalRef.current = null;
    }
    // Cancel any ongoing speech
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    // Release wake lock when stopped
    releaseWakeLock();
    // Update media session state
    if ("mediaSession" in navigator) {
      navigator.mediaSession.playbackState = "paused";
    }
  };

  const play = async () => {
    if (playingRef.current || wordPairs.length === 0) return;

    playingRef.current = true;
    wasPlayingRef.current = true;
    setIsPlaying(true);
    currentIndexRef.current = 0;
    setCurrentIndex(0);

    // Request wake lock to keep screen on
    await requestWakeLock();

    // Setup media session for lock screen controls
    setupMediaSession();

    // Update media session state
    if ("mediaSession" in navigator) {
      navigator.mediaSession.playbackState = "playing";
    }

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

  // Handle visibility change (screen lock/app background)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // App is backgrounded/screen locked
        wasPlayingRef.current = playingRef.current;
        // Don't stop playback, just pause speech synthesis
        if ("speechSynthesis" in window) {
          window.speechSynthesis.pause();
        }
      } else {
        // App is visible again
        if (wasPlayingRef.current && playingRef.current) {
          // Resume speech synthesis
          if ("speechSynthesis" in window) {
            window.speechSynthesis.resume();
          }
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      releaseWakeLock();
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
