import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

const LoadingBooking = () => {
  return (
    <>
      <View style={styles.container}>
        <LottieView
          style={{ height: 100 }}
          source={require("../../assets/images/Frame4.json")}
          autoPlay
          loop
        />
      </View>
    </>
  );
};

export default LoadingBooking;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
});
