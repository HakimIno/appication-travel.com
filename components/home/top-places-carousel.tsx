import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import Display from "../../utils/Display";
import { COLORS, SHADOW, SIZES, SPACING } from "../../constants/theme";
import { View } from "react-native";
import { Octicons } from "@expo/vector-icons";
import Carousel from "../shared/carousel";

import CardMedia from "../shared/card/card-media";
import Card from "../shared/card/card";

import { useRef } from "react";
import { SharedElement } from "react-navigation-shared-element";

interface Props {
  list: any;
  navigation: any;
}

const CARD_WIDTH = SIZES.width - 80;
const CARD_HEIGHT = 200;
const CARD_WIDTH_SPACING = CARD_WIDTH + SPACING.l;

const TopPlacesCarousel = ({ list, navigation }: Props) => {

  return (
    <Carousel
      items={list}
      renderItem={({ item, style, index }: any) => {
        return (
          <Card
            style={[styles.card, style]}
            onPress={() => {
              navigation.navigate("TripDetails", { trip: item });
            }}
          >
            <SharedElement
              id={`trip.${item.id}.image`}
              style={StyleSheet.absoluteFillObject}
            >
              <CardMedia source={item.image} borderBottomRadius />
            </SharedElement>
            <View style={styles.titleBox}>
              <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
              <Text style={styles.location}>{item.location}</Text>
            </View>
          </Card>
        );
      }}
    />
  );
};

TopPlacesCarousel.sharedElements = (route: any) => {
  const { trip } = route.params;
  return [
    {
      id: `trip.${trip.id}.image`,
    },
    {
      id: `trip.${trip.id}.location`,
    },
  ];
};

const styles = StyleSheet.create({
  card: {
    height: CARD_HEIGHT,
  },
  titleBox: {
    position: "absolute",
    top: CARD_HEIGHT - 80,
    left: 15,
    width: 300
  },
  title: {
    fontSize: 13,
    fontFamily: "SukhumvitSet-SemiBold",
    color: COLORS.white,
  },
  location: {
    fontSize: 12,
    color: COLORS.white,
    fontFamily: "SukhumvitSet-SemiBold",
  },
});

export default TopPlacesCarousel;
