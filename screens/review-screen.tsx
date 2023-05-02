import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import Reviews from "../components/reviews/reviews";
import { COLORS } from "../constants";
import Divider from "../components/shared/divider";

const ReviewScreen = () => {
  const insets = useSafeAreaInsets();
  const route = useRoute<RouteProp<RootStackParamList, "ReviewAll">>();
  const { reviews } = route.params;
  return (
    <View style={[styles.container]}>
      <Divider enabledSpacing={false} elevations={false} />

      <ScrollView>
        <Reviews reviews={reviews} />
      </ScrollView>
    </View>
  );
};

export default ReviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
