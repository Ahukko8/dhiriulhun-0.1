import React from "react";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onCheckedChange }) => {
  return (
    <Pressable
      onPress={() => onCheckedChange(!checked)}
      className="w-6 h-6 justify-center items-center border border-gray-400 rounded"
    >
      {checked && <Ionicons name="checkmark" size={18} color="green" />}
    </Pressable>
  );
};

export default Checkbox;
