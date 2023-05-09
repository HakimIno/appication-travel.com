import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, images } from '../constants'
import { SPACING } from '../constants/theme';
import Divider from '../components/shared/divider';

interface NotificationProps {
    id: number;
    title: string;
    description: string;
    date: string
}

const NotificationScreen = () => {

    const notification_detail = [
        {
            id: 1,
            title: 'บินตรง ภายใน วันได้แล้ว Travel.com',
            description: 'travel.com พบกับกิจกรรมมากมายในวันนี้ทางแอป',
            date: '11 Apr'
        },
        {
            id: 2,
            title: 'บินตรง ภายใน วันได้แล้ว Travel.com',
            description: 'travel.com พบกับกิจกรรมมากมายในวันนี้ทางแอป',
            date: '11 Apr'
        },
        {
            id: 3,
            title: 'บินตรง ภายใน วันได้แล้ว Travel.com',
            description: 'travel.com พบกับกิจกรรมมากมายในวันนี้ทางแอป',
            date: '11 Apr'
        },
        {
            id: 4,
            title: 'บินตรง ภายใน วันได้แล้ว Travel.com',
            description: 'travel.com พบกับกิจกรรมมากมายในวันนี้ทางแอป',
            date: '11 Apr'
        },
        {
            id: 5,
            title: 'บินตรง ภายใน วันได้แล้ว Travel.com',
            description: 'travel.com พบกับกิจกรรมมากมายในวันนี้ทางแอป',
            date: '11 Apr'
        },

    ]


    function NotificationCard({ item }: { item: NotificationProps }) {
        return (
            <>
                <View style={styles.listContainer}>
                    <View >
                        <Image
                            source={images.LogoNotify}
                            style={{ width: 45, height: 45, }}
                        />

                        <View style={styles.notify} />
                    </View>
                    <View style={{ marginHorizontal: SPACING.s, width: 250 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View>
                                <Text numberOfLines={1} style={[styles.fontTextBold, { fontSize: 13, }]}>{item.title}</Text>
                                <Text numberOfLines={2} style={[styles.fontText, { fontSize: 11, color: COLORS.slate }]}>{item.description}</Text>
                            </View>
                            <Text style={[styles.fontText, { fontSize: 12, marginHorizontal: SPACING.m, color: COLORS.slate }]}>{item.date}</Text>
                        </View>
                    </View>
                </View>
                <Divider enabledSpacing />
            </>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={notification_detail}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <NotificationCard item={item} />}
            />
        </View>
    )
}

export default NotificationScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    listContainer: {
        flexDirection: 'row',
        marginHorizontal: SPACING.m,
        alignItems: 'center',
        marginVertical: SPACING.s,

    },
    notify: {
        width: 10,
        height: 10,
        borderRadius: 30,
        backgroundColor: COLORS.red,
        position: 'absolute',
        right: -5,
        top: -5
    },
    fontText: {
        fontFamily: "SukhumvitSet-SemiBold",
    },
    fontTextBold: {
        fontFamily: "SukhumvitSet-Bold",
    },

})