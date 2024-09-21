import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, Pressable } from "react-native";
import { MenuDetails } from "@/components/menuDetails";
import { dhuhaImageMap } from "@/constants/imageMap";
import { useMultiAudio } from "@/hooks/audio";
import { audioSources } from "@/constants/audioData/audioSource";
import { useNavigation } from "expo-router";
import { dhuhaFooterTexts } from "@/constants/footerTexts";
import ModalChecklist from "@/components/ModalChecklist";
import useProgressStore from "@/state/progressStore";
import { dhuhaChecklistItems } from "@/constants/checklistItems";

const Item4: React.FC = () => {
  const {
    isPlaying,
    isLoaded,
    playPause,
    playAudioForIndex,
    currentIndex,
    unloadAllAudios,
  } = useMultiAudio(audioSources);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const { progress, updateProgress } = useProgressStore();

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      unloadAllAudios();
    });
    return unsubscribe;
  }, [navigation, unloadAllAudios]);

  const handleSubmit = (checkedItems: Record<string, boolean>) => {
    updateProgress("ޟުޙާ ނަމާދު", checkedItems);
  };

  return (
    <SafeAreaView className="flex-1">
      <MenuDetails
        title="ޞުޙާ ނަމާދު"
        imageMap={dhuhaImageMap}
        footerTexts={dhuhaFooterTexts}
        onPlayPauseSound={playPause}
        onIndexChange={playAudioForIndex}
        isPlaying={isPlaying}
        isAudioLoaded={isLoaded}
        currentIndex={currentIndex}
      />
      <Pressable
        onPress={() => setModalVisible(true)}
        className="bg-blue-500 p-4 m-10 rounded active:bg-blue-500/80"
      >
        <Text className="text-white text-center">ޗެކްލިސްޓް</Text>
      </Pressable>
      <ModalChecklist
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        items={dhuhaChecklistItems}
        title="ޟުޙާ ނަމާދު ޗެކްލިސްޓް"
        onSubmit={handleSubmit}
        initialCheckedItems={progress["item4"]}
      />
    </SafeAreaView>
  );
};

export default Item4;
