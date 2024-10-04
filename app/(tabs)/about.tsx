import React from "react";
import { View, Text, ScrollView, SafeAreaView, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";

const { height } = Dimensions.get("window");

const Card = ({
  title,
  content,
}: {
  title: string;
  content: React.ReactNode;
}) => (
  <View className="bg-white rounded-2xl shadow-md mb-6 overflow-hidden">
    <View className="bg-[#1DA1F2] p-4">
      <Text className="text-lg  text-white font-dhivehi">{title}</Text>
    </View>
    <View className="p-4 mb-2 bg-gradient-to-b from-indigo-50 to-white">
      {content}
    </View>
  </View>
);

const About = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar style="light" />
      <ScrollView
        className="px-4 py-6 mb-4"
        contentContainerStyle={{ minHeight: height }}
      >
        <View className="mb-8">
          <Text className="text-lg text-slate-800 font-dhivehi text-center">
            ދިރިއުޅުން
          </Text>
          <Text className="text-lg text-slate-800  mt-2 text-center">
            Arixs Pvt Ltd
          </Text>
        </View>

        <Card
          title="އަހަރެމެންނަކީ"
          content={
            <Text className="text-base text-gray-700 font-dhivehiContent leading-relaxed">
              މި އެޕްލިކޭޝަންއަކީ އިސްލާމީ ދިރިއުޅުމަކަށް އަހުލުވެރިކުރުމުގެ
              މަޤްޞަދުގައި " އޭރިކްސް ޕްރައިވެޓް ލިމިޓަޑް " އިން އުފައްދާފައިވާ
              އެޕްލިކޭޝަނެކެވެ.
            </Text>
          }
        />
        <Card
          title="ފީޗާސް"
          content={
            <View>
              {[
                "ބޭނުންކުރުމަށް ފަސޭހަ އިންޓަފޭސް",
                "ދުވަހުގެ ޕްރޮގްރެސް ސޭވް ކުރުމަށް ޗެކްލިސްޓެއް",
                "ޗެކްލިސްޓް ޝެއާ ކުރެވޭނެ",
                "ނަމާދުގެ ހަރަކާތްތަކާއި ޛިކުރުތައް",
                "މުލްކު، ޔާސީން އަދި ކަހަފް ސޫރަތުގެ އޯޑިއޯ އާއި ލިޔުން",
                "ނަމާދު ގަޑިތަކަށް ރިމައިންޑާ ސެޓްކުރެވޭ",
              ].map((feature, index) => (
                <View
                  key={index}
                  className="flex-row items-center justify-end mb-2"
                >
                  <Text className="text-base text-gray-700 font-dhivehiContent flex-1 text-right">
                    {feature}
                  </Text>
                  <View className="w-2 h-2 rounded-full bg-slate-800 ml-2" />
                </View>
              ))}
            </View>
          }
        />

        <Card
          title="އަމާޒު"
          content={
            <Text className="text-base text-gray-700 font-dhivehiContent">
              އަޅުގަނޑުމެންގެ އަމާޒަކީ މިއެޕްލިކޭޝަންގެ ޒަރިއްޔާއިން އިސްލަމީ
              ދިރިއުޅުމަކަށް އަހުލުވެރިކުރުވުމެވެ. ޢުމަރު ބިން އަލް ޚައްޠާބް رضي
              الله عنه ވިދާޅުވެފައިވެއެވެ. "ހިސާބު ބެއްލެވުމުގެ ކުރިން ތިބާގެ
              ނަފްސު ހިސާބުކުރާށެވެ. އަދި ޢަމަލުތައް ވަޒަންކުރެވުމުގެ ކުރިން
              ތިބާގެ ޢަމަލުތައް ވަޒަންކުރާށެވެ."
            </Text>
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default About;
