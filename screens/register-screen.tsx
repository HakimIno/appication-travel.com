import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { COLORS } from "../constants";
import { HeaderBack } from "../components/shared/headerBack";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { useNavigation } from "@react-navigation/native";
import { SIZES, SPACING } from "../constants/theme";
import { Ionicons } from "@expo/vector-icons";

type emailScreenProps = StackNavigationProp<RootStackParamList, "Register">;

const RegisterScreen = () => {
  const navigation = useNavigation<emailScreenProps>();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const validatePassword = () => {
    if (password !== confirmPassword) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderBack onPress={() => navigation.goBack()} />

      <View>
        <Text style={[styles.textTitle, { textAlign: "center" }]}>
          ลงทะเบียน
        </Text>

        <View style={[styles.containerInput, { alignItems: "center" }]}>
          <TextInput
            style={[styles.EmailInputStyle]}
            value={firstName}
            keyboardType="default"
            placeholder="ชื่อ"
            onChangeText={setFirstName}
          />
          {firstName && (
            <Ionicons
              name="ios-close-circle-sharp"
              size={18}
              color={COLORS.black}
              onPress={() => setFirstName("")}
            />
          )}
        </View>
        <View style={styles.spaceContainer} />
        <View style={[styles.containerInput, { alignItems: "center" }]}>
          <TextInput
            style={[styles.EmailInputStyle]}
            value={lastName}
            keyboardType="default"
            placeholder="นามสกุล"
            onChangeText={setLastName}
          />
          {lastName && (
            <Ionicons
              name="ios-close-circle-sharp"
              size={18}
              color={COLORS.black}
              onPress={() => setLastName("")}
            />
          )}
        </View>
        <View style={styles.spaceContainer} />
        <View style={[styles.containerInput, { alignItems: "center" }]}>
          <TextInput
            style={[styles.EmailInputStyle]}
            value={email}
            keyboardType="email-address"
            placeholder="อีเมล"
            onChangeText={setEmail}
          />
          {email && (
            <Ionicons
              name="ios-close-circle-sharp"
              size={18}
              color={COLORS.black}
              onPress={() => setEmail("")}
            />
          )}
        </View>
        <View style={styles.spaceContainer} />
        <View style={[styles.containerInput, { alignItems: "center" }]}>
          <TextInput
            style={[styles.EmailInputStyle]}
            value={phoneNumber}
            keyboardType="default"
            placeholder="เบอร์โทรศัพทร์"
            onChangeText={setPhoneNumber}
          />
          {phoneNumber && (
            <Ionicons
              name="ios-close-circle-sharp"
              size={18}
              color={COLORS.black}
              onPress={() => setPhoneNumber("")}
            />
          )}
        </View>
        <View style={styles.spaceContainer} />
        <View style={[styles.containerInput, { alignItems: "center" }]}>
          <TextInput
            style={[styles.EmailInputStyle]}
            value={password}
            keyboardType="default"
            placeholder="รหัสผ่าน"
            onChangeText={setPassword}
            onBlur={validatePassword}
          />
          {password && (
            <Ionicons
              name="ios-close-circle-sharp"
              size={18}
              color={COLORS.black}
              onPress={() => setPassword("")}
            />
          )}
        </View>
       
        <View style={styles.spaceContainer} />
        <View style={[styles.containerInput, { alignItems: "center" }]}>
          <TextInput
            style={[styles.EmailInputStyle]}
            value={confirmPassword}
            keyboardType="email-address"
            placeholder="ยืนยันรหัสผ่าน"
            onChangeText={setConfirmPassword}
            onBlur={validatePassword}
          />
          {confirmPassword && (
            <Ionicons
              name="ios-close-circle-sharp"
              size={18}
              color={COLORS.black}
              onPress={() => setConfirmPassword("")}
            />
          )}
        </View>
        {!passwordsMatch && <Text style={styles.invalidText}>รหัสผ่านไม่ตรงกัน</Text>}
        <View style={styles.spaceContainer} />
        <TouchableOpacity>
          <View
            style={[
              styles.btnContinue,
              {
                backgroundColor: "#34d399",
              },
            ]}
          >
            <Text style={styles.textContinue}>ลงทะเบียน</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  spaceContainer: {
    marginVertical: SPACING.s + 5,
  },
  textTitle: {
    fontSize: 15,
    marginTop: SPACING.s,
    marginVertical: SPACING.l,
    color: COLORS.black,
    fontFamily: "SukhumvitSet-Bold",
  },
  containerInput: {
    flexDirection: "row",
    marginHorizontal: SPACING.l,
    paddingHorizontal: SPACING.m,
    borderRadius: SIZES.radius + 5,
    backgroundColor: COLORS.white,
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: COLORS.slate,
  },
  EmailInputStyle: {
    flex: 1,
    marginLeft: 5,
    height: 45,
    color: COLORS.slate,
    fontFamily: "SukhumvitSet-SemiBold",
  },
  btnContinue: {
    paddingVertical: SPACING.s + 2,
    marginHorizontal: SPACING.l,
    marginVertical: SPACING.s,
    borderRadius: SIZES.radius + 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textContinue: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "600",
  },
  invalidText: {
    color: "red",
    marginHorizontal: SPACING.l + 10,
    fontSize: 10,
    fontFamily: "SukhumvitSet-SemiBold",
  },
});
