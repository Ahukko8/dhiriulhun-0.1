import { Pressable, SafeAreaView, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { MenuDetails } from "@/components/menuDetails";
import useProgressStore from "@/state/progressStore";
import { useMultiAudio } from "@/hooks/audio";
import { useNavigation } from "expo-router";
import ModalChecklist from "@/components/ModalChecklist";
import { maghribImageMap } from "@/constants/imageMap";
import { audioSources } from "@/constants/audioData/audioSource";
import { maqribFooterTexts } from "@/constants/footerTexts";
import { maqribChecklistItems } from "@/constants/checklistItems";

const Item8 = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { progress, updateProgress } = useProgressStore();
  const handleSubmit = (checkedItems: Record<string, boolean>) => {
    updateProgress(
      "މަޣްރިބް ނަމާދު",
      checkedItems,
      maqribChecklistItems.length,
    );
  };
  const {
    isPlaying,
    isLoaded,
    playPause,
    playAudioForIndex,
    currentIndex,
    unloadAllAudios,
  } = useMultiAudio(audioSources);

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      unloadAllAudios();
    });

    return unsubscribe;
  }, [navigation, unloadAllAudios]);

  return (
    <SafeAreaView className="flex-1 bg-[#3498db]/25">
      <MenuDetails
        title="މަޣްރިބް ނަމާދު"
        imageMap={maghribImageMap}
        footerTexts={maqribFooterTexts}
        onPlayPauseSound={playPause}
        onIndexChange={playAudioForIndex}
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
        items={maqribChecklistItems}
        title="މަޣްރިބް ނަމާދު ޗެކްލިސްޓް"
        onSubmit={handleSubmit}
        initialCheckedItems={progress["މަޣްރިބް ނަމާދު"]?.checkedItems || {}}
      />
    </SafeAreaView>
  );
};

export default Item8;
