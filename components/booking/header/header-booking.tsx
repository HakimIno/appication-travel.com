import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../../constants";
import { SPACING } from "../../../constants/theme";

interface Props {
  title: string;
}

const HeaderBooking = ({ title }: Props) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <View
        style={{
          width: 5,
          height: 20,
          backgroundColor: COLORS.primary,
          borderRadius: 10,
          marginRight: SPACING.s,
        }}
      />
      <Text style={styles.detailTextTitle}>{title}</Text>
    </View>
  );
};

export default HeaderBooking;

const styles = StyleSheet.create({
  detailTextTitle: {
    fontSize: 14,
    fontFamily: "SukhumvitSet-SemiBold",
  },
});
