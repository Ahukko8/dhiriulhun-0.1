import { useState, useEffect, useCallback } from "react";
import { Audio } from "expo-av";

interface AudioItem {
  source: any;
  sound?: Audio.Sound;
}

export const useMultiAudio = (audioSources: any[]) => {
  const [audioItems, setAudioItems] = useState<AudioItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadAudios();
    return () => {
      unloadAllAudios();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadAudios = async () => {
    try {
      const loadedItems = await Promise.all(
        audioSources.map(async (source) => {
          const { sound } = await Audio.Sound.createAsync(source, {
            shouldPlay: false,
          });
          return { source, sound };
        }),
      );
      setAudioItems(loadedItems);
      setIsLoaded(true);
    } catch (error) {
      console.error("Error loading audio:", error);
    }
  };

  const unloadAllAudios = useCallback(async () => {
    for (const item of audioItems) {
      if (item.sound) {
        await item.sound.unloadAsync();
      }
    }
    setIsPlaying(false);
  }, [audioItems]);

  const playPause = async () => {
    if (!audioItems[currentIndex]?.sound) return;

    if (isPlaying) {
      await audioItems[currentIndex].sound!.pauseAsync();
    } else {
      await audioItems[currentIndex].sound!.replayAsync(); // Restart from the beginning
    }
    setIsPlaying(!isPlaying);
  };

  const stop = async () => {
    if (!audioItems[currentIndex]?.sound) return;
    await audioItems[currentIndex].sound!.stopAsync();
    await audioItems[currentIndex].sound!.setPositionAsync(0); // Reset to the beginning
    setIsPlaying(false);
  };

  const playAudioForIndex = async (index: number) => {
    if (currentIndex !== index) {
      await stop();
      setCurrentIndex(index);
    }
  };

  return {
    isPlaying,
    isLoaded,
    playPause,
    playAudioForIndex,
    currentIndex,
    unloadAllAudios,
  };
};
