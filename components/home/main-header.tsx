import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS, SIZES, SPACING } from "../../constants/theme";
import { Octicons } from "@expo/vector-icons";

const MainHeader = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { marginTop: insets.top }]}>
      <View></View>
      <Text style={styles.title}>
        travel<Text style={{ color: COLORS.yellow }}>.</Text>com
      </Text>
      <Octicons name="bell" size={22} color="white" />
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
});

export default MainHeader;
