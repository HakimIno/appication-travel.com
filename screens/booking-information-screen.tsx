import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import { COLORS } from "../constants";
import { SIZES, SPACING } from "../constants/theme";
import BottomSheet from "@gorhom/bottom-sheet";
import { MaterialIcons, Octicons } from "@expo/vector-icons";
import Divider from "../components/shared/divider";
import CustomBackground from "../components/trip-details/TripDetailsCard/custom-background";
import HeaderBooking from "../components/booking/header/header-booking";
import PdfPrint from "../components/booking/pdf-print";
import { DocumentData, addDoc, collection, doc, getDocs, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../config/config";
import { StackNavigationProp } from "@react-navigation/stack";
import { calculateDuration, generateRandomID, numberWithCommas } from "../utils/utils";
import PdfPrintHotels from "../components/booking/pdf-print-hotels";

const BookingInformationScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, "BookingInformation">>();
  const { title, price, bookingDate, adults, children, tripsId, hotelsId, types, image, checkInDate, checkOutDate, selectRoom, hotelsName, singleBad, doubleBed, threeBeds } = route.params;


  const duration = calculateDuration(checkInDate, checkOutDate)

  const [isShowPDF, setIsShowPDF] = useState(false);

  const [isFocusedName, setIsFocusedName] = useState(false);
  const [isFocusedLastname, setIsFocusedLastname] = useState(false);
  const [isFocusedPhoneNumber, setIsFocusedPhoneNumber] = useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);


  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["1%", "65%"], []);

  const handleClose = () => {
    bottomSheetRef.current?.snapToIndex(0);
  };

  const handleEdit = () => {
    bottomSheetRef.current?.snapToIndex(1);
  };

  const EditProfile = async () => {
    try {

        const usersCollectionRef = collection(db, 'users');
        const userDocRef = doc(usersCollectionRef, userId);

        await updateDoc(userDocRef, userData);
        handleClose()

        console.log('Profile updated successfully!');
    } catch (error) {
        console.error('Error updating profile:', error);
    }
};

  const renderHeader = () => (
    <>
      <View style={{ marginHorizontal: SPACING.l, marginVertical: SPACING.s }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View />
          <Text
            style={{
              fontSize: 13,
              fontFamily: "SukhumvitSet-Bold",
              textAlign: "center",
            }}
          >
            เพิ่มข้อมูลติดต่อ
          </Text>
          <TouchableOpacity onPress={handleClose}>
            <MaterialIcons name="close" size={22} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <Divider enabledSpacing={false} />
    </>
  );



  const handleBooking = async () => {
    const ordersCollectionRef = collection(db, 'orders');
    const querySnapshot = await getDocs(ordersCollectionRef);

    const orders = querySnapshot.docs.map((doc) => doc.data());

    const currentUser = auth.currentUser;
    const userId = currentUser?.uid;

    if (types === "PLACE") {
      const order_booking = {
        orderID: `LMF-${generateRandomID(8)}`,
        usersId: userId,
        tripsId: tripsId,
        title: title,
        fistname: userData?.firstName,
        lastname: userData?.lastName,
        image: image,
        phonnumber: userData?.phoneNumber,
        email: userData?.email,
        sleep_checkout: "",
        date: bookingDate,
        price: price,
        adults: adults,
        children: children,
        checkInDate: "",
        checkOutDate: "",
        selectRoom: "",
        note: "",
        status: 'InProgress',
        type: types
      };

      await addDoc(collection(db, "orders"), order_booking)

    } else {
      const order_booking = {
        orderID: `LHF-${generateRandomID(8)}`,
        usersId: userId,
        hotelsId: hotelsId,
        title: title,
        fistname: userData?.firstName,
        lastname: userData?.lastName,
        image: image,
        phonnumber: userData?.phoneNumber,
        email: userData?.email,
        sleep_checkout: "",
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        selectRoom: selectRoom,
        date: checkInDate,
        price: price,
        adults: "",
        children: "",
        note: "",
        status: 'InProgress',
        type: types
      };
      await addDoc(collection(db, "orders"), order_booking)
    }

    //await setDoc(doc(db, "orders", ''), order_booking)

    //navigation.navigate('ReviewInput', { tripsId: tripsId, title: title, hotelsId: hotelsId })
  }

  const [userData, setUserData] = useState<DocumentData | null>(null);

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



  const setFirstName = (text: string) => {
    setUserData({ ...userData, firstName: text });
  };

  const setLastName = (text: string) => {
    setUserData({ ...userData, lastName: text });
  };

  const setEmail = (text: string) => {
    setUserData({ ...userData, email: text });
  };

  const setPhoneNumber = (text: string) => {
    setUserData({ ...userData, phoneNumber: text });
  };


  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.detailContainer}>
          <View style={{ marginHorizontal: SPACING.l }}>
            <HeaderBooking title={`ข้อมูลแพคเกจ ${types === "PLACE" ? "ทัวร์" : "โรงแรม"}`} />
            <Text numberOfLines={2} style={styles.detailTextTitle}>
              {title}
            </Text>
            
            {types === "PLACE" ?  (
              <>
              <Text style={styles.detailTextSubTitle}>ที่พัก {hotelsName}</Text>
                <Text style={styles.detailTextSubTitle}>{bookingDate}</Text>
                {adults !== 0 ? (
                  <Text style={styles.detailTextSubTitle}>ผู้ใหญ่ x {adults}</Text>
                ) : null}
                {children !== 0 ? (
                  <Text style={styles.detailTextSubTitle}>เด็ก x {children}</Text>
                ) : null}
                {singleBad !== 0 ? (
                  <Text style={styles.detailTextSubTitle}>เตียงเดียว x {singleBad}</Text>
                ) : ""}
                 {doubleBed !== 0 ? (
                  <Text style={styles.detailTextSubTitle}>เตียงคู่ x {doubleBed}</Text>
                ) : ""}
                 {threeBeds !== 0 ? (
                  <Text style={styles.detailTextSubTitle}>เตียงสาม x {threeBeds}</Text>
                ) : ""}
              </>

            ) : (
              <>
                <Text style={styles.detailTextSubTitle}>เช็คอินวันที่: {checkInDate}</Text>
                <Text style={styles.detailTextSubTitle}>เช็คเอาท์วันที่: {checkOutDate}</Text>
                <Text style={styles.detailTextSubTitle}>ระยะเวลาเข้าพัก: {duration.durationInDays} วัน {duration.durationInNights} คืน</Text>

                <Text style={styles.detailTextSubTitle}>ประเภทห้อง: {selectRoom}</Text>
              </>
            )}

            <Text style={styles.priceText}>฿ {price}</Text>
          </View>
        </View>
        <View style={[styles.detailContainer, { marginVertical: SPACING.s }]}>
          <View
            style={{ marginHorizontal: SPACING.l, marginVertical: SPACING.s }}
          >
            <HeaderBooking title="ข้อมูลติดต่อผู้จอง" />
            <Text style={[styles.detailTextTitle, { fontSize: 10 }]}>
              เราจะแจ้งให้คุณทราบหากการจองมีการเปลี่ยนแปลงใดๆ
            </Text>

            <View style={{ flexDirection: "row" }}>


              <TouchableOpacity
                style={[
                  styles.btnAdd,
                  {
                    marginLeft: SPACING.s,
                    borderColor: COLORS.green,
                    flexDirection: "row",
                    alignItems: "center",
                  },
                ]}
                onPress={handleEdit}
              >
                <Octicons name="pencil" size={14} color={COLORS.green} />
                <Text
                  style={[
                    styles.detailTextTitle,
                    { fontSize: 12, color: COLORS.green, marginLeft: 5 },
                  ]}
                >
                  แก้ไข
                </Text>
              </TouchableOpacity>

              {isShowPDF && (
                <>
                  {types === 'PLACE' ? (
                    <PdfPrint
                      tirpname={title}
                      fistname={userData?.firstName}
                      lastname={userData?.lastName}
                      phonnumber={userData?.phoneNumber}
                      email={userData?.email}
                      date={bookingDate}
                      price={numberWithCommas(price)}
                      adults={adults}
                      children={children}
                      hotelsName={hotelsName}
                      singleBad={singleBad}
                      doubleBed={doubleBed}
                      threeBeds={threeBeds}
                    />
                  ) : (
                    <PdfPrintHotels
                      hotelsName={title}
                      fistname={userData?.firstName}
                      lastname={userData?.lastName}
                      phonnumber={userData?.phoneNumber}
                      email={userData?.email}
                      checkInDate={checkInDate}
                      checkOutDate={checkOutDate}
                      selectRoom={selectRoom}
                      price={numberWithCommas(price)}
                    />
                  )}
                </>
              )}
            </View>

            <View
              style={{
                borderRadius: 5,
                borderWidth: 0.2,
                borderColor: COLORS.slate,
                height: 200,
                marginTop: SPACING.s,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  margin: SPACING.l,
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text style={styles.detailTextInfo}>ชื่อ</Text>
                  <Text style={styles.detailTextInfo}>นามสกุล</Text>
                  <Text style={styles.detailTextInfo}>หมายเลขโทรศัพทร์</Text>
                  <Text style={styles.detailTextInfo}>อีเมล</Text>
                </View>
                <View style={{ width: 150, right: 0 }}>
                  <Text style={[styles.detailTextInfo, { textAlign: "right" }]}>
                    {userData?.firstName}
                  </Text>
                  <Text style={[styles.detailTextInfo, { textAlign: "right" }]}>
                    {userData?.lastName}
                  </Text>
                  <Text style={[styles.detailTextInfo, { textAlign: "right" }]}>
                    {userData?.phoneNumber}
                  </Text>
                  <Text
                    style={[styles.detailTextInfo, { textAlign: "right" }]}
                    numberOfLines={1}
                  >
                    {userData?.email}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            backgroundColor: "#fffcd7",
            marginVertical: SPACING.s,
            height: 100,
            borderWidth: 1,
            borderColor: COLORS.yellow,
            marginHorizontal: SPACING.l,
            borderRadius: SIZES.radius,
          }}
        >
          <View style={{ margin: SPACING.m }}>
            <Text
              numberOfLines={3}
              style={[styles.detailTextTitle, { fontSize: 10 }]}
            >
              โปรดกรอกข้อมูลอย่างระมัดระวัง
              เมื่อกรอกข้อมูลเสร็จแล้วให้กดยืนยันการจอง แล้วจะมีปุ่ม PDF
              ขึ้นมาให้ท่านนำไปสแกนเพื่อชำระเงิน
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            paddingVertical: SPACING.s,
            backgroundColor: COLORS.primary,
            marginHorizontal: SPACING.l,
            marginVertical: SPACING.l,
            borderRadius: SIZES.radius,
            alignItems: "center",
          }}
          onPress={() => {
            if (!isShowPDF && userData?.firstName && userData?.lastName && userData?.phoneNumber && userData?.email) {
              handleBooking();

              setIsShowPDF(true);
            }
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontFamily: "SukhumvitSet-Bold",
              color: COLORS.white,
            }}
          >
            ยืนยันการจอง
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <BottomSheet
        snapPoints={snapPoints}
        ref={bottomSheetRef}
        enablePanDownToClose={true}
        handleComponent={renderHeader}
        backgroundComponent={CustomBackground}
      >
        <View style={{ margin: SPACING.l }}>
          <View
            style={{
              borderBottomWidth: isFocusedName ? 1 : 0.5,
              borderBottomColor: COLORS.slate,
            }}
          >
            <Text style={styles.detailTextInfo}>
              ชื่อ <Text style={{ color: COLORS.red }}>*</Text>
            </Text>
            <TextInput
              style={styles.textInputStyle}
              placeholder="ex.มานะ"
              onChangeText={setFirstName}
              value={userData?.firstName}
              placeholderTextColor="#9ca3af"
              onFocus={() => setIsFocusedName(true)}
              onBlur={() => setIsFocusedName(false)}
            />
          </View>
          <View style={{ marginVertical: SPACING.s }} />
          <View
            style={{
              borderBottomWidth: isFocusedLastname ? 1 : 0.5,
              borderBottomColor: COLORS.slate,
            }}
          >
            <Text style={styles.detailTextInfo}>
              นามสกุล <Text style={{ color: COLORS.red }}>*</Text>
            </Text>

            <TextInput
              style={styles.textInputStyle}
              placeholder="ex.ใจดี"
              placeholderTextColor="#9ca3af"
              onChangeText={setLastName}
              value={userData?.lastName}
              onFocus={() => setIsFocusedLastname(true)}
              onBlur={() => setIsFocusedLastname(false)}
            />
          </View>
          <View style={{ marginVertical: SPACING.s }} />
          <View
            style={{
              borderBottomWidth: isFocusedPhoneNumber ? 1 : 0.5,
              borderBottomColor: COLORS.slate,
            }}
          >
            <Text style={styles.detailTextInfo}>
              หมายเลขโทรศัพทร์ <Text style={{ color: COLORS.red }}>*</Text>
            </Text>

            <TextInput
              style={styles.textInputStyle}
              placeholder="โปรดระบุ"
              placeholderTextColor="#9ca3af"
              onChangeText={setPhoneNumber}
              value={userData?.phoneNumber}
              onFocus={() => setIsFocusedPhoneNumber(true)}
              onBlur={() => setIsFocusedPhoneNumber(false)}
            />
          </View>
          <View style={{ marginVertical: SPACING.s }} />
          <View
            style={{
              borderBottomWidth: isFocusedEmail ? 1 : 0.5,
              borderBottomColor: COLORS.slate,
            }}
          >
            <Text style={styles.detailTextInfo}>
              อีเมล <Text style={{ color: COLORS.red }}>*</Text>
            </Text>
            <TextInput
              style={styles.textInputStyle}
              placeholder="โปรดระบุ"
              value={userData?.email}
              placeholderTextColor="#9ca3af"
              onChangeText={setEmail}
              onFocus={() => setIsFocusedEmail(true)}
              onBlur={() => setIsFocusedEmail(false)}
            />
          </View>
        </View>

        <View
          style={{
            marginVertical: SPACING.l,
            width: "100%",
          }}
        >
          <TouchableOpacity
            style={{
              paddingVertical: SPACING.s,
              backgroundColor: COLORS.primary,
              marginHorizontal: SPACING.l,
              marginBottom: SPACING.s,
              borderRadius: SIZES.radius,
              alignItems: "center",
            }}
            onPress={EditProfile}
          >
            <Text
              style={{
                fontSize: 14,
                fontFamily: "SukhumvitSet-Bold",
                color: COLORS.white,
              }}
            >
              ยืนยัน
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
};

export default BookingInformationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detailContainer: {
    backgroundColor: COLORS.white,
    paddingVertical: SPACING.s,
    paddingBottom: SPACING.l,
  },
  detailTextTitle: {
    fontSize: 14,
    fontFamily: "SukhumvitSet-SemiBold",
  },
  detailTextSubTitle: {
    fontSize: 11,
    fontFamily: "SukhumvitSet-Medium",
    color: COLORS.gray,
  },
  priceText: {
    fontSize: 14,
    fontFamily: "SukhumvitSet-Bold",
    color: COLORS.black,
    marginVertical: SPACING.s,
  },
  btnAdd: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: "#ffffff",
    borderRadius: SIZES.radius,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    marginTop: SPACING.s,
  },
  detailTextInfo: {
    fontSize: 12,
    fontFamily: "SukhumvitSet-SemiBold",
    color: COLORS.black,
    marginVertical: 5,
  },
  textInputStyle: {
    fontSize: 14,
    fontFamily: "SukhumvitSet-Medium",
    height: 30,
    color: COLORS.black,
  },
});
