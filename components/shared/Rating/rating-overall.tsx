import React from "react";
import { View, StyleSheet, Text } from "react-native";

/* import Rating from "./Rating";
import { getFractionDigitsRating } from "./utils"; */
import { COLORS } from "../../../constants";
import { SPACING } from "../../../constants/theme";
import Rating from "./rating";
import { getFractionDigitsRating } from "./utils";
import Display from "../../../utils/Display";

interface Props {
  rating: any;
  containerStyle: any;
}
const RatingOverall = ({ rating, containerStyle }: Props) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.containerRating}>
        <Text style={styles.rating}>{getFractionDigitsRating(rating)}</Text>
      </View>
      <View>
        <Text style={styles.caption}>คะแนนโดยรวม</Text>
        <Rating rating={rating} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  containerRating: {
    width: Display.setWidth(15),
    height: Display.setHeight(5),
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems:'center',
    marginRight: SPACING.s,
  },
  rating: {
    fontSize: Display.setWidth(5),
    color: COLORS.white,
    fontFamily: "SukhumvitSet-Bold",
    
  },
  caption: {
    fontSize: 12,
    color: COLORS.slate,
    fontFamily: "SukhumvitSet-Bold",
  },
});

export default RatingOverall;
