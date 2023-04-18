import { StyleSheet, View } from "react-native";
import { SIZES } from "../constants";
import { COLORS, SPACING } from "../constants/theme";
import * as Animatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import TripDetailsCard from "../components/trip-details/TripDetailsCard/trip-details-card";
import TripDetailsCarousel from "../components/trip-details/ trip-details-carousel";

type Props = {
  route: any;
  navigation: any;
};

const TripDetailsScreen = ({ route, navigation }: Props) => {
  const insets = useSafeAreaInsets();
  const { trip } = route.params;
  const slides = [trip.image, ...trip.gallery];
  return (
    <View style={styles.container}>
      <Animatable.View
        style={[styles.backButton, { marginTop: insets.top }]}
        animation="fadeIn"
        delay={500}
        duration={400}
        easing="ease-in-out"
      >
        <Ionicons
          name="ios-arrow-back"
          onPress={navigation.goBack}
          style={[styles.backIcon, { marginTop: insets.top - 15 }]}
          size={26}
        />
      </Animatable.View>
      <Animatable.View
        style={[styles.favoriteButton, { marginTop: insets.top }]}
        animation="fadeIn"
        delay={500}
        duration={400}
        easing="ease-in-out"
      ></Animatable.View>
      <TripDetailsCarousel slides={slides} id={trip.id} />
      <TripDetailsCard trip={trip} />
    </View>
  );
};

TripDetailsScreen.sharedElements = (route: any) => {
  const { trip } = route.params;
  return [
    {
      id: `trip.${trip.id}.image`,
    },
  ];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBox: {
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: SIZES.width,
    height: SIZES.height,
    resizeMode: "cover",
  },
  backButton: {
    position: "absolute",
    left: SPACING.l,
    zIndex: 1,
  },
  favoriteButton: {
    position: "absolute",
    right: SPACING.l,
    zIndex: 1,
  },
  backIcon: {
    color: COLORS.white,
  },
});

export default TripDetailsScreen;
