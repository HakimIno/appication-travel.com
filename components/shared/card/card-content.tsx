import React from "react";
import { View, StyleSheet } from "react-native";
import { SPACING } from "../../../constants/theme";

interface Props {
  children: any;
  style: any;
}

const CardContent = ({ children, style }: Props) => {
  return <View style={[styles.content, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: SPACING.s + 2,
    paddingVertical: SPACING.l / 2,
  },
});

export default CardContent;
