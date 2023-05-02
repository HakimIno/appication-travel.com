import React, { forwardRef } from "react";
import { View } from "react-native";
import { COLORS } from "../../constants";
import { SPACING } from "../../constants/theme";
import { RefObject } from "react";

type Props = {
  style?: any;
  enabledSpacing: boolean;
  elevations?: boolean;
};

type LegacyRef<T> = RefObject<T> | ((instance: T | null) => void) | null;

const Divider = forwardRef(
  (
    { style, enabledSpacing = true, elevations = true}: Props,
    ref: LegacyRef<View>
  ) => {
    return (
      <View
        ref={ref}
        style={[
          {
            height: 0.5,
            backgroundColor: COLORS.lightGray,
            marginHorizontal: enabledSpacing ? SPACING.l : 0,
            elevation: elevations ? 0 : 3,
          },
          style,
        ]}
      />
    );
  }
);

export default Divider;
