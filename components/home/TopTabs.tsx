import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Text, View } from "react-native";

const Tab = createMaterialTopTabNavigator();

const ScreenA = () => (
  <View style={{ }}>
    <Text>Screen A</Text>
    <Text>Screen A</Text>
  </View>
);
const ScreenB = () => (
  <View>
    <Text>Screen B</Text>
  </View>
);
const ScreenC = () => (
  <View>
    <Text>Screen C</Text>
  </View>
);

const TopTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="A" component={ScreenA} />
      <Tab.Screen name="B" component={ScreenB} />
      <Tab.Screen name="C" component={ScreenC} />
    </Tab.Navigator>
  );
};

export default TopTabs;
