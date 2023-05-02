import {
  View,
  Text,
  Alert,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import app from "../config/config";

import { firebaseConfig } from "../config/config";

import {
  getAuth,
  PhoneAuthProvider,
  signInWithPhoneNumber,
  AuthCredential,
  signInWithCredential,
  RecaptchaVerifier,
} from "@firebase/auth";
import { COLORS, SIZES } from "../constants";
import { LinearGradient } from "expo-linear-gradient";
import Display from "../utils/Display";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { MaterialIcons } from "@expo/vector-icons";
import { SPACING } from "../constants/theme";
import { HeaderBack } from "../components/shared/headerBack";

type CurrentScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SendOTP"
>;

type Props = {
  navigation: CurrentScreenNavigationProp;
};

const OtpRegister = ({ navigation }: Props) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationId, setVerificationId] = useState("");

  const [message, setMessage] = useState("");
  const [focusInput, setFocusInput] = useState(true);

  const recaptchaVerifier = useRef<FirebaseRecaptchaVerifierModal>(null);

  const handlePhoneNumberChange = (text: any) => {
    const cleanedText = text.replace(/\D/g, "");

    const trimmedText = cleanedText.replace(/^0+/, "");

    setPhoneNumber(trimmedText);
  };

  const handleSendCode = async () => {
    try {
      const phoneProvider = new PhoneAuthProvider(getAuth(app));
      const verificationId = await phoneProvider.verifyPhoneNumber(
        `+66${phoneNumber}`,
        recaptchaVerifier.current!
      );
      setVerificationId(verificationId);
      if (phoneNumber) {
        navigation.navigate("InputOTP", {
          phoneNumber: phoneNumber,
          verificationId: verificationId,
        });
      }
    } catch (error) {
      console.log(error);
      setMessage(`Error: ${error}`);
    }
  };

  const onChangFocus = () => {
    setFocusInput(true);
  };

  const onChangBlur = () => {
    setFocusInput(false);
  };

  return (
    <View style={styles.container}>
      <HeaderBack onPress={() => navigation.goBack()} />
      <KeyboardAvoidingView style={styles.containerAvoiddingView}>
        <Text style={styles.textTitle}>
          {"โปรดป้อนหมายเลขโทรศัพท์มือถือของคุณ"}
        </Text>
        <View style={styles.containerInput}>
          <View style={styles.openDialogView}>
            <Text style={{ color: COLORS.slate }}>{"+66 |"}</Text>
          </View>
          <TextInput
            style={[styles.phoneInputStyle]}
            keyboardType="numeric"
            onChangeText={handlePhoneNumberChange}
            secureTextEntry={false}
            onFocus={onChangFocus}
            onBlur={onChangBlur}
          />
        </View>

        <View style={styles.viewBottom}>
          <TouchableOpacity
            onPress={() => {
              if (phoneNumber.length === 9) {
                handleSendCode();
              }
            }}
          >
            <View
              style={[
                styles.btnContinue,
                {
                  backgroundColor: phoneNumber ? "#34d399" : COLORS.lightGray,
                },
              ]}
            >
              <Text style={styles.textContinue}>ส่งรหัส</Text>
            </View>
          </TouchableOpacity>
          <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={firebaseConfig}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  containerAvoiddingView: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  textTitle: {
    fontSize: 15,
    marginTop: Display.setHeight(10),
    marginBottom: 15,
    color: COLORS.slate,
    fontFamily: "SukhumvitSet-Medium",
  },
  containerInput: {
    flexDirection: "row",
    marginHorizontal: 15,
    paddingHorizontal: 12,
    borderRadius: SIZES.radius + 5,
    backgroundColor: "white",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: COLORS.slate,
  },
  openDialogView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  phoneInputStyle: {
    flex: 1,
    marginLeft: 5,
    height: 45,
    color: COLORS.slate,
  },
  viewBottom: {
    marginTop: Display.setHeight(5),
    alignItems: "center",
    flex: 1,
  },
  btnContinue: {
    paddingVertical: Display.setHeight(1.3),
    paddingHorizontal: Display.setWidth(37),
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
});

export default OtpRegister;
