import { CryptoDetail, Transaction } from "./screens";
import { StyleSheet, Text, View } from "react-native";

import { useFonts } from "expo-font";
import Navigators from "./navigators";

export default function App() {
  const [fontsLoaded] = useFonts({
    "SF-font": require("./assets/fonts/SF-Pro-Rounded-Medium.otf"),
    "SukhumvitSet-Medium": require("./assets/fonts/SukhumvitSet-Medium.ttf"),
    "SukhumvitSet-SemiBold": require("./assets/fonts/SukhumvitSet-SemiBold.ttf"),
    "SukhumvitSet-Bold": require("./assets/fonts/SukhumvitSet-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return <Navigators />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
