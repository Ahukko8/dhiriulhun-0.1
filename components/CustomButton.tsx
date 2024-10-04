import { Pressable, Text } from "react-native";
import React from "react";

interface CustomButtonProps {
  onPress: () => void;
  title: string;
  textStyles?: string;
  containerStyles?: string;
}

const CustomButton = ({
  onPress,
  title,
  textStyles = "",
  containerStyles = "",
}: CustomButtonProps) => {
  return (
    <Pressable
      className={`bg-white active:bg-white/90 rounded-xl min-h-[50px] justify-center items-center ${containerStyles} `}
      onPress={onPress}
    >
      <Text className={`font-semibold font-dhivehi text-lg ${textStyles}`}>
        {title}
      </Text>
    </Pressable>
  );
};

export default CustomButton;
