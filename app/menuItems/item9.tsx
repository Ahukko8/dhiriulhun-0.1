// import React, { useEffect, useState } from "react";
// import { SafeAreaView, Text, Pressable } from "react-native";
// import ModalChecklist from "@/components/ModalChecklist";
// import useProgressStore from "@/state/progressStore";
// import { quranChecklistItems } from "@/constants/checklistItems";
// import QuranReader from "@/components/QuranReader"; // Adjust the import path as needed
// import { useMultiAudio } from "@/hooks/audio";
// import { quranAudioSources } from "@/constants/audioData/audioSource";
// import { useNavigation } from "expo-router";

// const Item9: React.FC = () => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const { progress, updateProgress } = useProgressStore();

//   const handleSubmit = (checkedItems: Record<string, boolean>) => {
//     updateProgress(
//       "ޤުރްއާން ކިޔެވުން",
//       checkedItems,
//       quranChecklistItems.length,
//     );
//   };

//   const {
//     isPlaying,
//     isLoaded,
//     playPause,
//     playAudioForIndex,
//     currentIndex,
//     unloadAllAudios,
//   } = useMultiAudio(quranAudioSources);

//   const navigation = useNavigation();

//   useEffect(() => {
//     const unsubscribe = navigation.addListener("beforeRemove", (e) => {
//       unloadAllAudios();
//     });

//     return unsubscribe;
//   }, [navigation, unloadAllAudios]);

//   return (
//     <SafeAreaView className="flex-1">
//       <QuranReader
//         onPlayPauseSound={playPause}
//         onIndexChange={playAudioForIndex}
//         isPlaying={isPlaying}
//         isAudioLoaded={isLoaded}
//         currentIndex={currentIndex}
//       />

//       <Pressable
//         onPress={() => setModalVisible(true)}
//         className="bg-blue-500 p-4 m-10 rounded active:bg-blue-500/80"
//       >
//         <Text className="text-white font-dhivehi text-center">ޗެކްލިސްޓް</Text>
//       </Pressable>

//       <ModalChecklist
//         isVisible={modalVisible}
//         onClose={() => setModalVisible(false)}
//         items={quranChecklistItems}
//         title="ޤުރްއާން ކިޔެވުން ޗެކްލިސްޓް"
//         onSubmit={handleSubmit}
//         initialCheckedItems={progress["ޤުރްއާން ކިޔެވުން"]?.checkedItems || {}}
//       />
//     </SafeAreaView>
//   );
// };

// export default Item9;
import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, Pressable } from "react-native";
import ModalChecklist from "@/components/ModalChecklist";
import useProgressStore from "@/state/progressStore";
import { quranChecklistItems } from "@/constants/checklistItems";
import QuranReader from "@/components/QuranReader";
import { useMultiAudio } from "@/hooks/audio";
import { quranAudioSources } from "@/constants/audioData/audioSource";
import { useNavigation } from "expo-router";

const Item9: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { progress, updateProgress } = useProgressStore();

  const handleSubmit = (checkedItems: Record<string, boolean>) => {
    updateProgress(
      "ޤުރްއާން ކިޔެވުން",
      checkedItems,
      quranChecklistItems.length,
    );
  };

  const {
    isPlaying,
    isLoaded,
    playPause,
    playAudioForIndex,
    currentIndex,
    unloadAllAudios,
  } = useMultiAudio(quranAudioSources);

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      unloadAllAudios(); // Stop audio when back button is pressed
    });

    return unsubscribe;
  }, [navigation, unloadAllAudios]);

  return (
    <SafeAreaView className="flex-1 bg-[#3498db]/25">
      <QuranReader
        onPlayPauseSound={playPause} // Handle play/pause for the current surah
        onIndexChange={playAudioForIndex} // Play the corresponding surah
        isPlaying={isPlaying}
        isAudioLoaded={isLoaded}
        currentIndex={currentIndex}
      />

      <Pressable
        onPress={() => setModalVisible(true)}
        className="bg-[#3498db] p-4 m-10 rounded-3xl active:bg-[#3498db]/80"
      >
        <Text className="text-white font-dhivehi text-center">ޗެކްލިސްޓް</Text>
      </Pressable>

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

export default Item9;
