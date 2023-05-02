import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { SIZES } from "../../constants";
import { SPACING } from "../../constants/theme";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";

interface Props {
  items: any[];
  renderItem: ({ item, style }: any) => React.ReactElement;
}

const CARD_WIDTH = SIZES.width - 80;
const CARD_WIDTH_SPACING = CARD_WIDTH + SPACING.l;

const HotelsCarouselCompo = ({ renderItem, items = [] }: Props) => {
  return (
    <BottomSheetFlatList
      data={items}
      horizontal
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}
      snapToInterval={CARD_WIDTH_SPACING}
      keyExtractor={(i) => i.id}
      renderItem={({ item, index }) => {
        if (renderItem) {
          return renderItem({
            item,
            style: {
              width: CARD_WIDTH,
              marginLeft: SPACING.m,
              marginRight: SPACING.m,
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

export default HotelsCarouselCompo;
