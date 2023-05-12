import React, { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { Octicons, Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING } from "../../constants/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  search: string
  setSearch: any;
}
const SearchInput = ({ search, setSearch }: Props) => {

  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { marginTop: insets.top }]}>
      <View style={styles.inner}>
        <View style={styles.search} pointerEvents="none">
          <Ionicons name="search" size={22} color="black" />
        </View>
        <TextInput
          style={styles.field}
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
        />
        <View style={styles.filter}>
          <Octicons name="filter" size={22} color="black" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.m,
    paddingBottom: SPACING.m,
  },
  inner: {
    flexDirection: "row",
  },
  search: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
  },
  field: {
    backgroundColor: COLORS.white,
    paddingLeft: SPACING.xl + SPACING.s,
    paddingVertical: SPACING.s,
    borderRadius: 10,
    flex: 1,
    elevation: 2,
    fontSize: 13,
    fontFamily: "SukhumvitSet-SemiBold",
  },
  filter: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
});

export default SearchInput;
