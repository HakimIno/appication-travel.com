import {
  ImageBackground,
  StyleSheet,
  View,
  StatusBar,
  ScrollView,
  Animated,
  TouchableOpacity,
  Platform,
  AppState,
  Alert,
  Text,
} from "react-native";
import React, { useState, useEffect, useRef, useMemo, useContext, useLayoutEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { COLORS, FONTS, icons, images } from "../constants";

import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import Display from "../utils/Display";

import { AnimatedText } from "../components/home/AnimatedText";
import { sample } from "lodash";

import MainHeader from "../components/home/main-header";
import { SPACING } from "../constants/theme";
import TopPlacesCarousel from "../components/home/top-places-carousel";
import { HOTELS, PROMOTION, TOP_PLACES } from "../constants/dummy";
import CategoryHeader from "../components/home/category-header";
import SectionHeader from "../components/shared/section-header";
import TripsList from "../components/home/trips-list";
import { PLACES } from "../constants/dummy";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { useNavigation } from "@react-navigation/native";
import "firebase/messaging";
import "firebase/functions";
import "firebase/auth";
import "firebase/firestore";
import { NotificationContext } from "../config/noty";


import Constants from 'expo-constants';
import { DocumentData, collection, doc, getDoc, getDocs } from "firebase/firestore";

import { db } from "../config/config";
import HeaderBooking from "../components/booking/header/header-booking";
import PromotionCarousel from "../components/home/promotion-carousel";


type CurrentScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;

const Home = () => {
  const navigation = useNavigation<CurrentScreenNavigationProp>();
  const { registerForPushNotifications } = useContext(NotificationContext);

  const [text, setText] = useState("Hi,kimsnow");

  const [tripsData, setTripsData] = useState<any>(null);


  const message = [
    "สวัสวดีค่ะ ,“คุณอูฐ”",
    "“ฉันจะเดินหนึ่งไมล์เพื่ออูฐ”",
    "เมื่อคุณใส่ใจพอที่จะส่งสิ่งที่ดีที่สุด ",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomMessage = sample(message);
      if (randomMessage) {
        setText(randomMessage);
      }
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);



  useEffect(() => {
    const fetchTripsData = async () => {
      try {
        const tripsCollectionRef = collection(db, 'trips');
        const querySnapshot = await getDocs(tripsCollectionRef);

        const tripsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          hotels: [],
          reviews: [],
        }));

        setTripsData(tripsData);
      } catch (error) {
        console.log('Error getting trips data:', error);
      }
    };

    fetchTripsData();
  }, []);


  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={{
            uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.hdnicewallpapers.com%2FWalls%2FBig%2FVehicles%2FBoat_on_Blue_Sea_4K_Wallpaper.jpg&f=1&nofb=1&ipt=25f5abcf1d94032e6075a884c2149139cecd2fdd6bb72290fa386a45b566b15a&ipo=images",
          }}
          style={{ height: 180, flex: 1 }}
        >
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="light-content"
          />
          <MainHeader />
          <AnimatedText text={text} style={styles.animateTextStyle} />
        </ImageBackground>

        <CategoryHeader />


        <SectionHeader
          title="โปรโมชั่น"
          buttonTitle=""
          onPress={() => {
            navigation.navigate("AllTrips", { type: "ทัวร์แนะนำ" });
          }}
        />

        <PromotionCarousel list={PROMOTION} />

        <SectionHeader
          title="ทัวร์แนะนำ"
          buttonTitle="ดูทั้งหมด"
          onPress={() => {
            navigation.navigate("AllTrips", { type: "ทัวร์แนะนำ" });
          }}
        />

        <TopPlacesCarousel list={TOP_PLACES} navigation={navigation} />
        <SectionHeader
          title="ทัวร์ทั่วโลก"
          buttonTitle="ดูทั้งหมด"
          onPress={() => {
            navigation.navigate("AllTrips", { type: "ทัวร์ทั้งหมด" });
          }}
        />


        {/* <TripsList list={PLACES} navigation={navigation} /> */}
        <TripsList list={PLACES} navigation={navigation} />

        {tripsData && <TripsList list={tripsData} navigation={navigation} />}


        <View style={{ marginVertical: Display.setHeight(5) }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  animateTextStyle: {
    marginHorizontal: Display.setWidth(3),
    fontSize: 14,
    color: COLORS.white,
    fontFamily: "SukhumvitSet-Bold",
    paddingHorizontal: SPACING.l,
    paddingVertical: SPACING.m,
    textShadowColor: "#858585",
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
  },
});

export default Home;
