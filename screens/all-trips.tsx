import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import SearchMasonry from "../components/search/search-masonry";
import { SEARCH_ALL, SEARCH_HOTELS, SEARCH_PLACES } from "../constants/dummy";
import { COLORS } from "../constants";
import { SPACING } from "../constants/theme";
import Divider from "../components/shared/divider";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import { HeaderBack } from "../components/shared/headerBack";
import { StackNavigationProp } from "@react-navigation/stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/config";
import { Hotels, TripsProps } from "../interface";
import { fetchHotelsDataQuery, fetchTripsDataQuery } from "../api/fecth.api";

type CurrentScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "AllTrips"
>;

const AllTrips = () => {
  const route = useRoute<RouteProp<RootStackParamList, "AllTrips">>();
  const navigation = useNavigation<CurrentScreenNavigationProp>();
  const { type } = route.params;
  const insets = useSafeAreaInsets();

  const [tripsData, setTripsData] = useState<TripsProps[]>([]);
  const [hotelData, setHotelData] = useState<Hotels[]>([]);

  useEffect(() => {
    const fetchTripsData = async () => {
      try {
        const tripsData = await fetchTripsDataQuery()

        const hotelsData = await fetchHotelsDataQuery()


        setHotelData(hotelsData as unknown as Hotels[])
        setTripsData(tripsData as unknown as TripsProps[]);
      } catch (error) {
        console.log('Error getting trips data:', error);
      }
    };

    fetchTripsData();
  }, []);


  return (
    <View style={styles.container}>
      <View
        style={{
         
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <HeaderBack onPress={() => navigation.goBack()} />
        <Text style={{ fontSize: 16, fontFamily: "SukhumvitSet-Bold", marginTop: SPACING.m}}>{type}</Text>
      </View>
      <Divider enabledSpacing={false} />
      <View style={{ flex: 1 , marginTop: SPACING.s}}>
        <SearchMasonry
          key="all"
          list={
            type === "ทัวร์ทั้งหมด"
              ? tripsData
              : type === "โรงแรม"
                ? hotelData
                : tripsData
          }
        />
      </View>
    </View>
  );
};

export default AllTrips;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
