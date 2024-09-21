import React from "react";
import { SafeAreaView, View, Pressable, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { hedhunugeZikrArabic } from "@/constants/zikrTexts";
import Swiper from "react-native-swiper";

interface CustomLayoutProps {
  title: string;
  zikrMap: string[];
  footerTexts: string[];
}

export const Zikr: React.FC<CustomLayoutProps> = ({
  title,
  zikrMap,
  footerTexts,
}) => {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row items-center justify-center pt-5 px-4 h-20">
        <Pressable
          onPress={() => router.back()}
          className="absolute left-4 z-10"
        >
          <AntDesign name="arrowleft" size={30} color="black" />
        </Pressable>
        <Text className="text-2xl pt-5 text-center font-dhivehi">{title}</Text>
      </View>
      <Swiper showsPagination={true}>
        {zikrMap.map((source, index) => (
          <View key={index} className="">
            <Text className="mt-20 text-center mx-5 text-2xl font-arabNext">
              {hedhunugeZikrArabic[index] || ""}
            </Text>
            <Text className="mt-6 text-center mx-5 font-dhivehiContent">
              {footerTexts[index] || ""}
            </Text>
          </View>
        ))}
      </Swiper>
    </SafeAreaView>
  );
};
