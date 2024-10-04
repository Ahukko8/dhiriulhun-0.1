// import { ImageBackground, Text, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import home from "../assets/images/home.webp";
// import CustomButton from "@/components/CustomButton";
// import { router } from "expo-router";
// import { StatusBar } from "expo-status-bar";
// import * as NavigationBar from "expo-navigation-bar";
// import { useEffect } from "react";

// const Home = () => {
//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   useEffect(() => {
//     // Hide the navigation bar
//     NavigationBar.setVisibilityAsync("hidden");

//     // You can also customize it further, for example, make it translucent
//     // NavigationBar.setBackgroundColorAsync("transparent");
//   }, []);
//   return (
//     <View className="flex-1">
//       <StatusBar hidden />
//       <ImageBackground source={home} resizeMode="cover" className="flex-1">
//         <SafeAreaView className="flex-1 px-1 mb-10 justify-between">
//           <View>
//             <Text className="pt-20 text-center text-white  text-6xl font-dhivehiTitle">
//               ދިރިއުޅުން
//             </Text>
//             <Text className="text-center  text-white text-lg font-dhivehi">
//               އިސްލާމީ ދިރިއުޅުމަކަށް އަހުލުވެރިވަމާ
//             </Text>
//           </View>
//           <View>
//             <CustomButton onPress={() => router.push("/menu")} title="ފަށްޓާ" />
//           </View>
//         </SafeAreaView>
//       </ImageBackground>
//       <StatusBar style="dark" />
//     </View>
//   );
// };

// export default Home;

import React, { useEffect } from "react";
import { ImageBackground, Text, View, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import { router } from "expo-router";
import home from "../assets/images/home.webp";
import CustomButton from "@/components/CustomButton";

const Home = () => {
  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setVisibilityAsync("hidden");
    }
  }, []);

  return (
    <View className="flex-1">
      <StatusBar style="light" hidden />
      <ImageBackground source={home} resizeMode="cover" className="flex-1">
        <SafeAreaView className="flex-1 px-1 mb-10 justify-between">
          <View>
            <Text className="pt-20 text-center text-white text-6xl font-dhivehiTitle">
              ދިރިއުޅުން
            </Text>
            <Text className="text-center text-white text-lg font-dhivehi">
              އިސްލާމީ ދިރިއުޅުމަކަށް އަހުލުވެރިވަމާ
            </Text>
          </View>
          <View>
            <CustomButton onPress={() => router.push("/menu")} title="ފަށްޓާ" />
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default Home;
