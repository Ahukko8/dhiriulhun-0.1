import React, { useState } from "react";
import { Pressable, SafeAreaView, Text } from "react-native";
import { Zikr } from "@/components/Zikr";
import { haveeruFooterTexts } from "@/constants/footerTexts";
import { haveerugeZikrArabic } from "@/constants/zikrTexts";
import ModalChecklist from "@/components/ModalChecklist";
import { dhikrChecklistItems } from "@/constants/checklistItems";
import useProgressStore from "@/state/progressStore";

const Item7 = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { progress, updateProgress } = useProgressStore();
  const handleSubmit = (checkedItems: Record<string, boolean>) => {
    updateProgress("ހަވީރުގެ ޛިކުރު", checkedItems, dhikrChecklistItems.length);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#3498db]/25">
      <Zikr
        title="ހަވީރުގެ ޛިކުރު"
        zikrMap={haveerugeZikrArabic}
        footerTexts={haveeruFooterTexts}
      />
      <Pressable
        onPress={() => setModalVisible(true)}
        className="bg-[#3498db] p-4 m-10 rounded-3xl active:bg-[#3498db]/80"
      >
        <Text className="text-white text-center">ޗެކްލިސްޓް</Text>
      </Pressable>
      <ModalChecklist
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        items={dhikrChecklistItems}
        title="ހަވީރުގެ ޛިކުރު ޗެކްލިސްޓް"
        onSubmit={handleSubmit}
        initialCheckedItems={progress["ހަވީރުގެ ޛިކުރު"]?.checkedItems || {}}
      />
    </SafeAreaView>
  );
};
export default Item7;
