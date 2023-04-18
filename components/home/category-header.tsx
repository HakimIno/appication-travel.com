import { Text, View } from "react-native";
import { COLORS } from "../../constants";
import Display from "../../utils/Display";

const CategoryHeader = () => {
  return (
    <View style={{ marginTop: -45, zIndex: 1, alignItems: "center" }}>
      <View
        style={{
          backgroundColor: COLORS.white,
          width: Display.setWidth(85),
          height: 90,
          elevation: 2,
          borderRadius: 15,
        }}
      >
        <Text></Text>
      </View>
    </View>
  );
};

export default CategoryHeader
