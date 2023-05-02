import { StyleSheet, Text, View } from "react-native";
import React from "react";
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

type CurrentScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "AllTrips"
>;

const AllTrips = () => {
  const route = useRoute<RouteProp<RootStackParamList, "AllTrips">>();
  const navigation = useNavigation<CurrentScreenNavigationProp>();
  const { type } = route.params;
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View
        style={{
          marginTop: insets.top,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <HeaderBack onPress={() => navigation.goBack()} />
        <Text style={{ fontSize: 16 ,  fontFamily: "SukhumvitSet-Bold",}}>{type}</Text>
      </View>
      <Divider enabledSpacing={false} />
      <View style={{ flex: 1  }}>
        <SearchMasonry
          key="all"
          list={
            type === "ทัวร์ทั้งหมด"
              ? SEARCH_PLACES
              : type === "โรงแรม"
              ? SEARCH_HOTELS
              : SEARCH_ALL
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
