import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import SearchMasonry from "../components/search/search-masonry";

import { SEARCH_ALL, SEARCH_HOTELS, SEARCH_PLACES } from "../constants/dummy";
import Tabs from "../components/shared/tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import MainHeader from "../components/home/main-header";
import SearchInput from "../components/search/search-input";
import Display from "../utils/Display";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/config";
import { Hotels, TripsProps } from "../interface";
import { fetchHotelsDataQuery, fetchTripsDataQuery } from "../api/fecth.api";


const SearchScreen = () => {

  const [tripsData, setTripsData] = useState<TripsProps[]>([]);
  const [hotelsData, setHotelsData] = useState<Hotels[]>([]);

  const [searchQuery, setSearchQuery] = useState<string>("")

  useEffect(() => {
    const fetchTripsData = async () => {
      try {
        const tripsDataQuery = await fetchTripsDataQuery()

        const hotelsDataQuery = await fetchHotelsDataQuery()

        setTripsData(tripsDataQuery as unknown as TripsProps[]);
        setHotelsData(hotelsDataQuery as unknown as Hotels[])

      } catch (error) {
        console.log('Error getting trips data:', error);
      }
    };

    fetchTripsData();
  }, []);

  const All = [...tripsData, ...hotelsData].map((item) => ({
    ...item,
    id: Math.random().toString(),
  }));

  const SEARCH_ALL = All.filter(search =>
    search.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    search.location.toLowerCase().includes(searchQuery.toLowerCase()))

  const SEARCH_TRIPS = tripsData.filter(search =>
    search.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    search.location.toLowerCase().includes(searchQuery.toLowerCase()))

  const SEARCH_HOTELS = hotelsData.filter(search =>
    search.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    search.location.toLowerCase().includes(searchQuery.toLowerCase()))

  const tabs = [
    {
      title: "ทั้งหมด",
      content: () => <SearchMasonry key="all" list={SEARCH_ALL} />,
    },
    {
      title: "ทัวร์",
      content: () => <SearchMasonry key="places" list={SEARCH_TRIPS} />,
    },
    {
      title: "โรงแรม",
      content: () => <SearchMasonry key="hotels" list={SEARCH_HOTELS} />,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <SearchInput search={searchQuery} setSearch={setSearchQuery} />
      <Tabs items={tabs} />

      <View style={{ marginVertical: Display.setHeight(4) }} />
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
