import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS, SIZES, SPACING } from "../../constants/theme";
import { Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";
import { useEffect, useState } from "react";
import { fetchNotificationData } from "../../api/fecth.api";
import { collection, doc, getDoc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "../../config/config";

type CurrentScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;

interface NotificationProps {
  id: number;
  title: string;
  description: string;
  date: string;
  read: boolean;
}


const MainHeader = ({unreadCount}: any) => {
  const insets = useSafeAreaInsets();

  const navigation = useNavigation<CurrentScreenNavigationProp>();

  const [isLoading, setIsLoading] = useState(true);


  return (
    <View style={[styles.container, { marginTop: insets.top }]}>

      <Text style={styles.title}>
        Aumanan<Text style={{ color: COLORS.yellow }}>•</Text>Juket
      </Text>


      <TouchableOpacity onPress={() => { navigation.navigate("Notification") }}>
        <Octicons name="bell" size={22} color="white" />
        {unreadCount > 0 && (
          <View style={styles.notification}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 9, color: COLORS.white, textAlign: 'center' }}>
                {unreadCount}
              </Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.l,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  notification: {
    position: 'absolute',
    right: -5,
    top: -5,
    backgroundColor: '#ff0050',
    width: 15,
    height: 15,
    borderRadius: 32,

  }
});

export default MainHeader;
