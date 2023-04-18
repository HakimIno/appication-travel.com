import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Platform,
  FlatList,
  StatusBar,
  SafeAreaView,
  ScrollView,
  ViewStyle,
  ImageStyle,
  Dimensions,
  RefreshControl,
  Animated,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { Feather } from "@expo/vector-icons";
import { COLORS, FONTS, icons, images } from "../constants";
import { Image } from "react-native";
import CategoryCard from "../components/home/CategoryCard";
import TopHeader from "../components/home/TopHeader";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { useWindowDimensions } from "react-native";
import Display from "../utils/Display";
import LottieView from "lottie-react-native";
import { AnimatedText } from "../components/home/AnimatedText";
import { sample } from "lodash";
import TopTabs from "../components/home/TopTabs";
import MainHeader from "../components/home/main-header";
import { SPACING } from "../constants/theme";
import TopPlacesCarousel from "../components/home/top-places-carousel";
import { TOP_PLACES } from "../constants/dummy";
import CategoryHeader from "../components/home/category-header";
import SectionHeader from "../components/shared/section-header";
import TripsList from "../components/home/trips-list";
import { PLACES } from "../constants/dummy";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";

type CurrentScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CryptoDetail"
>;

type Props = {
  navigation: CurrentScreenNavigationProp;
};

const Home = ({ navigation }: Props) => {
  const insets = useSafeAreaInsets();
  const AnimatedFeather = Animated.createAnimatedComponent(Feather);

  const scrollY = useRef(new Animated.Value(0)).current;

  const [text, setText] = useState("Hi,kimsnow");

  const [offsetY, setOffsetY] = useState<number>(0);

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
          title="ทัวร์แนะนำ"
          buttonTitle="ดูทั้งหมด"
          onPress={() => {}}
        />
        <TopPlacesCarousel list={TOP_PLACES} />

        <SectionHeader
          title="ทัวร์ทั่วโลก"
          buttonTitle="ดูทั้งหมด"
          onPress={() => {}}
        />

        {/* <TripsList list={PLACES} navigation={navigation} /> */}
        <TripsList list={PLACES} navigation={navigation} />
        <TopPlacesCarousel list={TOP_PLACES} />
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
