import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

import * as Animatable from "react-native-animatable";
import BottomSheet, {
  BottomSheetProps,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useEffect, useMemo, useRef, useState } from "react";
import { COLORS, SIZES, SPACING } from "../../../constants/theme";
import CustomBackground from "./custom-background";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import CustomHandler from "./custom-handler";
import {
  MaterialIcons,
  Octicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Divider from "../../shared/divider";
import SectionHeader from "../../shared/section-header";
import Display from "../../../utils/Display";

import RatingOverall from "../../shared/Rating/rating-overall";
import HotelsCarousel from "./hotels-carousel";

import Reviews from "../../reviews/reviews";
import type { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../types";
import TripBookingBottom from "../trip-booking-bottom";
import { numberWithCommas } from "../../../utils/utils";

type Props = {
  trip: any;
};

type TripDetailsScreenNavigationProp = NavigationProp<
  RootStackParamList,
  "TripDetails"
>;

interface Prop extends BottomSheetProps {
  children: React.ReactElement[];
}

const AnimatedDivider = Animated.createAnimatedComponent(Divider);

const TripDetailsCard = ({ trip }: Props) => {
  const snapPoints = useMemo(() => ["30%", "80%"], []);

  const animatedIndex = useSharedValue(0);
  const navigation = useNavigation<TripDetailsScreenNavigationProp>();

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

  const locationStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      animatedIndex.value,
      [0, 0.08],
      [COLORS.white, COLORS.slate]
    ),
    fontSize: interpolate(
      animatedIndex.value,
      [0, 0.08],
      [12, 13],
      Extrapolation.CLAMP
    ),
  }));

  const locationIonStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          animatedIndex.value,
          [0, 0.08],
          [0, 1],
          Extrapolation.CLAMP
        ),
      },
    ],
  }));

  const contentStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          animatedIndex.value,
          [0, 0.08],
          [40, 0],
          Extrapolation.CLAMP
        ),
      },
    ],
    opacity: interpolate(
      animatedIndex.value,
      [0, 0.08],
      [0, 1],
      Extrapolation.CLAMP
    ),
  }));

  const bottomStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          animatedIndex.value,
          [0, 0.08],
          [40, 0],
          Extrapolation.CLAMP
        ),
      },
    ],
    opacity: interpolate(
      animatedIndex.value,
      [0, 0.08],
      [0, 1],
      Extrapolation.CLAMP
    ),
    paddingVertical: interpolate(
      animatedIndex.value,
      [0, 0.08],
      [0, 5],
      Extrapolation.CLAMP
    ),
  }));

  let numbers;
  const sheetRef = useRef<BottomSheet>(null);

  return (
    <>
      <BottomSheet
        index={0}
        animatedIndex={animatedIndex}
        snapPoints={snapPoints}
        backgroundComponent={CustomBackground}
        handleComponent={CustomHandler}
        ref={sheetRef}
        enableHandlePanningGesture={true}
        enableContentPanningGesture={true}
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

          <View style={styles.location}>
            <Animated.Text style={[styles.locationText, locationStyle]}>
              {trip.location}
            </Animated.Text>
            <Animated.View style={[styles.iconContainer, locationIonStyle]}>
              <MaterialIcons
                name="location-on"
                size={20}
                color={COLORS.primary}
              />
            </Animated.View>
          </View>
        </Animatable.View>
        <AnimatedDivider enabledSpacing={true} style={contentStyle} />

        <BottomSheetScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={styles.scrollBox}
        >
          <Animated.View style={contentStyle}>
            <SectionHeader
              title="สรุปการเดินทาง"
              buttonTitle=""
              onPress={() => {}}
            />

            <View style={styles.containerSummary}>
              <View style={styles.containerCalendar}>
                <Octicons name="calendar" size={20} color="black" />
                <Text style={styles.calendarText}>{trip.tripsDay}</Text>
              </View>
              <View></View>
            </View>

            <View style={styles.summary}>
              <Text style={styles.summaryText}>{trip.description}</Text>
              <View style={{ width: Display.setWidth(75) }}>
                {trip.detailsTripsDay &&
                  trip.detailsTripsDay.length > 0 &&
                  ((numbers = Array.from(
                    { length: trip.detailsTripsDay.length },
                    (_, i) => i + 1
                  )),
                  numbers.map((num) => (
                    <View style={{ flexDirection: "row" }} key={num}>
                      <Text
                        style={[styles.summaryText, { color: COLORS.primary }]}
                      >
                        <MaterialCommunityIcons
                          name="airplane"
                          size={14}
                          color={COLORS.primary}
                        />
                        Day{num}:
                      </Text>
                      <View style={{ marginHorizontal: 3 }}>
                        <Text style={styles.summaryText} numberOfLines={2}>
                          {trip.detailsTripsDay[num - 1]}
                        </Text>
                      </View>
                    </View>
                  )))}
              </View>
            </View>
            <SectionHeader
              title="โรงแรม"
              containerStyle={styles.sectionHeader}
              titleStyle={styles.sectionTitle}
              onPress={() => {}}
              buttonTitle="ดูทั้งหมด"
            />

            <HotelsCarousel hotels={trip.hotels} />

            <SectionHeader
              title={`รีวิว (${trip.reviews.length})`}
              containerStyle={styles.sectionHeader}
              titleStyle={styles.sectionTitle}
              onPress={() => {}}
              buttonTitle=""
            />
            <RatingOverall
              rating={trip.rating}
              containerStyle={styles.rating}
            />
            <Reviews reviews={trip.reviews.slice(0, 3)} />
            {trip.reviews.length > 3 ? (
              <TouchableWithoutFeedback>
                <TouchableOpacity
                  style={{ margin: SPACING.l }}
                  onPress={() => {
                    navigation.navigate("ReviewAll", { reviews: trip.reviews });
                  }}
                >
                  <Text style={styles.allReviews}>
                    แสดงรีวิวทั้งหมด {trip.reviews.length} รีวิว
                  </Text>
                </TouchableOpacity>
              </TouchableWithoutFeedback>
            ) : null}
            <View style={{ marginVertical: 15 }} />
          </Animated.View>
        </BottomSheetScrollView>
      </BottomSheet>

      <Animated.View style={[{ backgroundColor: "white" }, bottomStyle]}>
        <TripBookingBottom
          title="จองตอนนี้"
          price={numberWithCommas(trip.price)}
          onPress={() =>
            navigation.navigate("BookingTrips", {
              title: trip.title,
              price: trip.price,
            })
          }
        />
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: SPACING.l,
    paddingHorizontal: SPACING.l,
  },

  title: {
    fontSize: 15,
    fontFamily: "SukhumvitSet-Bold",
    color: COLORS.white,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 12,
    color: COLORS.white,
    fontFamily: "SukhumvitSet-Medium",
  },
  iconContainer: {
    marginHorizontal: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  locationIcon: {
    tintColor: COLORS.gray,
  },
  scrollBox: {
    marginTop: SPACING.s,
    marginBottom: SPACING.m,
  },
  containerSummary: {
    flexDirection: "row",
    marginHorizontal: SPACING.l,
    justifyContent: "space-between",
  },
  containerCalendar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  calendarText: {
    fontSize: 13,
    fontFamily: "SukhumvitSet-SemiBold",
    marginHorizontal: Display.setWidth(1),
  },
  summary: {
    marginHorizontal: SPACING.l,
    marginVertical: SPACING.s,
  },
  summaryText: {
    fontSize: 12,
    color: COLORS.slate,
    fontFamily: "SukhumvitSet-Medium",
  },
  rating: {
    marginHorizontal: SPACING.l,
  },
  sectionHeader: {
    marginTop: SPACING.s,
  },
  sectionTitle: {
    fontSize: 13,
    color: COLORS.gray,
    fontFamily: "SukhumvitSet-Bold",
  },
  allReviews: {
    fontSize: 12,
    color: COLORS.primary,
    fontFamily: "SukhumvitSet-Bold",
  },
});

export default TripDetailsCard;
