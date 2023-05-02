import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { AirbnbRating } from "react-native-ratings";

import {
  getCorrectRating,
  getFractionDigitsRating,
  getRatingLabel,
} from "./utils";
import { COLORS } from "../../../constants";

interface Props {
  showLabelInline?: any;
  showLabelTop?: any;
  containerStyle?: any;
  rating?: any;
  disabled?: boolean;
  size?: any;
}

const Rating = ({
  showLabelInline,
  showLabelTop,
  containerStyle,
  rating,
  disabled = true,
  size = 12,
}: Props) => {
  const _rating = getCorrectRating(rating);
  return (
    <View
      style={[styles.container, containerStyle].concat(
        showLabelInline ? styles.containerRow : null
      )}
    >
      {showLabelTop && (
        <Text style={styles.label}>
          {getFractionDigitsRating(rating)} {getRatingLabel(_rating)} 
        </Text>
      )}
      <AirbnbRating
        defaultRating={_rating}
        count={5}
        showRating={false}
        selectedColor={COLORS.yellow}
        isDisabled={disabled}
        size={size}
      />
      {showLabelInline && (
        <View>
          <Text style={styles.label}>{getFractionDigitsRating(rating)}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    alignItems: "flex-end",
    marginHorizontal: -2,
  },
  containerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    color: COLORS.primary,
    marginLeft: 4,
    fontSize: 11,
    fontWeight: 'bold'
  },
});

export default Rating;
