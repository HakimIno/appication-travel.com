import { Alert, Share, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SIZES } from "../constants";
import { COLORS, SPACING } from "../constants/theme";
import * as Animatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Octicons } from '@expo/vector-icons';
import TripDetailsCard from "../components/trip-details/TripDetailsCard/trip-details-card";
import TripDetailsCarousel from "../components/trip-details/ trip-details-carousel";
import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import FavoriteButton from "../components/shared/favorite-button";
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

type TripDetailsScreenNavigationProp = NavigationProp<
  RootStackParamList,
  "TripDetails"
>;

const TripDetailsScreen = () => {

  const insets = useSafeAreaInsets();
  const route = useRoute<RouteProp<RootStackParamList, "TripDetails">>();
  const navigation = useNavigation<TripDetailsScreenNavigationProp>();
  const { trip } = route.params;
  const slides = [trip.image, ...trip.gallery];



  const handleShare = async ({ imageUrl, title }: { imageUrl: string; title: string }) => {
    try {
      const fileUri = FileSystem.cacheDirectory + 'image.jpg';

      // Download the image file
      await FileSystem.downloadAsync(imageUrl, fileUri);

      // Share the downloaded image file
      await Sharing.shareAsync(fileUri, { dialogTitle: title });
    } catch (error) {
      console.log('Error sharing', error);
    }
  };


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
        style={[styles.favoriteButton, { marginTop: insets.top + 15, flexDirection: 'row' }]}
        animation="fadeIn"
        delay={500}
        duration={400}
        easing="ease-in-out"
      >
        <FavoriteButton onPress={() => { }} />
        <View style={{ marginHorizontal: 3 }} />
        <TouchableOpacity style={[styles.view]} onPress={() => handleShare({ imageUrl: trip.image, title: trip.title })}>
          <Octicons name="share" size={20} color={COLORS.black} />
        </TouchableOpacity>

      </Animatable.View>

      <TripDetailsCarousel slides={slides} id={trip.id} />
      <TripDetailsCard trip={trip} />
    </View>
  );
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
  view: {
    backgroundColor: COLORS.white,
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
});

export default TripDetailsScreen;
