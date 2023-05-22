import {
  StackNavigationOptions,
  createStackNavigator,
} from "@react-navigation/stack";
import { CardStyleInterpolators } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./Tabs";

import { LoginScreen } from "../screens/login-screen";
import OtpRegister from "../screens/otp-register";
import InputVerificationScreen from "../screens/input-verification-screen";
import { RootStackParamList } from "../types";
import { Octicons } from "@expo/vector-icons";

import TripDetailsScreen from "../screens/trip-details-screen";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import ReviewScreen from "../screens/review-screen";
import { COLORS } from "../constants";
import BookingTripScreen from "../screens/booking-trips-screen";
import EmailLoginScreen from "../screens/email-login-screen";
import BookingInformationScreen from "../screens/booking-information-screen";
import RegisterScreen from "../screens/register-screen";
import HotelDetailsScreen from "../screens/hotel-details-screen";
import AllTrips from "../screens/all-trips";
import NotificationScreen from "../screens/notification-screen";
import ReviewInputScreen from "../screens/review-input-screen";
import FullScreenImage from "../screens/full-screen";
import ForgotPasswordScreen from "../screens/forgot-password-screen";
import HotelsBookingScreen from "../screens/hotels-booking";
import FavoriteScreen from "../screens/favorite-screen";
import NotificationDetails from "../screens/notification-details";
import PromoDetails from "../screens/promo-details";
import AboutScreen from "../screens/about-screen";

const Stack = createSharedElementStackNavigator<RootStackParamList>();

