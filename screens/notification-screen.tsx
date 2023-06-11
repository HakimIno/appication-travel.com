import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, images } from '../constants'
import { SIZES, SPACING } from '../constants/theme';
import Divider from '../components/shared/divider';
import { fetchNotificationData } from '../api/fecth.api';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { RouteProp, useRoute } from '@react-navigation/native';
import { collection, doc, getDoc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../config/config';

interface NotificationProps {
    id: string;
    title: string;
    description: string;
    date: string;
    read: boolean;
}


type NavigationProps = {
    navigation: StackNavigationProp<RootStackParamList>;

};

interface NotificationMessageProps {
    notificationId: string;
    userId: string;
}

const NotificationScreen = ({ navigation }: NavigationProps) => {

    const [notification, setNotification] = useState<NotificationProps[]>([])

    useEffect(() => {
        fetchData();
        const unsubscribe = onSnapshot(collection(db, 'notifys'), fetchData);
        return () => unsubscribe();
    }, []);

    const fetchData = async () => {
        try {
            const notifys = await fetchNotificationData();

            setNotification(notifys as unknown as NotificationProps[])
        } catch (error) {
            console.log(error)
        }
    }


    function NotificationCard({ item }: { item: NotificationProps }) {
        const [isRead, setIsRead] = useState(false)
        const [isLoading, setIsLoading] = useState(true);

        const currentUser = auth.currentUser;
        const userId = currentUser?.uid;

        const handleRead = async (notificationId: string, userId: string) => {
            console.log(userId)
            await updateRead(notificationId, userId);
            setIsRead(true);
        };

        const updateRead = async (notificationId: string, userId: string) => {
            const notificationRef = doc(db, 'notifys', notificationId);
            const readerRef = doc(notificationRef, 'readers', userId);

            try {
                await setDoc(readerRef, {});
                console.log(`Notification ${notificationId} marked as read by user ${userId}`);
            } catch (error) {
                console.error('Error updating read status:', error);
            }
        };

        const checkIfRead = async (notificationId: string, userId: string) => {
            const notificationRef = doc(db, 'notifys', notificationId);
            const readerRef = doc(notificationRef, 'readers', userId);

            try {
                const readerDoc = await getDoc(readerRef);
                return readerDoc.exists();
            } catch (error) {
                console.error('Error checking read status:', error);
                return false;
            }
        };



        useEffect(() => {
            setIsLoading(true);

            if (userId) {
                checkIfRead(item.id, userId)
                    .then(isRead => {
                        setIsRead(isRead);
                    })
                    .catch(error => {
                        console.error('Error checking read status:', error);
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });
            }
        }, [item.id, userId]);

        return (
            <>
                <TouchableOpacity style={styles.listContainer} onPress={() => { navigation.navigate('NotificationDetails', { notification: item }); handleRead(item.id, userId ? userId : ''); }}>
                    <View >
                        <Image
                            source={images.LogoNotify}
                            style={{ width: 45, height: 45, }}
                        />

                        {!isRead && !isLoading && <View style={styles.notify} />}


                    </View>
                    <View style={{ marginHorizontal: SPACING.s, }}>
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
        backgroundColor: '#ff0050',
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