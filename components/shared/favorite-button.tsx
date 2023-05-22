import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "./icon";
import { COLORS, SIZES, images } from "../../constants";
import LottieView from "lottie-react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  isFavorites?: boolean;
  style?: any;
  onPress: () => void | Promise<void>;
}

const FavoriteButton = ({ style, onPress, isFavorites = false }: Props) => {

  const animation = useRef<LottieView>(null);
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      if (isFavorites) {
        animation.current?.play(66, 66);
      } else {
        animation.current?.play(19, 19);
      }
      isFirstRun.current = false;
    } else if (isFavorites) {
      animation.current?.play(19, 50);
    } else {
      animation.current?.play(0, 19);
    }
  }, [isFavorites]);

  return (
    <TouchableOpacity style={styles.view} onPress={onPress}>
      {/*   <Ionicons
        name={isFavorites ? "heart" : "heart-outline"}
        size={24}
        color={isFavorites ? COLORS.red : COLORS.black}
      /> */}
      <LottieView
        ref={animation}
        style={styles.heartLottie}
        source={images.link_animation}
        autoPlay={false}
        loop={false}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: COLORS.white,
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  heartLottie: {
    width: 55,
    height: 55,

  },
});

export default FavoriteButton;
