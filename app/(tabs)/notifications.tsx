/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Platform,
  Alert,
  Pressable,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import * as Notifications from "expo-notifications";
import { Feather } from "@expo/vector-icons";

interface Reminder {
  id: string;
  title: string;
  date: Date;
}

export default function ReminderComponent() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState<"date" | "time">("date");
  const [editingId, setEditingId] = useState<string | null>(null);

  const addOrUpdateReminder = () => {
    if (title) {
      if (editingId) {
        // Update existing reminder
        setReminders(
          reminders.map((reminder) =>
            reminder.id === editingId ? { ...reminder, title, date } : reminder
          )
        );
        updateNotification({ id: editingId, title, date });
        setEditingId(null);
      } else {
        // Add new reminder
        const newReminder: Reminder = {
          id: Date.now().toString(),
          title,
          date,
        };
        setReminders([...reminders, newReminder]);
        scheduleNotification(newReminder);
      }
      setTitle("");
      setDate(new Date());
    }
  };

  const scheduleNotification = async (reminder: Reminder) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Reminder",
        body: reminder.title,
      },
      trigger: reminder.date,
      identifier: reminder.id,
    });
  };

  const updateNotification = async (reminder: Reminder) => {
    await Notifications.cancelScheduledNotificationAsync(reminder.id);
    await scheduleNotification(reminder);
  };

  const deleteReminder = async (id: string) => {
    await Notifications.cancelScheduledNotificationAsync(id);
    setReminders(reminders.filter((reminder) => reminder.id !== id));
  };

  const clearReminders = async () => {
    await Promise.all(
      reminders.map((reminder) =>
        Notifications.cancelScheduledNotificationAsync(reminder.id)
      )
    );
    setReminders([]);
  };

  const editReminder = (reminder: Reminder) => {
    setTitle(reminder.title);
    setDate(reminder.date);
    setEditingId(reminder.id);
  };

  const onChangePicker = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowPicker(Platform.OS === "ios");
    if (selectedDate) {
      setDate(selectedDate);
      if (Platform.OS === "android" && pickerMode === "date") {
        setPickerMode("time");
        setShowPicker(true);
      }
    }
  };

  const showDatepicker = () => {
    setPickerMode("date");
    setShowPicker(true);
  };

  return (
    <View className="flex-1 bg-white p-5">
      <View className="bg-white rounded-3xl">
        <View className="p-5 rounded-2xl shadow-md overflow-hidden">
          <View className="bg-white rounded-3xl p-4">
            <Text className="text-2xl mb-5 font-dhivehiContent text-zinc-800 ">
              އެލާޓްސް
            </Text>
          </View>

          <View className="mb-5">
            <TextInput
              className="bg-white p-3 font-dhivehiContent text-right rounded-md mb-2 border border-gray-300"
              placeholder=" ތަފްސީލް"
              value={title}
              onChangeText={setTitle}
            />
            <Pressable
              className="bg-white p-3 rounded-md mb-2 items-end border border-gray-300"
              onPress={showDatepicker}
            >
              <Text>{date.toLocaleString()}</Text>
            </Pressable>
            {showPicker && (
              <DateTimePicker
                value={date}
                mode={pickerMode}
                is24Hour={true}
                display="default"
                onChange={onChangePicker}
              />
            )}
            <Pressable
              className="bg-[#3498db] active:bg-[#3498db]/80 p-3 rounded-3xl items-center mb-2"
              onPress={addOrUpdateReminder}
            >
              <Text className="text-white font-dhivehiContent text-lg">
                {editingId ? "އަޕްޑޭޓްކުރޭ " : " އެޑްކުރޭ"}
              </Text>
            </Pressable>
            <Pressable
              className="bg-red-400 active:bg-red-300 p-3 rounded-3xl items-center"
              onPress={clearReminders}
            >
              <Text className="text-white font-dhivehiContent text-lg">
                {" "}
                ފޮހެލާ
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="border border-slate-200 bg-white p-3 rounded-md mb-2 flex-row justify-between items-center shadow-md">
            <View>
              <Text className="font-dhivehiContent text-lg">{item.title}</Text>
              <Text className="text-gray-600">
                {item.date.toLocaleString()}
              </Text>
            </View>
            <View className="flex-row">
              <Pressable
                className="bg-slate-600 active:bg-slate-500 p-2 rounded-md mr-2"
                onPress={() => editReminder(item)}
              >
                <Feather name="edit-2" size={15} color="white" />
              </Pressable>
              <Pressable
                className="bg-red-400 active:bg-red-400/80 p-2 rounded-md"
                onPress={() =>
                  Alert.alert(
                    "Delete Reminder",
                    "Are you sure you want to delete this reminder?",
                    [
                      { text: "Cancel", style: "cancel" },
                      { text: "OK", onPress: () => deleteReminder(item.id) },
                    ]
                  )
                }
              >
                <Feather name="trash-2" size={15} color="white" />
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
}
