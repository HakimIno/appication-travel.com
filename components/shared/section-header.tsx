import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, SIZES, SPACING } from "../../constants/theme";
import Display from "../../utils/Display";

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
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            width: 5,
            height: 20,
            backgroundColor: COLORS.primary,
            borderRadius: 10,
            marginRight: SPACING.s,
          }}
        />
        <Text style={[styles.title, titleStyle]}>{title}</Text>
      </View>
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

  },
  title: {
    fontSize: Display.setWidth(3.5),
    fontFamily: 'SukhumvitSet-Bold'
  },
  allText: {
    fontSize: 11,
    fontFamily: 'SukhumvitSet-Bold'
  }
});

export default SectionHeader;
