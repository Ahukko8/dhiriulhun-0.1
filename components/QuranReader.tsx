/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
// import React, { useState } from "react";
// import { View, Text, Pressable, ScrollView, SafeAreaView } from "react-native";
// import quran from "quran-json";
// import { AntDesign } from "@expo/vector-icons";
// import { router } from "expo-router";

// type Surah = "ސޫރަތުލް މުލްކް" | "ސޫރަތުލް ޔާސީން" | "ސޫރަތުލް ކަހަފް";

// interface QuranSurah {
//   id: number;
//   name: string;
//   transliteration: string;
//   translation: string;
//   type: string;
//   total_verses: number;
//   link: string;
// }

// interface Header {
//   onPlayPauseSound: (index: number) => void;
//   onIndexChange: (index: number) => void;
//   isPlaying: boolean;
//   isAudioLoaded: boolean;
//   currentIndex: number;
// }

// const surahNumbers: Record<Surah, number> = {
//   "ސޫރަތުލް މުލްކް": 67,
//   "ސޫރަތުލް ޔާސީން": 36,
//   "ސޫރަތުލް ކަހަފް": 18,
// };

// const QuranReader: React.FC<Header> = ({
//   onPlayPauseSound,
//   onIndexChange,
//   isPlaying,
//   isAudioLoaded,
//   currentIndex,
// }) => {
//   const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);

//   const getSurahText = async (surah: Surah) => {
//     const surahNumber = surahNumbers[surah];
//     const surahData = quran.find((s: QuranSurah) => s.id === surahNumber);

//     if (surahData) {
//       try {
//         const response = await fetch(surahData.link);
//         if (!response.ok) {
//           throw new Error("Failed to fetch surah data");
//         }
//         const surahContent = await response.json();
//         return surahContent.verses
//           .map(
//             (verse: { id: number; text: string }) =>
//               `${verse.id}. ${verse.text}`
//           )
//           .join("\n\n");
//       } catch (error) {
//         console.error("Error fetching surah data:", error);
//         return "Failed to load surah text. Please try again later.";
//       }
//     }
//     return "Surah not found";
//   };

//   const [surahText, setSurahText] = useState<string>("");

//   const handleSurahSelection = (surah: Surah, index: number) => {
//     setSelectedSurah(surah);
//     getSurahText(surah).then(setSurahText);
//     onIndexChange(index);
//   };

//   return (
//     <SafeAreaView className="flex-1">
//       <View className="bg-[#3498db] flex-row items-center justify-center pt-5 px-4 h-20">
//         <Pressable
//           onPress={() => router.back()}
//           className=" absolute left-4 z-10"
//         >
//           <AntDesign name="leftcircle" size={20} color="white" />
//         </Pressable>
//         <Text className="text-lg text-center text-white font-dhivehi">
//           ޤުރްއާން ކިޔެވުން
//         </Text>
//         {isAudioLoaded && (
//           <Pressable
//             onPress={() => onPlayPauseSound(currentIndex)}
//             className="absolute right-4 z-10"
//           >
//             <AntDesign
//               name={isPlaying ? "pausecircle" : "playcircleo"}
//               size={30}
//               color="white"
//             />
//           </Pressable>
//         )}
//       </View>
//       <View className="flex-row  justify-around my-4">
//         {["ސޫރަތުލް މުލްކް", "ސޫރަތުލް ޔާސީން", "ސޫރަތުލް ކަހަފް"].map(
//           (surah, index) => (
//             <Pressable
//               key={surah}
//               onPress={() => handleSurahSelection(surah as Surah, index)}
//               className={`bg-[#3498db] p-4 rounded shadow ${
//                 selectedSurah === surah ? "bg-[#3498db]/75" : ""
//               }`}
//             >
//               <Text className="text-white font-dhivehi text-center">
//                 {surah}
//               </Text>
//             </Pressable>
//           )
//         )}
//       </View>

//       {selectedSurah && (
//         <ScrollView className="flex-1 px-4">
//           <Text className="font-arabNext text-center text-2xl mb-5">
//             بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
//           </Text>
//           <Text className="text-3xl text-right font-arabNext">{surahText}</Text>
//         </ScrollView>
//       )}
//     </SafeAreaView>
//   );
// };

// export default QuranReader;

import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  Animated,
  Dimensions,
} from "react-native";
import quran from "quran-json";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import ModalChecklist from "@/components/ModalChecklist";
import "nativewind";

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

interface ProgressItem {
  checkedItems: Record<string, boolean>;
  totalItems: number;
  timestamp: number;
}

interface QuranReaderProps {
  onPlayPauseSound: (index: number) => void;
  onIndexChange: (index: number) => void;
  isPlaying: boolean;
  isAudioLoaded: boolean;
  currentIndex: number;
  quranChecklistItems: { id: string; text: string }[];
  progress: Record<string, ProgressItem>;
  updateProgress: (
    itemId: string,
    checkedItems: Record<string, boolean>,
    totalItems: number
  ) => void;
}

