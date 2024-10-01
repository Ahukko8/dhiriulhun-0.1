import React from "react";
import { View, Text, Image, ScrollView, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";

const about = () => {
  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <ScrollView>
        <StatusBar style="dark" />
        <View className="items-center mb-6">
          {/* <Image
            source={{ uri: "https://example.com/logo.png" }} // Replace with your logo URL
            className="w-32 h-32 rounded-full"
            resizeMode="contain"
          /> */}
          <Text className="text-xl font-dhivehiContent text-gray-800 mt-2">
            ދިރިއުޅުން
          </Text>
          <Text className="text-lg text-gray-600 mt-1">Arixs Pvt Ltd</Text>
        </View>
        <Text className="text-xl font-semibold font-dhivehi text-gray-800 mb-2">
          އަހަރެމެންނަކީ
        </Text>
        <Text className="text-base text-gray-700 mb-4 font-dhivehiContent leading-relaxed">
          މި އެޕްލިކޭޝަންއަކީ އިސްލާމީ ދިރިއުޅުމަކަށް އަހުލުވެރިކުރުމުގެ
          މަޤްޞަދުގައި " އޭރިކްސް ޕްރައިވެޓް ލިމިޓަޑް " އިން އުފައްދާފައިވާ
          އެޕްލިކޭޝަންއެކެވެ.
        </Text>
        <Text className="text-xl font-semibold text-gray-800 mb-2">
          Features
        </Text>
        <Text className="text-base text-gray-700 mb-4">
          - User-friendly interface
          {"\n"}- Secure and reliable services
          {"\n"}- 24/7 customer support
          {"\n"}- Regular updates and improvements
        </Text>
        <Text className="text-xl font-semibold text-gray-800 mb-2">
          Contact Us
        </Text>
        <Text className="text-base text-gray-700">
          For inquiries, please reach out to us at:
          {"\n"}support@arixs.com
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default about;
