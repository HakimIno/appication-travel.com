import { SharedElement } from "react-navigation-shared-element";
import { COLORS, SIZES } from "../../constants";
import Card from "../shared/card/card";
import Carousel from "../shared/carousel";
import CardMedia from "../shared/card/card-media";
import { StyleSheet, Text, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";
import { NavigationProp, useNavigation } from "@react-navigation/native";

const CARD_WIDTH = SIZES.width - 80;
const CARD_HEIGHT = 100;

interface Props {
    list: any;
}

type ScreenNavigationProp = NavigationProp<
  RootStackParamList,
  "Root"
>;

const PromotionCarousel = ({ list }: Props) => {

    const navigation = useNavigation<ScreenNavigationProp>()

    return (
        <Carousel
            items={list}
            renderItem={({ item, style, index }: any) => {
                return (
                    <Card
                        style={[styles.card, style]}
                        key={item.id}
                        onPress={() => navigation.navigate("PromoDetails", { promotion: item as keyof RootStackParamList })}

                    >
                        <CardMedia source={item.image} borderBottomRadius />
                    </Card>
                );
            }}
        />
    )
}

const styles = StyleSheet.create({
    card: {
        height: CARD_HEIGHT,
    },
    titleBox: {
        position: "absolute",
        top: CARD_HEIGHT - 80,
        left: 16,
    },
    title: {
        fontSize: 14,
        fontFamily: "SukhumvitSet-SemiBold",
        color: COLORS.white,
    },
    location: {
        fontSize: 13,
        color: COLORS.white,
        fontFamily: "SukhumvitSet-SemiBold",
    },
});

export default PromotionCarousel;