import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Divider from "../components/shared/divider";
import { COLORS, images } from "../constants";
import { SIZES, SPACING } from "../constants/theme";
import Display from "../utils/Display";
import { Octicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { RootStackParamList } from "../types";

import LoadingBooking from "../components/booking/loading-booking";
import BookingMany from "../components/booking/booking-many";
import BottomSheet from "@gorhom/bottom-sheet";
import BottomSheetSelectDay from "../components/booking/bottomSheet-select-day";
import { addDays, format, isAfter, parseISO, startOfToday } from "date-fns";
import { numberWithCommas } from "../utils/utils";
import BookingHotels from "../components/booking/booking-hotels";

type BookingTripsScreenNavigationProp = NavigationProp<
  RootStackParamList,
  "BookingTrips"
>;

const BookingTripScreen = () => {
  const navigation = useNavigation<BookingTripsScreenNavigationProp>();
  const route = useRoute<RouteProp<RootStackParamList, "BookingTrips">>();
  const { title, price, tripsId, hotelsId, types, image, childrenPrice , hotelsName, singleBadPrice, doubleBedPrice, threeBedsPrice} = route.params;

  const details = ["ยกเลิกฟรี (ล่วงหน้า 24 ชั่วโมง)", "ยืนยัน"];
  const bottomSheetRef = useRef<BottomSheet>(null);

  const dates: string[] = [];
  let today = new Date()
  const textDate = format(today, "dd MMM");
  let toDate = format(today, "yyyy/MM/dd");
  const dateString = toDate.replace(/\//g, '-');
  const isoDateString = dateString + 'T00:00:00.000Z';
  const [date, setDate] = useState(isoDateString);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [personThree, setPersonThree] = useState(0);
  const [activeIndex, setActiveIndex] = useState("");
  const [loading, setLoading] = useState(false);

  const [singleBed, setSingleBed] = useState(0);
  const [doubleBed, setDoubleBed] = useState(0);
  const [threeBeds, setThreeBeds] = useState(0);

  const days = format(new Date(date), "dd MMM");

  for (let i = 1; i < 8; i++) {
    const date = addDays(today, i);
    const dateString = format(date, "dd MMM");
    if (!dates.includes(dateString)) {
      dates.push(dateString);
    }
  }

  if (date !== toDate) {
    if (!dates.includes(days)) {
      dates.push(days);
    }
  }

  const onPressHandler = async ({ item }: any) => {
    setLoading(true);
    setActiveIndex(item);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const handlePress = () => {
    bottomSheetRef.current?.snapToIndex(1);
  };

  const hotelsPrice = (parseFloat(singleBadPrice) * singleBed) + (parseFloat(doubleBedPrice) * doubleBed) + (parseFloat(threeBedsPrice) * threeBeds)

  const prices = numberWithCommas((parseFloat(price) * adults) + (parseFloat(childrenPrice) * children) + hotelsPrice)  ;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* <Divider enabledSpacing={false} elevations={false} /> */}
      <View style={styles.subContainer}>
        <Text
          numberOfLines={2}
          style={[styles.detailsBookingText, { fontSize: Display.setWidth(3.8) }]}
        >
          {title}
        </Text>

        <View style={{ flexDirection: "row", marginVertical: SPACING.s }}>
          {details.map((item, index) => (
            <View
              style={[
                styles.detailsBooking,
                { marginLeft: index === 0 ? 0 : SPACING.s },
              ]}
              key={index}
            >
              <Text style={styles.detailsBookingText}>{item}</Text>
            </View>
          ))}
        </View>

        <View
          style={{
            paddingHorizontal: 10,
            height: 150,
            backgroundColor: "white",
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#dddcdc",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              margin: SPACING.s,
              alignItems: "center",
            }}
          >
            <Octicons name="info" size={15} color="#707070" />
            <Text
              style={[
                styles.detailsBookingText,
                { marginLeft: SPACING.s / 2, color: "#707070" },
              ]}
            >
              โปรดเลือกวันเข้าร่วม
            </Text>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderStyle: "dashed",
              borderColor: "#e2e2e2",
            }}
          />

          <View
            style={{
              margin: SPACING.s,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={[styles.detailsBookingText, { fontSize: 11 }]}>
              เลือกวันที่ออกเดินทาง
            </Text>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={handlePress}
            >
              <Text style={[styles.detailsBookingText, { fontSize: 11 }]}>
                {textDate} - 1 Dec
              </Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={22}
                color="black"
              />
            </TouchableOpacity>
          </View>

          <View>
            <FlatList
              data={dates}
              horizontal
              removeClippedSubviews={true}
              showsHorizontalScrollIndicator={false}
              pagingEnabled={true}
              keyExtractor={(id) => id}
              renderItem={(item) => (
                <TouchableOpacity
                  style={[
                    {
                      alignSelf: "flex-start",
                      paddingHorizontal: 10,
                      paddingVertical: 8,
                      backgroundColor: "#eeeef1",
                      marginLeft: 10,
                      borderRadius: 6,
                      borderWidth: 1,
                      borderColor: "#eeeef1",
                    },
                    activeIndex === item.item && {
                      borderColor: COLORS.primary,
                      borderWidth: 1,
                      backgroundColor: "#dbeafe",
                    },
                  ]}
                  onPress={() => onPressHandler(item)}
                >
                  <Text
                    style={[
                      styles.detailsBookingText,
                      { fontSize: 11 },
                      activeIndex === item.item && { color: COLORS.primary },
                    ]}
                  >
                    {item.item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>

        <BookingMany
          adults={adults}
          setAdults={setAdults}
          children={children}
          setChildren={setChildren}
          setPersonThree={setPersonThree}
          personThree={personThree}
          activeIndex={activeIndex}
          price={numberWithCommas(price)}
          childrenPrice={numberWithCommas(childrenPrice)}
        />

        <BookingHotels
          singleBed={singleBed}
          setSingleBed={setSingleBed}
          doubleBed={doubleBed}
          setDoubleBed={setDoubleBed}
          setThreeBeds={setThreeBeds}
          threeBeds={threeBeds}
          hotelsName={hotelsName}
          singleBadPrice={singleBadPrice}
          doubleBedPrice={doubleBedPrice}
          threeBedsPrice={threeBedsPrice}
        />


        <View
          style={{
            marginVertical: Display.setHeight(5),
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{
                color: "black",
                fontSize: 13,
                fontWeight: "bold",
                marginVertical: Display.setHeight(1),
              }}
            >
              รวม {prices} ฿
            </Text>
          </View>
          <TouchableOpacity
            style={{
              alignItems: "center",
              backgroundColor: COLORS.primary,
              paddingVertical: Display.setWidth(2),
              borderRadius: SIZES.radius,
            }}
            onPress={() => {
              if (adults !== 0 || (children !== 0 && activeIndex !== "") || singleBed !== 0 || doubleBed !== 0 || threeBeds !== 0) {
                navigation.navigate("BookingInformation", {
                  tripsId: tripsId,
                  hotelsId: hotelsId,
                  title: title,
                  image: image,
                  price: prices,
                  adults: adults,
                  children: children,
                  bookingDate: activeIndex,
                  singleBad: singleBed,
                  doubleBed: doubleBed,
                  threeBeds: threeBeds,
                  hotelsName: hotelsName,
                  types: types
                });
              }
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: SPACING.m,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: Display.setWidth(3.5),
                  fontFamily: "SukhumvitSet-Bold",
                }}
              >
                ดำเนินการจอง
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <BottomSheetSelectDay
        bottomSheetRef={bottomSheetRef}
        date=""
        setDate={setDate}
        toDate={toDate}
        setActiveIndex={setActiveIndex}
      />
      {loading && <LoadingBooking src={images.loadingData} />}
    </ScrollView>
  );
};

export default BookingTripScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  subContainer: {
    marginHorizontal: SPACING.m,
    marginTop: SPACING.l,
  },
  detailsBooking: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
    backgroundColor: "#eeeef1",
    alignSelf: "flex-start",
  },
  detailsBookingText: {
    fontSize: Display.setWidth(2.3),
    fontFamily: "SukhumvitSet-SemiBold",
  },
});