const surahNumbers: Record<Surah, number> = {
  "ސޫރަތުލް މުލްކް": 67,
  "ސޫރަތުލް ޔާސީން": 36,
  "ސޫރަތުލް ކަހަފް": 18,
};

const { height } = Dimensions.get("window");
const HEADER_HEIGHT = 80;
const SURAH_SELECTION_HEIGHT = 80;
const CHECKLIST_BUTTON_HEIGHT = 60;
const SCROLL_THRESHOLD = 50;

const QuranReader: React.FC<QuranReaderProps> = ({
  onPlayPauseSound,
  onIndexChange,
  isPlaying,
  isAudioLoaded,
  currentIndex,
  quranChecklistItems,
  progress,
  updateProgress,
}) => {
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [surahText, setSurahText] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);
  const isScrollingDown = useRef(false);

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT + SURAH_SELECTION_HEIGHT],
    outputRange: [0, -(HEADER_HEIGHT + SURAH_SELECTION_HEIGHT)],
    extrapolate: "clamp",
  });

  const checklistButtonTranslateY = scrollY.interpolate({
    inputRange: [0, height - CHECKLIST_BUTTON_HEIGHT],
    outputRange: [0, CHECKLIST_BUTTON_HEIGHT],
    extrapolate: "clamp",
  });

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
              `${verse.id}. ${verse.text}`
          )
          .join("\n\n");
      } catch (error) {
        console.error("Error fetching surah data:", error);
        return "Failed to load surah text. Please try again later.";
      }
    }
    return "Surah not found";
  };

  const handleSurahSelection = (surah: Surah, index: number) => {
    setSelectedSurah(surah);
    getSurahText(surah).then(setSurahText);
    onIndexChange(index);
  };

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true }
  );

  const handleScrollEndDrag = (event: any) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    if (Math.abs(currentScrollY - lastScrollY.current) > SCROLL_THRESHOLD) {
      isScrollingDown.current = currentScrollY > lastScrollY.current;
    }
    lastScrollY.current = currentScrollY;

    if (!isScrollingDown.current || currentScrollY <= 0) {
      Animated.spring(scrollY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleSubmit = (checkedItems: Record<string, boolean>) => {
    updateProgress(
      "ޤުރްއާން ކިޔެވުން",
      checkedItems,
      quranChecklistItems.length
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#3498db]/20">
      <Animated.View
        style={{ transform: [{ translateY: headerTranslateY }] }}
        className="absolute top-0 left-0 right-0 z-10"
      >
        <View className="bg-[#3498db] flex-row items-center justify-center pt-5 px-4 h-20">
          <Pressable
            onPress={() => router.back()}
            className="absolute left-4 z-10"
          >
            <AntDesign name="leftcircle" size={20} color="white" />
          </Pressable>
          <Text className="text-lg text-white font-dhivehi">
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
                color="white"
              />
            </Pressable>
          )}
        </View>

        <View className="flex-row justify-around my-4">
          {["ސޫރަތުލް މުލްކް", "ސޫރަތުލް ޔާސީން", "ސޫރަތުލް ކަހަފް"].map(
            (surah, index) => (
              <Pressable
                key={surah}
                onPress={() => handleSurahSelection(surah as Surah, index)}
                className={`${
                  selectedSurah === surah ? "bg-[#3498db]/75" : "bg-[#3498db]"
                } p-4 rounded-lg shadow-md`}
              >
                <Text className="text-white font-dhivehi text-center">
                  {surah}
                </Text>
              </Pressable>
            )
          )}
        </View>
      </Animated.View>

      <Animated.ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingTop: HEADER_HEIGHT + SURAH_SELECTION_HEIGHT,
          paddingHorizontal: 16,
        }}
        onScroll={handleScroll}
        onScrollEndDrag={handleScrollEndDrag}
        scrollEventThrottle={16}
      >
        {selectedSurah && (
          <>
            <Text className="font-arabQuran text-2xl text-center mb-5">
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
            </Text>
            <Text className="font-arabQuran text-xl p-5 text-right">
              {surahText}
            </Text>
          </>
        )}
      </Animated.ScrollView>

      <Animated.View
        style={{ transform: [{ translateY: checklistButtonTranslateY }] }}
        className="absolute bottom-5 left-0 right-0 items-center"
      >
        <Pressable
          onPress={() => setModalVisible(true)}
          className="bg-[#3498db] active:bg-[#3498db]/80 py-4 px-10 rounded-full"
        >
          <Text className="text-white font-dhivehi text-center">
            ޗެކްލިސްޓް
          </Text>
        </Pressable>
      </Animated.View>

      <ModalChecklist
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        items={quranChecklistItems}
        title="ޤުރްއާން ކިޔެވުން ޗެކްލިސްޓް"
        onSubmit={handleSubmit}
        initialCheckedItems={progress["ޤުރްއާން ކިޔެވުން"]?.checkedItems || {}}
      />
    </SafeAreaView>
  );
};

export default QuranReader;
