import { Image, SectionList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../constants';
import { Octicons } from '@expo/vector-icons';
import { SIZES, SPACING } from '../constants/theme';
import { auth, db } from '../config/config';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { DocumentData, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { MaterialIcons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import CustomBackground from '../components/trip-details/TripDetailsCard/custom-background';
import Divider from '../components/shared/divider';

type RootScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Root'>;

const SettingsScreen = () => {
    const insets = useSafeAreaInsets();
    const [userData, setUserData] = useState<DocumentData | null>(null);

    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ["1%", "100%"], []);

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

    const handleClose = () => {
        bottomSheetRef.current?.snapToIndex(0);
    };

    const handlePress = () => {
        bottomSheetRef.current?.snapToIndex(1);

    };


    const renderHeader = () => (
        <>
            <View style={{ marginHorizontal: SPACING.l, marginVertical: SPACING.s }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View />
                    <Text
                        style={{
                            fontSize: 13,
                            fontFamily: "SukhumvitSet-Bold",
                            textAlign: "center",
                        }}
                    >
                        แก้ไขข้อมูลส่วนตัว
                    </Text>
                    <TouchableOpacity onPress={handleClose}>
                        <MaterialIcons name="close" size={22} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            <Divider enabledSpacing={false} />
        </>
    );


    const setFirstName = (text: string) => {
        setUserData({ ...userData, firstName: text });
    };

    const setLastName = (text: string) => {
        setUserData({ ...userData, lastName: text });
    };

    const setEmail = (text: string) => {
        setUserData({ ...userData, email: text });
    };

    const setPhoneNumber = (text: string) => {
        setUserData({ ...userData, phoneNumber: text });
    };

    const EditProfile = async () => {
        try {

            const usersCollectionRef = collection(db, 'users');
            const userDocRef = doc(usersCollectionRef, userId);


            await updateDoc(userDocRef, userData);

            handleClose()

            console.log('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };


    return (
        <View style={[styles.container, { marginTop: insets.top }]}>
            <View style={{ height: 100 }}>
                <View style={{ margin: SPACING.m, flexDirection: 'row' }}>
                    <Image
                        source={{ uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pinclipart.com%2Fpicdir%2Fbig%2F133-1331433_free-user-avatar-icons-happy-flat-design-png.png&f=1&nofb=1&ipt=0144a5bb7e8aa21c3a723dae791c2a20313de739c232baceb048ce5c7930f350&ipo=images' }}
                        style={{ width: 60, height: 60, borderRadius: 52 }}
                    />
                    <View style={{ justifyContent: 'center', marginHorizontal: SPACING.s }}>
                        <Text style={styles.textName}>
                            {userData?.firstName === "" || userData?.lastName === "" ? `+66${userData?.phoneNumber}` : (userData?.firstName + ' ' + userData?.lastName)}
                        </Text>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={handlePress}>
                            <Text style={[styles.textName, { fontSize: 12, color: COLORS.slate }]}>แก้ไขข้อมูลส่วนตัว</Text>
                            <MaterialIcons name="arrow-forward-ios" size={16} color={COLORS.slate} style={{ marginHorizontal: 5 }} />
                        </TouchableOpacity>
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

            <BottomSheet
                snapPoints={snapPoints}
                ref={bottomSheetRef}
                enablePanDownToClose={true}
                handleComponent={renderHeader}
                backgroundComponent={CustomBackground}
            >
                <Text style={styles.detailTextInfo}>
                    ชื่อ <Text style={{ color: COLORS.red }}>*</Text>
                </Text>
                <View style={[styles.containerInput]}>
                    <TextInput
                        style={[styles.InputStyle]}
                        value={userData?.firstName}
                        keyboardType="default"
                        placeholder="ไม่ได้ละบุ"
                        onChangeText={setFirstName}
                    />

                </View>
                <Text style={styles.detailTextInfo}>
                    นามสกุล <Text style={{ color: COLORS.red }}>*</Text>
                </Text>
                <View style={[styles.containerInput]}>

                    <TextInput
                        style={[styles.InputStyle]}
                        value={userData?.lastName}
                        keyboardType="default"
                        placeholder="ไม่ได้ละบุ"
                        onChangeText={setLastName}
                    />

                </View>
                <Text style={styles.detailTextInfo}>
                    อีเมล <Text style={{ color: COLORS.red }}>*</Text>
                </Text>
                <View style={[styles.containerInput]}>
                    <TextInput
                        style={[styles.InputStyle]}
                        value={userData?.email}
                        keyboardType="default"
                        placeholder="ไม่ได้ละบุ"
                        onChangeText={setEmail}
                    />

                </View>
                <Text style={styles.detailTextInfo}>
                    เบอร์โทรศัพทร์ <Text style={{ color: COLORS.red }}>*</Text>
                </Text>
                <View style={[styles.containerInput]}>
                    <TextInput
                        style={[styles.InputStyle]}
                        value={userData?.phoneNumber}
                        keyboardType="default"
                        placeholder="ไม่ได้ละบุ"
                        onChangeText={setPhoneNumber}
                    />

                </View>

                <TouchableOpacity
                    style={{
                        paddingVertical: SPACING.s,
                        backgroundColor: COLORS.primary,
                        marginHorizontal: SPACING.l,
                        marginBottom: SPACING.s,
                        borderRadius: SIZES.radius,
                        alignItems: "center",
                        marginVertical: SPACING.l + SPACING.l + 20
                    }}
                    onPress={EditProfile}
                >
                    <Text
                        style={{
                            fontSize: 14,
                            fontFamily: "SukhumvitSet-Bold",
                            color: COLORS.white,
                        }}
                    >
                        ยืนยันแก้ไข
                    </Text>
                </TouchableOpacity>
            </BottomSheet>
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
    },
    containerInput: {
        flexDirection: "row",
        marginHorizontal: SPACING.l,
        paddingHorizontal: SPACING.m,
        borderRadius: SIZES.radius + 5,
        backgroundColor: COLORS.white,
        alignItems: "center",
        borderWidth: 0.5,
        borderColor: COLORS.slate,

    },
    InputStyle: {
        flex: 1,

        height: 45,
        color: COLORS.slate,
        fontFamily: "SukhumvitSet-Medium",
        fontSize: 13
    },
    detailTextInfo: {
        fontSize: 14,
        fontFamily: "SukhumvitSet-SemiBold",
        color: COLORS.black,
        marginTop: SPACING.l,
        marginHorizontal: SPACING.l + 5
    },
})