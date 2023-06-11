import {
  ImageBackground,
  StyleSheet,
  View,
  StatusBar,
  ScrollView,

  Platform,

  Alert,
  Text,
  TouchableOpacity,
  AppState,
  Button,

} from "react-native";
import React, { useState, useEffect, useRef } from "react";

import { COLORS } from "../constants";
import Display from "../utils/Display";

import { AnimatedText } from "../components/home/AnimatedText";
import { map, sample } from "lodash";

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

import { DocumentData, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";

import { auth, db } from "../config/config";
import PromotionCarousel from "../components/home/promotion-carousel";

import { fetchPublic_RelationsData, fetchRecommendedTrips, fetchTripsDataQuery } from "../api/fecth.api";
import { TripsProps } from "../interface";
import { RefreshControl } from "react-native";

type CurrentScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;

interface Publics {
  id: number,
  image: string
}

const Home = () => {

  const navigation = useNavigation<CurrentScreenNavigationProp>();

  const [text, setText] = useState("สวัสดีครับ, ยินดีต้อนรับ");
  const [public_relations, setPublic_relations] = useState<Publics[]>([])
  const [tripsData, setTripsData] = useState<TripsProps[]>([]);
  const [recommendedTrips, setRecommendedTrips] = useState<TripsProps[]>([])

  const trips = tripsData.slice(0, 4);

  const message = [
    `สวัสวดีค่ะ ,“คุณ”`,
    "ยินดีต้อนรับเข้าสู่ Aumanan Juket",
    "เมื่อคุณใส่ใจพอที่จะส่งสิ่งที่ดีที่สุด ",
  ];

  const [isRefreshing, setIsRefreshing] = useState(false);

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


  const checkUnreadNotificationCount = async (userId: string) => {
    const notificationsRef = collection(db, 'notifys');
    const querySnapshot = await getDocs(notificationsRef);

    let unreadCount = 0;

    for (const docSnap of querySnapshot.docs) {
      const notificationId = docSnap.id;
      const readerRef = doc(db, 'notifys', notificationId, 'readers', userId);

      const readerDocSnap = await getDoc(readerRef);
      if (!readerDocSnap.exists()) {
        unreadCount++;
      }
    }

    return unreadCount;
  };

  // ...

  const [unreadCount, setUnreadCount] = useState(0);


  const fetchData = async () => {
    try {
      setIsRefreshing(true);

      const currentUser = auth.currentUser;
      const userId = currentUser?.uid;
      const public_relation = await fetchPublic_RelationsData();
      const queryTrips = await fetchTripsDataQuery()

      const queryRecommendedTrips = await fetchRecommendedTrips()
      const count = await checkUnreadNotificationCount(userId ? userId : '');

      setUnreadCount(count);

      setRecommendedTrips(queryRecommendedTrips as unknown as TripsProps[])
      setTripsData(queryTrips as unknown as TripsProps[]);
      setPublic_relations(public_relation as unknown as Publics[])
      setIsRefreshing(false);
    } catch (error) {
      console.log('Error gettinu data:', error);
    }
  }

  useEffect(() => {
    fetchData();
    
  }, []);


  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={fetchData}
          />
        }
        showsVerticalScrollIndicator={false}>
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
          <MainHeader unreadCount={unreadCount} />
          <AnimatedText text={text} style={styles.animateTextStyle} />
        </ImageBackground>

        <CategoryHeader />

        <View style={{ marginTop: SPACING.m }} />
        <SectionHeader
          title="โปรโมชั่น"
          buttonTitle=""
          onPress={() => {
            navigation.navigate("AllTrips", { type: "ทัวร์แนะนำ" });
          }}
        />

        <PromotionCarousel list={public_relations} />

        <SectionHeader
          title="ทัวร์แนะนำ"
          buttonTitle="ดูทั้งหมด"
          onPress={() => {
            navigation.navigate("AllTrips", { type: "ทัวร์แนะนำ" });
          }}
        />

        {recommendedTrips && <TopPlacesCarousel list={recommendedTrips} navigation={navigation} />}
        <SectionHeader
          title="ทัวร์ทั่วโลก"
          buttonTitle="ดูทั้งหมด"
          onPress={() => {
            navigation.navigate("AllTrips", { type: "ทัวร์ทั้งหมด" });
          }}
        />


        {/* <TripsList list={PLACES} navigation={navigation} /> */}

        {trips && <TripsList list={trips} navigation={navigation} />}


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


