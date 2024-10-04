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

const TotalProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
  <View className="bg-gray-200 h-4 rounded-full overflow-hidden">
    <View
      className="bg-slate-500 h-full"
      style={{ width: `${progress * 100}%` }}
    />
  </View>
);

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

  // Calculate total progress
  const totalCompleted = Object.values(progress).reduce(
    (sum, { checkedItems }) =>
      sum + Object.values(checkedItems).filter(Boolean).length,
    // eslint-disable-next-line prettier/prettier
    0
  );
  const totalItems = Object.values(progress).reduce(
    (sum, { totalItems }) => sum + totalItems,
    // eslint-disable-next-line prettier/prettier
    0
  );
  const totalProgress = totalItems > 0 ? totalCompleted / totalItems : 0;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        <View className="p-4 bg-white">
          <Text className="font-dhivehiContent text-center text-lg">
            {currentDateTime.toLocaleDateString()}{" "}
            {currentDateTime.toLocaleTimeString()}
          </Text>
        </View>
        {/* <View className="px-4 py-2">
          <Text className="font-dhivehiContent text-lg mb-2">
            ޖުމްލަ ޕްރޮގްރެސް: %{Math.round(totalProgress * 100)}
          </Text>
          <Text className="font-dhivehiContent text-md mb-2">
            ފުރިހަމަކުރި: {totalItems} / {totalCompleted}
          </Text>
          <TotalProgressBar progress={totalProgress} />
        </View> */}
        <View className="flex-row justify-around m-4">
          <Pressable
            onPress={resetProgress}
            className="bg-[#3498db] active:bg-[#3498db]/75 p-4 rounded-3xl flex-row items-center"
          >
            <Ionicons name="refresh" size={24} color="white" />
            <Text className="text-white font-dhivehi ml-2">ރީސެޓްކުރޭ</Text>
          </Pressable>
          <Pressable
            onPress={captureAndShareProgress}
            className="bg-white border border-[#3498db] active:bg-slate-100 p-4 rounded-3xl flex-row items-center"
          >
            <Ionicons name="share-outline" size={24} color="#3498db" />
            <Text className="text-[#3498db] font-dhivehi ml-2">ޙިއްސާކުރޭ</Text>
          </Pressable>
        </View>
        <ViewShot
          style={{ flex: 1, backgroundColor: "white" }}
          ref={viewShotRef}
          options={{ format: "png", quality: 0.9 }}
        >
          <View className="px-4 py-2">
            <Text className="font-dhivehiContent text-lg mb-2">
              ޖުމްލަ ޕްރޮގްރެސް: %{Math.round(totalProgress * 100)}
            </Text>
            <Text className="font-dhivehiContent text-md mb-2">
              ފުރިހަމަކުރި: {totalItems} / {totalCompleted}
            </Text>
            <TotalProgressBar progress={totalProgress} />
          </View>
          <FlatList
            data={Object.entries(progress)}
            renderItem={({
              item: [itemId, { checkedItems, totalItems, timestamp }],
            }) => (
              <>
                <ProgressItem
                  itemId={itemId}
                  checkedItems={checkedItems}
                  totalItems={totalItems}
                  timestamp={timestamp}
                />
              </>
            )}
            keyExtractor={([itemId]) => itemId}
            contentContainerStyle={{ flexGrow: 1 }}
          />
        </ViewShot>
      </View>
    </SafeAreaView>
  );
};

export default Progress;
