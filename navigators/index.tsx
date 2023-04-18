import {
  StackNavigationOptions,
  createStackNavigator,
} from "@react-navigation/stack";
import { CardStyleInterpolators } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./Tabs";
import { CryptoDetail, Transaction } from "../screens";
import { LoginScreen } from "../screens/login-screen";
import OtpRegister from "../screens/otp-register";
import InputVerificationScreen from "../screens/input-verification-screen";
import { RootStackParamList } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Text } from "react-native";
import TripDetailsScreen from "../screens/trip-details-screen";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

const Stack = createSharedElementStackNavigator<RootStackParamList>();

const Navigators = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          gestureDirection: "horizontal",
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SendOTP" component={OtpRegister} />
        <Stack.Screen name="InputOTP" component={InputVerificationScreen} />
        <Stack.Screen
          name="Home"
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
        <Stack.Screen name="CryptoDetail" component={CryptoDetail} />
        <Stack.Screen name="Transaction" component={Transaction} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigators;
