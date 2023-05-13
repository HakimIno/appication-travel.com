import { LinearGradient } from "expo-linear-gradient";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, SIZES } from "../constants";
import Display from "../utils/Display";

import { useEffect, useRef, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import {
  PhoneAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithCredential,
} from "@firebase/auth";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { auth, db } from "../config/config";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";

type InputProps = RouteProp<RootStackParamList, "InputOTP">;

type InputPropsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "InputOTP"
>;

interface Props {
  route: InputProps;
  navigation: InputPropsScreenNavigationProp;
}

const InputVerificationScreen: React.FC<Props> = ({ route, navigation }) => {
  const { phoneNumber, verificationId } = route.params;

  const textInputRef = useRef<TextInput>(null);
  const lengthInput = 6;
  const [internalVal, setInternalVal] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged((token) => {
      setIsLoading(false);
      if (token) {
        navigation.reset({
          index: 0,
          routes: [{ name: "Root" }],
        });
      }
    });
    return unsubscribe;
  }, []);

  const confirmCode = async () => {
    try {

      const credential = PhoneAuthProvider.credential(
        verificationId,
        internalVal
      );
      await signInWithCredential(auth, credential).then(async (userCredential) => {
        const users = userCredential.user;
        const userDocRef = doc(db, "users", `${users?.uid}`);

        const docSnapshot = await getDoc(userDocRef);

        const usersCollectionRef = collection(db, 'users');
        const querySnapshot = await getDocs(usersCollectionRef);

        const usersData = querySnapshot.docs.map((doc) => doc.data());

        if (docSnapshot.exists()) {
          console.log("User data already exists in Firestore.");
        } else {

          setDoc(userDocRef, {
            id: usersData.length + 1,
            firstName: "",
            lastName: "",
            phoneNumber: phoneNumber,
            email: "",
          })
            .then(() => {
              console.log("User data stored successfully!");
            })
            .catch((error) => {
              console.error("Error storing user data: ", error);
            });
        }
      });
    } catch (error) {
      console.log(error)
      setErrorMessage("คุณใส่รหัส OTP ไม่ถูกต้องกรุณาตรวจสอบอีกครั้ง");
    }
  };

  const onOtpInputChange = (val: string) => {
    setInternalVal(val);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (textInputRef.current) {
        textInputRef.current.focus();
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={50}
        behavior={"height"}
        style={styles.containerAvoiddingView}
      >
        <View
          style={{
            marginTop: Display.setHeight(10),
            marginBottom: 15,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.textTitle}>{"ใส่รหัส OTP ที่ส่งทาง SMS"}</Text>
          <Text style={styles.textTitle}>{`+66${phoneNumber}`}</Text>
        </View>
        <View>
          <TextInput
            ref={textInputRef}
            onChangeText={onOtpInputChange}
            value={internalVal}
            style={styles.textInput}
            maxLength={lengthInput}
            keyboardType="number-pad"
            returnKeyType="done"
          />
        </View>
        <View style={styles.containerInput}>
          {Array(lengthInput)
            .fill(null)
            .map((data, index) => (
              <TouchableOpacity
                onPress={() => textInputRef.current?.focus()}
                key={index}
              >
                <View style={styles.cellView} key={index}>
                  <Text style={styles.cellText}>
                    {internalVal && internalVal.length > 0
                      ? internalVal[index]
                      : ""}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
        </View>

        <Text
          style={{
            color: COLORS.red,
            fontSize: 12,
            fontFamily: "SukhumvitSet-Medium",
            marginVertical: Display.setHeight(1),
          }}
        >
          {errorMessage}
        </Text>

        <TouchableOpacity onPress={confirmCode}>
          <View
            style={[
              styles.btnContinue,
              {
                backgroundColor: internalVal ? "#34d399" : COLORS.lightGray,
              },
            ]}
          >
            <Text style={styles.textContinue}>ยืนยัน OTP</Text>
          </View>
        </TouchableOpacity>
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
    color: COLORS.black,
    fontFamily: "SukhumvitSet-Medium",
  },
  containerInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cellView: {
    paddingVertical: 11,
    width: 40,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: COLORS.black,
    borderBottomWidth: 1.5,
  },
  cellText: {
    textAlign: "center",
    fontSize: 16,
    color: COLORS.black,
  },
  textInput: {
    opacity: 0,
  },
  bottomView: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    marginBottom: 50,
    alignItems: "center",
  },
  btnChangeNumber: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  textChange: {
    color: COLORS.black,
    fontFamily: "SukhumvitSet-Medium",
    alignItems: "center",
    fontSize: SIZES.base + 4,
  },
  btnResend: {
    height: 50,
    borderRadius: 10,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  textResend: {
    color: COLORS.black,
    fontFamily: "SukhumvitSet-Medium",
    alignItems: "center",
    fontSize: SIZES.base + 4,
  },
  btnContinue: {
    paddingVertical: Display.setHeight(1.3),
    paddingHorizontal: Display.setWidth(30),
    marginVertical: Display.setHeight(3),
    borderRadius: SIZES.radius + 10,
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

export default InputVerificationScreen;
