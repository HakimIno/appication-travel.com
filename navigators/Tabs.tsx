import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import {
  createBottomTabNavigator,
  BottomTabBar,
} from "@react-navigation/bottom-tabs";

import { Home } from "../screens";
import { COLORS, FONTS, SIZES, icons } from "../constants";
import SearchScreen from "../screens/search-screen";
import { Ionicons } from "@expo/vector-icons";
import SettingsScreen from "../screens/accouct-screen";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import StatusBookingScreen from "../screens/status-booking-screen";
import { SPACING } from "../constants/theme";

const Tab = createBottomTabNavigator();




const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: COLORS.white,
          borderTopColor: "transparent",
          height: 65,
        },
      }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                source={icons.home}
                resizeMode="contain"
                style={{
                  width: 28,
                  height: 28,
                  tintColor: focused ? COLORS.primary : COLORS.lightGray1,
                  zIndex: 0,
                }}
              />
              {focused ? (
                <View
                  style={{
                    width: 10,
                    height: 4,
                    borderRadius: 10,
                    backgroundColor: "#ffc123",
                    zIndex: 1,
                    bottom: 10,
                  }}
                />
              ) : (
                <View
                  style={{
                    width: 10,
                    height: 4,
                    borderRadius: 10,
                    backgroundColor: "#292929",
                    zIndex: 1,
                    bottom: 10,
                  }}
                />
              )}
              <Text
                style={{
                  color: focused ? COLORS.primary : COLORS.lightGray1,
                  fontSize: 9,
                  fontWeight: "700",
                  fontFamily: "SF-font",
                }}
              >
                หน้าแรก
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{

          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Ionicons
                name="search"
                size={28}
                color={focused ? COLORS.primary : COLORS.lightGray1}
              />
              <Text
                style={{
                  color: focused ? COLORS.primary : COLORS.lightGray1,
                  fontSize: 9,
                  fontWeight: "700",
                  fontFamily: "SF-font",
                }}
              >
                ค้นหา
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="StatusBooking"
        component={StatusBookingScreen}
        options={{
          title: "ประวัติคำสั่งซื้อ",
          headerShown: true,
          headerTitleStyle: {
            fontSize: 15,
            color: COLORS.black,
            fontFamily: "SukhumvitSet-Bold",
          },
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                source={icons.suitcase}
                resizeMode="contain"
                style={{
                  height: 30,
                  tintColor: focused ? COLORS.primary : COLORS.lightGray1,
                }}
              />
              <Text
                style={{
                  color: focused ? COLORS.primary : COLORS.lightGray1,
                  fontSize: 9,
                  fontWeight: "700",
                  fontFamily: "SF-font",
                }}
              >
                การจอง
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                source={icons.settings}
                resizeMode="contain"
                style={{
                  width: 26,
                  height: 26,
                  tintColor: focused ? COLORS.primary : COLORS.lightGray1,
                }}
              />
              <Text
                style={{
                  color: focused ? COLORS.primary : COLORS.lightGray1,
                  fontSize: 9,
                  fontWeight: "700",
                  fontFamily: "SF-font",
                }}
              >
                บัญชี
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  indicator: {
    position: "absolute",
    width: 10,
    height: 2,
    left: SIZES.width / 3 / 2 - 5,
    bottom: 30,
    backgroundColor: COLORS.primary,
    zIndex: 100,
  },
});
