import React, { useRef } from "react";
import { Animated, ScrollView, StyleSheet, Text, View } from "react-native";
import CategoryCard from "../components/home/CategoryCard";
import TopTabs from "../components/home/TopTabs";

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const Transaction = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: "clamp",
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });
  const DATA = [
    { id: 1, img: "", name: "โรงแรม" },
    { id: 2, img: "", name: "เที่ยวบิน" },
    { id: 3, img: "", name: "โรงแรม+เที่ยวบิน" },
    { id: 4, img: "", name: "ทัวร์และตั๋วท่องเที่ยว" },
    { id: 5, img: "", name: "โรงแรม+เที่ยวบิน" },
    { id: 6, img: "", name: "ทัวร์และตั๋วท่องเที่ยว" },
    { id: 7, img: "", name: "โรงแรม+เที่ยวบิน" },
    { id: 8, img: "", name: "ทัวร์และตั๋วท่องเที่ยว" },
    { id: 9, img: "", name: "ทัวร์และตั๋วท่องเที่ยว" },
    { id: 10, img: "", name: "โรงแรม+เที่ยวบิน" },
    { id: 11, img: "", name: "ทัวร์และตั๋วท่องเที่ยว" },
  ];

  return (
    <View style={styles.container}>
      <TopTabs />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#039be5",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "SF-font",
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 16,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
    fontFamily: "SF-font",
  },
});

export default Transaction;
