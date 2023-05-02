import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import Divider from "../shared/divider";
import Rating from "../shared/Rating/rating";
import { COLORS, SPACING } from "../../constants/theme";

const Review = ({ review }: any) => {
  return (
    <>
      
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.avatar} source={{ uri: review.author.avatar }} />
          <View style={styles.userBox}>
            <Text style={styles.user}>{review.author.username}</Text>
            <Text style={styles.date}>{review.date}</Text>
          </View>
          <Rating rating={review.rating} showLabelTop />
        </View>
        <Text style={styles.text}>{review.text}</Text>
      </View>
      <Divider enabledSpacing={false} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING.l,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.s,
  },
  avatar: {
    height: 35,
    width: 35,
    resizeMode: "cover",
    borderRadius: 10,
    marginRight: SPACING.s,
  },
  userBox: {
    flex: 1,
    marginRight: SPACING.s,
  },
  user: {
    color: COLORS.gray,
    fontSize: 13,
    fontFamily: "SukhumvitSet-Bold",
  },
  date: {
    fontSize: 11,
    color: COLORS.lightGray,
  },
  text: {
    color: COLORS.gray,
    fontSize: 13,
    fontFamily: "SukhumvitSet-Medium",
  },
});

export default Review;
