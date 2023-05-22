import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Display from "../utils/Display";
import { COLORS, FONTS, SIZES, images } from "../constants";
import { MaterialIcons } from "@expo/vector-icons";

import { A } from "@expo/html-elements";
import * as Facebook from "expo-facebook";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import {
  signInWithCredential,
  FacebookAuthProvider,
} from "@firebase/auth";

import { auth } from "../config/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from "react";
import { SPACING } from "../constants/theme";

type Props = {
  navigation: any;
};

WebBrowser.maybeCompleteAuthSession();

export const LoginScreen = ({ navigation }: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((token) => {
      if (token) {
        navigation.reset({
          index: 0,
          routes: [{ name: "Root", }],
        });
      }
    });
    return unsubscribe;
  }, []);

  const signInFacebook = async () => {
    try {

      const appId = '808694957342165';
      const appName = 'travel.com';

      await Facebook.initializeAsync({
        appId: appId || undefined,
        appName: appName || undefined,
      });

      const result = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"],
      });

      if (result.type === "success") {
        console.log(result.token)
        const credential = FacebookAuthProvider.credential(result.token);
        const userCredentials = await signInWithCredential(auth, credential);
        userCredentials.user?.getIdToken();
        console.log("Login success!!");
      } else {
        console.log("Facebook login error:", result);
      }
    } catch (error) {
      console.log("Error during Facebook login:", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar
        backgroundColor="#ffffff" 
        barStyle="dark-content" 
        translucent />
      <View style={styles.headerClose}></View>
      <View style={styles.headerContainer}>
        <Image source={images.LogoApp} style={{ width: 250, height: 150 }} />
        <Text style={styles.headerSubtitleTitle}>
          เข้าสู่ระบบเพื่อจองแพ็คเกจทัวร์
        </Text>

        <View style={styles.loginContainer}>
          {/* Facebook Login */}
          <TouchableOpacity
            style={[styles.facebookContainer, styles.shadowProp]}
            onPress={signInFacebook}
          >
            <MaterialIcons name="facebook" size={27} color={COLORS.white} />
            <Text style={styles.facebookText}>เข้าระบบผ่าน Facebook</Text>
          </TouchableOpacity>
          <View style={{ marginVertical: 4 }} />
          {/* PhoneNumber Login */}
          <TouchableOpacity
            style={[styles.phoneContainer, styles.shadowProp]}
            onPress={() => navigation.navigate("SendOTP")}
          >
            <MaterialIcons name="call" size={24} color={COLORS.white} />
            <Text style={styles.facebookText}>
              เข้าระบบผ่าน หมายเลขโทรศัพทร์
            </Text>
          </TouchableOpacity>
          <View style={{ marginVertical: 15 }} />
          <View style={styles.registerHeaderContainer}>
            <View
              style={{ flex: 1, height: 1, backgroundColor: COLORS.lightGray }}
            />

            <Text
              style={{
                width: 40,
                textAlign: "center",
                color: COLORS.black,
                fontFamily: "SukhumvitSet-Bold",
              }}
            >
              หรือ
            </Text>
            <View
              style={{ flex: 1, height: 1, backgroundColor: COLORS.lightGray }}
            />
          </View>
          <View style={{ marginVertical: 15 }} />
          {/* register  */}
          <TouchableOpacity
            style={[styles.registerContainer, styles.shadowProp]}
            onPress={() => navigation.navigate("EmailLogin")}
          >
            <MaterialCommunityIcons
              name="gmail"
              size={24}
              color={COLORS.white}
            />
            <Text style={styles.facebookText}>เข้าระบบ Email</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          marginVertical: SPACING.l * 8,
          alignItems: "center",
          marginHorizontal: Display.setWidth(4),
        }}
      >
        <Text style={styles.textAgreement}>
          ในการจองครั้งนี้ ฉันยอมรับว่าได้อ่านแล้วยอมรับ
          <A
            href="https://google.com"
            style={{ textDecorationLine: "underline" }}
          >
            ข้อตกลงและเงื่อนไขและนโยบายความเป็นส่วนตัว
          </A>
          ของTravel.com
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  headerClose: {
    marginVertical: Display.setHeight(1),
    marginHorizontal: Display.setWidth(3),
  },
  headerContainer: {
    alignItems: "center",
  },
  headerTitle: {
    fontSize: SIZES.body2,
    color: COLORS.black,
  },
  headerSubtitleTitle: {
    fontSize: SIZES.h4 - 2,
    color: COLORS.slate,
    fontFamily: "SukhumvitSet-SemiBold",
  },
  loginContainer: {
    marginVertical: Display.setHeight(8),
    marginHorizontal: Display.setWidth(5),
  },
  googleContainer: {
    backgroundColor: COLORS.white,
    paddingHorizontal: Display.setWidth(22),
    paddingVertical: Display.setHeight(1),
    borderRadius: SIZES.radius + 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: COLORS.slate,
  },
  googleText: {
    fontSize: SIZES.h4 - 1,
    fontFamily: "SukhumvitSet-Bold",
    marginLeft: Display.setWidth(2),
  },
  facebookContainer: {
    backgroundColor: COLORS.facebook,
    paddingHorizontal: Display.setWidth(22),
    paddingVertical: Display.setHeight(1),
    borderRadius: SIZES.radius + 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  facebookText: {
    fontSize: SIZES.h4 - 1,
    fontFamily: "SukhumvitSet-Bold",
    marginLeft: Display.setWidth(2),
    color: COLORS.white,
  },
  phoneContainer: {
    backgroundColor: "#34d399",
    paddingVertical: Display.setHeight(1),
    borderRadius: SIZES.radius + 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  shadowProp: {
    elevation: 1,
  },
  registerHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  registerContainer: {
    backgroundColor: COLORS.red,
    paddingVertical: Display.setHeight(1),
    borderRadius: SIZES.radius + 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textAgreement: {
    fontSize: SIZES.h4 - 4,
    color: COLORS.black,
    textAlign: "center",
  },
});
