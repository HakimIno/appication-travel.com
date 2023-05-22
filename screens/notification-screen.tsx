import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, images } from '../constants'
import { SIZES, SPACING } from '../constants/theme';
import Divider from '../components/shared/divider';
import { fetchNotificationData } from '../api/fecth.api';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

interface NotificationProps {
    id: number;
    title: string;
    description: string;
    date: string
}


type NavigationProps = {
    navigation: StackNavigationProp<RootStackParamList>;
};

const NotificationScreen = ({ navigation }: NavigationProps) => {

    const [notification, setNotification] = useState<NotificationProps[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const notifys = await fetchNotificationData();

                setNotification(notifys as unknown as NotificationProps[])
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, []);



    function NotificationCard({ item }: { item: NotificationProps }) {

        return (
            <>
                <TouchableOpacity style={styles.listContainer} onPress={() => navigation.navigate('NotificationDetails', { notification: item })}>
                    <View >
                        <Image
                            source={images.LogoNotify}
                            style={{ width: 45, height: 45, }}
                        />

                        <View style={styles.notify} />
                    </View>
                    <View style={{ marginHorizontal: SPACING.s,}}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                            <View style={{ width: SIZES.width - 150 }}>
                                <Text numberOfLines={1} style={[styles.fontTextBold, { fontSize: 13, }]}>{item.title}</Text>
                                <Text numberOfLines={1} style={[styles.fontText, { fontSize: 11, color: COLORS.slate }]}>{item.description}</Text>
                            </View>
                            <Text style={[styles.fontText, { fontSize: 11, color: COLORS.slate }]}>{item.date}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <Divider enabledSpacing />
            </>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={notification}
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