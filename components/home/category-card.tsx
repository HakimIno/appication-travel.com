import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { icons } from "../../constants";
import { COLORS, SPACING } from "../../constants/theme";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";
import Display from "../../utils/Display";

type ItemProps = { name: string; icon: any; type: string };

type CurrentScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;

const CategoryCard = ({ name, icon, type }: ItemProps) => {
  const navigation = useNavigation<CurrentScreenNavigationProp>();
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate("AllTrips", { type: type })}
    >
      <Image source={{ uri: icon}} style={{ width: 55, height: 55 }} />

      <Text
        style={{
          textAlign: "center",
          fontSize: Display.setWidth(2.7),
          fontFamily: "SukhumvitSet-Bold",
          marginTop: 3,
          
        }}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  item: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: SPACING.l,
  },
});
