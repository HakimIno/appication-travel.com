import { SharedElement } from "react-navigation-shared-element";
import { COLORS, SIZES } from "../../constants";
import Card from "../shared/card/card";
import Carousel from "../shared/carousel";
import CardMedia from "../shared/card/card-media";
import { StyleSheet, Text, View } from "react-native";

const CARD_WIDTH = SIZES.width - 80;
const CARD_HEIGHT = 100;

interface Props {
    list: any;

}
const PromotionCarousel = ({ list }: Props) => {
    return (
        <Carousel
            items={list}
            renderItem={({ item, style, index }: any) => {
                return (
                    <Card
                        style={[styles.card, style]}
                        key={item.id}
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