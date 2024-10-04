import React, { useState } from "react";
import { Pressable, SafeAreaView, Text } from "react-native";
import { Zikr } from "@/components/Zikr";
import { hedhunuFooterTexts } from "@/constants/footerTexts";
import { hedhunugeZikrArabic } from "@/constants/zikrTexts";
import ModalChecklist from "@/components/ModalChecklist";
import { dhikrChecklistItems } from "@/constants/checklistItems";
import useProgressStore from "@/state/progressStore";

const Item3 = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { progress, updateProgress } = useProgressStore();
  const handleSubmit = (checkedItems: Record<string, boolean>) => {
    updateProgress(
      "ހެނދުނުގެ ޛިކުރު",
      checkedItems,
      dhikrChecklistItems.length,
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#3498db]/25">
      <Zikr
        title="ހެނދުނުގެ ޛިކުރު"
        zikrMap={hedhunugeZikrArabic}
        footerTexts={hedhunuFooterTexts}
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
        title="ހެނދުނުގެ ޛިކުރު ޗެކްލިސްޓް"
        onSubmit={handleSubmit}
        initialCheckedItems={progress["ހެނދުނުގެ ޛިކުރު"]?.checkedItems || {}}
      />
    </SafeAreaView>
  );
};
export default Item3;