const Navigators = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          gestureDirection: "horizontal",
          transitionSpec: {
            open: { animation: "timing", config: { duration: 300 } },
            close: { animation: "timing", config: { duration: 300 } },
          },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="EmailLogin" component={EmailLoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="SendOTP" component={OtpRegister} />
        <Stack.Screen name="InputOTP" component={InputVerificationScreen} />
        <Stack.Screen
          name="Root"
          component={Tabs}
          options={
            {
              headerShown: false,
              useNativeDriver: true,
              gestureEnabled: false,
            } as StackNavigationOptions
          }
        />
        <Stack.Screen
          name="Notification"
          component={NotificationScreen}
          options={{
            headerShown: true,
            title: "การแจ้งเตือน",
            headerTitleStyle: {
              fontSize: 15,
              color: COLORS.black,
              fontFamily: "SukhumvitSet-Bold",
            },
            headerBackImage: () => (
              <Octicons
                name="arrow-left"
                size={24}
                color={COLORS.black}
                style={{ marginLeft: 10 }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="TripDetails"
          component={TripDetailsScreen}
          options={
            {
              headerShown: false,
              useNativeDriver: true,
              gestureEnabled: false,
              cardStyleInterpolator: ({ current: { progress } }) => ({
                cardStyle: {
                  opacity: progress,
                },
              }),
            } as StackNavigationOptions
          }
        />
        <Stack.Screen
          name="HotelScreen"
          component={HotelDetailsScreen}
          options={
            {
              headerShown: false,
              useNativeDriver: true,
              gestureEnabled: false,
              cardStyleInterpolator: ({ current: { progress } }) => ({
                cardStyle: {
                  opacity: progress,
                },
              }),
            } as StackNavigationOptions
          }
        />
        <Stack.Screen
          name="AllTrips"
          component={AllTrips}
          options={{
            headerShown: false,

            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            gestureDirection: "horizontal",
          }}
        />
        <Stack.Screen
          name="ReviewAll"
          component={ReviewScreen}
          options={{
            headerShown: true,
            title: "รีวิวทั้งหมด",

            headerTitleStyle: {
              fontSize: 15,
              color: COLORS.black,
              fontFamily: "SukhumvitSet-Bold",
            },
            headerBackImage: () => (
              <Octicons
                name="arrow-left"
                size={24}
                color={COLORS.black}
                style={{ marginLeft: 10 }}
              />
            ),
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            gestureDirection: "horizontal",
          }}
        />
        <Stack.Screen
          name="BookingTrips"
          component={BookingTripScreen}
          options={{
            headerShown: true,
            title: "ตัวเลือกการจอง",
            headerTitleStyle: {
              fontSize: 15,
              color: COLORS.black,
              fontFamily: "SukhumvitSet-Bold",
            },
            headerBackImage: () => (
              <Octicons
                name="arrow-left"
                size={24}
                color={COLORS.black}
                style={{ marginLeft: 10 }}
              />
            ),
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            gestureDirection: "horizontal",
          }}
        />
        <Stack.Screen
          name="BookingHotels"
          component={HotelsBookingScreen}
          options={{
            headerShown: true,
            title: "ตัวเลือกการจอง",
            headerTitleStyle: {
              fontSize: 15,
              color: COLORS.black,
              fontFamily: "SukhumvitSet-Bold",
            },
            headerBackImage: () => (
              <Octicons
                name="arrow-left"
                size={24}
                color={COLORS.black}
                style={{ marginLeft: 10 }}
              />
            ),
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            gestureDirection: "horizontal",
          }}
        />
        <Stack.Screen
          name="BookingInformation"
          component={BookingInformationScreen}
          options={{
            headerShown: true,
            title: "ดำเนินการจอง",
            headerTitleStyle: {
              fontSize: 15,
              color: COLORS.black,
              fontFamily: "SukhumvitSet-Bold",
            },
            headerBackImage: () => (
              <Octicons
                name="arrow-left"
                size={24}
                color={COLORS.black}
                style={{ marginLeft: 10 }}
              />
            ),
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            gestureDirection: "horizontal",
          }}
        />

        <Stack.Screen
          name="Favorite"
          component={FavoriteScreen}
          options={{
            headerShown: true,
            title: "รายการโปรด",
            headerTitleStyle: {
              fontSize: 15,
              color: COLORS.black,
              fontFamily: "SukhumvitSet-Bold",
            },
            headerBackImage: () => (
              <Octicons
                name="arrow-left"
                size={24}
                color={COLORS.black}
                style={{ marginLeft: 10 }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="ReviewInput"
          component={ReviewInputScreen}
          options={{
            headerShown: true,
            title: "ให้คะแนนแพ็คเกจ",
            headerTitleStyle: {
              fontSize: 15,
              color: COLORS.black,
              fontFamily: "SukhumvitSet-Bold",
            },
            headerBackImage: () => (
              <Octicons
                name="arrow-left"
                size={24}
                color={COLORS.black}
                style={{ marginLeft: 10 }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="PromoDetails"
          component={PromoDetails}
          options={{
            headerShown: true,
            title: "โปรโมชั่นสุดพิเศษ",
            headerTitleStyle: {
              fontSize: 15,
              color: COLORS.black,
              fontFamily: "SukhumvitSet-Bold",
            },
            headerBackImage: () => (
              <Octicons
                name="arrow-left"
                size={24}
                color={COLORS.black}
                style={{ marginLeft: 10 }}
              />
            ),
          }}
        />


        <Stack.Screen
          name="NotificationDetails"
          component={NotificationDetails}
          options={{
            headerShown: true,
            title: "Aumanan Juket",
            headerTitleStyle: {
              fontSize: 15,
              color: COLORS.black,
              fontFamily: "SukhumvitSet-Bold",
            },
            headerBackImage: () => (
              <Octicons
                name="arrow-left"
                size={24}
                color={COLORS.black}
                style={{ marginLeft: 10 }}
              />
            ),
          }}
        />

        <Stack.Screen
          name="About"
          component={AboutScreen}
          options={{
            headerShown: true,
            title: "",
            headerTitleStyle: {
              fontSize: 15,
              color: COLORS.black,
              fontFamily: "SukhumvitSet-Bold",
            },
            headerBackImage: () => (
              <Octicons
                name="arrow-left"
                size={24}
                color={COLORS.black}
                style={{ marginLeft: 10 }}
              />
            ),
          }}
        />


        <Stack.Screen
          name="FullScreenImage"
          component={FullScreenImage}
          options={({ route }) => ({
            title: '',
            headerShown: false,
            cardStyleInterpolator: ({ current: { progress } }) => ({
              cardStyle: { opacity: progress },
            }),
          })}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigators;
