import React from "react";
import { View, Text } from "react-native";
import Progress from "@/components/Progress";

const ProgressScreen: React.FC = () => {
  return (
    <View className="flex-1 bg-white">
      <Text className="text-2xl p-4 font-dhivehiContent text-center">
        ޕްރޮގްރެސް
      </Text>
      <Progress />
    </View>
  );
};

export default ProgressScreen;
