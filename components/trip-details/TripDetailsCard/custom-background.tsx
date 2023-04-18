import React from "react";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { COLORS } from "../../../constants";
import { StyleProp, ViewStyle } from "react-native";

type Props = {
  animatedIndex: Animated.SharedValue<number>;
  style?: any;
};

const CustomBackground = ({ animatedIndex, style }: Props) => {
  const containerStyle = useAnimatedStyle(() => ({
    ...style,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    opacity: interpolate(
      animatedIndex.value,
      [0, 0.08],
      [0, 1],
      Extrapolation.CLAMP
    ),
  }));
  return <Animated.View style={containerStyle} />;
};

export default CustomBackground;
