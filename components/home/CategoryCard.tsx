import { View, Text, StyleSheet } from "react-native";
import React from "react";

type ItemProps = { name: string };

const CategoryCard = ({ name }: ItemProps) => {
  return (
    <View style={styles.item}>
      <Text>{name}</Text>
    </View>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 28,
    marginHorizontal: 16,
  },
});
