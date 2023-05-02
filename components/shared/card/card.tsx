import {
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import { COLORS } from "../../../constants";

interface Props {
  children: any;
  style: any;
  onPress?: () => void;
}

const Card = ({ children, style, onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.card, style, { elevation: 0.5, marginBottom: 10 }]}
    >
      <View style={styles.inner}>{children}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 200,
    height: 200,
    backgroundColor: COLORS.white,
    borderRadius: 10,
  },
  inner: {
    width: "100%",
    height: "100%",
  },
});

export default Card;
