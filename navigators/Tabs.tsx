import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  createBottomTabNavigator,
  BottomTabBar,
} from "@react-navigation/bottom-tabs";

import { CryptoDetail, Home, Transaction } from "../screens";
import { COLORS, FONTS, icons } from "../constants";

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
    >
      <Tab.Screen
        name="HomeS"
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
                  fontFamily: 'SF-font'
                }}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="CryptoDetail"
        component={CryptoDetail}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                source={icons.trending}
                resizeMode="contain"
                style={{
                  width: 28,
                  height: 28,
                  tintColor: focused ? COLORS.primary : COLORS.lightGray1,
                }}
              />
              <Text
                style={{
                  color: focused ? COLORS.primary : COLORS.lightGray1,
                  fontSize: 9,
                  fontWeight: "700",
                  fontFamily: 'SF-font'
                }}
              >
                Hot
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Transaction"
        component={Transaction}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              {focused ? (
                <View
                  style={{
                    width: 10,
                    height: 3,
                    borderRadius: 10,
                    backgroundColor: "#ffc123",
                    zIndex: 1,
                    top: 8,
                  }}
                />
              ) : (
                <View
                  style={{
                    width: 10,
                    height: 3,
                    borderRadius: 10,
                    backgroundColor: "#292929",
                    zIndex: 1,
                    top: 8,
                  }}
                />
              )}
              <Image
                source={icons.bookmark}
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
                  fontFamily: 'SF-font'
                }}
              >
                Bookmark
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Home}
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
                  fontFamily: 'SF-font'
                }}
              >
                Profile
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
});
