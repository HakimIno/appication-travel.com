import { StyleSheet, Text, View } from "react-native";
import { SIZES } from "../constants";
import { COLORS, SPACING } from "../constants/theme";
import * as Animatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import TripDetailsCard from "../components/trip-details/TripDetailsCard/trip-details-card";
import TripDetailsCarousel from "../components/trip-details/ trip-details-carousel";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import FavoriteButton from "../components/shared/favorite-button";

type Props = {
  route: any;
};

type TripDetailsScreenNavigationProp = NavigationProp<
  RootStackParamList,
  "TripDetails"
>;

const TripDetailsScreen = ({ route }: Props) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<TripDetailsScreenNavigationProp>();
  const { trip } = route.params;
  const slides = [trip.image, ...trip.gallery];
  return (
    <View style={styles.container}>
      <Animatable.View
        style={[styles.backButton, { marginTop: insets.top + 15 }]}
      >
        <Ionicons
          name="ios-arrow-back"
          onPress={navigation.goBack}
          style={[styles.backIcon]}
          size={26}
        />
      </Animatable.View>
      <Animatable.View
        style={[styles.favoriteButton, { marginTop: insets.top + 15 }]}
        animation="fadeIn"
        delay={500}
        duration={400}
        easing="ease-in-out"
      >
        <FavoriteButton onPress={() => {}} />
      </Animatable.View>

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
    {
      id: `trip.${trip.id}.location`,
    },
  ];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
