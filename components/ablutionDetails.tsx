import React from "react";
import { SafeAreaView, View, Pressable, Text, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import Swiper from "react-native-swiper";

interface CustomLayoutProps {
  title: string;
  imageMap: { [key: string]: any };
  footerTexts: string[];
}

export const AblutionDetails: React.FC<CustomLayoutProps> = ({
  title,
  imageMap,
  footerTexts,
}) => {
  return (
    <SafeAreaView className="flex-1">
      <View className="bg-[#3498db] flex-row items-center justify-center pt-5 px-4 h-20">
        <Pressable
          onPress={() => router.back()}
          className="absolute left-4 z-10"
        >
          <AntDesign name="leftcircle" size={20} color="white" />
        </Pressable>
        <Text className="text-lg text-center text-white font-dhivehi">
          {title}
        </Text>
      </View>
      <View className="flex-1">
        <Swiper showsPagination={false} loop={false}>
          {Object.entries(imageMap).map(([key, source], index) => (
            <View key={index} className="justify-center items-center px-2">
              <Image
                source={source}
                className="w-full h-3/5 rounded-lg"
                resizeMode="cover"
              />
              <Text className="mt-6 text-center p-2 font-dhivehiContent text-base">
                {footerTexts[index] || ""}
              </Text>
            </View>
          ))}
        </Swiper>
      </View>
    </SafeAreaView>
  );
};
