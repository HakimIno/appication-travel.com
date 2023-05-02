import React from "react";
import { View, StyleSheet, Text } from "react-native";

/* import Rating from "./Rating";
import { getFractionDigitsRating } from "./utils"; */
import { COLORS } from "../../../constants";
import { SPACING } from "../../../constants/theme";
import Rating from "./rating";
import { getFractionDigitsRating } from "./utils";

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
    width: 45,
    height: 40,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems:'center',
    marginRight: SPACING.s,
  },
  rating: {
    fontSize: 20,
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
