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

} from "react-native";
import React, { useState, useEffect, useRef } from "react";

import { COLORS } from "../constants";



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

import { DocumentData, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";

import { db } from "../config/config";
import PromotionCarousel from "../components/home/promotion-carousel";
import * as Notifications from "expo-notifications";
import * as Devices from "expo-device";
import Constants from 'expo-constants'
import { firebaseConfig } from "../config/config";
import { fetchPublic_RelationsData, fetchTripsDataQuery } from "../api/fecth.api";
import { TripsProps } from "../interface";
import { RefreshControl } from "react-native";


type CurrentScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
})

async function sendPushNotification(expoPushToken: string) {
  console.log(expoPushToken)
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

interface Publics {
  id: number,
  image: string
}

const Home = () => {
  const navigation = useNavigation<CurrentScreenNavigationProp>();

  const [text, setText] = useState("สวัสดีครับ, ยินดีต้อนรับ");
  const [public_relations, setPublic_relations] = useState<Publics[]>([])
  const [tripsData, setTripsData] = useState<TripsProps[]>([]);

  const trips = tripsData.slice(0, 4);

  const message = [
    "สวัสวดีค่ะ ,“คุณอูฐ”",
    "“ฉันจะเดินหนึ่งไมล์เพื่ออูฐ”",
    "เมื่อคุณใส่ใจพอที่จะส่งสิ่งที่ดีที่สุด ",
  ];

  const [expoPushToken, setExpoPushToken] = useState('')
  const [notification, setNotification] = useState<any>(false);
  const notificationListener = useRef<Notifications.Subscription | undefined>();
  const responseListener = useRef<Notifications.Subscription | undefined>();
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token: any) => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      setNotification(response);
    });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);


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
    fetchData()
  }, []);


  const fetchData = async () => {
    try {
      setIsRefreshing(true);
      const public_relation = await fetchPublic_RelationsData();
      const queryTrips = await fetchTripsDataQuery()

      setTripsData(queryTrips as unknown as TripsProps[]);
      setPublic_relations(public_relation as unknown as Publics[])
      setIsRefreshing(false);
    } catch (error) {
      console.log('Error gettinu data:', error);
    }
  }

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
          <MainHeader />
          <AnimatedText text={text} style={styles.animateTextStyle} />
        </ImageBackground>

        <CategoryHeader />

        <View  style={{marginTop: SPACING.m}}/>
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

        {tripsData && <TopPlacesCarousel list={tripsData} navigation={navigation} />}
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


async function registerForPushNotificationsAsync() {
  let token

  if (Devices.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }

    if (finalStatus !== 'granted') {
      Alert.alert('Failed to get push token for push notification!')
      return
    }

    token = (await Notifications.getDevicePushTokenAsync()).data
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C'
    })
  }

  return token
}