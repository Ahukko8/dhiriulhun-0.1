import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import React, { useEffect } from "react";
import { SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import { withLayoutContext } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons"; // Add this import for the reminder icon

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
        tabBarIndicatorContainerStyle: { backgroundColor: "#1DA1F2" },
        tabBarActiveTintColor: "white",
        tabBarIndicatorStyle: {
          backgroundColor: "white",
          height: 3,
        },
        tabBarStyle: { height: 50 },
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
        }}
      />
      <MaterialTopTabs.Screen
        name="notifications"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <Ionicons name="notifications-outline" size={24} color={color} />
          ),
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
        }}
      />
      <MaterialTopTabs.Screen
        name="menu"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
        }}
      />
    </MaterialTopTabs>
  );
};

export default Layout;
