import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import * as Animatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING } from "../constants/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Octicons } from '@expo/vector-icons';;
import FavoriteButton from "../components/shared/favorite-button";
import { RootStackParamList } from "../types";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import HotelsDetailsCarousel from "../components/hotels/hotel-details-carousel";
import HotelDetailsCard from "../components/hotels/hotel-card.tsx/hotel-details-card";
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';


type Props = {
  route: any;
};


type HotelScreenNavigationProp = NavigationProp<
  RootStackParamList,
  "HotelScreen"
>;

const HotelDetailsScreen = ({ route }: Props) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<HotelScreenNavigationProp>();
  const { hotel } = route.params;
  const slides = [hotel.image, ...hotel.gallery];

  const handleShare = async ({ imageUrl, title }: { imageUrl: string; title: string }) => {
    try {
      const fileUri = FileSystem.cacheDirectory + 'image.jpg';

      await FileSystem.downloadAsync(imageUrl, fileUri);

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
        style={[styles.favoriteButton, { marginTop: insets.top + 15,  flexDirection: 'row' }]}
        animation="fadeIn"
        delay={500}
        duration={400}
        easing="ease-in-out"
      >
        <FavoriteButton onPress={() => { }} />
        <View style={{ marginHorizontal: 3 }} />
        <TouchableOpacity style={[styles.view]} onPress={() => handleShare({ imageUrl: hotel.image, title: hotel.title })}>
          <Octicons name="share" size={20} color={COLORS.black} />
        </TouchableOpacity>
      </Animatable.View>

      <HotelsDetailsCarousel slides={slides} id={hotel.id} />
      <HotelDetailsCard hotel={hotel} />
    </View>
  );
};

export default HotelDetailsScreen;

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
