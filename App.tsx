import { Platform, StyleSheet, Text, View } from "react-native";

import { useFonts } from "expo-font";
import Navigators from "./navigators";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { NotificationProvider } from "./config/noty";

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

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>

        <Navigators />

      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
