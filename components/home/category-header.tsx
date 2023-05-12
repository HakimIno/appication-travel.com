import { FlatList, Text, View, Animated, StyleSheet } from "react-native";
import { COLORS, SIZES, icons } from "../../constants";
import Display from "../../utils/Display";
import CategoryCard from "./category-card";
import * as Animatable from "react-native-animatable";
import CarouselIndicators from "../shared/carouselIndicators";
import { useRef } from "react";

const CategoryHeader = () => {
  const scrollAnimated = useRef(new Animated.Value(0)).current;

  const categoryData = [
    { name: "ทัวร์", icon: icons.tripsIcon , type: "ทัวร์"},
    { name: "โรงแรม", icon: icons.hotelIcon , type: "โรงแรม"},
    
  ];
  return (
    <View style={{ marginTop: -45, zIndex: 1, alignItems: "center" }}>
      <View
        style={{
          backgroundColor: COLORS.white,
          width: Display.setWidth(85),
          height: 100,
          elevation: 5,
          borderRadius: 15,
        }}
      >
        <View style={{ alignItems: "center", height: "100%" }}>
          <Animated.FlatList
            data={categoryData}
            horizontal
            pagingEnabled
            keyExtractor={(id) => id.name}
            showsHorizontalScrollIndicator={false}
            bounces={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollAnimated } } }],
              { useNativeDriver: false }
            )}
            renderItem={({ item }) => (
              <CategoryCard name={item.name} icon={item.icon} type={item.type} />
            )}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  indicators: {},
});

export default CategoryHeader;
