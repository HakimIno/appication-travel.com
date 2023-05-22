import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fetchFavorites, fetchFavoritesHotels, fetchTripsDataQuery } from '../api/fecth.api';
import { FlatList } from 'react-native';
import LottieView from "lottie-react-native";
import { COLORS, SIZES, images } from '../constants';
import { Image } from 'react-native';
import { SPACING } from '../constants/theme';
import Divider from '../components/shared/divider';
import { Ionicons } from '@expo/vector-icons';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../config/config';
import { numberWithCommas } from '../utils/utils';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { RootStackParamList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';

interface Favorites {
  id: string;
  tripsId: string;
  hotelsId: string;
  location: string;
  title: string;
  image: string;
  price: string;
  pricePeerDay: string;
  type: string
}

type NavigationProps = {
  navigation: StackNavigationProp<RootStackParamList>;
};

const FavoriteScreen = ({ navigation }: NavigationProps) => {

  const Tab = createMaterialTopTabNavigator();


  const [isRefreshing, setIsRefreshing] = useState(false);

  const [favoritesData, setFavoritesData] = useState<Favorites[]>([])

  const [favoritesHotelsData, setFavoritesHotelsData] = useState<Favorites[]>([])

  useEffect(() => {
    fetchData();
    const unsubscribe = onSnapshot(collection(db, 'favorites'), fetchData);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    fetchDataHotels();

    const unsubscribe = onSnapshot(collection(db, 'favorites_hotels'), fetchDataHotels);
    return () => unsubscribe();
  }, []);

  const fetchData = async () => {
    try {
      setIsRefreshing(true);
      const favorite = await fetchFavorites();
      setFavoritesData(favorite as unknown as Favorites[]);

      setIsRefreshing(false);
    } catch (error) {
      console.log('Error:', error);
      setIsRefreshing(false);
    }
  };

  const fetchDataHotels = async () => {
    try {
      setIsRefreshing(true);
      const favorite = await fetchFavoritesHotels();
      setFavoritesHotelsData(favorite as unknown as Favorites[]);

      setIsRefreshing(false);
    } catch (error) {
      console.log('Error:', error);
      setIsRefreshing(false);
    }
  };

  //console.log(favoritesData)

  const FavoriteCard = ({ item }: { item: Favorites }) => {

    const isFavorites = favoritesData.filter((s) => s.tripsId === item.tripsId)?.length > 0

    const isFavoritesHotels = favoritesHotelsData.filter((s) => s.hotelsId === item.hotelsId)?.length > 0

    const removeFavorites = async (favoriteId: string) => {
      try {
        const favoriteDocRef = doc(db, 'favorites', favoriteId);
        await deleteDoc(favoriteDocRef);
      } catch (error) {
        console.log(error)
      }
    }

    const removeFavoritesHotels = async (favoriteId: string) => {
      try {
        const favoriteDocRef = doc(db, 'favorites_hotels', favoriteId);
        await deleteDoc(favoriteDocRef);
      } catch (error) {
        console.log(error)
      }
    }

    return (
      <>
        <TouchableOpacity style={styles.listContainer} key={item.id}
          onPress={() => {
            item.hotelsId
              ?  navigation.navigate("HotelScreen", { hotel: item })
              : navigation.navigate("TripDetails", { trip: item });
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={{ uri: item.image }}
              style={{ width: 85, height: 85, borderRadius: SIZES.radius }}
            />
            <View style={{ width: SIZES.width - 200, marginLeft: SPACING.s + 3 }}>
              <Text style={[styles.fontText, { fontSize: 9, color: COLORS.gray, }]}>{item.type === "PLACE" ? "ทัวร์" : "โรงแรม"} • {item.location}</Text>
              <Text numberOfLines={2} style={[styles.fontTextBold, { fontSize: 12, }]}>{item.title}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end', }}>
            {item.price ? (<Text numberOfLines={1} style={[styles.fontText, { fontSize: 12, color: COLORS.primary, }]}>฿{numberWithCommas(Number(item.price))}</Text>) :
              (<Text numberOfLines={1} style={[styles.fontText, { fontSize: 12, color: COLORS.primary, }]}>฿{numberWithCommas(Number(item.pricePeerDay))}</Text>)}
            {item.hotelsId ? (
              <TouchableOpacity onPress={() => removeFavoritesHotels(item.id)}>
                <Ionicons
                  name={isFavoritesHotels ? "heart" : "heart-outline"}
                  size={24}
                  color={isFavoritesHotels ? COLORS.red : COLORS.black}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => removeFavorites(item.id)}>
                <Ionicons
                  name={isFavorites ? "heart" : "heart-outline"}
                  size={24}
                  color={isFavorites ? COLORS.red : COLORS.black}
                />
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
        <Divider enabledSpacing={false} />
      </>
    )
  }

  const Screen1 = () => (
    <View style={styles.screenContainer}>
      <FlatList
        data={favoritesData}
        refreshing={isRefreshing}
        onRefresh={fetchData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FavoriteCard item={item} />}
        ListEmptyComponent={() => (
          favoritesData.length === 0 && !isRefreshing ? (
            <View style={{ alignItems: 'center' }}>
              <LottieView
                style={{ height: 220 }}
                source={images.no_found_duck}
                autoPlay
                loop
              />
              <Text style={[styles.fontTextBold]}>คุณยังไม่มีข้อมูล.</Text>
            </View>
          ) : null
        )}
      />
    </View>
  );

  const Screen2 = () => (
    <View style={styles.screenContainer}>
      <FlatList
        data={favoritesHotelsData}
        refreshing={isRefreshing}
        onRefresh={fetchData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FavoriteCard item={item} />}
        ListEmptyComponent={() => (
          favoritesHotelsData.length === 0 && !isRefreshing ? (
            <View style={{ alignItems: 'center' }}>
              <LottieView
                style={{ height: 220 }}
                source={images.no_found_duck}
                autoPlay
                loop
              />
              <Text style={[styles.fontTextBold]}>คุณยังไม่มีข้อมูล.</Text>
            </View>
          ) : null
        )}
      />
    </View>
  );

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabelStyle: styles.tabLabel,
        tabBarIndicatorStyle: styles.tabIndicator,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
      })}


    >
      <Tab.Screen name="Screen1" options={{ title: 'ทัวร์', }} component={Screen1} />
      <Tab.Screen name="Screen2" options={{ title: 'โรงแรม' }} component={Screen2} />
    </Tab.Navigator>
  )
}

export default FavoriteScreen

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.white
  },
  screenText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red'
  },
  tabLabel: {
    fontSize: 12,
    fontFamily: "SukhumvitSet-Bold",
  },
  tabIndicator: {
    backgroundColor: COLORS.primary,
    height: 3,
  },
  tabBar: {
    backgroundColor: 'white',

  },
  tabBarItem: {
    width: 100,
  },
  fontTextBold: {
    fontFamily: "SukhumvitSet-Bold",
  },
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: SIZES.width - 30,
    marginVertical: SPACING.m
  },
  fontText: {
    fontFamily: "SukhumvitSet-SemiBold",
  },
})