import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RootStackParamList } from '../types';
import { RouteProp, useRoute } from '@react-navigation/native';
import { COLORS, SIZES, SPACING } from '../constants/theme';
import SectionHeader from '../components/shared/section-header';
import { Image } from 'react-native';



const NotificationDetails = () => {
    const route = useRoute<RouteProp<RootStackParamList, "NotificationDetails">>();

    const { notification } = route.params


    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            <SectionHeader
                title={notification.title}
                buttonTitle=""
                onPress={() => { }}
            />
            <View style={styles.summary}>
                <Text style={styles.summaryText}>{notification.description}</Text>
            </View>
            <View style={{ alignItems: 'center', marginBottom: SPACING.l }}>
                {
                    notification.image && (
                        <Image source={{ uri: notification.image }}
                            style={{ width: SIZES.width - 30, height: 300, borderRadius: SIZES.radius, marginTop: SPACING.l }} />
                    )
                }
            </View>
        </View>
    )
}

export default NotificationDetails

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