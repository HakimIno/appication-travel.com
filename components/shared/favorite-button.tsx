import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "./icon";
import { COLORS, SIZES } from "../../constants";
import { Shadow } from "react-native-neomorph-shadows";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  active?: boolean;
  style?: any;
  onPress: () => void;
}

const FavoriteButton = ({ style, onPress }: Props) => {
  const [active, setActive] = useState(false);
  return (
    <TouchableOpacity style={styles.view} onPress={() => setActive(!active)}>
      <Ionicons
        name={active ? "heart" : "heart-outline"}
        size={24}
        color={active ? COLORS.red : COLORS.black}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: COLORS.white,
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
});

export default FavoriteButton;
