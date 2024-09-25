import React, { useRef, useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  Alert,
  SafeAreaView,
} from "react-native";
import useProgressStore from "../state/progressStore";
import ViewShot from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import { Ionicons } from "@expo/vector-icons";

interface ProgressItemProps {
  itemId: string;
  checkedItems: Record<string, boolean>;
  totalItems: number;
  timestamp: number;
}

const ProgressItem: React.FC<ProgressItemProps> = ({
  itemId,
  checkedItems,
  totalItems,
  timestamp,
}) => {
  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const date = new Date(timestamp);
  const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

  return (
    <View className="p-4 border-b border-gray-200">
      <Text className="font-dhivehiContent">{itemId}</Text>
      <Text className="font-dhivehiContent">{`ފުރިހަމަކޮށްފި: ${completedCount}/${totalItems}`}</Text>
      <Text className="font-dhivehiContent text-sm text-gray-500">
        {formattedDate}
      </Text>
    </View>
  );
};

const Progress: React.FC = () => {
  const { progress, resetProgress, cleanupExpiredProgress } =
    useProgressStore();
  const viewShotRef = useRef<ViewShot>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
      cleanupExpiredProgress();
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [cleanupExpiredProgress]);

  const captureAndShareProgress = useCallback(async () => {
    if (isCapturing) return;
    setIsCapturing(true);

    try {
      if (
        !viewShotRef.current ||
        typeof viewShotRef.current.capture !== "function"
      ) {
        throw new Error("ViewShot ref or capture method is not available");
      }

      const uri = await viewShotRef.current.capture();

      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert("Error", "Sharing is not available on this device");
        return;
      }

      const tempUri = FileSystem.cacheDirectory + "progress_screenshot.png";
      await FileSystem.copyAsync({
        from: uri,
        to: tempUri,
      });

      await Sharing.shareAsync(tempUri, {
        mimeType: "image/png",
        dialogTitle: "Share Progress",
      });

      await FileSystem.deleteAsync(tempUri, { idempotent: true });
    } catch (error) {
      console.error("Error capturing or sharing screenshot:", error);
      Alert.alert("Error", "Failed to capture or share the screenshot.");
    } finally {
      setIsCapturing(false);
    }
  }, [isCapturing]);

  const handleReset = () => {
    resetProgress();
    // Force a re-render
    setCurrentDateTime(new Date());
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        <View className="p-4 bg-gray-100">
          <Text className="font-dhivehiContent text-center text-lg">
            {currentDateTime.toLocaleDateString()}{" "}
            {currentDateTime.toLocaleTimeString()}
          </Text>
        </View>
        <View className="flex-row justify-around m-4">
          <Pressable
            onPress={handleReset}
            className="bg-blue-500 active:bg-blue-400 p-4 rounded flex-row items-center"
          >
            <Ionicons name="refresh" size={24} color="white" />
            <Text className="text-white font-dhivehi ml-2">ރީސެޓްކުރޭ</Text>
          </Pressable>
          <Pressable
            onPress={captureAndShareProgress}
            className="bg-green-500 active:bg-green-400 p-4 rounded flex-row items-center"
          >
            <Ionicons name="share-outline" size={24} color="white" />
            <Text className="text-white font-dhivehi ml-2">ޙިއްސާކުރޭ</Text>
          </Pressable>
        </View>
        <ViewShot
          style={{ flex: 1, backgroundColor: "white" }}
          ref={viewShotRef}
          options={{ format: "png", quality: 0.9 }}
        >
          {Object.keys(progress).length === 0 ? (
            <View className="flex-1 justify-center items-center">
              <Text className="font-dhivehiContent text-gray-500">
                މަޢުލޫމާތެއް ނެތް
              </Text>
            </View>
          ) : (
            <FlatList
              data={Object.entries(progress)}
              renderItem={({
                item: [itemId, { checkedItems, totalItems, timestamp }],
              }) => (
                <ProgressItem
                  itemId={itemId}
                  checkedItems={checkedItems}
                  totalItems={totalItems}
                  timestamp={timestamp}
                />
              )}
              keyExtractor={([itemId]) => itemId}
              contentContainerStyle={{ flexGrow: 1 }}
            />
          )}
        </ViewShot>
      </View>
    </SafeAreaView>
  );
};

export default Progress;
