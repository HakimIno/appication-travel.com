import { Animated, Image, StyleSheet, View } from "react-native";
import { SIZES } from "../../constants";
import { useRef } from "react";
import { SharedElement } from "react-navigation-shared-element";
import * as Animatable from "react-native-animatable";
import CarouselIndicators from "../shared/carouselIndicators";
interface Props {
  slides: any;
  id: any;
}

const TripDetailsCarousel = ({ slides, id }: Props) => {
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
    </>
  );
};

const styles = StyleSheet.create({
  slide: {
    width: SIZES.width,
    height: SIZES.height ,
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

export default TripDetailsCarousel;
