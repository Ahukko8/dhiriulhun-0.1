import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { Text } from "react-native";

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    Dhivehi: require("@/assets/fonts/MV Vaadhoo_bd_v1.0_hinted.ttf"),
    Arabi: require("@/assets/fonts/ArabQuranIslamic140-K7n4W.ttf"),
    DhivehiTitle: require("@/assets/fonts/Mv_MAG_Round_HBold.otf"),
    dhivehiContent: require("@/assets/fonts/dhivehiContent.ttf"),
    arabNext: require("@/assets/fonts/arabNext.ttf"),
    arabQuran: require("@/assets/fonts/arabQuran.otf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded) return null;
  if (!fontsLoaded && !error) return null;

  SplashScreen.preventAutoHideAsync();
  return (
    <Stack screenOptions={{ headerShadowVisible: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="(tabs)"
        options={{
          headerTitle: () => (
            <Text className="mx-[90px] font-dhivehi text-white ">
              ދިރިއުޅުން
            </Text>
          ),
          headerStyle: {
            backgroundColor: "#1DA1F2", // Set the background color here
          },
          // headerShown: false,
        }}
      />
      <Stack.Screen name="menuItems/item1" options={{ headerShown: false }} />
      <Stack.Screen name="menuItems/item2" options={{ headerShown: false }} />
      <Stack.Screen name="menuItems/item3" options={{ headerShown: false }} />
      <Stack.Screen name="menuItems/item4" options={{ headerShown: false }} />
      <Stack.Screen name="menuItems/item5" options={{ headerShown: false }} />
      <Stack.Screen name="menuItems/item6" options={{ headerShown: false }} />
      <Stack.Screen name="menuItems/item7" options={{ headerShown: false }} />
      <Stack.Screen name="menuItems/item8" options={{ headerShown: false }} />
      <Stack.Screen name="menuItems/item9" options={{ headerShown: false }} />
      <Stack.Screen name="menuItems/item10" options={{ headerShown: false }} />
      <Stack.Screen name="menuItems/item11" options={{ headerShown: false }} />
      <Stack.Screen name="menuItems/item12" options={{ headerShown: false }} />
      <Stack.Screen name="menuItems/item13" options={{ headerShown: false }} />
    </Stack>
  );
}
