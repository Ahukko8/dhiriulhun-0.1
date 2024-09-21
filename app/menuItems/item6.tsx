import { Pressable, SafeAreaView, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { MenuDetails } from "@/components/menuDetails";
import useProgressStore from "@/state/progressStore";
import { useMultiAudio } from "@/hooks/audio";
import { useNavigation } from "expo-router";
import ModalChecklist from "@/components/ModalChecklist";
import { imageMap } from "@/constants/imageMap";
import { audioSources } from "@/constants/audioData/audioSource";
import { asrFooterTexts } from "@/constants/footerTexts";
import { asrChecklistItems } from "@/constants/checklistItems";

const Item6 = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { progress, updateProgress } = useProgressStore();
  const handleSubmit = (checkedItems: Record<string, boolean>) => {
    updateProgress("ޢަޞްރު ނަމާދު", checkedItems);
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
        title="ޢަޞްރު ނަމާދު"
        imageMap={imageMap}
        footerTexts={asrFooterTexts}
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
        items={asrChecklistItems}
        title="ޢަޞްރު ނަމާދު ޗެކްލިސްޓް"
        onSubmit={handleSubmit}
        initialCheckedItems={progress["item6"]}
      />
    </SafeAreaView>
  );
};

export default Item6;
