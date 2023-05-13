import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useMemo, useRef, useState } from "react";
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
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../config/config";
import { StackNavigationProp } from "@react-navigation/stack";

type BookingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "BookingInformation"
>;

const BookingInformationScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, "BookingInformation">>();
  const { title, price, bookingDate, adults, children, tripsId, hotelsId } = route.params;

  const navigation = useNavigation<BookingScreenNavigationProp>()

  const [isShowPDF, setIsShowPDF] = useState(false);

  const [isFocusedName, setIsFocusedName] = useState(false);
  const [isFocusedLastname, setIsFocusedLastname] = useState(false);
  const [isFocusedPhoneNumber, setIsFocusedPhoneNumber] = useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);

  //
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["1%", "65%"], []);

  const handleClose = () => {
    bottomSheetRef.current?.snapToIndex(0);
  };

  const handlePress = () => {
    if (newFirstName === "") {
      bottomSheetRef.current?.snapToIndex(1);
    }
  };

  const handleEdit = () => {
    bottomSheetRef.current?.snapToIndex(1);
  };

  const handleButtonPress = () => {
    setNewFirstName(firstName);
    setNewLastName(lastName);
    setNewPhoneNumber(phoneNumber);
    setNewEmail(email);
    bottomSheetRef.current?.snapToIndex(0);
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

    const order_booking = {
      id: orders.length + 1,
      title: title,
      fistname: newFirstName,
      lastname: newLastName,
      phonnumber: newPhoneNumber,
      email: newEmail,
      date: bookingDate,
      price: price,
      adults: adults,
      children: children,
      status: 'รอชำระเงิน'
    };

    await setDoc(doc(db, "orders", `orders-ID-${orders.length + 1}`), order_booking)

    navigation.navigate('ReviewInput', { tripsId: tripsId, title: title, hotelsId: hotelsId })
  }
  
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.detailContainer}>
          <View style={{ marginHorizontal: SPACING.l }}>
            <HeaderBooking title="ข้อมูลแพคเกจ" />
            <Text numberOfLines={2} style={styles.detailTextTitle}>
              {title}
            </Text>
            <Text style={styles.detailTextSubTitle}>{bookingDate}</Text>
            {adults !== "" ? (
              <Text style={styles.detailTextSubTitle}>ผู้ใหญ่ x {adults}</Text>
            ) : null}
            {children !== "" ? (
              <Text style={styles.detailTextSubTitle}>เด็ก x {children}</Text>
            ) : null}

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
              <TouchableOpacity style={styles.btnAdd} onPress={handlePress}>
                <Text
                  style={[
                    styles.detailTextTitle,
                    { fontSize: 12, color: COLORS.primary },
                  ]}
                >
                  + เพิ่ม
                </Text>
              </TouchableOpacity>
              {newFirstName !== "" &&
                newLastName !== "" &&
                newPhoneNumber !== "" &&
                newEmail ? (
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
              ) : null}
              {isShowPDF && (
                <PdfPrint
                  tirpname={title}
                  fistname={newFirstName}
                  lastname={newLastName}
                  phonnumber={newPhoneNumber}
                  email={newEmail}
                  date={bookingDate}
                  price={price}
                  adults={adults}
                  children={children}
                />
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
                    {newFirstName}
                  </Text>
                  <Text style={[styles.detailTextInfo, { textAlign: "right" }]}>
                    {newLastName}
                  </Text>
                  <Text style={[styles.detailTextInfo, { textAlign: "right" }]}>
                    {newPhoneNumber}
                  </Text>
                  <Text
                    style={[styles.detailTextInfo, { textAlign: "right" }]}
                    numberOfLines={1}
                  >
                    {newEmail}
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
            if (!isShowPDF && newFirstName && newLastName && newPhoneNumber && newEmail) {
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
              value={firstName}
              onChangeText={(e) => setFirstName(e)}
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
              value={lastName}
              onChangeText={(e) => setLastName(e)}
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
              value={phoneNumber}
              onChangeText={(e) => setPhoneNumber(e)}
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
              placeholderTextColor="#9ca3af"
              value={email}
              onChangeText={(e) => setEmail(e)}
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
            onPress={handleButtonPress}
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
