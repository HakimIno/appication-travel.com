import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, images } from '../constants'
import { SIZES, SPACING } from '../constants/theme'

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Divider from '../components/shared/divider';
import { Entypo, Fontisto, MaterialIcons, Octicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { fetchOrdersDataFailed, fetchOrdersDataInProgress, fetchOrdersDataSuccess } from '../api/fecth.api';
import { auth, db } from '../config/config';
import LottieView from "lottie-react-native";
import { updateImageToFirestore } from '../api/upload-image.api';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { collection, onSnapshot } from 'firebase/firestore';

interface Orders {
  id: string,
  orderID: string,
  tripsId: string,
  usersId: string,
  hotelsId: string,
  title: string,
  price: string,
  email: string,
  image: string,
  sleep_checkout: string,
  fistname: string,
  lastname: string,
  phonnumber: string,
  date: string,
  adults: number,
  children: number,
  checkInDate: string,
  checkOutDate: string,
  selectRoom: string,
  reviewExists: boolean,
  status: string
  type: string
}


type StatusBookingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "StatusBooking"
>;

const StatusBookingScreen = () => {

  const Tab = createMaterialTopTabNavigator();

  const navigation = useNavigation<StatusBookingScreenNavigationProp>()

  const [ordersInProgress, setOrdersInProgress] = useState<Orders[]>([])
  const [ordersInSuccess, setOrdersInSuccess] = useState<Orders[]>([])
  const [ordersInFailed, setOrdersFailed] = useState<Orders[]>([])
  const [isRefreshing, setIsRefreshing] = useState(false);


  useEffect(() => {
    fetchData();
    const unsubscribe = onSnapshot(collection(db, 'orders'), fetchData);
    return () => unsubscribe();
  }, []);


  const fetchData = async () => {
    try {
      setIsRefreshing(true);

      const ordersInProgress = await fetchOrdersDataInProgress();

      const orderSuccess = await fetchOrdersDataSuccess();

      const orderFailed = await fetchOrdersDataFailed()



      setOrdersInProgress(ordersInProgress as unknown as Orders[]);
      setOrdersInSuccess(orderSuccess as unknown as Orders[])
      setOrdersFailed(orderFailed as unknown as Orders[])

      setIsRefreshing(false);
    } catch (error) {
      console.log('Error:', error);
      setIsRefreshing(false);
    }
  };

  const StatusCard = ({ item }: { item: Orders }) => {

    const pickImage = async (orderId: string) => {

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: false,
        quality: 1,

      });
      if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        updateImageToFirestore(orderId, imageUri);
      }

    };


    return (
      <>
        <View style={styles.listContainer} key={item.orderID}>
          <View >
            <Image
              source={{ uri: item.image }}
              style={{ width: 85, height: 85, borderRadius: SIZES.radius }}
            />
          </View>

          <View style={{ width: SIZES.width - 200 }}>
            <Text style={[styles.fontText, { fontSize: 9, color: COLORS.gray, }]}>คำสั่งซื้อID: {item.orderID}</Text>
            <Text numberOfLines={1} style={[styles.fontTextBold, { fontSize: 12, }]}>{item.title}</Text>
            {item.status === "InProgress" ? (
              <Text style={[styles.fontTextBold, { fontSize: 11, color: COLORS.yellow }]}>กำลังดำเนินการ</Text>
            )
              : item.status === "Success" ? (
                <Text style={[styles.fontTextBold, { fontSize: 11, color: COLORS.green }]}>สำเร็จแล้ว</Text>
              ) : (
                <Text style={[styles.fontTextBold, { fontSize: 11, color: COLORS.red }]}>ล้มเหลว</Text>
              )
            }

            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <Fontisto name="date" size={18} color={COLORS.primary} />
              {item.date !== "" ? (
                <Text style={[styles.fontText, { fontSize: 10, color: COLORS.primary, marginHorizontal: 5, }]}>{item.date}</Text>
              ) : (
                <Text style={[styles.fontText, { fontSize: 10, color: COLORS.primary, marginHorizontal: 5, }]}>เช็คอิน: {item.checkInDate}  เช็คเอาท์: {item.checkOutDate}</Text>
              )}
            </View>

          </View>

          <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end', }}>
            <Text numberOfLines={2} style={[styles.fontText, { fontSize: 12, color: COLORS.primary, }]}>฿{item.price}</Text>

            {item.status !== "Failed" ? (
              <>
                {item.sleep_checkout === "" ? (
                  <>
                    <View style={{ alignItems: 'flex-end' }}>
                      <Text style={[styles.fontText, { fontSize: 10, color: COLORS.slate, }]}>ส่งสลีป</Text>
                      <TouchableOpacity style={styles.addPhoto} onPress={() => pickImage(item.id)}>
                        <MaterialIcons name="add-photo-alternate" size={20} color={COLORS.primary} />
                      </TouchableOpacity>
                    </View>
                  </>
                ) : (
                  <>
                    {item.status === "InProgress" ? (
                      <View style={{ alignItems: 'flex-end' }}>
                        <Text style={[styles.fontText, { fontSize: 10, color: COLORS.lightGray, }]}>กลต.</Text>
                        <View style={[styles.addPhoto, { borderColor: COLORS.lightGray }]} >
                          <MaterialIcons name="access-time" size={20} color={COLORS.lightGray} />
                        </View>
                      </View>
                    ) : (
                      <>
                        {!item.reviewExists ? (
                          <TouchableOpacity
                            style={{ alignItems: 'flex-end' }}
                            onPress={() =>
                              navigation.navigate('ReviewInput', {
                                tripsId: item.tripsId,
                                hotelsId: item.hotelsId,
                                title: item.title,
                                orderId: item.id,
                              })
                            }
                          >
                            <Text style={[styles.fontText, { fontSize: 10, color: COLORS.yellow }]}>
                              รีวิว
                            </Text>
                            <View style={[styles.addPhoto, { borderColor: COLORS.yellow }]}>
                              <Octicons name="star-fill" size={20} color={COLORS.yellow} />
                            </View>
                          </TouchableOpacity>
                        ) : (
                          <View style={{ alignItems: 'flex-end' }}>
                            <Text style={[styles.fontText, { fontSize: 10, color: COLORS.green }]}>
                              สำเร็จ
                            </Text>
                            <View style={[styles.addPhoto, { borderWidth: 0 }]}>
                              <Octicons name="verified" size={24} color={COLORS.green} />
                            </View>
                          </View>
                        )}
                      </>

                    )}
                  </>
                )}
              </>
            ) : (
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={[styles.fontText, { fontSize: 10, color: COLORS.red }]}>
                  ไม่สำเร็จ
                </Text>
                <View style={[styles.addPhoto, { borderWidth: 0 }]}>
                  <Entypo name="emoji-sad" size={22} color={COLORS.red} />
                </View>
              </View>
            )}

          </View>
        </View>
        <Divider enabledSpacing={false} />
      </>
    )
  }
  const Screen1 = () => (
    <View style={styles.screenContainer}>
      <FlatList
        data={ordersInProgress}
        refreshing={isRefreshing}
        onRefresh={fetchData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.orderID}
        renderItem={({ item }) => <StatusCard item={item} />}
        ListEmptyComponent={() => (
          <View style={{ alignItems: 'center' }}>
            <LottieView
              style={{ height: 220 }}
              source={images.no_found_duck}
              autoPlay
              loop
            />
            <Text style={[styles.fontTextBold,]}>คุณยังไม่มีข้อมูล.</Text>
          </View>
        )}
      />
    </View>
  );

  const Screen2 = () => (
    <View style={styles.screenContainer}>
      <FlatList
        data={ordersInSuccess}
        refreshing={isRefreshing}
        onRefresh={fetchData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.orderID}
        renderItem={({ item }) => <StatusCard item={item} />}
        ListEmptyComponent={() => (
          <View style={{ alignItems: 'center' }}>
            <LottieView
              style={{ height: 220 }}
              source={images.no_found_duck}
              autoPlay
              loop
            />
            <Text style={[styles.fontTextBold,]}>คุณยังไม่มีข้อมูล.</Text>
          </View>
        )}
      />
    </View>
  );

  const Screen3 = () => (
    <View style={styles.screenContainer}>
      <FlatList
        data={ordersInFailed}
        refreshing={isRefreshing}
        onRefresh={fetchData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.orderID}
        renderItem={({ item }) => <StatusCard item={item} />}
        ListEmptyComponent={() => (
          <View style={{ alignItems: 'center' }}>
            <LottieView
              style={{ height: 220 }}
              source={images.no_found_duck}
              autoPlay
              loop
            />
            <Text style={[styles.fontTextBold,]}>คุณยังไม่มีข้อมูล.</Text>
          </View>
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
      })}>
      <Tab.Screen name="Screen1" options={{ title: 'กำลังดำเนินการ', }} component={Screen1} />
      <Tab.Screen name="Screen2" options={{ title: 'สำเร็จแล้ว' }} component={Screen2} />
      <Tab.Screen name="Screen3" options={{ title: 'ยกเลิกแล้ว' }} component={Screen3} />
    </Tab.Navigator>

  )
}

export default StatusBookingScreen

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
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  fontText: {
    fontFamily: "SukhumvitSet-SemiBold",
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
  addPhoto: {
    borderColor: COLORS.primary,
    borderWidth: 1,
    width: 30,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.radius - 5
  }
})