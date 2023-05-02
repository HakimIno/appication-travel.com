import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { SIZES } from "../../constants";
import { SPACING } from "../../constants/theme";

interface Props {
  renderItem: any;
  items: Array<any>;
}

const CARD_WIDTH = SIZES.width - 80;
const CARD_WIDTH_SPACING = CARD_WIDTH + SPACING.l;

const Carousel = ({ renderItem, items = [] }: Props) => {
  return (
    <FlatList
      data={items}
      horizontal
      style={styles.container}
      snapToInterval={CARD_WIDTH_SPACING}
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}
      keyExtractor={(i) => i.id}
      renderItem={({ item, index }) => {
        if (renderItem) {
          return renderItem({
            item,
            index,
            style: {
              width: CARD_WIDTH,
              marginLeft: SPACING.l,
              marginRight: index === items.length - 1 ? SPACING.l : 0,
            },
          });
        }
        return null;
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACING.m,
  },
});

export default Carousel;
