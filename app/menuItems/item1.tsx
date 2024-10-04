import React, { useState } from "react";
import { Pressable, SafeAreaView, Text, View } from "react-native";
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
    console.log("Item1 - Submitting:", {
      checkedItems,
      totalItems: ablutionChecklistItems.length,
    });
    updateProgress("ވުޟޫކުރުން", checkedItems, ablutionChecklistItems.length);
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-[#3498db]/25">
        <AblutionDetails
          title="ވުޟޫކުރުން"
          imageMap={ablutionImageMap}
          footerTexts={ablutionFooterTexts}
        />

        <Pressable
          onPress={() => setModalVisible(true)}
          className="bg-[#3498db] p-4 m-10 rounded-3xl active:bg-[#3498db]/80"
        >
          <Text className="text-white font-dhivehi text-center">
            ޗެކްލިސްޓް
          </Text>
        </Pressable>
        <ModalChecklist
          isVisible={modalVisible}
          onClose={() => setModalVisible(false)}
          items={ablutionChecklistItems}
          title="ވުޟޫކުރުން ޗެކްލިސްޓް"
          onSubmit={handleSubmit}
          initialCheckedItems={progress["ވުޟޫކުރުން"]?.checkedItems || {}}
        />
      </View>
    </SafeAreaView>
  );
};

export default Item1;
