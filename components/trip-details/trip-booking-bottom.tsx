import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS } from "../../constants";
import { SIZES, SPACING } from "../../constants/theme";

type Props = {
  title: string;
  price: string;
  onPress: () => void;
};

const TripBookingBottom = ({ title, price, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: SPACING.m,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 13,
            fontFamily: "SukhumvitSet-Bold",
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 13,
            fontFamily: "SukhumvitSet-Bold",
          }}
        >
          ฿{price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TripBookingBottom;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    paddingVertical: 6,
    borderRadius: SIZES.radius,
    marginHorizontal: SPACING.m,
  },
});
