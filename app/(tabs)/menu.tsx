import { View, Text, ImageBackground, FlatList, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AppGradient from "@/components/AppGradient";
import { MENU_IMAGE_DATA } from "@/constants/menuImageData";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

import MENU_IMAGES from "@/constants/menuImages";

const Menu = () => {
  return (
    <SafeAreaView className="flex-1">
      <AppGradient colors={["transparent", "rgba(10, 34, 64, 0.8)"]}>
        <View>
          <FlatList
            data={MENU_IMAGE_DATA}
            className=""
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  switch (item.id) {
                    case 1:
                      router.push("/menuItems/item1");
                      break;
                    case 2:
                      router.push("/menuItems/item2");
                      break;
                    case 3:
                      router.push("/menuItems/item3");
                      break;
                    case 4:
                      router.push("/menuItems/item4");
                      break;
                    case 5:
                      router.push("/menuItems/item5");
                      break;
                    case 6:
                      router.push("/menuItems/item6");
                      break;
                    case 7:
                      router.push("/menuItems/item7");
                      break;
                    case 8:
                      router.push("/menuItems/item8");
                      break;
                    case 9:
                      router.push("/menuItems/item9");
                      break;
                    case 10:
                      router.push("/menuItems/item10");
                      break;
                    case 11:
                      router.push("/menuItems/item11");
                      break;
                    case 12:
                      router.push("/menuItems/item12");
                      break;
                    case 13:
                      router.push("/menuItems/item13");
                      break;
                    // Add more cases as needed
                    // default:
                    //   router.push(`/menuItems/${item.id}`);
                  }
                }}
                className="h-48 my-3 rounded-md overflow-hidden"
              >
                <ImageBackground
                  source={MENU_IMAGES[item.id - 1]}
                  resizeMode="cover"
                  className="flex-1 rounded-lg justify-center"
                >
                  <LinearGradient
                    colors={["transparent", "rgba(0,0,0,0.3)"]}
                    className="flex-1 justify-center items-center"
                  >
                    <Text className="text-white text-3xl text-center p-2 font-dhivehi">
                      {item.title}
                    </Text>
                  </LinearGradient>
                </ImageBackground>
              </Pressable>
            )}
          />
        </View>
      </AppGradient>
    </SafeAreaView>
  );
};

export default Menu;
