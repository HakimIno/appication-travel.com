import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import SectionHeader from '../components/shared/section-header';
import { COLORS, SIZES } from '../constants';
import { Image } from 'react-native';
import { SPACING } from '../constants/theme';

const PromoDetails = () => {
    const route = useRoute<RouteProp<RootStackParamList, "PromoDetails">>();

    const { promotion } = route.params


    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={{ alignItems: 'center', marginBottom: SPACING.l}}>
                {
                    promotion.image && (
                        <Image source={{ uri: promotion.image }}
                            style={{ width: SIZES.width -30, height: 300, borderRadius: SIZES.radius, marginTop: SPACING.l }} />
                    )
                }
            </View>

            <SectionHeader
                title={promotion.title}
                buttonTitle=""
                onPress={() => { }}
            />
            <View style={styles.summary}>
                <Text style={styles.summaryText}>{promotion.description}</Text>

            </View>
        </View>
    )
}

export default PromoDetails

const styles = StyleSheet.create({
    summary: {
        marginHorizontal: SPACING.l,
        marginVertical: SPACING.s,
    },
    summaryText: {
        fontSize: 12,
        color: COLORS.slate,
        fontFamily: "SukhumvitSet-Medium",
    },
})