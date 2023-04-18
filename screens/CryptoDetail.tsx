import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Animated,
  Platform,
  FlatList,
  StatusBar,
  SafeAreaView,
  ScrollView,
  ViewStyle,
  ImageStyle,
  Dimensions,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { COLORS, FONTS, icons, images } from "../constants";
import { Image } from "react-native";
import CategoryCard from "../components/home/CategoryCard";
import TopHeader from "../components/home/TopHeader";

const { width, height } = Dimensions.get("window");
const HEADER_MAX_HEIGHT = 110;
const HEADER_MIN_HEIGHT = 80;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const CryptoDetail = () => {
  const [selected, setSelected] = useState(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: "clamp",
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0.9],
    extrapolate: "clamp",
  });
  const imageTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -90],
    extrapolate: "clamp",
  });

  const titleScale = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0.9, 1, 1],
    extrapolate: "clamp",
  });
  const titleTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [-1, -2, -8],
    extrapolate: "clamp",
  });

  const DATA = [
    { id: 1, img: `${icons.home}`, name: "โรงแรม" },
    { id: 2, img: `${icons.trending}`, name: "เที่ยวบิน" },
    { id: 3, img: `${icons.bookmark}`, name: "โรงแรม+เที่ยวบิน" },
    { id: 4, img: `${icons.settings}`, name: "ทัวร์และตั๋วท่องเที่ยว" },
    { id: 5, img: `${icons.bookmark}`, name: "โรงแรม+เที่ยวบิน" },
    { id: 6, img: `${icons.settings}`, name: "ทัวร์และตั๋วท่องเที่ยว" },
    { id: 7, img: `${icons.bookmark}`, name: "โรงแรม+เที่ยวบิน" },
    { id: 8, img: `${icons.settings}`, name: "ทัวร์และตั๋วท่องเที่ยว" },
    { id: 9, img: `${icons.settings}`, name: "ทัวร์และตั๋วท่องเที่ยว" },
    { id: 10, img: `${icons.bookmark}`, name: "โรงแรม+เที่ยวบิน" },
    { id: 11, img: `${icons.settings}`, name: "ทัวร์และตั๋วท่องเที่ยว" },
  ];

  return (
    <SafeAreaView style={styles.saveArea}>
      <Animated.ScrollView
        contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT - 32 }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        {DATA.map((item) => (
          <View style={{ marginVertical: 10 }}>
            <CategoryCard name={item.name} />
          </View>
        ))}
      </Animated.ScrollView>

      <Animated.View
        style={[
          styles.header,
          { transform: [{ translateY: headerTranslateY }] },
        ]}
      >
        <Animated.Image
          style={[
            styles.headerBackground,
            {
              opacity: imageOpacity,
              transform: [{ translateY: imageTranslateY }],
            },
          ]}
          resizeMode="cover"
          source={images.bg}
        />
      </Animated.View>
      <Animated.View
        style={[
          styles.topBar,
          {
            transform: [{ scale: titleScale }, { translateY: titleTranslateY }],
          },
        ]}
      >
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              backgroundColor: "white",
              width: 350,
              height: 40,
              borderWidth: 1,
            }}
          />

          <Animated.Image
            source={icons.bookmark}
            resizeMode="contain"
            style={[
              styles.iconsContainer,
              {
                opacity: imageOpacity,
                transform: [{ translateY: imageTranslateY }],
              },
            ]}
          />
          <Animated.Image
            source={icons.settings}
            resizeMode="contain"
            style={[
              styles.iconsContainer,
              {
                opacity: imageOpacity,
                transform: [{ translateY: imageTranslateY }],
              },
            ]}
          />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  saveArea: {
    flex: 1,
  },
  iconsContainer: {
    width: 28,
    height: 28,
    tintColor: COLORS.lightGray1,
    zIndex: 0,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    overflow: "hidden",
    height: HEADER_MAX_HEIGHT,
  },
  textBox: {
    top: 0,
    left: 0,
    right: 0,
    overflow: "hidden",
    position: "absolute",
  },
  textBox1: {
    overflow: "hidden",
    position: "absolute",
  },
  headerBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: "200%",
    bottom: 0,
    height: HEADER_MAX_HEIGHT,
    resizeMode: "cover",
  },
  topBar: {
    marginTop: 40,
    height: 50,
    top: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    marginHorizontal: 10,
  },
  title: {
    color: "white",
    fontSize: 20,
  },
});

export default CryptoDetail;


