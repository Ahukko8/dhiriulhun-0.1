import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
// import { ImageBackground, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import { withLayoutContext } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

const Layout = () => {
  const [fontsLoaded, error] = useFonts({
    Dhivehi: require("@/assets/fonts/MV Vaadhoo_bd_v1.0_hinted.ttf"),
    Arabi: require("@/assets/fonts/ArabQuranIslamic140-K7n4W.ttf"),
    DhivehiTitle: require("@/assets/fonts/Mv_MAG_Round_HBold.otf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded) return null;
  if (!fontsLoaded && !error) return null;
  return (
    <MaterialTopTabs
      screenOptions={{
        tabBarActiveTintColor: "#131620",
        tabBarIndicatorStyle: {
          backgroundColor: "#1CB7ED",
          height: 3,
        },
      }}
    >
      <MaterialTopTabs.Screen
        name="about"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="information-outline"
              size={24}
              color={color}
            />
          ),
          tabBarStyle: { height: 50 },
        }}
      />
      <MaterialTopTabs.Screen
        name="progress"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="book-outline"
              size={24}
              color={color}
            />
          ),
          tabBarStyle: { height: 50 },
        }}
      />
      <MaterialTopTabs.Screen
        name="menu"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
          tabBarStyle: { height: 50 },
        }}
      />
    </MaterialTopTabs>
  );
};

export default Layout;
