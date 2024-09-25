import React, { useState, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, FlatList } from "react-native";
import Checkbox from "../components/CheckBox";

interface ChecklistItem {
  id: string;
  text: string;
}

interface ModalChecklistProps {
  isVisible: boolean;
  onClose: () => void;
  items: ChecklistItem[];
  title: string;
  onSubmit: (checkedItems: Record<string, boolean>) => void;
  initialCheckedItems?: Record<string, boolean>;
}

const ModalChecklist: React.FC<ModalChecklistProps> = ({
  isVisible,
  onClose,
  items,
  title,
  onSubmit,
  initialCheckedItems,
}) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(
    initialCheckedItems || {},
  );

  useEffect(() => {
    setCheckedItems(initialCheckedItems || {});
  }, [initialCheckedItems]);

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmit = () => {
    console.log("ModalChecklist - Submitting:", { checkedItems });
    onSubmit(checkedItems);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-transparent bg-opacity-50">
        <View className="bg-white p-5 rounded-lg w-4/5">
          <Text className="text-sm font-dhivehi pt-1 mb-4">{title}</Text>
          <FlatList
            data={items}
            renderItem={({ item }) => (
              <View className="p-5 flex-row items-center mb-2">
                <Text className="ml-2 font-dhivehiContent">{item.text}</Text>
                <View className="flex-1 mx-2">
                  <Checkbox
                    checked={checkedItems[item.id] || false}
                    onCheckedChange={() => toggleItem(item.id)}
                  />
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
          <View className="flex-row justify-between mt-4">
            <TouchableOpacity
              onPress={onClose}
              className="bg-gray-500 p-2 rounded flex-1 mr-2"
            >
              <Text className="text-white text-center">ފަހަތަށް</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSubmit}
              className="bg-blue-500 p-2 rounded flex-1 ml-2"
            >
              <Text className="text-white text-center">ހުށަހަޅާ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalChecklist;
