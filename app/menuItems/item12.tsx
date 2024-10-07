/* eslint-disable prettier/prettier */
import React, { useState, useRef } from "react";
import {
  Pressable,
  SafeAreaView,
  Text,
  View,
  Animated,
  Dimensions,
} from "react-native";
import useProgressStore from "@/state/progressStore";
import { router } from "expo-router";
import ModalChecklist from "@/components/ModalChecklist";

import { jummahFooterTexts } from "@/constants/footerTexts";
import { jummahChecklistItems } from "@/constants/checklistItems";
import { AntDesign } from "@expo/vector-icons";

const { height } = Dimensions.get("window");
const HEADER_HEIGHT = 80;
const CHECKLIST_BUTTON_HEIGHT = 60;
const SCROLL_THRESHOLD = 50;

const Item12 = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { progress, updateProgress } = useProgressStore();
  const scrollY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);
  const isScrollingDown = useRef(false);

  const handleSubmit = (checkedItems: Record<string, boolean>) => {
    updateProgress(
      "ހުކުރު ނަމާދު",
      checkedItems,
      jummahChecklistItems.length
    );
  };

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: "clamp",
  });

  const checklistButtonTranslateY = scrollY.interpolate({
    inputRange: [0, height - CHECKLIST_BUTTON_HEIGHT],
    outputRange: [0, CHECKLIST_BUTTON_HEIGHT],
    extrapolate: "clamp",
  });

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true }
  );

  const handleScrollEndDrag = (event: any) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    if (Math.abs(currentScrollY - lastScrollY.current) > SCROLL_THRESHOLD) {
      isScrollingDown.current = currentScrollY > lastScrollY.current;
    }
    lastScrollY.current = currentScrollY;

    if (!isScrollingDown.current || currentScrollY <= 0) {
      Animated.spring(scrollY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#3498db]/25">
      <Animated.View
        style={{ transform: [{ translateY: headerTranslateY }] }}
        className="absolute top-0 left-0 right-0 z-10"
      >
        <View className="bg-[#3498db] flex-row items-center justify-center pt-5 px-4 h-20">
          <Pressable
            onPress={() => router.back()}
            className="absolute left-4 z-10"
          >
            <AntDesign name="leftcircle" size={20} color="white" />
          </Pressable>
          <Text className="text-lg text-white text-center font-dhivehi">
            ހުކުރު ނަމާދު
          </Text>
        </View>
      </Animated.View>

      <Animated.ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingTop: HEADER_HEIGHT,
          paddingHorizontal: 16,
        }}
        onScroll={handleScroll}
        onScrollEndDrag={handleScrollEndDrag}
        scrollEventThrottle={16}
      >
        <Text className="font-dhivehi text-lg mt-10 mx-2">
          ހުކުރު ދުވަހާއި އަދި ހުކުރު ނަމާދާއި ގުޅުންހުރި ކަންކަން
        </Text>
        <Text className="font-dhivehiContent text-lg text-gray-800 rtl p-1">
          {jummahFooterTexts[0]}
        </Text>
        <Text className="font-dhivehiContent text-lg text-gray-800 rtl p-1">
        {jummahFooterTexts[1]}
        </Text>
        <Text className="font-dhivehiContent text-lg text-gray-800 rtl p-1">
        {jummahFooterTexts[2]}
        </Text>
        <Text className="font-dhivehiContent text-lg text-gray-800 rtl p-1">
        {jummahFooterTexts[3]}
        </Text>
        <Text className="font-dhivehiContent text-lg text-gray-800 rtl p-1">
        {jummahFooterTexts[4]}
        </Text>
        <Text className="font-dhivehiContent text-lg text-gray-800 rtl p-1">
        {jummahFooterTexts[5]}
        </Text>
        <Text className="font-dhivehiContent text-lg text-gray-800 rtl p-1">
        {jummahFooterTexts[6]}
        </Text>
        <Text className="font-dhivehiContent text-lg text-gray-800 rtl p-1">
        {jummahFooterTexts[7]}
        </Text>
        <Text className="font-dhivehiContent text-lg text-gray-800 rtl p-1">
        {jummahFooterTexts[8]}
        </Text>
        <Text className="font-dhivehiContent text-lg text-gray-800 rtl p-1">
        {jummahFooterTexts[9]}
        </Text>
        <Text className="font-dhivehi text-lg mt-10 mx-2">
          ހުކުރު ނަމާދުކުރާނެ ގޮތް
        </Text><Text className="font-dhivehiContent text-lg text-gray-800 rtl p-1 mb-6">
        {jummahFooterTexts[10]}
        </Text>
      </Animated.ScrollView>

      <Animated.View
        style={{ transform: [{ translateY: checklistButtonTranslateY }] }}
        className="absolute bottom-5 left-0 right-0 items-center"
      >
        <Pressable
          onPress={() => setModalVisible(true)}
          className="bg-[#3498db] p-4 rounded-full active:bg-[#3498db]/80"
        >
          <Text className="text-white font-dhivehi text-center">
            ޗެކްލިސްޓް
          </Text>
        </Pressable>
      </Animated.View>

      <ModalChecklist
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        items={jummahChecklistItems}
        title="ހުކުރުގެ ޗެކްލިސްޓް"
        onSubmit={handleSubmit}
        initialCheckedItems={progress["ހުކުރު ނަމާދު"]?.checkedItems || {}}
      />
    </SafeAreaView>
  );
};

export default Item12;
