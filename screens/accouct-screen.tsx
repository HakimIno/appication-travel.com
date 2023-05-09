import { Image, SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../constants';
import { Octicons } from '@expo/vector-icons';
import { SPACING } from '../constants/theme';
import { auth, db } from '../config/config';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { DocumentData, doc, getDoc } from 'firebase/firestore';

type RootScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Root'>;

const SettingsScreen = () => {
    const insets = useSafeAreaInsets();
    const [userData, setUserData] = useState<DocumentData | null>(null);

    const navigation = useNavigation<RootScreenNavigationProp>();
    const handleLogout = () => {
        auth.signOut().
            then(() => {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                });
            })
            .catch(error => {
                console.log(error);
            });

    };
    const currentUser = auth.currentUser;
    const userId = currentUser?.uid;

    useLayoutEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDocRef = doc(db, 'users', String(userId));

                // Retrieve the user data
                const documentSnapshot = await getDoc(userDocRef);

                if (documentSnapshot.exists()) {
                    const userData = documentSnapshot.data();
                    setUserData(userData)
                } else {
                    console.log('User document does not exist');
                }
            } catch (error) {
                console.log('Error getting user data:', error);
            }
        };

        fetchUserData();
    }, [userId]);

    return (
        <View style={[styles.container, { marginTop: insets.top }]}>
            <View style={{ height: 100 }}>
                <View style={{ margin: SPACING.m, flexDirection: 'row' }}>
                    <Image
                        source={{ uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pinclipart.com%2Fpicdir%2Fbig%2F133-1331433_free-user-avatar-icons-happy-flat-design-png.png&f=1&nofb=1&ipt=0144a5bb7e8aa21c3a723dae791c2a20313de739c232baceb048ce5c7930f350&ipo=images' }}
                        style={{ width: 60, height: 60, borderRadius: 52 }}
                    />
                    <View style={{ justifyContent: 'center', marginHorizontal: SPACING.s }}>
                        <Text style={styles.textName}>{userData?.firstName} {userData?.lastName}</Text>
                        <Text style={[styles.textName, { fontSize: 12, color: COLORS.slate}]}>แก้ไขข้อมูลส่วนตัว</Text>
                    </View>
                </View>
            </View>
            <View>
                <SectionList
                    sections={[
                        { title: '', data: ['รายการที่บันทึกไว้'], icon: "heart" },
                        {
                            title: '',
                            data: [
                                'ให้คะแนนแอพ',
                                'ฝ่ายบริการลูกค้า',
                                'เกี่ยวกับ travel.com',
                            ],
                            icons: [
                                "star",
                                "stop",
                                "comment-discussion"
                            ]
                        },
                    ]}
                    renderItem={({ item, section }: any) => <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, marginLeft: SPACING.s }}>
                        <Octicons name={section.icons ? section.icons.shift() : section.icon} size={20} color="black" />
                        <Text style={styles.fontText}>{item}</Text>
                    </View>}
                    renderSectionHeader={({ section }) => (
                        <View style={{ paddingVertical: 6, backgroundColor: 'rgba(247,247,247,1.0)', }}></View>
                    )}
                    keyExtractor={item => `basicListEntry-${item}`}
                />
            </View>

            <TouchableOpacity onPress={handleLogout}>
                <Text style={[styles.fontText, { textAlign: 'center', marginVertical: SPACING.l, color: COLORS.primary }]}>ออกจากระบบ</Text>
            </TouchableOpacity>
        </View>

    )
}

export default SettingsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    sectionHeader: {
        paddingLeft: 10,
        paddingRight: 10,

        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    fontText: {
        marginHorizontal: SPACING.l,
        fontSize: 15,
        fontFamily: "SukhumvitSet-SemiBold",
    },
    textName: {
        fontSize: 16,
        fontFamily: "SukhumvitSet-SemiBold",
    }
})