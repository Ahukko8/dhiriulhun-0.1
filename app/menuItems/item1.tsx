import React, { useState } from "react";
import { Pressable, SafeAreaView, Text } from "react-native";
import useProgressStore from "@/state/progressStore";
import ModalChecklist from "@/components/ModalChecklist";
import { ablutionFooterTexts } from "@/constants/footerTexts";
import { ablutionChecklistItems } from "@/constants/checklistItems";
import { ablutionImageMap } from "@/constants/ablutionImageMap";
import { AblutionDetails } from "@/components/ablutionDetails";

const Item1 = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { progress, updateProgress } = useProgressStore();
  const handleSubmit = (checkedItems: Record<string, boolean>) => {
    updateProgress("ވުޟޫކުރުން ", checkedItems);
  };
  return (
    <SafeAreaView className="flex-1">
      <AblutionDetails
        title="ވުޟޫކުރުން"
        imageMap={ablutionImageMap}
        footerTexts={ablutionFooterTexts}
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
        items={ablutionChecklistItems}
        title="ވުޟޫކުރުން ޗެކްލިސްޓް"
        onSubmit={handleSubmit}
        initialCheckedItems={progress["item1"]}
      />
    </SafeAreaView>
  );
};

export default Item1;
