import React from "react";
import { Image, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

const Icon = ({
  onPress,
  icon,
  containerStyle,
  viewStyle,
  style,
  size = 32,
}: any) => {
  const image = (
    <View style={viewStyle}>
      <Ionicons
        name={icon}
        size={size}
      />
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} style={containerStyle}>
        {image}
      </TouchableOpacity>
    );
  }
  return <View style={containerStyle}>{image}</View>;
};

export default Icon;
