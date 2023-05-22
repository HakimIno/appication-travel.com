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
        Aumanan<Text style={{ color: COLORS.yellow }}>•</Text>Juket
      </Text>

      <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
        <Octicons name="bell" size={22} color="white" />
        <View style={styles.notification}></View>
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
    right: -3,
    top: -3,
    backgroundColor: COLORS.red,
    width: 10,
    height: 10,
    borderRadius: 32
  }
});

export default MainHeader;
