import React from "react";
import { View, StyleSheet } from "react-native";
import Review from "./review";
import { SPACING } from "../../constants/theme";

interface Props {
  reviews: Array<any>;
}

const Reviews = ({ reviews = [] }: Props) => {
  return (
    <View style={styles.container}>
      {reviews.map((review) => (
        <Review review={review} key={review.id} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SPACING.l,
  },
});

export default Reviews;
