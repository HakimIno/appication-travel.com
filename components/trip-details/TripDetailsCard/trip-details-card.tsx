import { View, StyleSheet, Text } from "react-native";

import * as Animatable from "react-native-animatable";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useEffect, useMemo, useRef } from "react";
import { COLORS, SIZES, SPACING } from "../../../constants/theme";
import CustomBackground from "./custom-background";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

type Props = {
  trip: any;
};

const TripDetailsCard = ({ trip }: Props) => {
  const snapPoints = useMemo(() => ["30%", "80%"], []);
  const animatedIndex = useSharedValue(0);

  const titleStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      animatedIndex.value,
      [0, 0.08],
      [COLORS.white, COLORS.black]
    ),
    marginBottom: interpolate(
      animatedIndex.value,
      [0, 0.08],
      [0, 10],
      Extrapolation.CLAMP
    ),
  }));
  return (
    <BottomSheet
      index={0}
      animatedIndex={animatedIndex}
      snapPoints={snapPoints}
      backgroundComponent={CustomBackground}
    >
      <Animatable.View
        style={styles.header}
        animation="fadeInUp"
        delay={500}
        easing="ease-in-out"
        duration={400}
      >
        <Animated.Text style={[styles.title, titleStyle]}>
          {trip.title}
        </Animated.Text>

        <Text style={styles.location}>{trip.location}</Text>
      </Animatable.View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: SPACING.l,
    paddingHorizontal: SPACING.l,
  },
  title: {
    fontSize: 14,
    fontFamily: "SukhumvitSet-Bold",
    color: COLORS.white,
  },
  location: {
    flexDirection: "row",
    fontSize: 12,
    fontFamily: "SukhumvitSet-Bold",
    color: COLORS.gray,
    alignItems: "flex-start",
  },
});

export default TripDetailsCard;
