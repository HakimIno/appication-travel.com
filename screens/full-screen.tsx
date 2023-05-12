import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, FlatList, ScrollView, Text } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { RootStackParamList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { Octicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import CarouselIndicators from '../components/shared/carouselIndicators';
import * as Animatable from "react-native-animatable";

type CurrentScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "FullScreenImage"
>;



const FullScreenImage = () => {
    const navigation = useNavigation<CurrentScreenNavigationProp>();
    const route = useRoute<RouteProp<RootStackParamList, "FullScreenImage">>();
    const { imageUrl } = route.params;
    const insets = useSafeAreaInsets();


    const scrollAnimated = useRef(new Animated.Value(0)).current;

    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.backButton, { marginTop: insets.top }]} onPress={() => navigation.goBack()}>
                <Octicons name="x" size={24} color={COLORS.white} />
            </TouchableOpacity>

            <Animated.FlatList
                data={imageUrl}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                bounces={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollAnimated } } }],
                    { useNativeDriver: false }
                )}
                renderItem={({ item: image, index }) => {
                    if (typeof image === 'string') {
                        if (!index) {
                            return (
                                <View style={styles.slide}>
                                    <SharedElement id={`image.${imageUrl}`}>
                                        <Image source={{ uri: image }} style={styles.image} />
                                    </SharedElement>
                                </View>
                            );
                        }
                        return (
                            <View style={styles.slide}>
                                <Image source={{ uri: image }} style={styles.image} />
                            </View>
                        );
                    }
                    return null;
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 30,
        right: 30,
        zIndex: 1,
    },
    slide: {
        width: SIZES.width,
        height: SIZES.height,
    },
    image: {
        width: SIZES.width,
        height: SIZES.height,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        resizeMode: "cover",
    },
    indicators: {
        position: "absolute",
        width: SIZES.width,
        bottom: 60,
        alignItems: "center",
    },
});

export default FullScreenImage;
