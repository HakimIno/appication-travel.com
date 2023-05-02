import {
  StyleSheet,
  Text,
  View,
  Animated,
  FlatList,
  Image,
} from "react-native";
import React, { useRef } from "react";
import { SharedElement } from "react-navigation-shared-element";
import { SIZES } from "../../constants";

interface Props {
  slides: any;
  id: any;
}

const HotelsDetailsCarousel = ({ slides, id }: Props) => {
  const scrollAnimated = useRef(new Animated.Value(0)).current;
  return (
    <>
      <Animated.FlatList
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollAnimated } } }],
          { useNativeDriver: false }
        )}
        renderItem={({ item: image, index }) => {
          if (!index) {
            return (
              <View style={styles.slide}>
                <SharedElement id={`trip.${id}.image`} style={styles.slide}>
                  <Image source={{ uri: image }} style={styles.image} />
                </SharedElement>
              </View>
            );
          }
          return (
            <View style={styles.slide}>
              <Image source={{ uri: image }} style={styles.image} />
            </View>
          );
        }}
      />
    </>
  );
};

export default HotelsDetailsCarousel;

const styles = StyleSheet.create({
  slide: {
    width: SIZES.width,
    height: SIZES.height,
  },
  image: {
    width: SIZES.width,
    height: SIZES.height,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: "cover",
  },
  indicators: {
    position: "absolute",
    width: SIZES.width,
    bottom: 60,
    alignItems: "center",
  },
});
