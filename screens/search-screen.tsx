import React from "react";
import { View, StyleSheet, Text } from "react-native";
import SearchMasonry from "../components/search/search-masonry";

import { SEARCH_ALL, SEARCH_HOTELS, SEARCH_PLACES } from "../constants/dummy";
import Tabs from "../components/shared/tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import MainHeader from "../components/home/main-header";
import SearchInput from "../components/search/search-input";
import Display from "../utils/Display";

const tabs = [
  {
    title: "ทั้งหมด",
    content: () => <SearchMasonry key="all" list={SEARCH_ALL} />,
  },
  {
    title: "ทัวร์",
    content: () => <SearchMasonry key="places" list={SEARCH_PLACES} />,
  },
  {
    title: "โรงแรม",
    content: () => <SearchMasonry key="hotels" list={SEARCH_HOTELS} />,
  },
];

const SearchScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SearchInput />
      <Tabs items={tabs} />
  
      <View style={{ marginVertical: Display.setHeight(4)}} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default SearchScreen;
