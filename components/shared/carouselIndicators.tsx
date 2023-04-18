import { useMemo, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { COLORS, SIZES } from "../../constants";

interface Props {
  slidesCount: number;
  dotSize: number;
  dotSpacing: number;
  slideWidth: number;
  scrollAnimated: any;
}

interface Accumulator {
  inputRange: number[];
  translateOutputRange: number[];
  widthOutputRange: number[];
}

const CarouselIndicators = ({
  slidesCount,
  dotSize,
  dotSpacing,
  slideWidth,
  scrollAnimated,
}: Props) => {
  const slides = useRef(Array.from(Array(slidesCount).keys())).current;

  const { inputRange, translateOutputRange, widthOutputRange } = useMemo(
    () =>
      slides.reduce(
        (acc: Accumulator, _, index, arr) => {
          const width = slideWidth * index;
          const translateX = index * (dotSize + dotSpacing);
          acc.inputRange.push(width);
          acc.translateOutputRange.push(translateX);
          acc.widthOutputRange.push(dotSize);

          if (index < arr.length - 1) {
            acc.inputRange.push(width + slideWidth / 2);
            acc.translateOutputRange.push(translateX);
            acc.widthOutputRange.push(dotSize * 2 + dotSpacing);
          }
          return acc;
        },
        { inputRange: [], translateOutputRange: [], widthOutputRange: [] }
      ),
    [dotSize, dotSpacing, slideWidth, slides]
  );

  return (
    <View style={styles.container}>
      {slides.map((_, index) => {
        return (
          <View
            key={index}
            style={[
              styles.dot,
              {
                width: dotSize,
                height: dotSize,
                marginHorizontal: dotSpacing / 2,
              },
            ]}
          />
        );
      })}
      <Animated.View
        style={[
          styles.indicator,
          {
            height: dotSize,
            left: dotSpacing / 2 + 2,
            transform: [
              {
                translateX: scrollAnimated.interpolate({
                  inputRange,
                  outputRange: translateOutputRange,
                }),
              },
            ],
            width: scrollAnimated.interpolate({
              inputRange,
              outputRange: widthOutputRange,
            }),
          },
        ]}
      />
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: COLORS.black,
      paddingHorizontal: 2,
      paddingVertical: 4,
      borderRadius: 10,
      opacity: 0.6
    },
    dot: {
      backgroundColor: COLORS.white,
      opacity: 0.8,
      borderRadius: 12,
      
    },
    indicator: {
      position: 'absolute',
      backgroundColor: COLORS.white,
      borderRadius: 10,
      opacity: 1,
      top: 4,
    },
  });
  
  export default CarouselIndicators;