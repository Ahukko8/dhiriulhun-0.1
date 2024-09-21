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
    updateProgress("ހަވީރުގެ ޛިކުރު", checkedItems);
  };

  return (
    <SafeAreaView className="flex-1">
      <Zikr
        title="ހަވީރުގެ ޛިކުރު"
        zikrMap={haveerugeZikrArabic}
        footerTexts={haveeruFooterTexts}
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
        items={dhikrChecklistItems}
        title="ހަވީރުގެ ޛިކުރު ޗެކްލިސްޓް"
        onSubmit={handleSubmit}
        initialCheckedItems={progress["item7"]}
      />
    </SafeAreaView>
  );
};
export default Item7;
