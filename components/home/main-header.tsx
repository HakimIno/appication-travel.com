import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS, SIZES, SPACING } from "../../constants/theme";
import { Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";

type CurrentScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;


const MainHeader = () => {
  const insets = useSafeAreaInsets();

  const navigation = useNavigation<CurrentScreenNavigationProp>();

  return (
    <View style={[styles.container, { marginTop: insets.top }]}>
      <View></View>
      <Text style={styles.title}>
        travel<Text style={{ color: COLORS.yellow }}>.</Text>com
      </Text>

      <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
        <Octicons name="bell" size={22} color="white" />
        <View style={styles.notification}><Text style={{ fontSize: 10, color: COLORS.white, textAlign: 'center' }}>3</Text></View>
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
    right: -7,
    top: -5,
    backgroundColor: COLORS.red,
    width: 18,
    height: 18,
    borderRadius: 32
  }
});

export default MainHeader;
