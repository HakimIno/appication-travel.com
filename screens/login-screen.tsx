import {
  Button,
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
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

import { A } from "@expo/html-elements";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";


import {
  signInWithCredential,
  FacebookAuthProvider,
  GoogleAuthProvider,
} from "@firebase/auth";

import { auth, db } from "../config/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useEffect, useState } from "react";
import { SPACING } from "../constants/theme";
import { doc, getDoc, setDoc } from "firebase/firestore";

type Props = {
  navigation: any;
};

interface TokenResponse {
  authentication: {
    accessToken: string;
  } | null;
}


WebBrowser.maybeCompleteAuthSession();

export const LoginScreen = ({ navigation }: Props) => {
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

  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '704958930040-7hli9g0t14pv53m6ne4hieolfpe1r846.apps.googleusercontent.com',
    webClientId: '704958930040-cv6ql1g3h3qhqaq0db89ql2kivhaos42.apps.googleusercontent.com',
  });

  useEffect(() => {
    handleEffect();
  }, [response, token]);

  async function handleEffect() {
    
      if (response && response.type === "success") {
        // setToken(response.authentication.accessToken);
        if (response.authentication !== null) {
          getUserInfo(response.authentication.accessToken);
        }
      }
    
  }

  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem("@user");
    if (!data) return null;
    return JSON.parse(data);
  };

  const getUserInfo = async (token: string) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));

      const credential = GoogleAuthProvider.credential(null ,token);

      await signInWithCredential(auth, credential).then(async (userCredential) => {
        const users = userCredential.user;

        const userDocRef = doc(db, "users", `${users?.uid}`);

        const docSnapshot = await getDoc(userDocRef);

        if (docSnapshot.exists()) {
          console.log("User data already exists in Firestore.");
        } else {

          setDoc(userDocRef, {
            profileUrl: user?.picture,
            firstName: user?.given_name,
            lastName: user?.family_name,
            phoneNumber: "",
            email: user?.email,
          })
            .then(() => {
              console.log("User data stored successfully!");
            })
            .catch((error) => {
              console.error("Error storing user data: ", error);
            });
        }
      })

    } catch (error) {
      console.log(`Login filed ${error}`)
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
        <Image source={images.LogoApp} style={{ width: Display.setWidth(50), height: Display.setHeight(35) }} />
        <Text style={styles.headerSubtitleTitle}>
          เข้าสู่ระบบเพื่อจองแพ็คเกจทัวร์
        </Text>

        <View style={styles.loginContainer}>
          {/* Google Login */}

          <TouchableOpacity
            style={[styles.googleContainer, styles.shadowProp]}
            disabled={!request}
            onPress={() => {
              promptAsync();
            }}
          >
            <FontAwesome name="google" size={25} color={COLORS.black} />

            <Text style={styles.googleText}>เข้าระบบผ่าน Google</Text>
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
          {/* register  */}
          
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
    fontSize: Display.setWidth(3.5),
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
