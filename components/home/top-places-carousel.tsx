import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import Display from "../../utils/Display";
import { COLORS, SHADOW, SPACING } from "../../constants/theme";
import { View } from "react-native";
import { Octicons } from "@expo/vector-icons";

interface Props {
  list: any;
}

const CARD_WIDTH = Display.setWidth(100) - 80;
const CARD_HEIGHT = 200;
const CARD_WIDTH_SPACING = CARD_WIDTH + SPACING.l;

const TopPlacesCarousel = ({ list }: Props) => {
  return (
    <FlatList
      data={list}
      horizontal
      snapToInterval={CARD_WIDTH_SPACING}
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}
      keyExtractor={(i) => i.id}
      renderItem={({ item, index }) => {
        return (
          <TouchableOpacity
            style={{
              marginLeft: SPACING.l,
              marginRight: index === list.length - 1 ? SPACING.l : 0,
            }}
          >
            <View style={[styles.card, SHADOW.dark]}>
              <Octicons name="heart" size={22} color="white" style={styles.favorite} />
              <View style={styles.imageBox}>
                <Image
                  source={{
                    uri: item.image,
                  }}
                  style={styles.image}
                />
              </View>
              <View style={styles.titleBox}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.location}>{item.location}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginVertical: 10,
  },
  favorite: {
    position: "absolute",
    top: SPACING.m,
    right: SPACING.m,
    zIndex: 1,
  },
  imageBox: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    resizeMode: "cover",
  },
  titleBox: {
    position: "absolute",
    top: CARD_HEIGHT - 80,
    left: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.white,
  },
  location: {
    fontSize: 18,
    color: COLORS.white,
  },
});

export default TopPlacesCarousel;
