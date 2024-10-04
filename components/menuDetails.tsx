// components/menuDetails.tsx
import React from "react";
import { SafeAreaView, View, Pressable, Text, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import Swiper from "react-native-swiper";

interface CustomLayoutProps {
  title: string;
  imageMap: { [key: string]: any };
  footerTexts: string[];
  onPlayPauseSound: () => void;
  onIndexChange: (index: number) => void;
  isPlaying: boolean;
  isAudioLoaded: boolean;
  currentIndex: number;
}

export const MenuDetails: React.FC<CustomLayoutProps> = ({
  title,
  imageMap,
  footerTexts,
  onPlayPauseSound,
  onIndexChange,
  isPlaying,
  isAudioLoaded,
  currentIndex,
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
        <Text className="text-lg text-white text-center font-dhivehi">
          {title}
        </Text>
        {/* {isAudioLoaded && (
          <Pressable
            onPress={onPlayPauseSound}
            className="absolute right-4 z-10"
          >
            <AntDesign
              name={isPlaying ? "pausecircle" : "playcircleo"}
              size={20}
              color="white"
            />
          </Pressable>
        )} */}
      </View>
      <View className="flex-1 mt-5">
        <Swiper
          showsPagination={false}
          onIndexChanged={onIndexChange}
          index={currentIndex}
          loop={false}
        >
          {Object.entries(imageMap).map(([key, source], index) => (
            <View key={index} className="justify-center items-center px-2">
              <Image
                source={source}
                className="w-full h-[30vh] rounded-lg"
                resizeMode="cover"
              />
              <Text className="mt-6 text-right font-dhivehiContent text-base">
                {footerTexts[index] || ""}
              </Text>
            </View>
          ))}
        </Swiper>
      </View>
    </SafeAreaView>
  );
};
