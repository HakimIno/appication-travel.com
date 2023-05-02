import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useMemo, useRef } from "react";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { COLORS, icons } from "../../../constants";
import * as Animatable from "react-native-animatable";
import { SIZES, SPACING } from "../../../constants/theme";
import BottomSheet, {
  BottomSheetProps,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import CustomBackground from "../../trip-details/TripDetailsCard/custom-background";
import CustomHandler from "../../trip-details/TripDetailsCard/custom-handler";
import { MaterialIcons } from "@expo/vector-icons";
import Divider from "../../shared/divider";
import * as Linking from "expo-linking";
import { FontAwesome5 } from "@expo/vector-icons";
import SectionHeader from "../../shared/section-header";
import RatingOverall from "../../shared/Rating/rating-overall";
import Reviews from "../../reviews/reviews";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../types";
import TripBookingBottom from "../../trip-details/trip-booking-bottom";

type Props = {
  hotel: any;
};

type HotelScreenNavigationProp = NavigationProp<
  RootStackParamList,
  "HotelScreen"
>;

const AnimatedDivider = Animated.createAnimatedComponent(Divider);

const HotelDetailsCard = ({ hotel }: Props) => {
  const snapPoints = useMemo(() => ["30%", "80%"], []);
  const animatedIndex = useSharedValue(0);
  const sheetRef = useRef<BottomSheet>(null);
  const navigation = useNavigation<HotelScreenNavigationProp>();

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

  const openMaps = () => {
    Linking.openURL("https://www.google.com/maps");
  };

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
            {hotel.title}
          </Animated.Text>

          <View style={styles.location}>
            <Animated.Text style={[styles.locationText, locationStyle]}>
              {hotel.location}
            </Animated.Text>
            <Animated.View style={[styles.iconContainer, locationIonStyle]}>
              <MaterialIcons
                name="location-on"
                size={20}
                color={COLORS.primary}
              />
            </Animated.View>
          </View>

          <Animated.View style={contentStyle}>
            <TouchableOpacity onPress={openMaps} style={styles.mapsStyle}>
              <Image
                source={icons.hotelIcon}
                style={{ width: 30, height: 30 }}
              />
              <Text
                style={[
                  styles.locationText,
                  { color: COLORS.black, width: 200 },
                ]}
                numberOfLines={1}
              >
                เดอะ+เซน+พัทยาxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FontAwesome5
                  name="location-arrow"
                  size={16}
                  color={COLORS.primary}
                />
                <Text
                  style={[
                    styles.locationText,
                    { color: COLORS.black, marginHorizontal: 3 },
                  ]}
                >
                  แผนที่
                </Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
          <AnimatedDivider enabledSpacing={false} style={contentStyle} />
        </Animatable.View>
        <BottomSheetScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View style={contentStyle}>
            <SectionHeader
              title="รายละเอียดที่พัก"
              buttonTitle=""
              onPress={() => {}}
            />
            <View style={styles.summary}>
              <Text style={styles.summaryText}>{hotel.description}</Text>
            </View>

            <SectionHeader
              title={`รีวิว (${hotel.reviews.length})`}
              containerStyle={styles.sectionHeader}
              titleStyle={styles.sectionTitle}
              onPress={() => {}}
              buttonTitle=""
            />
            <RatingOverall
              rating={hotel.rating}
              containerStyle={styles.rating}
            />
            <Reviews reviews={hotel.reviews.slice(0, 3)} />
            {hotel.reviews.length > 3 ? (
              <TouchableWithoutFeedback>
                <TouchableOpacity
                  style={{ margin: SPACING.l, marginBottom: SPACING.l * 3 }}
                  onPress={() => {
                    navigation.navigate("ReviewAll", {
                      reviews: hotel.reviews,
                    });
                  }}
                >
                  <Text style={styles.allReviews}>
                    แสดงรีวิวทั้งหมด {hotel.reviews.length} รีวิว
                  </Text>
                </TouchableOpacity>
              </TouchableWithoutFeedback>
            ) : null}
          </Animated.View>
        </BottomSheetScrollView>
      </BottomSheet>

      <Animated.View style={[{ backgroundColor: "white" }, bottomStyle]}>
        <TripBookingBottom
          title="จองตอนนี้"
          price="200"
          onPress={() =>
            navigation.navigate("BookingTrips", {
              title: hotel.title,
              price: hotel.pricePeerDay,
            })
          }
        />
      </Animated.View>
    </>
  );
};

export default HotelDetailsCard;

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
  mapsStyle: {
    marginVertical: SPACING.m,
    height: 50,
    backgroundColor: "#ecfeff",
    borderRadius: SIZES.radius,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.s,
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
    marginTop: SPACING.m,
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
