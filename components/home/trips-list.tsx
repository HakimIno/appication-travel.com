import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, SHADOW, SIZES, SPACING } from "../../constants/theme";
import Display from "../../utils/Display";
import { Octicons } from "@expo/vector-icons";
import Card from "../shared/card/card";
import { useNavigation } from "@react-navigation/native";
import CardMedia from "../shared/card/card-media";
import { SharedElement } from "react-navigation-shared-element";
import CardContent from "../shared/card/card-content";
import { MaterialIcons } from "@expo/vector-icons";
import { RootStackParamList } from "../../types";
import { StackNavigationProp } from "@react-navigation/stack";

const CARD_WIDTH = SIZES.width / 2 - (SPACING.l + SPACING.l / 2);
const CARD_HEIGHT = 220;

interface Props {
  list: any;
  navigation: any;
}

const TripsList = ({ list, navigation }: Props) => {
  return (
    <View style={styles.container}>
      {list.map((item: any, index: any) => {
        return (
          <Card
            key={index}
            style={styles.card}
            onPress={() => {
              navigation.navigate("TripDetails", { trip: item });
            }}
          >
            <SharedElement id={`trip.${item.id}.image`} style={styles.media}>
              <CardMedia source={item.image}  />
            </SharedElement>
            <CardContent style={styles.content}>
              <View style={styles.titleBox}>
                <Text style={styles.title} numberOfLines={2}>
                  {item.title}
                </Text>
                <Text style={styles.location} numberOfLines={1}>
                  <MaterialIcons
                    name="location-on"
                    size={10}
                    color={COLORS.primary}
                  />
                  {item.location}
                </Text>
              </View>
            </CardContent>
          </Card>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  favorite: {
    position: "absolute",
    top: SPACING.s,
    right: SPACING.s,
    zIndex: 1,
  },

  cardContainer: {
    marginLeft: SPACING.l,
    marginBottom: SPACING.l,
  },
  card: {
    width: CARD_WIDTH + 10,
    height: CARD_HEIGHT,
    marginLeft: SPACING.m,
    marginBottom: SPACING.l,
  },
  media: {
    flex: 1,
  },
  content: {
    paddingRight: SPACING.m / 2,
  },
  titleBox: {
    flex: 1,
  },
  title: {
    fontSize: 11,
    fontFamily: "SukhumvitSet-SemiBold",
    color: COLORS.textColor,
    lineHeight: 14,
  },
  location: {
    fontSize: 10,
    color: COLORS.lightGray1,
    fontFamily: "SukhumvitSet-SemiBold",
  },
});

export default TripsList;
