import { View } from "react-native";
import { SPACING } from "../../constants/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  onPress: () => void;
}

export const HeaderBack = ({ onPress }: Props) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ margin: SPACING.m, width: 30 }}>
      <MaterialIcons
        name="arrow-back"
        size={24}
        color="black"
        onPress={onPress}
      />
    </View>
  );
};
