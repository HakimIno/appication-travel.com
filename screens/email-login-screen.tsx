import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../constants";
import { Octicons, Ionicons } from "@expo/vector-icons";
import { SIZES, SPACING } from "../constants/theme";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { HeaderBack } from "../components/shared/headerBack";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../config/config";

type emailScreenProps = StackNavigationProp<RootStackParamList, "EmailLogin">;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const EmailLoginScreen = () => {
  const navigation = useNavigation<emailScreenProps>();

  // state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [message, setMessage] = useState("")

  // handleLogin
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("Login successful")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === "auth/wrong-password") {
          setMessage("รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง")
        } else {

          console.log(errorMessage);
        }
      });
  };


  useEffect(() => {
    try {
      const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if (authUser) {
          navigation.reset({
            index: 0,
            routes: [{
              name: "Root"
            }],
          });
        }
      });

      return unsubscribe;
    } catch (e) {
      console.log(e);
    }
  }, []);



  return (
    <View style={styles.container}>
      <HeaderBack onPress={() => navigation.goBack()} />

      <View style={{}}>
        <Text style={[styles.textTitle, { textAlign: "center" }]}>
          เข้าสู่ระบบด้วย Email
        </Text>

        <View style={[styles.containerInput, { alignItems: "center" }]}>
          <TextInput
            style={[styles.EmailInputStyle]}
            value={email}
            keyboardType="email-address"
            placeholder="Email"
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

        <View
          style={[
            styles.containerInput,
            { alignItems: "center", marginTop: SPACING.l },
          ]}
        >
          <TextInput
            style={[styles.EmailInputStyle]}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={showPassword}
          />
          {password && (
            <Ionicons
              name="ios-close-circle-sharp"
              size={18}
              color={COLORS.black}
              onPress={() => setPassword("")}
              style={{ marginHorizontal: SPACING.s - 2 }}
            />
          )}
          <Octicons
            name={showPassword ? "eye-closed" : "eye"}
            size={18}
            color={COLORS.black}
            onPress={() => setShowPassword(!showPassword)}
          />
        </View>

      </View>
      {message && (<Text style={[styles.invalidText, { marginTop: SPACING.s}]}>{message}</Text>)}
      <TouchableOpacity
        style={{
          alignItems: "flex-end",
          marginHorizontal: SPACING.l,
          marginVertical: SPACING.m,
        }}
      >
        <Text
          style={{
            fontSize: 12,
            fontFamily: "SukhumvitSet-SemiBold",
            color: COLORS.black,
          }}
        >
          ลืมรหัสผ่าน?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogin}>
        <View
          style={[
            styles.btnContinue,
            {
              backgroundColor: "#34d399",
            },
          ]}
        >
          <Text style={styles.textContinue}>เข้าสู่ระบบ</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.registerHeaderContainer}>
        <View
          style={{ flex: 1, height: 1, backgroundColor: COLORS.lightGray }}
        />

        <Text
          style={{
            fontSize: 11,
            textAlign: "center",
            color: COLORS.black,
            fontFamily: "SukhumvitSet-SemiBold",
            marginVertical: SPACING.s,
          }}
        >
          ถ้ายังไม่มีบัญชี?
        </Text>
        <View
          style={{ flex: 1, height: 1, backgroundColor: COLORS.lightGray }}
        />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <View
          style={[
            styles.btnContinue,
            {
              backgroundColor: COLORS.facebook,
            },
          ]}
        >
          <Text style={styles.textContinue}>ลงทะเบียน</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default EmailLoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  textTitle: {
    fontSize: 15,
    marginTop: SPACING.l * 2,
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
  registerHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: SPACING.l,
  },
  
});
