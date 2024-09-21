import { SafeAreaView } from "react-native";
import React from "react";
import { MenuDetails } from "@/components/menuDetails";

const imageMap: { [key: string]: any } = {
  "morningDhikr.webp": require("../../assets/menuImages/DhuhaPrayer.webp"),
  "dhuhaPrayer.webp": require("../../assets/menuImages/Isha.webp"),
  // Add all other images here
};

const Item9 = () => {
  return (
    <SafeAreaView className="flex-1">
      <MenuDetails
        title="ޤުރްއާން ކިޔެވުން"
        imageMap={imageMap}
        footerTexts="someText"
      />
    </SafeAreaView>
  );
};

export default Item9;
