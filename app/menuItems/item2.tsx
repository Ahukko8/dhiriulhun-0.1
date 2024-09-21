import React, { useEffect, useState } from "react";
import { Pressable, SafeAreaView, Text } from "react-native";
import { MenuDetails } from "@/components/menuDetails";
import { fajrImageMap } from "@/constants/imageMap";
import { useMultiAudio } from "@/hooks/audio";
import { audioSources } from "@/constants/audioData/audioSource";
import { useNavigation } from "expo-router";
import { fajrFooterTexts } from "@/constants/footerTexts";
import useProgressStore from "@/state/progressStore";
import ModalChecklist from "@/components/ModalChecklist";
import { fajrChecklistItems } from "@/constants/checklistItems";

const Item2 = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { progress, updateProgress } = useProgressStore();
  const handleSubmit = (checkedItems: Record<string, boolean>) => {
    updateProgress("ފަތިސް ނަމާދު", checkedItems);
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
    <SafeAreaView className="flex-1">
      <MenuDetails
        title="ފަތިސް ނަމާދު"
        imageMap={fajrImageMap}
        footerTexts={fajrFooterTexts}
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
        <Text className="text-white font-dhivehi text-center">ޗެކްލިސްޓް</Text>
      </Pressable>
      <ModalChecklist
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        items={fajrChecklistItems}
        title="ފަތިސް ނަމާދު ޗެކްލިސްޓް"
        onSubmit={handleSubmit}
        initialCheckedItems={progress["item2"]}
      />
    </SafeAreaView>
  );
};

export default Item2;
