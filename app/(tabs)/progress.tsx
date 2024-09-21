import React from "react";
import { View, Text } from "react-native";
import Progress from "@/components/Progress";

const ProgressScreen: React.FC = () => {
  return (
    <View className="flex-1">
      <Text className="text-2xl p-4 font-dhivehi text-center">ޕްރޮގްރެސް</Text>
      <Progress />
    </View>
  );
};

export default ProgressScreen;
