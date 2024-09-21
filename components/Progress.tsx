import React from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import useProgressStore from "../state/progressStore";

interface ProgressItemProps {
  itemId: string;
  checkedItems: Record<string, boolean>;
}

const ProgressItem: React.FC<ProgressItemProps> = ({
  itemId,
  checkedItems,
}) => {
  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalCount = Object.keys(checkedItems).length;

  return (
    <View className="p-4 border-b border-gray-200">
      <Text className="font-dhivehiContent">{itemId}</Text>
      <Text className="font-dhivehiContent">{`ފުރިހަމަކޮށްފި: ${completedCount}/${totalCount}`}</Text>
    </View>
  );
};

const Progress: React.FC = () => {
  const { progress, resetProgress } = useProgressStore();

  return (
    <View className="flex-1">
      <Text className="text-2xl font-dhivehi p-4">ތަފްސީލް</Text>
      <FlatList
        data={Object.entries(progress)}
        renderItem={({ item: [itemId, checkedItems] }) => (
          <ProgressItem itemId={itemId} checkedItems={checkedItems} />
        )}
        keyExtractor={([itemId]) => itemId}
      />
      {/* Reset Progress Button */}
      <Pressable
        onPress={resetProgress}
        className="bg-blue-500 active:bg-blue-400 p-4 m-10 rounded"
      >
        <Text className="text-white font-dhivehi text-center">ރީސެޓްކުރޭ</Text>
      </Pressable>
    </View>
  );
};

export default Progress;
