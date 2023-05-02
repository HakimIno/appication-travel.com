import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

import Animated, { BounceIn } from "react-native-reanimated";
import { COLORS, SPACING } from "../../constants/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Tabs = ({ items }: any) => {
  const insets = useSafeAreaInsets();
  const [index, setIndex] = useState(0);

  return (
    <View style={[styles.container]}>
      <View style={styles.tabs}>
        {items.map((tab: any, i: number) => {
          const active = index === i;
          return (
            <TouchableOpacity
              key={i}
              onPress={() => setIndex(i)}
              style={styles.tab}
            >
              {active && (
                <Animated.View entering={BounceIn} style={styles.dot} />
              )}
              <Text style={active ? styles.activeTabText : styles.tabText}>
                {tab.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {items[index].content()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: SPACING.l,
    paddingBottom: SPACING.m - 5,
  },
  tab: {
    marginLeft: SPACING.m,
  },
  tabText: {
    color: "#747474",
    fontSize: 12.5,
    fontFamily: "SukhumvitSet-Bold",
  },
  activeTabText: {
    color: "#273150",
    fontSize: 13.5,
    fontFamily: "SukhumvitSet-Bold",
  },
  dot: {
    position: "absolute",
    top: 5,
    right: 0,
    width: 15,
    height: 15,
    backgroundColor: COLORS.green,
    borderRadius: 20,
  },
});

export default Tabs;
