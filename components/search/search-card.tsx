import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Animated, { FadeInDown } from "react-native-reanimated";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { SharedElement } from "react-navigation-shared-element";
import Card from "../shared/card/card";
import CardMedia from "../shared/card/card-media";
import CardContent from "../shared/card/card-content";
import { COLORS } from "../../constants";
import { SPACING } from "../../constants/theme";
import { RootStackParamList } from "../../types";

type Props = {
  item: any;
  index: any;
};

type SearchScreenNavigationProp = NavigationProp<RootStackParamList>;

const SearchCard = ({ item, index }: Props) => {
  const navigation = useNavigation<SearchScreenNavigationProp>();
  const even = index % 2 === 0;

  

  return (
    <Animated.View
      entering={FadeInDown.delay(index < 6 ? index * 80 : 0)}
      style={{
        paddingTop: index === 3 ? SPACING.l / 8 : 0,
        paddingLeft: !even ? SPACING.s / 3 : 0,
        paddingRight: even ? SPACING.s / 3 : 0,
      }}
    >
      <Card
        onPress={() => {
          item.type === "PLACE"
            ? navigation.navigate("TripDetails", { trip: item })
            : navigation.navigate("HotelScreen", { hotel: item });
        }}
        style={{
          width: "100%",
          height: index === 1 ? 180 : 240,
        }}
      >
        <SharedElement id={`trip.${item.id}.image`} style={styles.media}>
          <CardMedia source={item.image} />
        </SharedElement>
        <CardContent>
          <View style={styles.titleBox}>
            <Text style={styles.title} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={styles.location}>{item.location}</Text>
          </View>
        </CardContent>
      </Card>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  media: {
    flex: 1,
  },
  titleBox: {
    flex: 1,
  },
  title: {
    fontSize: 11.5,
    fontFamily: "SukhumvitSet-Bold",
    color: "#444",
  },
  location: {
    fontSize: 10,
    color: COLORS.slate,
    fontFamily: "SukhumvitSet-Medium",
  },
});

export default SearchCard;
