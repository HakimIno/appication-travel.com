import { StyleSheet, Text, View } from "react-native";
import Card from "../../shared/card/card";
import CardContent from "../../shared/card/card-content";
import CardMedia from "../../shared/card/card-media";
import Rating from "../../shared/Rating/rating";
import { COLORS, SIZES } from "../../../constants";

import HotelsCarouselCompo from "../../shared/hoteal-carousel-compo";

const CARD_HEIGHT = 200;

interface Props {
  hotels: any;
}

const HotelsCarousel = ({ hotels }: Props) => {
  return (
    <HotelsCarouselCompo
      items={hotels}
      renderItem={({ item, style }) => {
        return (
          <Card
            style={[styles.card, style]}
            onPress={() => console.log("xxxxxx")}
          >
            {/* <CardFavoriteIcon active={false} onPress={() => {}} /> */}
            <CardMedia source={item.image}  />
            <CardContent style={styles.content}>
              <View style={styles.titleBox}>
                <Text style={styles.title} numberOfLines={1}>
                  {item.title}
                </Text>
                <View style={styles.locationBox}>
                  <Text style={styles.location} numberOfLines={1}>
                    {item.location}
                  </Text>
                  {/*   <Icon icon="Location" size={18} style={styles.locationIcon} /> */}
                </View>
                <Rating
                  showLabelInline
                  rating={item.rating}
                  size={10}
                  containerStyle={styles.rating}
                />
              </View>
              <View style={styles.priceBox}>
                <Text style={styles.price}>฿{item.pricePeerDay}</Text>
              </View>
            </CardContent>
          </Card>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    height: CARD_HEIGHT + 20,
  },
  content: {
    height: 88,
  },
  titleBox: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontFamily: "SukhumvitSet-Bold",
    color: COLORS.gray,
  },
  locationBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    fontSize: 11,
    fontFamily: "SukhumvitSet-Medium",
    color: COLORS.slate,
    lineHeight: 15,
  },
  locationIcon: {
    tintColor: COLORS.gray,
  },
  rating: {
    marginTop: 1,
  },
  priceBox: {
    alignItems: "flex-end",
    flexShrink: 0,
  },
  price: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  priceCaption: {
    fontSize: 11,
    color: COLORS.lightGray,
    marginTop: 2,
  },
});

export default HotelsCarousel;
