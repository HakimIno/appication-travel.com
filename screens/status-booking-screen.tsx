import { FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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
import { DocumentData, addDoc, collection, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import Display from '../utils/Display';
import { TextInput } from 'react-native';
import moment from 'moment';

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
  note: string;
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
  const [userData, setUserData] = useState<DocumentData | null>(null);

  useEffect(() => {
    fetchData();
    const unsubscribe = onSnapshot(collection(db, 'orders'), fetchData);
    return () => unsubscribe();
  }, []);

  const currentUser = auth.currentUser;
  const userId = currentUser?.uid;

  useEffect(() => {
    const userDocRef = doc(db, 'users', String(userId));

    const unsubscribe = onSnapshot(userDocRef, (documentSnapshot) => {
      if (documentSnapshot.exists()) {
        const userData = documentSnapshot.data();
        setUserData(userData);
      } else {
        console.log('User document does not exist');
      }
    });

    return () => unsubscribe();
  }, [userId]);

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

    const [cancelNote, setCancelNote] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [orderID, setOrderID] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

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


    const sendCancelOrder = async () => {
      try {
        const orderRef = doc(db, 'orders', String(orderID));

        await updateDoc(orderRef, { note: cancelNote });

        const date = new Date()
        const formattedDate = moment(date).format('DD/MMM/YY');

        const notification = {
          userName: `${userData?.firstName} ${userData?.lastName}`,
          imageUser: userData?.profileUrl,
          description: cancelNote,
          date: formattedDate
        }

        await addDoc(collection(db, "notification"), notification)
        
        console.log('Trip removed successfully!');
        window.location.reload(); 
      } catch (error) {
        console.log('Error removing trip:', error);
      }
    };



    const handelPress = (id: any) => {
      setOrderID(id)
      setModalVisible(true);
    }


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


            {
              item.note === "" ? (<Text numberOfLines={2} style={[styles.fontText, { fontSize: Display.setWidth(3), color: COLORS.primary, }]}>฿{item.price}</Text>) : ""
            }

            {item.status !== "Failed" ? (
              <>
                {item.sleep_checkout === "" ? (
                  <>
                    {item.note === "" ? (
                      <View style={{ alignItems: 'flex-end' }}>
                        <Text style={[styles.fontText, { fontSize: 9, color: COLORS.slate, }]}>ส่งสลีป</Text>
                        <TouchableOpacity style={styles.addPhoto} onPress={() => pickImage(item.id)}>
                          <MaterialIcons name="add-photo-alternate" size={20} color={COLORS.primary} />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <LottieView
                          style={{ height: Display.setWidth(13) }}
                          source={images.no_found_duck}
                          autoPlay
                          loop
                        />

                        <Text style={[{ fontSize: Display.setWidth(2.5), color: COLORS.lightGray1, fontFamily: "SukhumvitSet-SemiBold", }]}>รอยกเลิก...</Text>
                      </View>
                    )}


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

            {item.note === "" && item.status === "InProgress" && (
              <TouchableOpacity
                style={{
                  backgroundColor: '#fef2f2',
                  paddingHorizontal: Display.setWidth(1.5),
                  borderRadius: 5,
                  marginTop: 5
                }}
                onPress={() => handelPress(item.id)}
              >
                <Text
                  numberOfLines={2}
                  style={[styles.fontText, {
                    fontSize: Display.setWidth(2.3),
                    color: COLORS.red,
                  }]}
                >
                  ยกเลิก
                </Text>
              </TouchableOpacity>
            )}


            <Modal
              animationType="none"
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={{ marginHorizontal: SPACING.l, marginVertical: SPACING.s }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: "SukhumvitSet-Bold",
                      textAlign: "center",
                    }}
                  >
                    คำขอยกเลิก
                  </Text>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <MaterialIcons name="close" size={22} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ padding: Display.setWidth(5) }}>

                <View
                  style={{
                    backgroundColor: COLORS.white,
                    borderColor: COLORS.gray,
                    borderWidth: 1,
                    borderStyle: 'dashed',
                    padding: 10,
                    borderRadius: SIZES.radius,
                    marginVertical: SPACING.s
                  }}>
                  <TextInput
                    placeholder='เหตุผลที่ยกเลิก'
                    style={[styles.textFont, { fontSize: 12, height: 100, textAlignVertical: 'top', }]}
                    maxLength={256}
                    value={cancelNote}
                    onChangeText={(e) => setCancelNote(e)}
                    multiline
                    keyboardType="default"
                  />
                </View>



                <TouchableOpacity onPress={() => { sendCancelOrder(); setModalVisible(false) }} style={{
                  paddingVertical: SPACING.s,
                  backgroundColor: COLORS.primary,
                  marginVertical: SPACING.l,
                  borderRadius: SIZES.radius,
                  alignItems: "center",
                }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "SukhumvitSet-Bold",
                      color: COLORS.white,
                    }}
                  >ส่งคำขอยกเลิก</Text>
                </TouchableOpacity>
              </View>
            </Modal>





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
    fontFamily: "SukhumvitSet-Bold",
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
  },
  textFont: {
    fontSize: 14,
    fontFamily: "SukhumvitSet-SemiBold",
  },

})