import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, SafeAreaView } from "react-native";
import quran from "quran-json";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

type Surah = "ސޫރަތުލް މުލްކް" | "ސޫރަތުލް ޔާސީން" | "ސޫރަތުލް ކަހަފް";

interface QuranSurah {
  id: number;
  name: string;
  transliteration: string;
  translation: string;
  type: string;
  total_verses: number;
  link: string;
}

interface Header {
  onPlayPauseSound: (index: number) => void;
  onIndexChange: (index: number) => void;
  isPlaying: boolean;
  isAudioLoaded: boolean;
  currentIndex: number;
}

const surahNumbers: Record<Surah, number> = {
  "ސޫރަތުލް މުލްކް": 67,
  "ސޫރަތުލް ޔާސީން": 36,
  "ސޫރަތުލް ކަހަފް": 18,
};

const QuranReader: React.FC<Header> = ({
  onPlayPauseSound,
  onIndexChange,
  isPlaying,
  isAudioLoaded,
  currentIndex,
}) => {
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);

  const getSurahText = async (surah: Surah) => {
    const surahNumber = surahNumbers[surah];
    const surahData = quran.find((s: QuranSurah) => s.id === surahNumber);

    if (surahData) {
      try {
        const response = await fetch(surahData.link);
        if (!response.ok) {
          throw new Error("Failed to fetch surah data");
        }
        const surahContent = await response.json();
        return surahContent.verses
          .map(
            (verse: { id: number; text: string }) =>
              `${verse.id}. ${verse.text}`,
          )
          .join("\n\n");
      } catch (error) {
        console.error("Error fetching surah data:", error);
        return "Failed to load surah text. Please try again later.";
      }
    }
    return "Surah not found";
  };

  const [surahText, setSurahText] = useState<string>("");

  const handleSurahSelection = (surah: Surah, index: number) => {
    setSelectedSurah(surah);
    getSurahText(surah).then(setSurahText);
    onIndexChange(index);
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row items-center justify-center pt-5 px-4 h-20">
        <Pressable
          onPress={() => router.back()}
          className="absolute left-4 z-10"
        >
          <AntDesign name="arrowleft" size={30} color="black" />
        </Pressable>
        <Text className="text-2xl pt-5 text-center font-dhivehi">
          ޤުރްއާން ކިޔެވުން
        </Text>
        {isAudioLoaded && (
          <Pressable
            onPress={() => onPlayPauseSound(currentIndex)}
            className="absolute right-4 z-10"
          >
            <AntDesign
              name={isPlaying ? "pausecircle" : "playcircleo"}
              size={30}
              color="black"
            />
          </Pressable>
        )}
      </View>
      <View className="flex-row  justify-around my-4">
        {["ސޫރަތުލް މުލްކް", "ސޫރަތުލް ޔާސީން", "ސޫރަތުލް ކަހަފް"].map(
          (surah, index) => (
            <Pressable
              key={surah}
              onPress={() => handleSurahSelection(surah as Surah, index)}
              className={`bg-[#3498DB] p-4 rounded shadow ${
                selectedSurah === surah ? "bg-[#2980B9]" : ""
              }`}
            >
              <Text className="text-white font-dhivehi text-center">
                {surah}
              </Text>
            </Pressable>
          ),
        )}
      </View>

      {selectedSurah && (
        <ScrollView className="flex-1 px-4">
          <Text className="font-arabNext text-center text-2xl mb-5">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </Text>
          <Text className="text-3xl text-right font-arabNext">{surahText}</Text>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default QuranReader;
