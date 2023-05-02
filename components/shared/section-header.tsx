import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SPACING } from "../../constants/theme";

interface Props {
  title: string;
  containerStyle?: any;
  titleStyle?: any;
  onPress: () => void;
  buttonTitle: string;
}
const SectionHeader = ({
  title,
  containerStyle,
  titleStyle,
  onPress,
  buttonTitle,
}: Props) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      {onPress && (
        <TouchableOpacity onPress={onPress}>
          <Text style={[styles.allText]}>{buttonTitle}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: SPACING.l,
    marginRight: SPACING.m,
    marginTop: SPACING.s,
    marginBottom: 10,
  },
  title: {
    fontSize: 13,
    fontFamily: 'SukhumvitSet-Bold'
  },
  allText: {
    fontSize: 11,
    fontFamily: 'SukhumvitSet-Bold'
  }
});

export default SectionHeader;
