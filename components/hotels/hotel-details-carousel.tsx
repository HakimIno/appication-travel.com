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
import * as Animatable from "react-native-animatable";
import CarouselIndicators from "../shared/carouselIndicators";

interface Props {
  slides: any;
  id: any;
}

const HotelsDetailsCarousel = ({ slides, id }: Props) => {
  const scrollAnimated = useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
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
                  {image && <Image source={{ uri: image }} style={styles.image} />}
                </SharedElement>
              </View>
            );
          }
          return (
            <View style={styles.slide}>
              {image && <Image source={{ uri: image }} style={styles.image} />}
            </View>
          );
        }}
      />
      {slides.length > 1 && (
        <Animatable.View
          style={styles.indicators}
          animation="fadeInUp"
          delay={550}
          duration={400}
          easing="ease-in-out"
        >
          <CarouselIndicators
            slidesCount={slides.length}
            slideWidth={SIZES.width}
            dotSize={8}
            dotSpacing={6}
            scrollAnimated={scrollAnimated}
          />
        </Animatable.View>
      )}
    </View>
  );
};

export default HotelsDetailsCarousel;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide: {
    width: SIZES.width,
    height: SIZES.height,
    alignItems: "center",
    justifyContent: 'center'
  },
  image: {
    width: SIZES.width ,
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
